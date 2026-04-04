import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  { name: "Sarah Mitchell", role: "CTO", company: "TechNova", text: "OpsLogica transformed our entire workflow with their AI automation solutions. Our team's productivity increased by 40% within the first quarter." },
  { name: "James Chen", role: "Founder", company: "ScaleUp Inc", text: "Their end-to-end development approach saved us months. From MVP to launch, OpsLogica delivered a polished product that our investors loved." },
  { name: "Priya Sharma", role: "Operations Lead", company: "LogiTrack", text: "The business automation suite they built eliminated 30+ hours of manual work per week. ROI was visible within the first month." },
  { name: "Michael Torres", role: "CEO", company: "FinEdge", text: "Working with OpsLogica felt like having an in-house tech team. Their transparency and agile process kept us in the loop at every step." },
  { name: "Emily Rodriguez", role: "VP Engineering", company: "DataBridge", text: "As a partner firm, we've co-delivered multiple projects with OpsLogica. Their AI expertise and code quality are genuinely world-class." },
  { name: "Alex Kim", role: "Product Manager", company: "NexGen AI", text: "They didn't just build what we asked for — they challenged our assumptions and delivered something far better. True strategic partners." },
  { name: "David Park", role: "Director", company: "CloudSync", text: "The mobile app OpsLogica built exceeded our expectations. Clean UI, fast performance, and they even handled the App Store submission." },
  { name: "Lisa Wang", role: "COO", company: "VeloSoft", text: "Our CRM automation project was complex, but OpsLogica navigated it flawlessly. Integration with our existing tools was seamless." },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const perPage = 3;
  const maxPage = Math.ceil(testimonials.length / perPage) - 1;

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
              key={t.name + current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 relative"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{t.text}"</p>
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
