import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import room1 from "@/assets/room-1.jpeg";
import room2 from "@/assets/room-2.jpeg";
import reception from "@/assets/reception.jpeg";

const images = [
  { src: room1, alt: "Sala de tratamientos 1", span: "md:col-span-1 md:row-span-2" },
  { src: room2, alt: "Sala de tratamientos 2", span: "md:col-span-1" },
  { src: reception, alt: "Recepción", span: "md:col-span-1" },
];

const Gallery = () => {
  return (
    <section id="galeria" className="py-28 relative">
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
          <span className="font-body text-[11px] tracking-[0.3em] uppercase text-primary mb-4 block">
            Galería
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-gradient-gold mb-6">
            Nuestras Instalaciones
          </h2>
          <div className="decorative-line mx-auto mb-6" />
          <p className="font-body text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Espacios diseñados para tu confort y bienestar
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 md:grid-rows-2 gap-4 lg:gap-5 max-w-5xl mx-auto">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`group relative overflow-hidden rounded-xl ${image.span} ${
                index === 0 ? "aspect-[3/4] md:aspect-auto" : "aspect-[4/3]"
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

              <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-xl" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/30 scale-75 group-hover:scale-100 transition-transform duration-500">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <p className="font-display text-base text-foreground">{image.alt}</p>
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-primary/70 mt-1 block">
                  Clínica Pewma
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
