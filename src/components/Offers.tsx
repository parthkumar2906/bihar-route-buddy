import { Tag } from "lucide-react";
import { offers } from "@/lib/data";
import { motion } from "framer-motion";

const Offers = () => (
  <section className="py-16">
    <div className="container">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-foreground">Exclusive Offers</h2>
        <p className="mt-2 text-muted-foreground">Save more on every booking</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {offers.map((o, i) => (
          <motion.div
            key={o.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative overflow-hidden rounded-xl border-2 border-dashed border-secondary/40 bg-secondary/5 p-6"
          >
            <Tag className="absolute -right-2 -top-2 h-16 w-16 rotate-12 text-secondary/10" />
            <div className="text-2xl font-bold text-secondary">{o.discount}</div>
            <div className="mt-1 text-sm text-foreground">{o.description}</div>
            <div className="mt-3 inline-block rounded-md bg-secondary/10 px-3 py-1 font-mono text-sm font-bold text-secondary">
              {o.code}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Min booking: ₹{o.minBooking} · Max discount: ₹{o.maxDiscount}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Offers;
