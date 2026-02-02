import { MapPin, Phone, Clock, Instagram } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="py-16 bg-card/50 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo & description */}
          <div>
            <img src={logo} alt="Pewma Clínica Estética" className="h-16 w-auto mb-4" />
            <p className="font-body text-sm text-muted-foreground">
              Tu espacio de belleza y bienestar. Tratamientos personalizados con los más altos estándares de calidad.
            </p>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-display text-xl text-foreground mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 font-body text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Santiago, Chile</span>
              </li>
              <li className="flex items-center gap-3 font-body text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+56 9 XXXX XXXX</span>
              </li>
              <li className="flex items-center gap-3 font-body text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                <span>Lun - Sáb: 9:00 - 18:00</span>
              </li>
            </ul>
          </div>

          {/* Social & quick links */}
          <div>
            <h4 className="font-display text-xl text-foreground mb-4">Síguenos</h4>
            <a
              href="#"
              className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
              @clinicapewma
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="font-body text-xs text-muted-foreground">
            © 2026 Clínica Estética Pewma. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
