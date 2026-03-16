import React, { useState } from 'react';
import { 
  Heart, 
  MapPin, 
  Star, 
  Trash2, 
  Calendar, 
  ChevronRight, 
  Search, 
  PawPrint, 
  User,
  ArrowRight,
  Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Paws & Relax Luxury Spa",
      rating: 4.8,
      reviews: 156,
      address: "Quận 1, TP. Hồ Chí Minh",
      priceFrom: "200.000",
      featuredService: "Tắm & Cắt tỉa",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 2,
      name: "Happy Tails Clinic",
      rating: 4.9,
      reviews: 92,
      address: "Quận 7, TP. Hồ Chí Minh",
      priceFrom: "150.000",
      featuredService: "Khám tổng quát",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400"
    }
  ]);

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-20">
      {/* Header PetGo */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-orange-500 p-1.5 rounded-lg shadow-lg shadow-orange-100">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tight">Pet<span className="text-orange-500">Go</span></span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-500">
            <a href="/" className="hover:text-orange-600 transition-colors">Home</a>
            <a href="/search" className="hover:text-orange-600 transition-colors">Services</a>
            <a href="/my-bookings" className="hover:text-orange-600 transition-colors">My Booking</a>
            <a href="/favorites" className="text-orange-600">Favorites</a>
            <div className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center shadow-sm" onClick={() => navigate('/profile')}>
                <User className="w-5 h-5 text-orange-600" />
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">My Favorites</h1>
            <p className="text-gray-500 font-medium italic">Lưu giữ những địa điểm chăm sóc thú cưng tuyệt vời nhất của bạn.</p>
          </div>
          {favorites.length > 0 && (
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-gray-100">
              {favorites.length} địa điểm đã lưu
            </p>
          )}
        </div>

        {/* Favorites Grid */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {favorites.map((item) => (
              <div key={item.id} className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col sm:flex-row">
                {/* Image Section */}
                <div className="sm:w-56 h-56 sm:h-auto overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <button 
                    onClick={() => removeFavorite(item.id)}
                    className="absolute top-4 left-4 p-2.5 bg-white/90 backdrop-blur-md rounded-2xl text-red-500 shadow-lg hover:bg-red-500 hover:text-white transition-all"
                    title="Xóa khỏi yêu thích"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Content Section */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-3 py-1 rounded-lg uppercase tracking-wider">
                      {item.featuredService}
                    </span>
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-yellow-50 rounded-lg">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                      <span className="text-xs font-black text-yellow-700">{item.rating}</span>
                    </div>
                  </div>

                  <h3 
                    onClick={() => navigate(`/providers/${item.id}`)}
                    className="text-xl font-black text-gray-900 mb-2 leading-tight hover:text-orange-600 transition-colors cursor-pointer"
                  >
                    {item.name}
                  </h3>

                  <div className="flex items-start gap-2 text-sm text-gray-500 mb-6 leading-relaxed">
                    <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{item.address}</span>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-0.5 block">Giá từ</span>
                      <span className="text-xl font-black text-gray-900">{item.priceFrom}<span className="text-sm font-bold ml-0.5">đ</span></span>
                    </div>
                    <div className="flex gap-2 flex-1 justify-end">
                      <button 
                        onClick={() => navigate(`/providers/${item.id}`)}
                        className="px-5 py-3 bg-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest text-[10px]"
                      >
                        Details
                      </button>
                      <button 
                        onClick={() => navigate(`/booking?providerId=${item.id}`)}
                        className="px-6 py-3 bg-gray-900 text-white font-black rounded-2xl shadow-lg hover:bg-orange-500 transition-all uppercase tracking-widest text-[10px] flex items-center gap-2"
                      >
                        Book Now <Calendar className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-[3rem] p-20 text-center border border-dashed border-gray-200 flex flex-col items-center animate-in fade-in zoom-in duration-500">
             <div className="w-32 h-32 bg-orange-50 rounded-full flex items-center justify-center mb-8 relative">
               <Heart className="w-14 h-14 text-orange-200" />
               <div className="absolute -top-2 -right-2 bg-white p-3 rounded-full shadow-lg">
                 <Search className="w-6 h-6 text-orange-500" />
               </div>
             </div>
             <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Chưa có địa điểm yêu thích</h3>
             <p className="text-gray-400 font-medium max-w-sm mb-10 leading-relaxed">
               Có vẻ như bạn chưa lưu bất kỳ spa hay phòng khám nào. Hãy khám phá ngay để tìm nơi tốt nhất cho thú cưng của bạn!
             </p>
             <button 
              onClick={() => navigate('/search')}
              className="px-10 py-5 bg-orange-500 text-white font-black rounded-2xl shadow-xl shadow-orange-100 uppercase tracking-widest text-xs flex items-center gap-3 hover:scale-105 transition-all"
             >
               Explore Services <ArrowRight className="w-4 h-4" />
             </button>
          </div>
        )}

        {/* Tip Section */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between p-10 bg-gray-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-10 opacity-10">
              <PawPrint className="w-48 h-48 rotate-12" />
           </div>
           <div className="relative z-10 text-center md:text-left">
              <h4 className="text-2xl font-black mb-2 italic flex items-center justify-center md:justify-start gap-3">
                <Info className="w-6 h-6 text-orange-500" /> Bạn có biết?
              </h4>
              <p className="text-gray-400 font-medium max-w-lg">
                Việc lưu các dịch vụ yêu thích giúp bạn dễ dàng so sánh giá cả và đặt lịch nhanh hơn trong những lần chăm sóc định kỳ cho bé.
              </p>
           </div>
           <button 
            onClick={() => navigate('/search')}
            className="relative z-10 mt-8 md:mt-0 px-8 py-4 bg-white text-gray-900 font-black rounded-2xl hover:bg-orange-500 hover:text-white transition-all uppercase tracking-widest text-[10px]"
           >
              Tìm thêm dịch vụ
           </button>
        </div>
      </main>

      {/* Footer Basic */}
      <footer className="mt-20 py-12 border-t border-gray-100 text-center">
         <div className="flex justify-center items-center gap-2 mb-4">
           <PawPrint className="w-6 h-6 text-orange-500" />
           <span className="text-xl font-black text-gray-900">Pet<span className="text-orange-500">Go</span></span>
         </div>
         <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">© 2025 PetGo Marketplace. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FavoritesPage;