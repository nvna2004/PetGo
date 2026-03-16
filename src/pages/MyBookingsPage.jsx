import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PawPrint,
  User,
  Calendar,
  Clock,
  ChevronRight,
  Star,
  CheckCircle2,
  Clock4,
  XCircle,
  Undo2,
  MessageSquare
} from 'lucide-react';

const MyBookingsPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const navigate = useNavigate();

  const tabs = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];

  const bookings = [
    {
      id: 'BK001',
      provider: "Paws & Relax Luxury Spa",
      service: "Gói Tắm Thư Giãn",
      pet: "LuLu (Corgi)",
      date: "20 May, 2025",
      time: "10:00 AM",
      price: "200.000",
      status: "Confirmed",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 'BK002',
      provider: "Happy Tails Clinic",
      service: "Khám Tổng Quát",
      pet: "Mimi (Mèo Anh)",
      date: "15 May, 2025",
      time: "02:00 PM",
      price: "150.000",
      status: "Completed",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 'BK003',
      provider: "Pet Paradise Resort",
      service: "Khách sạn thú cưng (2 ngày)",
      pet: "LuLu (Corgi)",
      date: "22 May, 2025",
      time: "09:00 AM",
      price: "700.000",
      status: "Pending",
      image: "https://images.unsplash.com/photo-1591768793355-74d7ca738055?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 'BK004',
      provider: "The Vet Station",
      service: "Tiêm phòng dại",
      pet: "Mimi (Mèo Anh)",
      date: "10 May, 2025",
      time: "11:30 AM",
      price: "100.000",
      status: "Cancelled",
      image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=150"
    }
  ];

  const filteredBookings = activeTab === 'All'
    ? bookings
    : bookings.filter(b => b.status === activeTab);

  const renderStatus = (status) => {
    switch (status) {
      case 'Confirmed':
        return <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full"><CheckCircle2 className="w-3 h-3" /> Confirmed</span>;
      case 'Completed':
        return <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-green-600 bg-green-50 px-3 py-1 rounded-full"><CheckCircle2 className="w-3 h-3" /> Completed</span>;
      case 'Pending':
        return <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full"><Clock4 className="w-3 h-3" /> Pending</span>;
      case 'Cancelled':
        return <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full"><XCircle className="w-3 h-3" /> Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-1.5 rounded-lg shadow-lg shadow-orange-100">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tight">Pet<span className="text-orange-500">Go</span></span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-600">
            <Link to="/" className="hover:text-orange-600">Home</Link>
            <Link to="/search" className="hover:text-orange-600">Services</Link>
            <Link to="/my-bookings" className="text-orange-600">My Booking</Link>
            <div className="w-9 h-9 rounded-full bg-orange-100 border-2 border-white shadow-sm flex items-center justify-center">
              <User className="w-4 h-4 text-orange-600" />
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-500 font-medium italic">Theo dõi và quản lý lịch trình chăm sóc thú cưng của bạn.</p>
        </div>

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

        <div className="space-y-6">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-50">
                    <div className="flex items-center gap-4">
                      <img src={booking.image} alt={booking.provider} className="w-14 h-14 rounded-2xl object-cover" />
                      <div>
                        <h3 className="text-lg font-black text-gray-900 leading-tight group-hover:text-orange-600 transition-colors">{booking.provider}</h3>
                        <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">ID: {booking.id}</p>
                      </div>
                    </div>
                    <div>{renderStatus(booking.status)}</div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Dịch vụ</p>
                          <p className="text-sm font-bold text-gray-700">{booking.service}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                          <PawPrint className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Thú cưng</p>
                          <p className="text-sm font-bold text-gray-700">{booking.pet}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Ngày hẹn</p>
                          <p className="text-sm font-bold text-gray-700">{booking.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Thời gian</p>
                          <p className="text-sm font-bold text-gray-700">{booking.time}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end justify-center">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Tổng phí</p>
                      <p className="text-2xl font-black text-gray-900">{booking.price}đ</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-50">
                    <button
                      onClick={() => navigate(`/bookings/${booking.id}`)}
                      className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest"
                    >
                      View Detail <ChevronRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-3">
                      {booking.status === 'Completed' ? (
                        <button
                          onClick={() => navigate(`/reviews/create/${booking.id}`)}
                          className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white text-xs font-black rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-100 uppercase tracking-widest"
                        >
                          <Star className="w-4 h-4 fill-current" /> Write Review
                        </button>
                      ) : booking.status === 'Cancelled' ? (
                        <button
                          onClick={() => navigate(`/booking?bookingId=${booking.id}`)}
                          className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-xs font-black rounded-2xl hover:bg-orange-500 transition-all shadow-lg uppercase tracking-widest"
                        >
                          <Undo2 className="w-4 h-4" /> Reschedule
                        </button>
                      ) : (
                        <>
                          <button className="px-6 py-3 text-xs font-black text-red-500 bg-red-50 hover:bg-red-100 rounded-2xl transition-all uppercase tracking-widest">
                            Cancel
                          </button>
                          <button
                            onClick={() => navigate(`/booking?bookingId=${booking.id}`)}
                            className="px-6 py-3 bg-gray-900 text-white text-xs font-black rounded-2xl hover:bg-orange-500 transition-all shadow-lg uppercase tracking-widest"
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
            <div className="bg-white rounded-[3rem] p-16 text-center border border-dashed border-gray-200">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Không có lịch đặt chỗ nào</h3>
              <p className="text-gray-400 font-medium max-w-xs mx-auto mb-8">Bạn chưa có lịch hẹn nào ở trạng thái này. Hãy khám phá các dịch vụ hấp dẫn!</p>
              <button
                onClick={() => navigate("/search")}
                className="px-8 py-4 bg-orange-500 text-white font-black rounded-2xl shadow-lg shadow-orange-100 uppercase tracking-widest text-xs"
              >
                Tìm dịch vụ ngay
              </button>
            </div>
          )}
        </div>

        <div className="mt-12 bg-blue-600 rounded-[2rem] p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl shadow-blue-200">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <MessageSquare className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-black italic">Bạn cần giúp đỡ với lịch hẹn?</h4>
              <p className="text-blue-100 text-sm font-medium">Nhân viên hỗ trợ của chúng tôi sẵn sàng trợ giúp 24/7.</p>
            </div>
          </div>
          <button className="px-8 py-4 bg-white text-blue-600 font-black rounded-2xl hover:bg-blue-50 transition-all uppercase tracking-widest text-xs">
            Chat Support
          </button>
        </div>
      </main>
    </div>
  );
};

export default MyBookingsPage;