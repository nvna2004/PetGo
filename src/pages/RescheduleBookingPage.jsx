import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  ArrowRight, 
  ChevronLeft, 
  PawPrint, 
  User, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  CalendarDays,
  History,
  ArrowLeftRight
} from 'lucide-react';

const App = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Dữ liệu mẫu lịch hẹn hiện tại
  const oldBooking = {
    id: "BK001985",
    provider: "Paws & Relax Luxury Spa",
    service: "Gói Tắm Thư Giãn",
    pet: "LuLu (Corgi)",
    date: "20 Tháng 5, 2025",
    time: "10:00 AM",
    price: "200.000đ"
  };

  // Danh sách các khung giờ mới
  const timeSlots = [
    { time: "09:00", available: true },
    { time: "10:00", available: false },
    { time: "11:00", available: true },
    { time: "14:00", available: true },
    { time: "15:00", available: false },
    { time: "16:00", available: true },
    { time: "17:00", available: true },
    { time: "18:00", available: true },
  ];

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      window.location.href = `/bookings/${oldBooking.id}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Header PetGo */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.location.href = `/bookings/${oldBooking.id}`}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
              <div className="bg-orange-500 p-1.5 rounded-lg">
                <PawPrint className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black text-gray-900 tracking-tight">Pet<span className="text-orange-500">Go</span></span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center shadow-sm">
            <User className="w-5 h-5 text-orange-600" />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 sm:py-16">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2 tracking-tight">Reschedule Appointment</h1>
          <p className="text-gray-500 font-medium">Bạn có thể thay đổi thời gian đặt lịch một cách nhanh chóng và dễ dàng.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Current Booking Info Card */}
            <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 flex flex-col sm:flex-row gap-8 items-center bg-gradient-to-br from-white to-gray-50/50">
              <div className="w-24 h-24 bg-orange-100 rounded-[2rem] flex items-center justify-center shrink-0">
                <History className="w-10 h-10 text-orange-600" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-2">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mã lịch hẹn: {oldBooking.id}</span>
                  <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md uppercase tracking-widest">{oldBooking.service}</span>
                </div>
                <h2 className="text-xl font-black text-gray-900 mb-4">{oldBooking.provider}</h2>
                <div className="flex flex-wrap justify-center sm:justify-start gap-6">
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                    <CalendarDays className="w-4 h-4 text-orange-500" /> {oldBooking.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                    <Clock className="w-4 h-4 text-orange-500" /> {oldBooking.time}
                  </div>
                </div>
              </div>
              <div className="hidden md:block h-20 w-px bg-gray-200"></div>
              <div className="text-center sm:text-right">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Thú cưng</p>
                <p className="font-black text-gray-900">{oldBooking.pet}</p>
              </div>
            </section>

            {/* Selection Area */}
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8 sm:p-10">
                <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
                  <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
                  Chọn thời gian mới
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Calendar Mock */}
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Chọn ngày</label>
                    <div className="grid grid-cols-7 gap-2 bg-gray-50 p-4 rounded-3xl border border-gray-100">
                      {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(d => (
                        <div key={d} className="text-center text-[10px] font-black text-gray-300 uppercase mb-2">{d}</div>
                      ))}
                      {[...Array(30)].map((_, i) => (
                        <button 
                          key={i}
                          type="button"
                          onClick={() => setSelectedDate(`${i + 1} Tháng 05, 2025`)}
                          className={`aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all ${selectedDate === `${i + 1} Tháng 05, 2025` ? 'bg-orange-500 text-white shadow-lg' : 'hover:bg-orange-50 text-gray-700 bg-white'}`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Chọn giờ</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {timeSlots.map((slot, i) => (
                        <button 
                          key={i}
                          disabled={!slot.available}
                          onClick={() => setSelectedTime(slot.time)}
                          className={`py-4 rounded-2xl text-xs font-black transition-all border-2 ${
                            !slot.available 
                            ? 'bg-gray-50 text-gray-200 border-transparent cursor-not-allowed opacity-50' 
                            : selectedTime === slot.time 
                              ? 'bg-gray-900 text-white border-gray-900 shadow-xl' 
                              : 'bg-white text-gray-600 border-gray-100 hover:border-orange-200 hover:bg-orange-50'
                          }`}
                        >
                          {slot.time}
                          {!slot.available && <span className="block text-[8px] font-bold">Bận</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Policies */}
            <div className="bg-blue-50/50 rounded-[2rem] p-8 border border-blue-100 flex gap-5">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                <Info className="w-6 h-6 text-blue-500" />
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-1">Chính sách đổi lịch</h4>
                  <p className="text-sm font-medium text-blue-700/80 leading-relaxed">
                    Bạn được phép đổi lịch miễn phí 01 lần trước khi diễn ra lịch hẹn 12 tiếng. Việc đổi lịch quá gần thời điểm hẹn có thể phát sinh phí dịch vụ.
                  </p>
                </div>
                <div className="flex gap-8">
                   <div className="flex items-center gap-2 text-[10px] font-black text-blue-900 uppercase tracking-widest">
                     <CheckCircle2 className="w-4 h-4 text-green-500" /> Giới hạn: 01 Lần
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-black text-blue-900 uppercase tracking-widest">
                     <AlertCircle className="w-4 h-4 text-orange-500" /> Trước: 12 Tiếng
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Confirmation Sidebar */}
          <aside className="lg:sticky lg:top-28 space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
              <div className="bg-gray-900 p-8 text-white">
                <h3 className="text-xl font-black uppercase tracking-tight">Xác nhận thay đổi</h3>
                <p className="text-xs font-bold text-gray-400 mt-1">Vui lòng kiểm tra kỹ thời gian mới</p>
              </div>
              
              <div className="p-8 space-y-10">
                {/* Visual Contrast Comparison */}
                <div className="space-y-6">
                  {/* Old Schedule */}
                  <div className="relative pl-6 border-l-2 border-gray-100 opacity-50">
                    <span className="absolute -left-2.5 top-0 bg-white p-1">
                      <History className="w-3 h-3 text-gray-400" />
                    </span>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Lịch cũ</p>
                    <p className="text-sm font-bold text-gray-500 leading-tight">
                      {oldBooking.date} • {oldBooking.time}
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                      <ArrowLeftRight className="w-5 h-5 text-orange-500" />
                    </div>
                  </div>

                  {/* New Schedule */}
                  <div className="relative pl-6 border-l-2 border-orange-500">
                    <span className="absolute -left-2.5 top-0 bg-white p-1">
                      <CheckCircle2 className="w-3 h-3 text-orange-500" />
                    </span>
                    <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1">Lịch mới</p>
                    <p className={`text-sm font-black leading-tight ${selectedDate && selectedTime ? 'text-gray-900' : 'text-gray-300 italic'}`}>
                      {selectedDate && selectedTime 
                        ? `${selectedDate} • ${selectedTime}` 
                        : "Vui lòng chọn lịch mới"}
                    </p>
                  </div>
                </div>

                {/* Price Difference */}
                <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Chênh lệch giá</span>
                      <span className="text-sm font-black text-green-600">0đ</span>
                   </div>
                   <div className="text-right">
                      <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Thanh toán</span>
                      <span className="text-lg font-black text-gray-900">{oldBooking.price}</span>
                   </div>
                </div>

                <div className="space-y-3 pt-4">
                  <button 
                    disabled={!selectedDate || !selectedTime}
                    onClick={handleConfirm}
                    className="w-full py-5 bg-orange-500 disabled:bg-gray-100 disabled:text-gray-300 text-white font-black rounded-2xl shadow-xl shadow-orange-100 hover:bg-orange-600 transition-all active:scale-95 uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                  >
                    Confirm Reschedule <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => window.location.href = `/bookings/${oldBooking.id}`}
                    className="w-full py-5 bg-white border border-gray-100 text-gray-400 font-black rounded-2xl hover:bg-gray-50 transition-all uppercase tracking-widest text-[10px]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Note */}
            <p className="text-[10px] text-gray-400 font-bold text-center px-4 leading-relaxed uppercase tracking-widest">
              Xác nhận thay đổi lịch đồng nghĩa với việc bạn đồng ý hủy bỏ lịch cũ và thay thế bằng lịch mới này.
            </p>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default App;