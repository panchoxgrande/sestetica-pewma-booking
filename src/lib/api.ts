const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Error ${res.status}`);
  }
  return res.json();
}

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}

export async function createBooking(data: {
  service_id: string;
  service_name: string;
  date: string;
  time: string;
  client_name: string;
  client_phone: string;
  client_email: string;
}) {
  return request("/api/bookings", { method: "POST", body: JSON.stringify(data) });
}

export async function getAvailableTimes(date: string) {
  return request(`/api/bookings/available-times?date=${date}`);
}

export async function adminLogin(username: string, password: string) {
  return request("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function getAdminBookings(token: string, statusFilter?: string) {
  const params = statusFilter ? `?status_filter=${statusFilter}` : "";
  return request(`/api/admin/bookings${params}`, { headers: authHeaders(token) });
}

export async function updateBookingStatus(
  token: string,
  bookingId: number,
  status: string,
  adminNotes?: string
) {
  return request(`/api/admin/bookings/${bookingId}`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify({ status, admin_notes: adminNotes || "" }),
  });
}

export async function getAdminStats(token: string) {
  return request("/api/admin/stats", { headers: authHeaders(token) });
}

export async function changeAdminPassword(
  token: string,
  currentPassword: string,
  newPassword: string
) {
  return request("/api/admin/change-password", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
  });
}
