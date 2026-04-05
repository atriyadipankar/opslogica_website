const CloudGearIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M48 28a12 12 0 00-11.3-8A14 14 0 0013 28a10 10 0 001 20h34a8 8 0 000-16z" fill="none" stroke="currentColor" strokeWidth="2.5"/>
    <circle cx="32" cy="36" r="8" fill="none" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M32 28v3M32 41v3M24 36h3M37 36h3M26.3 30.3l2.1 2.1M35.6 39.6l2.1 2.1M26.3 41.7l2.1-2.1M35.6 32.4l2.1-2.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M29 35l3 3 3-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const fontStyle = { fontFamily: "'Century Gothic', 'Avant Garde', sans-serif" };

interface OpsLogicaLogoProps {
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: { text: "text-sm", icon: "w-4 h-4" },
  md: { text: "text-xl md:text-2xl", icon: "w-6 h-6 md:w-7 md:h-7" },
  lg: { text: "text-2xl md:text-3xl", icon: "w-7 h-7 md:w-8 md:h-8" },
};

const OpsLogicaLogo = ({ size = "md" }: OpsLogicaLogoProps) => {
  const s = sizeClasses[size];
  return (
    <span className="inline-flex items-center">
      <span className={`text-white ${s.text} tracking-[0.25em] font-light`} style={fontStyle}>OPSL</span>
      <CloudGearIcon className={`${s.icon} text-white mx-[1px] -mt-1`} />
      <span className={`text-white ${s.text} tracking-[0.25em] font-light`} style={fontStyle}>GICA</span>
    </span>
  );
};

export default OpsLogicaLogo;
