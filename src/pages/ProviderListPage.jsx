import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  Heart, 
  ChevronRight, 
  Filter, 
  ChevronDown, 
  LayoutGrid, 
  List, 
  PawPrint, 
  User, 
  Calendar,
  ArrowUpDown,
  Maximize2,
  ChevronLeft
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [favorites, setFavorites] = useState([1]);

  // Mock data cho danh sách nhà cung cấp
  const providers = [
    {
      id: 1,
      name: "Paws & Relax Luxury Spa",
      type: "Spa & Grooming",
      rating: 4.9,
      reviews: 156,
      address: "Quận 1, TP. Hồ Chí Minh",
      priceFrom: "250.000",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=600",
      isHot: true
    },
    {
      id: 2,
      name: "Happy Tails Veterinary Clinic",
      type: "Clinic",
      rating: 4.8,
      reviews: 92,
      address: "Quận 7, TP. Hồ Chí Minh",
      priceFrom: "150.000",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=600",
      isHot: false
    },
    {
      id: 3,
      name: "Pet Paradise Resort",
      type: "Pet Hotel",
      rating: 4.7,
      reviews: 210,
      address: "Quận Bình Thạnh, TP. HCM",
      priceFrom: "400.000",
      image: "https://images.unsplash.com/photo-1591768793355-74d7ca738055?auto=format&fit=crop&q=80&w=600",
      isHot: false
    },
    {
      id: 4,
      name: "Fluffy Friends Grooming",
      type: "Spa & Grooming",
      rating: 4.6,
      reviews: 64,
      address: "Quận 2, TP. Hồ Chí Minh",
      priceFrom: "200.000",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&q=80&w=600",
      isHot: false
    },
    {
      id: 5,
      name: "The Vet Station",
      type: "Clinic",
      rating: 5.0,
      reviews: 42,
      address: "Quận Hoàn Kiếm, Hà Nội",
      priceFrom: "300.000",
      image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=600",
      isHot: true
    },
    {
      id: 6,
      name: "Cozy Cat Hotel & Spa",
      type: "Pet Hotel",
      rating: 4.5,
      reviews: 78,
      address: "Quận Ba Đình, Hà Nội",
      priceFrom: "220.000",
      image: "https://images.unsplash.com/photo-1548546738-8509cb246ed3?auto=format&fit=crop&q=80&w=600",
      isHot: false
    }
  ];

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex justify-between items-center">
          {/* Logo PetGo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
            <div className="bg-orange-500 p-2 rounded-xl shadow-lg shadow-orange-200">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tight">Pet<span className="text-orange-500">Go</span></span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
              <form onSubmit={(e) => { e.preventDefault(); window.location.href = '/search'; }}>
                <input 
                  type="text" 
                  placeholder="Tìm spa, thú y, dịch vụ..." 
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-orange-500/20 transition-all outline-none text-sm font-medium"
                />
              </form>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-gray-500">
            <a href="/" className="hover:text-orange-600 transition-colors">Home</a>
            <a href="/search" className="text-orange-600">Services</a>
            <a href="/my-bookings" className="hover:text-orange-600 transition-colors">My Booking</a>
            <div className="flex items-center gap-3 cursor-pointer pl-4 border-l border-gray-200" onClick={() => window.location.href = '/profile'}>
              <div className="w-9 h-9 rounded-full bg-orange-100 border-2 border-white shadow-sm flex items-center justify-center">
                <User className="w-4 h-4 text-orange-600" />
              </div>
              <span className="text-gray-900 font-black text-xs uppercase tracking-widest">Profile</span>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 bg-orange-50/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-orange-100 rounded-full mb-6 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">Premium Providers</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
            Find the best <span className="text-orange-500">pet care</span> services
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Khám phá hàng trăm địa điểm chăm sóc thú cưng uy tín nhất, được đánh giá bởi cộng đồng PetGo.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <div className="sticky top-16 sm:top-20 z-40 bg-white border-b border-gray-100 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Quick Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide no-scrollbar">
              <FilterButton label="Khu vực" />
              <FilterButton label="Loại dịch vụ" />
              <FilterButton label="Đánh giá" />
              <FilterButton label="Khoảng giá" />
              <div className="h-8 w-px bg-gray-100 mx-2 hidden lg:block"></div>
              <button className="p-2 bg-gray-100 rounded-xl hover:bg-orange-500 hover:text-white transition-all">
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </div>

            {/* View Switch & Stats */}
            <div className="flex items-center justify-between sm:justify-end gap-6">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                {providers.length} kết quả
              </span>
              <div className="flex bg-gray-100 p-1 rounded-xl">
                <button className="p-2 bg-white text-orange-600 rounded-lg shadow-sm"><LayoutGrid className="w-4 h-4" /></button>
                <button className="p-2 text-gray-400 hover:text-gray-600"><List className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Providers Grid */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {providers.map((provider) => (
            <ProviderCard 
              key={provider.id} 
              provider={provider} 
              isFavorite={favorites.includes(provider.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-20 flex justify-center items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-white hover:shadow-md transition-all disabled:opacity-30" disabled>
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {[1, 2, 3].map((page) => (
            <button 
              key={page}
              onClick={() => setActivePage(page)}
              className={`w-10 h-10 rounded-xl font-black text-sm transition-all ${
                activePage === page 
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-200 scale-110' 
                  : 'bg-white border border-gray-100 text-gray-500 hover:border-orange-200 hover:text-orange-500 shadow-sm'
              }`}
            >
              {page}
            </button>
          ))}
          
          <span className="text-gray-300 font-bold mx-1">...</span>
          
          <button className="w-10 h-10 rounded-xl bg-white border border-gray-100 text-gray-500 font-bold text-sm hover:border-orange-200 shadow-sm">
            12
          </button>
          
          <button className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-white hover:shadow-md hover:text-orange-500 transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-6">
            <PawPrint className="w-6 h-6 text-orange-500" />
            <span className="text-xl font-black text-gray-900 tracking-tight">Pet<span className="text-orange-500">Go</span></span>
          </div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest leading-loose">
            © 2025 PetGo Marketplace. Made with love for your pets.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Sub-component: Filter Button
const FilterButton = ({ label }) => (
  <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-[1rem] text-xs font-black text-gray-600 uppercase tracking-widest hover:border-orange-300 hover:text-orange-600 transition-all shadow-sm active:scale-95 whitespace-nowrap">
    {label}
    <ChevronDown className="w-4 h-4 text-gray-300" />
  </button>
);

// Sub-component: Provider Card
const ProviderCard = ({ provider, isFavorite, onToggleFavorite }) => {
  return (
    <div className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full relative">
      {/* Badge Hot */}
      {provider.isHot && (
        <div className="absolute top-5 left-5 z-10 px-4 py-1.5 bg-red-500 text-white text-[10px] font-black uppercase rounded-full tracking-widest shadow-lg animate-pulse">
          Hot Choice
        </div>
      )}

      {/* Image Area */}
      <div className="relative h-60 sm:h-64 overflow-hidden">
        <img 
          src={provider.image} 
          alt={provider.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Top Buttons */}
        <div className="absolute top-5 right-5 flex flex-col gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(provider.id); }}
            className={`p-2.5 backdrop-blur-md rounded-2xl transition-all shadow-lg ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white'}`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button 
            onClick={() => window.location.href = '/compare'}
            className="p-2.5 bg-white/80 backdrop-blur-md rounded-2xl text-gray-400 hover:text-orange-600 hover:bg-white transition-all shadow-lg"
            title="So sánh"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-3 py-1.5 rounded-xl uppercase tracking-widest">
            {provider.type}
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-50 rounded-xl">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-xs font-black text-yellow-700">{provider.rating}</span>
          </div>
        </div>

        <h3 className="text-2xl font-black text-gray-900 mb-2 leading-tight group-hover:text-orange-600 transition-colors">
          {provider.name}
        </h3>
        
        <p className="text-xs font-bold text-gray-400 mb-6 italic">
          ({provider.reviews} lượt đánh giá thực tế)
        </p>

        <div className="flex items-start gap-3 text-sm text-gray-500 mb-8 bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
          <span className="line-clamp-2 leading-relaxed font-medium">{provider.address}</span>
        </div>

        {/* Footer of Card */}
        <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-300 font-black uppercase tracking-widest mb-1 block">Giá từ</span>
            <span className="text-2xl font-black text-gray-900 leading-none">
              {provider.priceFrom}<span className="text-sm font-bold ml-0.5">đ</span>
            </span>
          </div>
          <button 
            onClick={() => window.location.href = '/providers/1'}
            className="px-8 py-4 bg-gray-900 text-white text-xs font-black rounded-2xl hover:bg-orange-500 hover:shadow-xl hover:shadow-orange-100 transition-all uppercase tracking-widest"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;