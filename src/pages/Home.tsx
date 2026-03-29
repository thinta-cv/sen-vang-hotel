import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Star, Waves, ShieldCheck, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchRooms } from '../services/api';
import type { Room } from '../data/mockData';

const Home = () => {
  const [featuredRooms, setFeaturedRooms] = useState<Room[]>([]);
  const [currentBg, setCurrentBg] = useState(0);

  const backgrounds = [
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop", // Hotel night
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070&auto=format&fit=crop", // Pool/Lobby
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"  // Luxury Suite
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [backgrounds.length]);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const rooms = await fetchRooms();
        setFeaturedRooms(rooms.filter((r: Room) => r.featured).slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    };
    loadFeatured();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
        {/* Background Slider */}
        <div className="absolute inset-0 z-0">
          {backgrounds.map((bg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: currentBg === index ? 1 : 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img 
                src={bg} 
                alt={`Hotel Hero ${index}`} 
                className="w-full h-full object-cover brightness-[0.4]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-transparent to-secondary/60"></div>
            </motion.div>
          ))}
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-6xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight tracking-tight drop-shadow-2xl">
               <span className="block md:inline whitespace-nowrap">Nghỉ Dưỡng Tuyệt Vời Tại</span>
               <span className="block md:inline-block md:ml-4 text-primary font-black italic transform transition-transform hover:scale-110 duration-500 text-5xl sm:text-7xl md:text-9xl tracking-tighter">
                  Sen Vàng
               </span>
            </h1>
            <p className="text-sm md:text-xl mb-12 text-white/80 font-medium max-w-3xl mx-auto uppercase tracking-[0.2em]">
              Trải nghiệm sự sang trọng bậc nhất tại trung tâm biển Vũng Tàu.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/rooms" className="bg-primary hover:bg-white text-secondary-dark px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-2xl hover:shadow-primary/40 transform hover:-translate-y-1">
                Khám Phá Ngay
              </Link>
              <Link to="/about" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-2 border-white/20 px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest transition-all">
                Giới Thiệu
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Booking Widget */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-6xl px-4 hidden lg:block">
          <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-6 grid grid-cols-4 gap-4 items-end border border-white">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Ngày Nhận Phòng
              </label>
              <input type="date" className="w-full p-2 border-b border-gray-200 outline-none focus:border-primary font-medium" defaultValue="2026-03-28" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Ngày Trả Phòng
              </label>
              <input type="date" className="w-full p-2 border-b border-gray-200 outline-none focus:border-primary font-medium" defaultValue="2026-03-29" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                <Users className="h-3 w-3" /> Số Khách
              </label>
              <select className="w-full p-2 border-b border-gray-200 outline-none focus:border-primary font-medium">
                <option>1 Người</option>
                <option selected>2 Người</option>
                <option>3 Người</option>
                <option>4+ Người</option>
              </select>
            </div>
            <Link to="/rooms" className="w-full bg-secondary hover:bg-secondary-dark text-white py-4 rounded-lg font-bold text-center transition-colors">
              Kiểm Tra Phòng Trống
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-sm font-bold text-primary tracking-[0.3em] uppercase mb-4">Lựa Chọn Tuyệt Vời</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-secondary">Phòng Nghỉ Nổi Bật</h3>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
           {featuredRooms.map((room) => (
             <motion.div 
               key={room.id}
               whileHover={{ y: -10 }}
               className="bg-white rounded-2xl shadow-xl overflow-hidden group border border-gray-100"
             >
                <div className="relative h-72">
                  <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-primary text-white px-4 py-1 rounded-full font-bold shadow-md">
                    {room.price.toLocaleString('vi-VN')} đ
                  </div>
                </div>
                <div className="p-8">
                   <h4 className="text-2xl font-bold mb-4 text-secondary">{room.name}</h4>
                   <p className="text-gray-500 text-sm mb-6 line-clamp-2">{room.description}</p>
                   <Link to={`/room/${room.id}`} className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                     Xem chi tiết <ChevronRight className="h-4 w-4" />
                   </Link>
                </div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Services summary */}
      <section className="py-24 bg-secondary-dark text-white overflow-hidden relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">Dịch Vụ Tiêu Chuẩn 5 Sao</h3>
              <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                Tại Sen Vàng Vũng Tàu, chúng tôi không chỉ cung cấp chỗ nghỉ, chúng tôi mang tới cho bạn một không gian sống đẳng cấp với đầy đủ tiện ích hiện đại nhất.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: <Star />, title: "Chất lượng cao cấp" },
                  { icon: <ShieldCheck />, title: "An toàn tuyệt đối" },
                  { icon: <Clock />, title: "Hỗ trợ 24/7" },
                  { icon: <Waves />, title: "Tầm nhìn biển" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="text-primary">{item.icon}</div>
                    <span className="font-bold">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="/assets/spa-service.png" 
                alt="Spa & Wellness" 
                className="relative z-10 rounded-2xl shadow-2xl w-full h-[500px] object-cover border-4 border-white/10"
              />
            </div>
         </div>
      </section>
      {/* Hotel Gallery */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-sm font-bold text-primary tracking-[0.3em] uppercase mb-4">Không Gian Đẳng Cấp</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-secondary">Bộ Sưu Tập Hình Ảnh</h3>
          <p className="mt-6 text-gray-500 max-w-2xl mx-auto">
            Khám phá vẻ đẹp kiến trúc và những tiện ích hàng đầu tại Sen Vàng Vũng Tàu qua những khung hình sống động.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
            {[
              { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070', span: 'md:col-span-2 md:row-span-2', title: 'Sảnh Tiếp Đón' },
              { url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2070', span: '', title: 'Hồ Bơi Vô Cực' },
              { url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070', span: 'md:row-span-2', title: 'Nhà Hàng Sang Trọng' },
              { url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070', span: '', title: 'Phòng Gym Hiện Đại' },
              { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073', span: 'md:col-span-2', title: 'Tầm Nhìn Hướng Biển' },
              { url: 'https://images.unsplash.com/photo-1544161515-4ae6ce6ca67e?q=80&w=2070', span: '', title: 'Dịch Vụ Spa' }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative group overflow-hidden rounded-2xl shadow-lg ${item.span}`}
              >
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {item.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
