import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  PawPrint, 
  User, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  ChevronDown,
  CreditCard,
  MapPin
} from 'lucide-react';

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pet: "",
    service: "",
    provider: "Paws & Relax Luxury Spa", // Mặc định từ trang chi tiết
    date: "",
    time: ""
  });
  const [errors, setErrors] = useState({});

  // Dữ liệu mẫu
  const pets = [
    { id: 'p1', name: 'LuLu (Corgi)', type: 'Chó' },
    { id: 'p2', name: 'Mimi (Mèo Anh)', type: 'Mèo' }
  ];

  const services = [
    { id: 's1', name: 'Gói Tắm Thư Giãn', price: '200.000' },
    { id: 's2', name: 'Cắt Tỉa Tạo Kiểu', price: '350.000' },
    { id: 's3', name: 'Khám Tổng Quát', price: '150.000' }
  ];

  const providers = [
    { id: 'pr1', name: 'Paws & Relax Luxury Spa' },
    { id: 'pr2', name: 'Happy Tails Clinic' },
    { id: 'pr3', name: 'Pet Paradise Resort' }
  ];

  const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1 && !formData.pet) newErrors.pet = "Vui lòng chọn thú cưng của bạn";
    if (step === 2 && !formData.service) newErrors.service = "Vui lòng chọn dịch vụ cần đặt";
    if (step === 3 && !formData.provider) newErrors.provider = "Vui lòng chọn nhà cung cấp";
    if (step === 4 && !formData.date) newErrors.date = "Vui lòng chọn ngày hẹn";
    if (step === 5 && !formData.time) newErrors.time = "Vui lòng chọn khung giờ trống";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
        if (step < 5) setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleConfirm = () => {
    if (validateStep()) {
        // Chuyển hướng đến trang thanh toán
        window.location.href = '/payment';
    }
  };

  const isFormComplete = formData.pet && formData.service && formData.provider && formData.date && formData.time;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Header PetGo */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
            <div className="bg-orange-500 p-1.5 rounded-lg">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tight">Pet<span className="text-orange-500">Go</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => window.location.href = '/my-bookings'} className="text-sm font-bold text-gray-500 hover:text-orange-600">Lịch hẹn của tôi</button>
            <div className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center">
                <User className="w-5 h-5 text-orange-600" />
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 sm:py-16">
        <div className="flex items-center gap-4 mb-8">
            <button 
                onClick={() => window.location.href = '/providers/1'}
                className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Book an Appointment</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Step-by-step Form Container */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Steps Indicator */}
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex justify-between items-center overflow-x-auto no-scrollbar">
              {[1, 2, 3, 4, 5].map((s) => (
                <React.Fragment key={s}>
                  <div className={`flex flex-col items-center gap-2 shrink-0 ${step >= s ? 'text-orange-600' : 'text-gray-300'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all ${step === s ? 'bg-orange-500 text-white shadow-lg' : step > s ? 'bg-orange-100 text-orange-600' : 'bg-gray-100'}`}>
                      {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                    </div>
                  </div>
                  {s < 5 && <div className={`flex-1 h-1 min-w-[20px] mx-2 rounded-full ${step > s ? 'bg-orange-200' : 'bg-gray-100'}`}></div>}
                </React.Fragment>
              ))}
            </div>

            {/* Form Step Content */}
            <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm min-h-[400px] flex flex-col">
              
              {/* Step 1: Select Pet */}
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-black text-gray-900 mb-6">1. Chọn thú cưng của bạn</h2>
                  <div className="relative group mb-4">
                    <select 
                        value={formData.pet}
                        onChange={(e) => handleInputChange('pet', e.target.value)}
                        className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] text-lg font-bold appearance-none outline-none focus:bg-white focus:border-orange-500 transition-all"
                    >
                        <option value="">-- Chọn Pet --</option>
                        {pets.map(pet => <option key={pet.id} value={pet.name}>{pet.name} ({pet.type})</option>)}
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                  <button className="text-orange-600 font-bold text-sm hover:underline">+ Thêm thú cưng mới</button>
                </div>
              )}

              {/* Step 2: Select Service */}
              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-black text-gray-900 mb-6">2. Chọn dịch vụ chăm sóc</h2>
                  <div className="relative mb-6">
                    <select 
                        value={formData.service}
                        onChange={(e) => handleInputChange('service', e.target.value)}
                        className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] text-lg font-bold appearance-none outline-none focus:bg-white focus:border-orange-500 transition-all"
                    >
                        <option value="">-- Chọn Dịch vụ --</option>
                        {services.map(s => <option key={s.id} value={s.name}>{s.name} - {s.price}đ</option>)}
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Step 3: Select Provider */}
              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-black text-gray-900 mb-6">3. Chọn nhà cung cấp</h2>
                  <div className="relative">
                    <select 
                        value={formData.provider}
                        onChange={(e) => handleInputChange('provider', e.target.value)}
                        className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] text-lg font-bold appearance-none outline-none focus:bg-white focus:border-orange-500 transition-all"
                    >
                        {providers.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Step 4: Select Date */}
              {step === 4 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-black text-gray-900 mb-6">4. Chọn ngày đặt lịch</h2>
                  <div className="grid grid-cols-7 gap-2 bg-gray-50 p-6 rounded-[2rem]">
                    {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map(d => (
                      <div key={d} className="text-center text-[10px] font-black text-gray-400 uppercase mb-2">{d}</div>
                    ))}
                    {[...Array(30)].map((_, i) => (
                      <button 
                        key={i}
                        type="button"
                        onClick={() => handleInputChange('date', `${i + 1} Tháng 05, 2025`)}
                        className={`aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all ${formData.date === `${i + 1} Tháng 05, 2025` ? 'bg-orange-500 text-white shadow-lg' : 'hover:bg-orange-100 text-gray-700 bg-white'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Select Time */}
              {step === 5 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-black text-gray-900 mb-6">5. Chọn khung giờ hẹn</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {timeSlots.map(slot => (
                      <button 
                        key={slot}
                        type="button"
                        onClick={() => handleInputChange('time', slot)}
                        className={`py-4 rounded-2xl font-black text-sm transition-all ${formData.time === slot ? 'bg-gray-900 text-white shadow-xl' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Error Message Display */}
              {Object.keys(errors).length > 0 && (
                <div className="mt-8 flex items-center gap-2 text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl border border-red-100 animate-in fade-in">
                  <AlertCircle className="w-4 h-4" />
                  <span>{Object.values(errors)[0]}</span>
                </div>
              )}

              {/* Footer Buttons */}
              <div className="mt-auto pt-10 flex justify-between items-center">
                <button 
                  onClick={prevStep}
                  disabled={step === 1}
                  className={`flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                >
                  <ChevronLeft className="w-4 h-4" /> Quay lại
                </button>
                
                {step < 5 ? (
                    <button 
                        onClick={nextStep}
                        className="flex items-center gap-2 bg-gray-900 text-white px-10 py-4 rounded-2xl font-black shadow-lg hover:bg-orange-500 transition-all active:scale-95 group"
                    >
                        Tiếp theo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                ) : (
                    <button 
                        onClick={handleConfirm}
                        className="flex items-center gap-2 bg-orange-500 text-white px-10 py-4 rounded-2xl font-black shadow-lg hover:bg-orange-600 transition-all active:scale-95"
                    >
                        Xác nhận đặt lịch
                    </button>
                )}
              </div>
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="absolute -top-10 -right-10 p-10 opacity-5">
                 <PawPrint className="w-32 h-32" />
              </div>
              
              <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-2 relative z-10">
                Booking Summary
              </h3>

              <div className="space-y-6 relative z-10">
                <SummaryItem icon={<PawPrint className="w-4 h-4" />} label="Thú cưng" value={formData.pet || "Chưa chọn"} />
                <SummaryItem icon={<CheckCircle2 className="w-4 h-4" />} label="Dịch vụ" value={formData.service || "Chưa chọn"} />
                <SummaryItem icon={<MapPin className="w-4 h-4" />} label="Nhà cung cấp" value={formData.provider || "Chưa chọn"} />
                <SummaryItem icon={<CalendarIcon className="w-4 h-4" />} label="Ngày hẹn" value={formData.date || "Chưa chọn"} />
                <SummaryItem icon={<Clock className="w-4 h-4" />} label="Giờ hẹn" value={formData.time || "Chưa chọn"} />
              </div>

              <div className="mt-10 pt-8 border-t-2 border-dashed border-gray-100 relative z-10">
                 <div className="flex justify-between items-end mb-8">
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tổng thanh toán</span>
                   <span className="text-3xl font-black text-orange-600">
                     {services.find(s => s.name === formData.service)?.price || "0"}<span className="text-sm font-bold ml-1">đ</span>
                   </span>
                 </div>
                 
                 <button 
                   disabled={!isFormComplete}
                   onClick={handleConfirm}
                   className="w-full py-5 bg-orange-500 disabled:bg-gray-100 disabled:text-gray-400 text-white font-black rounded-[1.5rem] shadow-xl shadow-orange-100 hover:bg-orange-600 transition-all active:scale-95 uppercase tracking-widest text-xs"
                 >
                   Confirm Booking
                 </button>
                 <p className="text-[10px] text-gray-400 text-center mt-4 font-bold leading-relaxed px-4">
                   Bằng cách xác nhận, bạn đồng ý với các chính sách đặt chỗ và bảo mật của PetGo.
                 </p>
              </div>
            </div>

            {/* Support Box */}
            <div className="bg-gray-900 rounded-[2rem] p-6 text-white flex items-center gap-4">
               <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                 <AlertCircle className="w-6 h-6 text-orange-500" />
               </div>
               <div>
                 <p className="text-[10px] font-black text-gray-500 uppercase">Cần hỗ trợ?</p>
                 <p className="text-sm font-bold">Hotline: 1900 1234</p>
               </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
};

// Sub-component: Summary Item Row
const SummaryItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-orange-500 shrink-0">
      {icon}
    </div>
    <div className="flex-1 overflow-hidden">
      <span className="block text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">{label}</span>
      <span className={`block text-sm font-bold truncate ${value === "Chưa chọn" ? 'text-gray-300 italic' : 'text-gray-700'}`}>{value}</span>
    </div>
  </div>
);

export default App;