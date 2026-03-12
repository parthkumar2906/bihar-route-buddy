import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { buses } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { CreditCard, Smartphone, Building, Wallet } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

interface BookingData {
  busId: string;
  date: string;
  seats: string[];
  total: number;
  passengers: Array<{ name: string; age: number; gender: string; seatNumber: string }>;
  boarding: string;
  dropping: string;
  contactPhone: string;
  contactEmail: string;
}

const paymentMethods = [
  { id: "upi", label: "UPI", icon: Smartphone, desc: "Google Pay, PhonePe, Paytm" },
  { id: "card", label: "Credit/Debit Card", icon: CreditCard, desc: "Visa, Mastercard, Rupay" },
  { id: "netbanking", label: "Net Banking", icon: Building, desc: "All major banks" },
  { id: "wallet", label: "Wallet", icon: Wallet, desc: "Paytm, Mobikwik, Amazon Pay" },
];

const Checkout = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<BookingData | null>(null);
  const [method, setMethod] = useState("upi");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("bookingData");
    if (stored) {
      setData(JSON.parse(stored));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!data) return null;

  const bus = buses.find((b) => b.id === data.busId);
  if (!bus) return null;

  const applyCoupon = () => {
    if (coupon === "FIRST50") {
      setDiscount(Math.min(data.total * 0.5, 200));
      toast.success("Coupon applied! 50% off (max ₹200)");
    } else if (coupon === "BIHAR100") {
      setDiscount(100);
      toast.success("Coupon applied! ₹100 off");
    } else {
      toast.error("Invalid coupon code");
    }
  };

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      const bookingId = "BY" + Date.now().toString().slice(-8);
      sessionStorage.setItem("lastBooking", JSON.stringify({
        bookingId,
        bus,
        passengers: data.passengers,
        seats: data.seats,
        date: data.date,
        boarding: data.boarding,
        dropping: data.dropping,
        total: data.total - discount,
        paymentMethod: method,
      }));
      sessionStorage.removeItem("bookingData");
      navigate(`/confirmation/${bookingId}`);
    }, 2000);
  };

  const finalAmount = data.total - discount;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="gradient-hero py-6">
        <div className="container text-primary-foreground">
          <h1 className="text-xl font-bold">Checkout</h1>
          <p className="text-sm opacity-80">Complete your booking</p>
        </div>
      </div>

      <div className="container py-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Left - Payment */}
            <div className="flex-1 space-y-4">
              {/* Payment Method */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-4 font-semibold text-foreground">Payment Method</h3>
                <div className="space-y-2">
                  {paymentMethods.map((pm) => (
                    <button
                      key={pm.id}
                      onClick={() => setMethod(pm.id)}
                      className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                        method === pm.id
                          ? "border-primary bg-accent"
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      <pm.icon className={`h-5 w-5 ${method === pm.id ? "text-primary" : "text-muted-foreground"}`} />
                      <div>
                        <div className="text-sm font-medium text-foreground">{pm.label}</div>
                        <div className="text-xs text-muted-foreground">{pm.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Coupon */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-3 font-semibold text-foreground">Have a Coupon?</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                    placeholder="Enter coupon code"
                    maxLength={20}
                    className="h-10 flex-1 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <Button variant="outline" onClick={applyCoupon}>Apply</Button>
                </div>
              </div>
            </div>

            {/* Right - Summary */}
            <aside className="shrink-0 lg:w-80">
              <div className="sticky top-20 rounded-xl border border-border bg-card p-5">
                <h3 className="mb-4 font-semibold text-foreground">Booking Summary</h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bus</span>
                    <span className="font-medium text-foreground">{bus.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="text-foreground">{new Date(data.date).toLocaleDateString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Seats</span>
                    <span className="text-foreground">{data.seats.join(", ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Passengers</span>
                    <span className="text-foreground">{data.passengers.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Boarding</span>
                    <span className="text-right text-xs text-foreground">{data.boarding}</span>
                  </div>

                  <div className="border-t border-border pt-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">₹{data.total}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-success">
                        <span>Discount</span>
                        <span>-₹{discount}</span>
                      </div>
                    )}
                    <div className="mt-2 flex justify-between border-t border-border pt-2 text-lg font-bold">
                      <span className="text-foreground">Total</span>
                      <span className="text-foreground">₹{finalAmount}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handlePay}
                  disabled={processing}
                  className="mt-4 w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  {processing ? "Processing..." : `Pay ₹${finalAmount}`}
                </Button>

                <p className="mt-2 text-center text-xs text-muted-foreground">
                  🔒 Secured by Razorpay · 256-bit SSL
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
