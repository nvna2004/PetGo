import React, { useState } from 'react';
import { 
  Check, 
  ChevronDown, 
  ChevronUp, 
  PawPrint, 
  User, 
  Calendar, 
  Zap, 
  Tag, 
  Headphones, 
  Bell, 
  ShieldCheck, 
  Star,
  ArrowRight,
  Sparkles,
  CreditCard,
  Heart
} from 'lucide-react';

const MembershipPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  // Quyền lợi thành viên
  const benefits = [
    { 
      title: "Giảm giá dịch vụ", 
      desc: "Tiết kiệm lên đến 20% cho các gói spa và grooming chuyên sâu.", 
      icon: <Tag className="w-6 h-6" />,
      color: "bg-orange-100 text-orange-600"
    },
    { 
      title: "Ưu tiên đặt lịch", 
      desc: "Luôn có slot trống trong các khung giờ cao điểm cho thành viên.", 
      icon: <Calendar className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-600"
    },
    { 
      title: "Voucher hàng tháng", 
      desc: "Nhận bộ mã giảm giá trị giá lên đến 500k mỗi tháng.", 
      icon: <Sparkles className="w-6 h-6" />,
      color: "bg-purple-100 text-purple-600"
    },
    { 
      title: "Nhắc lịch tiêm phòng", 
      desc: "Hệ thống tự động nhắc lịch y tế định kỳ cho thú cưng.", 
      icon: <Bell className="w-6 h-6" />,
      color: "bg-green-100 text-green-600"
    },
    { 
      title: "Hỗ trợ ưu tiên", 
      desc: "Kênh chăm sóc khách hàng riêng biệt, phản hồi trong 60 giây.", 
      icon: <Headphones className="w-6 h-6" />,
      color: "bg-red-100 text-red-600"
    },
    { 
      title: "Review Verified", 
      desc: "Đánh giá của bạn được gắn huy hiệu tin cậy, tăng trọng số đóng góp.", 
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "bg-yellow-100 text-yellow-600"
    },
  ];

  // Các gói dịch vụ
  const plans = [
    {
      name: "Basic Plan",
      price: "Free",
      period: "",
      features: ["Đặt lịch cơ bản", "Lưu hồ sơ thú cưng", "Nhắc lịch cơ bản"],
      buttonText: "Current Plan",
      link: "#",
      current: true,
      popular: false
    },
    {
      name: "Pro Plan",
      price: "99.000",
      period: "VND / month",
      features: ["Giảm giá 10% dịch vụ", "Voucher hàng tháng", "Ưu tiên slot booking", "Lưu lịch sử dịch vụ"],
      buttonText: "Upgrade to Pro",
      link: "/membership-payment?plan=pro",
      current: false,
      popular: true
    },
    {
      name: "Premium Plan",
      price: "199.000",
      period: "VND / month",
      features: ["Giảm giá 20% dịch vụ", "Voucher lớn mỗi tháng", "Ưu tiên booking", "Hỗ trợ khách hàng ưu tiên", "Khuyến mãi độc quyền"],
      buttonText: "Upgrade to Premium",
      link: "/membership-payment?plan=premium",
      current: false,
      popular: false
    }
  ];

  // Câu hỏi thường gặp
  const faqs = [
    { q: "Làm thế nào để tôi hủy gói thành viên?", a: "Bạn có thể hủy gói bất cứ lúc nào trong phần cài đặt Profile. Quyền lợi vẫn sẽ được duy trì cho đến hết kỳ hạn thanh toán hiện tại." },
    { q: "Tôi có thể nâng cấp gói sau này không?", a: "Tất nhiên! Bạn có thể nâng cấp từ Basic lên Pro hoặc Premium bất cứ lúc nào. Hệ thống sẽ tự động tính toán phần chênh lệch." },
    { q: "Giảm giá có áp dụng cho tất cả dịch vụ?", a: "Đúng vậy, mã giảm giá thành viên áp dụng cho toàn bộ spa, clinic và hotel đối tác chính thức của PetGo." }
  ];

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
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-500 uppercase tracking-widest">
            <a href="/" className="hover:text-orange-600 transition-colors">Home</a>
            <a href="/search" className="hover:text-orange-600 transition-colors">Services</a>
            <a href="/my-bookings" className="hover:text-orange-600 transition-colors">My Bookings</a>
            <a href="/membership" className="text-orange-600">Membership</a>
            <div className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center shadow-sm cursor-pointer" onClick={() => window.location.href = '/profile'}>
                <User className="w-5 h-5 text-orange-600" />
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-5 -z-0">
            <Sparkles className="w-64 h-64 text-orange-500 rotate-12" />
        </div>
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-[10px] font-black uppercase tracking-widest mb-6">
            <Zap className="w-3.5 h-3.5 fill-current" /> Exclusive for pet lovers
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-gray-900 mb-6 tracking-tighter leading-none">
            PetGo <span className="text-blue-600">Membership</span>
          </h1>
          <p className="text-gray-500 text-lg sm:text-xl max-w-2xl mb-12 font-medium">
            Save more and enjoy exclusive benefits for your pet care services. Join the club of 10,000+ happy pets today!
          </p>
          
          <div className="relative w-full max-w-lg">
             <div className="aspect-video rounded-[3rem] bg-orange-100 overflow-hidden shadow-2xl border-8 border-white">
                <img 
                    src="https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?auto=format&fit=crop&q=80&w=800" 
                    alt="Happy pets" 
                    className="w-full h-full object-cover"
                />
             </div>
             <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 animate-bounce">
                <div className="flex items-center gap-4 text-left">
                    <div className="p-3 bg-green-100 rounded-2xl">
                        <Heart className="w-6 h-6 text-green-600 fill-current" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase">Saving Tips</p>
                        <p className="text-sm font-black text-gray-900">Giảm ngay 20% mỗi lần đặt</p>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 tracking-tight uppercase">Tại sao nên nâng cấp?</h2>
          <div className="w-16 h-1.5 bg-blue-600 rounded-full mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className={`${benefit.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-tight">{benefit.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-24 bg-blue-900 text-white relative">
        <div className="absolute top-0 inset-x-0 h-24 bg-white rounded-b-[4rem] sm:rounded-b-[8rem]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 pt-10">
            <h2 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight">Chọn gói của bạn</h2>
            <p className="text-blue-200 font-medium italic">Tiết kiệm nhiều hơn khi nâng cấp gói thành viên.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={`flex flex-col rounded-[3rem] p-8 sm:p-10 border transition-all duration-500 relative ${
                  plan.popular 
                  ? 'bg-white text-gray-900 border-white shadow-2xl scale-105 z-10' 
                  : 'bg-blue-800/40 border-blue-700 text-white'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full shadow-lg tracking-widest">
                    Most Popular
                  </div>
                )}
                <div className="mb-10">
                  <h3 className={`text-xl font-black uppercase tracking-widest mb-6 ${plan.popular ? 'text-blue-600' : 'text-blue-300'}`}>{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-black tracking-tighter">{plan.price}</span>
                    <span className={`text-sm font-bold opacity-60`}>{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-5 mb-12 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.popular ? 'bg-blue-100 text-blue-600' : 'bg-blue-700 text-white'}`}>
                        <Check className="w-3 h-3 stroke-[4px]" />
                      </div>
                      <span className="text-sm font-bold opacity-90">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => window.location.href = plan.link}
                  className={`w-full py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all active:scale-95 ${
                    plan.current 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : plan.popular 
                      ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700' 
                      : 'bg-white text-blue-900 hover:bg-blue-50'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-black text-gray-900 mb-10 uppercase tracking-widest">Cách thức hoạt động</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12">
            <StepCard step="1" title="Choose a plan" desc="Chọn gói thành viên phù hợp với số lượng thú cưng và nhu cầu của bạn." />
            <ArrowRight className="hidden md:block w-8 h-8 text-gray-200" />
            <StepCard step="2" title="Complete payment" desc="Thanh toán an toàn qua nhiều phương thức linh hoạt trên PetGo." />
            <ArrowRight className="hidden md:block w-8 h-8 text-gray-200" />
            <StepCard step="3" title="Start booking" desc="Tận hưởng quyền ưu tiên và tiết kiệm ngay lập tức cho mọi dịch vụ." />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-black text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <button 
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full p-6 sm:p-8 flex justify-between items-center text-left"
              >
                <span className="font-black text-gray-700 leading-relaxed">{faq.q}</span>
                {activeFaq === i ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-gray-300" />}
              </button>
              {activeFaq === i && (
                <div className="px-6 sm:px-8 pb-8 animate-in fade-in slide-in-from-top-2">
                  <div className="h-px bg-gray-50 mb-6"></div>
                  <p className="text-gray-500 font-medium leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="max-w-7xl mx-auto px-4 pt-10">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-[3.5rem] p-10 sm:p-20 text-white text-center relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 left-0 p-10 opacity-10">
              <PawPrint className="w-64 h-64 -rotate-12" />
           </div>
           <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-black mb-6 tracking-tight">Join PetGo Membership today</h2>
              <p className="text-orange-100 text-lg mb-12 font-medium">Save more on every booking and give your pet the premium care they deserve.</p>
              <button 
                onClick={() => window.location.href = '/membership-payment?plan=pro'}
                className="px-12 py-5 bg-white text-orange-600 font-black rounded-2xl shadow-xl hover:scale-105 transition-all uppercase tracking-widest text-sm flex items-center gap-3 mx-auto"
              >
                Start Membership <Zap className="w-4 h-4 fill-current" />
              </button>
           </div>
        </div>
      </section>

      {/* Footer Minimal */}
      <footer className="mt-24 py-12 border-t border-gray-100 text-center">
         <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4 italic">Trusted by millions of pets worldwide</p>
         <div className="flex justify-center gap-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <a href="/" className="hover:text-orange-500">Home</a>
            <a href="/search" className="hover:text-orange-500">Search</a>
            <a href="/help-center" className="hover:text-orange-500">Help Center</a>
         </div>
      </footer>
    </div>
  );
};

// Component con: Bước thực hiện
const StepCard = ({ step, title, desc }) => (
  <div className="flex flex-col items-center max-w-[240px]">
    <div className="w-16 h-16 rounded-full bg-white border-4 border-blue-50 flex items-center justify-center text-2xl font-black text-blue-600 shadow-lg mb-6">
      {step}
    </div>
    <h4 className="text-lg font-black text-gray-900 mb-3 uppercase tracking-tight">{title}</h4>
    <p className="text-gray-400 text-sm font-medium leading-relaxed">{desc}</p>
  </div>
);

export default MembershipPage;