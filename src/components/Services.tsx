import { motion } from "framer-motion";
import { Sparkles, Syringe, Zap, Heart } from "lucide-react";

const services = [
  {
    icon: Syringe,
    title: "Toxina Botulínica",
    description: "Tratamiento para suavizar líneas de expresión y arrugas, logrando un aspecto natural y rejuvenecido.",
    duration: "1 hora",
  },
  {
    icon: Sparkles,
    title: "Ácido Hialurónico",
    description: "Relleno dérmico para restaurar volumen, hidratar la piel y definir contornos faciales.",
    duration: "1 hora",
  },
  {
    icon: Zap,
    title: "Radiofrecuencia",
    description: "Tecnología avanzada para estimular colágeno, reafirmar y rejuvenecer la piel sin cirugía.",
    duration: "1 hora",
  },
  {
    icon: Heart,
    title: "Bioestimulación",
    description: "Tratamientos regenerativos que estimulan la producción natural de colágeno y elastina.",
    duration: "1 hora",
  },
];

const Services = () => {
  return (
    <section id="servicios" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-light text-gradient-gold mb-4">
            Nuestros Servicios
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Tratamientos de alta calidad realizados por profesionales certificados
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 bg-card/50 border border-border rounded-lg hover:border-primary/50 transition-all duration-500 hover:glow-gold"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              
              <h3 className="font-display text-2xl text-foreground mb-3">
                {service.title}
              </h3>
              
              <p className="font-body text-sm text-muted-foreground mb-4 line-clamp-3">
                {service.description}
              </p>
              
              <div className="flex items-center gap-2 text-xs font-body text-primary uppercase tracking-wider">
                <span className="w-4 h-px bg-primary" />
                Duración: {service.duration}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
