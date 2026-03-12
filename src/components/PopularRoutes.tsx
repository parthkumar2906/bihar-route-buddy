import { Link } from "react-router-dom";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { popularRoutes } from "@/lib/data";
import { motion } from "framer-motion";

const PopularRoutes = () => (
  <section className="bg-muted/50 py-16">
    <div className="container">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-foreground">Popular Routes in Bihar</h2>
        <p className="mt-2 text-muted-foreground">Most booked bus routes across Bihar and India</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {popularRoutes.slice(0, 8).map((route, i) => (
          <motion.div
            key={route.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={`/search?from=${route.from.id}&to=${route.to.id}`}
              className="group flex flex-col rounded-xl border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-lg"
            >
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                <span>{route.from.name}</span>
                <ArrowRight className="h-4 w-4 text-secondary" />
                <span>{route.to.name}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{route.distance} km</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{route.duration}</span>
              </div>
              <div className="mt-3 text-xs font-medium text-primary group-hover:underline">
                View Buses →
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PopularRoutes;
