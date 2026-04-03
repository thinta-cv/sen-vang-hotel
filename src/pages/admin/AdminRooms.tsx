import { useState, useEffect } from 'react';
import { fetchRooms, createRoom, updateRoom, deleteRoom } from '../../services/api';
import { Plus, Search, Edit2, Trash2, MapPin, Layout, Loader2 } from 'lucide-react';

const AdminRooms = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<any>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'HOTEL',
    location: 'Vũng Tàu',
    type: '',
    price: 0,
    capacity: 2,
    size: '',
    bed: '',
    images: [''],
    amenities: [''],
    description: '',
    featured: false
  });

  const loadRooms = async () => {
    try {
      setLoading(true);
      const data = await fetchRooms();
      setRooms(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingRoom) {
        await updateRoom(editingRoom.id, formData);
      } else {
        await createRoom(formData);
      }
      setShowModal(false);
      setEditingRoom(null);
      loadRooms();
    } catch (err) {
      alert('Lỗi khi lưu dữ liệu');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hạng phòng này?')) {
      try {
        await deleteRoom(id);
        loadRooms();
      } catch (err) {
        alert('Lỗi khi xóa phòng');
      }
    }
  };

  const openEdit = (room: any) => {
    setEditingRoom(room);
    setFormData({
      ...room,
      images: room.images.length > 0 ? room.images : [''],
      amenities: room.amenities.length > 0 ? room.amenities : ['']
    });
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Tìm kiếm phòng/villa..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary outline-none"
          />
        </div>
        <button 
          onClick={() => { setEditingRoom(null); setFormData({ ...formData, name: '' }); setShowModal(true); }}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors shadow-md"
        >
          <Plus className="h-5 w-5" /> Thêm Hạng Phòng mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="relative h-48">
              <img 
                src={room.images[0] || 'https://images.unsplash.com/photo-1544161515-4ae6ce6ca67e'} 
                alt={room.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  onClick={() => openEdit(room)}
                  className="p-2 bg-white/90 backdrop-blur-sm text-blue-600 rounded-full shadow hover:bg-white transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleDelete(room.id)}
                  className="p-2 bg-white/90 backdrop-blur-sm text-rose-600 rounded-full shadow hover:bg-white transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4">
                 <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-black text-white uppercase shadow-lg">
                   {room.category}
                 </span>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-serif font-bold text-lg text-secondary group-hover:text-primary transition-colors">{room.name}</h4>
                <p className="font-black text-primary">{room.price.toLocaleString('vi-VN')} đ</p>
              </div>
              
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {room.location}</span>
                <span className="flex items-center gap-1"><Layout className="h-3 w-3" /> {room.size}</span>
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                {room.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {(room.amenities || []).slice(0, 3).map((a: string, i: number) => (
                  <span key={i} className="text-[10px] bg-gray-50 text-gray-400 px-2 py-1 rounded-md border border-gray-100 uppercase font-medium">#{a}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-xl font-bold text-secondary flex items-center gap-2">
                {editingRoom ? <Edit2 className="h-5 w-5 text-primary" /> : <Plus className="h-5 w-5 text-primary" />}
                {editingRoom ? 'Cập nhật Hạng Phòng' : 'Thêm Hạng Phòng mới'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <Plus className="h-6 w-6 rotate-45" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-500 tracking-wider">Tên Hạng Phòng / Villa</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-500 tracking-wider">Phân loại</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="HOTEL">Phòng Khách sạn</option>
                    <option value="VILLA">Villa Nguyên căn</option>
                    <option value="PENTHOUSE">Penthouse</option>
                    <option value="APARTMENT">Căn hộ Dịch vụ</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-500 tracking-wider">Giá mỗi đêm (VND)</label>
                  <input 
                    required
                    type="number" 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-500 tracking-wider">Vị trí</label>
                  <input 
                    type="text" 
                    placeholder="Vũng Tàu..."
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-500 tracking-wider">Kiểu Phòng (Để Lọc Khách Sạn)</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-bold"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="">-- Bỏ qua nếu là Villa/Căn hộ --</option>
                    <option value="SINGLE">Phòng Đơn</option>
                    <option value="DOUBLE">Phòng Đôi</option>
                    <option value="TRIPLE">Phòng 3 Giường</option>
                    <option value="QUAD">Phòng 4 Giường</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-500 tracking-wider">Sức chứa (Người)</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                    value={formData.capacity}
                    onChange={(e) => setFormData({...formData, capacity: Number(e.target.value)})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-500 tracking-wider">Diện tích (m2)</label>
                  <input 
                    type="text" 
                    placeholder="VD: 35m2..."
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                    value={formData.size}
                    onChange={(e) => setFormData({...formData, size: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-500 tracking-wider">Mô tả Giường</label>
                  <input 
                    type="text" 
                    placeholder="VD: 1 Giường King, 2 Giường đơn..."
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                    value={formData.bed}
                    onChange={(e) => setFormData({...formData, bed: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-gray-500 tracking-wider">Ảnh (Link Unsplash/Web)</label>
                <div className="space-y-3">
                  {formData.images.map((img, idx) => (
                    <input 
                      key={idx}
                      type="text" 
                      placeholder="https://..."
                      className="w-full px-4 py-2 border border-gray-100 rounded-lg text-sm"
                      value={img}
                      onChange={(e) => {
                         const newImages = [...formData.images];
                         newImages[idx] = e.target.value;
                         setFormData({...formData, images: newImages});
                      }}
                    />
                  ))}
                  <button 
                    type="button" 
                    onClick={() => setFormData({...formData, images: [...formData.images, '']})}
                    className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
                  >
                    <Plus className="h-3 w-3" /> Thêm đường dẫn ảnh
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-gray-500 tracking-wider">Mô tả ngắn</label>
                <textarea 
                   className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl h-24 focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                   value={formData.description}
                   onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button 
                  type="submit" 
                  className="px-8 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                >
                  {editingRoom ? 'Lưu thay đổi' : 'Tạo mới ngay'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRooms;
