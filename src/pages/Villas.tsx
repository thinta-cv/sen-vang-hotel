import { Helmet } from 'react-helmet-async';

const Villas = () => {
  return (
    <div className="pt-20">
      <Helmet>
        <title>Biệt Thự & Villa Nguyên Căn | Sen Vàng Hotel</title>
        <meta name="description" content="Danh sách biệt thự và villa nguyên căn sang trọng, riêng tư dành cho gia đình và nhóm bạn tại trung tâm Vũng Tàu." />
      </Helmet>
      
      <div className="bg-secondary py-20 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 uppercase">Biệt Thự & Villa</h1>
        <p className="max-w-2xl mx-auto text-gray-300">Không gian nghỉ dưỡng riêng tư, đẳng cấp với hồ bơi và khu vực BBQ dành riêng cho gia đình bạn.</p>
      </div>

      <div className="py-20 text-center text-gray-400">
        <p className="text-xl">Hệ thống Villa đang được nâng cấp và chờ quản trị viên cập nhật dữ liệu.</p>
        <p className="text-sm mt-2">Vui lòng quay lại sau!</p>
      </div>
    </div>
  );
};

export default Villas;
