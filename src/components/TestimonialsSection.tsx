import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    supabase
      .from("testimonials")
      .select("id, name, role, company, quote, rating")
      .eq("visible", true)
      .order("sort_order")
      .then(({ data }) => { if (data) setTestimonials(data); });
  }, []);

  const perPage = 3;
  const maxPage = Math.max(0, Math.ceil(testimonials.length / perPage) - 1);

  if (!testimonials.length) return null;

  return (
    <section id="testimonials" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase mb-3">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            What Our Clients <span className="gradient-text">Say</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {testimonials.slice(current * perPage, current * perPage + perPage).map((t, i) => (
            <motion.div
              key={t.id + current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 relative"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-heading font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-3">
          <button onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0} className="p-2 rounded-lg bg-secondary text-muted-foreground disabled:opacity-30 hover:text-foreground transition-colors" aria-label="Previous">
            <ChevronLeft className="w-5 h-5" />
          </button>
          {[...Array(maxPage + 1)].map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${current === i ? "bg-primary w-6" : "bg-secondary"}`} aria-label={`Page ${i + 1}`} />
          ))}
          <button onClick={() => setCurrent(Math.min(maxPage, current + 1))} disabled={current === maxPage} className="p-2 rounded-lg bg-secondary text-muted-foreground disabled:opacity-30 hover:text-foreground transition-colors" aria-label="Next">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
