import React, { useState } from 'react';
import { 
  Search, MapPin, Star, Heart, ChevronRight, Filter, ChevronDown, 
  LayoutGrid, List, PawPrint, User, ArrowUpDown, Maximize2, ChevronLeft,
  X, Menu
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const ProviderListPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    );
  };

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
    }
  ];

  const favoriteProviders = providers.filter(p => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">

          {/* Logo */}
          <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer">
            <PawPrint className="text-orange-500" />
            <span className="font-bold text-xl">PetGo</span>
          </div>

          {/* NAV */}
          <nav className="hidden md:flex gap-6">
            <Link to="/">Home</Link>
            <Link to="/search">Services</Link>
            <Link to="/my-bookings">My Booking</Link>
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            
            {/* Favorites */}
            <div className="relative">
              <button onClick={() => setIsFavoritesOpen(!isFavoritesOpen)}>
                <Heart className={favorites.length ? "text-red-500" : ""} />
              </button>

              {isFavoritesOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded p-4 w-64">
                  {favoriteProviders.length ? (
                    favoriteProviders.map(p => (
                      <div key={p.id} className="flex justify-between">
                        <span>{p.name}</span>
                        <button onClick={() => toggleFavorite(p.id)}>
                          <X size={14} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>No favorites</p>
                  )}
                </div>
              )}
            </div>

            {/* Profile */}
            <div onClick={() => navigate('/profile')} className="cursor-pointer">
              <User />
            </div>

            {/* Mobile */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="md:hidden p-4 space-y-2">
            <Link to="/">Home</Link>
            <Link to="/search">Services</Link>
          </div>
        )}
      </header>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {providers.map(p => (
            <ProviderCard
              key={p.id}
              provider={p}
              isFavorite={favorites.includes(p.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}

        </div>
      </main>
    </div>
  );
};

const ProviderCard = ({ provider, isFavorite, onToggleFavorite }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded shadow p-4">

      <img src={provider.image} alt="" className="w-full h-40 object-cover rounded" />

      <h3 className="font-bold mt-2">{provider.name}</h3>
      <p>{provider.address}</p>

      <div className="flex justify-between mt-3">
        <button onClick={() => onToggleFavorite(provider.id)}>
          <Heart className={isFavorite ? "text-red-500" : ""} />
        </button>

        <button onClick={() => navigate(`/providers/${provider.id}`)}>
          View
        </button>
      </div>
    </div>
  );
};

export default ProviderListPage;