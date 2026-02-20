import { MapPin, Phone, Clock, Instagram, Mail, Heart } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="relative pt-20 pb-8">
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-card/50 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-4">
            <img src={logo} alt="Pewma Clínica Estética" className="h-14 w-auto mb-5" />
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
              Tu espacio de belleza y bienestar. Tratamientos personalizados con los más altos estándares de calidad.
            </p>
            <a
              href="https://www.instagram.com/clinicapewma"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-secondary/30 border border-border/20 font-body text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 group"
            >
              <Instagram className="w-4 h-4 group-hover:text-primary transition-colors" />
              @clinicapewma
            </a>
          </div>

          <div className="md:col-span-4 md:col-start-6">
            <h4 className="font-display text-lg text-foreground mb-5">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 font-body text-sm text-muted-foreground group">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="group-hover:text-foreground/80 transition-colors">Santiago, Chile</span>
              </li>
              <li className="flex items-start gap-3 font-body text-sm text-muted-foreground group">
                <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="group-hover:text-foreground/80 transition-colors">+56 9 XXXX XXXX</span>
              </li>
              <li className="flex items-start gap-3 font-body text-sm text-muted-foreground group">
                <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="group-hover:text-foreground/80 transition-colors">contacto@clinicapewma.cl</span>
              </li>
              <li className="flex items-start gap-3 font-body text-sm text-muted-foreground group">
                <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="group-hover:text-foreground/80 transition-colors">Lun - Sáb: 9:00 - 18:00</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <h4 className="font-display text-lg text-foreground mb-5">Navegación</h4>
            <ul className="space-y-3">
              {["Inicio", "Servicios", "Nosotros", "Galería", "Agendar"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                    className="font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-[11px] text-muted-foreground/60 tracking-wider">
            &copy; {new Date().getFullYear()} Clínica Estética Pewma. Todos los derechos reservados.
          </p>
          <p className="font-body text-[11px] text-muted-foreground/40 flex items-center gap-1">
            Hecho con <Heart className="w-3 h-3 text-primary/50" /> en Chile
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
