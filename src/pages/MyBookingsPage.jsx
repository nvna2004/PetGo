import React, { useState } from 'react';
import { 
  PawPrint, 
  User, 
  Calendar, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  Clock4, 
  XCircle, 
  Search,
  MoreVertical,
  RotateCcw,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

const MyBookingsPage = () => {
  const [activeTab, setActiveTab] = useState('All');

  // Danh sách các tab trạng thái
  const tabs = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];

  // Dữ liệu mẫu các đơn đặt chỗ
  const bookings = [
    {
      id: 'BK001',
      provider: "Paws & Relax Luxury Spa",
      service: "Gói Tắm Thư Giãn",
      pet: "LuLu (Corgi)",
      date: "20 Tháng 5, 2025",
      time: "10:00 AM",
      price: "200.000đ",
      status: "Confirmed",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: 'BK002',
      provider: "Happy Tails Clinic",
      service: "Khám Tổng Quát",
      pet: "Mimi (Mèo Anh)",
      date: "15 Tháng 5, 2025",
      time: "02:30 PM",
      price: "150.000đ",
      status: "Completed",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: 'BK003',
      provider: "Pet Paradise Resort",
      service: "Gửi thú cưng (2 ngày)",
      pet: "LuLu (Corgi)",
      date: "22 Tháng 5, 2025",
      time: "09:00 AM",
      price: "700.000đ",
      status: "Pending",
      image: "https://images.unsplash.com/photo-1591768793355-74d7ca738055?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: 'BK004',
      provider: "The Vet Station",
      service: "Tiêm phòng định kỳ",
      pet: "Mimi (Mèo Anh)",
      date: "10 Tháng 5, 2025",
      time: "11:00 AM",
      price: "300.000đ",
      status: "Cancelled",
      image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=200"
    }
  ];

  // Logic lọc danh sách theo tab
  const filteredBookings = activeTab === 'All' 
    ? bookings 
    : bookings.filter(b => b.status === activeTab);

  // Helper render badge trạng thái
  const renderStatusBadge = (status) => {
    const styles = {
      Pending: "bg-orange-50 text-orange-600 border-orange-100",
      Confirmed: "bg-blue-50 text-blue-600 border-blue-100",
      Completed: "bg-green-50 text-green-600 border-green-100",
      Cancelled: "bg-red-50 text-red-600 border-red-100"
    };
    const icons = {
      Pending: <Clock4 className="w-3 h-3" />,
      Confirmed: <CheckCircle2 className="w-3 h-3" />,
      Completed: <CheckCircle2 className="w-3 h-3" />,
      Cancelled: <XCircle className="w-3 h-3" />
    };

    return (
      <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${styles[status]}`}>
        {icons[status]} {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Header PetGo */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
            <div className="bg-orange-500 p-1.5 rounded-lg shadow-lg shadow-orange-100">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tight">Pet<span className="text-orange-500">Go</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-500">
            <a href="/" className="hover:text-orange-600 transition-colors">Home</a>
            <a href="/search" className="hover:text-orange-600 transition-colors">Services</a>
            <a href="/my-bookings" className="text-orange-600">My Booking</a>
            <div className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center shadow-sm">
                <User className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">My Bookings</h1>
            <p className="text-gray-500 font-medium">Quản lý các lịch hẹn chăm sóc thú cưng của bạn.</p>
          </div>
          <button 
            onClick={() => window.location.href = '/search'}
            className="flex items-center gap-2 text-sm font-black text-orange-600 hover:text-orange-700 transition-colors bg-orange-50 px-5 py-3 rounded-2xl border border-orange-100"
          >
            <Search className="w-4 h-4" /> Explore Services
          </button>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-6 no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-2xl text-sm font-black transition-all whitespace-nowrap ${
                activeTab === tab 
                ? 'bg-gray-900 text-white shadow-xl scale-105' 
                : 'bg-white text-gray-400 border border-gray-100 hover:border-orange-200 hover:text-orange-600 shadow-sm'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Booking List */}
        <div className="space-y-6">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="p-6 sm:p-8">
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                        <img src={booking.image} alt={booking.provider} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-orange-600 transition-colors">
                          {booking.provider}
                        </h3>
                        <p className="text-[10px] font-black text-gray-400 tracking-widest uppercase mt-1">Booking ID: {booking.id}</p>
                      </div>
                    </div>
                    <div>
                      {renderStatusBadge(booking.status)}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Dịch vụ</p>
                          <p className="text-sm font-bold text-gray-700">{booking.service}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                          <PawPrint className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Thú cưng</p>
                          <p className="text-sm font-bold text-gray-700">{booking.pet}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Ngày hẹn</p>
                          <p className="text-sm font-bold text-gray-700">{booking.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Thời gian</p>
                          <p className="text-sm font-bold text-gray-700">{booking.time}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end justify-center">
                       <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Tổng chi phí</p>
                       <p className="text-3xl font-black text-gray-900">{booking.price}</p>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-50">
                    <button 
                      onClick={() => window.location.href = `/bookings/${booking.id}`}
                      className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-orange-600 transition-colors uppercase tracking-widest"
                    >
                       View Detail <ChevronRight className="w-4 h-4" />
                    </button>
                    
                    <div className="flex items-center gap-3">
                      {booking.status === 'Completed' ? (
                        <button 
                          onClick={() => window.location.href = `/reviews/create/${booking.id}`}
                          className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white text-[10px] font-black rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-100 uppercase tracking-widest"
                        >
                          <Star className="w-4 h-4 fill-current" /> Write Review
                        </button>
                      ) : booking.status === 'Cancelled' ? (
                        <button 
                          onClick={() => window.location.href = '/search'}
                          className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-[10px] font-black rounded-2xl hover:bg-orange-500 transition-all shadow-lg uppercase tracking-widest"
                        >
                          <RotateCcw className="w-4 h-4" /> Book Again
                        </button>
                      ) : (
                        <>
                          <button 
                            className="px-6 py-3 text-[10px] font-black text-red-500 bg-red-50 hover:bg-red-100 rounded-2xl transition-all uppercase tracking-widest"
                          >
                            Cancel
                          </button>
                          <button 
                            onClick={() => window.location.href = `/reschedule/${booking.id}`}
                            className="px-6 py-3 bg-gray-900 text-white text-[10px] font-black rounded-2xl hover:bg-orange-500 transition-all shadow-lg uppercase tracking-widest"
                          >
                            Reschedule
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="bg-white rounded-[3rem] p-16 text-center border border-dashed border-gray-200 flex flex-col items-center">
               <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                 <Calendar className="w-8 h-8 text-gray-300" />
               </div>
               <h3 className="text-xl font-black text-gray-900 mb-2 tracking-tight">Không tìm thấy lịch hẹn nào</h3>
               <p className="text-gray-400 font-medium max-w-xs mb-8">Bạn chưa có lịch hẹn nào ở trạng thái này. Hãy khám phá các dịch vụ chăm sóc thú cưng ngay!</p>
               <button 
                onClick={() => window.location.href = '/search'}
                className="px-10 py-4 bg-orange-500 text-white font-black rounded-2xl shadow-xl shadow-orange-100 uppercase tracking-widest text-[10px] flex items-center gap-2 hover:scale-105 transition-all"
               >
                 Explore Services <ArrowRight className="w-4 h-4" />
               </button>
            </div>
          )}
        </div>

        {/* Support Section */}
        <div className="mt-20 bg-gray-900 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-10 opacity-10">
              <MessageSquare className="w-48 h-48 rotate-12" />
           </div>
           <div className="relative z-10 text-center md:text-left">
              <h4 className="text-2xl font-black mb-2 italic">Bạn cần hỗ trợ với lịch hẹn?</h4>
              <p className="text-gray-400 font-medium">Nhân viên hỗ trợ của PetGo luôn sẵn sàng trợ giúp bạn 24/7.</p>
           </div>
           <button className="relative z-10 px-8 py-4 bg-orange-500 text-white font-black rounded-2xl hover:bg-orange-600 transition-all uppercase tracking-widest text-[10px] shadow-lg shadow-orange-500/20">
              Contact Support
           </button>
        </div>
      </main>
    </div>
  );
};

export default MyBookingsPage;