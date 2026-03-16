import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Star,
  MapPin,
  Share2,
  Heart,
  Clock,
  Calendar,
  PawPrint,
  User,
  X,
  Menu,
  Phone,
  MessageSquare,
  ArrowLeft
} from 'lucide-react';

const ProviderDetailPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const provider = {
    name: "Paws & Relax Luxury Spa",
    rating: 4.9,
    reviewsCount: 156,
    address: "123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
    description: "Paws & Relax Luxury Spa là điểm đến hàng đầu cho các dịch vụ chăm sóc thú cưng cao cấp. Với đội ngũ chuyên gia hơn 10 năm kinh nghiệm và trang thiết bị hiện đại, chúng tôi cam kết mang lại trải nghiệm thư giãn tuyệt vời nhất cho người bạn nhỏ của bạn. Chúng tôi sử dụng các dòng sản phẩm organic an toàn tuyệt đối cho da và lông.",
    bannerImage: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1591768793355-74d7ca738055?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=400"
    ],
    services: [
      { id: 1, name: "Gói Tắm Thư Giãn", desc: "Tắm bằng nước ấm, dầu gội organic, sấy khô và chải lông.", price: "200.000", duration: "45 min" },
      { id: 2, name: "Cắt Tỉa Tạo Kiểu", desc: "Vệ sinh tai, cắt móng và tạo kiểu lông theo yêu cầu.", price: "350.000", duration: "90 min" },
      { id: 3, name: "Trị Liệu Da & Lông", desc: "Phục hồi hư tổn cho lông và điều trị các vấn đề về da.", price: "500.000", duration: "60 min" }
    ],
    hours: [
      { days: "Mon - Fri", time: "09:00 - 19:00" },
      { days: "Sat - Sun", time: "09:00 - 17:00" }
    ],
    slots: ["10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
    reviews: [
      { id: 1, user: "Minh Anh", avatar: "https://i.pravatar.cc/150?u=ma", rating: 5, comment: "Dịch vụ rất tốt, nhân viên nhiệt tình và yêu thương chó mèo. Sẽ quay lại!", date: "12/05/2025" },
      { id: 2, user: "Hoàng Nam", avatar: "https://i.pravatar.cc/150?u=hn", rating: 4, comment: "Spa sạch sẽ, cắt tỉa rất đẹp. Bé nhà mình rất thích.", date: "08/05/2025" }
    ]
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 pb-20">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <div className="bg-orange-500 p-1.5 rounded-lg">
                  <PawPrint className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-black text-gray-900">Pet<span className="text-orange-500">Go</span></span>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold">
              <Link to="/" className="text-gray-600 hover:text-orange-600">Home</Link>
              <Link to="/search" className="text-orange-600">Services</Link>
              <Link to="/my-bookings" className="text-gray-600 hover:text-orange-600">My Booking</Link>
              <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center border-2 border-white shadow-sm">
                <User className="w-4 h-4 text-orange-600" />
              </div>
            </nav>

            <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <section className="relative h-[40vh] sm:h-[50vh] w-full overflow-hidden">
        <img src={provider.bannerImage} alt={provider.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute bottom-8 left-0 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-end">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-orange-500 text-[10px] font-black uppercase rounded-full tracking-widest">Premium Spa</span>
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs font-bold">{provider.rating}</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight">{provider.name}</h1>
            </div>
            <div className="hidden sm:flex gap-3">
              <button className="p-3 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-2xl transition-all">
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-3 backdrop-blur-md rounded-2xl transition-all ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/40'}`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 space-y-12">
            <div className="flex sm:hidden gap-4 mt-8">
              <button className="flex-1 py-3 bg-gray-100 rounded-2xl font-bold flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" /> Share
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex-1 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${isFavorite ? 'bg-red-50 text-red-500 border border-red-100' : 'bg-gray-100'}`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} /> Favorite
              </button>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4 mb-8">
                <div className="p-4 bg-orange-50 rounded-2xl">
                  <MapPin className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Địa chỉ</h3>
                  <p className="text-lg font-bold text-gray-900">{provider.address}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StatItem label="Đánh giá" value={`${provider.rating} / 5`} />
                <StatItem label="Reviews" value={provider.reviewsCount} />
                <StatItem label="Kinh nghiệm" value="10+ năm" />
                <StatItem label="Chứng chỉ" value="Verified" />
              </div>
            </div>

            <section>
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-orange-500 rounded-full"></div> Gallery
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {provider.gallery.map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-[2rem] overflow-hidden group cursor-pointer border-4 border-white shadow-sm hover:shadow-xl transition-all">
                    <img src={img} alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-gray-900 mb-4">Mô tả cửa hàng</h2>
              <p className="text-gray-500 leading-relaxed font-medium">
                {provider.description}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-gray-900 mb-6">Dịch vụ của chúng tôi</h2>
              <div className="space-y-4">
                {provider.services.map((service) => (
                  <div key={service.id} className="group bg-gray-50 p-6 rounded-[2rem] border border-transparent hover:bg-white hover:border-orange-100 hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-lg font-black text-gray-900">{service.name}</h4>
                        <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400 bg-white px-2 py-0.5 rounded-full border border-gray-100">
                          <Clock className="w-3 h-3" /> {service.duration}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 font-medium">{service.desc}</p>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-4 sm:pt-0">
                      <span className="text-xl font-black text-orange-600">{service.price}đ</span>
                      <button
                        onClick={() => navigate(`/booking?providerId=${id}&serviceId=${service.id}`)}
                        className="px-6 py-3 bg-gray-900 text-white text-xs font-black rounded-2xl hover:bg-orange-500 hover:shadow-lg transition-all uppercase tracking-widest"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-gray-900">Khách hàng đánh giá</h2>
                <button className="text-sm font-bold text-orange-600 hover:underline">Xem tất cả</button>
              </div>
              <div className="space-y-6">
                {provider.reviews.map((rev) => (
                  <div key={rev.id} className="p-6 rounded-[2rem] border border-gray-100 bg-white shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <img src={rev.avatar} alt={rev.user} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                          <h5 className="font-black text-gray-900">{rev.user}</h5>
                          <span className="text-xs font-bold text-gray-400">{rev.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 rounded-lg">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs font-black text-yellow-700">{rev.rating}.0</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:w-[380px] space-y-8">
            <div className="sticky top-28 space-y-8">
              <div className="bg-gray-900 text-white p-8 rounded-[2.5rem] shadow-2xl">
                <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-500" /> Giờ làm việc
                </h3>
                <div className="space-y-4">
                  {provider.hours.map((h, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <span className="font-bold text-gray-400">{h.days}</span>
                      <span className="font-black text-white">{h.time}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <Phone className="w-5 h-5 text-orange-500" />
                    </div>
                    <span className="text-sm font-bold">090 123 4567</span>
                  </div>
                  <button className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2">
                    <MessageSquare className="w-5 h-5" /> Chat với chúng tôi
                  </button>
                </div>
              </div>

              <div className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-black text-gray-900">Slot trống hôm nay</h3>
                  <Calendar className="w-5 h-5 text-orange-500" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {provider.slots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => {
                        setSelectedSlot(slot);
                        navigate(`/booking?providerId=${id}&time=${slot}`);
                      }}
                      className={`py-3 rounded-2xl text-xs font-black transition-all ${
                        selectedSlot === slot
                          ? 'bg-orange-500 text-white shadow-lg shadow-orange-100'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                <p className="mt-6 text-[10px] text-gray-400 text-center font-bold uppercase tracking-widest">
                  Chọn giờ để tiến hành đặt chỗ
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

const StatItem = ({ label, value }) => (
  <div className="text-center sm:text-left">
    <span className="block text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">{label}</span>
    <span className="block text-base font-black text-gray-900">{value}</span>
  </div>
);

export default ProviderDetailPage;