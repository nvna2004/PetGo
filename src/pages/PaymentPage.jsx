import React, { useState } from 'react';
import { 
  ChevronLeft, 
  PawPrint, 
  User, 
  CreditCard, 
  Wallet, 
  Banknote, 
  Ticket, 
  ShieldCheck, 
  CheckCircle2, 
  Info,
  ArrowRight,
  Lock
} from 'lucide-react';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Dữ liệu giả lập từ Booking đã chọn
  const bookingSummary = {
    provider: "Paws & Relax Luxury Spa",
    service: "Gói Tắm Thư Giãn",
    pet: "LuLu (Corgi)",
    date: "20 Tháng 05, 2025",
    time: "10:00 AM",
    price: 200000
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'PETGO50') {
      setDiscount(50000);
    } else {
      setDiscount(0);
    }
  };

  const finalTotal = bookingSummary.price - discount;

  const paymentOptions = [
    { id: 'cod', name: 'Thanh toán tại spa (COD)', icon: <Banknote className="w-5 h-5" />, desc: 'Thanh toán bằng tiền mặt hoặc thẻ khi đến nơi' },
    { id: 'momo', name: 'Ví MoMo', icon: <Wallet className="w-5 h-5 text-pink-500" />, desc: 'Thanh toán nhanh qua ứng dụng MoMo' },
    { id: 'vnpay', name: 'VNPay', icon: <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-[8px] text-white font-bold italic">VN</div>, desc: 'Cổng thanh toán QR Code ngân hàng' },
    { id: 'card', name: 'Thẻ tín dụng / Ghi nợ', icon: <CreditCard className="w-5 h-5 text-gray-700" />, desc: 'Visa, Mastercard, JCB' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Header PetGo */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <button 
                onClick={() => window.location.href = '/booking'}
                className="p-2 hover:bg-gray-100 rounded-full transition-all"
             >
               <ChevronLeft className="w-6 h-6" />
             </button>
             <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
               <div className="bg-orange-500 p-1.5 rounded-lg shadow-lg shadow-orange-100">
                 <PawPrint className="w-5 h-5 text-white" />
               </div>
               <span className="text-xl font-black text-gray-900 tracking-tight">Pet<span className="text-orange-500">Go</span></span>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mr-4">
                <Lock className="w-3.5 h-3.5" /> Secure Checkout
             </div>
             <div className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center shadow-sm">
                <User className="w-5 h-5 text-orange-600" />
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 sm:py-16">
        <h1 className="text-3xl font-black text-gray-900 mb-10 tracking-tight">Thanh toán</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Payment Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Payment Methods Section */}
            <section className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-orange-500" /> Chọn phương thức thanh toán
              </h2>
              
              <div className="space-y-4">
                {paymentOptions.map((option) => (
                  <label 
                    key={option.id}
                    className={`relative p-6 rounded-[1.5rem] border-2 cursor-pointer transition-all flex items-center justify-between group ${paymentMethod === option.id ? 'border-orange-500 bg-orange-50/30' : 'border-gray-50 hover:border-orange-100 bg-white'}`}
                  >
                    <input 
                      type="radio" 
                      name="payment" 
                      className="hidden" 
                      checked={paymentMethod === option.id}
                      onChange={() => setPaymentMethod(option.id)}
                    />
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${paymentMethod === option.id ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'bg-gray-100 text-gray-400'}`}>
                        {option.icon}
                      </div>
                      <div>
                        <p className="font-black text-gray-900 leading-tight mb-1">{option.name}</p>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter leading-none">{option.desc}</p>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === option.id ? 'border-orange-500 bg-orange-500' : 'border-gray-200'}`}>
                      {paymentMethod === option.id && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                  </label>
                ))}
              </div>
            </section>

            {/* Promo Code Section */}
            <section className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <Ticket className="w-6 h-6 text-orange-500" /> Mã giảm giá (Promo)
              </h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="text" 
                  placeholder="Nhập mã ưu đãi của bạn..."
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 p-5 bg-gray-50 border-none rounded-2xl font-bold uppercase placeholder:capitalize outline-none focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all"
                />
                <button 
                  onClick={handleApplyPromo}
                  className="px-8 py-5 bg-gray-900 text-white font-black rounded-2xl hover:bg-orange-500 transition-all uppercase tracking-widest text-xs"
                >
                  Apply
                </button>
              </div>
              {discount > 0 && (
                <p className="mt-4 text-sm font-bold text-green-600 flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" /> Đã áp dụng mã giảm giá thành công! (-{discount.toLocaleString()}đ)
                </p>
              )}
            </section>

            {/* Policy Notes */}
            <div className="flex flex-col sm:flex-row gap-6">
              <PolicyBox title="Chính sách hoàn tiền" desc="Hoàn tiền 100% nếu dịch vụ không đúng như cam kết hoặc có sai sót từ nhà cung cấp." />
              <PolicyBox title="Chính sách hủy lịch" desc="Hủy lịch miễn phí trước 24h. Hủy sau thời gian này có thể phát sinh phí dịch vụ." />
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <aside className="space-y-8 lg:sticky lg:top-28">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
              <div className="bg-gray-900 p-8 text-white relative">
                 <div className="absolute top-4 right-4 opacity-10">
                    <ShieldCheck className="w-16 h-16" />
                 </div>
                 <h3 className="text-lg font-black uppercase tracking-widest mb-1">Booking Info</h3>
                 <p className="text-xs font-bold text-gray-400">Xem lại thông tin lịch hẹn của bạn</p>
              </div>

              <div className="p-8 space-y-6">
                <SummaryRow label="Nhà cung cấp" value={bookingSummary.provider} />
                <SummaryRow label="Dịch vụ" value={bookingSummary.service} />
                <SummaryRow label="Thú cưng" value={bookingSummary.pet} />
                <SummaryRow label="Ngày & Giờ" value={`${bookingSummary.date} • ${bookingSummary.time}`} />
              </div>

              <div className="px-8 pb-8 space-y-4">
                <div className="flex justify-between items-center text-sm font-bold text-gray-400 uppercase tracking-widest">
                   <span>Giá gốc</span>
                   <span>{bookingSummary.price.toLocaleString()}đ</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center text-sm font-bold text-green-600 uppercase tracking-widest">
                    <span>Giảm giá</span>
                    <span>-{discount.toLocaleString()}đ</span>
                  </div>
                )}
                <div className="h-px bg-gray-100 my-4"></div>
                <div className="flex justify-between items-end">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Tổng thanh toán</span>
                      <span className="text-3xl font-black text-orange-600 leading-none">{finalTotal.toLocaleString()}<span className="text-sm font-bold ml-1">đ</span></span>
                   </div>
                   <button 
                    onClick={() => window.location.href = '/booking-success'}
                    className="flex-1 ml-6 py-5 bg-orange-500 text-white font-black rounded-2xl shadow-xl shadow-orange-100 hover:bg-orange-600 transition-all active:scale-95 uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
                   >
                     Pay Now <ArrowRight className="w-4 h-4" />
                   </button>
                </div>

                <button 
                  onClick={() => window.location.href = '/invoice'}
                  className="w-full py-4 text-[10px] font-black text-gray-400 hover:text-orange-600 transition-colors uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <Info className="w-4 h-4" /> View Invoice Details
                </button>
              </div>
            </div>

            {/* Security Tip */}
            <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex gap-4">
               <ShieldCheck className="w-10 h-10 text-blue-600 shrink-0" />
               <p className="text-[10px] font-bold text-blue-700 leading-relaxed uppercase tracking-tight">
                 Mọi giao dịch trên PetGo đều được mã hóa SSL 256-bit để đảm bảo an toàn tuyệt đối cho thông tin của bạn.
               </p>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
};

// Component con: Hàng tóm tắt
const SummaryRow = ({ label, value }) => (
  <div>
    <span className="block text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">{label}</span>
    <span className="block text-sm font-bold text-gray-700 leading-tight">{value}</span>
  </div>
);

// Component con: Box chính sách
const PolicyBox = ({ title, desc }) => (
  <div className="flex-1 p-6 bg-gray-100/50 rounded-[2rem] border border-gray-100">
    <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-2 flex items-center gap-2">
      <Info className="w-3.5 h-3.5 text-orange-500" /> {title}
    </h4>
    <p className="text-xs font-medium text-gray-500 leading-relaxed italic">
      "{desc}"
    </p>
  </div>
);

export default PaymentPage;