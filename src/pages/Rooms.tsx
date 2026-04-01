import { useState, useEffect } from 'react';
import { Search, Wind, Coffee, Wifi, Waves } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchRooms } from '../services/api';
import type { Room } from '../data/mockData';
import { Helmet } from 'react-helmet-async';

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');
  const [category, setCategory] = useState<'ALL' | 'HOTEL' | 'VILLA'>('ALL');

  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoading(true);
        const data = await fetchRooms();
        setRooms(data);
      } catch (err) {
        setError('Không thể tải danh sách phòng. Vui lòng thử lại sau.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadRooms();
  }, []);

  const filteredRooms = rooms.filter(room => {
    const matchesType = filter === 'All' || room.type === filter;
    const matchesCategory = category === 'ALL' || room.category === category;
    return matchesType && matchesCategory;
  });

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 pb-20 text-center">
        <p className="text-red-500 font-bold">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 bg-primary text-white px-6 py-2 rounded-md">Tải lại trang</button>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <Helmet>
        <title>Danh Sách Phòng & Villa | Sen Vàng Hotel Vũng Tàu</title>
        <meta name="description" content="Hệ thống phòng nghỉ đa dạng: Deluxe, Suite và Villa nguyên căn tại Vũng Tàu. Đầy đủ tiện nghi 5 sao, view biển, giá tốt nhất khi đặt trực tiếp." />
      </Helmet>
      {/* Page Header */}
      <div className="bg-secondary py-16 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Danh Sách Nghỉ Dưỡng</h1>
        <p className="max-w-2xl mx-auto px-4 text-gray-300">
          Từ phòng khách sạn sang trọng đến những căn Villa nguyên căn riêng tư tại Vũng Tàu.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-gray-100 rounded-xl">
             {[
               { id: 'ALL', label: 'Tất cả' },
               { id: 'HOTEL', label: 'Khách sạn' },
               { id: 'VILLA', label: 'Villa' }
             ].map((cat) => (
               <button
                 key={cat.id}
                 onClick={() => setCategory(cat.id as any)}
                 className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${category === cat.id ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
               >
                 {cat.label}
               </button>
             ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 w-full md:w-auto">
            {['All', 'Deluxe', 'Suite', 'Superior'].map((t) => (
              <button 
                key={t}
                onClick={() => setFilter(t)}
                className={`px-6 py-2 rounded-full border transition-all whitespace-nowrap ${filter === t ? 'bg-primary border-primary text-white shadow-md' : 'border-gray-300 text-gray-600 hover:border-primary'}`}
              >
                {t === 'All' ? 'Tất cả hạng' : t}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.length === 0 ? (
            <div className="col-span-full py-20 text-center text-gray-400 italic">Không tìm thấy kết quả phù hợp</div>
          ) : (
            filteredRooms.map((room) => (
              <div key={room.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={room.images[0]} 
                    alt={room.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary/90 backdrop-blur-sm text-white text-[10px] font-black px-2 py-1 rounded-md uppercase shadow-lg">
                      {room.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md shadow-sm">
                    <span className="text-primary font-bold">{room.price.toLocaleString('vi-VN')} đ</span>
                    <span className="text-xs text-gray-500"> / đêm</span>
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{room.location}</span>
                    <div className="flex text-yellow-500">
                      {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-secondary-dark mb-3 group-hover:text-primary transition-colors">{room.name}</h3>
                  
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Waves className="h-4 w-4 text-primary" /> <span>Tầm nhìn đẹp</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Wifi className="h-4 w-4 text-primary" /> <span>Wi-Fi Free</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Coffee className="h-4 w-4 text-primary" /> <span>Bữa sáng</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Wind className="h-4 w-4 text-primary" /> <span>Điều hòa</span>
                    </div>
                  </div>
  
                  <div className="mt-auto pt-6 border-t border-gray-100 flex justify-between items-center">
                     <div className="text-sm text-gray-500">
                       Sức chứa: <span className="font-bold text-gray-800">{room.capacity} Người</span>
                     </div>
                     <Link to={`/rooms/${room.id}`} className="text-primary font-bold hover:underline flex items-center gap-1">
                       Chi tiết 
                     </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
