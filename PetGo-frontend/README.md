# PetGo — Admin & Partner Dashboard
## Người 3: Admin + Partner UI/UX

---

### Cách chạy

**Cách 1 — Live Server (khuyến nghị)**
1. Mở thư mục `petgo-admin` trong VS Code
2. Cài extension **Live Server** (nếu chưa có)
3. Chuột phải vào `index.html` → **"Open with Live Server"**
4. Trình duyệt tự mở tại `http://127.0.0.1:5500`

**Cách 2 — Mở file trực tiếp**
- Mở file `index.html` bằng trình duyệt (Chrome/Edge/Firefox)
- *Lưu ý: Một số tính năng có thể bị hạn chế khi mở file:// trực tiếp*

---

### Cấu trúc file

```
petgo-admin/
├── index.html          ← Entry point
├── css/
│   └── style.css       ← Toàn bộ styling + dark mode
├── js/
│   ├── data.js         ← Dữ liệu mẫu (users, partners, bookings...)
│   ├── utils.js        ← Hàm dùng chung (toast, modal, badge...)
│   ├── admin.js        ← Toàn bộ UI Admin
│   ├── partner.js      ← Toàn bộ UI Đối tác
│   └── app.js          ← Navigation controller
└── README.md
```

---

### Chức năng Admin (11 màn hình)

| Màn hình | Chức năng |
|----------|-----------|
| Dashboard | Thống kê tổng quan, biểu đồ doanh thu, dịch vụ phổ biến |
| Quản lý User | Danh sách, tìm kiếm, lọc, khóa/mở tài khoản, xem chi tiết |
| Quản lý Đối tác | Duyệt/từ chối hồ sơ, gắn xác minh, lọc theo trạng thái |
| Quản lý Booking | Xem tất cả đơn, can thiệp đổi trạng thái, hoàn tiền |
| Quản lý Dịch vụ | Duyệt/ẩn/hiện dịch vụ, tạo danh mục mới |
| Quản lý Review | Kiểm duyệt, ẩn vi phạm, xử lý khiếu nại |
| Khuyến mãi | Tạo voucher, flash sale, theo dõi usage |
| Nội dung | Quản lý banner trang chủ |
| Báo cáo | Biểu đồ tăng trưởng, phân bố khu vực, hành vi theo giờ |
| Thông báo | Xem notification, gửi thông báo hàng loạt |
| Activity Log | Lịch sử hành động admin |

---

### Chức năng Đối tác (8 màn hình)

| Màn hình | Chức năng |
|----------|-----------|
| Dashboard | Tổng quan booking hôm nay, doanh thu 7 ngày |
| Quản lý Booking | Xác nhận/từ chối/bắt đầu/hoàn thành, xem hồ sơ thú cưng |
| Quản lý Dịch vụ | Thêm/sửa/bật/tắt dịch vụ, cài giá theo kích thước |
| Lịch làm việc | Quản lý slot theo ngày/giờ, chặn ngày nghỉ |
| Đánh giá | Phản hồi review, báo cáo vi phạm |
| Hồ sơ thú cưng | Xem thông tin pet khách hàng, ghi chú đặc biệt |
| Doanh thu | Báo cáo dịch vụ bán chạy, biểu đồ theo tháng |
| Gói đăng ký | So sánh Basic/Pro/Premium, lịch sử thanh toán |

---

### Chuyển đổi vai trò
Sử dụng dropdown ở đầu sidebar để chuyển giữa **Admin** và **Đối tác (Pawsome Spa)**

---

### Yêu cầu
- Trình duyệt hiện đại (Chrome 90+, Firefox 88+, Edge 90+)
- Kết nối Internet (để load Chart.js từ CDN)

---

*PetGo — Nền tảng kết nối dịch vụ thú cưng | Lập trình viên 3*
