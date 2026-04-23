import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const BOOKING_URL =
  "https://centrodeesteticadedominiquenavarro1.site.agendapro.com/cl/sucursal/494210";

const Booking = () => {
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
            Reserva tu tratamiento con Dominique en línea
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="overflow-hidden rounded-lg border border-primary/30 bg-card glow-gold">
            <iframe
              src={BOOKING_URL}
              title="Agenda tu cita"
              className="w-full h-[900px] border-0"
              loading="lazy"
              allow="payment; geolocation"
            />
          </div>

          <div className="text-center mt-6">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-primary/50 text-primary font-body text-sm font-medium tracking-wide rounded-sm hover:bg-primary/10 transition-colors duration-300"
            >
              Abrir agenda en una nueva ventana
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Booking;
