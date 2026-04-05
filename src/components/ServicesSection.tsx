import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Bot, Code2, Globe, Cog, ChevronRight, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { LucideIcon } from "lucide-react";

interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  icon: string;
  features: string[];
}

const iconMap: Record<string, LucideIcon> = { Bot, Code2, Globe, Cog };

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [openModal, setOpenModal] = useState<number | null>(null);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    supabase
      .from("services")
      .select("id, title, slug, short_description, icon, features")
      .order("sort_order")
      .then(({ data }) => { if (data) setServices(data); });
  }, []);

  if (!services.length) return null;

  return (
    <section id="services" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <p className="text-primary text-sm font-semibold tracking-wide uppercase mb-3">Our Expertise</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            What We <span className="gradient-text">Do</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] || Bot;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="glass-card-hover p-8 group cursor-pointer"
                onClick={() => setOpenModal(i)}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.short_description}</p>
                <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn More <ChevronRight className="w-4 h-4" />
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {openModal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={() => setOpenModal(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setOpenModal(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
            {(() => { const Icon = iconMap[services[openModal].icon] || Bot; return (
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-primary" />
              </div>
            ); })()}
            <h3 className="text-xl font-heading font-bold mb-4">{services[openModal].title}</h3>
            <ul className="space-y-3">
              {services[openModal].features?.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default ServicesSection;
