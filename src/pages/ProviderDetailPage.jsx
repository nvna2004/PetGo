import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  Share2, 
  Heart, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ChevronRight,
  PawPrint,
  User,
  X,
  Menu,
  Phone,
  MessageSquare,
  ArrowLeft,
  Maximize2,
  Info
} from 'lucide-react';

const ProviderDetailPage = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Dữ liệu mẫu nhà cung cấp
  const provider = {
    id: 1,
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

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    window.location.href = `/booking?providerId=${provider.id}&time=${slot}`;
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 pb-20">
      {/* Header PetGo */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <button 
                onClick={() => window.location.href = '/search'}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
             >
               <ArrowLeft className="w-5 h-5" />
             </button>
             <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
               <div className="bg-orange-500 p-1.5 rounded-lg">
                 <PawPrint className="w-5 h-5 text-white" />
               </div>
               <span className="text-xl font-black text-gray-900">Pet<span className="text-orange-500">Go</span></span>
             </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-gray-500">
            <a href="/" className="hover:text-orange-600 transition-colors">Home</a>
            <a href="/search" className="hover:text-orange-600 transition-colors text-orange-600">Services</a>
            <a href="/my-bookings" className="hover:text-orange-600 transition-colors">My Booking</a>
            <div 
                onClick={() => window.location.href = '/favorites'}
                className="p-2 bg-gray-50 rounded-full hover:text-red-500 transition-colors cursor-pointer"
            >
                <Heart className="w-5 h-5" />
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Banner Area */}
      <section className="relative h-[45vh] w-full overflow-hidden">
        <img 
          src={provider.bannerImage} 
          alt={provider.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-10 left-0 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-end gap-6">
            <div className="text-white flex-1">
               <div className="flex items-center gap-2 mb-3">
                 <span className="px-3 py-1 bg-orange-500 text-[10px] font-black uppercase rounded-full tracking-widest">Premium Provider</span>
                 <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                   <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                   <span className="text-xs font-black">{provider.rating}</span>
                 </div>
               </div>
               <h1 className="text-4xl sm:text-6xl font-black tracking-tighter mb-2">{provider.name}</h1>
               <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                  <MapPin className="w-4 h-4 text-orange-400" />
                  {provider.address}
               </div>
            </div>
            
            <div className="flex gap-3">
              <button className="p-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-[1.5rem] border border-white/20 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
              <button 
                onClick={() => window.location.href = '/favorites'}
                className={`p-4 backdrop-blur-md rounded-[1.5rem] border border-white/20 transition-all ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button 
                onClick={() => window.location.href = '/compare'}
                className="p-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-[1.5rem] border border-white/20 transition-all"
                title="So sánh"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Info Column */}
          <div className="flex-1 space-y-12">
            
            {/* Gallery Grid */}
            <section className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                 <div className="w-1.5 h-4 bg-orange-500 rounded-full"></div> Không gian & Hình ảnh
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {provider.gallery.map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-3xl overflow-hidden group cursor-pointer border-2 border-white shadow-sm hover:shadow-xl transition-all">
                    <img src={img} alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </section>

            {/* Store Description */}
            <section className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-black text-gray-900 mb-4">Về cửa hàng</h2>
              <p className="text-gray-500 leading-relaxed font-medium">
                {provider.description}
              </p>
            </section>

            {/* Services List */}
            <section className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center justify-between">
                Danh sách dịch vụ
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{provider.services.length} Dịch vụ</span>
              </h2>
              <div className="space-y-4">
                {provider.services.map((service) => (
                  <div key={service.id} className="group p-6 bg-gray-50 rounded-[2rem] border-2 border-transparent hover:bg-white hover:border-orange-100 hover:shadow-xl hover:shadow-orange-100/30 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                         <h4 className="text-lg font-black text-gray-900">{service.name}</h4>
                         <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 bg-white px-2.5 py-1 rounded-full border border-gray-100">
                           <Clock className="w-3.5 h-3.5" /> {service.duration}
                         </span>
                      </div>
                      <p className="text-sm text-gray-500 font-medium">{service.desc}</p>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-8 border-t sm:border-t-0 pt-4 sm:pt-0">
                      <div className="text-right">
                        <span className="block text-[10px] font-black text-gray-300 uppercase mb-0.5 tracking-widest">Giá từ</span>
                        <span className="text-2xl font-black text-orange-600">{service.price}đ</span>
                      </div>
                      <button 
                        onClick={() => window.location.href = `/booking?providerId=${provider.id}&serviceId=${service.id}`}
                        className="px-8 py-4 bg-gray-900 text-white text-[10px] font-black rounded-[1.5rem] hover:bg-orange-500 hover:shadow-lg transition-all uppercase tracking-widest"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews Section */}
            <section className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-1">Đánh giá thực tế</h2>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest italic">{provider.reviewsCount} Khách hàng đã sử dụng</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-gray-900">{provider.rating}</span>
                  <div className="flex gap-0.5 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                {provider.reviews.map((rev) => (
                  <div key={rev.id} className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100 hover:bg-white hover:border-orange-100 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <img src={rev.avatar} alt={rev.user} className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-sm" />
                        <div>
                          <h5 className="font-black text-gray-900 text-lg">{rev.user}</h5>
                          <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">{rev.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-400 text-yellow-900 rounded-lg">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-xs font-black">{rev.rating}.0</span>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed font-medium italic">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar: Booking Info & Hours */}
          <aside className="lg:w-[400px]">
            <div className="sticky top-28 space-y-8">
              
              {/* Working Hours Card */}
              <div className="bg-gray-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Clock className="w-32 h-32 rotate-12" />
                </div>
                <h3 className="text-xl font-black mb-8 flex items-center gap-3 relative z-10">
                  <div className="p-2 bg-orange-500 rounded-xl">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  Giờ làm việc
                </h3>
                <div className="space-y-5 relative z-10">
                  {provider.hours.map((h, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <span className="font-bold text-gray-400">{h.days}</span>
                      <div className="h-px flex-1 border-t border-dashed border-white/20 mx-4"></div>
                      <span className="font-black text-white">{h.time}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-10 pt-8 border-t border-white/10 relative z-10">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                        <Phone className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Hotline hỗ trợ</p>
                        <p className="text-lg font-black tracking-tight italic">090 123 4567</p>
                      </div>
                   </div>
                   <button className="w-full py-5 bg-white text-gray-900 font-black rounded-2xl hover:bg-orange-500 hover:text-white transition-all shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
                     <MessageSquare className="w-4 h-4" /> Chat với tư vấn viên
                   </button>
                </div>
              </div>

              {/* Appointment Slots Card */}
              <div className="bg-white border border-gray-100 p-10 rounded-[3rem] shadow-sm text-center">
                <div className="flex items-center justify-center gap-2 mb-8">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  <h3 className="text-xl font-black text-gray-900">Slot trống hôm nay</h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {provider.slots.map((slot) => (
                    <button 
                      key={slot}
                      onClick={() => handleSlotClick(slot)}
                      className="group relative py-4 rounded-2xl text-xs font-black transition-all bg-gray-50 text-gray-600 hover:bg-orange-500 hover:text-white hover:shadow-lg active:scale-95"
                    >
                      {slot}
                      <span className="absolute -top-2 -right-2 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></span>
                    </button>
                  ))}
                </div>
                <div className="mt-8 flex items-start gap-3 p-4 bg-orange-50 rounded-2xl text-left border border-orange-100">
                    <Info className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] font-bold text-orange-800 leading-relaxed uppercase tracking-tight">
                        Chọn một khung giờ để bắt đầu tiến trình đặt lịch nhanh. Lịch sẽ được xác nhận ngay lập tức.
                    </p>
                </div>
              </div>

            </div>
          </aside>

        </div>
      </main>
    </div>
  );
};

export default ProviderDetailPage;