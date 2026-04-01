import { Link } from 'react-router-dom';
import { Award, Clock, Heart, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <div className="flex-grow pt-20 bg-white min-h-screen pb-20">
      <Helmet>
        <title>Về Chúng Tôi | Sen Vàng Hotel & Villa Vũng Tàu</title>
        <meta name="description" content="Tìm hiểu về câu chuyện hình thành và giá trị cốt lõi của Sen Vàng Hotel. Hành trình mang đến dịch vụ nghỉ dưỡng cao cấp tại thành phố biển Vũng Tàu." />
      </Helmet>
      {/* Hero */}
      <div className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1542314831-c6a4d27ce66f?q=80&w=2000&auto=format&fit=crop" 
            alt="Sen Vàng Hotel Exterior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif text-white font-bold mb-4 drop-shadow-md">Về Sen Vàng Hotel</h1>
          <p className="text-xl text-gray-200 drop-shadow">Nơi lưu giữ nét đẹp truyền thống giao hòa cùng vẻ đẹp đương đại.</p>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Câu chuyện của chúng tôi</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Tọa lạc tại vị trí đắc địa trên con đường bờ biển đẹp nhất Vũng Tàu, Sen Vàng Hotel ra đời với sứ mệnh mang đến một không gian nghỉ dưỡng đẳng cấp, tinh tế và ấm cúng như chính ngôi nhà của bạn.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Lấy cảm hứng từ hình ảnh hoa Sen - Quốc hoa của Việt Nam rực rỡ dưới ánh nắng vàng, kiến trúc của khách sạn là sự giao thoa hoàn hảo giữa nét Á Đông truyền thống và phong cách Châu Âu hiện đại. Mọi chi tiết tại Sen Vàng đều được chăm chút tỉ mỉ nhằm đem đến trải nghiệm cá nhân hóa hoàn hảo.
            </p>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop" 
              alt="Lobby" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-16">Giá trị cốt lõi</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Tận tâm</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Phục vụ khách hàng từ trái tim, luôn lắng nghe và thấu hiểu mọi nhu cầu.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Chất lượng</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Cam kết duy trì chuẩn mực dịch vụ 5 sao quốc tế ở mọi chi tiết nhỏ nhất.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Trách nhiệm</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Hoạt động bền vững, bảo vệ môi trường biển Vũng Tàu và cộng đồng.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Linh hoạt</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Sẵn sàng thích ứng và đổi mới để mang lại trải nghiệm vượt mong đợi.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 text-center">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Sẵn sàng cho một kỳ nghỉ tuyệt vời?</h2>
        <Link to="/rooms" className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-md font-medium transition-colors shadow-md">
          Khám phá hệ thống Phòng
        </Link>
      </div>
    </div>
  );
};

export default About;
