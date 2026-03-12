// Mock data for the bus booking platform

export interface City {
  id: string;
  name: string;
  state: string;
}

export interface Route {
  id: string;
  from: City;
  to: City;
  distance: number;
  duration: string;
  popularity: number;
}

export interface Bus {
  id: string;
  name: string;
  operator: string;
  type: "AC Sleeper" | "AC Seater" | "Non-AC Sleeper" | "Non-AC Seater" | "Volvo AC" | "Semi Sleeper";
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  rating: number;
  totalSeats: number;
  availableSeats: number;
  amenities: string[];
  routeId: string;
}

export interface Seat {
  id: string;
  number: string;
  row: number;
  col: number;
  deck: "lower" | "upper";
  type: "seater" | "sleeper";
  status: "available" | "booked";
  price: number;
}

export interface Passenger {
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  phone: string;
  email: string;
  seatNumber: string;
}

export interface Booking {
  id: string;
  bus: Bus;
  passengers: Passenger[];
  seats: string[];
  boardingPoint: string;
  droppingPoint: string;
  travelDate: string;
  totalAmount: number;
  status: "confirmed" | "cancelled";
  paymentMethod: string;
}

export const cities: City[] = [
  { id: "patna", name: "Patna", state: "Bihar" },
  { id: "gaya", name: "Gaya", state: "Bihar" },
  { id: "muzaffarpur", name: "Muzaffarpur", state: "Bihar" },
  { id: "bhagalpur", name: "Bhagalpur", state: "Bihar" },
  { id: "purnia", name: "Purnia", state: "Bihar" },
  { id: "darbhanga", name: "Darbhanga", state: "Bihar" },
  { id: "begusarai", name: "Begusarai", state: "Bihar" },
  { id: "arrah", name: "Arrah", state: "Bihar" },
  { id: "katihar", name: "Katihar", state: "Bihar" },
  { id: "munger", name: "Munger", state: "Bihar" },
  { id: "delhi", name: "Delhi", state: "Delhi" },
  { id: "kolkata", name: "Kolkata", state: "West Bengal" },
  { id: "ranchi", name: "Ranchi", state: "Jharkhand" },
  { id: "varanasi", name: "Varanasi", state: "Uttar Pradesh" },
  { id: "lucknow", name: "Lucknow", state: "Uttar Pradesh" },
  { id: "jamshedpur", name: "Jamshedpur", state: "Jharkhand" },
  { id: "siliguri", name: "Siliguri", state: "West Bengal" },
];

export const popularRoutes: Route[] = [
  { id: "r1", from: cities[0], to: cities[10], distance: 1000, duration: "14h 30m", popularity: 95 },
  { id: "r2", from: cities[0], to: cities[11], distance: 583, duration: "8h 45m", popularity: 90 },
  { id: "r3", from: cities[1], to: cities[11], distance: 495, duration: "7h 30m", popularity: 85 },
  { id: "r4", from: cities[2], to: cities[12], distance: 450, duration: "7h", popularity: 80 },
  { id: "r5", from: cities[0], to: cities[13], distance: 290, duration: "5h", popularity: 88 },
  { id: "r6", from: cities[0], to: cities[12], distance: 325, duration: "5h 30m", popularity: 82 },
  { id: "r7", from: cities[3], to: cities[11], distance: 350, duration: "6h", popularity: 75 },
  { id: "r8", from: cities[0], to: cities[14], distance: 530, duration: "9h", popularity: 78 },
];

export const buses: Bus[] = [
  {
    id: "b1", name: "Bihar Rajdhani Express", operator: "Bihar State Transport",
    type: "Volvo AC", departureTime: "21:00", arrivalTime: "11:30",
    duration: "14h 30m", price: 1200, rating: 4.3, totalSeats: 36,
    availableSeats: 12, amenities: ["WiFi", "Charging", "Water", "Blanket"],
    routeId: "r1",
  },
  {
    id: "b2", name: "Patna Express Sleeper", operator: "Mahadev Travels",
    type: "AC Sleeper", departureTime: "19:30", arrivalTime: "10:00",
    duration: "14h 30m", price: 1500, rating: 4.5, totalSeats: 30,
    availableSeats: 8, amenities: ["WiFi", "Charging", "Water", "Blanket", "Snacks"],
    routeId: "r1",
  },
  {
    id: "b3", name: "Ganga Deluxe", operator: "Ganga Travels",
    type: "AC Seater", departureTime: "22:00", arrivalTime: "12:30",
    duration: "14h 30m", price: 950, rating: 4.0, totalSeats: 44,
    availableSeats: 20, amenities: ["Charging", "Water"],
    routeId: "r1",
  },
  {
    id: "b4", name: "Kolkata Night Rider", operator: "Bengal Express",
    type: "AC Sleeper", departureTime: "20:00", arrivalTime: "04:45",
    duration: "8h 45m", price: 800, rating: 4.2, totalSeats: 30,
    availableSeats: 15, amenities: ["WiFi", "Charging", "Water", "Blanket"],
    routeId: "r2",
  },
  {
    id: "b5", name: "Varanasi Shuttle", operator: "Kashi Travels",
    type: "Non-AC Seater", departureTime: "06:00", arrivalTime: "11:00",
    duration: "5h", price: 350, rating: 3.8, totalSeats: 50,
    availableSeats: 30, amenities: ["Water"],
    routeId: "r5",
  },
  {
    id: "b6", name: "Ranchi Express AC", operator: "Jharkhand Motors",
    type: "Volvo AC", departureTime: "08:00", arrivalTime: "13:30",
    duration: "5h 30m", price: 650, rating: 4.1, totalSeats: 40,
    availableSeats: 18, amenities: ["WiFi", "Charging", "Water"],
    routeId: "r6",
  },
  {
    id: "b7", name: "Budget Bihar", operator: "Jan Seva Transport",
    type: "Non-AC Seater", departureTime: "23:00", arrivalTime: "13:00",
    duration: "14h", price: 600, rating: 3.5, totalSeats: 52,
    availableSeats: 35, amenities: ["Water"],
    routeId: "r1",
  },
  {
    id: "b8", name: "Premium Night Coach", operator: "Royal Travels",
    type: "Semi Sleeper", departureTime: "20:30", arrivalTime: "11:00",
    duration: "14h 30m", price: 1100, rating: 4.4, totalSeats: 36,
    availableSeats: 5, amenities: ["WiFi", "Charging", "Water", "Blanket", "Entertainment"],
    routeId: "r1",
  },
];

export function generateSeats(busType: string): Seat[] {
  const seats: Seat[] = [];
  const isSleeper = busType.toLowerCase().includes("sleeper");
  const cols = isSleeper ? 4 : 5;
  const rows = isSleeper ? 8 : 10;
  let seatNum = 1;

  for (let deck of ["lower", "upper"] as const) {
    if (!isSleeper && deck === "upper") continue;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!isSleeper && c === 2) continue; // aisle
        const isBooked = Math.random() < 0.3;
        seats.push({
          id: `s${seatNum}`,
          number: `${deck === "upper" ? "U" : "L"}${seatNum}`,
          row: r,
          col: c,
          deck,
          type: isSleeper ? "sleeper" : "seater",
          status: isBooked ? "booked" : "available",
          price: isSleeper ? 800 : 500,
        });
        seatNum++;
      }
    }
  }
  return seats;
}

export const boardingPoints = [
  "Patna Junction - Gate 1",
  "Gandhi Maidan Bus Stand",
  "Danapur Bus Stop",
  "Rajendra Nagar Terminal",
  "Boring Road Crossing",
];

export const droppingPoints = [
  "Kashmere Gate ISBT",
  "Anand Vihar Terminal",
  "Dhaula Kuan",
  "Majnu Ka Tilla",
  "Connaught Place",
];

export const reviews = [
  { id: 1, name: "Rahul Kumar", rating: 5, comment: "Excellent service! Very comfortable AC bus. On time departure and arrival.", city: "Patna", avatar: "RK" },
  { id: 2, name: "Priya Singh", rating: 4, comment: "Good experience overall. Clean bus and friendly staff. Will book again.", city: "Gaya", avatar: "PS" },
  { id: 3, name: "Amit Verma", rating: 5, comment: "Best bus booking platform for Bihar routes. Easy to use and great prices.", city: "Muzaffarpur", avatar: "AV" },
  { id: 4, name: "Sneha Devi", rating: 4, comment: "Smooth booking process. Seat selection was very intuitive. Recommended!", city: "Bhagalpur", avatar: "SD" },
];

export const offers = [
  { id: 1, code: "FIRST50", discount: "50% OFF", description: "On your first booking", maxDiscount: 200, minBooking: 300 },
  { id: 2, code: "BIHAR100", discount: "₹100 OFF", description: "On Bihar routes", maxDiscount: 100, minBooking: 500 },
  { id: 3, code: "WEEKEND25", discount: "25% OFF", description: "Weekend special", maxDiscount: 300, minBooking: 400 },
];
