import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import logo from '../../assets/images/logo-official.png';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
               <div className="h-14 w-14 flex items-center justify-center overflow-hidden rounded-full bg-white p-1 shadow-lg">
                 <img src={logo} alt="Sen Vàng Logo" className="h-full w-full object-contain" />
               </div>
               <div className="flex flex-col">
                 <h3 className="text-xl font-serif font-bold text-primary leading-none">Sen Vàng</h3>
                 <span className="text-[8px] font-black tracking-[0.3em] text-white/50 uppercase">Hotel</span>
               </div>
            </div>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">Trải nghiệm kỳ nghỉ dưỡng tuyệt vời tại trung tâm thành phố biển Vũng Tàu với dịch vụ đẳng cấp và không gian sang trọng.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/senvanghotel" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-secondary-dark transition-all duration-300 shadow-lg">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://zalo.me/0901234567" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0068ff] hover:text-white transition-all duration-300 shadow-lg font-black text-xs">
                Zalo
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-bold text-primary mb-6">Khám phá</h4>
            <ul className="space-y-4">
              <li><Link to="/rooms" className="text-gray-400 hover:text-white transition-colors text-sm">Phòng & Suite</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors text-sm">Dịch vụ tiện ích</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">Về chúng tôi</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Liên hệ đặt phòng</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-lg font-serif font-bold text-primary mb-6">Liên hệ trực tiếp</h4>
            <ul className="space-y-5">
              <li className="flex items-start group">
                <MapPin className="h-5 w-5 text-primary mr-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-gray-400 text-sm leading-relaxed">20 Trần Quý Cáp, Phường Thắng Tam, Thành phố Vũng Tàu, Bà Rịa - Vũng Tàu</span>
              </li>
              <li className="flex items-center group">
                <Phone className="h-5 w-5 text-primary mr-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-gray-400 text-sm">+84 901 234 567</span>
              </li>
              <li className="flex items-center group">
                <Mail className="h-5 w-5 text-primary mr-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-gray-400 text-sm">senvangvungtau.hotel@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Sen Vàng Hotel Vũng Tàu. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-primary transition-colors">Chính sách bảo mật</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Điều khoản dịch vụ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
