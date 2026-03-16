import React, { useState } from 'react';
import { 
  ArrowLeft, 
  PawPrint, 
  User, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Info,
  Calendar,
  Clock,
  HelpCircle,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

const CancelBookingPage = () => {
  const [selectedReason, setSelectedReason] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  // Dữ liệu mẫu lịch hẹn cần hủy
  const booking = {
    id: "BK001985",
    provider: "Paws & Relax Luxury Spa",
    service: "Gói Tắm Thư Giãn",
    pet: "LuLu (Corgi)",
    date: "20 Tháng 5, 2025",
    time: "10:00 AM",
    price: "200.000đ",
    policy: {
      refundAmount: "180.000đ",
      fee: "20.000đ",
      limit: "Trước 12 tiếng"
    }
  };

  const reasons = [
    "Thay đổi kế hoạch đột xuất",
    "Tìm thấy nơi khác tốt hơn",
    "Giá dịch vụ quá cao",
    "Đặt nhầm thời gian/dịch vụ",
    "Lý do khác"
  ];

  const handleConfirmCancel = () => {
    if (selectedReason && isAgreed) {
      // Điều hướng về danh sách lịch hẹn
      window.location.href = '/my-bookings';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-20">
      {/* Header PetGo */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <button 
                onClick={() => window.location.href = `/bookings/${booking.id}`}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
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

      <main className="max-w-4xl mx-auto px-4 py-10 sm:py-16">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-100">
            <ShieldAlert className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2 tracking-tight">Cancel Booking</h1>
          <p className="text-gray-500 font-medium">Chúng tôi rất tiếc khi bạn không thể tham gia lịch hẹn này.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Booking Summary Card */}
            <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
               <div className="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Thông tin lịch hẹn</span>
                  <span className="text-[10px] font-black text-gray-900 px-3 py-1 bg-white rounded-lg shadow-sm border border-gray-100">ID: {booking.id}</span>
               </div>
               <div className="p-8">
                  <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                     <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0">
                        <PawPrint className="w-8 h-8 text-orange-500" />
                     </div>
                     <div className="flex-1">
                        <h3 className="text-xl font-black text-gray-900 mb-1">{booking.provider}</h3>
                        <p className="text-sm font-bold text-orange-600 uppercase tracking-wider mb-4">{booking.service}</p>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                           <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                              <Calendar className="w-4 h-4" /> {booking.date}
                           </div>
                           <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                              <Clock className="w-4 h-4" /> {booking.time}
                           </div>
                           <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                              <User className="w-4 h-4" /> {booking.pet}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>

            {/* Reason Selection Section */}
            <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 sm:p-10">
               <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
                  Lý do bạn muốn hủy?
               </h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {reasons.map((reason, idx) => (
                    <label 
                      key={idx}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${selectedReason === reason ? 'border-orange-500 bg-orange-50/30' : 'border-gray-50 hover:border-orange-100 bg-white'}`}
                    >
                      <input 
                        type="radio" 
                        name="reason" 
                        className="hidden" 
                        onChange={() => setSelectedReason(reason)}
                        checked={selectedReason === reason}
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedReason === reason ? 'border-orange-500 bg-orange-500' : 'border-gray-200'}`}>
                        {selectedReason === reason && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <span className={`text-sm font-bold ${selectedReason === reason ? 'text-gray-900' : 'text-gray-500'}`}>{reason}</span>
                    </label>
                  ))}
               </div>
               
               {selectedReason === "Lý do khác" && (
                 <textarea 
                  rows="3" 
                  placeholder="Vui lòng chia sẻ thêm lý do để chúng tôi cải thiện dịch vụ..."
                  className="w-full mt-6 p-5 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all outline-none"
                 ></textarea>
               )}
            </section>

            {/* Help/Contact Tip */}
            <div className="flex items-center justify-between p-6 bg-blue-50 rounded-[2rem] border border-blue-100">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-500 shadow-sm">
                     <HelpCircle className="w-6 h-6" />
                  </div>
                  <div>
                     <p className="text-sm font-black text-blue-900">Bạn muốn đổi lịch thay vì hủy?</p>
                     <p className="text-xs font-medium text-blue-700/70">Chúng tôi hỗ trợ dời lịch hẹn miễn phí.</p>
                  </div>
               </div>
               <button 
                  onClick={() => window.location.href = `/reschedule/${booking.id}`}
                  className="px-6 py-3 bg-white text-blue-600 font-black rounded-xl border border-blue-200 hover:bg-blue-600 hover:text-white transition-all text-[10px] uppercase tracking-widest shadow-sm"
               >
                  Reschedule
               </button>
            </div>
          </div>

          {/* Cancellation Policy Sidebar */}
          <aside className="lg:sticky lg:top-28 space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
              <div className="bg-red-500 p-8 text-white relative">
                <div className="absolute top-4 right-4 opacity-20">
                  <AlertTriangle className="w-16 h-16" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">Chính sách hoàn phí</h3>
                <p className="text-xs font-bold text-red-100 mt-1 italic">Vui lòng đọc kỹ điều khoản</p>
              </div>
              
              <div className="p-8 space-y-8">
                <div className="space-y-6">
                  <PolicyItem label="Số tiền hoàn lại" value={booking.policy.refundAmount} success />
                  <PolicyItem label="Phí hủy lịch" value={booking.policy.fee} warning />
                  <PolicyItem label="Thời hạn hoàn tiền" value="3 - 5 ngày làm việc" />
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex gap-3">
                    <Info className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <p className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-tight">
                       Chỉ áp dụng hoàn tiền cho các yêu cầu hủy trước <span className="text-gray-900">{booking.policy.limit}</span> diễn ra lịch hẹn.
                    </p>
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer group pt-4 border-t border-gray-50">
                  <div className="relative mt-0.5">
                    <input 
                      type="checkbox" 
                      className="peer hidden" 
                      onChange={() => setIsAgreed(!isAgreed)}
                      checked={isAgreed}
                    />
                    <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${isAgreed ? 'bg-red-500 border-red-500' : 'bg-white border-gray-200 peer-hover:border-red-300'}`}>
                      {isAgreed && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-400 group-hover:text-gray-600 transition-colors">
                    Tôi đã hiểu và đồng ý với các chính sách hủy lịch của PetGo.
                  </span>
                </label>

                <div className="space-y-3 pt-2">
                  <button 
                    disabled={!selectedReason || !isAgreed}
                    onClick={handleConfirmCancel}
                    className="w-full py-5 bg-red-500 disabled:bg-gray-100 disabled:text-gray-300 text-white font-black rounded-2xl shadow-xl shadow-red-100 hover:bg-red-600 transition-all active:scale-95 uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                  >
                    Confirm Cancel <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => window.location.href = `/bookings/${booking.id}`}
                    className="w-full py-5 bg-white border border-gray-100 text-gray-400 font-black rounded-2xl hover:bg-gray-50 transition-all uppercase tracking-widest text-[10px]"
                  >
                    Keep Booking
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Note */}
            <p className="text-[10px] text-gray-400 font-bold text-center px-4 leading-relaxed uppercase tracking-widest">
              Lịch hẹn của bạn sẽ bị xóa vĩnh viễn sau khi xác nhận hủy. Bạn vẫn có thể đặt lại lịch mới sau này.
            </p>
          </aside>
        </div>
      </main>
    </div>
  );
};

// Component con: Mục chính sách
const PolicyItem = ({ label, value, success, warning }) => (
  <div className="flex justify-between items-center">
    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
    <span className={`text-sm font-black ${success ? 'text-green-600' : warning ? 'text-red-500' : 'text-gray-900'}`}>{value}</span>
  </div>
);

export default CancelBookingPage;