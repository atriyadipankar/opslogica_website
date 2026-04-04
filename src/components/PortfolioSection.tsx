import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, X } from "lucide-react";

const filters = ["All", "AI & Automation", "Web & Mobile", "Software", "Business Automation"];

const projects = [
  { title: "SmartFlow AI", category: "AI & Automation", desc: "AI-powered customer support automation platform", problem: "A fast-growing e-commerce company was overwhelmed with 2,000+ daily customer tickets.", solution: "We built an AI triage system using GPT-4 and custom NLP models that auto-categorized, prioritized, and resolved 60% of tickets.", outcome: "Reduced response time by 75%, saved $120K/year in support costs." },
  { title: "FinTrack Pro", category: "Software", desc: "Real-time financial analytics dashboard for fintech", problem: "A fintech startup needed real-time portfolio tracking across multiple exchanges.", solution: "Built a React + Node.js platform with WebSocket feeds, custom charting, and role-based dashboards.", outcome: "Onboarded 500+ traders within 3 months of launch." },
  { title: "MediConnect", category: "Web & Mobile", desc: "Telehealth platform with video consultations", problem: "A healthcare provider needed HIPAA-compliant virtual consultations.", solution: "Developed a cross-platform app with video calls, e-prescriptions, and appointment scheduling.", outcome: "Facilitated 10,000+ consultations in the first 6 months." },
  { title: "AutoOps Suite", category: "Business Automation", desc: "End-to-end business process automation for logistics", problem: "A logistics company managed dispatch, invoicing, and tracking manually across 3 tools.", solution: "Unified all workflows into one automated platform with real-time GPS tracking and auto-invoicing.", outcome: "Cut operational overhead by 40% and eliminated manual errors." },
  { title: "LeadGenX", category: "AI & Automation", desc: "AI-driven lead scoring and outreach automation", problem: "A B2B SaaS company struggled with low-quality leads clogging their sales pipeline.", solution: "Built a custom ML model for lead scoring + automated multi-channel outreach sequences.", outcome: "Increased qualified leads by 3x and shortened sales cycle by 35%." },
  { title: "ShopEase", category: "Web & Mobile", desc: "Headless e-commerce platform with AI recommendations", problem: "An online retailer needed a faster, personalized shopping experience.", solution: "Built a headless commerce frontend with React + AI-powered product recommendations.", outcome: "Boosted conversion rate by 28% and average order value by 22%." },
];

const PortfolioSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("All");
  const [caseStudy, setCaseStudy] = useState<number | null>(null);

  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  const colors = ["from-primary/20 to-primary/5", "from-cyan-glow/20 to-primary/5", "from-primary/10 to-cyan-glow/10"];

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
              key={p.title}
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
                <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
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
