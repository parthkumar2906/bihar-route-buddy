import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle, Download, Mail, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface BookingConfirmation {
  bookingId: string;
  bus: { name: string; operator: string; type: string; departureTime: string; arrivalTime: string };
  passengers: Array<{ name: string; seatNumber: string }>;
  seats: string[];
  date: string;
  boarding: string;
  dropping: string;
  total: number;
  paymentMethod: string;
}

const Confirmation = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState<BookingConfirmation | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("lastBooking");
    if (stored) setBooking(JSON.parse(stored));
  }, []);

  if (!booking) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-32 text-muted-foreground">
          Booking not found
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-2xl"
        >
          {/* Success header */}
          <div className="mb-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <CheckCircle className="mx-auto mb-4 h-16 w-16 text-success" />
            </motion.div>
            <h1 className="text-2xl font-bold text-foreground">Booking Confirmed!</h1>
            <p className="mt-1 text-muted-foreground">Your ticket has been booked successfully</p>
          </div>

          {/* Ticket card */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
            {/* Header */}
            <div className="gradient-hero p-6 text-primary-foreground">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wide opacity-70">Booking ID</div>
                  <div className="text-xl font-bold">{booking.bookingId}</div>
                </div>
                <div className="rounded-lg bg-primary-foreground/20 px-3 py-1 text-sm font-medium">
                  Confirmed ✓
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Bus details */}
              <div>
                <div className="font-semibold text-foreground">{booking.bus.name}</div>
                <div className="text-sm text-muted-foreground">{booking.bus.operator} · {booking.bus.type}</div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground">Departure</div>
                  <div className="font-semibold text-foreground">{booking.bus.departureTime}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Date</div>
                  <div className="font-semibold text-foreground">{new Date(booking.date).toLocaleDateString("en-IN")}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Arrival</div>
                  <div className="font-semibold text-foreground">{booking.bus.arrivalTime}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground">Boarding Point</div>
                  <div className="font-medium text-foreground">{booking.boarding}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Dropping Point</div>
                  <div className="font-medium text-foreground">{booking.dropping}</div>
                </div>
              </div>

              <div className="text-sm">
                <div className="text-xs text-muted-foreground mb-1">Seats</div>
                <div className="flex flex-wrap gap-1">
                  {booking.seats.map((s) => (
                    <span key={s} className="rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">{s}</span>
                  ))}
                </div>
              </div>

              {/* Passengers */}
              <div className="text-sm">
                <div className="text-xs text-muted-foreground mb-1">Passengers</div>
                {booking.passengers.map((p, i) => (
                  <div key={i} className="flex justify-between py-1">
                    <span className="text-foreground">{p.name}</span>
                    <span className="text-muted-foreground">Seat {p.seatNumber}</span>
                  </div>
                ))}
              </div>

              {/* QR placeholder */}
              <div className="flex items-center justify-center border-t border-dashed border-border pt-5">
                <div className="flex h-32 w-32 items-center justify-center rounded-lg border-2 border-dashed border-muted bg-muted/50">
                  <div className="text-center text-xs text-muted-foreground">
                    QR Code<br />Ticket
                  </div>
                </div>
              </div>

              <div className="flex justify-between border-t border-border pt-3 text-lg font-bold">
                <span className="text-foreground">Amount Paid</span>
                <span className="text-foreground">₹{booking.total}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Button variant="outline" className="gap-2" onClick={() => toast.info("PDF download coming soon!")}>
              <Download className="h-4 w-4" /> Download PDF
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => toast.info("Email ticket coming soon!")}>
              <Mail className="h-4 w-4" /> Email Ticket
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => toast.info("Share coming soon!")}>
              <Share2 className="h-4 w-4" /> Share
            </Button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Confirmation;
