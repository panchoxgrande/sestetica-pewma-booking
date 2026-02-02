import { motion } from "framer-motion";
import logo from "@/assets/logo.jpeg";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-border"
    >
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <img src={logo} alt="Pewma Clínica Estética" className="h-12 w-auto" />
          </a>
          
          <ul className="hidden md:flex items-center gap-8 font-body text-sm tracking-wide">
            <li>
              <a href="#inicio" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                Inicio
              </a>
            </li>
            <li>
              <a href="#servicios" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                Servicios
              </a>
            </li>
            <li>
              <a href="#nosotros" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                Nosotros
              </a>
            </li>
            <li>
              <a href="#galeria" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                Galería
              </a>
            </li>
          </ul>

          <a
            href="#agendar"
            className="px-6 py-2.5 bg-primary text-primary-foreground font-body text-sm font-medium tracking-wide rounded-sm hover:bg-gold-glow transition-colors duration-300"
          >
            Agendar Cita
          </a>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
