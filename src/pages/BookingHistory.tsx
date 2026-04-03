import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, UserCircle, MapPin, Clock } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

const BookingHistory = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in
  const token = localStorage.getItem('sen_vang_token');
  const user = JSON.parse(localStorage.getItem('sen_vang_user') || 'null');

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace('/api', '') : 'http://127.0.0.1:5000';
        const res = await fetch(`${baseUrl}/api/customer/bookings`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setBookings(data);
        }
      } catch (e) {
        console.error("Lỗi khi tải lịch sử:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  if (!token) return <Navigate to="/" />;

  if (loading) {
    return (
      <div className="pt-40 pb-20 flex justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-[80vh] bg-gray-50 pb-20">
      <Helmet>
        <title>Lịch Sử Đặt Phòng | Sen Vàng Hotel</title>
      </Helmet>

      <div className="bg-secondary-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
              <UserCircle className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold text-yellow-50">{user?.name}</h1>
              <p className="text-gray-300 font-medium tracking-wider text-sm">{user?.phone} | {user?.email}</p>
            </div>
          </div>
          <div className="bg-white/5 px-6 py-3 rounded-lg border border-white/10">
            <span className="text-sm text-gray-400 uppercase tracking-widest font-bold block mb-1">Tổng Số Đơn Đặt</span>
            <span className="text-3xl font-black text-primary">{bookings.length}</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-2xl font-bold text-secondary mb-8 uppercase flex items-center gap-2">
          <Calendar className="h-6 w-6 text-primary" /> Lịch sử Đơn Phòng
        </h2>

        {bookings.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl shadow-sm text-center border border-gray-100">
            <Clock className="h-16 w-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-500 mb-2">Chưa có lịch sử đặt phòng nào</h3>
            <p className="text-gray-400 mb-6">Bạn chưa thực hiện gửi yêu cầu đặt phòng nào trên hệ thống.</p>
            <Link to="/rooms" className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-primary/30">
              Khám phá phòng ngay
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((b) => (
              <div key={b.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 h-48 md:h-auto relative">
                  {b.room?.images?.[0] ? (
                    <img src={b.room.images[0]} alt={b.room.name} className="w-full h-full object-cover" />
                  ) : (
                     <div className="w-full h-full bg-gray-200 flex items-center justify-center">Mất ảnh</div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full shadow-md ${b.status === 'PENDING' ? 'bg-orange-100 text-orange-600' : b.status === 'CONFIRMED' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                       {b.status === 'PENDING' ? 'Đang chờ duyệt' : b.status === 'CONFIRMED' ? 'Đã xác nhận' : 'Đã hủy'}
                    </span>
                  </div>
                </div>
                <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-serif font-bold text-secondary">{b.room?.name || 'Phòng đã bị xóa'}</h3>
                      <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded border">#{b.id.slice(0,8).toUpperCase()}</span>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                      <MapPin className="h-4 w-4" /> {b.room?.location}
                    </p>

                    <div className="flex flex-wrap gap-x-8 gap-y-4 mb-6 pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-400 uppercase font-black mb-1">Check-in</p>
                        <p className="font-bold text-gray-800">{new Date(b.checkIn).toLocaleDateString('vi-VN')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase font-black mb-1">Check-out</p>
                        <p className="font-bold text-gray-800">{new Date(b.checkOut).toLocaleDateString('vi-VN')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Tổng chi phí</p>
                      <p className="text-2xl font-black text-primary">{b.totalPrice.toLocaleString('vi-VN')} đ</p>
                    </div>
                    {b.status === 'PENDING' && (
                       <div className="text-right">
                          <p className="text-xs text-blue-600 italic font-medium">Báo giá này là bảo lưu tạm thời.</p>
                          <p className="text-xs text-gray-500 italic">Lễ tân sẽ liên hệ bạn để chốt đơn.</p>
                       </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;
