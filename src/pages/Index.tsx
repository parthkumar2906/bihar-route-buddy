import Navbar from "@/components/Navbar";
import HeroSearch from "@/components/HeroSearch";
import PopularRoutes from "@/components/PopularRoutes";
import Features from "@/components/Features";
import Reviews from "@/components/Reviews";
import Offers from "@/components/Offers";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSearch />
    <PopularRoutes />
    <Features />
    <Offers />
    <Reviews />
    <Footer />
  </div>
);

export default Index;
