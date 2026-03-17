import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  PawPrint,
  User,
  Calendar,
  Clock,
  MapPin,
  ChevronLeft,
  Star,
  CheckCircle2,
  Phone,
  MessageSquare,
  AlertCircle,
  FileText,
  CreditCard,
  ArrowRight
} from 'lucide-react';

const BookingDetailPage = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const booking = {
    id: id || 'BK001985',
    status: 'Confirmed',
    createdAt: '10 May, 2025 - 14:30',
    provider: {
      name: "Paws & Relax Luxury Spa",
      address: "123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
      phone: "090 123 4567",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=200"
    },
    service: {
      name: "Gói Tắm Thư Giãn",
      desc: "Tắm bằng nước ấm, dầu gội organic và sấy chải lông chuyên sâu.",
      duration: "45 min",
      price: "200.000"
    },
    pet: {
      name: "LuLu",
      breed: "Corgi",
      weight: "12kg"
    },
    appointment: {
      date: "20 May, 2025",
      time: "10:00 AM"
    },
    notes: "Lulu hơi sợ nước lạnh, vui lòng dùng nước ấm vừa phải. Bé rất thích được gãi tai."
  };

  const timelineSteps = [
    { label: 'Booked', date: '10 May, 14:30', completed: true },
    { label: 'Confirmed', date: '11 May, 09:00', completed: true },
    { label: 'Completed', date: '-', completed: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-20">
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <div className="bg-orange-500 p-1.5 rounded-lg">
                <PawPrint className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black text-gray-900 tracking-tight">Pet<span className="text-orange-500">Go</span></span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white shadow-sm flex items-center justify-center">
            <User className="w-5 h-5 text-orange-600" />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1">Booking Detail</h1>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Mã đơn hàng: <span className="text-gray-900">{booking.id}</span></p>
          </div>
          <div className="flex items-center gap-3">
            {booking.status === 'Confirmed' && (
              <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Đã xác nhận
              </span>
            )}
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 mb-8 border border-gray-100 shadow-sm">
          <div className="flex justify-between relative">
            <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 -z-0"></div>
            <div className="absolute top-5 left-0 w-1/2 h-1 bg-orange-500 -z-0"></div>

            {timelineSteps.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center w-1/3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-all ${step.completed ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'bg-white border-4 border-gray-100 text-gray-300'}`}>
                  {step.completed ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                </div>
                <p className={`text-xs font-black uppercase tracking-tight mb-1 ${step.completed ? 'text-gray-900' : 'text-gray-300'}`}>{step.label}</p>
                <p className="text-[10px] font-bold text-gray-400">{step.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-500" /> Thông tin dịch vụ
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-6">
                <DetailItem label="Dịch vụ" value={booking.service.name} subValue={booking.service.duration} />
                <DetailItem label="Thú cưng" value={booking.pet.name} subValue={`${booking.pet.breed} • ${booking.pet.weight}`} />
              </div>
              <div className="space-y-6">
                <DetailItem label="Ngày hẹn" value={booking.appointment.date} icon={<Calendar className="w-4 h-4" />} />
                <DetailItem label="Thời gian" value={booking.appointment.time} icon={<Clock className="w-4 h-4" />} />
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-50 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Tổng phí dịch vụ</p>
                <p className="text-3xl font-black text-orange-600">{booking.service.price}đ</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-xl">
                <CreditCard className="w-4 h-4" /> Thanh toán tại cửa hàng
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 mb-8">
          <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-orange-500" /> Nhà cung cấp
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <img src={booking.provider.image} alt={booking.provider.name} className="w-20 h-20 rounded-2xl object-cover shadow-md" />
            <div className="flex-1">
              <h4 className="text-lg font-black text-gray-900 mb-1">{booking.provider.name}</h4>
              <p className="text-sm font-medium text-gray-500 mb-4">{booking.provider.address}</p>
              <div className="flex gap-3">
                <button className="flex-1 sm:flex-none px-6 py-2.5 bg-gray-100 hover:bg-orange-50 hover:text-orange-600 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
                  <Phone className="w-4 h-4" /> Gọi điện
                </button>
                <button className="flex-1 sm:flex-none px-6 py-2.5 bg-gray-100 hover:bg-orange-50 hover:text-orange-600 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
                  <MessageSquare className="w-4 h-4" /> Nhắn tin
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-orange-50/50 rounded-[2rem] p-8 border border-orange-100 mb-10">
          <h2 className="text-sm font-black text-orange-700 uppercase tracking-widest mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> Ghi chú từ khách hàng
          </h2>
          <p className="text-gray-600 text-sm font-medium leading-relaxed italic">
            "{booking.notes}"
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {booking.status === 'Completed' ? (
            <button
              onClick={() => navigate(`/reviews/create/${booking.id}`)}
              className="w-full py-5 bg-orange-500 text-white font-black rounded-2xl shadow-xl shadow-orange-100 hover:scale-[1.02] transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
            >
              <Star className="w-4 h-4 fill-current" /> Write Review
            </button>
          ) : (
            <>
              <button className="w-full py-5 bg-white border-2 border-gray-100 text-red-500 font-black rounded-2xl hover:bg-red-50 hover:border-red-100 transition-all uppercase tracking-widest text-xs">
                Cancel Booking
              </button>
              <button
                onClick={() => navigate(`/booking?bookingId=${booking.id}`)}
                className="w-full py-5 bg-gray-900 text-white font-black rounded-2xl shadow-xl shadow-gray-200 hover:bg-orange-500 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
              >
                Reschedule Appointment <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs font-bold text-gray-400">Bạn cần hỗ trợ thêm? <span className="text-orange-600 hover:underline cursor-pointer">Trung tâm trợ giúp</span></p>
        </div>
      </main>
    </div>
  );
};

const DetailItem = ({ label, value, subValue, icon }) => (
  <div className="flex items-start gap-3">
    {icon && <div className="mt-1 text-orange-500">{icon}</div>}
    <div>
      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">{label}</p>
      <p className="text-base font-black text-gray-900 leading-tight">{value}</p>
      {subValue && <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-tight">{subValue}</p>}
    </div>
  </div>
);

export default BookingDetailPage;