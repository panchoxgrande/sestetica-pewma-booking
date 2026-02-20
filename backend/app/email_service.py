import smtplib
import os
from html import escape
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(env_path)

SMTP_HOST = os.getenv("SMTP_HOST", "")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
FROM_EMAIL = os.getenv("FROM_EMAIL", "")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "")


def is_email_configured() -> bool:
    return bool(SMTP_HOST and SMTP_USER and SMTP_PASSWORD and FROM_EMAIL)


def send_email(to_email: str, subject: str, html_body: str):
    if not is_email_configured():
        print(f"[EMAIL SKIP] Email not configured. Would send to {to_email}: {subject}")
        return False

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"Clínica Pewma <{FROM_EMAIL}>"
    msg["To"] = to_email
    msg.attach(MIMEText(html_body, "html"))

    try:
        if SMTP_PORT == 465:
            with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT) as server:
                server.login(SMTP_USER, SMTP_PASSWORD)
                server.sendmail(FROM_EMAIL, to_email, msg.as_string())
        else:
            with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
                server.starttls()
                server.login(SMTP_USER, SMTP_PASSWORD)
                server.sendmail(FROM_EMAIL, to_email, msg.as_string())
        print(f"[EMAIL OK] Sent to {to_email}: {subject}")
        return True
    except Exception as e:
        print(f"[EMAIL ERROR] Failed to send to {to_email}: {e}")
        return False


def send_booking_confirmation(client_name: str, client_email: str, service_name: str, date: str, time: str):
    if not client_email:
        return
    client_name = escape(client_name)
    service_name = escape(service_name)
    subject = "Confirmación de cita - Clínica Pewma"
    html = f"""
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d0f14; color: #ede8df; padding: 40px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #c4985a; font-size: 28px; margin: 0;">Clínica Pewma</h1>
            <p style="color: #8a8578; font-size: 12px; letter-spacing: 3px; text-transform: uppercase;">Estética & Bienestar</p>
        </div>
        <div style="background: #14161d; border: 1px solid #1e2028; border-radius: 8px; padding: 30px; margin-bottom: 20px;">
            <h2 style="color: #ede8df; margin-top: 0;">¡Hola {client_name}!</h2>
            <p>Tu cita ha sido registrada exitosamente. Pronto recibirás la confirmación definitiva.</p>
            <div style="background: #1a1c25; border-radius: 8px; padding: 20px; margin-top: 20px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0; color: #8a8578; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Servicio</td><td style="padding: 8px 0; text-align: right;">{service_name}</td></tr>
                    <tr><td style="padding: 8px 0; color: #8a8578; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Fecha</td><td style="padding: 8px 0; text-align: right;">{date}</td></tr>
                    <tr><td style="padding: 8px 0; color: #8a8578; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Hora</td><td style="padding: 8px 0; text-align: right;">{time}</td></tr>
                    <tr><td style="padding: 8px 0; color: #8a8578; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Profesional</td><td style="padding: 8px 0; text-align: right;">Dominique</td></tr>
                </table>
            </div>
        </div>
        <p style="text-align: center; color: #8a8578; font-size: 12px;">Este es un correo automático, por favor no responder.</p>
    </div>
    """
    send_email(client_email, subject, html)


def send_booking_confirmed(client_name: str, client_email: str, service_name: str, date: str, time: str):
    if not client_email:
        return
    client_name = escape(client_name)
    service_name = escape(service_name)
    subject = "¡Cita Confirmada! - Clínica Pewma"
    html = f"""
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d0f14; color: #ede8df; padding: 40px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #c4985a; font-size: 28px; margin: 0;">Clínica Pewma</h1>
            <p style="color: #8a8578; font-size: 12px; letter-spacing: 3px; text-transform: uppercase;">Estética & Bienestar</p>
        </div>
        <div style="background: #14161d; border: 1px solid #1e2028; border-radius: 8px; padding: 30px; margin-bottom: 20px;">
            <h2 style="color: #4ade80; margin-top: 0;">¡Tu cita ha sido confirmada!</h2>
            <p>Hola {client_name}, tu cita ha sido confirmada por nuestro equipo.</p>
            <div style="background: #1a1c25; border-radius: 8px; padding: 20px; margin-top: 20px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0; color: #8a8578; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Servicio</td><td style="padding: 8px 0; text-align: right;">{service_name}</td></tr>
                    <tr><td style="padding: 8px 0; color: #8a8578; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Fecha</td><td style="padding: 8px 0; text-align: right;">{date}</td></tr>
                    <tr><td style="padding: 8px 0; color: #8a8578; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Hora</td><td style="padding: 8px 0; text-align: right;">{time}</td></tr>
                    <tr><td style="padding: 8px 0; color: #8a8578; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Profesional</td><td style="padding: 8px 0; text-align: right;">Dominique</td></tr>
                </table>
            </div>
            <p style="margin-top: 20px;">Te esperamos. ¡Gracias por confiar en nosotros!</p>
        </div>
        <p style="text-align: center; color: #8a8578; font-size: 12px;">Este es un correo automático, por favor no responder.</p>
    </div>
    """
    send_email(client_email, subject, html)


def send_booking_cancelled(client_name: str, client_email: str, service_name: str, date: str, time: str):
    if not client_email:
        return
    client_name = escape(client_name)
    service_name = escape(service_name)
    subject = "Cita Cancelada - Clínica Pewma"
    html = f"""
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d0f14; color: #ede8df; padding: 40px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #c4985a; font-size: 28px; margin: 0;">Clínica Pewma</h1>
            <p style="color: #8a8578; font-size: 12px; letter-spacing: 3px; text-transform: uppercase;">Estética & Bienestar</p>
        </div>
        <div style="background: #14161d; border: 1px solid #1e2028; border-radius: 8px; padding: 30px; margin-bottom: 20px;">
            <h2 style="color: #f87171; margin-top: 0;">Cita Cancelada</h2>
            <p>Hola {client_name}, lamentamos informarte que tu cita ha sido cancelada.</p>
            <div style="background: #1a1c25; border-radius: 8px; padding: 20px; margin-top: 20px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0; color: #8a8578; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Servicio</td><td style="padding: 8px 0; text-align: right;">{service_name}</td></tr>
                    <tr><td style="padding: 8px 0; color: #8a8578; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Fecha</td><td style="padding: 8px 0; text-align: right;">{date}</td></tr>
                    <tr><td style="padding: 8px 0; color: #8a8578; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Hora</td><td style="padding: 8px 0; text-align: right;">{time}</td></tr>
                </table>
            </div>
            <p style="margin-top: 20px;">Por favor contáctanos para reagendar tu cita.</p>
        </div>
        <p style="text-align: center; color: #8a8578; font-size: 12px;">Este es un correo automático, por favor no responder.</p>
    </div>
    """
    send_email(client_email, subject, html)


def send_admin_new_booking_notification(client_name: str, client_phone: str, client_email: str, service_name: str, date: str, time: str):
    if not ADMIN_EMAIL:
        return
    client_name = escape(client_name)
    client_phone = escape(client_phone)
    client_email = escape(client_email)
    service_name = escape(service_name)
    subject = f"Nueva cita: {client_name} - {service_name}"
    html = f"""
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d0f14; color: #ede8df; padding: 40px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #c4985a; font-size: 28px; margin: 0;">Nueva Reserva</h1>
        </div>
        <div style="background: #14161d; border: 1px solid #1e2028; border-radius: 8px; padding: 30px;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #8a8578;">Cliente</td><td style="padding: 8px 0; text-align: right;">{client_name}</td></tr>
                <tr><td style="padding: 8px 0; color: #8a8578;">Teléfono</td><td style="padding: 8px 0; text-align: right;">{client_phone}</td></tr>
                <tr><td style="padding: 8px 0; color: #8a8578;">Email</td><td style="padding: 8px 0; text-align: right;">{client_email or 'No proporcionado'}</td></tr>
                <tr><td style="padding: 8px 0; color: #8a8578;">Servicio</td><td style="padding: 8px 0; text-align: right;">{service_name}</td></tr>
                <tr><td style="padding: 8px 0; color: #8a8578;">Fecha</td><td style="padding: 8px 0; text-align: right;">{date}</td></tr>
                <tr><td style="padding: 8px 0; color: #8a8578;">Hora</td><td style="padding: 8px 0; text-align: right;">{time}</td></tr>
            </table>
        </div>
    </div>
    """
    send_email(ADMIN_EMAIL, subject, html)
