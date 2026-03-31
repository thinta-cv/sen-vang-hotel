import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Loader2, Hotel } from 'lucide-react';
import { login } from '../../services/api';
import logo from '../../assets/images/logo-official.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await login({ email, password });
      localStorage.setItem('sen_vang_admin_token', data.token);
      localStorage.setItem('sen_vang_admin_user', JSON.stringify(data.user));
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background accidental shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl"></div>

      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 border border-white/10">
        <div className="bg-primary/10 p-10 text-center border-b border-primary/20">
          <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center p-3 mx-auto mb-6 shadow-xl border-4 border-primary/20">
             <img src={logo} alt="Sen Vàng Logo" className="h-full w-full object-contain" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-secondary tracking-tight">Sen Vàng Hotel</h1>
          <p className="text-secondary/60 font-bold uppercase tracking-[0.2em] text-[10px] mt-1">Hệ thống Quản trị Nội bộ</p>
        </div>

        <div className="p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-red-700 text-sm animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-secondary/40 ml-1">Email Quản trị</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary/30 group-focus-within:text-primary transition-colors" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary focus:bg-white transition-all text-secondary font-medium"
                  placeholder="admin@senvanghotel.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-secondary/40 ml-1">Mật khẩu</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary/30 group-focus-within:text-primary transition-colors" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary focus:bg-white transition-all text-secondary font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-secondary hover:bg-secondary-dark text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-secondary/20 hover:shadow-secondary/40 transition-all active:scale-95 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Truy cập Hệ thống
                  <Hotel className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </>
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Bản quyền thuộc về Sen Vàng Vũng Tàu &copy; 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
