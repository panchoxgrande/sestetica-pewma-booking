import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import reception from "@/assets/reception.jpeg";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={reception}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </div>

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-gold/3 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <img
              src={logo}
              alt="Pewma Clínica Estética"
              className="w-56 md:w-72 lg:w-80 h-auto drop-shadow-[0_0_40px_rgba(186,155,100,0.15)]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="decorative-line mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-accent text-2xl md:text-3xl lg:text-4xl text-foreground/80 italic max-w-2xl mb-4 leading-relaxed"
          >
            Descubre tu mejor versión
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="font-body text-sm md:text-base text-muted-foreground tracking-wider max-w-lg mb-10"
          >
            Tratamientos estéticos personalizados con los más altos estándares de calidad
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#agendar" className="btn-primary">
              Reservar Ahora
            </a>
            <a href="#servicios" className="btn-outline">
              Ver Servicios
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <a href="#servicios" className="flex flex-col items-center gap-2 group">
          <span className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground/60 group-hover:text-primary transition-colors duration-300">
            Explorar
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-primary/50 to-transparent relative overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-primary"
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
