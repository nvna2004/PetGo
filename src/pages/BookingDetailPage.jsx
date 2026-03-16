import React, { useState } from 'react';
import { 
  ArrowLeft, 
  PawPrint, 
  User, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  MessageSquare, 
  FileText, 
  AlertCircle,
  ChevronRight,
  Star,
  RotateCcw,
  XCircle,
  CreditCard
} from 'lucide-react';

const BookingDetailPage = () => {
  // Dữ liệu mẫu chi tiết một lịch hẹn
  const booking = {
    id: "BK001985",
    status: "Confirmed", // Trạng thái: 'Booked', 'Confirmed', 'Completed', 'Cancelled'
    createdAt: "10 Tháng 5, 2025 - 14:30",
    provider: {
      id: 1,
      name: "Paws & Relax Luxury Spa",
      address: "123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
      phone: "090 123 4567",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=200"
    },
    service: {
      id: 2,
      name: "Gói Tắm Thư Giãn",
      desc: "Tắm bằng nước ấm, dầu gội organic và sấy chải lông chuyên sâu.",
      duration: "45 phút",
      price: "200.000đ"
    },
    pet: {
      name: "LuLu",
      breed: "Corgi",
      weight: "12kg"
    },
    appointment: {
      date: "20 Tháng 5, 2025",
      time: "10:00 AM"
    },
    notes: "Lulu hơi sợ nước lạnh, vui lòng dùng nước ấm vừa phải. Bé rất thích được gãi tai."
  };

  // Các bước trong Timeline
  const timelineSteps = [
    { label: 'Đã đặt', time: '10 Tháng 5, 14:30', completed: true },
    { label: 'Đã xác nhận', time: '11 Tháng 5, 09:00', completed: true },
    { label: 'Hoàn thành', time: '--:--', completed: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-20">
      {/* Header PetGo */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <button 
                onClick={() => window.history.back()}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
             >
               <ArrowLeft className="w-5 h-5" />
             </button>
             <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
               <div className="bg-orange-500 p-1.5 rounded-lg shadow-lg shadow-orange-100">
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

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Title & Status Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1">Booking Detail</h1>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
              Mã lịch hẹn: <span className="text-gray-900">{booking.id}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
             <span className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${
               booking.status === 'Confirmed' ? 'bg-blue-50 text-blue-600' : 
               booking.status === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
             }`}>
               <CheckCircle2 className="w-4 h-4" /> {booking.status === 'Confirmed' ? 'Đã xác nhận' : booking.status}
             </span>
          </div>
        </div>

        {/* Timeline Trạng thái */}
        <div className="bg-white rounded-[2.5rem] p-8 mb-8 border border-gray-100 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <Clock className="w-32 h-32" />
           </div>
           
           <div className="flex justify-between relative z-10">
              {/* Background Line */}
              <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 -z-0"></div>
              {/* Active Line Progress */}
              <div className="absolute top-5 left-0 w-1/2 h-1 bg-orange-500 -z-0"></div>

              {timelineSteps.map((step, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center w-1/3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-all ${
                    step.completed ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'bg-white border-4 border-gray-100 text-gray-300'
                  }`}>
                    {step.completed ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                  </div>
                  <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${step.completed ? 'text-gray-900' : 'text-gray-300'}`}>
                    {step.label}
                  </p>
                  <p className="text-[10px] font-bold text-gray-400">{step.time}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Grid Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Info Columns */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Service & Pet Details */}
            <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
               <div className="p-8">
                  <h2 className="text-lg font-black text-gray-900 mb-8 flex items-center gap-3">
                    <div className="p-2 bg-orange-500 rounded-xl">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    Thông tin dịch vụ
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                     <DetailItem 
                        label="Dịch vụ" 
                        value={booking.service.name} 
                        subValue={booking.service.desc} 
                     />
                     <DetailItem 
                        label="Thú cưng" 
                        value={booking.pet.name} 
                        subValue={`${booking.pet.breed} • ${booking.pet.weight}`} 
                     />
                     <DetailItem 
                        label="Ngày hẹn" 
                        value={booking.appointment.date} 
                        icon={<Calendar className="w-4 h-4 text-orange-500" />} 
                     />
                     <DetailItem 
                        label="Giờ hẹn" 
                        value={booking.appointment.time} 
                        icon={<Clock className="w-4 h-4 text-orange-500" />} 
                     />
                  </div>

                  <div className="mt-10 pt-8 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-6">
                     <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Tổng phí dịch vụ</p>
                        <p className="text-4xl font-black text-orange-600 tracking-tight">{booking.service.price}</p>
                     </div>
                     <button 
                        onClick={() => window.location.href = '/invoice'}
                        className="w-full sm:w-auto px-6 py-3 bg-gray-50 text-gray-500 font-black rounded-2xl hover:bg-orange-50 hover:text-orange-600 transition-all text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
                     >
                        <CreditCard className="w-4 h-4" /> View Invoice
                     </button>
                  </div>
               </div>
            </section>

            {/* Provider Info */}
            <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
               <h2 className="text-lg font-black text-gray-900 mb-8 flex items-center gap-3">
                  <div className="p-2 bg-orange-500 rounded-xl">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  Nhà cung cấp
               </h2>
               <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <img src={booking.provider.image} alt={booking.provider.name} className="w-24 h-24 rounded-3xl object-cover shadow-md border-4 border-gray-50" />
                  <div className="flex-1">
                     <h4 className="text-xl font-black text-gray-900 mb-1">{booking.provider.name}</h4>
                     <p className="text-sm font-medium text-gray-500 mb-4 leading-relaxed">{booking.provider.address}</p>
                     <div className="flex flex-wrap gap-3">
                        <button className="px-5 py-2.5 bg-gray-100 hover:bg-orange-50 hover:text-orange-600 rounded-xl text-[10px] font-black transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
                           <Phone className="w-4 h-4" /> Gọi điện
                        </button>
                        <button className="px-5 py-2.5 bg-gray-100 hover:bg-orange-50 hover:text-orange-600 rounded-xl text-[10px] font-black transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
                           <MessageSquare className="w-4 h-4" /> Nhắn tin
                        </button>
                     </div>
                  </div>
               </div>
            </section>

            {/* Notes Section */}
            <section className="bg-orange-50/50 rounded-[2rem] p-8 border border-orange-100">
               <h2 className="text-[10px] font-black text-orange-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Ghi chú quan trọng
               </h2>
               <p className="text-gray-600 text-sm font-medium leading-relaxed italic">
                  "{booking.notes}"
               </p>
            </section>
          </div>

          {/* Action Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm">
               <h3 className="text-lg font-black text-gray-900 mb-6">Thao tác</h3>
               <div className="space-y-4">
                  {booking.status === 'Completed' ? (
                    <button 
                       onClick={() => window.location.href = `/reviews/create/${booking.id}`}
                       className="w-full py-5 bg-orange-500 text-white font-black rounded-2xl shadow-xl shadow-orange-100 hover:scale-[1.02] transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
                    >
                       <Star className="w-4 h-4 fill-current" /> Write Review
                    </button>
                  ) : (
                    <>
                       <button 
                          onClick={() => window.location.href = `/reschedule/${booking.id}`}
                          className="w-full py-5 bg-gray-900 text-white font-black rounded-2xl shadow-xl shadow-gray-200 hover:bg-orange-500 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
                       >
                          <RotateCcw className="w-4 h-4" /> Reschedule Appointment
                       </button>
                       <button 
                          onClick={() => window.location.href = `/cancel-booking/${booking.id}`}
                          className="w-full py-5 bg-white border-2 border-gray-100 text-red-500 font-black rounded-2xl hover:bg-red-50 hover:border-red-100 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
                       >
                          <XCircle className="w-4 h-4" /> Cancel Booking
                       </button>
                    </>
                  )}
               </div>
               
               <div className="mt-8 pt-6 border-t border-gray-50">
                  <p className="text-[10px] font-bold text-gray-400 text-center leading-relaxed">
                     Bạn có thắc mắc về lịch hẹn này? Liên hệ với chúng tôi qua hotline <span className="text-orange-600">1900 1234</span>
                  </p>
               </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
};

// Component con: Mục chi tiết
const DetailItem = ({ label, value, subValue, icon }) => (
  <div className="flex items-start gap-3">
    {icon && <div className="mt-1">{icon}</div>}
    <div className="flex-1">
      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1.5">{label}</p>
      <p className="text-base font-black text-gray-900 leading-tight">{value}</p>
      {subValue && <p className="text-xs font-bold text-gray-400 mt-1.5 leading-snug">{subValue}</p>}
    </div>
  </div>
);

export default BookingDetailPage;