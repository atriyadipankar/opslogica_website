import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const badges = ["AI Automation", "Web Development", "Mobile Apps", "Business Automation"];

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/[0.03] rounded-full" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {badges.map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="px-3 py-1 text-xs font-medium rounded-full border border-primary/30 text-primary bg-primary/5"
              >
                {badge}
              </motion.span>
            ))}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6">
            We Build{" "}
            <span className="gradient-text">Intelligent Software</span>
            <br />
            That Works For You
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            From AI-powered automation to full-stack development — we deliver end-to-end digital solutions that help businesses scale smarter, faster, and with confidence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#services" className="glow-button flex items-center gap-2 text-base">
              Explore Our Services <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#portfolio" className="outline-button flex items-center gap-2 text-base">
              <Play className="w-4 h-4" /> View Our Work
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 text-xs text-muted-foreground tracking-widest uppercase"
        >
          Automating Tomorrow, Delivering Today
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
