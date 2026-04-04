import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const CTABanner = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 px-4 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />
      <div className="absolute top-0 left-1/3 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="container mx-auto text-center relative z-10"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
          Ready to Transform Your Business
          <br />
          with <span className="gradient-text">Smart Technology</span>?
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          Let's discuss your project — free discovery call, no commitment.
        </p>
        <a href="#contact" className="glow-button inline-flex items-center gap-2 text-base">
          Schedule a Free Call <ArrowRight className="w-4 h-4" />
        </a>
      </motion.div>
    </section>
  );
};

export default CTABanner;
