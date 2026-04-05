import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Send, Clock, MessageSquare, Shield } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useContactForm } from "@/lib/useContactForm";

const ContactPage = () => {
  const { form, setForm, sending, handleSubmit } = useContactForm("contact-page");

  const inputClass = "w-full px-4 py-3 rounded-lg bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm";
  const labelClass = "text-sm font-medium mb-1.5 block";

  return (
    <>
      <PageHeader
        label="Contact Us"
        title="Get in"
        highlight="Touch"
        description="Have a project in mind? Let's talk about how we can help your business grow with smart technology."
      />

      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-6xl">
          {/* Quick Info Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-heading font-semibold mb-1">Quick Response</h3>
              <p className="text-sm text-muted-foreground">We respond within 24 hours</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 text-center">
              <MessageSquare className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-heading font-semibold mb-1">Free Consultation</h3>
              <p className="text-sm text-muted-foreground">30-min discovery call included</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6 text-center">
              <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-heading font-semibold mb-1">NDA Protected</h3>
              <p className="text-sm text-muted-foreground">Your ideas stay confidential</p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-heading font-bold mb-4">Let's Start a Conversation</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you have a detailed brief or just an idea, we'd love to hear from you. Fill out the form and we'll schedule a free discovery call to discuss your project.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><Mail className="w-4 h-4 text-primary" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground/60">Email</p>
                    <p>hello@OPSLOGICA.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><Phone className="w-4 h-4 text-primary" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground/60">Phone</p>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><MapPin className="w-4 h-4 text-primary" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground/60">Location</p>
                    <p>San Francisco, CA</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><Linkedin className="w-4 h-4 text-primary" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground/60">LinkedIn</p>
                    <p>linkedin.com/company/OPSLOGICA</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-heading font-semibold mb-3">Office Hours</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between"><span>Monday – Friday</span><span>9:00 AM – 6:00 PM PST</span></div>
                  <div className="flex justify-between"><span>Saturday</span><span>10:00 AM – 2:00 PM PST</span></div>
                  <div className="flex justify-between"><span>Sunday</span><span>Closed</span></div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3 glass-card p-6 md:p-8"
              onSubmit={handleSubmit}
            >
              <h3 className="text-xl font-heading font-bold mb-6">Send Us a Message</h3>
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
                <textarea id="message" className={`${inputClass} min-h-[140px] resize-none`} placeholder="Tell us about your project, timeline, and any specific requirements..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={2000} />
              </div>
              <button type="submit" disabled={sending} className="glow-button w-full flex items-center justify-center gap-2 disabled:opacity-60">
                {sending ? "Sending..." : <>Send Message <Send className="w-4 h-4" /></>}
              </button>
              <p className="text-xs text-muted-foreground/60 text-center mt-3">
                By submitting, you agree to our privacy policy. We'll never share your information.
              </p>
            </motion.form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
