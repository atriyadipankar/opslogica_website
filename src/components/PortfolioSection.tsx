import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  outcome: string;
}

const filters = ["All", "AI & Automation", "Web & Mobile", "Software", "Business Automation"];
const colors = ["from-primary/20 to-primary/5", "from-cyan-glow/20 to-primary/5", "from-primary/10 to-cyan-glow/10"];

const PortfolioSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("All");
  const [caseStudy, setCaseStudy] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    supabase
      .from("projects")
      .select("id, title, category, description, problem, solution, outcome")
      .eq("featured", true)
      .order("sort_order")
      .then(({ data }) => { if (data) setProjects(data); });
  }, []);

  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  if (!projects.length) return null;

  return (
    <section id="portfolio" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-10">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase mb-3">Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Our Work <span className="gradient-text">Speaks</span> for Itself
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFilter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="glass-card-hover overflow-hidden group cursor-pointer"
              onClick={() => setCaseStudy(projects.indexOf(p))}
            >
              <div className={`h-48 bg-gradient-to-br ${colors[i % 3]} flex items-center justify-center`}>
                <span className="text-4xl font-heading font-bold text-primary/30">{p.title.charAt(0)}{p.title.charAt(p.title.indexOf(" ") + 1) || ""}</span>
              </div>
              <div className="p-6">
                <span className="text-xs text-primary font-medium">{p.category}</span>
                <h3 className="text-lg font-heading font-bold mt-1 mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{p.description}</p>
                <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Case Study <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {caseStudy !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={() => setCaseStudy(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 max-w-lg w-full relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setCaseStudy(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground" aria-label="Close"><X className="w-5 h-5" /></button>
            <span className="text-xs text-primary font-medium">{projects[caseStudy].category}</span>
            <h3 className="text-xl font-heading font-bold mt-1 mb-6">{projects[caseStudy].title}</h3>
            <div className="space-y-4">
              <div><h4 className="text-sm font-semibold text-primary mb-1">Problem</h4><p className="text-sm text-muted-foreground">{projects[caseStudy].problem}</p></div>
              <div><h4 className="text-sm font-semibold text-primary mb-1">Solution</h4><p className="text-sm text-muted-foreground">{projects[caseStudy].solution}</p></div>
              <div><h4 className="text-sm font-semibold text-primary mb-1">Outcome</h4><p className="text-sm text-muted-foreground">{projects[caseStudy].outcome}</p></div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
