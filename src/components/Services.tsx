import { motion } from "framer-motion";
import { Syringe, Sparkles, Heart, ArrowRight } from "lucide-react";

const serviceCategories = [
  {
    icon: Syringe,
    title: "Toxina Botulínica",
    description: "Resultados naturales para una apariencia rejuvenecida",
    items: [
      "Tercio superior",
      "Bruxismo",
      "Baby botox",
      "Cuello de Nefertiti",
      "Hiperhidrosis palmar o axilar",
      "Sonrisa gingival",
      "Mentón empedrado o de naranja",
      "Bunnys lines o líneas de conejo",
    ],
  },
  {
    icon: Sparkles,
    title: "Ácido Hialurónico",
    description: "Volumen y definición con resultados inmediatos",
    items: [
      "Relleno de labios",
      "Relleno de mentón",
      "Relleno de pómulos",
      "Rinomodelación",
      "Perfilado de mandíbula",
    ],
  },
  {
    icon: Heart,
    title: "Bioestimuladores",
    description: "Regeneración natural para una piel radiante",
    items: [
      "Sculptra",
      "ADN de salmón",
      "Bioestimulador para ojera",
    ],
  },
];

const Services = () => {
  return (
    <section id="servicios" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-body text-[11px] tracking-[0.3em] uppercase text-primary mb-4 block"
          >
            Tratamientos
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-gradient-gold mb-6">
            Nuestros Servicios
          </h2>
          <div className="decorative-line mx-auto mb-6" />
          <p className="font-body text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Tratamientos de alta calidad realizados por profesionales certificados,
            diseñados para realzar tu belleza natural
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {serviceCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="group glass-card glass-card-hover rounded-xl p-8 lg:p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/3 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/8 transition-all duration-700" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mb-7 group-hover:from-primary/25 group-hover:to-primary/10 transition-all duration-500">
                  <category.icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="font-display text-2xl lg:text-[1.7rem] text-foreground mb-2">
                  {category.title}
                </h3>

                <p className="font-body text-xs text-muted-foreground mb-6">
                  {category.description}
                </p>

                <ul className="space-y-2.5 mb-8">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 font-body text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                      <span className="w-1 h-1 rounded-full bg-primary/60 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-5 border-t border-border/30">
                  <span className="font-body text-[10px] text-primary/80 uppercase tracking-[0.2em]">
                    Duración: 1 hora
                  </span>
                  <a
                    href="#agendar"
                    className="flex items-center gap-1.5 text-primary font-body text-xs tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0"
                  >
                    Agendar
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
