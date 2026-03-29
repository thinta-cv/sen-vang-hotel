import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Mail, Globe, Smartphone, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';

import logo from '../../assets/images/logo-official.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const NavLinks = () => (
    <>
      <Link to="/" className={`font-medium text-xs uppercase tracking-widest transition-colors hover:text-primary ${isActive('/') ? 'text-primary font-bold' : 'text-white'}`} onClick={() => setIsMenuOpen(false)}>Trang chủ</Link>
      <Link to="/about" className={`font-medium text-xs uppercase tracking-widest transition-colors hover:text-primary ${isActive('/about') ? 'text-primary font-bold' : 'text-white'}`} onClick={() => setIsMenuOpen(false)}>Giới thiệu</Link>
      <Link to="/rooms" className={`font-medium text-xs uppercase tracking-widest transition-colors hover:text-primary ${isActive('/rooms') || location.pathname.includes('/room/') ? 'text-primary font-bold' : 'text-white'}`} onClick={() => setIsMenuOpen(false)}>Phòng nghỉ</Link>
      <Link to="/services" className={`font-medium text-xs uppercase tracking-widest transition-colors hover:text-primary ${isActive('/services') ? 'text-primary font-bold' : 'text-white'}`} onClick={() => setIsMenuOpen(false)}>Dịch vụ</Link>
      <Link to="/contact" className={`font-medium text-xs uppercase tracking-widest transition-colors hover:text-primary ${isActive('/contact') ? 'text-primary font-bold' : 'text-white'}`} onClick={() => setIsMenuOpen(false)}>Liên hệ</Link>
    </>
  );

  return (
    <header className="fixed w-full z-50 transition-all duration-300">
      {/* Top Bar */}
      <div className="bg-secondary-dark text-white/80 py-2 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin className="h-3 w-3 text-primary" /> 20 Trần Quý Cáp - P.Thắng Tam - TP.Vũng Tàu
            </span>
            <span className="flex items-center gap-2 lowercase italic">
              <Mail className="h-3 w-3 text-primary" /> senvangvungtau.hotel@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Globe className="h-3 w-3 hover:text-primary cursor-pointer transition-colors" />
            <Smartphone className="h-3 w-3 hover:text-primary cursor-pointer transition-colors" />
            <span className="flex items-center gap-1">
               <Phone className="h-3 w-3 text-primary" /> 0901.234.567
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-secondary/90 backdrop-blur-md shadow-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="h-16 w-16 flex items-center justify-center overflow-hidden rounded-full p-2 bg-white/5 group-hover:bg-white/10 transition-colors border border-white/10 shadow-inner">
                  <img src={logo} alt="Sen Vàng Logo" className="h-full w-full object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-serif font-bold text-primary tracking-tighter group-hover:scale-105 transition-transform duration-300">
                    SEN VÀNG
                  </span>
                  <span className="text-[10px] font-black tracking-[0.4em] text-white/60 -mt-1 uppercase">
                    HOTEL
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-10 items-center">
              <NavLinks />
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/rooms" className="bg-primary hover:bg-primary-dark text-secondary-dark px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-primary/20 transform hover:-translate-y-0.5">
                Đặt phòng ngay
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-primary focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-secondary border-t border-white/10 absolute w-full shadow-2xl">
          <div className="px-6 pt-6 pb-8 space-y-6 flex flex-col items-center text-center">
            <NavLinks />
            <Link to="/rooms" className="w-full bg-primary text-secondary-dark py-4 rounded-xl font-black uppercase tracking-widest shadow-lg" onClick={() => setIsMenuOpen(false)}>
              Đặt ngay
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
