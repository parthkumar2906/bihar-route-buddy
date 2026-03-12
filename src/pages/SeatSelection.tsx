import { useState, useMemo } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { buses, generateSeats, type Seat } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const SeatSelection = () => {
  const { busId } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const date = params.get("date") || "";
  const bus = buses.find((b) => b.id === busId);

  const seats = useMemo(() => (bus ? generateSeats(bus.type) : []), [bus]);
  const [selected, setSelected] = useState<string[]>([]);

  if (!bus) {
    return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Bus not found</div>;
  }

  const toggleSeat = (seat: Seat) => {
    if (seat.status === "booked") return;
    setSelected((prev) =>
      prev.includes(seat.id)
        ? prev.filter((s) => s !== seat.id)
        : prev.length < 6
        ? [...prev, seat.id]
        : prev
    );
  };

  const selectedSeats = seats.filter((s) => selected.includes(s.id));
  const totalPrice = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  const isSleeper = bus.type.toLowerCase().includes("sleeper");
  const lowerSeats = seats.filter((s) => s.deck === "lower");
  const upperSeats = seats.filter((s) => s.deck === "upper");
  const cols = isSleeper ? 4 : 5;

  const renderDeck = (deckSeats: Seat[], deckLabel: string) => {
    const rows: Seat[][] = [];
    for (let i = 0; i < deckSeats.length; i += cols) {
      rows.push(deckSeats.slice(i, i + cols));
    }

    return (
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="mb-3 text-sm font-semibold text-muted-foreground">{deckLabel}</div>
        <div className="flex flex-col gap-1.5">
          {rows.map((row, ri) => (
            <div key={ri} className="flex gap-1.5">
              {row.map((seat, ci) => {
                const isSelected = selected.includes(seat.id);
                const isBooked = seat.status === "booked";
                // Add aisle gap for seater buses
                const hasAisle = !isSleeper && ci === 2;

                return (
                  <div key={seat.id} className={`${hasAisle ? "ml-4" : ""}`}>
                    <button
                      onClick={() => toggleSeat(seat)}
                      disabled={isBooked}
                      className={`flex h-9 w-9 items-center justify-center rounded-md border text-xs font-medium transition-all md:h-10 md:w-10 ${
                        isBooked
                          ? "cursor-not-allowed border-destructive/30 bg-destructive/10 text-destructive/50"
                          : isSelected
                          ? "border-seat-selected bg-seat-selected text-foreground shadow-sm"
                          : "border-success/30 bg-success/10 text-success hover:bg-success/20"
                      }`}
                      title={`Seat ${seat.number} - ₹${seat.price}`}
                    >
                      {seat.number.replace(/[UL]/, "")}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="gradient-hero py-6">
        <div className="container text-primary-foreground">
          <h1 className="text-xl font-bold">{bus.name}</h1>
          <p className="text-sm opacity-80">{bus.operator} · {bus.type} · {date && new Date(date).toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" })}</p>
        </div>
      </div>

      <div className="container py-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Seat map */}
          <div className="flex-1">
            {/* Legend */}
            <div className="mb-4 flex flex-wrap gap-4">
              {[
                { label: "Available", className: "border-success/30 bg-success/10" },
                { label: "Selected", className: "border-seat-selected bg-seat-selected" },
                { label: "Booked", className: "border-destructive/30 bg-destructive/10" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className={`h-5 w-5 rounded border ${l.className}`} />
                  {l.label}
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {renderDeck(lowerSeats, isSleeper ? "Lower Deck" : "Seats")}
              {upperSeats.length > 0 && renderDeck(upperSeats, "Upper Deck")}
            </div>
          </div>

          {/* Booking summary */}
          <aside className="shrink-0 lg:w-80">
            <div className="sticky top-20 rounded-xl border border-border bg-card p-5">
              <h3 className="mb-4 font-semibold text-foreground">Booking Summary</h3>

              <div className="mb-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bus</span>
                  <span className="font-medium text-foreground">{bus.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="text-foreground">{bus.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Departure</span>
                  <span className="text-foreground">{bus.departureTime}</span>
                </div>
              </div>

              {selectedSeats.length > 0 ? (
                <>
                  <div className="mb-3 border-t border-border pt-3">
                    <div className="mb-2 text-xs font-medium text-muted-foreground">Selected Seats</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedSeats.map((s) => (
                        <span key={s.id} className="rounded-md bg-seat-selected/20 px-2 py-0.5 text-xs font-medium text-foreground">
                          {s.number}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4 space-y-1 border-t border-border pt-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Base fare ({selectedSeats.length} seats)</span>
                      <span className="text-foreground">₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (5%)</span>
                      <span className="text-foreground">₹{Math.round(totalPrice * 0.05)}</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-2 font-bold">
                      <span className="text-foreground">Total</span>
                      <span className="text-foreground">₹{Math.round(totalPrice * 1.05)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      const seatNums = selectedSeats.map((s) => s.number).join(",");
                      navigate(`/passenger-details/${bus.id}?date=${date}&seats=${seatNums}&total=${Math.round(totalPrice * 1.05)}`);
                    }}
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  >
                    Continue to Passenger Details
                  </Button>
                </>
              ) : (
                <div className="py-4 text-center text-sm text-muted-foreground">
                  Select up to 6 seats to continue
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SeatSelection;
