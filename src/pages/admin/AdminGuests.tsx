import { useState, useEffect } from 'react';
import { fetchAdminGuests } from '../../services/api';
import { Users, Mail, Phone, Calendar, UserCheck, Search, Loader2 } from 'lucide-react';

const AdminGuests = () => {
  const [guests, setGuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const loadGuests = async () => {
    try {
      setLoading(true);
      const data = await fetchAdminGuests();
      setGuests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGuests();
  }, []);

  const filteredGuests = guests.filter(g => 
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    g.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (g.phone && g.phone.includes(searchTerm))
  );

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
            placeholder="Tìm theo tên, email hoặc số điện thoại..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="bg-white px-4 py-2 rounded-lg border border-gray-100 flex items-center gap-2 text-sm font-medium text-gray-600">
           <Users className="h-4 w-4 text-primary" />
           Tổng cộng: <span className="text-secondary font-bold">{guests.length}</span> khách hàng
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuests.length === 0 ? (
          <div className="col-span-full py-20 text-center text-gray-400 italic">Không tìm thấy khách hàng nào</div>
        ) : (
          filteredGuests.map((guest) => (
            <div key={guest.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-xl">
                  {guest.name.charAt(0).toUpperCase()}
                </div>
                <div>
                   <h4 className="font-serif font-bold text-lg text-secondary">{guest.name}</h4>
                   <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded font-black uppercase ring-1 ring-emerald-100">Khách Hàng Thân Thiết</span>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="truncate">{guest.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{guest.phone || 'Chưa cung cấp SĐT'}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 pt-2 border-t border-gray-50">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>Tham gia: {new Date(guest.createdAt).toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <UserCheck className="h-4 w-4 text-primary" />
                  <span className="font-bold">Đã đặt: {guest._count?.bookings || 0} đơn phòng</span>
                </div>
              </div>

              <button className="w-full mt-6 py-2 border border-primary text-primary hover:bg-primary hover:text-white rounded-lg transition-all text-xs font-bold uppercase tracking-widest">
                Xem Lịch Sử Đặt Phòng
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminGuests;
