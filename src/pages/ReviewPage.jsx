import React, { useState } from 'react';
import { 
  ArrowLeft, 
  PawPrint, 
  User, 
  Star, 
  Heart, 
  Send, 
  Smile, 
  Camera,
  Home,
  AlertCircle,
  Calendar,
  X
} from 'lucide-react';

const ReviewPage = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dữ liệu mẫu từ booking được truyền qua (Giả định từ Route /reviews/create/BK001)
  const booking = {
    id: "BK001985",
    provider: "Paws & Relax Luxury Spa",
    service: "Gói Tắm Thư Giãn",
    date: "20 Tháng 5, 2025",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=200"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Vui lòng chọn số sao đánh giá!");
      return;
    }
    // Thực tế sẽ gọi API ở đây
    setIsSubmitted(true);
    
    // Tự động chuyển hướng sau 2 giây
    setTimeout(() => {
      window.location.href = '/my-bookings';
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 font-sans text-center">
        <div className="animate-in zoom-in duration-500 flex flex-col items-center">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-orange-100/50">
            <Heart className="w-12 h-12 text-orange-500 fill-current" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">Cảm ơn bạn!</h2>
          <p className="text-gray-500 mb-8 font-medium">Đánh giá của bạn giúp cộng đồng PetGo ngày càng tốt đẹp hơn.</p>
          <div className="flex items-center gap-2 text-xs font-bold text-orange-600 animate-pulse">
             Đang quay lại danh sách lịch hẹn...
          </div>
        </div>
      </div>
    );
  }

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
          <div className="flex items-center gap-4">
            <button 
                onClick={() => window.location.href = '/'} 
                className="p-2 text-gray-400 hover:text-orange-500 transition-colors hidden sm:block"
                title="Về trang chủ"
            >
              <Home className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center shadow-sm">
              <User className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10 sm:py-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Write a Review</h1>
          <p className="text-gray-500 font-medium italic">Chia sẻ cảm nhận của bạn để cộng đồng PetGo cùng biết nhé!</p>
        </div>

        {/* Booking Summary Card */}
        <div className="bg-white rounded-[2rem] p-6 mb-8 border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-gray-100">
            <img src={booking.image} alt={booking.provider} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="font-black text-gray-900 leading-tight mb-1">{booking.provider}</h3>
            <p className="text-xs font-bold text-orange-600 uppercase tracking-wider">{booking.service}</p>
            <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">
              <Calendar className="w-3 h-3" /> {booking.date}
            </div>
          </div>
        </div>

        {/* Review Form Container */}
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-gray-100 shadow-sm">
          <form onSubmit={handleSubmit}>
            
            {/* Star Rating Section */}
            <div className="flex flex-col items-center mb-12">
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-6">Bạn đánh giá thế nào?</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="transition-transform active:scale-90 hover:scale-110 outline-none"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                  >
                    <Star 
                      className={`w-10 h-10 sm:w-12 sm:h-12 transition-colors duration-200 ${
                        (hover || rating) >= star 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-100'
                      }`} 
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <div className="mt-4 px-4 py-1 bg-orange-50 rounded-full animate-in fade-in slide-in-from-top-2">
                  <span className="text-orange-500 font-black text-[10px] uppercase tracking-widest">
                    {rating === 5 ? 'Rất hài lòng 😍' : 
                     rating === 4 ? 'Hài lòng 😄' : 
                     rating === 3 ? 'Bình thường 🙂' : 
                     rating === 2 ? 'Không tốt lắm 😕' : 'Thất vọng 😞'}
                  </span>
                </div>
              )}
            </div>

            {/* Feedback Comment Section */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <label className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                  <Smile className="w-4 h-4 text-orange-500" /> Trải nghiệm của bạn
                </label>
                <span className="text-[10px] font-bold text-gray-300 italic">{comment.length}/500</span>
              </div>
              <textarea
                rows="6"
                placeholder="Write your experience... Nhân viên phục vụ như thế nào? Thú cưng của bạn có thoải mái không?"
                className="w-full p-6 bg-gray-50 border-2 border-transparent rounded-[2rem] text-sm font-medium focus:bg-white focus:border-orange-500 outline-none transition-all placeholder:text-gray-300"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={500}
              ></textarea>
            </div>

            {/* Media Upload Placeholder */}
            <div className="mb-12">
               <button 
                type="button" 
                className="w-full py-6 border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center gap-2 hover:bg-orange-50 hover:border-orange-200 transition-all group"
               >
                  <Camera className="w-6 h-6 text-gray-300 group-hover:text-orange-500 transition-colors" />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-700">Thêm hình ảnh thực tế</span>
               </button>
            </div>

            {/* Submit Actions */}
            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className={`w-full py-5 font-black rounded-2xl shadow-xl transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-3 group active:scale-95 ${
                    rating > 0 
                    ? 'bg-gray-900 text-white shadow-gray-200 hover:bg-orange-500 hover:shadow-orange-100' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                }`}
              >
                Submit Review <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              
              <div className="flex items-center justify-between pt-4">
                 <button
                    type="button"
                    onClick={() => window.location.href = `/bookings/${booking.id}`}
                    className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors flex items-center gap-1"
                 >
                    <X className="w-3.5 h-3.5" /> Hủy bỏ
                 </button>
                 <button
                    type="button"
                    onClick={() => window.location.href = '/'}
                    className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-orange-600 transition-colors flex items-center gap-1"
                 >
                    Về trang chủ
                 </button>
              </div>
            </div>
          </form>
        </div>

        {/* Community Trust Note */}
        <div className="mt-12 flex items-start gap-4 p-6 bg-blue-50 rounded-[2rem] border border-blue-100">
           <div className="p-2 bg-white rounded-xl shadow-sm">
             <AlertCircle className="w-5 h-5 text-blue-500" />
           </div>
           <div>
              <h4 className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-1">Cộng đồng PetGo</h4>
              <p className="text-xs font-medium text-blue-700 leading-relaxed">
                 Đánh giá của bạn sẽ hiển thị công khai trên hồ sơ của nhà cung cấp để giúp các chủ thú cưng khác đưa ra quyết định tốt hơn. Hãy đánh giá trung thực và khách quan nhé!
              </p>
           </div>
        </div>
      </main>
    </div>
  );
};

export default ReviewPage;