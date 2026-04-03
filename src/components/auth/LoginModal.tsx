import { useState } from 'react';
import { X, Mail, Lock, Phone, User as UserIcon } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/customer-login' : '/api/auth/customer-register';
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Có lỗi xảy ra');
      
      if (isLogin) {
        localStorage.setItem('sen_vang_token', data.token);
        localStorage.setItem('sen_vang_user', JSON.stringify(data.user));
        window.location.reload();
      } else {
        alert('Đăng ký thành công! Vui lòng Đăng nhập.');
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (platform: string) => {
    alert(`Tính năng Liên kết mạng xã hội đang được cài đặt API Key từ ${platform}. Tạm thời vui lòng dùng Số Điện Thoại / Email để đăng nhập!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md z-10 overflow-hidden relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 z-10 bg-white/50 rounded-full p-1">
          <X className="h-6 w-6" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-secondary mb-2">
              {isLogin ? 'Đăng Nhập' : 'Tạo Tài Khoản Mới'}
            </h2>
            <p className="text-gray-500 text-sm">Chào mừng bạn đến với Hệ sinh thái Sen Vàng</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <input type="text" required placeholder="Họ và Tên" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <input type="tel" required placeholder="Số điện thoại" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
              </>
            )}
            
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input type="email" required placeholder="Địa chỉ Email" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input type="password" required placeholder="Mật khẩu bảo mật" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
            </div>

            {error && <div className="text-red-500 text-sm font-medium text-center bg-red-50 p-2 rounded-lg">{error}</div>}

            <button disabled={isLoading} type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-primary/30 uppercase tracking-widest mt-4">
              {isLoading ? 'Đang xử lý...' : (isLogin ? 'Đăng Nhập' : 'Tạo Tài Khoản')}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-between text-sm text-gray-500">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="px-4 font-medium uppercase text-xs tracking-wider">Hoặc đăng nhập nhanh</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button onClick={() => handleSocialLogin('Zalo')} className="w-full flex items-center justify-center gap-3 bg-[#0068ff] hover:bg-[#0055d4] text-white py-3 rounded-xl font-bold transition-all shadow-md">
              <span className="text-lg font-black leading-none bg-white text-[#0068ff] px-1 rounded-sm">Zalo</span> Đăng nhập với Zalo
            </button>
            <button onClick={() => handleSocialLogin('Facebook')} className="w-full flex items-center justify-center gap-3 bg-[#1877f2] hover:bg-[#166fe5] text-white py-3 rounded-xl font-bold transition-all shadow-md">
               <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> Đăng nhập với Facebook
            </button>
          </div>

          <div className="mt-8 text-center text-sm font-medium">
            <span className="text-gray-500">{isLogin ? 'Bạn chưa có tài khoản?' : 'Đã có tài khoản?'}</span>{' '}
            <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-primary font-bold hover:underline">
              {isLogin ? 'Tạo ngay lập tức' : 'Đăng nhập ngay'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
