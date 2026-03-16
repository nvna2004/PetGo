import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  PawPrint,
  User,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

const BookingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const providerIdFromUrl = searchParams.get("providerId");
  const serviceIdFromUrl = searchParams.get("serviceId");
  const timeFromUrl = searchParams.get("time");

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pet: "",
    service: serviceIdFromUrl || "",
    provider: providerIdFromUrl || "",
    date: "",
    time: timeFromUrl || ""
  });
  const [errors, setErrors] = useState({});

  const pets = [
    { id: 'p1', name: 'LuLu (Corgi)', type: 'Dog' },
    { id: 'p2', name: 'Mimi (Mèo Anh)', type: 'Cat' }
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
    if (step === 1 && !formData.pet) newErrors.pet = "Vui lòng chọn thú cưng";
    if (step === 2 && !formData.service) newErrors.service = "Vui lòng chọn dịch vụ";
    if (step === 3 && !formData.provider) newErrors.provider = "Vui lòng chọn nhà cung cấp";
    if (step === 4 && !formData.date) newErrors.date = "Vui lòng chọn ngày";
    if (step === 5 && !formData.time) newErrors.time = "Vui lòng chọn giờ";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep(prev => Math.min(prev + 1, 6));
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const isFormComplete = formData.pet && formData.service && formData.provider && formData.date && formData.time;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-1.5 rounded-lg">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tight">Pet<span className="text-orange-500">Go</span></span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Đang đăng nhập</p>
              <p className="text-sm font-black text-gray-900">Anh Minh</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white shadow-sm flex items-center justify-center">
              <User className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 tracking-tight">Book an Appointment</h1>
          <p className="text-gray-500 font-medium">Chỉ vài bước đơn giản để dành điều tốt nhất cho thú cưng của bạn.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex justify-between items-center mb-8">
              {[1, 2, 3, 4, 5].map((s) => (
                <React.Fragment key={s}>
                  <div className={`flex flex-col items-center gap-2 ${step >= s ? 'text-orange-600' : 'text-gray-300'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all ${step === s ? 'bg-orange-500 text-white shadow-lg' : step > s ? 'bg-orange-100 text-orange-600' : 'bg-gray-100'}`}>
                      {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                    </div>
                  </div>
                  {s < 5 && <div className={`flex-1 h-1 mx-2 rounded-full ${step > s ? 'bg-orange-200' : 'bg-gray-100'}`}></div>}
                </React.Fragment>
              ))}
            </div>

            <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm min-h-[400px] flex flex-col">
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                    <div className="w-2 h-8 bg-orange-500 rounded-full"></div> 1. Chọn thú cưng
                  </h2>
                  <div className="space-y-4">
                    {pets.map(pet => (
                      <div
                        key={pet.id}
                        onClick={() => handleInputChange('pet', pet.name)}
                        className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex justify-between items-center ${formData.pet === pet.name ? 'border-orange-500 bg-orange-50/30' : 'border-gray-100 hover:border-orange-200'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${formData.pet === pet.name ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                            <PawPrint className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-black text-gray-900">{pet.name}</p>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{pet.type}</p>
                          </div>
                        </div>
                        {formData.pet === pet.name && <CheckCircle2 className="text-orange-500 w-6 h-6" />}
                      </div>
                    ))}
                    <button className="w-full p-5 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                      + Thêm thú cưng mới
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                    <div className="w-2 h-8 bg-orange-500 rounded-full"></div> 2. Chọn dịch vụ
                  </h2>
                  <div className="relative">
                    <select
                      value={formData.service}
                      onChange={(e) => handleInputChange('service', e.target.value)}
                      className="w-full p-5 bg-gray-50 border-none rounded-2xl text-lg font-bold appearance-none outline-none focus:ring-2 focus:ring-orange-500/20"
                    >
                      <option value="">-- Chọn dịch vụ --</option>
                      {services.map(s => <option key={s.id} value={s.name}>{s.name} - {s.price}đ</option>)}
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                    <div className="w-2 h-8 bg-orange-500 rounded-full"></div> 3. Chọn nhà cung cấp
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {providers.map(p => (
                      <div
                        key={p.id}
                        onClick={() => handleInputChange('provider', p.name)}
                        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${formData.provider === p.name ? 'border-orange-500 bg-orange-50' : 'border-gray-100 hover:border-orange-100'}`}
                      >
                        <p className="font-black text-gray-900">{p.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                    <div className="w-2 h-8 bg-orange-500 rounded-full"></div> 4. Chọn ngày
                  </h2>
                  <div className="grid grid-cols-7 gap-2">
                    {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(d => (
                      <div key={d} className="text-center text-[10px] font-black text-gray-400 uppercase mb-2">{d}</div>
                    ))}
                    {[...Array(31)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handleInputChange('date', `${i + 1} May, 2025`)}
                        className={`aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all ${formData.date === `${i + 1} May, 2025` ? 'bg-orange-500 text-white shadow-lg' : 'hover:bg-orange-50 text-gray-700'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                    <div className="w-2 h-8 bg-orange-500 rounded-full"></div> 5. Chọn khung giờ
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {timeSlots.map(slot => (
                      <button
                        key={slot}
                        onClick={() => handleInputChange('time', slot)}
                        className={`py-4 rounded-2xl font-black text-sm transition-all ${formData.time === slot ? 'bg-gray-900 text-white shadow-xl' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 6 && (
                <div className="flex flex-col items-center text-center py-10 animate-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-2">Booking Confirmed!</h2>
                  <p className="text-gray-500 max-w-sm mb-8">Lịch hẹn của bạn đã được ghi nhận. Chúng tôi đã gửi thông tin chi tiết qua email và tin nhắn.</p>
                  <button
                    onClick={() => navigate("/my-bookings")}
                    className="px-10 py-4 bg-orange-500 text-white font-black rounded-2xl shadow-lg shadow-orange-100 hover:scale-105 transition-all"
                  >
                    Xem lịch của tôi
                  </button>
                </div>
              )}

              {Object.keys(errors).length > 0 && (
                <div className="mt-6 flex items-center gap-2 text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl border border-red-100 animate-in fade-in">
                  <AlertCircle className="w-4 h-4" />
                  <span>{Object.values(errors)[0]}</span>
                </div>
              )}

              {step < 6 && (
                <div className="mt-auto pt-10 flex justify-between items-center">
                  <button
                    onClick={prevStep}
                    disabled={step === 1}
                    className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors disabled:opacity-0"
                  >
                    <ChevronLeft className="w-4 h-4" /> Quay lại
                  </button>
                  <button
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black shadow-lg hover:bg-orange-500 transition-all active:scale-95 group"
                  >
                    Tiếp tục <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <PawPrint className="w-24 h-24" />
              </div>

              <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-2">
                Booking Summary
              </h3>

              <div className="space-y-6">
                <SummaryItem icon={<PawPrint className="w-4 h-4" />} label="Thú cưng" value={formData.pet || "Chưa chọn"} />
                <SummaryItem icon={<CheckCircle2 className="w-4 h-4" />} label="Dịch vụ" value={formData.service || "Chưa chọn"} />
                <SummaryItem icon={<User className="w-4 h-4" />} label="Nhà cung cấp" value={formData.provider || "Chưa chọn"} />
                <SummaryItem icon={<CalendarIcon className="w-4 h-4" />} label="Ngày hẹn" value={formData.date || "Chưa chọn"} />
                <SummaryItem icon={<Clock className="w-4 h-4" />} label="Giờ hẹn" value={formData.time || "Chưa chọn"} />
              </div>

              <div className="mt-10 pt-8 border-t-2 border-dashed border-gray-100">
                <div className="flex justify-between items-end mb-8">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Tổng thanh toán</span>
                  <span className="text-3xl font-black text-orange-600">
                    {services.find(s => s.name === formData.service)?.price || "0"}<span className="text-sm font-bold ml-1">đ</span>
                  </span>
                </div>

                <button
                  disabled={!isFormComplete || step === 6}
                  onClick={() => {
                    if (isFormComplete) {
                      navigate("/bookings/BK001985");
                    }
                  }}
                  className="w-full py-5 bg-orange-500 disabled:bg-gray-100 disabled:text-gray-400 text-white font-black rounded-2xl shadow-xl shadow-orange-100 hover:bg-orange-600 transition-all active:scale-95 uppercase tracking-widest text-xs"
                >
                  Confirm Booking
                </button>
                <p className="text-[10px] text-gray-400 text-center mt-4 font-bold">
                  Bằng cách xác nhận, bạn đồng ý với các điều khoản của PetGo.
                </p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-3xl p-6 text-white flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400">Cần hỗ trợ?</p>
                <p className="text-sm font-black">Hotline: 1900 1234</p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

const SummaryItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-orange-500 shrink-0">
      {icon}
    </div>
    <div>
      <span className="block text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">{label}</span>
      <span className={`block text-sm font-bold ${value === "Chưa chọn" ? 'text-gray-300 italic' : 'text-gray-700'}`}>{value}</span>
    </div>
  </div>
);

export default BookingPage;
