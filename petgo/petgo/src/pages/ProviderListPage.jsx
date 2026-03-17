import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Star,
  ChevronDown,
  Menu,
  X,
  User,
  LayoutGrid,
  Heart,
  ChevronLeft,
  ChevronRight,
  PawPrint
} from 'lucide-react';

const ProviderListPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState(1);

  const providers = [
    {
      id: 1,
      name: "Paws & Relax Spa",
      type: "Spa & Grooming",
      rating: 4.8,
      reviews: 124,
      address: "Quận 1, TP. Hồ Chí Minh",
      priceFrom: "200.000",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400",
      isFeatured: true
    },
    {
      id: 2,
      name: "Happy Tails Clinic",
      type: "Veterinary Clinic",
      rating: 4.9,
      reviews: 89,
      address: "Quận 7, TP. Hồ Chí Minh",
      priceFrom: "150.000",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400",
      isFeatured: false
    },
    {
      id: 3,
      name: "Pet Paradise Resort",
      type: "Pet Hotel",
      rating: 4.7,
      reviews: 215,
      address: "Quận Bình Thạnh, TP. HCM",
      priceFrom: "350.000",
      image: "https://images.unsplash.com/photo-1591768793355-74d7ca738055?auto=format&fit=crop&q=80&w=400",
      isFeatured: false
    },
    {
      id: 4,
      name: "Fluffy Friends Grooming",
      type: "Spa & Grooming",
      rating: 4.6,
      reviews: 56,
      address: "Quận 2, TP. Hồ Chí Minh",
      priceFrom: "180.000",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&q=80&w=400",
      isFeatured: false
    },
    {
      id: 5,
      name: "The Vet Station",
      type: "Veterinary Clinic",
      rating: 5.0,
      reviews: 42,
      address: "Quận Hoàn Kiếm, Hà Nội",
      priceFrom: "300.000",
      image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=400",
      isFeatured: true
    },
    {
      id: 6,
      name: "Cozy Cat Hotel",
      type: "Pet Hotel",
      rating: 4.5,
      reviews: 78,
      address: "Quận Ba Đình, Hà Nội",
      priceFrom: "250.000",
      image: "https://images.unsplash.com/photo-1548546738-8509cb246ed3?auto=format&fit=crop&q=80&w=400",
      isFeatured: false
    }
  ];

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

            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm dịch vụ, spa..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-orange-500 transition-all outline-none text-sm"
                />
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold">
              <Link to="/" className="text-orange-600">Home</Link>
              <Link to="/search" className="text-gray-600 hover:text-orange-600 transition-colors">Services</Link>
              <Link to="/my-bookings" className="text-gray-600 hover:text-orange-600 transition-colors">My Booking</Link>
              <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
                <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center border-2 border-white shadow-sm">
                  <User className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-gray-700">Profile</span>
              </div>
            </nav>

            <button className="lg:hidden p-2 text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4 shadow-xl animate-in slide-in-from-top duration-300">
            <div className="relative w-full mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Tìm kiếm..." className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg outline-none" />
            </div>
            <Link to="/" className="block py-2 text-orange-600 font-bold">Home</Link>
            <Link to="/search" className="block py-2 text-gray-600 font-medium">Services</Link>
            <Link to="/my-bookings" className="block py-2 text-gray-600 font-medium">My Booking</Link>
            <a href="#" className="block py-2 text-gray-600 font-medium">Profile</a>
          </div>
        )}
      </header>

      <section className="bg-orange-50 py-12 sm:py-20 border-b border-orange-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-orange-100 rounded-full shadow-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-700">Trusted by 50k+ Pet Owners</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Find the best <span className="text-orange-500">pet care</span> services
          </h1>
          <p className="text-gray-500 max-w-xl text-lg leading-relaxed">
            Kết nối với các chuyên gia chăm sóc thú cưng hàng đầu. Đặt lịch nhanh chóng, an tâm tuyệt đối cho người bạn nhỏ.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-3 overflow-x-auto pb-4 md:pb-0 no-scrollbar">
            <FilterButton icon={<MapPin className="w-4 h-4" />} label="Khu vực" />
            <FilterButton icon={<LayoutGrid className="w-4 h-4" />} label="Loại dịch vụ" />
            <FilterButton icon={<Star className="w-4 h-4 text-yellow-500 fill-current" />} label="Đánh giá" />
            <FilterButton icon={<span className="text-xs font-bold">đ</span>} label="Khoảng giá" />
          </div>

          <div className="flex items-center gap-3">
            <div className="h-8 w-px bg-gray-200 hidden md:block mx-2"></div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sắp xếp:</span>
            <button className="flex items-center gap-2 text-sm font-bold text-gray-900 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm hover:border-orange-200 transition-all">
              Phổ biến nhất <ChevronDown className="w-4 h-4 text-orange-500" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {providers.map((provider) => (
            <ServiceCard key={provider.id} provider={provider} />
          ))}
        </div>

        <div className="mt-20 flex justify-center items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-white hover:shadow-md transition-all disabled:opacity-30" disabled>
            <ChevronLeft className="w-5 h-5" />
          </button>

          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
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

      <footer className="bg-white border-t border-gray-100 mt-24 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-gray-100 p-1.5 rounded-lg">
                <PawPrint className="w-5 h-5 text-gray-400" />
              </div>
              <span className="text-xl font-black text-gray-900">
                Pet<span className="text-orange-500">Go</span>
              </span>
            </div>
            <div className="flex gap-8 mb-8 text-sm font-medium text-gray-500">
              <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Contact Us</a>
            </div>
            <p className="text-xs text-gray-400">© 2025 PetGo Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FilterButton = ({ icon, label }) => (
  <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 whitespace-nowrap hover:border-orange-300 hover:text-orange-600 transition-all shadow-sm active:scale-95">
    <span className="text-orange-500">{icon}</span>
    {label}
    <ChevronDown className="w-4 h-4 text-gray-300" />
  </button>
);

const ServiceCard = ({ provider }) => {
  const navigate = useNavigate();

  return (
    <div className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full">
      <div className="relative h-56 overflow-hidden">
        <img
          src={provider.image}
          alt={provider.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <button className="absolute top-5 right-5 p-2.5 bg-white/90 backdrop-blur-md rounded-2xl text-gray-400 hover:text-red-500 hover:scale-110 transition-all shadow-lg">
          <Heart className="w-5 h-5" />
        </button>

        {provider.isFeatured && (
          <div className="absolute top-5 left-5 px-4 py-1.5 bg-orange-500 text-white text-[10px] font-black uppercase rounded-full tracking-widest shadow-lg animate-pulse">
            Hot Choice
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3">
          <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-3 py-1 rounded-lg uppercase tracking-wider">
            {provider.type}
          </span>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-yellow-50 rounded-lg">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
            <span className="text-xs font-black text-yellow-700">{provider.rating}</span>
          </div>
        </div>

        <h3 className="text-xl font-black text-gray-900 mb-1 leading-tight group-hover:text-orange-600 transition-colors">
          {provider.name}
        </h3>

        <p className="text-xs font-bold text-gray-400 mb-4 italic">
          {provider.reviews} lượt đánh giá thực tế
        </p>

        <div className="flex items-start gap-2 text-sm text-gray-500 mb-6 bg-gray-50 p-3 rounded-2xl">
          <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
          <span className="line-clamp-2 leading-snug font-medium">{provider.address}</span>
        </div>

        <div className="mt-auto pt-5 border-t border-gray-50 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-400 block uppercase font-black tracking-widest mb-1">Giá từ</span>
            <span className="text-xl font-black text-gray-900">
              {provider.priceFrom}<span className="text-sm font-bold ml-0.5">đ</span>
            </span>
          </div>
          <button
            onClick={() => navigate(`/providers/${provider.id}`)}
            className="px-6 py-3 bg-gray-900 text-white text-xs font-black rounded-2xl hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-200 transition-all uppercase tracking-widest"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderListPage;