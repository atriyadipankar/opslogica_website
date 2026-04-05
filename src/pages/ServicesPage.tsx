import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Bot, Code2, Globe, Cog, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import CTABanner from "@/components/CTABanner";
import { supabase } from "@/lib/supabase";
import type { LucideIcon } from "lucide-react";

interface ProcessStep {
  step: string;
  desc: string;
}

interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  icon: string;
  features: string[];
  process: ProcessStep[];
  use_cases: string[];
}

const iconMap: Record<string, LucideIcon> = { Bot, Code2, Globe, Cog };

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    supabase
      .from("services")
      .select("*")
      .order("sort_order")
      .then(({ data }) => { if (data) setServices(data); });
  }, []);

  return (
    <>
      <PageHeader
        label="Our Services"
        title="What We"
        highlight="Do"
        description="End-to-end digital solutions powered by AI, built with modern technology, and designed for real business impact."
      />

      <div className="container mx-auto px-4 space-y-24 pb-20">
        {services.map((service, idx) => {
          const Icon = iconMap[service.icon] || Bot;
          return (
            <motion.div
              key={service.id}
              id={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              {/* Service Header */}
              <div className={`grid lg:grid-cols-2 gap-12 items-center mb-12`}>
                <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">{service.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{service.full_description}</p>
                  <Link to="/contact" className="glow-button inline-flex items-center gap-2 text-sm">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="glass-card p-8">
                    <h3 className="text-lg font-heading font-semibold mb-6">What's Included</h3>
                    <ul className="space-y-4">
                      {service.features?.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Process */}
              {service.process && (
                <div className="mb-12">
                  <h3 className="text-xl font-heading font-semibold text-center mb-8">Our Process</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {service.process.map((p, i) => (
                      <div key={p.step} className="glass-card p-6 relative">
                        <div className="text-4xl font-heading font-bold text-primary/10 absolute top-4 right-4">{String(i + 1).padStart(2, "0")}</div>
                        <h4 className="font-heading font-semibold mb-2">{p.step}</h4>
                        <p className="text-sm text-muted-foreground">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Use Cases */}
              {service.use_cases && (
                <div>
                  <h3 className="text-xl font-heading font-semibold text-center mb-6">Common Use Cases</h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {service.use_cases.map((uc) => (
                      <span key={uc} className="px-4 py-2 text-sm rounded-full border border-border/50 text-muted-foreground bg-secondary/50">
                        {uc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {idx < services.length - 1 && <div className="border-t border-border/20 mt-16" />}
            </motion.div>
          );
        })}
      </div>

      <CTABanner />
    </>
  );
};

export default ServicesPage;
