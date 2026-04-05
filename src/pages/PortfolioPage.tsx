import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTABanner from "@/components/CTABanner";
import { supabase } from "@/lib/supabase";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  outcome: string;
  tech_stack: string[];
  duration: string;
  team: string;
}

const filters = ["All", "AI & Automation", "Web & Mobile", "Software", "Business Automation"];
const colors = ["from-primary/20 to-primary/5", "from-cyan-glow/20 to-primary/5", "from-primary/10 to-cyan-glow/10"];

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    supabase
      .from("projects")
      .select("id, title, category, description, problem, solution, outcome, tech_stack, duration, team")
      .order("sort_order")
      .then(({ data }) => { if (data) setProjects(data); });
  }, []);

  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      <PageHeader
        label="Our Portfolio"
        title="Our Work"
        highlight="Speaks"
        description="Real projects, real results. Explore our case studies to see how we've helped businesses transform with technology."
      />

      {/* Filters */}
      <section className="px-4 pb-6">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => { setActiveFilter(f); setSelectedProject(null); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeFilter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="px-4 pb-12">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass-card-hover overflow-hidden group cursor-pointer"
                onClick={() => setSelectedProject(projects.indexOf(p))}
              >
                <div className={`h-48 bg-gradient-to-br ${colors[i % 3]} flex items-center justify-center`}>
                  <span className="text-4xl font-heading font-bold text-primary/30">
                    {p.title.charAt(0)}{p.title.charAt(p.title.indexOf(" ") + 1) || ""}
                  </span>
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
      </section>

      {/* Expanded Case Study */}
      {selectedProject !== null && (
        <section className="px-4 pb-20">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 md:p-12"
            >
              <span className="text-xs text-primary font-medium">{projects[selectedProject].category}</span>
              <h2 className="text-2xl md:text-3xl font-heading font-bold mt-1 mb-8">{projects[selectedProject].title}</h2>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="glass-card p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Duration</p>
                  <p className="font-heading font-semibold">{projects[selectedProject].duration}</p>
                </div>
                <div className="glass-card p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Team</p>
                  <p className="font-heading font-semibold text-sm">{projects[selectedProject].team}</p>
                </div>
                <div className="glass-card p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Category</p>
                  <p className="font-heading font-semibold">{projects[selectedProject].category}</p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-lg font-heading font-semibold text-primary mb-2">The Problem</h3>
                  <p className="text-muted-foreground leading-relaxed">{projects[selectedProject].problem}</p>
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-primary mb-2">Our Solution</h3>
                  <p className="text-muted-foreground leading-relaxed">{projects[selectedProject].solution}</p>
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-primary mb-2">The Outcome</h3>
                  <p className="text-muted-foreground leading-relaxed">{projects[selectedProject].outcome}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-heading font-semibold mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {projects[selectedProject].tech_stack?.map((t) => (
                    <span key={t} className="px-3 py-1 text-xs rounded-full border border-border/50 text-muted-foreground bg-secondary/50">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
};

export default PortfolioPage;
