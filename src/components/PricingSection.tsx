import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Star } from "lucide-react";

const tabs = ["AI Solutions", "Software Dev", "Web & Mobile", "Business Automation"];

const pricingData: Record<string, { name: string; price: string; highlighted?: boolean; features: string[] }[]> = {
  "AI Solutions": [
    { name: "Starter", price: "From $2,500", features: ["Single AI model or chatbot", "Basic LLM integration", "Standard analytics dashboard", "2 weeks turnaround", "Email support"] },
    { name: "Growth", price: "From $7,500", highlighted: true, features: ["Multiple AI workflows", "Advanced LLM integrations", "Custom analytics & reporting", "Dedicated project manager", "Priority support", "4-week delivery"] },
    { name: "Enterprise", price: "Custom Pricing", features: ["Full AI infrastructure", "Custom ML model training", "Enterprise-grade security", "Dedicated team & SLA", "24/7 support", "Ongoing optimization"] },
  ],
  "Software Dev": [
    { name: "Starter", price: "From $3,000", features: ["MVP development", "Up to 5 core features", "Basic API integration", "Responsive design", "30-day bug support"] },
    { name: "Growth", price: "From $10,000", highlighted: true, features: ["Full-featured application", "Complex API architecture", "Database optimization", "CI/CD pipeline setup", "Dedicated PM", "90-day support"] },
    { name: "Enterprise", price: "Custom Pricing", features: ["Large-scale platform", "Microservices architecture", "High-availability setup", "Dedicated dev team", "SLA & compliance", "Ongoing maintenance"] },
  ],
  "Web & Mobile": [
    { name: "Starter", price: "From $2,000", features: ["Landing page or simple site", "Mobile responsive", "Basic SEO setup", "Contact form", "2-week delivery"] },
    { name: "Growth", price: "From $6,000", highlighted: true, features: ["Multi-page web app", "Mobile app (iOS or Android)", "UI/UX design included", "CMS integration", "Analytics setup", "60-day support"] },
    { name: "Enterprise", price: "Custom Pricing", features: ["Cross-platform apps", "Custom design system", "Performance optimization", "App Store deployment", "Dedicated team", "Ongoing updates"] },
  ],
  "Business Automation": [
    { name: "Starter", price: "From $1,500", features: ["Up to 3 workflow automations", "Zapier/Make setup", "Basic reporting", "Email automation", "1-week delivery"] },
    { name: "Growth", price: "From $5,000", highlighted: true, features: ["Up to 10 automations", "CRM/ERP integration", "Custom dashboards", "Advanced workflows", "Dedicated PM", "Training included"] },
    { name: "Enterprise", price: "Custom Pricing", features: ["Unlimited automations", "Full system integration", "Custom automation platform", "Dedicated team & SLA", "24/7 monitoring", "Continuous optimization"] },
  ],
};

const PricingSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section id="pricing" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-10">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase mb-3">Pricing</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Flexible Plans <span className="gradient-text">Tailored</span> to Your Needs
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingData[activeTab].map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-xl p-8 ${
                plan.highlighted
                  ? "border-2 border-primary bg-primary/5 shadow-[0_0_40px_-10px_hsl(var(--primary)/0.3)]"
                  : "glass-card"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" /> Most Popular
                </div>
              )}
              <h3 className="text-lg font-heading font-bold mb-1">{plan.name}</h3>
              <p className="text-2xl font-heading font-bold gradient-text mb-6">{plan.price}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`block text-center py-3 rounded-lg font-semibold text-sm transition-all ${
                  plan.highlighted ? "glow-button" : "outline-button"
                }`}
              >
                {plan.name === "Enterprise" ? "Talk to Us" : "Get Started"}
              </a>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          All plans include a free discovery call and project scoping session.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
