import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ChevronRight, Star, Maximize, Users, Bed, Check, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchRoomById } from '../services/api';
import type { Room } from '../data/mockData';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const loadRoom = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await fetchRoomById(id);
        setRoom(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadRoom();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy thông tin phòng!</h2>
        <Link to="/rooms" className="text-primary font-bold hover:underline">Quay lại danh sách phòng</Link>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-20 bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-primary">Trang chủ</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/rooms" className="hover:text-primary">Phòng nghỉ</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-secondary font-medium">{room.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Info (Left 2/3) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white group">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    src={room.images[activeImage]} 
                    alt={room.name} 
                    className="w-full h-full object-cover" 
                  />
                </AnimatePresence>
                <div className="absolute top-4 left-4 bg-secondary/80 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-2">
                  <ZoomIn className="h-3 w-3" /> Click để xem chi tiết
                </div>
              </div>
              <div className="flex gap-4 overflow-x-auto py-2 scrollbar-hide">
                {room.images.map((img, i) => (
                  <motion.button 
                    key={i} 
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveImage(i)}
                    className={`flex-shrink-0 w-24 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-primary ring-4 ring-primary/20 shadow-lg scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                  {room.type} Class
                </span>
                <div className="flex items-center text-yellow-500 gap-1 font-bold">
                  <Star className="h-4 w-4 fill-current" /> 5.0 (24 Đánh giá)
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-6">{room.name}</h1>
              <p className="text-gray-600 leading-relaxed text-lg mb-10">
                {room.description}
              </p>

              {/* Room Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-gray-100">
                <div className="text-center">
                  <div className="flex justify-center mb-2"><Maximize className="h-6 w-6 text-primary" /></div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-tighter">Diện tích</p>
                  <p className="font-bold text-gray-800">{room.size}</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2"><Users className="h-6 w-6 text-primary" /></div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-tighter">Sức chứa</p>
                  <p className="font-bold text-gray-800">{room.capacity} Người</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2"><Bed className="h-6 w-6 text-primary" /></div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-tighter">Loại giường</p>
                  <p className="font-bold text-gray-800 text-sm">{room.bed}</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2"><Star className="h-6 w-6 text-primary" /></div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-tighter">Tầm nhìn</p>
                  <p className="font-bold text-gray-800">Biển/Phố</p>
                </div>
              </div>

              {/* Amenities */}
              <div className="mt-10">
                <h3 className="text-xl font-bold mb-6">Tiện nghi phòng nghỉ</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                  {room.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-gray-700">
                      <div className="bg-primary/5 p-1.5 rounded-full">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar (Right 1/3) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sticky top-28">
              <div className="mb-6">
                <p className="text-gray-500 text-sm mb-1 uppercase font-bold tracking-widest">Giá phòng từ</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-serif font-bold text-primary">{room.price.toLocaleString('vi-VN')} đ</span>
                  <span className="text-gray-500 font-medium">/ đêm</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-primary">
                  <p className="text-xs text-gray-500 mb-1 font-bold uppercase">Ưu đãi hôm nay</p>
                  <p className="text-sm font-bold text-secondary">Miễn phí bữa sáng & Spa 30p</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Nhận phòng</label>
                    <input type="date" className="p-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-primary" defaultValue="2026-03-28" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Trả phòng</label>
                    <input type="date" className="p-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-primary" defaultValue="2026-03-29" />
                  </div>
                </div>
              </div>

              <button 
                onClick={() => navigate('/checkout', { state: { roomId: room.id, price: room.price, roomName: room.name } })}
                className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 mb-6"
              >
                Đặt ngay bây giờ
              </button>

              <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="h-5 w-5 text-green-500" /> Xác nhận tức thì
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="h-5 w-5 text-green-500" /> Không phí đặt phòng
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="h-5 w-5 text-green-500" /> Hỗ trợ 24/7 (Hotline: 0254...)
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
