import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
  LogOut,
  Loader2,
  RefreshCw,
  Filter,
} from "lucide-react";
import { getAdminBookings, updateBookingStatus, getAdminStats } from "@/lib/api";
import logo from "@/assets/logo.png";

interface Booking {
  id: number;
  service_id: string;
  service_name: string;
  date: string;
  time: string;
  client_name: string;
  client_phone: string;
  client_email: string;
  status: string;
  admin_notes: string;
  created_at: string;
  updated_at: string;
}

interface Stats {
  total: number;
  pendiente: number;
  confirmada: number;
  cancelada: number;
}

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: typeof AlertCircle }> = {
  pendiente: { label: "Pendiente", color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20", icon: AlertCircle },
  confirmada: { label: "Confirmada", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20", icon: CheckCircle },
  cancelada: { label: "Cancelada", color: "text-red-400", bg: "bg-red-400/10 border-red-400/20", icon: XCircle },
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, pendiente: 0, confirmada: 0, cancelada: 0 });
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const token = localStorage.getItem("admin_token") || "";

  const fetchData = useCallback(async () => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    setLoading(true);
    try {
      const [bookingsData, statsData] = await Promise.all([
        getAdminBookings(token, filter || undefined),
        getAdminStats(token),
      ]);
      setBookings(bookingsData.bookings);
      setStats(statsData);
    } catch {
      localStorage.removeItem("admin_token");
      navigate("/admin/login");
    } finally {
      setLoading(false);
    }
  }, [token, filter, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleStatusChange = async (bookingId: number, newStatus: string) => {
    setUpdatingId(bookingId);
    try {
      await updateBookingStatus(token, bookingId, newStatus);
      await fetchData();
    } catch {
      alert("Error al actualizar el estado");
    } finally {
      setUpdatingId(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/30">
        <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Pewma" className="h-8 w-auto" />
            <span className="font-body text-xs text-muted-foreground uppercase tracking-wider hidden sm:inline">
              Panel Admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="p-2 rounded-lg hover:bg-secondary/30 text-muted-foreground hover:text-foreground transition-colors"
              title="Actualizar"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary/30 text-muted-foreground hover:text-foreground transition-colors font-body text-xs"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total", value: stats.total, color: "text-foreground" },
            { label: "Pendientes", value: stats.pendiente, color: "text-yellow-400" },
            { label: "Confirmadas", value: stats.confirmada, color: "text-emerald-400" },
            { label: "Canceladas", value: stats.cancelada, color: "text-red-400" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
              <p className={`font-display text-2xl ${stat.color}`}>{stat.value}</p>
              <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          {[
            { value: "", label: "Todas" },
            { value: "pendiente", label: "Pendientes" },
            { value: "confirmada", label: "Confirmadas" },
            { value: "cancelada", label: "Canceladas" },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 rounded-full font-body text-xs transition-all whitespace-nowrap ${
                filter === f.value
                  ? "bg-primary/15 border border-primary/30 text-primary"
                  : "bg-secondary/20 border border-border/20 text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20">
            <Calendar className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="font-body text-sm text-muted-foreground">No hay citas registradas</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {bookings.map((booking) => {
                const sc = statusConfig[booking.status] || statusConfig.pendiente;
                const StatusIcon = sc.icon;
                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="glass-card rounded-xl p-4 sm:p-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-body uppercase tracking-wider border ${sc.bg} ${sc.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {sc.label}
                          </span>
                          <span className="font-body text-[10px] text-muted-foreground/50">
                            #{booking.id}
                          </span>
                        </div>

                        <h3 className="font-display text-lg text-foreground mb-1 truncate">{booking.service_name}</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 mt-3">
                          <div className="flex items-center gap-2 text-sm">
                            <User className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                            <span className="font-body text-xs text-muted-foreground truncate">{booking.client_name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                            <span className="font-body text-xs text-muted-foreground">{booking.client_phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                            <span className="font-body text-xs text-muted-foreground">{booking.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                            <span className="font-body text-xs text-muted-foreground">{booking.time}</span>
                          </div>
                          {booking.client_email && (
                            <div className="flex items-center gap-2 text-sm sm:col-span-2">
                              <Mail className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                              <span className="font-body text-xs text-muted-foreground truncate">{booking.client_email}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex sm:flex-col gap-2 flex-shrink-0">
                        {booking.status !== "confirmada" && (
                          <button
                            onClick={() => handleStatusChange(booking.id, "confirmada")}
                            disabled={updatingId === booking.id}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all font-body text-xs disabled:opacity-50"
                          >
                            {updatingId === booking.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
                            Confirmar
                          </button>
                        )}
                        {booking.status !== "cancelada" && (
                          <button
                            onClick={() => handleStatusChange(booking.id, "cancelada")}
                            disabled={updatingId === booking.id}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all font-body text-xs disabled:opacity-50"
                          >
                            {updatingId === booking.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
                            Cancelar
                          </button>
                        )}
                        {booking.status !== "pendiente" && (
                          <button
                            onClick={() => handleStatusChange(booking.id, "pendiente")}
                            disabled={updatingId === booking.id}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20 transition-all font-body text-xs disabled:opacity-50"
                          >
                            {updatingId === booking.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <AlertCircle className="w-3.5 h-3.5" />}
                            Pendiente
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
