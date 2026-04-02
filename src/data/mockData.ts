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
    id: 'phong-don-1',
    name: 'Phòng Đơn Tiêu Chuẩn',
    category: 'HOTEL',
    location: 'Vũng Tàu',
    type: 'SINGLE',
    price: 350000,
    capacity: 1,
    size: '18m²',
    bed: '1 Giường đơn',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop',
    ],
    amenities: ['Wi-Fi miễn phí', 'Điều hòa', 'Tivi', 'Tủ lạnh mini', 'Phòng tắm riêng'],
    description: 'Phòng đơn tối giản, gọn gàng, phù hợp cho khách đi du lịch một mình hoặc công tác ngắn ngày. Thoáng mát, sạch sẽ và đầy đủ tiện nghi thiết yếu.',
    featured: true
  },
  {
    id: 'phong-doi-1',
    name: 'Phòng Đôi Cửa Sổ Dài',
    category: 'HOTEL',
    location: 'Vũng Tàu',
    type: 'DOUBLE',
    price: 550000,
    capacity: 2,
    size: '25m²',
    bed: '2 Giường đơn (Twin)',
    images: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop',
    ],
    amenities: ['Wi-Fi miễn phí', 'Điều hòa', 'Tivi LCD', 'Bàn trà nhỏ', 'Tủ lạnh mini'],
    description: 'Phòng đôi 2 giường thoải mái được thiết kế trang nhã với bức tranh phong cảnh đồng quê thư thái, thích hợp cho 2 người bạn hoặc đồng nghiệp đi chung.',
    featured: true
  },
  {
    id: 'phong-doi-2',
    name: 'Phòng Đôi View Biển Nghệ Thuật',
    category: 'HOTEL',
    location: 'Vũng Tàu',
    type: 'DOUBLE',
    price: 650000,
    capacity: 2,
    size: '30m²',
    bed: '2 Giường đơn (Twin)',
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2070&auto=format&fit=crop',
    ],
    amenities: ['Wi-Fi miễn phí', 'Ban công đón gió', 'Smart Tivi', 'Tủ quần áo lớn', 'Phòng tắm đứng'],
    description: 'Điểm nhấn của căn phòng là bức tranh bãi biển xanh mát ngay trên đầu giường. Không gian rộng rãi hơn với khoảng trống thoải mái sinh hoạt, ăn uống.',
    featured: true
  },
  {
    id: 'phong-3-giuong-1',
    name: 'Phòng 3 Giường Gia Đình',
    category: 'HOTEL',
    location: 'Vũng Tàu',
    type: 'TRIPLE',
    price: 850000,
    capacity: 3,
    size: '35m²',
    bed: '3 Giường đơn (Triple)',
    images: [
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop',
    ],
    amenities: ['Wi-Fi tốc độ cao', 'Điều hòa cỡ lớn', 'Smart Tivi 50 inch', 'Bàn trang điểm', 'Khu vực bếp mini'],
    description: 'Sự lựa chọn số một cho gia đình có con nhỏ hoặc nhóm bạn 3 người. Đủ rộng rãi để mọi thành viên được nghỉ ngơi độc lập mà vẫn chia sẻ cùng 1 không gian.',
    featured: true
  },
  {
    id: 'phong-4-giuong-1',
    name: 'Phòng 4 Giường Tập Thể',
    category: 'HOTEL',
    location: 'Vũng Tàu',
    type: 'QUAD',
    price: 1100000,
    capacity: 4,
    size: '45m²',
    bed: '4 Giường đơn (hoặc 2 Đôi)',
    images: [
      'https://images.unsplash.com/photo-1549415654-7f15e8574169?q=80&w=2070&auto=format&fit=crop',
    ],
    amenities: ['Wi-Fi miễn phí', 'Tủ lạnh lớn', 'Bộ sofa nhỏ', 'Phòng tắm rộng', 'Trà/Cà phê miễn phí'],
    description: 'Căn phòng rộng nhất trong cấu trúc khách sạn của Sen Vàng, đặc biệt phù hợp cho nhóm thân hữu đi phượt cuối tuần.',
    featured: false
  },
  {
    id: 'villa-ocean-1',
    name: 'Biệt Thự Sen Vàng (Hồ Bơi Riêng)',
    category: 'VILLA',
    location: 'Bãi Sau, Vũng Tàu',
    type: 'VILLA',
    price: 6500000,
    capacity: 15,
    size: '400m²',
    bed: '6 Phòng ngủ độc lập',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop'
    ],
    amenities: ['Hồ bơi 50m2', 'Dàn Karaoke xịn', 'Sân Vườn BBQ', 'Gara 2 ô tô lớn', 'Bếp Full Dụng Cụ', 'Cách biển 200m'],
    description: 'Biệt thự nguyên căn sang trọng bậc nhất dành riêng cho các đại gia đình hoặc team building công ty. Được trang bị thiết kế chuẩn mở, liền mạch giữa sân vườn, hồ bơi và khu sinh hoạt chung.',
    featured: true
  },
  {
    id: 'apt-studio-1',
    name: 'Căn Hộ Studio Dài Hạn',
    category: 'APARTMENT',
    location: 'Trung tâm Vũng Tàu',
    type: 'APARTMENT',
    price: 1800000,
    capacity: 3,
    size: '55m²',
    bed: '1 Giường đôi lớn & Sofa Bed',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1de2d9d00c?q=80&w=2070&auto=format&fit=crop'
    ],
    amenities: ['Bếp gia đình', 'Bàn làm việc', 'Máy giặt/sấy', 'Ban công hóng gió', 'Miễn phí điện nước'],
    description: 'Giải pháp tuyệt vời cho khách đi công tác dài ngày hoặc gia đình lưu trú theo tuần/tháng. Đầy đủ không gian tiện nghi như chính ngôi nhà của bạn.',
    featured: false
  }
];
