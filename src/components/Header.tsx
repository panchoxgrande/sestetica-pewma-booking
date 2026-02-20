import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Galería", href: "#galeria" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-dark border-b border-border/50 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-3 group">
              <img
                src={logo}
                alt="Pewma Clínica Estética"
                className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            <ul className="hidden md:flex items-center gap-10 font-body text-[13px] tracking-[0.15em] uppercase">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <a
                href="#agendar"
                className="hidden md:inline-block btn-primary text-xs"
              >
                Agendar Cita
              </a>

              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center text-foreground"
                aria-label="Toggle menu"
              >
                {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 glass-dark pt-24"
          >
            <nav className="container mx-auto px-6">
              <ul className="flex flex-col gap-6 font-body text-lg">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="text-foreground hover:text-primary transition-colors duration-300 tracking-wider uppercase text-sm font-medium flex items-center gap-3"
                    >
                      <span className="w-8 h-px bg-primary/50" />
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-10">
                <a
                  href="#agendar"
                  onClick={() => setIsMobileOpen(false)}
                  className="btn-primary inline-block text-center w-full"
                >
                  Agendar Cita
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
