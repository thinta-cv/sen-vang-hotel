import { Helmet } from 'react-helmet-async';

const Apartments = () => {
  return (
    <div className="pt-20">
      <Helmet>
        <title>Căn Hộ Mini & Gia Đình | Sen Vàng Hotel</title>
        <meta name="description" content="Hệ thống căn hộ mini sang trọng với đầy đủ bếp, góc sinh hoạt dành riêng cho chuyến du lịch dài ngày ở Vũng Tàu." />
      </Helmet>
      
      <div className="bg-secondary py-20 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 uppercase">Căn Hộ Lưu Trú Dài Ngày</h1>
        <p className="max-w-2xl mx-auto text-gray-300">Không gian ấm cúng được trang bị đầy đủ bếp gia đình và tiện nghi cao cấp, lý tưởng cho những chuyến đi trên 3 ngày!</p>
      </div>

      <div className="py-20 text-center text-gray-400">
        <p className="text-xl">Hệ thống Căn Hộ đang được thiết lập và chờ quản trị viên cập nhật dữ liệu.</p>
        <p className="text-sm mt-2">Vui lòng quay lại sau!</p>
      </div>
    </div>
  );
};

export default Apartments;
