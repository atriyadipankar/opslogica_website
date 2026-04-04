import { Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/30 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div>
            <a href="#home" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-lg font-heading font-bold">OpsLogica</span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Automating Tomorrow, Delivering Today.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-foreground transition-colors">AI & Automation</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors">Software Development</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors">Web & Mobile</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors">Business Automation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#portfolio" className="hover:text-foreground transition-colors">Portfolio</a></li>
              <li><span className="cursor-default">Careers</span></li>
              <li><span className="cursor-default">Blog</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="cursor-default">LinkedIn</span></li>
              <li><span className="cursor-default">GitHub</span></li>
              <li><span className="cursor-default">Twitter/X</span></li>
              <li><a href="#contact" className="hover:text-foreground transition-colors">Email</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground gap-2">
          <p>© 2025 OpsLogica. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="cursor-default hover:text-foreground transition-colors">Privacy Policy</span>
            <span className="cursor-default hover:text-foreground transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
