import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchRooms } from '../services/api';
import type { Room } from '../data/mockData';
import { Link } from 'react-router-dom';
import { MapPin, Users, Maximize, ChefHat, Wifi, WashingMachine, ChevronRight } from 'lucide-react';

const Apartments = () => {
  const [apartments, setApartments] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApts = async () => {
      try {
        const data = await fetchRooms();
        setApartments(data.filter((r: Room) => r.category === 'APARTMENT'));
      } catch (err) {
        console.error("Failed to load apartments", err);
      } finally {
        setLoading(false);
      }
    };
    loadApts();
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
        <title>Căn Hộ Mini Gia Đình | Sen Vàng Hotel</title>
        <meta name="description" content="Danh sách căn hộ mini cho gia đình hoặc lưu trú dài hạn ở Vũng Tàu, trang bị bếp, máy giặt, ban công." />
      </Helmet>
      
      {/* Hero Section */}
      <div className="bg-secondary-dark py-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80')] bg-cover bg-center"></div>
        <div className="relative z-10">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Không Gian Ấm Cúng</span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-yellow-50">Căn Hộ Lưu Trú Hiện Đại</h1>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">Đầy đủ tiện ích Bếp, Máy Giặt, Bàn Làm Việc. Lựa chọn hoàn hảo cho kỳ nghỉ dài ngày tại Vũng Tàu.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
        {apartments.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            <p className="text-xl">Hỗ trợ Căn Hộ Dịch vụ đang được hệ thống nâng cấp.</p>
            <p className="text-sm mt-2">Vui lòng quay lại sau!</p>
          </div>
        ) : (
          apartments.map((apt, idx) => (
            <div key={apt.id} className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center bg-gray-50 rounded-3xl p-6 md:p-8 border border-gray-100`}>
              
              {/* Image Showcase */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-xl">
                  <img src={apt.images[0]} alt={apt.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-secondary-dark px-4 py-1.5 rounded-full font-bold shadow-md text-xs uppercase flex items-center gap-2">
                    <Wifi className="h-3 w-3 text-green-500" /> Cáp & WiFi Độc lập
                  </div>
                </div>
              </div>

              {/* Info Column */}
              <div className="w-full lg:w-1/2 py-4">
                <div className="flex gap-2 items-center mb-4 text-primary font-bold text-sm uppercase">
                  <MapPin className="h-4 w-4" /> {apt.location}
                </div>
                <h3 className="text-4xl font-serif font-bold text-secondary mb-4">{apt.name}</h3>
                
                <div className="flex gap-6 mb-8 text-secondary-dark border-b border-gray-200 pb-8">
                  <div>
                    <p className="text-2xl font-black text-primary">{apt.price.toLocaleString('vi-VN')} đ</p>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">/ Đêm</p>
                  </div>
                  <div className="border-l border-gray-300 pl-6">
                    <p className="text-lg font-bold text-green-600">Giảm 15%</p>
                    <p className="text-xs text-gray-500 uppercase font-bold">Ký hợp đồng theo tháng</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                  {apt.description}
                </p>

                {/* Highlight Features */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm"><Users className="h-5 w-5 text-primary" /> <span className="font-bold text-sm">Tối đa {apt.capacity} Người</span></div>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm"><Maximize className="h-5 w-5 text-primary" /> <span className="font-bold text-sm">{apt.size}</span></div>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm"><ChefHat className="h-5 w-5 text-primary" /> <span className="font-bold text-sm">Bếp toàn diện</span></div>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm"><WashingMachine className="h-5 w-5 text-primary" /> <span className="font-bold text-sm">Máy giặt - sấy</span></div>
                </div>
                
                <div className="flex gap-4">
                  <Link to={`/room/${apt.id}`} className="bg-secondary text-white hover:bg-secondary-dark px-8 py-4 rounded-xl font-bold uppercase tracking-widest transition-all hover:scale-105 shadow-xl text-center flex-1">
                    Xem Hình Ảnh Thực Tế
                  </Link>
                  <Link to="/rooms" className="bg-primary text-white hover:bg-primary-dark px-8 py-4 rounded-xl font-bold transition-all text-center flex items-center justify-center">
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

export default Apartments;
