import { Bus, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-foreground text-primary-foreground">
    <div className="container py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Bus className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">BiharYatra</span>
          </div>
          <p className="text-sm opacity-70">Bihar's most trusted bus booking platform. Travel safe, travel smart across all districts of Bihar and inter-state routes.</p>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">Popular Routes</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><Link to="/search?from=patna&to=delhi" className="hover:opacity-100">Patna → Delhi</Link></li>
            <li><Link to="/search?from=patna&to=kolkata" className="hover:opacity-100">Patna → Kolkata</Link></li>
            <li><Link to="/search?from=gaya&to=kolkata" className="hover:opacity-100">Gaya → Kolkata</Link></li>
            <li><Link to="/search?from=patna&to=varanasi" className="hover:opacity-100">Patna → Varanasi</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><Link to="/" className="hover:opacity-100">About Us</Link></li>
            <li><Link to="/" className="hover:opacity-100">Contact</Link></li>
            <li><Link to="/" className="hover:opacity-100">Terms & Conditions</Link></li>
            <li><Link to="/" className="hover:opacity-100">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:opacity-100">Cancellation Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">Contact Us</h4>
          <ul className="space-y-3 text-sm opacity-70">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@biharyatra.com</li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5" /> Gandhi Maidan, Patna, Bihar 800001</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-center text-sm opacity-60">
        © 2026 BiharYatra. All rights reserved. A product of Bihar State Transport Corporation.
      </div>
    </div>
  </footer>
);

export default Footer;
