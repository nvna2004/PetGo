import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProviderListPage from "./pages/ProviderListPage";
import SearchFilterPage from "./pages/SearchFilterPage";
import ProviderDetailPage from "./pages/ProviderDetailPage";
import BookingPage from "./pages/BookingPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import BookingDetailPage from "./pages/BookingDetailPage";
import ReviewPage from "./pages/ReviewPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProviderListPage />} />
        <Route path="/search" element={<SearchFilterPage />} />
        <Route path="/providers/:id" element={<ProviderDetailPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/bookings/:id" element={<BookingDetailPage />} />
        <Route path="/reviews/create/:bookingId" element={<ReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}