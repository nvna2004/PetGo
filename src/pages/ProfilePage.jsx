import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Heart, 
  Calendar,
  PawPrint,
  ShieldCheck,
  CreditCard,
  Bell,
  ArrowLeft,
  Clock,
  ExternalLink
} from 'lucide-react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [user, setUser] = useState({
    name: "Nguyễn Văn A",
    email: "vana@example.com",
    phone: "090 123 4567",
    address: "Quận 1, TP. Hồ Chí Minh",
    joinDate: "Tháng 1, 2024",
    avatar: "https://i.pravatar.cc/150?img=12",
    cover: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=1200",
  });

  const [editData, setEditData] = useState({ ...user });

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setUser({ ...editData });
      setIsSaving(false);
      setIsEditModalOpen(false);
    }, 1500);
  };

  const pets = [
    {
      id: 1,
      name: "Mochi",
      type: "Golden Retriever",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200",
      age: "2 tuổi"
    },
    {
      id: 2,
      name: "Luna",
      type: "British Shorthair",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200",
      age: "1 tuổi"
    }
  ];

  const serviceHistory = [
    {
      id: 1,
      service: "Paws & Relax Spa",
      type: "Grooming & Spa",
      date: "12 Tháng 3, 2024",
      price: "250.000",
      status: "Hoàn thành",
      icon: <PawPrint className="w-5 h-5" />
    },
    {
      id: 2,
      service: "Happy Tails Clinic",
      type: "Kiểm tra sức khỏe",
      date: "05 Tháng 3, 2024",
      price: "500.000",
      status: "Hoàn thành",
      icon: <ShieldCheck className="w-5 h-5" />
    },
    {
      id: 3,
      service: "Pet Paradise Resort",
      type: "Lưu trú (3 ngày)",
      date: "20 Tháng 2, 2024",
      price: "1.050.000",
      status: "Đã hủy",
      icon: <MapPin className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600 group-hover:text-orange-500" />
          </button>
          <span className="font-black text-xl tracking-tight">Profile</span>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-6">
        {/* Profile Header Card */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 overflow-hidden mb-8 border border-white">
          <div className="relative h-48 sm:h-64">
            <img 
              src={user.cover} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <button className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-2xl text-white transition-all border border-white/30">
              <Camera className="w-5 h-5" />
            </button>
          </div>

          <div className="px-8 pb-8 relative">
            <div className="flex flex-col sm:flex-row items-end gap-6 -mt-16 sm:-mt-20 mb-6">
              <div className="relative group">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-[2rem] border-4 border-white overflow-hidden shadow-2xl relative">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-orange-500 p-2.5 rounded-2xl shadow-lg border-4 border-white">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-black mb-1">{user.name}</h1>
                <p className="text-gray-500 font-bold flex items-center justify-center sm:justify-start gap-2">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  Tham gia từ {user.joinDate}
                </p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    setEditData({ ...user });
                    setIsEditModalOpen(true);
                  }}
                  className="px-6 py-3 bg-gray-900 text-white rounded-2xl font-black text-sm shadow-lg shadow-gray-200 hover:bg-orange-500 hover:shadow-orange-100 transition-all active:scale-95"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-gray-50 pt-8">
              <StatItem label="Bookings" value="12" />
              <StatItem label="Reviews" value="08" />
              <StatItem label="Pets" value="02" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1 space-y-4">
            <TabButton 
              active={activeTab === 'personal'} 
              onClick={() => setActiveTab('personal')}
              icon={<User className="w-5 h-5" />}
              label="Thông tin cá nhân"
            />
            <TabButton 
              active={activeTab === 'pets'} 
              onClick={() => setActiveTab('pets')}
              icon={<PawPrint className="w-5 h-5" />}
              label="Thú cưng của tôi"
            />
            <TabButton 
              active={activeTab === 'history'} 
              onClick={() => setActiveTab('history')}
              icon={<Clock className="w-5 h-5" />}
              label="Lịch sử dịch vụ"
            />
            <TabButton 
              active={activeTab === 'security'} 
              onClick={() => setActiveTab('security')}
              icon={<ShieldCheck className="w-5 h-5" />}
              label="Mật khẩu & Bảo mật"
            />
            <TabButton 
              active={activeTab === 'payment'} 
              onClick={() => setActiveTab('payment')}
              icon={<CreditCard className="w-5 h-5" />}
              label="Phương thức thanh toán"
            />
            <TabButton 
              active={activeTab === 'notifications'} 
              onClick={() => setActiveTab('notifications')}
              icon={<Bell className="w-5 h-5" />}
              label="Thông báo"
            />
            <button className="w-full flex items-center gap-4 p-5 rounded-[1.5rem] text-red-500 font-black hover:bg-red-50 transition-all mt-8">
              <LogOut className="w-5 h-5" />
              Đăng xuất
            </button>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'personal' && (
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-white space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-2xl font-black">Thông tin cá nhân</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InfoField icon={<User />} label="Họ và tên" value={user.name} />
                  <InfoField icon={<Mail />} label="Email" value={user.email} />
                  <InfoField icon={<Phone />} label="Số điện thoại" value={user.phone} />
                  <InfoField icon={<MapPin />} label="Địa chỉ" value={user.address} />
                </div>
              </div>
            )}

            {activeTab === 'pets' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-2xl font-black">Thú cưng của tôi</h2>
                  <button 
                    onClick={() => navigate('/add-pet')}
                    className="px-4 py-2 bg-orange-50 text-orange-600 border border-orange-100 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all shadow-sm"
                  >
                    + Thêm mới
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {pets.map(pet => (
                    <div key={pet.id} className="bg-white p-4 rounded-[2rem] border border-gray-50 flex items-center gap-4 hover:shadow-xl hover:shadow-gray-100 transition-all group">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md">
                        <img src={pet.image} alt={pet.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-black text-lg">{pet.name}</h3>
                        <p className="text-gray-400 font-bold text-sm italic">{pet.type} • {pet.age}</p>
                      </div>
                      <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-all">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-2xl font-black px-4">Lịch sử dịch vụ</h2>
                <div className="grid grid-cols-1 gap-4">
                  {serviceHistory.map(item => (
                    <div key={item.id} className="bg-white p-6 rounded-[2.5rem] border border-gray-50 flex flex-col sm:flex-row sm:items-center gap-6 hover:shadow-xl hover:shadow-gray-100 transition-all group relative overflow-hidden">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${item.status === 'Đã hủy' ? 'bg-gray-100 text-gray-400' : 'bg-orange-100 text-orange-600'}`}>
                        {item.icon}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-black text-lg text-gray-900">{item.service}</h3>
                          <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                            item.status === 'Hoàn thành' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">{item.type}</p>
                        <div className="flex items-center gap-4 pt-2">
                          <div className="flex items-center gap-1 text-gray-500 text-sm font-medium">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {item.date}
                          </div>
                          <div className="flex items-center gap-1 text-orange-600 font-black">
                            {item.price}đ
                          </div>
                        </div>
                      </div>
                      <button className="sm:p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-all">
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Simulated empty states for other tabs */}
            {(activeTab === 'security' || activeTab === 'payment' || activeTab === 'notifications') && (
              <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-white flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-orange-50 rounded-[2rem] flex items-center justify-center mb-6">
                  <Settings className="w-10 h-10 text-orange-500 animate-spin-slow" />
                </div>
                <h3 className="text-2xl font-black mb-2">Đang phát triển</h3>
                <p className="text-gray-500 font-medium max-w-xs">Tính năng này đang được chúng tôi hoàn thiện. Vui lòng quay lại sau!</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div 
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => !isSaving && setIsEditModalOpen(false)}
          ></div>
          <div className="relative bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
            <div className="p-8 sm:p-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-black">Edit Profile</h2>
                  <p className="text-gray-400 font-bold text-sm">Cập nhật thông tin cá nhân của bạn</p>
                </div>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-6 h-6 rotate-180" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Họ và tên</label>
                    <input 
                      type="text" 
                      value={editData.name}
                      onChange={e => setEditData({ ...editData, name: e.target.value })}
                      className="w-full px-5 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-orange-500 transition-all outline-none font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                    <input 
                      type="email" 
                      value={editData.email}
                      onChange={e => setEditData({ ...editData, email: e.target.value })}
                      className="w-full px-5 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-orange-500 transition-all outline-none font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Số điện thoại</label>
                    <input 
                      type="text" 
                      value={editData.phone}
                      onChange={e => setEditData({ ...editData, phone: e.target.value })}
                      className="w-full px-5 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-orange-500 transition-all outline-none font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Địa chỉ</label>
                    <input 
                      type="text" 
                      value={editData.address}
                      onChange={e => setEditData({ ...editData, address: e.target.value })}
                      className="w-full px-5 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-orange-500 transition-all outline-none font-bold"
                    />
                  </div>
                </div>

                <div className="pt-8 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 py-4 px-6 bg-gray-100 text-gray-400 font-black rounded-2xl hover:bg-gray-200 hover:text-gray-600 transition-all active:scale-95"
                  >
                    Hủy bỏ
                  </button>
                  <button 
                    type="submit"
                    disabled={isSaving}
                    className="flex-[2] py-4 px-6 bg-gray-900 text-white font-black rounded-2xl shadow-xl shadow-gray-200 hover:bg-orange-500 hover:shadow-orange-100 transition-all active:scale-95 flex items-center justify-center gap-3"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-5 h-5 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                        Đang lưu...
                      </>
                    ) : (
                      'Lưu thay đổi'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatItem = ({ label, value }) => (
  <div className="text-center group cursor-default">
    <p className="text-2xl font-black text-gray-900 group-hover:text-orange-500 transition-colors">{value}</p>
    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{label}</p>
  </div>
);

const TabButton = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-5 rounded-[1.5rem] font-black transition-all ${
      active 
        ? 'bg-orange-500 text-white shadow-xl shadow-orange-100' 
        : 'bg-white text-gray-500 border border-gray-50 hover:bg-orange-50 hover:text-orange-600'
    }`}
  >
    <span className={active ? 'text-white' : 'text-orange-500'}>{icon}</span>
    {label}
  </button>
);

const InfoField = ({ icon, label, value }) => (
  <div className="space-y-1.5 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-orange-100 hover:bg-white transition-all group">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
      <span className="text-orange-500">{React.cloneElement(icon, { size: 12 })}</span>
      {label}
    </label>
    <p className="font-black text-gray-900">{value}</p>
  </div>
);

export default ProfilePage;
