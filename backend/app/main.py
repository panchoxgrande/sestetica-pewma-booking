from fastapi import FastAPI, Depends, HTTPException, status, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import aiosqlite
from contextlib import asynccontextmanager

from app.database import get_db, init_db, DB_PATH
from app.auth import hash_password, verify_password, create_access_token, get_current_admin
from app.email_service import (
    send_booking_confirmation,
    send_booking_confirmed,
    send_booking_cancelled,
    send_admin_new_booking_notification,
)

INITIAL_ADMIN_USER = "admin"
INITIAL_ADMIN_PASS = "pewma2026"


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("SELECT id FROM admin_users WHERE username = ?", (INITIAL_ADMIN_USER,))
        existing = await cursor.fetchone()
        if not existing:
            hashed = hash_password(INITIAL_ADMIN_PASS)
            await db.execute("INSERT INTO admin_users (username, password_hash) VALUES (?, ?)", (INITIAL_ADMIN_USER, hashed))
            await db.commit()
    yield


app = FastAPI(lifespan=lifespan)

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class BookingCreate(BaseModel):
    service_id: str
    service_name: str
    date: str
    time: str
    client_name: str
    client_phone: str
    client_email: Optional[str] = ""


class BookingStatusUpdate(BaseModel):
    status: str
    admin_notes: Optional[str] = ""


class AdminLogin(BaseModel):
    username: str
    password: str


class ChangePassword(BaseModel):
    current_password: str
    new_password: str


@app.get("/healthz")
async def healthz():
    return {"status": "ok"}


@app.post("/api/bookings")
async def create_booking(booking: BookingCreate, background_tasks: BackgroundTasks, db: aiosqlite.Connection = Depends(get_db)):
    cursor = await db.execute(
        """INSERT INTO bookings (service_id, service_name, date, time, client_name, client_phone, client_email, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, 'pendiente')""",
        (booking.service_id, booking.service_name, booking.date, booking.time, booking.client_name, booking.client_phone, booking.client_email or ""),
    )
    await db.commit()
    booking_id = cursor.lastrowid

    background_tasks.add_task(
        send_booking_confirmation,
        booking.client_name, booking.client_email or "", booking.service_name, booking.date, booking.time,
    )
    background_tasks.add_task(
        send_admin_new_booking_notification,
        booking.client_name, booking.client_phone, booking.client_email or "", booking.service_name, booking.date, booking.time,
    )

    return {"id": booking_id, "message": "Cita registrada exitosamente"}


@app.get("/api/bookings/available-times")
async def get_available_times(date: str, db: aiosqlite.Connection = Depends(get_db)):
    all_times = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"]
    cursor = await db.execute(
        "SELECT time FROM bookings WHERE date = ? AND status != 'cancelada'", (date,)
    )
    rows = await cursor.fetchall()
    booked = {row[0] for row in rows}
    available = [t for t in all_times if t not in booked]
    return {"date": date, "available_times": available, "booked_times": list(booked)}


@app.post("/api/admin/login")
async def admin_login(credentials: AdminLogin, db: aiosqlite.Connection = Depends(get_db)):
    cursor = await db.execute("SELECT id, username, password_hash FROM admin_users WHERE username = ?", (credentials.username,))
    user = await cursor.fetchone()
    if not user or not verify_password(credentials.password, user[2]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciales inválidas")
    token = create_access_token({"sub": user[1]})
    return {"access_token": token, "token_type": "bearer", "username": user[1]}


@app.get("/api/admin/bookings")
async def list_bookings(
    status_filter: Optional[str] = None,
    admin: str = Depends(get_current_admin),
    db: aiosqlite.Connection = Depends(get_db),
):
    if status_filter:
        cursor = await db.execute("SELECT * FROM bookings WHERE status = ? ORDER BY date DESC, time ASC", (status_filter,))
    else:
        cursor = await db.execute("SELECT * FROM bookings ORDER BY date DESC, time ASC")
    rows = await cursor.fetchall()
    bookings = []
    for row in rows:
        bookings.append({
            "id": row[0],
            "service_id": row[1],
            "service_name": row[2],
            "date": row[3],
            "time": row[4],
            "client_name": row[5],
            "client_phone": row[6],
            "client_email": row[7],
            "status": row[8],
            "admin_notes": row[9],
            "created_at": row[10],
            "updated_at": row[11],
        })
    return {"bookings": bookings}


@app.patch("/api/admin/bookings/{booking_id}")
async def update_booking_status(
    booking_id: int,
    update: BookingStatusUpdate,
    background_tasks: BackgroundTasks,
    admin: str = Depends(get_current_admin),
    db: aiosqlite.Connection = Depends(get_db),
):
    if update.status not in ("pendiente", "confirmada", "cancelada"):
        raise HTTPException(status_code=400, detail="Estado inválido")

    cursor = await db.execute("SELECT * FROM bookings WHERE id = ?", (booking_id,))
    booking = await cursor.fetchone()
    if not booking:
        raise HTTPException(status_code=404, detail="Cita no encontrada")

    await db.execute(
        "UPDATE bookings SET status = ?, admin_notes = ?, updated_at = datetime('now') WHERE id = ?",
        (update.status, update.admin_notes or "", booking_id),
    )
    await db.commit()

    client_email = booking[7]
    client_name = booking[5]
    service_name = booking[2]
    date = booking[3]
    time = booking[4]

    if update.status == "confirmada":
        background_tasks.add_task(send_booking_confirmed, client_name, client_email, service_name, date, time)
    elif update.status == "cancelada":
        background_tasks.add_task(send_booking_cancelled, client_name, client_email, service_name, date, time)

    return {"message": f"Cita actualizada a '{update.status}'"}


@app.get("/api/admin/stats")
async def get_stats(admin: str = Depends(get_current_admin), db: aiosqlite.Connection = Depends(get_db)):
    cursor = await db.execute("SELECT status, COUNT(*) FROM bookings GROUP BY status")
    rows = await cursor.fetchall()
    stats = {row[0]: row[1] for row in rows}
    total = sum(stats.values())
    return {
        "total": total,
        "pendiente": stats.get("pendiente", 0),
        "confirmada": stats.get("confirmada", 0),
        "cancelada": stats.get("cancelada", 0),
    }


@app.post("/api/admin/change-password")
async def change_password(
    data: ChangePassword,
    admin: str = Depends(get_current_admin),
    db: aiosqlite.Connection = Depends(get_db),
):
    cursor = await db.execute("SELECT password_hash FROM admin_users WHERE username = ?", (admin,))
    user = await cursor.fetchone()
    if not user or not verify_password(data.current_password, user[0]):
        raise HTTPException(status_code=400, detail="Contraseña actual incorrecta")
    new_hash = hash_password(data.new_password)
    await db.execute("UPDATE admin_users SET password_hash = ? WHERE username = ?", (new_hash, admin))
    await db.commit()
    return {"message": "Contraseña actualizada"}
