import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, Check, Sparkles, ArrowLeft, ArrowRight, Mail, Loader2 } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { createBooking, getAvailableTimes } from "@/lib/api";

const serviceCategories = [
  {
    category: "Toxina Botulínica",
    items: [
      { id: "tercio-superior", name: "Tercio superior" },
      { id: "bruxismo", name: "Bruxismo" },
      { id: "baby-botox", name: "Baby botox" },
      { id: "cuello-nefertiti", name: "Cuello de Nefertiti" },
      { id: "hiperhidrosis", name: "Hiperhidrosis palmar o axilar" },
      { id: "sonrisa-gingival", name: "Sonrisa gingival" },
      { id: "menton-empedrado", name: "Mentón empedrado o de naranja" },
      { id: "bunnys-lines", name: "Bunnys lines o líneas de conejo" },
    ],
  },
  {
    category: "Ácido Hialurónico",
    items: [
      { id: "relleno-labios", name: "Relleno de labios" },
      { id: "relleno-menton", name: "Relleno de mentón" },
      { id: "relleno-pomulos", name: "Relleno de pómulos" },
      { id: "rinomodelacion", name: "Rinomodelación" },
      { id: "perfilado-mandibula", name: "Perfilado de mandíbula" },
    ],
  },
  {
    category: "Bioestimuladores",
    items: [
      { id: "sculptra", name: "Sculptra" },
      { id: "adn-salmon", name: "ADN de salmón" },
      { id: "bioestimulador-ojera", name: "Bioestimulador para ojera" },
    ],
  },
];

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"
];

const steps = [
  { id: 1, label: "Servicio", icon: Sparkles },
  { id: 2, label: "Fecha y Hora", icon: Calendar },
  { id: 3, label: "Datos", icon: User },
];

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableTimes, setAvailableTimes] = useState<string[]>(timeSlots);
  const [submitError, setSubmitError] = useState("");
  const selectedTimeRef = useRef(selectedTime);

  useEffect(() => {
    selectedTimeRef.current = selectedTime;
  }, [selectedTime]);

  useEffect(() => {
    if (selectedDate) {
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      getAvailableTimes(dateStr)
        .then((data) => {
          setAvailableTimes(data.available_times);
          if (selectedTimeRef.current && !data.available_times.includes(selectedTimeRef.current)) {
            setSelectedTime(null);
          }
        })
        .catch(() => setAvailableTimes(timeSlots));
    }
  }, [selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedTime || !name || !phone) return;
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const serviceName = serviceCategories.flatMap(c => c.items).find(s => s.id === selectedService)?.name || selectedService;
      await createBooking({
        service_id: selectedService,
        service_name: serviceName,
        date: format(selectedDate, "yyyy-MM-dd"),
        time: selectedTime,
        client_name: name,
        client_phone: phone,
        client_email: email,
      });
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Error al agendar. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    if (currentStep === 1) return !!selectedService;
    if (currentStep === 2) return !!selectedDate && !!selectedTime;
    if (currentStep === 3) return !!name && !!phone;
    return false;
  };

  if (isSubmitted) {
    return (
      <section id="agendar" className="py-28 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="glass-card rounded-2xl p-12 glow-gold-strong relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-10 h-10 text-primary" />
              </motion.div>

              <h3 className="font-display text-3xl text-foreground mb-3">
                ¡Cita Agendada!
              </h3>
              <p className="font-body text-sm text-muted-foreground mb-8">
                Tu cita ha sido reservada con éxito. Te contactaremos pronto para confirmar.
              </p>

              <div className="p-5 bg-secondary/30 rounded-xl text-left space-y-3 border border-border/30">
                <div className="flex justify-between items-center">
                  <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">Servicio</span>
                  <span className="font-body text-sm text-foreground">
                    {serviceCategories.flatMap(c => c.items).find(s => s.id === selectedService)?.name}
                  </span>
                </div>
                <div className="w-full h-px bg-border/30" />
                <div className="flex justify-between items-center">
                  <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">Fecha</span>
                  <span className="font-body text-sm text-foreground">
                    {selectedDate && format(selectedDate, "PPP", { locale: es })}
                  </span>
                </div>
                <div className="w-full h-px bg-border/30" />
                <div className="flex justify-between items-center">
                  <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">Hora</span>
                  <span className="font-body text-sm text-foreground">{selectedTime}</span>
                </div>
                <div className="w-full h-px bg-border/30" />
                <div className="flex justify-between items-center">
                  <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">Profesional</span>
                  <span className="font-body text-sm text-foreground">Dominique</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                  setSelectedService(null);
                  setSelectedDate(undefined);
                  setSelectedTime(null);
                  setName("");
                  setPhone("");
                  setEmail("");
                }}
                className="mt-8 btn-outline text-xs"
              >
                Agendar otra cita
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="agendar" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-body text-[11px] tracking-[0.3em] uppercase text-primary mb-4 block">
            Reservas
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-gradient-gold mb-6">
            Agenda tu Cita
          </h2>
          <div className="decorative-line mx-auto mb-6" />
          <p className="font-body text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Reserva tu tratamiento con Dominique
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-0 mb-12">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => {
                    if (step.id < currentStep) setCurrentStep(step.id);
                  }}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-full transition-all duration-500 ${
                    currentStep === step.id
                      ? "bg-primary/15 border border-primary/30"
                      : currentStep > step.id
                        ? "text-primary cursor-pointer"
                        : "text-muted-foreground/50"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-body font-medium transition-all duration-500 ${
                    currentStep === step.id
                      ? "bg-primary text-primary-foreground"
                      : currentStep > step.id
                        ? "bg-primary/20 text-primary"
                        : "bg-muted/50 text-muted-foreground/50"
                  }`}>
                    {currentStep > step.id ? <Check className="w-3.5 h-3.5" /> : step.id}
                  </div>
                  <span className="font-body text-xs tracking-wider uppercase hidden sm:inline">
                    {step.label}
                  </span>
                </button>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-px mx-2 transition-all duration-500 ${
                    currentStep > step.id ? "bg-primary/40" : "bg-border/50"
                  }`} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card rounded-2xl p-8 lg:p-10"
                >
                  <label className="flex items-center gap-2 font-body text-[11px] text-muted-foreground uppercase tracking-[0.2em] mb-6">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Selecciona un servicio
                  </label>
                  <div className="space-y-6">
                    {serviceCategories.map((category) => (
                      <div key={category.category}>
                        <p className="font-display text-lg text-foreground mb-3">
                          {category.category}
                        </p>
                        <div className="grid grid-cols-2 gap-2.5">
                          {category.items.map((service) => (
                            <button
                              key={service.id}
                              type="button"
                              onClick={() => setSelectedService(service.id)}
                              className={`p-3.5 text-left rounded-xl transition-all duration-300 ${
                                selectedService === service.id
                                  ? "bg-primary/10 border border-primary/40 glow-gold"
                                  : "bg-secondary/30 border border-border/30 hover:border-primary/20 hover:bg-secondary/50"
                              }`}
                            >
                              <p className="font-body text-xs text-foreground leading-relaxed">{service.name}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card rounded-2xl p-8 lg:p-10"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="flex items-center gap-2 font-body text-[11px] text-muted-foreground uppercase tracking-[0.2em] mb-6">
                        <Calendar className="w-4 h-4 text-primary" />
                        Selecciona fecha
                      </label>
                      <div className="p-4 bg-secondary/20 rounded-xl border border-border/20">
                        <CalendarComponent
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          locale={es}
                          disabled={(date) => date < new Date() || date.getDay() === 0}
                          className="mx-auto"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 font-body text-[11px] text-muted-foreground uppercase tracking-[0.2em] mb-6">
                        <Clock className="w-4 h-4 text-primary" />
                        Selecciona horario
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {availableTimes.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`py-4 px-4 text-center rounded-xl font-body text-sm transition-all duration-300 ${
                              selectedTime === time
                                ? "bg-primary/10 border border-primary/40 text-foreground glow-gold"
                                : "bg-secondary/20 border border-border/20 text-muted-foreground hover:border-primary/20 hover:text-foreground"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                      <p className="font-body text-[10px] text-muted-foreground/60 mt-4 tracking-wider uppercase text-center">
                        Cada sesión dura 1 hora
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card rounded-2xl p-8 lg:p-10"
                >
                  <label className="flex items-center gap-2 font-body text-[11px] text-muted-foreground uppercase tracking-[0.2em] mb-8">
                    <User className="w-4 h-4 text-primary" />
                    Tus datos
                  </label>

                  <div className="max-w-md mx-auto space-y-6">
                    <div>
                      <label className="block font-body text-xs text-muted-foreground uppercase tracking-wider mb-2">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-5 py-3.5 bg-secondary/20 border border-border/20 rounded-xl font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                        placeholder="Tu nombre"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs text-muted-foreground uppercase tracking-wider mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-5 py-3.5 bg-secondary/20 border border-border/20 rounded-xl font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                        placeholder="+56 9 1234 5678"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-body text-xs text-muted-foreground uppercase tracking-wider mb-2">
                        Email (opcional)
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-11 pr-5 py-3.5 bg-secondary/20 border border-border/20 rounded-xl font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                          placeholder="tu@email.com"
                        />
                      </div>
                      <p className="font-body text-[10px] text-muted-foreground/50 mt-1.5">Para recibir confirmación por correo</p>
                    </div>

                    <div className="p-5 bg-secondary/10 rounded-xl border border-border/10 space-y-2.5 mt-8">
                      <p className="font-body text-[10px] uppercase tracking-[0.2em] text-primary mb-3">Resumen de tu cita</p>
                      <div className="flex justify-between">
                        <span className="font-body text-xs text-muted-foreground">Servicio</span>
                        <span className="font-body text-xs text-foreground">
                          {serviceCategories.flatMap(c => c.items).find(s => s.id === selectedService)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-body text-xs text-muted-foreground">Fecha</span>
                        <span className="font-body text-xs text-foreground">
                          {selectedDate && format(selectedDate, "PPP", { locale: es })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-body text-xs text-muted-foreground">Hora</span>
                        <span className="font-body text-xs text-foreground">{selectedTime}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between mt-8">
              <button
                type="button"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                className={`flex items-center gap-2 font-body text-xs tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 ${
                  currentStep === 1 ? "invisible" : ""
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={() => canProceed() && setCurrentStep(currentStep + 1)}
                  disabled={!canProceed()}
                  className={`flex items-center gap-2 transition-all duration-500 ${
                    canProceed()
                      ? "btn-primary"
                      : "px-8 py-3.5 font-body text-sm font-medium tracking-widest uppercase rounded-md bg-muted/50 text-muted-foreground/50 cursor-not-allowed"
                  }`}
                >
                  Siguiente
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!canProceed()}
                  className={`transition-all duration-500 ${
                    canProceed()
                      ? "btn-primary animate-pulse-glow"
                      : "px-8 py-3.5 font-body text-sm font-medium tracking-widest uppercase rounded-md bg-muted/50 text-muted-foreground/50 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Agendando...
                    </span>
                  ) : "Confirmar Cita"}
                </button>
              )}
            </div>

            {submitError && (
              <p className="mt-4 text-center font-body text-sm text-red-400">{submitError}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Booking;
