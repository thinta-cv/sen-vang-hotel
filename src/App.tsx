import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

// Public Imports
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Rooms from './pages/Rooms';
import Villas from './pages/Villas';
import Apartments from './pages/Apartments';
import RoomDetails from './pages/RoomDetails';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import BookingHistory from './pages/BookingHistory';

// Admin Imports
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminBookings from './pages/admin/AdminBookings';
import AdminRooms from './pages/admin/AdminRooms';
import AdminGuests from './pages/admin/AdminGuests';
import Login from './pages/admin/Login';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('sen_vang_admin_token');
  if (!token) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};

// Layout cho trang Public (Khách)
const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      
      {/* Floating Zalo Button */}
      <a 
        href="https://zalo.me/0901234567" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#0068ff] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center animate-bounce"
        title="Chat với chúng tôi qua Zalo"
      >
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black uppercase leading-none mb-1">Zalo</span>
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path d="M22.707 11.13c-.02-.19-.07-.37-.16-.54-.09-.17-.22-.32-.38-.45l-1.57-1.1c-.26-.18-.56-.28-.87-.28H4.28c-.31 0-.61.1-.87.28l-1.57 1.1c-.16.13-.29.28-.38.45-.09.17-.14.35-.16.54v6.74c0 .32.11.64.3.9.19.26.47.45.79.52l1.62.33c.12.03.25.04.37.04.2 0 .39-.04.57-.12.18-.08.34-.19.47-.34.13-.15.22-.32.27-.51.05-.19.06-.38.04-.57l-.33-1.62c-.03-.12-.04-.25-.04-.37 0-.2.04-.39.12-.57.08-.18.19-.34.34-.47.15-.13.32-.22.51-.27.19-.05.38-.06.57-.04l1.62.33c.43.09.87.01 1.25-.22l.53-.33c.1-.06.18-.15.22-.26.04-.11.05-.23.02-.35l-.26-1.12c-.08-.34-.04-.7.12-1.02.16-.32.44-.56.78-.67l1.12-.36c.11-.04.21-.11.28-.21.07-.1.11-.22.11-.34V4.5c0-.28.11-.54.31-.74.2-.2.46-.31.74-.31h5.8c.28 0 .54.11.74.31.2.2.31.46.31.74v6.3c0 .12.04.24.11.34s.17.17.28.21l1.12.36c.34.11.62.35.78.67.16.32.2.68.12 1.02l-.26 1.12c-.03.12-.02.24.02.35.04.11.12.2.22.26l.53.33c.38.23.82.31 1.25.22l1.62-.33c.19-.04.38-.03.57.02.19.05.36.14.51.27.15.13.26.29.34.47.08.18.12.37.12.57 0 .12-.01.25-.04.37l-.33 1.62c-.02.19-.01.38.04.57.05.19.14.36.27.51.13.15.29.26.47.34.18.08.37.12.57.12.12 0 .25-.01.37-.04l1.62-.33c.32-.07.6-.26.79-.52s.3-.58.3-.9v-6.74z"/>
          </svg>
        </div>
      </a>
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="rooms" element={<AdminRooms />} />
            <Route path="guests" element={<AdminGuests />} />
            <Route path="settings" element={<div className="p-8 bg-white rounded-xl shadow-sm text-center"><h1>Cài đặt hệ thống đang được xây dựng...</h1></div>} />
          </Route>

          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="villas" element={<Villas />} />
            <Route path="apartments" element={<Apartments />} />
            <Route path="room/:id" element={<RoomDetails />} />
            <Route path="rooms/:id" element={<RoomDetails />} />
            <Route path="history" element={<BookingHistory />} />
            <Route path="services" element={<Services />} />
            <Route path="contact" element={<Contact />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="*" element={<div className="pt-32 pb-20 text-center text-secondary"><h1>404 - Không tìm thấy trang</h1></div>} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
