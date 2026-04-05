import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Check, Star, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import CTABanner from "@/components/CTABanner";
import { supabase } from "@/lib/supabase";

interface PricingPlan {
  id: string;
  name: string;
  category: string;
  price: string;
  features: string[];
  highlighted: boolean;
}

const faqs = [
  { q: "Do you offer free consultations?", a: "Yes! Every engagement starts with a free discovery call where we discuss your needs, evaluate feasibility, and provide a preliminary scope and estimate." },
  { q: "How do you handle pricing for custom projects?", a: "After the discovery call, we provide a detailed proposal with fixed pricing for defined scopes, or time & materials for evolving requirements. No hidden fees." },
  { q: "Can I switch plans mid-project?", a: "Absolutely. We're flexible and can scale up or adjust scope as your needs evolve. We'll re-scope and provide updated timelines and pricing." },
  { q: "What's included in post-launch support?", a: "All plans include a defined support period for bug fixes. Growth and Enterprise plans include extended support, monitoring, and optimization." },
  { q: "Do you offer retainer agreements?", a: "Yes, for clients who need ongoing development or support, we offer monthly retainer packages at discounted rates with dedicated team allocation." },
  { q: "What payment methods do you accept?", a: "We accept bank transfers, credit cards, and can work with purchase orders for enterprise clients. Payment is typically 50% upfront, 50% on delivery." },
];

const PricingPage = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [tabs, setTabs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  return (
    <>
      <PageHeader
        label="Pricing"
        title="Transparent"
        highlight="Pricing"
        description="Flexible plans tailored to your needs. Every engagement starts with a free discovery call."
      />

      {/* Pricing Tabs */}
      <section className="px-4 pb-20">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
            {activePlans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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

          <p className="text-center text-sm text-muted-foreground">
            All plans include a free discovery call and project scoping session.
          </p>
        </div>
      </section>

      {/* What Every Plan Includes */}
      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-4">
            What Every Plan <span className="gradient-text">Includes</span>
          </h2>
          <p className="text-muted-foreground text-center mb-10">Regardless of which tier you choose, you always get:</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Free discovery call",
              "Detailed project proposal",
              "Agile development process",
              "Weekly progress updates",
              "Source code ownership",
              "Post-launch bug support",
              "Documentation",
              "Deployment assistance",
              "NDA & IP protection",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 glass-card p-4">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-10">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={false}
                className="glass-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-sm flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown open={openFaq === i} />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="px-5 pb-5"
                  >
                    <p className="text-sm text-muted-foreground pl-7">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
};

const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export default PricingPage;
