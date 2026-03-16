import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Camera, 
  PawPrint, 
  ChevronDown,
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const AddPetPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate('/profile'), 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => navigate('/profile')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600 group-hover:text-orange-500" />
          </button>
          <span className="font-black text-xl tracking-tight">Thêm thú cưng mới</span>
          <div className="w-10"></div> {/* Spacer */}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 overflow-hidden border border-white">
          <div className="p-8 sm:p-12">
            {success ? (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-green-50 rounded-[2.5rem] flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-12 h-12 text-green-500 animate-bounce" />
                </div>
                <h2 className="text-3xl font-black mb-2">Tuyệt vời!</h2>
                <p className="text-gray-500 font-bold">Thú cưng của bạn đã được thêm thành công.</p>
                <p className="text-gray-400 text-sm mt-1">Đang chuyển hướng về trang cá nhân...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Photo Upload Section */}
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-[2.5rem] bg-orange-50 border-4 border-dashed border-orange-200 flex flex-col items-center justify-center overflow-hidden transition-all group-hover:bg-orange-100 group-hover:border-orange-300">
                      <Camera className="w-10 h-10 text-orange-400 mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Tải ảnh lên</span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-orange-500 p-2.5 rounded-2xl shadow-lg border-4 border-white transition-transform group-hover:scale-110">
                      <Info className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <p className="text-xs font-bold text-gray-400 mt-4 uppercase tracking-widest italic">Hình ảnh rõ nét giúp nhận diện tốt hơn</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormInput label="Tên thú cưng" placeholder="VD: Mochi, Lu, ..." />
                  <FormSelect label="Loại thú cưng" options={['Chó', 'Mèo', 'Chim', 'Khác']} />
                  <FormInput label="Giống loài" placeholder="VD: Golden Retriever" />
                  <FormInput label="Tuổi (tháng/năm)" placeholder="VD: 2 tuổi" />
                  <FormInput label="Cân nặng (kg)" placeholder="VD: 15kg" />
                  <FormSelect label="Giới tính" options={['Đực', 'Cái']} />
                </div>

                <div className="p-6 bg-blue-50/50 rounded-[2rem] border border-blue-50 flex gap-4">
                  <AlertCircle className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-black text-blue-900">Ghi chú sức khỏe</p>
                    <p className="text-xs font-bold text-blue-600/80 leading-relaxed italic">Vui lòng cập nhật các thông tin về tiêm chủng và dị ứng để nhà cung cấp dịch vụ nắm rõ nhất.</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => navigate('/profile')}
                    className="flex-1 px-8 py-4 bg-gray-100 text-gray-400 rounded-2xl font-black text-sm hover:bg-gray-200 hover:text-gray-600 transition-all active:scale-95"
                  >
                    Hủy bỏ
                  </button>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="flex-[2] px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm shadow-xl shadow-gray-200 hover:bg-orange-500 hover:shadow-orange-100 transition-all active:scale-95 flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                        Đang lưu...
                      </>
                    ) : (
                      <>
                        <PawPrint className="w-5 h-5" />
                        Xác nhận thêm
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const FormInput = ({ label, placeholder }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <input 
      type="text" 
      placeholder={placeholder}
      className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-orange-500 transition-all outline-none font-bold text-gray-900 placeholder:text-gray-300"
    />
  </div>
);

const FormSelect = ({ label, options }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative">
      <select 
        className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-orange-500 transition-all outline-none font-bold text-gray-900 appearance-none cursor-pointer"
      >
        {options.map(opt => <option key={opt}>{opt}</option>)}
      </select>
      <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500 pointer-events-none" />
    </div>
  </div>
);

export default AddPetPage;
