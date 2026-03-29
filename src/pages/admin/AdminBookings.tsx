import { useState, useEffect } from 'react';
import { fetchAdminBookings, updateBookingStatus } from '../../services/api';
import { Search, Filter, Loader2, CheckCircle, XCircle, Clock, MoreVertical } from 'lucide-react';

const AdminBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await fetchAdminBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await updateBookingStatus(id, newStatus);
      loadBookings(); // Refresh list
    } catch (err) {
      alert('Lỗi khi cập nhật trạng thái');
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'ALL' || b.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Tìm theo tên khách hoặc mã đơn..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3">
          <Filter className="h-5 w-5 text-gray-400" />
          <select 
            className="border border-gray-200 rounded-lg px-4 py-2 bg-white text-sm outline-none focus:ring-1 focus:ring-primary"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="PENDING">Chờ xác nhận</option>
            <option value="PAID">Đã thanh toán</option>
            <option value="COMPLETED">Hoàn tất</option>
            <option value="CANCELLED">Đã hủy</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b font-bold">
                <th className="px-6 py-4">Mã Đơn / Ngày đặt</th>
                <th className="px-6 py-4">Khách hàng</th>
                <th className="px-6 py-4">Sản phẩm / Vị trí</th>
                <th className="px-6 py-4">Thời gian lưu trú</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-right">Tổng tiền</th>
                <th className="px-6 py-4">Thao tác</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400 italic">Không có dữ liệu phù hợp</td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-black text-primary text-xs tracking-tighter mb-1">#{b.id.slice(0,8).toUpperCase()}</p>
                      <p className="text-[10px] text-gray-400 font-medium italic">{new Date(b.createdAt).toLocaleDateString('vi-VN')}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-800">{b.user?.name}</p>
                      <p className="text-xs text-gray-500">{b.user?.phone || 'N/A'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800 line-clamp-1">{b.room?.name}</p>
                      <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500 font-bold uppercase">{b.room?.category}</span>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-gray-600">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(b.checkIn).toLocaleDateString('vi-VN')}</span>
                        <span className="flex items-center gap-1 opacity-50"><Clock className="h-3 w-3" /> {new Date(b.checkOut).toLocaleDateString('vi-VN')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {b.status === 'PENDING' && (
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase ring-1 ring-amber-200 shadow-sm">
                          <Clock className="h-2 w-2" /> Chờ xác nhận
                        </span>
                      )}
                      {b.status === 'PAID' && (
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase ring-1 ring-emerald-200 shadow-sm">
                          <CheckCircle className="h-2 w-2" /> Đã thanh toán
                        </span>
                      )}
                      {b.status === 'CANCELLED' && (
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-[10px] font-black uppercase ring-1 ring-rose-200 shadow-sm">
                          <XCircle className="h-2 w-2" /> Đã hủy
                        </span>
                      )}
                       {b.status === 'COMPLETED' && (
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase ring-1 ring-blue-200 shadow-sm">
                          <CheckCircle className="h-2 w-2" /> Hoàn tất
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="font-black text-gray-900">{b.totalPrice.toLocaleString('vi-VN')} đ</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                         {b.status === 'PENDING' && (
                           <button 
                             onClick={() => handleStatusUpdate(b.id, 'PAID')}
                             className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded-md transition-colors"
                             title="Xác nhận thanh toán"
                           >
                              <CheckCircle className="h-5 w-5" />
                           </button>
                         )}
                         {b.status !== 'CANCELLED' && b.status !== 'COMPLETED' && (
                            <button 
                              onClick={() => handleStatusUpdate(b.id, 'CANCELLED')}
                              className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-md transition-colors"
                              title="Hủy đơn"
                            >
                               <XCircle className="h-5 w-5" />
                            </button>
                         )}
                         <button className="p-1.5 hover:bg-gray-100 text-gray-400 rounded-md transition-colors">
                           <MoreVertical className="h-5 w-5" />
                         </button>
                      </div>
                    </td>
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

export default AdminBookings;
