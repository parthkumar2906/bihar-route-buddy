import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { buses, boardingPoints, droppingPoints, type Passenger } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PassengerDetails = () => {
  const { busId } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const bus = buses.find((b) => b.id === busId);
  const date = params.get("date") || "";
  const seatNums = (params.get("seats") || "").split(",");
  const total = Number(params.get("total") || 0);

  const [passengers, setPassengers] = useState<Passenger[]>(
    seatNums.map((s) => ({ name: "", age: 0, gender: "male", phone: "", email: "", seatNumber: s }))
  );
  const [boarding, setBoarding] = useState(boardingPoints[0]);
  const [dropping, setDropping] = useState(droppingPoints[0]);
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  if (!bus) return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Bus not found</div>;

  const updatePassenger = (i: number, field: keyof Passenger, value: string | number) => {
    setPassengers((prev) => prev.map((p, j) => (j === i ? { ...p, [field]: value } : p)));
  };

  const isValid = passengers.every((p) => p.name && p.age > 0) && contactPhone.length >= 10 && contactEmail.includes("@");

  const handleContinue = () => {
    const data = {
      busId: bus.id,
      date,
      seats: seatNums,
      total,
      passengers,
      boarding,
      dropping,
      contactPhone,
      contactEmail,
    };
    sessionStorage.setItem("bookingData", JSON.stringify(data));
    navigate(`/checkout/${bus.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="gradient-hero py-6">
        <div className="container text-primary-foreground">
          <h1 className="text-xl font-bold">Passenger Details</h1>
          <p className="text-sm opacity-80">{bus.name} · {seatNums.length} seat(s)</p>
        </div>
      </div>

      <div className="container py-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Contact Details */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-4 font-semibold text-foreground">Contact Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Phone Number *</label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  maxLength={15}
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Email *</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="you@email.com"
                  maxLength={100}
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>

          {/* Passengers */}
          {passengers.map((p, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-4 font-semibold text-foreground">
                Passenger {i + 1} — Seat {p.seatNumber}
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Full Name *</label>
                  <input
                    type="text"
                    value={p.name}
                    onChange={(e) => updatePassenger(i, "name", e.target.value)}
                    maxLength={80}
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Age *</label>
                  <input
                    type="number"
                    value={p.age || ""}
                    onChange={(e) => updatePassenger(i, "age", Number(e.target.value))}
                    min={1}
                    max={120}
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Gender</label>
                  <select
                    value={p.gender}
                    onChange={(e) => updatePassenger(i, "gender", e.target.value)}
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          ))}

          {/* Boarding / Dropping */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-4 font-semibold text-foreground">Boarding & Dropping Points</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Boarding Point</label>
                <select
                  value={boarding}
                  onChange={(e) => setBoarding(e.target.value)}
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {boardingPoints.map((bp) => <option key={bp} value={bp}>{bp}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Dropping Point</label>
                <select
                  value={dropping}
                  onChange={(e) => setDropping(e.target.value)}
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {droppingPoints.map((dp) => <option key={dp} value={dp}>{dp}</option>)}
                </select>
              </div>
            </div>
          </div>

          <Button
            onClick={handleContinue}
            disabled={!isValid}
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            Continue to Checkout — ₹{total}
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PassengerDetails;
