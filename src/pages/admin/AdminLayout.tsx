import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Bed, CalendarCheck, Settings, LogOut, UserCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('Admin');

  useEffect(() => {
    const userJson = localStorage.getItem('sen_vang_admin_user');
    if (userJson) {
      const user = JSON.parse(userJson);
      setAdminName(user.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('sen_vang_admin_token');
    localStorage.removeItem('sen_vang_admin_user');
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-secondary text-white flex flex-col shadow-xl z-20">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <Link to="/" className="text-2xl font-serif font-bold text-primary">SV Admin</Link>
        </div>
        <div className="flex-grow py-6 px-4 space-y-2">
          <Link to="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === '/admin' ? 'bg-primary text-secondary-dark font-bold shadow-md' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}>
            <LayoutDashboard className="h-5 w-5" /> Tổng quan
          </Link>
          <Link to="/admin/bookings" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname.includes('/admin/bookings') ? 'bg-primary text-secondary-dark font-bold shadow-md' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}>
            <CalendarCheck className="h-5 w-5" /> Đơn Đặt phòng
          </Link>
          <Link to="/admin/rooms" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname.includes('/admin/rooms') ? 'bg-primary text-secondary-dark font-bold shadow-md' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}>
            <Bed className="h-5 w-5" /> Quản lý Phòng
          </Link>
          <Link to="/admin/guests" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname.includes('/admin/guests') ? 'bg-primary text-secondary-dark font-bold shadow-md' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}>
            <Users className="h-5 w-5" /> Khách hàng
          </Link>
          <Link to="/admin/settings" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname.includes('/admin/settings') ? 'bg-primary text-secondary-dark font-bold shadow-md' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}>
            <Settings className="h-5 w-5" /> Cài đặt
          </Link>
        </div>
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-300 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" /> Đăng xuất
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header */}
        <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8 z-10 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            {location.pathname === '/admin' && 'Bảng điều khiển (Dashboard)'}
            {location.pathname.includes('/admin/rooms') && 'Quản lý Hạng phòng & Giá'}
            {location.pathname.includes('/admin/bookings') && 'Quản lý Đơn Đặt phòng'}
            {location.pathname.includes('/admin/guests') && 'Danh sách Khách hàng'}
            {location.pathname.includes('/admin/settings') && 'Cài đặt Hệ thống'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600 text-right">
              <p className="font-black text-secondary tracking-tight">{adminName}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary-dark">Quản trị viên</p>
            </div>
            <div className="w-12 h-12 bg-secondary/5 rounded-full flex items-center justify-center text-secondary border-2 border-secondary/10 shadow-inner">
               <UserCircle className="h-8 w-8" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
