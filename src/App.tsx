import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';

// Public Imports
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetails';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';

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

function App() {
  return (
    <Router>
      <Routes>
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

        <Route path="*" element={<PublicWrapper />} />
      </Routes>
    </Router>
  );
}

function PublicWrapper() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/room/:id" element={<RoomDetails />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<div className="pt-32 pb-20 text-center"><h1>404 - Không tìm thấy trang</h1></div>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
