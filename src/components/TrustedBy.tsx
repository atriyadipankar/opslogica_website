const partners = [
  "TechNova", "CloudSync", "DataBridge", "VeloSoft", "NexGen AI",
  "ScaleUp Inc", "InfinityOps", "QuantumFlow", "Apex Digital", "CyberForge",
];

const TrustedBy = () => {
  return (
    <section className="py-14 border-y border-border/30 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <p className="text-center text-sm text-muted-foreground tracking-wide uppercase">
          Trusted by Growing Businesses & Partner Firms
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex animate-scroll-left">
          {[...partners, ...partners].map((name, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-6 px-8 py-3 rounded-lg border border-border/30 bg-card/30 text-muted-foreground font-heading font-semibold text-sm tracking-wide"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
