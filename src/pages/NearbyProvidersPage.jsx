import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  Navigation, 
  ChevronDown, 
  ArrowLeft, 
  PawPrint, 
  User, 
  SlidersHorizontal,
  Maximize2,
  Heart,
  Info,
  Clock,
  Navigation2
} from 'lucide-react';

const NearbyProvidersPage = () => {
  const [sortBy, setSortBy] = useState('nearest');
  const [searchQuery, setSearchQuery] = useState("");

  // Dữ liệu mẫu nhà cung cấp gần đây
  const nearbyProviders = [
    {
      id: 1,
      name: "Paws & Relax Luxury Spa",
      distance: "0.8 km",
      rating: 4.9,
      reviews: 156,
      priceFrom: "200.000",
      featuredService: "Tắm & Cắt tỉa",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400",
      coords: { x: '30%', y: '40%' }
    },
    {
      id: 2,
      name: "Happy Tails Clinic",
      distance: "1.2 km",
      rating: 4.8,
      reviews: 92,
      priceFrom: "150.000",
      featuredService: "Khám tổng quát",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400",
      coords: { x: '55%', y: '25%' }
    },
    {
      id: 3,
      name: "Pet Paradise Resort",
      distance: "2.5 km",
      rating: 4.7,
      reviews: 210,
      priceFrom: "350.000",
      featuredService: "Khách sạn thú cưng",
      image: "https://images.unsplash.com/photo-1591768793355-74d7ca738055?auto=format&fit=crop&q=80&w=400",
      coords: { x: '70%', y: '60%' }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col h-screen">
      {/* Header PetGo */}
      <header className="bg-white border-b border-gray-100 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <button 
                onClick={() => window.location.href = '/search'}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
             >
               <ArrowLeft className="w-5 h-5" />
             </button>
             <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
               <div className="bg-orange-500 p-1.5 rounded-lg">
                 <PawPrint className="w-5 h-5 text-white" />
               </div>
               <span className="text-xl font-black text-gray-900 tracking-tight">Pet<span className="text-orange-500">Go</span></span>
             </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-500" />
              <input 
                type="text" 
                placeholder="Tìm dịch vụ gần bạn..." 
                className="w-full pl-11 pr-4 py-2.5 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-orange-500/20 transition-all outline-none text-sm font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center shadow-sm">
                <User className="w-5 h-5 text-orange-600" />
             </div>
          </div>
        </div>
      </header>

      {/* Main Container: Map + List */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Side: List Results */}
        <section className="w-full lg:w-[450px] bg-white border-r border-gray-100 overflow-y-auto no-scrollbar flex flex-col shadow-xl z-20">
          <div className="p-6 border-b border-gray-50">
            <h1 className="text-2xl font-black text-gray-900 mb-2">Nearby Pet Services</h1>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
              <Navigation className="w-3 h-3 text-blue-500" /> 
              <span>Vị trí hiện tại: Quận 1, TP. HCM</span>
            </div>

            {/* Quick Filters/Sort */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                <SortPill active={sortBy === 'nearest'} label="Nearest" onClick={() => setSortBy('nearest')} />
                <SortPill active={sortBy === 'rating'} label="Top Rated" onClick={() => setSortBy('rating')} />
                <SortPill active={sortBy === 'price'} label="Lowest Price" onClick={() => setSortBy('price')} />
              </div>
              <button className="flex items-center justify-center gap-2 py-2 px-4 bg-gray-50 rounded-xl border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-orange-50 hover:text-orange-600 transition-all">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Advanced Filter
              </button>
            </div>
          </div>

          {/* Results Scroll Area */}
          <div className="flex-1 p-4 space-y-4">
            {nearbyProviders.map((provider) => (
              <div 
                key={provider.id}
                className="group p-4 bg-white rounded-3xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 cursor-pointer flex gap-4"
                onClick={() => window.location.href = `/providers/${provider.id}`}
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 relative">
                  <img src={provider.image} alt={provider.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-1 right-1">
                    <button className="p-1.5 bg-white/80 backdrop-blur-sm rounded-lg text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-col flex-1 justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-black text-gray-900 group-hover:text-orange-600 transition-colors leading-tight text-sm">
                        {provider.name}
                      </h3>
                      <div className="flex items-center gap-1 px-1.5 py-0.5 bg-yellow-50 rounded-lg">
                        <Star className="w-2.5 h-2.5 text-yellow-500 fill-current" />
                        <span className="text-[10px] font-black text-yellow-700">{provider.rating}</span>
                      </div>
                    </div>
                    <p className="text-[10px] font-bold text-orange-600 uppercase tracking-wider mb-2">{provider.featuredService}</p>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400">
                      <div className="flex items-center gap-1">
                        <Navigation2 className="w-3 h-3 text-blue-400" /> {provider.distance}
                      </div>
                      <div className="flex items-center gap-1 text-green-500">
                        <Clock className="w-3 h-3" /> Đang mở
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                    <div>
                      <span className="text-[9px] font-black text-gray-300 uppercase block">Giá từ</span>
                      <span className="text-sm font-black text-gray-900">{provider.priceFrom}đ</span>
                    </div>
                    <button className="px-4 py-2 bg-gray-900 text-white text-[9px] font-black rounded-xl hover:bg-orange-500 transition-all uppercase tracking-widest">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Info Sidebar */}
          <div className="p-6 bg-orange-50 border-t border-orange-100">
             <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-orange-500 shadow-sm shrink-0">
                   <Info className="w-4 h-4" />
                </div>
                <p className="text-[10px] font-bold text-orange-800 leading-relaxed uppercase tracking-tight">
                  Tăng độ chính xác bằng cách cho phép trình duyệt truy cập vị trí GPS của bạn.
                </p>
             </div>
          </div>
        </section>

        {/* Right Side: Map Area */}
        <section className="flex-1 relative bg-gray-200">
          {/* Mock Map Background */}
          <div className="absolute inset-0 bg-[#f8f4f0] overflow-hidden">
             {/* Simple Grid/Road Pattern Visual */}
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
             
             {/* User Marker */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative">
                   <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-ping"></div>
                   <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-xl relative z-10"></div>
                </div>
             </div>

             {/* Provider Markers */}
             {nearbyProviders.map((p) => (
                <div 
                  key={p.id}
                  className="absolute cursor-pointer transition-transform hover:scale-125 z-10"
                  style={{ top: p.coords.y, left: p.coords.x }}
                  onClick={() => window.location.href = `/providers/${p.id}`}
                >
                   <div className="relative group">
                      <div className="bg-white p-1 rounded-full shadow-lg border-2 border-orange-500">
                         <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img src={p.image} className="w-full h-full object-cover" alt="marker" />
                         </div>
                      </div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-[9px] font-black py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                         {p.name} • {p.priceFrom}đ
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-3 bg-orange-500"></div>
                   </div>
                </div>
             ))}

             {/* Map Controls */}
             <div className="absolute bottom-10 right-10 flex flex-col gap-3">
                <MapControlButton icon={<Maximize2 className="w-5 h-5" />} />
                <MapControlButton icon={<Navigation className="w-5 h-5 text-blue-500" />} />
                <div className="flex flex-col bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                   <button className="p-3 hover:bg-gray-50 border-b border-gray-100 font-bold text-xl">+</button>
                   <button className="p-3 hover:bg-gray-50 font-bold text-xl">-</button>
                </div>
             </div>
          </div>
        </section>
      </main>
    </div>
  );
};

// Component con: Nút sắp xếp (Pill)
const SortPill = ({ active, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${
      active 
      ? 'bg-gray-900 text-white border-gray-900 shadow-lg' 
      : 'bg-white text-gray-400 border-gray-100 hover:border-orange-200 hover:text-orange-600'
    }`}
  >
    {label}
  </button>
);

// Component con: Nút điều khiển Map
const MapControlButton = ({ icon }) => (
  <button className="p-4 bg-white rounded-2xl shadow-xl border border-gray-100 text-gray-600 hover:text-orange-500 transition-all hover:scale-105 active:scale-95">
    {icon}
  </button>
);

export default NearbyProvidersPage;