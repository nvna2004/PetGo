import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Star,
  Menu,
  X,
  User,
  PawPrint,
  Heart,
  SlidersHorizontal,
  Navigation
} from 'lucide-react';

const SearchFilterPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const allProviders = [
    {
      id: 1,
      name: "Paws & Relax Spa",
      featuredService: "Tắm & Cắt tỉa",
      rating: 4.8,
      address: "Quận 1, TP. Hồ Chí Minh",
      price: "200.000",
      distance: "1.2 km",
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
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400"
    }
  ];

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsSearching(true);

    setTimeout(() => {
      if (query.trim() === "") {
        setResults(allProviders);
      } else {
        const filtered = allProviders.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.featuredService.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
      }
      setIsSearching(false);
    }, 300);
  };

  useEffect(() => {
    setResults(allProviders);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center gap-2">
              <div className="bg-orange-500 p-2 rounded-xl">
                <PawPrint className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-gray-900">
                Pet<span className="text-orange-500">Go</span>
              </span>
            </div>

            <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold">
              <Link to="/" className="text-gray-600 hover:text-orange-600">Home</Link>
              <Link to="/search" className="text-orange-600">Services</Link>
              <Link to="/my-bookings" className="text-gray-600 hover:text-orange-600">My Booking</Link>
              <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
                <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center">
                  <User className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-gray-700">Profile</span>
              </div>
            </nav>

            <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <section className="bg-white border-b border-gray-100 py-8 shadow-sm">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="w-6 h-6 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by provider name or service"
              className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-[2rem] text-lg font-medium focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-50/50 transition-all outline-none shadow-inner"
            />
            {isSearching && (
              <div className="absolute right-5 top-1/2 -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-orange-500 border-t-transparent"></div>
              </div>
            )}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-72 shrink-0 space-y-8">
            <div>
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-orange-500" /> Bộ lọc nâng cao
              </h3>

              <div className="space-y-6">
                <FilterGroup label="Vị trí">
                  <select className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-orange-500">
                    <option>Tất cả khu vực</option>
                    <option>Quận 1</option>
                    <option>Quận 7</option>
                    <option>Quận Bình Thạnh</option>
                  </select>
                </FilterGroup>

                <FilterGroup label="Loại dịch vụ">
                  <div className="space-y-2">
                    {['Spa & Grooming', 'Clinic', 'Pet Hotel', 'Training'].map(item => (
                      <label key={item} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer" />
                        <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">{item}</span>
                      </label>
                    ))}
                  </div>
                </FilterGroup>

                <FilterGroup label="Khoảng giá">
                  <div className="flex items-center gap-2">
                    <input type="text" placeholder="Min" className="w-full p-2.5 border border-gray-200 rounded-lg text-xs" />
                    <span className="text-gray-400">-</span>
                    <input type="text" placeholder="Max" className="w-full p-2.5 border border-gray-200 rounded-lg text-xs" />
                  </div>
                </FilterGroup>

                <FilterGroup label="Đánh giá">
                  {[5, 4, 3].map(star => (
                    <label key={star} className="flex items-center gap-3 cursor-pointer mb-2">
                      <input type="radio" name="rating" className="w-4 h-4 text-orange-500 focus:ring-orange-500" />
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-600">{star}.0 trở lên</span>
                      </div>
                    </label>
                  ))}
                </FilterGroup>
              </div>
            </div>
          </aside>

          <section className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-gray-900">
                {results.length > 0 ? `${results.length} kết quả phù hợp` : "Kết quả tìm kiếm"}
              </h2>

              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Sắp xếp:</span>
                  <select className="text-sm font-bold bg-transparent outline-none cursor-pointer">
                    <option>Gần nhất</option>
                    <option>Giá thấp nhất</option>
                    <option>Đánh giá cao nhất</option>
                    <option>Nổi bật nhất</option>
                  </select>
                </div>
                <button className="lg:hidden p-2 bg-orange-500 text-white rounded-xl shadow-lg">
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((item) => (
                  <div key={item.id} className="group bg-white rounded-3xl p-4 flex gap-5 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0 overflow-hidden rounded-2xl relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <button className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-lg text-gray-400 hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-col flex-1 py-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-black text-gray-900 group-hover:text-orange-600 transition-colors leading-tight">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-yellow-50 rounded-md">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-[10px] font-black text-yellow-700">{item.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider">{item.featuredService}</span>
                      </div>

                      <div className="space-y-1.5 mb-4">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span className="line-clamp-1">{item.address}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <Navigation className="w-3.5 h-3.5 shrink-0 text-blue-400" />
                          <span>Cách bạn {item.distance}</span>
                        </div>
                      </div>

                      <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-3">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black text-gray-300 uppercase">Chỉ từ</span>
                          <span className="text-base font-black text-gray-900">{item.price}đ</span>
                        </div>
                        <button
                          onClick={() => navigate(`/providers/${item.id}`)}
                          className="bg-gray-100 px-4 py-2 rounded-xl text-xs font-black text-gray-600 hover:bg-orange-500 hover:text-white transition-all shadow-sm"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[3rem] p-12 text-center flex flex-col items-center border border-dashed border-gray-200">
                <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6">
                  <Search className="w-10 h-10 text-orange-300" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">Rất tiếc, không tìm thấy kết quả!</h3>
                <p className="text-gray-500 max-w-sm mb-8 font-medium">
                  Thử thay đổi từ khóa tìm kiếm hoặc điều chỉnh lại bộ lọc để tìm thấy các dịch vụ chăm sóc thú cưng phù hợp.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-8 py-3 bg-orange-500 text-white font-black rounded-2xl hover:bg-orange-600 shadow-lg shadow-orange-100 transition-all active:scale-95"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

const FilterGroup = ({ label, children }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
      {label}
    </label>
    {children}
  </div>
);

export default SearchFilterPage;