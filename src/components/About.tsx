import { motion } from "framer-motion";
import reception from "@/assets/reception.jpeg";

const About = () => {
  return (
    <section id="nosotros" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-light text-gradient-gold mb-6">
              Bienvenidos a Pewma
            </h2>
            
            <div className="space-y-4 font-body text-muted-foreground">
              <p>
                En Clínica Estética Pewma creemos que cada persona merece sentirse bien consigo misma. 
                Nuestro nombre, que significa "sueño" en mapudungun, refleja nuestro compromiso de 
                ayudarte a alcanzar la versión que siempre soñaste de ti.
              </p>
              <p>
                Contamos con instalaciones modernas y equipamiento de última generación, 
                brindando un ambiente cálido y profesional donde tu bienestar es nuestra prioridad.
              </p>
            </div>

            <div className="mt-8 p-6 bg-card/50 border border-border rounded-lg">
              <h3 className="font-display text-xl text-foreground mb-2">
                Dra. Dominique
              </h3>
              <p className="font-body text-sm text-primary uppercase tracking-wider mb-3">
                Especialista en Medicina Estética
              </p>
              <p className="font-body text-sm text-muted-foreground">
                Profesional dedicada a ofrecer tratamientos personalizados con los más altos 
                estándares de calidad y seguridad.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-transparent to-gold/10 rounded-lg blur-2xl" />
            <img
              src={reception}
              alt="Recepción Clínica Pewma"
              className="relative w-full h-[500px] object-cover rounded-lg border border-border"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
