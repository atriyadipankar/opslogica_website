import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Check, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

interface PricingPlan {
  id: string;
  name: string;
  category: string;
  price: string;
  features: string[];
  highlighted: boolean;
}

const PricingSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [tabs, setTabs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    supabase
      .from("pricing_plans")
      .select("id, name, category, price, features, highlighted")
      .order("sort_order")
      .then(({ data }) => {
        if (data) {
          setPlans(data);
          const categories = [...new Set(data.map((p) => p.category))];
          setTabs(categories);
          setActiveTab(categories[0] || "");
        }
      });
  }, []);

  const activePlans = plans.filter((p) => p.category === activeTab);

  if (!plans.length) return null;

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
          {activePlans.map((plan, i) => (
            <motion.div
              key={plan.id}
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
                {plan.features?.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`block text-center py-3 rounded-lg font-semibold text-sm transition-all ${
                  plan.highlighted ? "glow-button" : "outline-button"
                }`}
              >
                {plan.name === "Enterprise" ? "Talk to Us" : "Get Started"}
              </Link>
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
