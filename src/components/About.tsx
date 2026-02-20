import { motion } from "framer-motion";
import { Award, Shield, Sparkles } from "lucide-react";
import reception from "@/assets/reception.jpeg";

const highlights = [
  { icon: Award, label: "Certificada" },
  { icon: Shield, label: "Seguridad" },
  { icon: Sparkles, label: "Excelencia" },
];

const About = () => {
  return (
    <section id="nosotros" className="py-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-body text-[11px] tracking-[0.3em] uppercase text-primary mb-4 block">
              Sobre nosotros
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-gradient-gold mb-4">
              Bienvenidos a Pewma
            </h2>
            <div className="decorative-line mb-8" />

            <div className="space-y-5 font-body text-muted-foreground text-sm md:text-base leading-relaxed">
              <p>
                En Clínica Estética Pewma creemos que cada persona merece sentirse bien consigo misma.
                Nuestro nombre, que significa <span className="text-primary italic font-accent text-lg">"sueño"</span> en mapudungun,
                refleja nuestro compromiso de ayudarte a alcanzar la versión que siempre soñaste de ti.
              </p>
              <p>
                Contamos con instalaciones modernas y equipamiento de última generación,
                brindando un ambiente cálido y profesional donde tu bienestar es nuestra prioridad.
              </p>
            </div>

            <div className="flex items-center gap-8 mt-8 mb-10">
              {highlights.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-primary" />
                  <span className="font-body text-xs tracking-wider uppercase text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="glass-card rounded-xl p-7 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent" />
              <div className="pl-4">
                <h3 className="font-display text-xl text-foreground mb-1">
                  Dra. Dominique
                </h3>
                <p className="font-body text-[11px] text-primary uppercase tracking-[0.2em] mb-3">
                  Especialista en Medicina Estética
                </p>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  Profesional dedicada a ofrecer tratamientos personalizados con los más altos
                  estándares de calidad y seguridad.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 rounded-2xl blur-3xl" />
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={reception}
                alt="Recepción Clínica Pewma"
                className="w-full h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -left-6 glass-card rounded-xl px-6 py-4 glow-gold"
            >
              <p className="font-accent text-lg italic text-foreground/90">
                "Tu bienestar, nuestro compromiso"
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
