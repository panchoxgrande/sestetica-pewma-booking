import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Check } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const services = [
  { id: "botox", name: "Toxina Botulínica", duration: "1 hora" },
  { id: "hialuronico", name: "Ácido Hialurónico", duration: "1 hora" },
  { id: "radiofrecuencia", name: "Radiofrecuencia", duration: "1 hora" },
  { id: "bioestimulacion", name: "Bioestimulación", duration: "1 hora" },
];

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"
];

const Booking = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedService && selectedDate && selectedTime && name && phone) {
      setIsSubmitted(true);
    }
  };

  const isFormComplete = selectedService && selectedDate && selectedTime && name && phone;

  if (isSubmitted) {
    return (
      <section id="agendar" className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center p-12 bg-card border border-primary/30 rounded-lg glow-gold"
          >
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-display text-3xl text-foreground mb-4">
              ¡Cita Agendada!
            </h3>
            <p className="font-body text-muted-foreground mb-6">
              Tu cita ha sido reservada con éxito. Te contactaremos pronto para confirmar.
            </p>
            <div className="p-4 bg-secondary/50 rounded-lg text-left space-y-2">
              <p className="font-body text-sm text-foreground">
                <span className="text-muted-foreground">Servicio:</span>{" "}
                {services.find(s => s.id === selectedService)?.name}
              </p>
              <p className="font-body text-sm text-foreground">
                <span className="text-muted-foreground">Fecha:</span>{" "}
                {selectedDate && format(selectedDate, "PPP", { locale: es })}
              </p>
              <p className="font-body text-sm text-foreground">
                <span className="text-muted-foreground">Hora:</span> {selectedTime}
              </p>
              <p className="font-body text-sm text-foreground">
                <span className="text-muted-foreground">Atendido por:</span> Dominique
              </p>
            </div>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setSelectedService(null);
                setSelectedDate(undefined);
                setSelectedTime(null);
                setName("");
                setPhone("");
              }}
              className="mt-6 px-6 py-2.5 border border-primary/50 text-primary font-body text-sm font-medium tracking-wide rounded-sm hover:bg-primary/10 transition-colors duration-300"
            >
              Agendar otra cita
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="agendar" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-light text-gradient-gold mb-4">
            Agenda tu Cita
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Reserva tu tratamiento con Dominique • Cada sesión dura 1 hora
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left column */}
            <div className="space-y-8">
              {/* Service selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <label className="flex items-center gap-2 font-body text-sm text-muted-foreground uppercase tracking-wider mb-4">
                  <User className="w-4 h-4" />
                  Selecciona un servicio
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setSelectedService(service.id)}
                      className={`p-4 text-left border rounded-lg transition-all duration-300 ${
                        selectedService === service.id
                          ? "border-primary bg-primary/10 glow-gold"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <p className="font-display text-sm text-foreground">{service.name}</p>
                      <p className="font-body text-xs text-muted-foreground mt-1">{service.duration}</p>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Time selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <label className="flex items-center gap-2 font-body text-sm text-muted-foreground uppercase tracking-wider mb-4">
                  <Clock className="w-4 h-4" />
                  Selecciona horario
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 px-2 text-center border rounded-lg font-body text-sm transition-all duration-300 ${
                        selectedTime === time
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4"
              >
                <div>
                  <label className="block font-body text-sm text-muted-foreground uppercase tracking-wider mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg font-body text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div>
                  <label className="block font-body text-sm text-muted-foreground uppercase tracking-wider mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg font-body text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                    placeholder="+56 9 1234 5678"
                    required
                  />
                </div>
              </motion.div>
            </div>

            {/* Right column - Calendar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <label className="flex items-center gap-2 font-body text-sm text-muted-foreground uppercase tracking-wider mb-4">
                <Calendar className="w-4 h-4" />
                Selecciona fecha
              </label>
              <div className="p-4 bg-card border border-border rounded-lg">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  locale={es}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  className="mx-auto"
                />
              </div>
            </motion.div>
          </div>

          {/* Submit button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 text-center"
          >
            <button
              type="submit"
              disabled={!isFormComplete}
              className={`px-12 py-4 font-body text-sm font-medium tracking-widest uppercase rounded-sm transition-all duration-300 ${
                isFormComplete
                  ? "bg-primary text-primary-foreground hover:bg-gold-glow glow-gold"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              Confirmar Cita
            </button>
          </motion.div>
        </form>
      </div>
    </section>
  );
};

export default Booking;
