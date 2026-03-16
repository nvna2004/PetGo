import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Core pages
import HomePage from "./pages/HomePage";
import ProviderListPage from "./pages/ProviderListPage";
import SearchFilterPage from "./pages/SearchFilterPage";
import CompareProvidersPage from "./pages/CompareProvidersPage";
import ProviderDetailPage from "./pages/ProviderDetailPage";
import BookingPage from "./pages/BookingPage";
import PaymentPage from "./pages/PaymentPage";
import BookingSuccessPage from "./pages/BookingSuccessPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import BookingDetailPage from "./pages/BookingDetailPage";
import ReviewPage from "./pages/ReviewPage";
import FavoritesPage from "./pages/FavoritesPage";
import RescheduleBookingPage from "./pages/RescheduleBookingPage";
import CancelBookingPage from "./pages/CancelBookingPage";
import InvoicePage from "./pages/InvoicePage";
import NearbyProvidersPage from "./pages/NearbyProvidersPage";
import HelpCenterPage from "./pages/HelpCenterPage";

// Optional fallback page
// import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Provider / Service discovery */}
        <Route path="/providers" element={<ProviderListPage />} />
        <Route path="/search" element={<SearchFilterPage />} />
        <Route path="/compare" element={<CompareProvidersPage />} />
        <Route path="/providers/:id" element={<ProviderDetailPage />} />
        <Route path="/nearby" element={<NearbyProvidersPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />

        {/* Booking flow */}
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/booking-success" element={<BookingSuccessPage />} />

        {/* Booking management */}
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/bookings/:id" element={<BookingDetailPage />} />
        <Route path="/reschedule/:id" element={<RescheduleBookingPage />} />
        <Route path="/cancel-booking/:id" element={<CancelBookingPage />} />
        <Route path="/invoice" element={<InvoicePage />} />

        {/* Reviews */}
        <Route path="/reviews/create/:bookingId" element={<ReviewPage />} />

        {/* Support */}
        <Route path="/help-center" element={<HelpCenterPage />} />

        {/* Redirect helpers */}
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/services" element={<Navigate to="/search" replace />} />

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
        {/* Nếu bạn có trang 404 riêng thì dùng dòng này thay cho dòng trên */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}