import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cities } from "@/lib/data";
import { motion } from "framer-motion";

const HeroSearch = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [passengers, setPassengers] = useState(1);

  const handleSearch = () => {
    if (from && to) {
      navigate(`/search?from=${from}&to=${to}&date=${date}&passengers=${passengers}`);
    }
  };

  return (
    <section className="relative overflow-hidden gradient-hero py-20 md:py-32">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-secondary blur-3xl" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-primary-foreground blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-primary-foreground md:text-6xl">
            Travel Across Bihar
            <span className="block text-secondary">With Confidence</span>
          </h1>
          <p className="mb-8 text-lg text-primary-foreground/80 md:text-xl">
            Book bus tickets to 30+ districts in Bihar and inter-state routes across India. Safe, affordable, and on-time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-4xl"
        >
          <div className="rounded-2xl bg-card p-4 shadow-2xl md:p-6">
            <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto_auto]">
              {/* From */}
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">From City</option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}, {c.state}</option>
                  ))}
                </select>
              </div>

              {/* To */}
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-secondary" />
                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">To City</option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}, {c.state}</option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Passengers */}
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "Passenger" : "Passengers"}</option>
                  ))}
                </select>
              </div>

              <Button onClick={handleSearch} className="h-10 gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-8 text-primary-foreground/80"
        >
          {[
            { label: "Happy Customers", value: "2L+" },
            { label: "Daily Buses", value: "500+" },
            { label: "Routes", value: "200+" },
            { label: "Districts", value: "38" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-primary-foreground">{s.value}</div>
              <div className="text-xs">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSearch;
