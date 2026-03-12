import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Star, Clock, Wifi, BatteryCharging, Droplets, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buses, cities } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

type SortKey = "price" | "departure" | "duration" | "rating";

const SearchResults = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const fromId = params.get("from") || "";
  const toId = params.get("to") || "";
  const date = params.get("date") || new Date().toISOString().split("T")[0];

  const fromCity = cities.find((c) => c.id === fromId);
  const toCity = cities.find((c) => c.id === toId);

  const [filters, setFilters] = useState({
    busType: "" as string,
    priceMax: 2000,
    ac: null as boolean | null,
  });
  const [sort, setSort] = useState<SortKey>("price");
  const [showFilters, setShowFilters] = useState(false);

  const filteredBuses = useMemo(() => {
    let result = [...buses];
    if (filters.busType) result = result.filter((b) => b.type === filters.busType);
    if (filters.ac === true) result = result.filter((b) => b.type.includes("AC") && !b.type.includes("Non-AC"));
    if (filters.ac === false) result = result.filter((b) => b.type.includes("Non-AC"));
    result = result.filter((b) => b.price <= filters.priceMax);

    result.sort((a, b) => {
      if (sort === "price") return a.price - b.price;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "departure") return a.departureTime.localeCompare(b.departureTime);
      return 0;
    });
    return result;
  }, [filters, sort]);

  const busTypes = [...new Set(buses.map((b) => b.type))];

  const amenityIcon = (a: string) => {
    if (a === "WiFi") return <Wifi className="h-3 w-3" />;
    if (a === "Charging") return <BatteryCharging className="h-3 w-3" />;
    if (a === "Water") return <Droplets className="h-3 w-3" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <div className="gradient-hero py-6">
        <div className="container text-primary-foreground">
          <h1 className="text-xl font-bold md:text-2xl">
            {fromCity?.name || "Origin"} → {toCity?.name || "Destination"}
          </h1>
          <p className="text-sm opacity-80">{new Date(date).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} · {filteredBuses.length} buses found</p>
        </div>
      </div>

      <div className="container py-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Filters sidebar */}
          <aside className={`shrink-0 lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-4 font-semibold text-foreground">Filters</h3>

              <div className="mb-4">
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Bus Type</label>
                <select
                  value={filters.busType}
                  onChange={(e) => setFilters((f) => ({ ...f, busType: e.target.value }))}
                  className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm"
                >
                  <option value="">All Types</option>
                  {busTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="mb-4">
                <label className="mb-1 block text-xs font-medium text-muted-foreground">AC / Non-AC</label>
                <div className="flex gap-2">
                  {[
                    { label: "All", value: null },
                    { label: "AC", value: true },
                    { label: "Non-AC", value: false },
                  ].map((opt) => (
                    <button
                      key={String(opt.value)}
                      onClick={() => setFilters((f) => ({ ...f, ac: opt.value }))}
                      className={`rounded-md border px-3 py-1 text-xs font-medium transition-colors ${
                        filters.ac === opt.value ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Max Price: ₹{filters.priceMax}</label>
                <input
                  type="range"
                  min={200}
                  max={2000}
                  step={50}
                  value={filters.priceMax}
                  onChange={(e) => setFilters((f) => ({ ...f, priceMax: Number(e.target.value) }))}
                  className="w-full accent-primary"
                />
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {/* Sort bar */}
            <div className="mb-4 flex items-center justify-between">
              <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-1 text-sm text-primary lg:hidden">
                <Filter className="h-4 w-4" /> Filters
              </button>
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Sort:</span>
                {(["price", "rating", "departure"] as SortKey[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSort(s)}
                    className={`rounded-md px-2 py-1 text-xs font-medium capitalize transition-colors ${
                      sort === s ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Bus cards */}
            <div className="space-y-3">
              {filteredBuses.map((bus, i) => (
                <motion.div
                  key={bus.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md md:p-5"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    {/* Bus info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between md:items-center">
                        <div>
                          <h3 className="font-semibold text-foreground">{bus.name}</h3>
                          <p className="text-xs text-muted-foreground">{bus.operator} · {bus.type}</p>
                        </div>
                        <div className="flex items-center gap-1 rounded-md bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                          <Star className="h-3 w-3 fill-current" /> {bus.rating}
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-6">
                        <div>
                          <div className="text-lg font-bold text-foreground">{bus.departureTime}</div>
                          <div className="text-xs text-muted-foreground">{fromCity?.name}</div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="text-xs text-muted-foreground">{bus.duration}</div>
                          <div className="h-px w-16 bg-border" />
                        </div>
                        <div>
                          <div className="text-lg font-bold text-foreground">{bus.arrivalTime}</div>
                          <div className="text-xs text-muted-foreground">{toCity?.name}</div>
                        </div>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {bus.amenities.map((a) => (
                          <span key={a} className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                            {amenityIcon(a)} {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price & action */}
                    <div className="flex items-end justify-between md:flex-col md:items-end md:gap-2">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-foreground">₹{bus.price}</div>
                        <div className="text-xs text-muted-foreground">{bus.availableSeats} seats left</div>
                      </div>
                      <Button
                        onClick={() => navigate(`/select-seats/${bus.id}?date=${date}`)}
                        className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                      >
                        Select Seats
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredBuses.length === 0 && (
                <div className="py-20 text-center text-muted-foreground">
                  No buses found matching your criteria. Try adjusting filters.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchResults;
