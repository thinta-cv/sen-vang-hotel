export interface Room {
  id: string;
  name: string;
  category: 'HOTEL' | 'VILLA' | 'PENTHOUSE' | 'APARTMENT';
  location: string;
  type: string;
  price: number;
  capacity: number;
  size: string;
  bed: string;
  images: string[];
  amenities: string[];
  description: string;
  featured: boolean;
}

export const rooms: Room[] = [
  {
    id: 'deluxe-ocean',
    name: 'Phòng Deluxe Hướng Biển',
    category: 'HOTEL',
    location: 'Bãi Sau, Vũng Tàu',
    type: 'Deluxe',
    price: 1500000,
    capacity: 2,
    size: '35m²',
    bed: '1 Giường đôi lớn (King size)',
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549415654-7f15e8574169?q=80&w=2070&auto=format&fit=crop'
    ],
    amenities: ['Wi-Fi miễn phí', 'Ban công hướng biển', 'Tivi màn hình phẳng 55 inch', 'Bồn tắm cao cấp', 'Minibar', 'Máy pha cà phê'],
    description: 'Tận hưởng kỳ nghỉ trân quý với tầm nhìn bao trọn bãi biển Vũng Tàu. Căn phòng được trang bị nội thất gỗ sang trọng, kết hợp cùng gam màu trung tính mang lại cảm giác bình yên và ấm cúng tuyệt đối.',
    featured: true
  },
  {
    id: 'premium-suite',
    name: 'Premium Suite Ban Công Riêng',
    category: 'HOTEL',
    location: 'Bãi Sau, Vũng Tàu',
    type: 'Suite',
    price: 3200000,
    capacity: 3,
    size: '60m²',
    bed: '1 Giường King lớn & 1 Sofa bed',
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560067174-c5a3a8f37060?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop'
    ],
    amenities: ['Wi-Fi miễn phí', 'Ban công cực rộng', 'Phòng khách riêng biệt', 'Bồn tắm Jacuzzi ngoài trời', 'Máy pha cà phê Nespresso', 'Butler phục vụ tại phòng'],
    description: 'Căn phòng xa hoa nhất tại Sen Vàng, dành riêng cho những thượng khách tìm kiếm sự riêng tư hoàn mỹ. Với phòng khách tách biệt và ban công rộng rãi có bồn tắm Jacuzzi, đây là không gian lý tưởng để ngắm hoàng hôn trên biển.',
    featured: true
  },
  {
    id: 'superior-city',
    name: 'Phòng Superior View Thành Phố',
    category: 'HOTEL',
    location: 'Bãi Sau, Vũng Tàu',
    type: 'Superior',
    price: 950000,
    capacity: 2,
    size: '28m²',
    bed: '2 Giường đơn (Twin bed)',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop'
    ],
    amenities: ['Wi-Fi miễn phí', 'Cửa sổ lớn sát trần', 'Smart Tivi', 'Vòi sen nhiệt ẩm', 'Minibar tiện lợi'],
    description: 'Lựa chọn lý tưởng cho các chuyến công tác hoặc du lịch ngắn ngày. Căn phòng Superior mang phong cách thiết kế hiện đại, tận dụng tối đa ánh sáng tự nhiên qua cửa sổ lớn hướng nhìn toàn cảnh thành phố năng động.',
    featured: true
  }
];
