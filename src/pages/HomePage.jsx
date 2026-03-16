import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  Heart, 
  Calendar, 
  User, 
  PawPrint, 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  BadgeCheck,
  Zap,
  Tag,
  MessageCircle,
  Menu,
  X,
  Navigation,
  Scissors,
  Stethoscope,
  Hotel,
  Award
} from 'lucide-react';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Danh mục dịch vụ
  const categories = [
    { name: 'Spa', icon: <PawPrint className="w-6 h-6" />, color: 'bg-orange-100 text-orange-600' },
    { name: 'Tắm rửa', icon: <Zap className="w-6 h-6" />, color: 'bg-blue-100 text-blue-600' },
    { name: 'Cắt tỉa', icon: <Scissors className="w-6 h-6" />, color: 'bg-purple-100 text-purple-600' },
    { name: 'Thú y', icon: <Stethoscope className="w-6 h-6" />, color: 'bg-red-100 text-red-600' },
    { name: 'Khách sạn', icon: <Hotel className="w-6 h-6" />, color: 'bg-green-100 text-green-600' },
    { name: 'Huấn luyện', icon: <Award className="w-6 h-6" />, color: 'bg-yellow-100 text-yellow-600' },
  ];

  // Nhà cung cấp nổi bật
  const featuredProviders = [
    {
      id: 1,
      name: "Luxury Pet Spa & Grooming",
      rating: 4.9,
      reviews: 245,
      price: "150.000",
      distance: "1.2 km",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400",
      badge: "Top Rated",
      badgeColor: "bg-yellow-400"
    },
    {
      id: 2,
      name: "PetHealth Clinic",
      rating: 4.8,
      reviews: 180,
      price: "200.000",
      distance: "2.5 km",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400",
      badge: "Hot Deal",
      badgeColor: "bg-red-500"
    },
    {
      id: 3,
      name: "New Friends Hotel",
      rating: 5.0,
      reviews: 12,
      price: "300.000",
      distance: "0.8 km",
      image: "https://images.unsplash.com/photo-1591768793355-74d7ca738055?auto=format&fit=crop&q=80&w=400",
      badge: "New",
      badgeColor: "bg-blue-500"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
            <div className="bg-orange-500 p-1.5 rounded-lg shadow-lg shadow-orange-200">
              <PawPrint className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tighter">Pet<span className="text-orange-500">Go</span></span>
          </div>

          {/* Search Box - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Tìm spa, thú y, khách sạn..." 
                className="w-full pl-11 pr-4 py-2.5 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-orange-500/20 transition-all outline-none text-sm font-medium"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-black uppercase tracking-widest text-gray-500">
            <a href="/" className="text-orange-600">Home</a>
            <a href="/search" className="hover:text-orange-500 transition-colors">Services</a>
            <a href="/my-bookings" className="hover:text-orange-500 transition-colors">My Booking</a>
            <a href="/favorites" className="hover:text-orange-500 transition-colors flex items-center gap-1">
              <Heart className="w-4 h-4" /> Favorites
            </a>
            <div className="h-8 w-px bg-gray-100 mx-2"></div>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.href = '/profile'}>
              <div className="w-9 h-9 rounded-full bg-orange-100 border-2 border-white shadow-sm flex items-center justify-center">
                <User className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2 text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Sidebar */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-6 px-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
            <a href="/" className="text-orange-600 font-black">Home</a>
            <a href="/search" className="text-gray-600 font-bold">Services</a>
            <a href="/my-bookings" className="text-gray-600 font-bold">My Booking</a>
            <a href="/favorites" className="text-gray-600 font-bold">Favorites</a>
            <a href="/profile" className="text-gray-600 font-bold">Profile</a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-48 sm:pb-32 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-100 rounded-full blur-[100px] -z-10 opacity-60"></div>
        <div className="absolute bottom-10 right-0 w-80 h-80 bg-blue-50 rounded-full blur-[100px] -z-10 opacity-60"></div>
        
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-orange-100 rounded-full shadow-sm mb-6 animate-bounce">
            <span className="flex h-2 w-2 rounded-full bg-orange-500"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-700">Dịch vụ chăm sóc thú cưng số 1 Việt Nam</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-gray-900 mb-6 leading-tight tracking-tighter">
            Hạnh phúc của thú cưng <br />
            <span className="text-orange-500">Bắt đầu từ PetGo</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg mb-10 font-medium">
            Kết nối ngay với 5000+ spa, phòng khám thú y và khách sạn uy tín. <br className="hidden sm:block" />
            Đã có hơn 100k+ lượt đặt chỗ thành công trên toàn quốc.
          </p>

          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 p-3 bg-white rounded-[2rem] shadow-2xl shadow-orange-100 border border-gray-50 mb-12">
            <div className="flex-1 flex items-center px-4 gap-3 border-r border-gray-100 sm:mb-0 mb-4 py-2">
              <Search className="text-orange-500 w-5 h-5" />
              <input type="text" placeholder="Dịch vụ hoặc spa bạn cần?" className="w-full bg-transparent outline-none font-bold text-sm" />
            </div>
            <div className="flex-1 flex items-center px-4 gap-3 py-2">
              <MapPin className="text-orange-500 w-5 h-5" />
              <input type="text" placeholder="Khu vực của bạn" className="w-full bg-transparent outline-none font-bold text-sm" />
            </div>
            <button 
              onClick={() => window.location.href = '/search'}
              className="bg-gray-900 hover:bg-orange-500 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95"
            >
              Tìm kiếm
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => window.location.href = '/search'} className="px-8 py-4 bg-orange-500 text-white font-black rounded-2xl shadow-xl shadow-orange-100 hover:scale-105 transition-all uppercase tracking-widest text-xs">
              Book Now
            </button>
            <button onClick={() => window.location.href = '/search'} className="px-8 py-4 bg-white text-gray-900 font-black rounded-2xl border-2 border-gray-100 hover:border-orange-500 hover:text-orange-600 transition-all uppercase tracking-widest text-xs">
              Explore Services
            </button>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Danh mục dịch vụ</h2>
            <button className="text-sm font-bold text-orange-600 hover:underline flex items-center gap-1">
              Xem tất cả <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <div 
                key={i} 
                onClick={() => window.location.href = '/search'}
                className="bg-white p-6 rounded-[2rem] border border-gray-100 flex flex-col items-center justify-center gap-4 cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all group"
              >
                <div className={`${cat.color} p-4 rounded-2xl transition-transform group-hover:scale-110`}>
                  {cat.icon}
                </div>
                <span className="font-black text-gray-700 text-sm uppercase tracking-widest">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Near You Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
               <h2 className="text-2xl font-black text-gray-900 tracking-tight">Near your location</h2>
               <p className="text-gray-400 text-sm font-bold">Đang hiển thị các dịch vụ xung quanh Quận 1, TP. HCM</p>
            </div>
            <button onClick={() => window.location.href = '/nearby'} className="p-3 bg-orange-50 text-orange-600 rounded-full hover:bg-orange-500 hover:text-white transition-all">
              <Navigation className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
          <div className="mt-12 text-center">
             <button onClick={() => window.location.href = '/search'} className="px-10 py-4 border-2 border-gray-100 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-500 hover:border-orange-500 hover:text-orange-600 transition-all">
               View all providers
             </button>
          </div>
        </div>
      </section>

      {/* Promotion Banner */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-orange-500 to-yellow-400 rounded-[3rem] p-8 sm:p-16 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-10">
             <div className="absolute top-0 right-0 p-10 opacity-10">
                <Tag className="w-64 h-64 -rotate-12" />
             </div>
             <div className="relative z-10">
                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-widest mb-4 inline-block">Special Offer</span>
                <h2 className="text-4xl sm:text-6xl font-black text-white mb-4 tracking-tighter">Voucher 50k cho <br /> lần đầu đặt lịch</h2>
                <p className="text-white/80 font-bold mb-8 italic">Mã: HELLOPETGO (Hết hạn sau 3 ngày)</p>
                <button className="px-10 py-5 bg-white text-orange-600 font-black rounded-2xl shadow-xl hover:scale-105 transition-all uppercase tracking-widest text-xs">
                  Use Now
                </button>
             </div>
             <div className="relative z-10 bg-white p-8 rounded-[2.5rem] shadow-2xl rotate-3 sm:w-64 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Tag className="w-8 h-8 text-orange-600" />
                </div>
                <p className="text-xs font-black text-gray-300 uppercase tracking-widest mb-1">Coupon Code</p>
                <p className="text-2xl font-black text-gray-900">PETLOVE20</p>
                <div className="mt-4 pt-4 border-t border-gray-50 flex justify-center">
                   <div className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-lg uppercase">Active</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Why Choose PetGo */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">Tại sao nên chọn PetGo?</h2>
            <div className="w-20 h-2 bg-orange-500 rounded-full mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <WhyItem icon={<ShieldCheck className="w-8 h-8" />} title="Verified providers" desc="100% đối tác được kiểm duyệt giấy phép và kỹ năng." />
            <WhyItem icon={<BadgeCheck className="w-8 h-8" />} title="Transparent pricing" desc="Giá cả công khai, không phát sinh chi phí ẩn." />
            <WhyItem icon={<Zap className="w-8 h-8" />} title="Fast booking" desc="Đặt lịch thành công chỉ trong 30 giây." />
            <WhyItem icon={<MessageCircle className="w-8 h-8" />} title="Verified reviews" desc="Đánh giá từ những khách hàng đã sử dụng dịch vụ." />
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          <div>
            <p className="text-4xl sm:text-5xl font-black text-orange-500 mb-2 tracking-tighter">100k+</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Booking thành công</p>
          </div>
          <div>
            <p className="text-4xl sm:text-5xl font-black text-orange-500 mb-2 tracking-tighter">5k+</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Đối tác Spa & Thú y</p>
          </div>
          <div>
            <p className="text-4xl sm:text-5xl font-black text-orange-500 mb-2 tracking-tighter">4.9/5</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Đánh giá ứng dụng</p>
          </div>
          <div>
            <p className="text-4xl sm:text-5xl font-black text-orange-500 mb-2 tracking-tighter">50+</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tỉnh thành toàn quốc</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-orange-500 p-1.5 rounded-lg">
                <PawPrint className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black text-gray-900 tracking-tight">Pet<span className="text-orange-500">Go</span></span>
            </div>
            <p className="text-gray-400 text-sm font-medium leading-relaxed">
              Giải pháp toàn diện cho việc chăm sóc và đặt lịch dịch vụ thú cưng. Chúng tôi mang lại sự an tâm cho bạn và niềm vui cho người bạn nhỏ.
            </p>
          </div>
          <FooterGroup title="Dịch vụ" links={['Spa & Grooming', 'Thú y', 'Khách sạn', 'Huấn luyện']} />
          <FooterGroup title="Hệ thống" links={['FAQ', 'Hợp tác đối tác', 'Tuyển dụng', 'Liên hệ']} />
          <FooterGroup title="Pháp lý" links={['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Security']} />
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-10 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-6">
           <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">© 2025 PetGo Inc. All rights reserved.</p>
           <div className="flex gap-4">
              <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 hover:text-orange-500 cursor-pointer transition-colors"><MessageCircle className="w-4 h-4" /></div>
              <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 hover:text-orange-500 cursor-pointer transition-colors"><Search className="w-4 h-4" /></div>
              <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 hover:text-orange-500 cursor-pointer transition-colors"><Heart className="w-4 h-4" /></div>
           </div>
        </div>
      </footer>
    </div>
  );
};

// Component con: Card nhà cung cấp
const ProviderCard = ({ provider }) => (
  <div 
    onClick={() => window.location.href = `/providers/${provider.id}`}
    className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
  >
    <div className="relative h-56 overflow-hidden">
      <img src={provider.image} alt={provider.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className={`absolute top-5 left-5 px-4 py-1.5 ${provider.badgeColor} text-white text-[10px] font-black uppercase rounded-full tracking-widest shadow-lg`}>
        {provider.badge}
      </div>
      <button className="absolute top-5 right-5 p-2.5 bg-white/90 backdrop-blur-md rounded-2xl text-gray-400 hover:text-red-500 transition-all shadow-lg">
        <Heart className="w-5 h-5" />
      </button>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-black text-gray-900 group-hover:text-orange-600 transition-colors leading-tight">{provider.name}</h3>
        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
          <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
          <span className="text-xs font-black text-yellow-700">{provider.rating}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
          <Navigation className="w-3.5 h-3.5 text-blue-500" /> Cách bạn {provider.distance}
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
          <Clock className="w-3.5 h-3.5 text-orange-500" /> Đang mở cửa
        </div>
      </div>
      <div className="flex items-center justify-between pt-5 border-t border-gray-50">
        <div>
          <span className="text-[10px] text-gray-300 font-black uppercase tracking-widest mb-1 block">Giá từ</span>
          <span className="text-xl font-black text-gray-900">{provider.price}đ</span>
        </div>
        <button className="bg-gray-900 group-hover:bg-orange-500 text-white px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
          View Details
        </button>
      </div>
    </div>
  </div>
);

// Component con: Mục Why PetGo
const WhyItem = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center text-center group">
    <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center text-orange-500 mb-6 group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm group-hover:shadow-orange-200">
      {icon}
    </div>
    <h4 className="text-lg font-black text-gray-900 mb-2 uppercase tracking-tight">{title}</h4>
    <p className="text-sm font-medium text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

// Component con: Nhóm Footer
const FooterGroup = ({ title, links }) => (
  <div className="space-y-6">
    <h5 className="text-sm font-black text-gray-900 uppercase tracking-widest">{title}</h5>
    <ul className="space-y-4">
      {links.map((link, i) => (
        <li key={i}>
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-orange-600 transition-colors">{link}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default HomePage;