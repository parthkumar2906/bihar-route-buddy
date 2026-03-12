import { Shield, Zap, Headphones, CreditCard, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Shield, title: "Safe & Secure", desc: "Verified operators with GPS tracking on every bus" },
  { icon: Zap, title: "Instant Booking", desc: "Book tickets in under 60 seconds with instant confirmation" },
  { icon: CreditCard, title: "Easy Payments", desc: "UPI, cards, net banking & wallet options available" },
  { icon: Headphones, title: "24/7 Support", desc: "Round-the-clock customer support in Hindi & English" },
  { icon: MapPin, title: "Live Tracking", desc: "Track your bus in real-time on the day of travel" },
  { icon: Clock, title: "Free Cancellation", desc: "Cancel up to 6 hours before departure for full refund" },
];

const Features = () => (
  <section className="py-16">
    <div className="container">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-foreground">Why Book With BiharYatra?</h2>
        <p className="mt-2 text-muted-foreground">Trusted by 2 lakh+ travelers across Bihar</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex gap-4 rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent">
              <f.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
