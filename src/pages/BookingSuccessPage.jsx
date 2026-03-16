import React from 'react';
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MapPin, 
  PawPrint, 
  ArrowRight, 
  Home, 
  ListOrdered, 
  Mail, 
  MessageSquare,
  ShieldCheck,
  User
} from 'lucide-react';

const BookingSuccessPage = () => {
  // Dữ liệu giả lập cho đơn hàng vừa hoàn tất
  const bookingInfo = {
    id: "BK001985",
    provider: "Paws & Relax Luxury Spa",
    service: "Gói Tắm Thư Giãn",
    pet: "LuLu (Corgi)",
    date: "20 Tháng 05, 2025",
    time: "10:00 AM",
    price: "150.000đ",
    status: "Đã xác nhận" // Hoặc "Chờ xác nhận"
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-20">
      {/* Header PetGo */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
            <div className="bg-orange-500 p-1.5 rounded-lg shadow-lg shadow-orange-100">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tight">Pet<span className="text-orange-500">Go</span></span>
          </div>
          <div className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center shadow-sm">
            <User className="w-5 h-5 text-orange-600" />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 sm:py-20">
        {/* Success Icon & Title */}
        <div className="text-center mb-12 animate-in zoom-in duration-700">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-100/50">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Booking Confirmed!</h1>
          <p className="text-gray-500 font-medium">Cảm ơn bạn đã tin tưởng dịch vụ của PetGo.</p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden mb-8 animate-in slide-in-from-bottom-8 duration-700">
          <div className="bg-gray-900 p-6 sm:p-8 text-white flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Mã đặt chỗ</p>
              <h3 className="text-2xl font-black">{bookingInfo.id}</h3>
            </div>
            <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-xl border border-green-500/30">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-xs font-black uppercase tracking-widest">{bookingInfo.status}</span>
            </div>
          </div>

          <div className="p-8 sm:p-10 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <DetailItem 
                icon={<ShieldCheck className="w-5 h-5 text-orange-500" />} 
                label="Nhà cung cấp" 
                value={bookingInfo.provider} 
              />
              <DetailItem 
                icon={<PawPrint className="w-5 h-5 text-orange-500" />} 
                label="Dịch vụ & Thú cưng" 
                value={bookingInfo.service} 
                subValue={bookingInfo.pet}
              />
              <DetailItem 
                icon={<Calendar className="w-5 h-5 text-orange-500" />} 
                label="Ngày hẹn" 
                value={bookingInfo.date} 
              />
              <DetailItem 
                icon={<Clock className="w-5 h-5 text-orange-500" />} 
                label="Giờ hẹn" 
                value={bookingInfo.time} 
              />
            </div>

            <div className="pt-8 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Tổng chi phí</p>
                <p className="text-3xl font-black text-gray-900">{bookingInfo.price}</p>
              </div>
              <button 
                onClick={() => window.location.href = `/bookings/${bookingInfo.id}`}
                className="w-full sm:w-auto px-8 py-4 bg-gray-100 text-gray-700 font-black rounded-2xl hover:bg-orange-500 hover:text-white transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
              >
                View Booking Detail <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Reminder Box */}
        <div className="bg-orange-50 rounded-[2rem] p-8 border border-orange-100 mb-10 flex flex-col sm:flex-row items-start gap-6">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
            <Mail className="w-6 h-6 text-orange-500" />
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-black text-orange-900 uppercase tracking-widest mb-1">Thông báo quan trọng</h4>
              <p className="text-sm text-orange-800/80 font-medium leading-relaxed">
                Một email và tin nhắn SMS xác nhận đã được gửi đến bạn. Chúng tôi sẽ nhắc lịch hẹn cho bạn trước 2 giờ.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 text-[10px] font-black text-orange-600 uppercase tracking-widest hover:underline">
                <MessageSquare className="w-3.5 h-3.5" /> Liên hệ nhà cung cấp
              </button>
              <button className="flex items-center gap-2 text-[10px] font-black text-orange-600 uppercase tracking-widest hover:underline">
                <Calendar className="w-3.5 h-3.5" /> Thêm vào lịch
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => window.location.href = '/my-bookings'}
            className="flex-1 py-5 bg-gray-900 text-white font-black rounded-2xl shadow-xl shadow-gray-200 hover:bg-orange-600 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
          >
            <ListOrdered className="w-4 h-4" /> Go to My Bookings
          </button>
          <button 
            onClick={() => window.location.href = '/'}
            className="flex-1 py-5 bg-white border-2 border-gray-100 text-gray-900 font-black rounded-2xl hover:border-orange-500 hover:text-orange-600 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Back to Home
          </button>
        </div>

        <div className="mt-16 text-center">
          <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">
            Mọi thắc mắc vui lòng liên hệ hotline: <span className="text-gray-500">1900 1234</span>
          </p>
        </div>
      </main>
    </div>
  );
};

// Component con: Mục chi tiết
const DetailItem = ({ icon, label, value, subValue }) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <span className="block text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">{label}</span>
      <span className="block text-sm font-black text-gray-900 leading-tight">{value}</span>
      {subValue && <span className="block text-xs font-bold text-gray-400 mt-1">{subValue}</span>}
    </div>
  </div>
);

export default BookingSuccessPage;