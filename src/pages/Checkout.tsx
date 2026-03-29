import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CreditCard, Wallet, Landmark, ShieldCheck, Mail, Phone, User, CheckCircle2, Loader2 } from 'lucide-react';
import { createBooking } from '../services/api';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const roomInfo = location.state || { roomId: 'default', price: 1000000, roomName: 'Phòng cao cấp' };
  
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [loading, setLoading] = useState(false);
  const [bookingResult, setBookingResult] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: 'Nguyễn Văn Sinh',
    email: 'sinh.nguyen@example.com',
    phone: '0901234567',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleSubmitBooking = async () => {
    setLoading(true);
    try {
      const bookingData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        roomId: roomInfo.roomId,
        checkIn: '2026-03-28T14:00:00Z',
        checkOut: '2026-03-29T12:00:00Z',
        totalPrice: roomInfo.price
      };
      
      const result = await createBooking(bookingData);
      setBookingResult(result.booking);
      setStep(3);
    } catch (err) {
      alert('Đã có lỗi xảy ra khi đặt phòng. Vui lòng thử lại!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-0"></div>
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${step >= s ? 'bg-primary text-white scale-110 shadow-lg' : 'bg-white text-gray-400 border border-gray-200'}`}
            >
              {s}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-6">
            {step === 1 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                  <User className="text-primary" /> Thông tin khách hàng
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">Họ và tên</label>
                      <input 
                        type="text" name="name" value={formData.name} onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-primary outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">Số điện thoại</label>
                      <input 
                        type="text" name="phone" value={formData.phone} onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-primary outline-none" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                    <input 
                      type="email" name="email" value={formData.email} onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-primary outline-none" 
                    />
                  </div>
                  <div className="space-y-1 pt-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Yêu cầu đặc biệt (Không bắt buộc)</label>
                    <textarea 
                      name="notes" rows={4} value={formData.notes} onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-primary outline-none resize-none"
                    ></textarea>
                  </div>
                </div>
                <button onClick={handleNextStep} className="mt-8 w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-dark transition-all">
                  Tiếp theo: Phương thức thanh toán
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                  <CreditCard className="text-primary" /> Phương thức thanh toán
                </h2>
                <div className="space-y-3">
                  {[
                    { id: 'credit', icon: <CreditCard />, title: 'Thẻ Tín dụng / Ghi nợ', desc: 'Visa, Mastercard, JCB' },
                    { id: 'vnpay', icon: <Wallet />, title: 'Ví VNPAY / Momo', desc: 'Thanh toán qua ứng dụng ngân hàng' },
                    { id: 'transfer', icon: <Landmark />, title: 'Chuyển khoản Ngân hàng', desc: 'Xác nhận trong vòng 30 phút' }
                  ].map((m) => (
                    <label 
                      key={m.id} 
                      className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === m.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-gray-50'}`}
                      onClick={() => setPaymentMethod(m.id)}
                    >
                      <div className={`p-2 rounded-lg ${paymentMethod === m.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                        {m.icon}
                      </div>
                      <div className="flex-grow">
                        <p className="font-bold">{m.title}</p>
                        <p className="text-xs text-gray-500">{m.desc}</p>
                      </div>
                      <input type="radio" checked={paymentMethod === m.id} readOnly className="h-5 w-5 accent-primary" />
                    </label>
                  ))}
                </div>
                
                <div className="mt-8 flex gap-4">
                  <button onClick={() => setStep(1)} className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-xl font-bold hover:bg-gray-200">
                    Quay lại
                  </button>
                  <button 
                    onClick={handleSubmitBooking} 
                    disabled={loading}
                    className="flex-[2] bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : 'Xác nhận Đặt phòng'}
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center animate-in zoom-in-95 duration-500">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-500 rounded-full mb-6">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h2 className="text-3xl font-serif font-bold mb-2 text-secondary">Đặt phòng Thành Công!</h2>
                <p className="text-gray-500 mb-8">Cảm ơn bạn đã tin tưởng Sen Vàng Vũng Tàu. Một email xác nhận đã được gửi đến bạn.</p>
                
                <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Mã đặt phòng:</span>
                    <span className="font-bold text-primary">#{bookingResult?.id?.slice(0, 8).toUpperCase() || 'SV9999'}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Trạng thái:</span>
                    <span className="text-green-600 font-bold uppercase text-xs">Chờ xác nhận</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tổng tiền:</span>
                    <span className="font-bold">{roomInfo.price.toLocaleString('vi-VN')} đ</span>
                  </div>
                </div>

                <button onClick={() => navigate('/')} className="w-full bg-secondary text-white py-4 rounded-xl font-bold hover:bg-secondary-dark transition-all">
                  Về trang chủ
                </button>
              </div>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">
              <h3 className="font-bold text-lg mb-4 pb-4 border-b">Chi tiết đặt phòng</h3>
              <div className="space-y-4 mb-6">
                <div>
                   <p className="text-xs font-bold text-gray-400 uppercase">Hạng phòng</p>
                   <p className="font-bold text-secondary">{roomInfo.roomName}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Ngày nhận</p>
                    <p className="font-medium text-sm">28/03/2026</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Ngày trả</p>
                    <p className="font-medium text-sm">29/03/2026</p>
                  </div>
                </div>
                <div className="flex justify-between items-center py-4 border-t border-dashed mt-4">
                  <span className="font-bold">Tổng thanh toán:</span>
                  <span className="text-xl font-bold text-primary">{roomInfo.price.toLocaleString('vi-VN')} đ</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                <ShieldCheck className="h-4 w-4 text-green-500 flex-shrink-0" />
                Dữ liệu của bạn được bảo mật tuyệt đối theo tiêu chuẩn quốc tế.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
