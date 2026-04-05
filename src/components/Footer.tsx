import { Link } from "react-router-dom";
import OpsLogicaLogo from "./OpsLogicaLogo";

const Footer = () => {
  return (
    <footer className="border-t border-border/30 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div>
            <Link to="/" className="flex items-center mb-3">
              <OpsLogicaLogo size="sm" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Automating Tomorrow, Delivering Today.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services#ai-automation" className="hover:text-foreground transition-colors">AI & Automation</Link></li>
              <li><Link to="/services#software-development" className="hover:text-foreground transition-colors">Software Development</Link></li>
              <li><Link to="/services#web-mobile" className="hover:text-foreground transition-colors">Web & Mobile</Link></li>
              <li><Link to="/services#business-automation" className="hover:text-foreground transition-colors">Business Automation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/portfolio" className="hover:text-foreground transition-colors">Portfolio</Link></li>
              <li><Link to="/testimonials" className="hover:text-foreground transition-colors">Testimonials</Link></li>
              <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="cursor-default">LinkedIn</span></li>
              <li><span className="cursor-default">GitHub</span></li>
              <li><span className="cursor-default">Twitter/X</span></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Email</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground gap-2">
          <p>© 2025 OPSLOGICA. All rights reserved.</p>
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
