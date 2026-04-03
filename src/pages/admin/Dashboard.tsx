import { DollarSign, Component, Calendar, Users, TrendingUp, Loader2 } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { fetchAdminBookings } from '../../services/api';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';
import { format, parseISO } from 'date-fns';

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

  // Prepare Revenue Chart Data (Last 7 days)
  const revenueData = useMemo(() => {
    const days: Record<string, number> = {};
    // Get last 7 days including today
    for (let i = 6; i >= 0; i--) {
      const d = new Array(new Date().setDate(new Date().getDate() - i))[0] as unknown as Date;
      days[format(d, 'yyyy-MM-dd')] = 0;
    }

    bookings.forEach(b => {
      if (b.createdAt) {
        try {
          const dateKey = format(parseISO(b.createdAt), 'yyyy-MM-dd');
          if (days[dateKey] !== undefined) {
            days[dateKey] += b.totalPrice || 0;
          }
        } catch (e) {}
      }
    });

    return Object.entries(days).map(([date, value]) => ({
      name: format(parseISO(date), 'dd/MM'),
      total: value
    }));
  }, [bookings]);

  // Prepare Room Category Data
  const categoryData = useMemo(() => {
    const cats: Record<string, number> = {};
    bookings.forEach(b => {
      const cat = b.room?.type || 'Khác';
      cats[cat] = (cats[cat] || 0) + 1;
    });
    return Object.entries(cats).map(([name, value]) => ({ name, value }));
  }, [bookings]);

  const COLORS = ['#FFD700', '#1E3A8A', '#3B82F6', '#10B981'];

  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Doanh thu hệ thống</p>
              <h3 className="text-2xl font-black text-secondary tracking-tight">{totalRevenue.toLocaleString('vi-VN')} đ</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/20">
              <DollarSign className="h-6 w-6 text-primary-dark" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs font-bold text-green-500">
            <TrendingUp className="h-3 w-3 mr-1" />
            Vận hành ổn định
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Đơn đặt phòng</p>
              <h3 className="text-2xl font-black text-secondary tracking-tight">{bookings.length}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 text-xs font-bold text-blue-600 italic">Dữ liệu thời gian thực</div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Công suất phòng</p>
              <h3 className="text-2xl font-black text-secondary tracking-tight">100%</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center border border-purple-100">
              <Component className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 mt-4">
            <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Khách hàng</p>
              <h3 className="text-2xl font-black text-secondary tracking-tight">{new Set(bookings.map(b => b.userId)).size}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 text-xs font-bold text-orange-600 uppercase tracking-tighter">Thành viên Sen Vàng</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-black text-secondary uppercase tracking-tight">Biểu đồ Doanh thu (7 ngày qua)</h3>
              <div className="px-3 py-1 bg-primary/10 text-primary-dark text-[10px] font-black rounded-full uppercase tracking-widest border border-primary/20">Hệ thống Live</div>
           </div>
           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FFD700" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FFD700" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 10, fontWeight: 700}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 10, fontWeight: 700}} tickFormatter={(value) => `${value/1000}k`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                    formatter={(value: any) => [Number(value).toLocaleString() + ' đ', 'Doanh thu']}
                  />
                  <Area type="monotone" dataKey="total" stroke="#FFD700" strokeWidth={4} fillOpacity={1} fill="url(#colorTotal)" />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Categories Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
           <h3 className="text-lg font-black text-secondary uppercase tracking-tight mb-8">Tỷ lệ Loại phòng</h3>
           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-black text-secondary uppercase tracking-tight">Đơn đặt phòng gần đây</h3>
          <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:text-primary-dark transition-colors px-4 py-2 bg-primary/5 rounded-lg border border-primary/10">Xem toàn bộ báo cáo</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] border-b">
                <th className="px-8 py-5">Mã Đơn</th>
                <th className="px-8 py-5">Khách hàng</th>
                <th className="px-8 py-5 text-center">Hạng phòng</th>
                <th className="px-8 py-5 text-center">Trạng thái</th>
                <th className="px-8 py-5 text-right whitespace-nowrap">Số tiền</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-medium italic">Hệ thống chưa có đơn đặt phòng nào thực tế.</td>
                </tr>
              ) : (
                bookings.slice(0, 5).map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/80 transition-all group">
                    <td className="px-8 py-5">
                      <span className="font-black text-primary bg-primary/5 px-3 py-1 rounded-full text-xs">#{booking.id.slice(0,8).toUpperCase()}</span>
                    </td>
                    <td className="px-8 py-5">
                       <div className="flex flex-col">
                          <span className="font-bold text-secondary">{booking.user?.name}</span>
                          <span className="text-[10px] text-gray-400 font-medium">{booking.user?.email}</span>
                       </div>
                    </td>
                    <td className="px-8 py-5 text-center font-bold text-gray-500 text-xs italic">{booking.room?.name}</td>
                    <td className="px-8 py-5 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block ${booking.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {booking.status === 'PAID' ? 'Đã thanh toán' : 'Chờ xác nhận'}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right font-black text-secondary tracking-tight">{booking.totalPrice.toLocaleString('vi-VN')} đ</td>
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
