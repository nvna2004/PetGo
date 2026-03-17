// ============================================================
//  PetGo — Sample Data
// ============================================================

const DATA = {
  users: [
    { id:'U001', name:'Nguyễn Văn An',   email:'an.nguyen@email.com',   phone:'0901234567', joined:'12/01/2025', bookings:8,  status:'active'  },
    { id:'U002', name:'Trần Thị Bích',   email:'bich.tran@email.com',   phone:'0912345678', joined:'15/01/2025', bookings:3,  status:'active'  },
    { id:'U003', name:'Lê Minh Cường',   email:'cuong.le@email.com',    phone:'0923456789', joined:'20/01/2025', bookings:0,  status:'locked'  },
    { id:'U004', name:'Phạm Thu Hà',     email:'ha.pham@email.com',     phone:'0934567890', joined:'25/01/2025', bookings:12, status:'active'  },
    { id:'U005', name:'Hoàng Đức Hiệp',  email:'hiep.hoang@email.com',  phone:'0945678901', joined:'01/02/2025', bookings:5,  status:'active'  },
    { id:'U006', name:'Đỗ Thị Lan',      email:'lan.do@email.com',      phone:'0956789012', joined:'05/02/2025', bookings:1,  status:'pending' },
    { id:'U007', name:'Ngô Văn Minh',    email:'minh.ngo@email.com',    phone:'0967123456', joined:'10/02/2025', bookings:7,  status:'active'  },
    { id:'U008', name:'Vũ Thị Nga',      email:'nga.vu@email.com',      phone:'0978234567', joined:'14/02/2025', bookings:2,  status:'active'  },
  ],

  partners: [
    { id:'P001', name:'Pawsome Spa & Grooming', type:'Spa',       address:'123 Lê Lợi, Q1, TP.HCM',          phone:'0281234567', joined:'05/01/2025', bookings:145, rating:4.8, status:'verified',  docs:'✓' },
    { id:'P002', name:'VetCare Clinic',          type:'Thú y',    address:'45 Nguyễn Huệ, Q1, TP.HCM',       phone:'0282345678', joined:'10/01/2025', bookings:89,  rating:4.9, status:'verified',  docs:'✓' },
    { id:'P003', name:'Happy Paws Hotel',        type:'Lưu trú',  address:'67 Trần Hưng Đạo, Q5, TP.HCM',   phone:'0283456789', joined:'20/01/2025', bookings:56,  rating:4.5, status:'pending',   docs:'?' },
    { id:'P004', name:'Pet Training Pro',        type:'Huấn luyện','address':'89 CMT8, Q3, TP.HCM',         phone:'0284567890', joined:'01/02/2025', bookings:23,  rating:4.7, status:'pending',   docs:'?' },
    { id:'P005', name:'Furry Friends Spa',       type:'Spa',       address:'12 Pasteur, Q3, TP.HCM',         phone:'0285678901', joined:'10/02/2025', bookings:0,   rating:0,   status:'reviewing', docs:'⟳' },
    { id:'P006', name:'Mèo Mập Spa',             type:'Spa',       address:'34 Lý Thường Kiệt, Q10',         phone:'0286789012', joined:'15/02/2025', bookings:0,   rating:0,   status:'reviewing', docs:'⟳' },
  ],

  bookings: [
    { id:'BK001', customer:'Nguyễn Văn An',  pet:'Mochi (Poodle)',      service:'Tắm & Cắt tỉa',   partner:'Pawsome Spa',     date:'17/03/2025', time:'09:00', amount:350000, status:'confirmed'  },
    { id:'BK002', customer:'Trần Thị Bích',  pet:'Luna (Mèo Ba Tư)',   service:'Khám tổng quát',   partner:'VetCare Clinic',  date:'17/03/2025', time:'10:30', amount:200000, status:'pending'    },
    { id:'BK003', customer:'Phạm Thu Hà',    pet:'Max (Golden)',        service:'Spa VIP',           partner:'Pawsome Spa',     date:'17/03/2025', time:'14:00', amount:580000, status:'in_progress'},
    { id:'BK004', customer:'Hoàng Đức Hiệp', pet:'Bông (Chó Phốc)',    service:'Cắt tỉa cơ bản',   partner:'Furry Friends',   date:'16/03/2025', time:'15:00', amount:150000, status:'completed'  },
    { id:'BK005', customer:'Lê Minh Cường',  pet:'Gấu (Husky)',        service:'Gửi thú cưng',     partner:'Happy Paws Hotel',date:'15/03/2025', time:'08:00', amount:420000, status:'cancelled'  },
    { id:'BK006', customer:'Ngô Văn Minh',   pet:'Titi (Chihuahua)',   service:'Tiêm phòng',        partner:'VetCare Clinic',  date:'18/03/2025', time:'09:30', amount:250000, status:'confirmed'  },
    { id:'BK007', customer:'Vũ Thị Nga',     pet:'Mimi (Mèo Anh)',     service:'Tắm trị liệu da',   partner:'Pawsome Spa',     date:'18/03/2025', time:'11:00', amount:320000, status:'pending'    },
  ],

  reviews: [
    { id:'R001', user:'Nguyễn Văn An',  partner:'Pawsome Spa',     rating:5, text:'Dịch vụ tuyệt vời, nhân viên nhiệt tình. Mochi trông rất đẹp sau khi spa!', date:'16/03/2025', status:'visible'  },
    { id:'R002', user:'Trần Thị Bích',  partner:'VetCare Clinic',  rating:4, text:'Bác sĩ rất chuyên nghiệp, giải thích rõ ràng tình trạng của Luna.',         date:'15/03/2025', status:'visible'  },
    { id:'R003', user:'Ẩn danh',        partner:'Happy Paws Hotel',rating:1, text:'Chó về nhà có vết thương lạ, phòng bẩn, không khuyến khích!',               date:'14/03/2025', status:'reported' },
    { id:'R004', user:'Phạm Thu Hà',    partner:'Pawsome Spa',     rating:5, text:'Max rất thích đến đây, nhân viên rất yêu thú cưng.',                        date:'13/03/2025', status:'visible'  },
    { id:'R005', user:'Hoàng Đức Hiệp', partner:'VetCare Clinic',  rating:5, text:'Bác sĩ tận tâm, giải thích kỹ lưỡng, phòng khám sạch sẽ.',                  date:'12/03/2025', status:'visible'  },
  ],

  services: [
    { id:'SV001', name:'Tắm & sấy cơ bản',   category:'Grooming',  partner:'Pawsome Spa',     price:'80k–180k',  duration:'60 phút',  status:'active'  },
    { id:'SV002', name:'Cắt tỉa tạo kiểu',   category:'Grooming',  partner:'Pawsome Spa',     price:'150k–350k', duration:'90 phút',  status:'active'  },
    { id:'SV003', name:'Spa VIP trọn gói',    category:'Spa',       partner:'Pawsome Spa',     price:'400k–800k', duration:'180 phút', status:'active'  },
    { id:'SV004', name:'Khám tổng quát',      category:'Thú y',     partner:'VetCare Clinic',  price:'150k–300k', duration:'45 phút',  status:'active'  },
    { id:'SV005', name:'Tiêm phòng',          category:'Thú y',     partner:'VetCare Clinic',  price:'200k–500k', duration:'30 phút',  status:'active'  },
    { id:'SV006', name:'Gửi thú cưng',        category:'Lưu trú',   partner:'Happy Paws Hotel',price:'150k/ngày', duration:'1 ngày+',  status:'pending' },
    { id:'SV007', name:'Huấn luyện cơ bản',   category:'Huấn luyện','partner':'Pet Training',  price:'500k/khóa', duration:'5 buổi',   status:'pending' },
  ],

  vouchers: [
    { code:'PETGO20',    type:'Phần trăm', value:'20%',       min:200000, expiry:'31/03/2025', used:145, limit:500,  status:'active'  },
    { code:'FPTSTUDENT', type:'Phần trăm', value:'15%',       min:100000, expiry:'30/06/2025', used:67,  limit:1000, status:'active'  },
    { code:'NEWPET50',   type:'Cố định',   value:'50,000đ',   min:150000, expiry:'15/04/2025', used:89,  limit:200,  status:'active'  },
    { code:'FLASH30',    type:'Phần trăm', value:'30%',       min:300000, expiry:'18/03/2025', used:203, limit:300,  status:'expired' },
    { code:'WELCOME100', type:'Cố định',   value:'100,000đ',  min:250000, expiry:'01/05/2025', used:12,  limit:100,  status:'active'  },
  ],

  notifications: [
    { icon:'📅', bg:'var(--bg-info)',    title:'Booking mới #BK008 từ Ngô Thị Mai',          time:'5 phút trước',   type:'booking' },
    { icon:'⭐', bg:'var(--bg-warning)', title:'Đánh giá mới 5 sao từ Phạm Thu Hà',          time:'15 phút trước',  type:'review'  },
    { icon:'🏪', bg:'var(--bg-success)', title:'Đối tác Mèo Mập Spa cần duyệt hồ sơ',        time:'1 giờ trước',    type:'partner' },
    { icon:'⚠️', bg:'var(--bg-danger)',  title:'Review vi phạm từ Anonymous cần xử lý',      time:'2 giờ trước',    type:'alert'   },
    { icon:'💳', bg:'var(--bg-info)',    title:'Thanh toán gói Pro từ Pawsome Spa thành công',time:'3 giờ trước',    type:'payment' },
    { icon:'🔒', bg:'var(--bg-warning)', title:'3 lần đăng nhập sai từ IP lạ - U003',        time:'5 giờ trước',    type:'security'},
  ],

  logs: [
    { time:'10:45', action:'Duyệt đối tác Pawsome Spa',             who:'admin@petgo.vn' },
    { time:'10:30', action:'Ẩn review #R003 - vi phạm quy định',    who:'admin@petgo.vn' },
    { time:'09:55', action:'Tạo voucher PETGO20',                    who:'admin@petgo.vn' },
    { time:'09:20', action:'Khóa tài khoản user U003',               who:'admin@petgo.vn' },
    { time:'08:45', action:'Cập nhật banner trang chủ',              who:'admin@petgo.vn' },
    { time:'08:10', action:'Xuất báo cáo tháng 2/2025',             who:'admin@petgo.vn' },
    { time:'07:50', action:'Tạo flash sale "Mừng xuân -30%"',        who:'admin@petgo.vn' },
  ],

  // Partner specific data
  partnerBookings: [
    { id:'BK001', customer:'Nguyễn Văn An',  pet:'Mochi (Poodle, 3kg)',     service:'Tắm & Cắt tỉa',   date:'17/03/2025', time:'09:00', amount:350000, status:'confirmed',   note:'Dị ứng sữa tắm hương hoa' },
    { id:'BK003', customer:'Phạm Thu Hà',    pet:'Max (Golden, 28kg)',       service:'Spa VIP',           date:'17/03/2025', time:'14:00', amount:580000, status:'in_progress', note:'Tính cách thân thiện'      },
    { id:'BK007', customer:'Vũ Thị Nga',     pet:'Mimi (Mèo Anh, 4kg)',    service:'Tắm trị liệu da',   date:'18/03/2025', time:'10:00', amount:320000, status:'pending',     note:''                          },
    { id:'BK008', customer:'Ngô Thị Mai',    pet:'Lily (Shih Tzu, 5kg)',    service:'Cắt tỉa cơ bản',   date:'18/03/2025', time:'11:30', amount:200000, status:'pending',     note:'Hay cắn lạ, cần thận trọng'},
    { id:'BK009', customer:'Bùi Văn Hùng',  pet:'Rocky (Bull Dog, 14kg)',  service:'Tắm & sấy',         date:'19/03/2025', time:'15:00', amount:180000, status:'confirmed',   note:''                          },
  ],

  partnerServices: [
    { id:'PS001', name:'Tắm & sấy cơ bản',    category:'Grooming', priceSmall:80000,  priceLarge:180000, duration:60,  status:'active'   },
    { id:'PS002', name:'Cắt tỉa tạo kiểu',    category:'Grooming', priceSmall:150000, priceLarge:350000, duration:90,  status:'active'   },
    { id:'PS003', name:'Spa VIP trọn gói',     category:'Spa',      priceSmall:400000, priceLarge:800000, duration:180, status:'active'   },
    { id:'PS004', name:'Tắm trị liệu da',     category:'Spa',      priceSmall:200000, priceLarge:450000, duration:90,  status:'active'   },
    { id:'PS005', name:'Nhuộm lông thời trang',category:'Grooming', priceSmall:300000, priceLarge:600000, duration:120, status:'inactive' },
  ],

  partnerPets: [
    { name:'Mochi', type:'Poodle',          owner:'Nguyễn Văn An', age:'3 tuổi', weight:'3kg',  gender:'Đực', note:'Dị ứng sữa tắm hương hoa',     visits:6, last:'17/03/2025' },
    { name:'Max',   type:'Golden Retriever',owner:'Phạm Thu Hà',   age:'4 tuổi', weight:'28kg', gender:'Đực', note:'Tính cách thân thiện',           visits:4, last:'17/03/2025' },
    { name:'Luna',  type:'Mèo Ba Tư',       owner:'Trần Thị Bích', age:'2 tuổi', weight:'4kg',  gender:'Cái', note:'Nhút nhát với người lạ',          visits:3, last:'10/03/2025' },
    { name:'Lily',  type:'Shih Tzu',        owner:'Ngô Thị Mai',   age:'1 tuổi', weight:'5kg',  gender:'Cái', note:'Hay cắn lạ, cần thận trọng',    visits:1, last:'18/03/2025' },
    { name:'Rocky', type:'Bull Dog',        owner:'Bùi Văn Hùng',  age:'5 tuổi', weight:'14kg', gender:'Đực', note:'',                               visits:2, last:'05/03/2025' },
  ],
};

// Extended sample data for final UI/UX handoff
DATA.userViolations = [
  { id:'V001', userId:'U003', reason:'Spam đặt lịch ảo 5 lần trong 2 ngày', severity:'high', reports:4, status:'open', updated:'16/03/2025' },
  { id:'V002', userId:'U006', reason:'Thông tin tài khoản chưa xác thực', severity:'medium', reports:1, status:'reviewing', updated:'15/03/2025' },
  { id:'V003', userId:'U008', reason:'Ngôn từ xúc phạm trong đánh giá', severity:'medium', reports:2, status:'resolved', updated:'14/03/2025' },
];

DATA.serviceCategories = [
  { id:'CAT01', name:'Grooming', normalized:'Chăm sóc lông', status:'active', services:24 },
  { id:'CAT02', name:'Spa', normalized:'Spa thú cưng', status:'active', services:12 },
  { id:'CAT03', name:'Thú y', normalized:'Dịch vụ thú y', status:'active', services:16 },
  { id:'CAT04', name:'Lưu trú', normalized:'Khách sạn thú cưng', status:'active', services:8 },
  { id:'CAT05', name:'Huấn luyện', normalized:'Huấn luyện hành vi', status:'draft', services:5 },
];

DATA.bookingDisputes = [
  { id:'DP001', bookingId:'BK005', customer:'Lê Minh Cường', partner:'Happy Paws Hotel', issue:'Khách phản ánh hoàn tiền chưa đủ sau khi hủy', priority:'high', status:'open' },
  { id:'DP002', bookingId:'BK002', customer:'Trần Thị Bích', partner:'VetCare Clinic', issue:'Đối tác đề nghị đổi giờ do bác sĩ bận ca khẩn', priority:'medium', status:'processing' },
];

DATA.partnerProfile = {
  name:'Pawsome Spa & Grooming',
  owner:'Lê Hoàng Phúc',
  phone:'0281234567',
  email:'hello@pawsome.vn',
  address:'123 Lê Lợi, Q1, TP.HCM',
  openHours:'08:00 - 20:00',
  description:'Spa thú cưng cao cấp chuyên grooming, trị liệu da và dịch vụ combo theo giống chó mèo.',
  verification:'Đã xác minh',
  completion:92,
};

DATA.operationNotifications = [
  { id:'ON001', channel:'Đối tác', title:'Booking mới #BK008 đã gửi tới Pawsome Spa', template:'booking_new', status:'sent', time:'10:45' },
  { id:'ON002', channel:'Khách hàng', title:'Xác nhận booking #BK001 gửi cho Nguyễn Văn An', template:'booking_confirmed', status:'sent', time:'10:20' },
  { id:'ON003', channel:'Khách hàng', title:'Thông báo hủy lịch #BK005 gửi cho Lê Minh Cường', template:'booking_cancelled', status:'queued', time:'09:55' },
  { id:'ON004', channel:'Admin', title:'Ghi log thao tác ẩn review #R003', template:'admin_log', status:'logged', time:'09:20' },
];


DATA.partnerApplications = [
  { id:'PA001', storeName:'Mèo Mập Spa', owner:'Nguyễn Thảo My', type:'Spa', city:'Hà Nội', submitted:'16/03/2025', status:'reviewing', documents:['CCCD','Giấy phép kinh doanh','Ảnh mặt tiền'], services:4, note:'Đã bổ sung giấy phép trong buổi sáng' },
  { id:'PA002', storeName:'PetHome Hotel', owner:'Trần Quốc Bảo', type:'Lưu trú', city:'TP.HCM', submitted:'15/03/2025', status:'pending', documents:['CCCD','Ảnh cơ sở'], services:3, note:'Chờ upload giấy kiểm dịch' },
  { id:'PA003', storeName:'Dr.Paw Clinic', owner:'Lê Khánh Linh', type:'Thú y', city:'Đà Nẵng', submitted:'14/03/2025', status:'approved', documents:['CCCD','Chứng chỉ hành nghề','Giấy phép hoạt động'], services:5, note:'Đã tạo tài khoản đối tác' },
];

DATA.partnerRegistrationDraft = {
  storeName:'Paw Paradise Grooming',
  owner:'Phạm Minh Anh',
  phone:'0912 345 678',
  email:'hello@pawparadise.vn',
  city:'Hà Nội',
  district:'Cầu Giấy',
  address:'88 Trần Thái Tông, Cầu Giấy, Hà Nội',
  type:'Spa',
  services:['Tắm & sấy','Cắt tỉa tạo kiểu','Spa trị liệu'],
  openHours:'08:30 - 20:30',
  description:'Cửa hàng chăm sóc thú cưng theo mô hình boutique, nhận booking theo slot và có khu vực chờ riêng cho khách.',
  documents:[
    { name:'CCCD chủ cửa hàng', status:'uploaded' },
    { name:'Giấy phép kinh doanh', status:'uploaded' },
    { name:'Ảnh mặt tiền cửa hàng', status:'uploaded' },
    { name:'Bảng giá dịch vụ', status:'missing' },
  ],
  steps:[
    { label:'Khai báo thông tin', done:true },
    { label:'Tải giấy tờ', done:true },
    { label:'Xác minh thủ công', done:false },
    { label:'Kích hoạt tài khoản', done:false },
  ]
};


// Richer partner onboarding demo data
DATA.partnerRegistrationDraft = {
  applicationId:'PA004',
  status:'need_more',
  completion:86,
  submittedAt:'17/03/2026 09:15',
  lastUpdated:'17/03/2026 11:40',
  owner:'Phạm Minh Anh',
  ownerRole:'Chủ cửa hàng',
  ownerDob:'12/08/1994',
  ownerId:'012345678901',
  phone:'0912 345 678',
  email:'hello@pawparadise.vn',
  alternatePhone:'0988 222 666',
  supportEmail:'ops@pawparadise.vn',
  city:'Hà Nội',
  district:'Cầu Giấy',
  ward:'Dịch Vọng Hậu',
  address:'88 Trần Thái Tông, Dịch Vọng Hậu, Cầu Giấy, Hà Nội',
  type:'Spa',
  businessModel:'Hộ kinh doanh cá thể',
  taxCode:'01A8-PPG-2024',
  legalName:'Hộ kinh doanh Paw Paradise Grooming',
  storeName:'Paw Paradise Grooming',
  branchCount:1,
  openHours:'08:30 - 20:30',
  workingDays:'Thứ 2 - Chủ nhật',
  description:'Cửa hàng chăm sóc thú cưng theo mô hình boutique, nhận booking theo slot, có khu vực chờ riêng cho khách và quy trình check-in/check-out rõ ràng.',
  specialties:['Grooming theo giống','Spa trị liệu da','Combo tắm - cắt - dưỡng'],
  expectedMonthlyBookings:120,
  staffCount:5,
  groomingTables:3,
  bathStations:2,
  petHoldingArea:'Có khu lưu thú riêng và camera giám sát',
  bankName:'Vietcombank',
  bankAccountName:'PHAM MINH ANH',
  bankAccountNumber:'0011002299888',
  payoutCycle:'Đối soát T+2',
  services:[
    { name:'Tắm & sấy cơ bản', category:'Grooming', priceFrom:'100,000đ', duration:'45-60 phút', target:'Chó/mèo dưới 5kg' },
    { name:'Cắt tỉa theo giống', category:'Grooming', priceFrom:'220,000đ', duration:'90 phút', target:'Poodle, Bichon, Phốc sóc' },
    { name:'Spa trị liệu da', category:'Spa', priceFrom:'280,000đ', duration:'75 phút', target:'Thú cưng da nhạy cảm' },
    { name:'Combo tắm + vệ sinh tai/móng', category:'Combo', priceFrom:'180,000đ', duration:'60 phút', target:'Khách đặt định kỳ' },
  ],
  compliance:[
    { label:'Có khu vực đón/trả thú cưng riêng', value:true },
    { label:'Cam kết dùng sản phẩm rõ nguồn gốc', value:true },
    { label:'Có camera giám sát tại khu grooming', value:true },
    { label:'Có quy trình xử lý sự cố / thú cưng kích động', value:true },
    { label:'Đồng ý chính sách chất lượng đối tác PetGo', value:true },
  ],
  documents:[
    { name:'CCCD chủ cửa hàng', status:'verified', file:'cccd_pham_minh_anh.pdf', note:'Ảnh rõ nét, trùng thông tin người đại diện' },
    { name:'Giấy phép kinh doanh', status:'verified', file:'gpkd_paw_paradise.pdf', note:'Đã đối chiếu tên hộ kinh doanh' },
    { name:'Ảnh mặt tiền cửa hàng', status:'verified', file:'mat_tien_store.jpg', note:'Có biển hiệu đúng tên thương hiệu' },
    { name:'Ảnh khu vực grooming bên trong', status:'uploaded', file:'inside_grooming_room.jpg', note:'Chờ admin kiểm tra bố trí cơ sở' },
    { name:'Bảng giá dịch vụ', status:'missing', file:'', note:'Admin yêu cầu bổ sung để đối chiếu giá niêm yết' },
    { name:'Tài khoản ngân hàng nhận đối soát', status:'uploaded', file:'bank_confirmation.png', note:'Chờ xác minh trùng tên người nhận' },
  ],
  reviewFeedback:[
    { by:'PetGo Ops', time:'17/03/2026 10:20', type:'info', message:'Hồ sơ đã qua bước kiểm tra thông tin chủ cửa hàng và địa chỉ cơ sở.' },
    { by:'PetGo Ops', time:'17/03/2026 11:10', type:'warning', message:'Vui lòng bổ sung bảng giá dịch vụ có đóng dấu / ký xác nhận và ảnh rõ hơn khu vực tiếp nhận khách.' },
    { by:'Chủ cửa hàng', time:'17/03/2026 11:32', type:'success', message:'Đã phản hồi yêu cầu, đang chuẩn bị tải lên bảng giá và ảnh bổ sung.' },
  ],
  timeline:[
    { time:'17/03/2026 09:15', title:'Tạo hồ sơ đăng ký đối tác', detail:'Lưu nháp lần đầu với thông tin cửa hàng và người đại diện', status:'done' },
    { time:'17/03/2026 09:42', title:'Gửi hồ sơ xét duyệt', detail:'Hồ sơ chuyển sang hàng đợi của admin', status:'done' },
    { time:'17/03/2026 10:20', title:'Kiểm tra bước 1', detail:'Đối chiếu giấy tờ cá nhân và địa chỉ cơ sở', status:'done' },
    { time:'17/03/2026 11:10', title:'Yêu cầu bổ sung', detail:'Bổ sung bảng giá dịch vụ và ảnh nội thất khu tiếp khách', status:'current' },
    { time:'Dự kiến sau khi bổ sung', title:'Phê duyệt & kích hoạt', detail:'Tạo tài khoản đối tác và mở dashboard vận hành', status:'todo' },
  ],
  onboardingTasks:[
    { key:'profile', label:'Xác nhận hồ sơ cửa hàng', done:true },
    { key:'services', label:'Tạo ít nhất 3 dịch vụ đầu tiên', done:false },
    { key:'schedule', label:'Mở lịch nhận booking 7 ngày tới', done:false },
    { key:'payout', label:'Xác minh tài khoản nhận đối soát', done:false },
    { key:'policy', label:'Ký xác nhận SLA & quy định vận hành', done:true },
  ],
  steps:[
    { key:'draft', label:'Khai báo hồ sơ', done:true },
    { key:'submitted', label:'Gửi xét duyệt', done:true },
    { key:'reviewing', label:'Kiểm tra vận hành', done:true },
    { key:'approved', label:'Phê duyệt', done:false },
    { key:'activated', label:'Trở thành đối tác', done:false },
  ]
};

DATA.partnerApplications = [
  { id:'PA004', storeName:'Paw Paradise Grooming', owner:'Phạm Minh Anh', type:'Spa', city:'Hà Nội', submitted:'17/03/2026', status:'reviewing', documents:['CCCD chủ cửa hàng','Giấy phép kinh doanh','Ảnh mặt tiền cửa hàng','Ảnh khu vực grooming bên trong','Tài khoản ngân hàng nhận đối soát'], services:4, note:'Đang chờ đối tác bổ sung bảng giá dịch vụ', phone:'0912 345 678', address:'88 Trần Thái Tông, Cầu Giấy, Hà Nội' },
  { id:'PA001', storeName:'Mèo Mập Spa', owner:'Nguyễn Thảo My', type:'Spa', city:'Hà Nội', submitted:'16/03/2025', status:'reviewing', documents:['CCCD','Giấy phép kinh doanh','Ảnh mặt tiền'], services:4, note:'Đã bổ sung giấy phép trong buổi sáng', phone:'0909 888 111', address:'15 Trần Duy Hưng, Hà Nội' },
  { id:'PA002', storeName:'PetHome Hotel', owner:'Trần Quốc Bảo', type:'Lưu trú', city:'TP.HCM', submitted:'15/03/2025', status:'pending', documents:['CCCD','Ảnh cơ sở'], services:3, note:'Chờ upload giấy kiểm dịch', phone:'0908 777 000', address:'2 Võ Văn Tần, TP.HCM' },
  { id:'PA003', storeName:'Dr.Paw Clinic', owner:'Lê Khánh Linh', type:'Thú y', city:'Đà Nẵng', submitted:'14/03/2025', status:'approved', documents:['CCCD','Chứng chỉ hành nghề','Giấy phép hoạt động'], services:5, note:'Đã tạo tài khoản đối tác', phone:'0905 456 123', address:'10 Hải Châu, Đà Nẵng' },
];
