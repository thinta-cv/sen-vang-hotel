import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">Sen Vàng</h3>
            <p className="text-gray-300 mb-6">Trải nghiệm kỳ nghỉ dưỡng tuyệt vời tại thành phố biển Vũng Tàu với dịch vụ đẳng cấp 5 sao.</p>
            <div className="flex space-x-4 text-sm font-bold">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">FB</a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">IG</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Khám phá</h4>
            <ul className="space-y-3">
              <li><Link to="/rooms" className="text-gray-300 hover:text-primary transition-colors">Phòng & Suite</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-primary transition-colors">Nhà hàng & Bar</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-primary transition-colors">Spa & Wellness</Link></li>
              <li><Link to="/offers" className="text-gray-300 hover:text-primary transition-colors">Ưu đãi đặc biệt</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-300">123 Đường Thùy Vân, Phường Thắng Tam, Thành phố Vũng Tàu, Bà Rịa - Vũng Tàu</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <span className="text-gray-300">+84 254 381 2345</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <span className="text-gray-300">info@senvanghotel.com</span>
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
