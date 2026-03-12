import { Star } from "lucide-react";
import { reviews } from "@/lib/data";
import { motion } from "framer-motion";

const Reviews = () => (
  <section className="bg-muted/50 py-16">
    <div className="container">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-foreground">What Our Customers Say</h2>
        <p className="mt-2 text-muted-foreground">Real reviews from real travelers</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reviews.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {r.avatar}
              </div>
              <div>
                <div className="font-semibold text-foreground">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.city}</div>
              </div>
            </div>
            <div className="mb-2 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className={`h-4 w-4 ${j < r.rating ? "fill-secondary text-secondary" : "text-muted"}`} />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{r.comment}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Reviews;
