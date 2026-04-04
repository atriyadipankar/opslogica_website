import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Brain, Rocket, RefreshCw, HeadphonesIcon } from "lucide-react";

const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 30, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Industries Served" },
  { value: 3, suffix: "+", label: "Years of Excellence" },
];

const whyUs = [
  { icon: Brain, title: "Deep AI Expertise", desc: "Cutting-edge AI/ML solutions tailored to your business needs" },
  { icon: Rocket, title: "End-to-End Delivery", desc: "From ideation to deployment and beyond — we handle it all" },
  { icon: RefreshCw, title: "Agile & Transparent", desc: "Iterative development with full visibility at every sprint" },
  { icon: HeadphonesIcon, title: "Post-Launch Support", desc: "Ongoing maintenance, monitoring, and continuous improvement" },
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

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20"
        >
          <div>
            <p className="text-primary text-sm font-semibold tracking-wide uppercase mb-3">About OpsLogica</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Bridging Technology & <span className="gradient-text">Business Outcomes</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              OpsLogica exists to bridge the gap between complex technology and real business outcomes — through intelligent automation, clean code, and end-to-end digital solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Founded by engineers and strategists who've shipped products across fintech, healthcare, logistics, and SaaS — we bring deep technical expertise with a relentless focus on impact.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-1">
                  <CountUp target={s.value} suffix={s.suffix} />
                </div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div>
          <h3 className="text-2xl font-heading font-bold text-center mb-10">
            Why Choose <span className="gradient-text">Us</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="glass-card-hover p-6 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-heading font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
