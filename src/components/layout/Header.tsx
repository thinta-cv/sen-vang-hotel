import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useState, useEffect } from 'react';

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
      <Link to="/" className={`font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : 'text-gray-700'}`} onClick={() => setIsMenuOpen(false)}>Trang chủ</Link>
      <Link to="/about" className={`font-medium transition-colors hover:text-primary ${isActive('/about') ? 'text-primary' : 'text-gray-700'}`} onClick={() => setIsMenuOpen(false)}>Giới thiệu</Link>
      <Link to="/rooms" className={`font-medium transition-colors hover:text-primary ${isActive('/rooms') || location.pathname.includes('/room/') ? 'text-primary' : 'text-gray-700'}`} onClick={() => setIsMenuOpen(false)}>Phòng nghỉ</Link>
      <Link to="/services" className={`font-medium transition-colors hover:text-primary ${isActive('/services') ? 'text-primary' : 'text-gray-700'}`} onClick={() => setIsMenuOpen(false)}>Dịch vụ</Link>
      <Link to="/contact" className={`font-medium transition-colors hover:text-primary ${isActive('/contact') ? 'text-primary' : 'text-gray-700'}`} onClick={() => setIsMenuOpen(false)}>Liên hệ</Link>
    </>
  );

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-md z-50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-serif font-bold text-primary-dark">
              Sen Vàng
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <NavLinks />
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2 font-medium">
              <User className="h-5 w-5" /> Đăng nhập
            </button>
            <Link to="/rooms" className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-md font-bold transition-colors shadow-md">
              Đặt phòng
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t absolute w-full shadow-lg">
          <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col">
            <NavLinks />
            
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-4">
               <button className="text-gray-600 flex items-center gap-2 font-medium w-full text-left">
                 <User className="h-5 w-5" /> Đăng nhập / Đăng ký
               </button>
              <Link to="/rooms" className="text-center w-full bg-primary text-white px-4 py-3 rounded-md font-bold shadow-md" onClick={() => setIsMenuOpen(false)}>
                Đặt phòng ngay
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
