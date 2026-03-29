import { DollarSign, Component, Calendar, Users, TrendingUp, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchAdminBookings } from '../../services/api';

const Dashboard = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchAdminBookings();
        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          console.error('API returned non-array:', data);
          setBookings([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, []);

  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Doanh thu hệ thống</p>
              <h3 className="text-2xl font-bold text-gray-900">{totalRevenue.toLocaleString('vi-VN')} đ</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">Bản Live</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Đơn đặt phòng</p>
              <h3 className="text-2xl font-bold text-gray-900">{bookings.length}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
            Cập nhật tức thì
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Công suất phòng</p>
              <h3 className="text-2xl font-bold text-gray-900">100%</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Component className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Khách hàng</p>
              <h3 className="text-2xl font-bold text-gray-900">{new Set(bookings.map(b => b.userId)).size}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <Users className="h-5 w-5 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500 font-medium">
            Thực tế từ Database
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Đơn đặt phòng gần đây (Real-time)</h3>
          <button className="text-primary text-sm font-medium hover:underline">Xem tất cả</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b">
                <th className="px-6 py-4 font-medium">Mã Đặt Phòng</th>
                <th className="px-6 py-4 font-medium">Khách hàng</th>
                <th className="px-6 py-4 font-medium">Hạng phòng</th>
                <th className="px-6 py-4 font-medium">Trạng thái</th>
                <th className="px-6 py-4 font-medium text-right">Tổng tiền</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-400 italic">Chưa có đơn đặt phòng nào thực tế.</td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-primary">#{booking.id.slice(0,8).toUpperCase()}</td>
                    <td className="px-6 py-4 font-medium">
                      {booking.user?.name}
                      <br/>
                      <span className="text-gray-400 font-normal text-xs">{booking.user?.email}</span>
                    </td>
                    <td className="px-6 py-4 underline decoration-primary/30 underline-offset-4">{booking.room?.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${booking.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {booking.status === 'PAID' ? 'Đã thanh toán' : 'Chờ xác nhận'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-gray-900">{booking.totalPrice.toLocaleString('vi-VN')} đ</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
