import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  Heart, 
  ChevronDown, 
  PawPrint, 
  User, 
  SlidersHorizontal,
  Navigation,
  Clock,
  Maximize2,
  LayoutGrid,
  List,
  Info,
  X,
  Menu
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Dữ liệu mẫu
  const allProviders = [
    {
      id: 1,
      name: "Paws & Relax Luxury Spa",
      featuredService: "Tắm & Cắt tỉa",
      rating: 4.8,
      address: "Quận 1, TP. Hồ Chí Minh",
      price: "200.000",
      distance: "1.2 km",
      slots: ["10:00", "14:00"],
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 2,
      name: "Happy Tails Clinic",
      featuredService: "Khám tổng quát",
      rating: 4.9,
      address: "Quận 7, TP. Hồ Chí Minh",
      price: "150.000",
      distance: "5.4 km",
      slots: ["09:00", "11:00", "16:00"],
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 3,
      name: "Pet Paradise Resort",
      featuredService: "Khách sạn thú cưng",
      rating: 4.7,
      address: "Quận Bình Thạnh, TP. HCM",
      price: "350.000",
      distance: "3.1 km",
      slots: ["Full"],
      image: "https://images.unsplash.com/photo-1591768793355-74d7ca738055?auto=format&fit=crop&q=80&w=400"
    }
  ];

  useEffect(() => {
    setResults(allProviders);
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsSearching(true);
    
    // Giả lập delay tìm kiếm
    setTimeout(() => {
      if (query.trim() === "") {
        setResults(allProviders);
      } else {
        const filtered = allProviders.filter(p => 
          p.name.toLowerCase().includes(query.toLowerCase()) || 
          p.featuredService.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
      }
      setIsSearching(false);
    }, 400);
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Header PetGo */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
            <div className="bg-orange-500 p-2 rounded-xl">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tight">Pet<span className="text-orange-500">Go</span></span>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-gray-500">
            <a href="/" className="hover:text-orange-600 transition-colors">Home</a>
            <a href="/search" className="text-orange-600">Services</a>
            <a href="/my-bookings" className="hover:text-orange-600 transition-colors">My Booking</a>
            <div className="w-9 h-9 rounded-full bg-orange-100 border-2 border-white shadow-sm flex items-center justify-center">
              <User className="w-4 h-4 text-orange-600" />
            </div>
          </nav>

          <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Large Search Section */}
      <section className="bg-white border-b border-gray-100 py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-8 tracking-tight">Tìm dịch vụ hoàn hảo cho thú cưng</h1>
          <div className="relative group max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="w-6 h-6 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
            </div>
            <input 
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by provider name or service"
              className="w-full pl-16 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-[2.5rem] text-lg font-bold focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-50 transition-all outline-none shadow-inner"
            />
            {isSearching && (
              <div className="absolute right-6 top-1/2 -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-orange-500 border-t-transparent"></div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar Filters */}
          <aside className="lg:w-72 shrink-0 space-y-8">
            <div className="flex items-center justify-between lg:justify-start gap-2 mb-2">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-orange-500" /> Bộ lọc nâng cao
              </h3>
              <button className="lg:hidden text-xs font-bold text-orange-600">Xóa tất cả</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              <FilterGroup label="Vị trí">
                <select className="w-full p-3.5 bg-white border border-gray-200 rounded-2xl text-sm font-bold outline-none focus:border-orange-500 shadow-sm">
                  <option>Tất cả khu vực</option>
                  <option>Quận 1</option>
                  <option>Quận 7</option>
                  <option>Quận Bình Thạnh</option>
                </select>
              </FilterGroup>

              <FilterGroup label="Loại dịch vụ">
                <div className="space-y-3">
                  {['Spa & Grooming', 'Clinic', 'Pet Hotel', 'Training'].map(item => (
                    <label key={item} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input type="checkbox" className="peer w-5 h-5 rounded-lg border-2 border-gray-200 text-orange-500 focus:ring-0 cursor-pointer transition-all" />
                      </div>
                      <span className="text-sm font-bold text-gray-500 group-hover:text-gray-900 transition-colors">{item}</span>
                    </label>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup label="Khoảng giá">
                 <div className="flex items-center gap-3">
                   <input type="number" placeholder="Min" className="w-full p-3 bg-gray-50 border-none rounded-xl text-xs font-bold outline-none" />
                   <div className="w-2 h-0.5 bg-gray-200"></div>
                   <input type="number" placeholder="Max" className="w-full p-3 bg-gray-50 border-none rounded-xl text-xs font-bold outline-none" />
                 </div>
              </FilterGroup>

              <FilterGroup label="Đánh giá">
                {[5, 4, 3].map(star => (
                  <label key={star} className="flex items-center gap-3 cursor-pointer mb-3 last:mb-0 group">
                    <input type="radio" name="rating" className="w-4 h-4 text-orange-500 focus:ring-0 cursor-pointer" />
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                      <span className="text-xs font-bold text-gray-500 group-hover:text-gray-900">{star}.0 trở lên</span>
                    </div>
                  </label>
                ))}
              </FilterGroup>

              <FilterGroup label="Khoảng cách">
                 <select className="w-full p-3.5 bg-white border border-gray-200 rounded-2xl text-sm font-bold outline-none">
                    <option>Dưới 2 km</option>
                    <option>Dưới 5 km</option>
                    <option>Dưới 10 km</option>
                 </select>
              </FilterGroup>

              <FilterGroup label="Khung giờ còn trống">
                 <div className="flex flex-wrap gap-2">
                    {['Sáng', 'Trưa', 'Chiều', 'Tối'].map(t => (
                      <button key={t} className="px-3 py-1.5 bg-gray-50 border border-transparent rounded-lg text-[10px] font-black uppercase hover:border-orange-200 hover:bg-white transition-all">
                        {t}
                      </button>
                    ))}
                 </div>
              </FilterGroup>
            </div>
          </aside>

          {/* Results Area */}
          <div className="flex-1">
            {/* Sort Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h2 className="text-xl font-black text-gray-900">
                {results.length > 0 ? `${results.length} kết quả phù hợp` : "Kết quả tìm kiếm"}
              </h2>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Sắp xếp:</span>
                  <select className="text-xs font-black bg-transparent outline-none cursor-pointer">
                    <option>Gần nhất</option>
                    <option>Giá thấp nhất</option>
                    <option>Đánh giá cao nhất</option>
                    <option>Nổi bật nhất</option>
                  </select>
                </div>
                <div className="hidden sm:flex bg-gray-100 p-1 rounded-xl">
                  <button className="p-1.5 bg-white text-orange-600 rounded-lg shadow-sm"><List className="w-4 h-4" /></button>
                  <button className="p-1.5 text-gray-400 hover:text-gray-600"><LayoutGrid className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            {/* List Results */}
            {results.length > 0 ? (
              <div className="space-y-6">
                {results.map((item) => (
                  <div key={item.id} className="group bg-white rounded-[2.5rem] p-5 flex flex-col sm:flex-row gap-6 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500">
                    <div className="sm:w-52 sm:h-52 shrink-0 overflow-hidden rounded-[2rem] relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button 
                          onClick={() => toggleFavorite(item.id)}
                          className={`p-2.5 backdrop-blur-md rounded-xl transition-all ${favorites.includes(item.id) ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-400 hover:text-red-500'}`}
                         >
                           <Heart className={`w-4 h-4 ${favorites.includes(item.id) ? 'fill-current' : ''}`} />
                         </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col flex-1 py-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-3 py-1 rounded-lg uppercase tracking-wider mb-2 inline-block">
                            {item.featuredService}
                          </span>
                          <h4 className="text-2xl font-black text-gray-900 group-hover:text-orange-600 transition-colors leading-tight">
                            {item.name}
                          </h4>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 rounded-xl">
                          <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                          <span className="text-xs font-black text-yellow-700">{item.rating}</span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                          <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                          <span className="line-clamp-1">{item.address}</span>
                        </div>
                        <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-gray-400">
                           <div className="flex items-center gap-1.5 text-blue-500">
                             <Navigation className="w-3.5 h-3.5" /> <span>Cách bạn {item.distance}</span>
                           </div>
                           <div className="flex items-center gap-1.5 text-green-500">
                             <Clock className="w-3.5 h-3.5" /> <span>Trống: {item.slots.join(", ")}</span>
                           </div>
                        </div>
                      </div>

                      <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-5">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Giá từ</span>
                          <span className="text-2xl font-black text-gray-900">{item.price}<span className="text-sm font-bold ml-0.5">đ</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                           <button 
                            onClick={() => window.location.href = '/compare'}
                            className="p-3 bg-gray-50 text-gray-400 hover:text-orange-500 rounded-2xl transition-all"
                            title="So sánh"
                           >
                             <Maximize2 className="w-5 h-5" />
                           </button>
                           <button 
                            onClick={() => window.location.href = '/providers/1'}
                            className="bg-gray-900 px-8 py-3.5 rounded-2xl text-xs font-black text-white hover:bg-orange-500 transition-all shadow-lg shadow-gray-200 uppercase tracking-widest"
                           >
                             Details
                           </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-[3rem] py-20 px-8 text-center flex flex-col items-center border border-dashed border-gray-200">
                <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-8">
                  <Search className="w-10 h-10 text-orange-300" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Rất tiếc, không tìm thấy kết quả!</h3>
                <p className="text-gray-500 max-w-sm mb-10 font-medium leading-relaxed">
                  Chúng tôi không tìm thấy dịch vụ phù hợp với từ khóa này. Thử xóa bớt bộ lọc hoặc tìm kiếm theo khu vực khác nhé.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => {setSearchQuery(""); setResults(allProviders);}}
                    className="px-10 py-4 bg-orange-500 text-white font-black rounded-2xl hover:bg-orange-600 shadow-xl shadow-orange-100 transition-all active:scale-95 uppercase tracking-widest text-xs"
                  >
                    Xóa tất cả bộ lọc
                  </button>
                  <button 
                    onClick={() => window.location.href = '/nearby'}
                    className="px-10 py-4 bg-white border-2 border-gray-100 text-gray-900 font-black rounded-2xl hover:border-orange-500 transition-all uppercase tracking-widest text-xs"
                  >
                    View nearby
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="bg-white border-t border-gray-100 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6">
           <div className="flex items-center gap-2">
             <PawPrint className="w-6 h-6 text-orange-500" />
             <span className="text-xl font-black text-gray-900">Pet<span className="text-orange-500">Go</span></span>
           </div>
           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Dịch vụ tin cậy • Đặt lịch nhanh chóng • Thanh toán an toàn</p>
        </div>
      </footer>
    </div>
  );
};

// Component con: Group Filter
const FilterGroup = ({ label, children }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-5">
      {label}
    </label>
    {children}
  </div>
);

export default App;