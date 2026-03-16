import React from 'react';
import { 
  ArrowLeft, 
  Download, 
  Printer, 
  CheckCircle2, 
  CreditCard, 
  Calendar, 
  Clock, 
  User, 
  PawPrint, 
  FileText,
  ShieldCheck,
  ListOrdered
} from 'lucide-react';

const InvoicePage = () => {
  // Dữ liệu mẫu hóa đơn
  const invoice = {
    id: "INV-99201",
    bookingId: "BK001985",
    date: "10 Tháng 5, 2025",
    method: "Thẻ tín dụng (Visa **** 1234)",
    status: "Đã thanh toán",
    provider: {
      name: "Paws & Relax Luxury Spa",
      address: "123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
      phone: "090 123 4567"
    },
    service: {
      name: "Gói Tắm Thư Giãn",
      price: 200000,
      discount: 50000,
      finalTotal: 150000
    },
    pet: "LuLu (Corgi)",
    appointment: {
      date: "20 Tháng 5, 2025",
      time: "10:00 AM"
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-20 print:bg-white">
      {/* Header PetGo - Ẩn khi in */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <button 
                onClick={() => window.location.href = `/bookings/${invoice.bookingId}`}
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

      <main className="max-w-3xl mx-auto px-4 py-10 sm:py-16">
        {/* Title Area - Ẩn khi in */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 print:hidden">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">Invoice / Receipt</h1>
            <p className="text-gray-500 font-medium">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
          </div>
          <div className="flex gap-3">
             <button 
                onClick={handlePrint}
                className="p-3 bg-white border border-gray-200 rounded-2xl text-gray-600 hover:text-orange-600 hover:border-orange-200 transition-all shadow-sm flex items-center gap-2 font-bold text-xs"
             >
               <Printer className="w-4 h-4" /> Print
             </button>
             <button className="p-3 bg-gray-900 text-white rounded-2xl hover:bg-orange-500 transition-all shadow-lg flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
               <Download className="w-4 h-4" /> Download PDF
             </button>
          </div>
        </div>

        {/* The Invoice Document */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden relative print:shadow-none print:border-none print:rounded-none">
           {/* Top Branding Section */}
           <div className="bg-gray-900 p-10 text-white flex flex-col sm:flex-row justify-between items-start gap-8">
              <div>
                 <div className="flex items-center gap-2 mb-4">
                    <div className="bg-orange-500 p-1.5 rounded-lg">
                      <PawPrint className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-2xl font-black tracking-tight">Pet<span className="text-orange-500">Go</span></span>
                 </div>
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                    PetGo Marketplace Platform<br />
                    Láng Hòa Lạc, Thạch Thất, Hà Nội<br />
                    petgo.contact@gmail.com
                 </p>
              </div>
              <div className="text-right">
                 <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-green-500/30">
                    {invoice.status}
                 </span>
                 <h2 className="text-3xl font-black mt-4 tracking-tight">#{invoice.id}</h2>
                 <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Mã Booking: {invoice.bookingId}</p>
              </div>
           </div>

           {/* Content Section */}
           <div className="p-10 space-y-12">
              {/* Payment Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 <div>
                    <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4">Thông tin thanh toán</h3>
                    <div className="space-y-4">
                       <InfoBlock icon={<Calendar className="w-4 h-4 text-orange-500" />} label="Ngày thanh toán" value={invoice.date} />
                       <InfoBlock icon={<CreditCard className="w-4 h-4 text-orange-500" />} label="Phương thức" value={invoice.method} />
                    </div>
                 </div>
                 <div>
                    <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4">Đơn vị cung cấp</h3>
                    <div className="space-y-1">
                       <p className="text-sm font-black text-gray-900">{invoice.provider.name}</p>
                       <p className="text-xs font-medium text-gray-500 leading-relaxed">{invoice.provider.address}</p>
                       <p className="text-xs font-bold text-gray-400 mt-2 italic">Tel: {invoice.provider.phone}</p>
                    </div>
                 </div>
              </div>

              {/* Service Breakdown Table */}
              <div className="bg-gray-50 rounded-[2rem] overflow-hidden border border-gray-100">
                 <div className="p-6 border-b border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div>
                       <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Dịch vụ & Thú cưng</h4>
                       <p className="text-base font-black text-gray-900">{invoice.service.name}</p>
                       <p className="text-xs font-bold text-orange-600 uppercase tracking-tight mt-1 flex items-center gap-1">
                          <PawPrint className="w-3 h-3" /> Pet: {invoice.pet}
                       </p>
                    </div>
                    <div className="sm:text-right">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Thời gian lịch hẹn</p>
                       <div className="flex sm:justify-end items-center gap-2 text-sm font-bold text-gray-700">
                          <Calendar className="w-4 h-4" /> {invoice.appointment.date}
                          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                          <Clock className="w-4 h-4" /> {invoice.appointment.time}
                       </div>
                    </div>
                 </div>
                 
                 <div className="p-8 space-y-4">
                    <div className="flex justify-between items-center text-sm">
                       <span className="font-bold text-gray-400 uppercase tracking-widest">Phí dịch vụ</span>
                       <span className="font-black text-gray-900">{invoice.service.price.toLocaleString()}đ</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                       <span className="font-bold text-green-600 uppercase tracking-widest">Giảm giá (PetGo Promo)</span>
                       <span className="font-black text-green-600">-{invoice.service.discount.toLocaleString()}đ</span>
                    </div>
                    <div className="h-px bg-gray-200 my-4 border-t border-dashed"></div>
                    <div className="flex justify-between items-end">
                       <div>
                          <div className="flex items-center gap-2 mb-1">
                             <ShieldCheck className="w-4 h-4 text-blue-500" />
                             <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Tổng cộng cuối cùng</span>
                          </div>
                          <p className="text-4xl font-black text-orange-600 tracking-tight">
                             {invoice.service.finalTotal.toLocaleString()}<span className="text-sm font-bold ml-1 uppercase">đ</span>
                          </p>
                       </div>
                       <div className="text-right hidden sm:block">
                          <CheckCircle2 className="w-12 h-12 text-green-100 mb-2" />
                          <p className="text-[10px] font-black text-green-600 uppercase tracking-tighter">Giao dịch đã xác thực</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Bottom Message */}
              <div className="text-center pt-4 border-t border-gray-50">
                 <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-loose">
                    Hóa đơn này được tạo tự động bởi hệ thống đặt lịch PetGo.<br />
                    Mọi thắc mắc vui lòng liên hệ <span className="text-gray-900">1900 1234</span> hoặc email hỗ trợ.
                 </p>
              </div>
           </div>

           {/* Visual Decoration */}
           <div className="h-2 bg-orange-500 w-full"></div>
        </div>

        {/* Secondary Actions - Ẩn khi in */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 print:hidden">
           <button 
              onClick={() => window.location.href = '/my-bookings'}
              className="flex-1 py-5 bg-white border-2 border-gray-100 text-gray-900 font-black rounded-2xl hover:border-orange-500 hover:text-orange-600 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-3"
           >
              <ListOrdered className="w-4 h-4" /> Go to My Bookings
           </button>
           <button 
              onClick={() => window.location.href = `/bookings/${invoice.bookingId}`}
              className="flex-1 py-5 bg-gray-900 text-white font-black rounded-2xl shadow-xl shadow-gray-200 hover:bg-orange-500 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-3"
           >
              <FileText className="w-4 h-4" /> Back to Booking Detail
           </button>
        </div>
      </main>
    </div>
  );
};

// Component con: Khối thông tin nhỏ
const InfoBlock = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1 p-1.5 bg-gray-100 rounded-lg shrink-0">
      {icon}
    </div>
    <div>
       <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-0.5">{label}</p>
       <p className="text-sm font-bold text-gray-700 leading-tight">{value}</p>
    </div>
  </div>
);

export default InvoicePage;