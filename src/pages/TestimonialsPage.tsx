import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTABanner from "@/components/CTABanner";
import { supabase } from "@/lib/supabase";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  industry: string;
  rating: number;
}

const stats = [
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "Projects Delivered" },
  { value: "4.9/5", label: "Average Rating" },
  { value: "85%", label: "Repeat Clients" },
];

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    supabase
      .from("testimonials")
      .select("id, name, role, company, quote, industry, rating")
      .eq("visible", true)
      .order("sort_order")
      .then(({ data }) => { if (data) setTestimonials(data); });
  }, []);

  return (
    <>
      <PageHeader
        label="Testimonials"
        title="What Our Clients"
        highlight="Say"
        description="Don't just take our word for it. Here's what our clients have to say about working with OPSLOGICA."
      />

      {/* Stats */}
      <section className="px-4 pb-16">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="text-2xl md:text-3xl font-heading font-bold gradient-text mb-1">{s.value}</div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Testimonials */}
      <section className="px-4 pb-20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 2) * 0.1 }}
                className="glass-card p-8 relative"
              >
                <Quote className="w-10 h-10 text-primary/10 absolute top-6 right-6" />
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-heading font-bold">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-muted-foreground">{t.role}, {t.company}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground/60 hidden sm:block">{t.industry}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
};

export default TestimonialsPage;
