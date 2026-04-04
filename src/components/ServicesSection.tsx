import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Bot, Code2, Globe, Cog, ChevronRight, X } from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "AI & Automation Solutions",
    desc: "Custom AI models, LLM integrations, intelligent workflows, RPA, chatbot development, and AI-powered analytics.",
    details: [
      "Custom ML model development & deployment",
      "LLM integration (GPT, Claude, Gemini)",
      "Intelligent process automation (RPA)",
      "AI-powered chatbots & virtual assistants",
      "Predictive analytics & business intelligence",
      "Computer vision & NLP solutions",
    ],
  },
  {
    icon: Code2,
    title: "Software Development",
    desc: "Custom web applications, APIs, SaaS platforms, CRM/ERP development, and robust backend systems.",
    details: [
      "Custom SaaS platform development",
      "API design & microservices architecture",
      "CRM/ERP system development",
      "Database design & optimization",
      "Third-party API integrations",
      "Legacy system modernization",
    ],
  },
  {
    icon: Globe,
    title: "Web & Mobile Development",
    desc: "Responsive websites, React/Next.js apps, iOS & Android apps, UI/UX design, and Progressive Web Apps.",
    details: [
      "React & Next.js web applications",
      "iOS & Android mobile apps (Flutter/React Native)",
      "Progressive Web Apps (PWA)",
      "UI/UX design & prototyping",
      "E-commerce platforms",
      "Performance optimization & SEO",
    ],
  },
  {
    icon: Cog,
    title: "Business Automation",
    desc: "Process automation, workflow digitization, third-party integrations, CRM/ERP automation, and reporting dashboards.",
    details: [
      "End-to-end process automation",
      "Zapier, Make & n8n integrations",
      "CRM & ERP workflow automation",
      "Custom reporting dashboards",
      "Document & invoice automation",
      "Email & marketing automation",
    ],
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [openModal, setOpenModal] = useState<number | null>(null);

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
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="glass-card-hover p-8 group cursor-pointer"
              onClick={() => setOpenModal(i)}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <s.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.desc}</p>
              <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn More <ChevronRight className="w-4 h-4" />
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
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
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              {(() => { const Icon = services[openModal].icon; return <Icon className="w-6 h-6 text-primary" />; })()}
            </div>
            <h3 className="text-xl font-heading font-bold mb-4">{services[openModal].title}</h3>
            <ul className="space-y-3">
              {services[openModal].details.map((d) => (
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
