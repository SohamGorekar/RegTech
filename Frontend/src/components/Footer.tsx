import { Scale, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg gradient-teal flex items-center justify-center">
                <Scale className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-display font-bold">RegTech</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm max-w-sm">
              Your GPS for navigating India's regulatory landscape. From idea to incorporated, we make compliance simple.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="/#how-it-works" className="hover:text-accent transition-colors">How it Works</a></li>
              <li><a href="/#sectors" className="hover:text-accent transition-colors">Sectors</a></li>
              <li><a href="/#resources" className="hover:text-accent transition-colors">Resources</a></li>
              <li><Link to="/onboarding" className="hover:text-accent transition-colors">Get Started</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            © 2026 RegTech. All rights reserved.
          </p>
          <p className="flex items-center gap-2 text-sm text-primary-foreground/60">
            Made with <Heart className="w-4 h-4 text-accent fill-accent" /> for India's Founders
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
