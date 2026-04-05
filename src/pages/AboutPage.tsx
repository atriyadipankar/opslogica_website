import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { Brain, Rocket, RefreshCw, HeadphonesIcon, Target, Users, Lightbulb, Shield } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTABanner from "@/components/CTABanner";

const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 30, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Industries Served" },
  { value: 3, suffix: "+", label: "Years of Excellence" },
];

const values = [
  { icon: Target, title: "Impact-Driven", desc: "Every line of code we write is measured by its business impact. We don't build for the sake of building — we build to solve." },
  { icon: Users, title: "Client-First", desc: "Your success is our success. We treat every project as if it were our own, with full transparency and proactive communication." },
  { icon: Lightbulb, title: "Innovation", desc: "We stay at the cutting edge of AI, automation, and software engineering to bring you solutions that are ahead of the curve." },
  { icon: Shield, title: "Reliability", desc: "We ship on time, within budget, and with quality that lasts. Our code is clean, tested, and built to scale." },
];

const whyUs = [
  { icon: Brain, title: "Deep AI Expertise", desc: "Our team has hands-on experience with LLMs, computer vision, NLP, and custom ML models. We don't just use AI — we build it." },
  { icon: Rocket, title: "End-to-End Delivery", desc: "From ideation and design to development, deployment, and ongoing support — we handle the entire lifecycle so you don't have to juggle vendors." },
  { icon: RefreshCw, title: "Agile & Transparent", desc: "Weekly demos, daily standups available, and a shared project board. You always know where your project stands." },
  { icon: HeadphonesIcon, title: "Post-Launch Support", desc: "Our relationship doesn't end at launch. We provide ongoing maintenance, monitoring, and continuous improvement." },
];

const timeline = [
  { year: "2022", title: "Founded", desc: "Started with a mission to make enterprise-grade AI accessible to businesses of all sizes." },
  { year: "2023", title: "Rapid Growth", desc: "Expanded to 10+ team members, delivered 25+ projects across fintech, healthcare, and logistics." },
  { year: "2024", title: "AI-First Agency", desc: "Became a recognized AI-first development agency with partnerships across the industry." },
  { year: "2025", title: "Scaling Impact", desc: "50+ projects delivered, expanding into new industries and launching our automation platform." },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const AboutPage = () => {
  return (
    <>
      <PageHeader
        label="About Us"
        title="Bridging Technology &"
        highlight="Business Outcomes"
        description="We're a team of engineers and strategists who've shipped products across fintech, healthcare, logistics, and SaaS — with a relentless focus on impact."
      />

      {/* Stats */}
      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-1">
                  <CountUp target={s.value} suffix={s.suffix} />
                </div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-6">
              Our <span className="gradient-text">Story</span>
            </h2>
            <div className="glass-card p-8 md:p-12 mb-12">
              <p className="text-muted-foreground leading-relaxed mb-4">
                OPSLOGICA was founded with a simple belief: that powerful technology shouldn't be reserved for Fortune 500 companies. Every business — from a 5-person startup to a growing enterprise — deserves access to intelligent automation, clean software, and strategic technology partnerships.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our founders came from backgrounds in AI research, full-stack development, and business consulting. They saw firsthand how companies struggled to find technical partners who understood both the code and the business context. OPSLOGICA was built to be that partner.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we work with clients across fintech, healthcare, logistics, SaaS, and e-commerce — helping them build, automate, and scale with confidence.
              </p>
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="space-y-6">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start"
              >
                <div className="text-2xl font-heading font-bold gradient-text w-16 flex-shrink-0">{item.year}</div>
                <div className="glass-card p-5 flex-1">
                  <h3 className="font-heading font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 pb-20">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-10">
            Our <span className="gradient-text">Values</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-hover p-6 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-heading font-semibold mb-2">{v.title}</h4>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4 pb-20">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-10">
            Why Choose <span className="gradient-text">Us</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-heading font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
};

export default AboutPage;
