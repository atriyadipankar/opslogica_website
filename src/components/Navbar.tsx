import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-background/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
        <a href="#home" className="flex items-center group">
          <span className="text-white text-xl md:text-2xl tracking-[0.25em] font-light" style={{ fontFamily: "'Century Gothic', 'Avant Garde', sans-serif" }}>
            OPSL
          </span>
          {/* Cloud + Gear icon replacing the "O" */}
          <svg className="w-6 h-6 md:w-7 md:h-7 text-white mx-[1px] -mt-1" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M48 28a12 12 0 00-11.3-8A14 14 0 0013 28a10 10 0 001 20h34a8 8 0 000-16z" fill="none" stroke="currentColor" strokeWidth="2.5"/>
            <circle cx="32" cy="36" r="8" fill="none" stroke="currentColor" strokeWidth="2.5"/>
            <path d="M32 28v3M32 41v3M24 36h3M37 36h3M26.3 30.3l2.1 2.1M35.6 39.6l2.1 2.1M26.3 41.7l2.1-2.1M35.6 32.4l2.1-2.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M29 35l3 3 3-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-white text-xl md:text-2xl tracking-[0.25em] font-light" style={{ fontFamily: "'Century Gothic', 'Avant Garde', sans-serif" }}>
            GICA
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <a href="#contact" className="glow-button text-sm">
            Get a Free Consultation
          </a>
        </div>

        <button
          className="lg:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border/50"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href="#contact" className="glow-button text-sm text-center mt-2" onClick={() => setMobileOpen(false)}>
                Get a Free Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
