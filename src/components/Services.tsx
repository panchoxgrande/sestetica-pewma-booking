import { motion } from "framer-motion";
import { Syringe, Sparkles, Heart } from "lucide-react";

const serviceCategories = [
  {
    icon: Syringe,
    title: "Toxina Botulínica",
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
    items: [
      "Sculptra",
      "ADN de salmón",
      "Bioestimulador para ojera",
    ],
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

        <div className="grid md:grid-cols-3 gap-8">
          {serviceCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group p-8 bg-card/50 border border-border rounded-lg hover:border-primary/50 transition-all duration-500 hover:glow-gold"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <category.icon className="w-7 h-7 text-primary" />
              </div>
              
              <h3 className="font-display text-2xl text-foreground mb-5">
                {category.title}
              </h3>
              
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                    {item}
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center gap-2 text-xs font-body text-primary uppercase tracking-wider mt-6 pt-4 border-t border-border/50">
                <span className="w-4 h-px bg-primary" />
                Duración: 1 hora
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
