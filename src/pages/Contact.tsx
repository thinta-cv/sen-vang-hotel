import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="flex-grow pt-20 bg-gray-50 min-h-screen pb-20">
      <div className="bg-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 drop-shadow-md">Liên hệ với chúng tôi</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-sm">Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn mọi lúc.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
          
          {/* Contact Details side */}
          <div className="w-full lg:w-1/3 bg-primary text-white p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-8">Thông tin liên lạc</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">Địa chỉ</h3>
                    <p className="text-white/80">123 Đường Thùy Vân, Phường Thắng Tam, Thành phố Vũng Tàu, Tỉnh Bà Rịa - Vũng Tàu</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">Điện thoại</h3>
                    <p className="text-white/80">+84 254 381 2345</p>
                    <p className="text-white/80 text-sm mt-1">Hỗ trợ 24/7 (Phím số 1)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-6 w-6 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">Email gửi về thư ký</h3>
                    <p className="text-white/80">info@senvanghotel.com</p>
                    <p className="text-white/80 text-sm mt-1">booking@senvanghotel.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-sm opacity-90 font-medium">Rất hân hạnh được đón tiếp bạn tại Sen Vàng Hotel.</p>
            </div>
          </div>

          {/* Form side */}
          <div className="w-full lg:w-2/3 p-10">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Gửi tin nhắn trực tuyến</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Họ Tên</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-primary focus:border-primary outline-none transition-colors shadow-sm" placeholder="Nguyễn Văn Sinh" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-primary focus:border-primary outline-none transition-colors shadow-sm" placeholder="sinh.nguyen@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề (Chủ đề)</label>
                <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-primary focus:border-primary outline-none transition-colors shadow-sm" placeholder="Hỏi về dịch vụ đưa đón sân bay Tân Sơn Nhất" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung tin nhắn</label>
                <textarea className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-primary focus:border-primary outline-none transition-colors h-32 shadow-sm" placeholder="Tôi muốn hỏi là..."></textarea>
              </div>
              <button type="submit" className="bg-secondary hover:bg-secondary-light text-white px-8 py-3 rounded-md font-bold transition-colors flex items-center justify-center gap-2 w-full md:w-auto shadow-md">
                <Send className="h-4 w-4" /> Gửi tin nhắn
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
