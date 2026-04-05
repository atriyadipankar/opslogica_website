import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Linkedin, Send } from "lucide-react";
import { useContactForm } from "@/lib/useContactForm";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { form, setForm, sending, handleSubmit } = useContactForm("homepage");

  const inputClass = "w-full px-4 py-3 rounded-lg bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm";
  const labelClass = "text-sm font-medium mb-1.5 block";

  return (
    <section id="contact" className="section-padding border-t border-border/30" ref={ref}>
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase mb-3">Contact</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Get in <span className="gradient-text">Touch</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} className="lg:col-span-2 space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Have a project in mind or need a technology partner? Reach out — we'd love to explore how we can help your business grow.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><Mail className="w-4 h-4 text-primary" /></div>
                hello@OPSLOGICA.com
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><Phone className="w-4 h-4 text-primary" /></div>
                +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><MapPin className="w-4 h-4 text-primary" /></div>
                San Francisco, CA
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><Linkedin className="w-4 h-4 text-primary" /></div>
                linkedin.com/company/OPSLOGICA
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="lg:col-span-3 glass-card p-6 md:p-8"
            onSubmit={handleSubmit}
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className={labelClass}>Full Name *</label>
                <input id="name" className={inputClass} placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required maxLength={100} />
              </div>
              <div>
                <label htmlFor="company" className={labelClass}>Company Name</label>
                <input id="company" className={inputClass} placeholder="Acme Inc" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} maxLength={100} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="email" className={labelClass}>Email Address *</label>
                <input id="email" type="email" className={inputClass} placeholder="john@acme.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required maxLength={255} />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>Phone Number</label>
                <input id="phone" type="tel" className={inputClass} placeholder="+1 (555) 000-0000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={20} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="service" className={labelClass}>Service Interested In</label>
                <select id="service" className={inputClass} value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                  <option value="">Select a service</option>
                  <option>AI Automation</option>
                  <option>Software Development</option>
                  <option>Web & Mobile</option>
                  <option>Business Automation</option>
                  <option>Not Sure Yet</option>
                </select>
              </div>
              <div>
                <label htmlFor="budget" className={labelClass}>Project Budget Range</label>
                <select id="budget" className={inputClass} value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}>
                  <option value="">Select budget</option>
                  <option>Less than $1K</option>
                  <option>$1K – $5K</option>
                  <option>$5K – $20K</option>
                  <option>$20K+</option>
                  <option>Let's Discuss</option>
                </select>
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="message" className={labelClass}>Message / Project Brief</label>
              <textarea id="message" className={`${inputClass} min-h-[120px] resize-none`} placeholder="Tell us about your project..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={2000} />
            </div>
            <button type="submit" disabled={sending} className="glow-button w-full flex items-center justify-center gap-2 disabled:opacity-60">
              {sending ? "Sending..." : <>Send Message <Send className="w-4 h-4" /></>}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
