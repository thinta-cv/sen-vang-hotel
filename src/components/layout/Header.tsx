import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Mail, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';

import logo from '../../assets/images/logo-official.png';

// Custom Social Icons
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const ZaloIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.707 11.13c-.02-.19-.07-.37-.16-.54-.09-.17-.22-.32-.38-.45l-1.57-1.1c-.26-.18-.56-.28-.87-.28H4.28c-.31 0-.61.1-.87.28l-1.57 1.1c-.16.13-.29.28-.38.45-.09.17-.14.35-.16.54v6.74c0 .32.11.64.3.9.19.26.47.45.79.52l1.62.33c.12.03.25.04.37.04.2 0 .39-.04.57-.12.18-.08.34-.19.47-.34.13-.15.22-.32.27-.51.05-.19.06-.38.04-.57l-.33-1.62c-.03-.12-.04-.25-.04-.37 0-.2.04-.39.12-.57.08-.18.19-.34.34-.47.15-.13.32-.22.51-.27.19-.05.38-.06.57-.04l1.62.33c.43.09.87.01 1.25-.22l.53-.33c.1-.06.18-.15.22-.26.04-.11.05-.23.02-.35l-.26-1.12c-.08-.34-.04-.7.12-1.02.16-.32.44-.56.78-.67l1.12-.36c.11-.04.21-.11.28-.21.07-.1.11-.22.11-.34V4.5c0-.28.11-.54.31-.74.2-.2.46-.31.74-.31h5.8c.28 0 .54.11.74.31.2.2.31.46.31.74v6.3c0 .12.04.24.11.34s.17.17.28.21l1.12.36c.34.11.62.35.78.67.16.32.2.68.12 1.02l-.26 1.12c-.03.12-.02.24.02.35.04.11.12.2.22.26l.53.33c.38.23.82.31 1.25.22l1.62-.33c.19-.04.38-.03.57.02.19.05.36.14.51.27.15.13.26.29.34.47.08.18.12.37.12.57 0 .12-.01.25-.04.37l-.33 1.62c-.02.19-.01.38.04.57.05.19.14.36.27.51.13.15.29.26.47.34.18.08.37.12.57.12.12 0 .25-.01.37-.04l1.62-.33c.32-.07.6-.26.79-.52s.3-.58.3-.9v-6.74z"/>
  </svg>
);

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
            <a href="https://facebook.com/senvanghotel" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
              <FacebookIcon className="h-3 w-3" /> Facebook
            </a>
            <a href="https://zalo.me/0901234567" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
              <ZaloIcon className="h-3 w-3" /> Zalo
            </a>
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
