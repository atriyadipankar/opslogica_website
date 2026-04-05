import { motion } from "framer-motion";

interface PageHeaderProps {
  label: string;
  title: string;
  highlight: string;
  description?: string;
}

const PageHeader = ({ label, title, highlight, description }: PageHeaderProps) => (
  <section className="pt-32 pb-16 px-4">
    <div className="container mx-auto text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="text-primary text-sm font-semibold tracking-wide uppercase mb-3">{label}</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
          {title} <span className="gradient-text">{highlight}</span>
        </h1>
        {description && (
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{description}</p>
        )}
      </motion.div>
    </div>
  </section>
);

export default PageHeader;
