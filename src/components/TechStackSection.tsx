import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const categories = [
  { label: "Frontend", techs: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"] },
  { label: "Backend", techs: ["Node.js", "Python", "Django", "FastAPI", "Express"] },
  { label: "Mobile", techs: ["Flutter", "React Native", "Swift", "Kotlin"] },
  { label: "AI & ML", techs: ["OpenAI", "LangChain", "TensorFlow", "PyTorch", "Hugging Face"] },
  { label: "Cloud & DevOps", techs: ["AWS", "GCP", "Docker", "Kubernetes", "Vercel"] },
  { label: "Automation", techs: ["Zapier", "Make", "n8n", "Power Automate"] },
  { label: "Design", techs: ["Figma", "Framer"] },
  { label: "Database", techs: ["PostgreSQL", "MongoDB", "Redis", "Firebase"] },
];

const TechStackSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding border-t border-border/30" ref={ref}>
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase mb-3">Technology</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Our Technology <span className="gradient-text">Arsenal</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-5"
            >
              <h4 className="text-xs font-semibold text-primary tracking-wide uppercase mb-3">{cat.label}</h4>
              <div className="flex flex-wrap gap-2">
                {cat.techs.map((t) => (
                  <span key={t} className="px-3 py-1.5 text-xs rounded-md bg-secondary text-muted-foreground font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
