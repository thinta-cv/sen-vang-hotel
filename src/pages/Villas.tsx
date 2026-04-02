import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchRooms } from '../services/api';
import type { Room } from '../data/mockData';
import { Link } from 'react-router-dom';
import { MapPin, Users, Maximize, Waves, Palmtree, CarFront, ChevronRight } from 'lucide-react';

const Villas = () => {
  const [villas, setVillas] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVillas = async () => {
      try {
        const data = await fetchRooms();
        setVillas(data.filter((r: Room) => r.category === 'VILLA'));
      } catch (err) {
        console.error("Failed to load villas", err);
      } finally {
        setLoading(false);
      }
    };
    loadVillas();
  }, []);

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <Helmet>
        <title>Biệt Thự & Villa Nguyên Căn | Sen Vàng Hotel</title>
        <meta name="description" content="Danh sách biệt thự và villa nguyên căn sang trọng, riêng tư dành cho gia đình và nhóm bạn tại trung tâm Vũng Tàu." />
      </Helmet>
      
      {/* Hero Section */}
      <div className="bg-secondary-dark py-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80')] bg-cover bg-center"></div>
        <div className="relative z-10">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Hệ Sinh Thái Lưu Trú</span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-yellow-50">Biệt Thự Nguyên Căn</h1>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">Đẳng cấp riêng tư, tiện nghi vượt trội. Thích hợp cho Đại Gia Đình, Sinh nhật, Team Building công ty.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
        {villas.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            <p className="text-xl">Hệ thống Hệ thống Villa đang được nâng cấp.</p>
            <p className="text-sm mt-2">Vui lòng quay lại sau!</p>
          </div>
        ) : (
          villas.map((villa, idx) => (
            <div key={villa.id} className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
              
              {/* Image Showcase */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                  <img src={villa.images[0]} alt={villa.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <span className="bg-primary/90 text-white backdrop-blur-md px-4 py-1.5 rounded-full font-bold shadow-lg uppercase text-xs tracking-wider">
                      Đạt Chuẩn 5 Sao
                    </span>
                  </div>
                </div>
                {/* Float secondary images */}
                <div className="hidden md:flex gap-4 absolute -bottom-8 -right-8 w-2/3">
                   {villa.images.slice(1, 3).map((img, i) => (
                     <div key={i} className="flex-1 h-32 rounded-xl border-4 border-white overflow-hidden shadow-lg transform transition-transform hover:-translate-y-2">
                       <img src={img} className="w-full h-full object-cover" alt="Detail" />
                     </div>
                   ))}
                </div>
              </div>

              {/* Info Column */}
              <div className="w-full lg:w-1/2 py-4">
                <div className="flex gap-2 items-center mb-4 text-primary font-bold text-sm uppercase">
                  <MapPin className="h-4 w-4" /> {villa.location}
                </div>
                <h3 className="text-4xl font-serif font-bold text-secondary mb-4">{villa.name}</h3>
                
                <div className="flex gap-6 mb-8 text-secondary-dark border-b border-gray-100 pb-8">
                  <div>
                    <p className="text-xl font-black text-primary">{villa.price.toLocaleString('vi-VN')} đ</p>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">/ Đêm</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                  {villa.description}
                </p>

                {/* Highlight Features */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg"><Users className="h-5 w-5 text-primary" /> <span className="font-bold text-sm">Sức chứa: {villa.capacity} Ngh</span></div>
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg"><Maximize className="h-5 w-5 text-primary" /> <span className="font-bold text-sm">{villa.size} Vuông</span></div>
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg"><Waves className="h-5 w-5 text-primary" /> <span className="font-bold text-sm">Hồ bơi riêng</span></div>
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg"><CarFront className="h-5 w-5 text-primary" /> <span className="font-bold text-sm">Gara ô tô</span></div>
                </div>
                
                <div className="flex gap-4">
                  <Link to={`/room/${villa.id}`} className="bg-primary text-white hover:bg-primary-dark px-8 py-4 rounded-xl font-bold uppercase tracking-widest transition-all hover:scale-105 shadow-xl shadow-primary/30 text-center flex-1">
                    Xem Hình Ảnh Thực Tế
                  </Link>
                  <Link to="/rooms" className="bg-secondary text-white hover:bg-secondary-dark px-8 py-4 rounded-xl font-bold transition-all text-center flex items-center justify-center">
                    <ChevronRight className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Villas;
