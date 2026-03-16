import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Star,
  ChevronLeft,
  PawPrint,
  User,
  Send,
  Camera,
  Smile,
  Heart
} from 'lucide-react';

const ReviewPage = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { bookingId } = useParams();

  const bookingInfo = {
    provider: "Paws & Relax Luxury Spa",
    service: "Gói Tắm Thư Giãn",
    date: "15 May, 2025",
    pet: "LuLu (Corgi)",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=200"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 font-sans">
        <div className="text-center animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-orange-500 fill-current" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">Cảm ơn bạn!</h2>
          <p className="text-gray-500 mb-8 font-medium">Đánh giá của bạn giúp PetGo và cộng đồng thú cưng tốt đẹp hơn mỗi ngày.</p>
          <button
            onClick={() => navigate("/")}
            className="px-10 py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-orange-500 transition-all uppercase tracking-widest text-xs"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
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

      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-gray-900 mb-2">Write a Review</h1>
          <p className="text-gray-500 font-medium italic">Chia sẻ trải nghiệm của bạn về dịch vụ này nhé!</p>
        </div>

        <div className="bg-white rounded-[2rem] p-6 mb-8 border border-gray-100 shadow-sm flex items-center gap-5">
          <img src={bookingInfo.image} alt={bookingInfo.provider} className="w-20 h-20 rounded-2xl object-cover shadow-sm" />
          <div className="flex-1">
            <h3 className="font-black text-gray-900 leading-tight mb-1">{bookingInfo.provider}</h3>
            <p className="text-xs font-bold text-orange-600 uppercase tracking-wider">{bookingInfo.service}</p>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Ngày hẹn: {bookingInfo.date}</p>
          </div>
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Thú cưng</span>
            <span className="text-sm font-bold text-gray-700">{bookingInfo.pet}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-gray-100 shadow-sm">
          <div className="text-center mb-10">
            <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Bạn đánh giá thế nào?</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="transition-transform active:scale-90 hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 sm:w-12 sm:h-12 transition-colors ${
                      (hover || rating) >= star
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-100'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="mt-4 text-orange-500 font-black text-xs uppercase tracking-widest animate-in fade-in slide-in-from-top-2">
                {rating === 5 ? 'Tuyệt vời!' : rating === 4 ? 'Rất tốt' : rating === 3 ? 'Bình thường' : rating === 2 ? 'Không tốt lắm' : 'Rất tệ'}
              </p>
            )}
          </div>

          <div className="mb-10">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                <Smile className="w-4 h-4 text-orange-500" /> Nhận xét của bạn
              </label>
              <span className="text-[10px] font-bold text-gray-300">{comment.length}/500</span>
            </div>
            <textarea
              rows="5"
              maxLength="500"
              placeholder="Write your experience... Hãy chia sẻ cảm nhận của bạn về cách nhân viên chăm sóc bé nhé."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-6 bg-gray-50 border-2 border-transparent rounded-[2rem] text-sm font-medium focus:bg-white focus:border-orange-500 outline-none transition-all placeholder:text-gray-300"
            ></textarea>
          </div>

          <div className="mb-12">
            <button type="button" className="flex items-center gap-3 px-6 py-4 border-2 border-dashed border-gray-100 rounded-2xl hover:bg-gray-50 hover:border-orange-200 transition-all w-full justify-center group text-gray-400 hover:text-orange-500">
              <Camera className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold uppercase tracking-widest">Thêm ảnh thực tế</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={rating === 0}
            className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
              rating === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-900 text-white shadow-xl shadow-gray-200 hover:bg-orange-500 hover:shadow-orange-100 active:scale-95'
            }`}
          >
            Submit Review <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full">
            <PawPrint className="w-4 h-4 text-orange-500" />
            <p className="text-[10px] font-black text-orange-700 uppercase tracking-widest">Góp ý của bạn giúp PetGo ngày càng hoàn thiện</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReviewPage;