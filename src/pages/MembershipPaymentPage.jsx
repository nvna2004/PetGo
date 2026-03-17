import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Check, 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  PawPrint, 
  Wallet, 
  Building, 
  Ticket, 
  CheckCircle2, 
  Info,
  Crown,
  Zap,
  ArrowRight,
  Shield
} from 'lucide-react';

const MembershipPaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // Dữ liệu mẫu (Giả định gói Pro đã chọn từ trang /membership)
  const selectedPlan = {
    name: "Pro Membership",
    price: 99000,
    cycle: "Monthly",
    isPopular: true,
    features: [
      "Giảm 10% cho mọi dịch vụ thú cưng",
      "Bộ voucher 200k mỗi tháng",
      "Ưu tiên slot đặt lịch cao điểm",
      "Nhắc lịch grooming và tiêm phòng",
      "Hỗ trợ ưu tiên 24/7"
    ],
    nextBilling: "17 Tháng 04, 2026"
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'PETGO20') {
      setIsPromoApplied(true);
    }
  };

  const discount = isPromoApplied ? 20000 : 0;
  const vat = 0; // Giả định bao gồm phí hoặc không thuế
  const total = selectedPlan.price - discount + vat;

  const paymentOptions = [
    { id: 'momo', name: 'Ví MoMo', icon: <Wallet className="w-5 h-5 text-pink-500" />, desc: 'Thanh toán nhanh qua App MoMo' },
    { id: 'vnpay', name: 'VNPay', icon: <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-[8px] text-white font-bold italic">VN</div>, desc: 'Cổng thanh toán QR Code ngân hàng' },
    { id: 'card', name: 'Credit / Debit Card', icon: <CreditCard className="w-5 h-5 text-gray-700" />, desc: 'Visa, Mastercard, JCB' },
    { id: 'bank', name: 'Chuyển khoản', icon: <Building className="w-5 h-5 text-blue-500" />, desc: 'Chuyển khoản ngân hàng trực tiếp' },
  ];

  const faqs = [
    { q: "Tôi có thể hủy bất cứ lúc nào không?", a: "Có, bạn có thể hủy gói thành viên bất cứ lúc nào trong phần cài đặt tài khoản. Quyền lợi vẫn duy trì cho đến hết kỳ hạn." },
    { q: "Khi nào quyền lợi bắt đầu có hiệu lực?", a: "Quyền lợi thành viên của bạn sẽ được kích hoạt ngay sau khi thanh toán thành công." },
    { q: "Gói có tự động gia hạn vào tháng tới?", a: "Hệ thống sẽ mặc định tự động gia hạn để đảm bảo trải nghiệm của bé không bị gián đoạn. Bạn có thể tắt tính năng này bất cứ lúc nào." }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-20">
      {/* Header tối giản */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
            <div className="bg-orange-500 p-1.5 rounded-lg shadow-lg">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tight">Pet<span className="text-orange-500">Go</span></span>
          </div>

          {/* Progress Steps */}
          <div className="hidden sm:flex items-center gap-4">
             <Step text="Chọn gói" completed />
             <div className="w-8 h-px bg-gray-200"></div>
             <Step text="Thanh toán" active />
             <div className="w-8 h-px bg-gray-200"></div>
             <Step text="Hoàn tất" />
          </div>

          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
            <Lock className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2 tracking-tight">Complete Your Payment</h1>
          <p className="text-gray-500 font-medium">Mở khóa quyền lợi độc quyền và tiết kiệm hơn cho mọi lịch hẹn chăm sóc thú cưng.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Cột trái: Membership Summary */}
          <div className="lg:col-span-5 space-y-6">
            <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
               <div className="bg-blue-600 p-8 text-white relative">
                  <div className="absolute top-4 right-4 opacity-20">
                     <Crown className="w-20 h-20 rotate-12" />
                  </div>
                  {selectedPlan.isPopular && (
                    <div className="inline-block bg-white/20 backdrop-blur-md text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest mb-4 border border-white/20">
                      Most Popular Plan
                    </div>
                  )}
                  <h3 className="text-2xl font-black mb-1">{selectedPlan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black">{selectedPlan.price.toLocaleString()}đ</span>
                    <span className="text-sm font-bold opacity-70">/ {selectedPlan.cycle}</span>
                  </div>
               </div>

               <div className="p-8">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Quyền lợi của bạn</h4>
                  <ul className="space-y-4 mb-8">
                    {selectedPlan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-0.5 w-5 h-5 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 text-blue-600 stroke-[4px]" />
                        </div>
                        <span className="text-sm font-bold text-gray-600 leading-tight">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6 border-t border-gray-50 space-y-3">
                    <div className="flex justify-between text-xs font-bold">
                       <span className="text-gray-400 uppercase tracking-tighter">Tự động gia hạn</span>
                       <span className="text-green-600 uppercase tracking-widest">Đang bật</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold">
                       <span className="text-gray-400 uppercase tracking-tighter">Kỳ thanh toán tới</span>
                       <span className="text-gray-900">{selectedPlan.nextBilling}</span>
                    </div>
                  </div>
               </div>
            </section>

            {/* Trust Info */}
            <div className="p-8 bg-gray-900 rounded-[2.5rem] text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-10">
                  <ShieldCheck className="w-24 h-24" />
               </div>
               <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                        <Shield className="w-5 h-5 text-orange-500" />
                     </div>
                     <p className="text-sm font-black uppercase tracking-widest leading-none">Secure Checkout</p>
                  </div>
                  <p className="text-xs text-gray-400 font-medium leading-relaxed">
                    Mọi giao dịch thanh toán trên PetGo đều được mã hóa SSL 256-bit và xử lý thông qua các đối tác tin cậy. Chúng tôi không lưu trữ thông tin thẻ trực tiếp.
                  </p>
               </div>
            </div>
          </div>

          {/* Cột phải: Payment Method & Checkout */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Promo Code Section */}
            <section className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
               <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-3">
                  <Ticket className="w-5 h-5 text-orange-500" /> Promo Code / Voucher
               </h3>
               <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="text" 
                    placeholder="Enter promo code (Thử: PETGO20)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 p-5 bg-gray-50 border-none rounded-2xl font-bold uppercase outline-none focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all placeholder:capitalize"
                  />
                  <button 
                    onClick={handleApplyPromo}
                    className="px-10 py-5 bg-gray-900 text-white font-black rounded-2xl hover:bg-orange-500 transition-all uppercase tracking-widest text-xs"
                  >
                    Apply
                  </button>
               </div>
               {isPromoApplied && (
                 <div className="mt-4 flex items-center gap-2 text-green-600 text-xs font-bold animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4" /> Mã giảm giá đã được áp dụng (-20.000đ)
                 </div>
               )}
            </section>

            {/* Payment Methods Section */}
            <section className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-gray-100 shadow-sm">
               <h3 className="text-xl font-black text-gray-900 mb-8">Choose Payment Method</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {paymentOptions.map((opt) => (
                    <label 
                      key={opt.id}
                      className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col gap-4 ${paymentMethod === opt.id ? 'border-blue-600 bg-blue-50/30' : 'border-gray-50 bg-white hover:border-gray-200'}`}
                    >
                       <input 
                        type="radio" 
                        name="payment" 
                        className="hidden" 
                        checked={paymentMethod === opt.id}
                        onChange={() => setPaymentMethod(opt.id)}
                       />
                       <div className="flex justify-between items-start">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === opt.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                            {opt.icon}
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === opt.id ? 'border-blue-600 bg-blue-600' : 'border-gray-200'}`}>
                             {paymentMethod === opt.id && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                          </div>
                       </div>
                       <div>
                          <p className="text-sm font-black text-gray-900">{opt.name}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{opt.desc}</p>
                       </div>
                    </label>
                  ))}
               </div>

               {/* Credit Card Form - Chỉ hiển thị nếu chọn card */}
               {paymentMethod === 'card' && (
                 <div className="space-y-4 p-6 bg-gray-50 rounded-3xl animate-in slide-in-from-top-4 duration-300">
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Card Holder Name</label>
                       <input type="text" placeholder="NGUYEN VAN A" className="w-full p-4 bg-white border-none rounded-xl text-sm font-bold uppercase outline-none focus:ring-2 focus:ring-blue-100" />
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Card Number</label>
                       <div className="relative">
                          <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-4 bg-white border-none rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-100" />
                          <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Expiry Date</label>
                          <input type="text" placeholder="MM/YY" className="w-full p-4 bg-white border-none rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-100" />
                       </div>
                       <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">CVV</label>
                          <input type="text" placeholder="***" className="w-full p-4 bg-white border-none rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-100" />
                       </div>
                    </div>
                 </div>
               )}
            </section>

            {/* Billing Summary & CTA */}
            <section className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-gray-100 shadow-xl relative overflow-hidden">
               <h3 className="text-xl font-black text-gray-900 mb-8">Billing Summary</h3>
               
               <div className="space-y-4 mb-10">
                  <SummaryRow label="Membership Fee" value={`${selectedPlan.price.toLocaleString()}đ`} />
                  <SummaryRow label="Discount" value={isPromoApplied ? "-20.000đ" : "0đ"} isDiscount />
                  <SummaryRow label="VAT (0%)" value="0đ" />
                  <div className="h-px bg-gray-100 my-4"></div>
                  <div className="flex justify-between items-end">
                     <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-1">Total Payment</span>
                        <span className="text-4xl font-black text-blue-600 tracking-tighter leading-none">{total.toLocaleString()}<span className="text-sm font-bold ml-1 uppercase">đ</span></span>
                     </div>
                     <div className="text-right hidden sm:block">
                        <p className="text-[9px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full mb-1">Savings: {discount.toLocaleString()}đ</p>
                        <p className="text-[9px] font-bold text-gray-400">Thanh toán định kỳ mỗi tháng</p>
                     </div>
                  </div>
               </div>

               <div className="space-y-6">
                  <div className="space-y-3">
                     <Checkbox label="Tôi đồng ý với các Điều khoản & Chính sách của PetGo Membership" defaultChecked />
                     <Checkbox label="Tôi đồng ý cho phép tự động gia hạn gói dịch vụ hàng tháng" defaultChecked />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-50">
                     <button 
                        onClick={() => window.location.href = '/membership'}
                        className="flex-1 py-5 border-2 border-gray-100 text-gray-400 font-black rounded-2xl hover:bg-gray-50 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
                     >
                        <ArrowLeft className="w-4 h-4" /> Back to Plans
                     </button>
                     <button 
                        onClick={() => window.location.href = '/membership-success'}
                        className="flex-[2] py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 hover:scale-[1.02] transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-3 active:scale-95 group"
                     >
                        Pay Now <Zap className="w-4 h-4 fill-current group-hover:animate-pulse" />
                     </button>
                  </div>
                  <p className="text-[10px] text-gray-400 text-center font-bold uppercase tracking-widest">
                    Bạn có thể hủy đăng ký bất cứ lúc nào trong phần cài đặt tài khoản.
                  </p>
               </div>
            </section>
          </div>
        </div>

        {/* FAQ Section ở cuối trang */}
        <section className="mt-20 max-w-3xl mx-auto px-4">
           <h2 className="text-2xl font-black text-gray-900 mb-8 text-center uppercase tracking-tight">Thanh toán an tâm hơn</h2>
           <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full p-6 flex justify-between items-center text-left group"
                  >
                    <span className="font-black text-gray-700 text-sm group-hover:text-blue-600 transition-colors leading-relaxed">{faq.q}</span>
                    {activeFaq === i ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4 text-gray-300" />}
                  </button>
                  {activeFaq === i && (
                    <div className="px-6 pb-6 animate-in fade-in slide-in-from-top-2">
                       <p className="text-sm text-gray-500 font-medium leading-relaxed italic border-l-4 border-blue-600 pl-4 bg-blue-50/50 py-3 rounded-r-xl">
                          {faq.a}
                       </p>
                    </div>
                  )}
                </div>
              ))}
           </div>
        </section>

        {/* Bottom Trust Partners */}
        <div className="mt-20 flex flex-wrap justify-center items-center gap-10 opacity-30 grayscale">
            <div className="font-black text-xl tracking-tighter">VISA</div>
            <div className="font-black text-xl tracking-tighter">Mastercard</div>
            <div className="font-black text-xl tracking-tighter italic">MoMo</div>
            <div className="font-black text-xl tracking-tighter uppercase italic">VNPay</div>
        </div>
      </main>
    </div>
  );
};

// Component con: Step Indicator
const Step = ({ text, active, completed }) => (
  <div className={`flex items-center gap-2 ${active ? 'text-blue-600' : completed ? 'text-green-600' : 'text-gray-300'}`}>
     <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${active ? 'bg-blue-600 text-white shadow-lg' : completed ? 'bg-green-100 text-green-600' : 'bg-gray-100'}`}>
        {completed ? <Check className="w-3 h-3 stroke-[4px]" /> : '•'}
     </div>
     <span className="text-[10px] font-black uppercase tracking-widest">{text}</span>
  </div>
);

// Component con: Hàng tóm tắt phí
const SummaryRow = ({ label, value, isDiscount }) => (
  <div className="flex justify-between items-center text-sm font-bold">
    <span className="text-gray-400 uppercase tracking-tighter">{label}</span>
    <span className={isDiscount ? 'text-green-600' : 'text-gray-900'}>{value}</span>
  </div>
);

// Component con: Checkbox tùy chỉnh
const Checkbox = ({ label, defaultChecked }) => (
  <label className="flex items-start gap-3 cursor-pointer group">
    <div className="relative mt-0.5">
       <input type="checkbox" className="peer hidden" defaultChecked={defaultChecked} />
       <div className="w-5 h-5 bg-white border-2 border-gray-100 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all flex items-center justify-center group-hover:border-blue-300">
          <Check className="w-3.5 h-3.5 text-white stroke-[4px]" />
       </div>
    </div>
    <span className="text-xs font-bold text-gray-400 group-hover:text-gray-600 transition-colors leading-snug">{label}</span>
  </label>
);

export default MembershipPaymentPage;