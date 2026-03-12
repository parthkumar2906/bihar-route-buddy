import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import SearchResults from "./pages/SearchResults.tsx";
import SeatSelection from "./pages/SeatSelection.tsx";
import PassengerDetails from "./pages/PassengerDetails.tsx";
import Checkout from "./pages/Checkout.tsx";
import Confirmation from "./pages/Confirmation.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/select-seats/:busId" element={<SeatSelection />} />
          <Route path="/passenger-details/:busId" element={<PassengerDetails />} />
          <Route path="/checkout/:busId" element={<Checkout />} />
          <Route path="/confirmation/:bookingId" element={<Confirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
