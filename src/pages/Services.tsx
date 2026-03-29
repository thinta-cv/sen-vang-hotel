import { Wind, Utensils, Waves } from 'lucide-react';

const Services = () => {
  return (
    <div className="flex-grow pt-20 bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 drop-shadow-md">Dịch vụ & Tiện ích</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-sm">Nâng tầm trải nghiệm với hệ thống nhà hàng ẩm thực đa dạng và spa thư giãn đẳng cấp.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* Service 1 */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-6">
              <Utensils className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Nhà hàng Ocean Blue</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Với không gian thưởng thức tinh tế nhìn thẳng ra biển rộng lớn, nhà hàng Ocean Blue phục vụ các bữa buffet sáng tiêu chuẩn quốc tế cùng thực đơn À la carte cao cấp hội tụ tinh hoa ẩm thực Á - Âu. Nguồn nguyên liệu hải sản tươi sống đánh bắt trong ngày tại vùng biển Vũng Tàu là điểm nhấn không thể bỏ qua.
            </p>
            <ul className="space-y-3 mb-8 text-gray-600">
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-primary rounded-full"></span> Mở cửa: 06:00 - 22:00 hàng ngày</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-primary rounded-full"></span> Vị trí: Tầng 2, view trực diện biển</li>
            </ul>
            <button className="border border-primary text-primary hover:bg-primary hover:text-white px-6 py-2 rounded-md font-medium transition-colors">
              Xem Thực đơn
            </button>
          </div>
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" alt="Restaurant" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Service 2 */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop" alt="Spa and Massage" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-6">
              <Wind className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Lotus Spa & Massage</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Buông bỏ mọi căng thẳng và hòa mình vào liệu pháp trị liệu chuyên sâu tại Lotus Spa. Tận dụng sự kết hợp giữa các hương liệu thảo mộc truyền thống Việt Nam và kỹ thuật massage thư giãn sâu, chúng tôi hứa hẹn sẽ làm mới lại tâm trí và cơ thể bạn hoàn toàn.
            </p>
            <ul className="space-y-3 mb-8 text-gray-600">
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-primary rounded-full"></span> Các gói dịch vụ: Massage Thái, Đá nóng, Tẩy tế bào chết</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-primary rounded-full"></span> Mở cửa: 09:00 - 21:00 (vui lòng đặt trước)</li>
            </ul>
            <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md font-medium transition-colors cursor-pointer">
              Đặt lịch Spa
            </button>
          </div>
        </div>

        {/* Service 3 */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-6">
              <Waves className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Hồ bơi vô cực</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Tọa lạc tại sân thượng của khách sạn, hồ bơi vô cực xóa nhòa ranh giới giữa mặt nước nhân tạo và đại dương mênh mông. Đây là nơi hoàn hảo để nhâm nhi một ly cocktail lúc hoàng hôn và lưu lại những bức hình tuyệt đẹp.
            </p>
            <ul className="space-y-3 mb-8 text-gray-600">
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-primary rounded-full"></span> Độ sâu: 1.2m đến 1.8m (Có khu vực riêng cho trẻ 0.6m)</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-primary rounded-full"></span> Vị trí: Tầng thượng (Rooftop)</li>
            </ul>
          </div>
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=2070&auto=format&fit=crop" alt="Infinity Pool" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
