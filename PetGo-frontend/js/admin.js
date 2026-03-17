// ============================================================
//  PetGo — Admin Panel Renderers
// ============================================================

// ---------- ADMIN DASHBOARD ----------
function renderAdminDashboard() {
  document.getElementById('mainContent').innerHTML = `
    <div class="metrics">
      <div class="metric-card"><div class="metric-label">Tổng người dùng</div><div class="metric-value">2,847</div><div class="metric-change metric-up">↑ 12% tháng này</div></div>
      <div class="metric-card"><div class="metric-label">Tổng đối tác</div><div class="metric-value">156</div><div class="metric-change metric-up">↑ 8 đối tác mới</div></div>
      <div class="metric-card"><div class="metric-label">Tổng booking</div><div class="metric-value">1,203</div><div class="metric-change metric-up">↑ 18% tháng này</div></div>
      <div class="metric-card"><div class="metric-label">Doanh thu (VNĐ)</div><div class="metric-value">48.2M</div><div class="metric-change metric-up">↑ 22% tháng này</div></div>
    </div>
    <div class="metrics">
      <div class="metric-card"><div class="metric-label">Tỷ lệ hoàn thành</div><div class="metric-value">87%</div><div class="progress-bar mt-8"><div class="progress-fill" style="width:87%"></div></div></div>
      <div class="metric-card"><div class="metric-label">Tỷ lệ hủy</div><div class="metric-value">8.3%</div><div class="progress-bar mt-8"><div class="progress-fill" style="width:8.3%;background:#E24B4A"></div></div></div>
      <div class="metric-card"><div class="metric-label">Tổng review</div><div class="metric-value">3,421</div><div class="metric-change metric-up">★ 4.7 trung bình</div></div>
      <div class="metric-card"><div class="metric-label">Chờ xử lý</div><div class="metric-value">16</div><div class="metric-change metric-down">5 đối tác · 8 review · 3 KN</div></div>
    </div>
    <div class="grid2">
      <div class="card">
        <div class="card-header"><div class="card-title">Doanh thu 6 tháng gần nhất</div></div>
        <div class="chart-wrap"><canvas id="revenueChart"></canvas></div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Phân bổ dịch vụ</div></div>
        <div class="chart-wrap"><canvas id="serviceChart"></canvas></div>
      </div>
    </div>
    <div class="grid2">
      <div class="card">
        <div class="card-header">
          <div class="card-title">Booking gần đây</div>
          <button class="btn btn-sm" onclick="renderPanel('admin-bookings')">Xem tất cả</button>
        </div>
        <table>
          <thead><tr><th>Khách hàng</th><th>Dịch vụ</th><th>Trạng thái</th></tr></thead>
          <tbody>${DATA.bookings.slice(0,5).map(b => `<tr><td class="fw-500">${b.customer}</td><td>${b.service}</td><td>${statusBadge(b.status)}</td></tr>`).join('')}</tbody>
        </table>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-title">Đối tác chờ duyệt</div>
          <button class="btn btn-sm" onclick="renderPanel('admin-partners')">Xem tất cả</button>
        </div>
        ${DATA.partners.filter(p => p.status === 'pending' || p.status === 'reviewing').map(p => `
          <div class="d-flex align-center gap-6 mt-8" style="padding:8px 0;border-bottom:0.5px solid var(--border-tertiary)">
            <span style="font-size:22px">${partnerIcon(p.type)}</span>
            <div class="flex-1">
              <div class="fw-500" style="font-size:13px">${p.name}</div>
              <div class="text-tiny">${p.type} · ${p.joined}</div>
            </div>
            <button class="btn btn-sm btn-success" onclick="adminApprovePartner('${p.id}')">Duyệt</button>
          </div>`).join('')}
      </div>
    </div>
  `;
  setTimeout(() => {
    new Chart(document.getElementById('revenueChart'), {
      type: 'bar',
      data: { labels:['T10','T11','T12','T1','T2','T3'], datasets:[{ label:'Doanh thu (triệu)', data:[32,38,45,41,44,48], backgroundColor:'#E8621A', borderRadius:4 }] },
      options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{y:{ticks:{callback:v=>v+'M'}}} }
    });
    new Chart(document.getElementById('serviceChart'), {
      type: 'doughnut',
      data: { labels:['Grooming','Thú y','Lưu trú','Huấn luyện','Spa'], datasets:[{ data:[35,25,20,10,10], backgroundColor:['#E8621A','#1D9E75','#378ADD','#BA7517','#D4537E'] }] },
      options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'bottom'}} }
    });
  }, 100);
}

// ---------- ADMIN USERS ----------
function renderAdminUsers() {
  document.getElementById('mainContent').innerHTML = `
    <div class="search-bar">
      <input id="userSearch" type="text" placeholder="🔍  Tìm theo tên, email, SĐT..." oninput="filterUsers()">
      <select id="userStatusFilter" onchange="filterUsers()">
        <option value="">Tất cả trạng thái</option>
        <option value="active">Hoạt động</option>
        <option value="locked">Bị khóa</option>
        <option value="pending">Chờ xác thực</option>
      </select>
      <button class="btn btn-primary" onclick="showAddUserModal()">+ Thêm user</button>
    </div>
    <div class="card mb-0">
      <table id="usersTable">
        <thead>
          <tr><th>ID</th><th>Họ tên</th><th>Email</th><th>SĐT</th><th>Tham gia</th><th>Booking</th><th>Trạng thái</th><th>Thao tác</th></tr>
        </thead>
        <tbody id="usersBody">${renderUsersRows(DATA.users)}</tbody>
      </table>
    </div>
  `;
}

function renderUsersRows(list) {
  return list.map(u => {
    const stBadge = u.status === 'active'
      ? '<span class="badge badge-success">Hoạt động</span>'
      : u.status === 'locked'
        ? '<span class="badge badge-danger">Bị khóa</span>'
        : '<span class="badge badge-warning">Chờ xác thực</span>';
    return `<tr id="urow-${u.id}">
      <td class="text-tiny">${u.id}</td>
      <td class="fw-500">${u.name}</td>
      <td class="text-muted">${u.email}</td>
      <td>${u.phone}</td>
      <td class="text-muted">${u.joined}</td>
      <td>${u.bookings}</td>
      <td>${stBadge}</td>
      <td>
        <div class="d-flex gap-6">
          <button class="btn btn-sm" onclick="viewUser('${u.id}')">Xem</button>
          <button class="btn btn-sm ${u.status === 'locked' ? 'btn-success' : 'btn-danger'}" onclick="toggleUser('${u.id}')">${u.status === 'locked' ? 'Mở khóa' : 'Khóa'}</button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

function filterUsers() {
  const q = document.getElementById('userSearch').value.toLowerCase();
  const s = document.getElementById('userStatusFilter').value;
  const filtered = DATA.users.filter(u =>
    (!q || (u.name + u.email + u.phone).toLowerCase().includes(q)) &&
    (!s || u.status === s)
  );
  document.getElementById('usersBody').innerHTML = renderUsersRows(filtered);
}

function viewUser(id) {
  const u = DATA.users.find(u => u.id === id);
  openModal(`Chi tiết người dùng`, `
    <div class="d-flex align-center gap-6 mt-8" style="margin-bottom:16px">
      <div style="width:50px;height:50px;border-radius:50%;background:var(--bg-info);display:flex;align-items:center;justify-content:center;font-weight:600;color:var(--text-info);font-size:20px">${u.name.charAt(0)}</div>
      <div><div class="fw-500" style="font-size:15px">${u.name}</div><div class="text-muted" style="font-size:13px">${u.email}</div></div>
    </div>
    <table style="width:100%;font-size:13px">
      <tr><td class="text-muted" style="padding:5px 0;width:120px">ID</td><td>${u.id}</td></tr>
      <tr><td class="text-muted" style="padding:5px 0">Số điện thoại</td><td>${u.phone}</td></tr>
      <tr><td class="text-muted" style="padding:5px 0">Ngày tham gia</td><td>${u.joined}</td></tr>
      <tr><td class="text-muted" style="padding:5px 0">Tổng booking</td><td>${u.bookings}</td></tr>
      <tr><td class="text-muted" style="padding:5px 0">Trạng thái</td><td>${u.status === 'active' ? '<span class="badge badge-success">Hoạt động</span>' : '<span class="badge badge-danger">Bị khóa</span>'}</td></tr>
    </table>
  `, null, 'Đóng');
}

function toggleUser(id) {
  const u = DATA.users.find(u => u.id === id);
  const action = u.status === 'locked' ? 'mở khóa' : 'khóa';
  openModal(`Xác nhận ${action} tài khoản`, `
    <p style="font-size:14px;line-height:1.6">Bạn có chắc muốn <strong>${action}</strong> tài khoản của <strong>${u.name}</strong>?</p>
    ${u.status !== 'locked' ? '<div class="form-group" style="margin-top:12px"><label class="form-label">Lý do khóa</label><textarea class="form-input" rows="2" placeholder="Nhập lý do..."></textarea></div>' : ''}
  `, () => {
    u.status = u.status === 'locked' ? 'active' : 'locked';
    showToast(`Đã ${action} tài khoản ${u.name}`);
    renderAdminUsers();
  });
}

function showAddUserModal() {
  openModal('Thêm người dùng mới', `
    <div class="form-group"><label class="form-label">Họ tên</label><input class="form-input" placeholder="Nguyễn Văn A"></div>
    <div class="form-group"><label class="form-label">Email</label><input class="form-input" type="email" placeholder="user@email.com"></div>
    <div class="form-group"><label class="form-label">Số điện thoại</label><input class="form-input" placeholder="09xxxxxxxx"></div>
    <div class="form-group"><label class="form-label">Vai trò</label><select class="form-input"><option>Khách hàng</option><option>Đối tác</option><option>Admin</option></select></div>
  `, () => showToast('Đã tạo tài khoản mới'));
}

// ---------- ADMIN PARTNERS ----------
let partnerTabFilter = 'all';

function renderAdminPartners() {
  const pending = DATA.partners.filter(p => p.status === 'pending' || p.status === 'reviewing');
  const verified = DATA.partners.filter(p => p.status === 'verified');
  document.getElementById('mainContent').innerHTML = `
    <div class="search-bar">
      <input type="text" id="partnerSearch" placeholder="🔍  Tìm tên đối tác, địa chỉ..." oninput="filterAdminPartners()">
      <select id="partnerTypeFilter" onchange="filterAdminPartners()">
        <option value="">Tất cả loại hình</option>
        <option value="Spa">Spa</option>
        <option value="Thú y">Thú y</option>
        <option value="Lưu trú">Lưu trú</option>
        <option value="Huấn luyện">Huấn luyện</option>
      </select>
      <button class="btn btn-primary" onclick="showToast('Tính năng Export đang phát triển','info')">Xuất danh sách</button>
    </div>
    <div class="tabs">
      <div class="tab active" onclick="switchPartnerTab(this,'all')">Tất cả (${DATA.partners.length})</div>
      <div class="tab" onclick="switchPartnerTab(this,'pending')">Chờ duyệt (${pending.length})</div>
      <div class="tab" onclick="switchPartnerTab(this,'verified')">Đã xác minh (${verified.length})</div>
    </div>
    <div id="partnerList">${DATA.partners.map(p => renderPartnerCard(p)).join('')}</div>
  `;
}

function renderPartnerCard(p) {
  return `<div class="partner-card" id="pcard-${p.id}">
    <div class="partner-avatar">${partnerIcon(p.type)}</div>
    <div class="partner-info">
      <div class="partner-name">${p.name} ${partnerStatusBadge(p.status)}</div>
      <div class="partner-meta">${p.type} · ${p.address} · ${p.phone}</div>
      <div class="d-flex gap-6 flex-wrap" style="font-size:12px;color:var(--text-secondary);margin-bottom:8px">
        <span>📅 ${p.bookings} booking</span>
        <span>⭐ ${p.rating || '—'}</span>
        <span>📄 Giấy tờ: ${p.docs}</span>
        <span>🗓 Tham gia: ${p.joined}</span>
      </div>
      <div class="partner-actions">
        <button class="btn btn-sm" onclick="viewPartnerDetail('${p.id}')">👁 Chi tiết</button>
        ${p.status !== 'verified' ? `<button class="btn btn-sm btn-success" onclick="adminApprovePartner('${p.id}')">✓ Duyệt</button><button class="btn btn-sm btn-danger" onclick="adminRejectPartner('${p.id}')">✗ Từ chối</button>` : ''}
        ${p.status === 'verified' ? `<button class="btn btn-sm btn-warning" onclick="showToast('Đã gắn nhãn nổi bật ⭐')">⭐ Nổi bật</button><button class="btn btn-sm btn-danger" onclick="showToast('Đã khóa đối tác','warning')">🔒 Khóa</button>` : ''}
      </div>
    </div>
  </div>`;
}

function switchPartnerTab(el, filter) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const list = filter === 'all' ? DATA.partners
    : filter === 'pending' ? DATA.partners.filter(p => p.status === 'pending' || p.status === 'reviewing')
    : DATA.partners.filter(p => p.status === filter);
  document.getElementById('partnerList').innerHTML = list.map(p => renderPartnerCard(p)).join('');
}

function filterAdminPartners() {
  const q = (document.getElementById('partnerSearch').value || '').toLowerCase();
  const t = document.getElementById('partnerTypeFilter').value;
  const list = DATA.partners.filter(p => (!q || (p.name + p.address).toLowerCase().includes(q)) && (!t || p.type === t));
  document.getElementById('partnerList').innerHTML = list.map(p => renderPartnerCard(p)).join('');
}

function adminApprovePartner(id) {
  const p = DATA.partners.find(x => x.id === id);
  openModal('Duyệt hồ sơ đối tác', `
    <div class="alert alert-success">✓ Hồ sơ đầy đủ và hợp lệ</div>
    <p style="font-size:14px">Xác nhận duyệt hồ sơ đăng ký của <strong>${p.name}</strong>?</p>
    <p class="text-muted mt-8" style="font-size:13px">Đối tác sẽ nhận email thông báo và có thể bắt đầu đăng dịch vụ.</p>
  `, () => {
    p.status = 'verified'; p.docs = '✓';
    showToast(`Đã duyệt đối tác ${p.name}`, 'success');
    renderAdminPartners();
  });
}

function adminRejectPartner(id) {
  const p = DATA.partners.find(x => x.id === id);
  openModal('Từ chối hồ sơ đối tác', `
    <p style="font-size:14px;margin-bottom:12px">Lý do từ chối hồ sơ <strong>${p.name}</strong>:</p>
    <div class="form-group">
      <select class="form-input" style="margin-bottom:8px">
        <option>Giấy tờ không hợp lệ</option>
        <option>Thông tin không chính xác</option>
        <option>Không đáp ứng tiêu chí</option>
        <option>Khác</option>
      </select>
    </div>
    <div class="form-group"><label class="form-label">Ghi chú thêm</label><textarea class="form-input" rows="3" placeholder="Chi tiết lý do..."></textarea></div>
  `, () => showToast(`Đã từ chối hồ sơ ${p.name}`, 'warning'));
}

function viewPartnerDetail(id) {
  const p = DATA.partners.find(x => x.id === id);
  openModal('Chi tiết đối tác', `
    <div class="d-flex align-center gap-6" style="margin-bottom:16px">
      <span style="font-size:32px">${partnerIcon(p.type)}</span>
      <div><div class="fw-500" style="font-size:15px">${p.name}</div><div>${partnerStatusBadge(p.status)}</div></div>
    </div>
    <table style="width:100%;font-size:13px">
      <tr><td class="text-muted" style="padding:5px 0;width:120px">Loại hình</td><td>${p.type}</td></tr>
      <tr><td class="text-muted" style="padding:5px 0">Địa chỉ</td><td>${p.address}</td></tr>
      <tr><td class="text-muted" style="padding:5px 0">Điện thoại</td><td>${p.phone}</td></tr>
      <tr><td class="text-muted" style="padding:5px 0">Ngày tham gia</td><td>${p.joined}</td></tr>
      <tr><td class="text-muted" style="padding:5px 0">Rating</td><td>${p.rating ? `⭐ ${p.rating}` : 'Chưa có'}</td></tr>
      <tr><td class="text-muted" style="padding:5px 0">Tổng booking</td><td>${p.bookings}</td></tr>
      <tr><td class="text-muted" style="padding:5px 0">Giấy tờ</td><td>${p.docs}</td></tr>
    </table>
  `, null, 'Đóng');
}

// ---------- ADMIN BOOKINGS ----------
function renderAdminBookings() {
  document.getElementById('mainContent').innerHTML = `
    <div class="search-bar">
      <input type="text" id="bkSearch" placeholder="🔍  Tìm ID booking, tên khách..." oninput="filterAdminBookings()">
      <select id="bkStatusFilter" onchange="filterAdminBookings()">
        <option value="">Tất cả trạng thái</option>
        <option value="pending">Chờ xác nhận</option>
        <option value="confirmed">Đã xác nhận</option>
        <option value="in_progress">Đang thực hiện</option>
        <option value="completed">Hoàn thành</option>
        <option value="cancelled">Đã hủy</option>
      </select>
      <button class="btn" onclick="showToast('Đã xuất danh sách booking')">Xuất Excel</button>
    </div>
    <div class="card mb-0">
      <table>
        <thead><tr><th>ID</th><th>Khách hàng</th><th>Thú cưng</th><th>Dịch vụ</th><th>Đối tác</th><th>Ngày giờ</th><th>Tiền</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
        <tbody id="bookingsBody">${renderBookingRows(DATA.bookings)}</tbody>
      </table>
    </div>
  `;
}

function renderBookingRows(list) {
  return list.map(b => `<tr>
    <td class="text-tiny">${b.id}</td>
    <td class="fw-500">${b.customer}</td>
    <td>${b.pet}</td>
    <td>${b.service}</td>
    <td>${b.partner}</td>
    <td>${b.date}<br><span class="text-tiny">${b.time}</span></td>
    <td class="text-orange fw-500">${fmt(b.amount)}</td>
    <td>${statusBadge(b.status)}</td>
    <td>
      <div class="d-flex gap-6 flex-wrap">
        <button class="btn btn-sm" onclick="viewAdminBooking('${b.id}')">Chi tiết</button>
        ${b.status === 'pending' ? `<button class="btn btn-sm btn-success" onclick="adminSetBookingStatus('${b.id}','confirmed')">Xác nhận</button>` : ''}
        ${b.status !== 'cancelled' && b.status !== 'completed' ? `<button class="btn btn-sm btn-danger" onclick="adminSetBookingStatus('${b.id}','cancelled')">Hủy</button>` : ''}
        ${b.status === 'cancelled' ? `<button class="btn btn-sm btn-warning" onclick="showToast('Đã hoàn tiền cho khách','success')">Hoàn tiền</button>` : ''}
      </div>
    </td>
  </tr>`).join('');
}

function filterAdminBookings() {
  const q = (document.getElementById('bkSearch').value || '').toLowerCase();
  const s = document.getElementById('bkStatusFilter').value;
  const list = DATA.bookings.filter(b => (!q || (b.id + b.customer).toLowerCase().includes(q)) && (!s || b.status === s));
  document.getElementById('bookingsBody').innerHTML = renderBookingRows(list);
}

function viewAdminBooking(id) {
  const b = DATA.bookings.find(x => x.id === id);
  openModal(`Chi tiết booking ${b.id}`, `
    <table style="width:100%;font-size:13px">
      <tr><td class="text-muted" style="padding:5px 0;width:120px">Khách hàng</td><td class="fw-500">${b.customer}</td></tr>
      <tr><td class="text-muted" style="padding:5px 0">Thú cưng</td><td>${b.pet}</td></tr>
      <tr><td class="text-muted" style="padding:5px 0">Dịch vụ</td><td>${b.service}</td></tr>
      <tr><td class="text-muted" style="padding:5px 0">Đối tác</td><td>${b.partner}</td></tr>
      <tr><td class="text-muted" style="padding:5px 0">Ngày giờ</td><td>${b.date} ${b.time}</td></tr>
      <tr><td class="text-muted" style="padding:5px 0">Số tiền</td><td class="text-orange fw-500">${fmt(b.amount)}</td></tr>
      <tr><td class="text-muted" style="padding:5px 0">Trạng thái</td><td>${statusBadge(b.status)}</td></tr>
    </table>
    <div class="form-group mt-16">
      <label class="form-label">Can thiệp — đổi trạng thái</label>
      <select class="form-input" id="adminNewStatus">
        <option value="confirmed">Đã xác nhận</option>
        <option value="in_progress">Đang thực hiện</option>
        <option value="completed">Hoàn thành</option>
        <option value="cancelled">Đã hủy</option>
      </select>
    </div>
  `, () => {
    const ns = document.getElementById('adminNewStatus')?.value;
    if (ns) { b.status = ns; showToast(`Đã cập nhật trạng thái booking ${id}`); renderAdminBookings(); }
  });
}

function adminSetBookingStatus(id, status) {
  const b = DATA.bookings.find(x => x.id === id);
  b.status = status;
  showToast('Đã cập nhật trạng thái booking');
  renderAdminBookings();
}

// ---------- ADMIN SERVICES ----------
function renderAdminServices() {
  document.getElementById('mainContent').innerHTML = `
    <div class="search-bar">
      <input type="text" placeholder="🔍  Tìm tên dịch vụ...">
      <select>
        <option value="">Tất cả danh mục</option>
        <option>Grooming</option><option>Spa</option><option>Thú y</option><option>Lưu trú</option><option>Huấn luyện</option>
      </select>
      <select>
        <option value="">Tất cả trạng thái</option>
        <option>Hoạt động</option><option>Chờ duyệt</option><option>Ẩn</option>
      </select>
      <button class="btn btn-primary" onclick="showAddCategoryModal()">+ Danh mục mới</button>
    </div>
    <div class="card mb-0">
      <table>
        <thead><tr><th>ID</th><th>Tên dịch vụ</th><th>Danh mục</th><th>Đối tác</th><th>Giá</th><th>Thời lượng</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
        <tbody>
          ${DATA.services.map(s => `<tr>
            <td class="text-tiny">${s.id}</td>
            <td class="fw-500">${s.name}</td>
            <td><span class="badge badge-info">${s.category}</span></td>
            <td>${s.partner}</td>
            <td>${s.price}</td>
            <td>${s.duration}</td>
            <td>${s.status === 'active' ? '<span class="badge badge-success">Hoạt động</span>' : '<span class="badge badge-warning">Chờ duyệt</span>'}</td>
            <td>
              <div class="d-flex gap-6">
                ${s.status === 'pending' ? `<button class="btn btn-sm btn-success" onclick="showToast('Đã duyệt dịch vụ')">Duyệt</button>` : ''}
                <button class="btn btn-sm" onclick="showToast('Mở form chỉnh sửa')">Sửa</button>
                <button class="btn btn-sm btn-danger" onclick="showToast('Đã ẩn dịch vụ','warning')">Ẩn</button>
              </div>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function showAddCategoryModal() {
  openModal('Tạo danh mục dịch vụ mới', `
    <div class="form-group"><label class="form-label">Tên danh mục</label><input class="form-input" placeholder="VD: Grooming cao cấp"></div>
    <div class="form-group"><label class="form-label">Mô tả</label><textarea class="form-input" rows="3" placeholder="Mô tả ngắn..."></textarea></div>
    <div class="form-group"><label class="form-label">Giá tham chiếu</label><input class="form-input" placeholder="100,000 – 500,000đ"></div>
    <div class="form-group"><label class="form-label">Icon (emoji)</label><input class="form-input" placeholder="✂️"></div>
  `, () => showToast('Đã tạo danh mục mới'));
}

// ---------- ADMIN REVIEWS ----------
function renderAdminReviews() {
  const all = DATA.reviews;
  const reported = all.filter(r => r.status === 'reported');
  document.getElementById('mainContent').innerHTML = `
    <div class="tabs">
      <div class="tab active" onclick="switchReviewAdminTab(this,'all')">Tất cả (${all.length})</div>
      <div class="tab" onclick="switchReviewAdminTab(this,'reported')">Bị báo cáo (${reported.length})</div>
      <div class="tab" onclick="switchReviewAdminTab(this,'visible')">Đang hiển thị (${all.filter(r=>r.status==='visible').length})</div>
    </div>
    <div class="card mb-0" id="adminReviewList">${renderReviewAdminItems(all)}</div>
  `;
}

function renderReviewAdminItems(list) {
  return list.map(r => `
    <div class="review-item" id="adminrv-${r.id}">
      <div class="review-header">
        <div>
          <span class="review-user">${r.user}</span>
          <span class="text-muted"> → ${r.partner}</span>
        </div>
        <div class="d-flex align-center gap-6">
          <span class="stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
          ${r.status === 'reported' ? '<span class="badge badge-danger">Bị báo cáo</span>' : '<span class="badge badge-success">Hiển thị</span>'}
        </div>
      </div>
      <div class="review-text">${r.text}</div>
      <div class="d-flex justify-between align-center">
        <span class="text-tiny">${r.date}</span>
        <div class="d-flex gap-6">
          <button class="btn btn-sm" onclick="showToast('Mở chi tiết khiếu nại','info')">Xem khiếu nại</button>
          <button class="btn btn-sm btn-danger" onclick="adminHideReview('${r.id}')">Ẩn review</button>
        </div>
      </div>
    </div>
  `).join('');
}

function switchReviewAdminTab(el, filter) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const list = filter === 'all' ? DATA.reviews : DATA.reviews.filter(r => r.status === filter);
  document.getElementById('adminReviewList').innerHTML = renderReviewAdminItems(list);
}

function adminHideReview(id) {
  openModal('Ẩn review vi phạm', `
    <div class="form-group"><label class="form-label">Lý do ẩn</label>
      <select class="form-input">
        <option>Nội dung xúc phạm</option>
        <option>Thông tin sai sự thật</option>
        <option>Spam / quảng cáo</option>
        <option>Vi phạm quy định PetGo</option>
      </select>
    </div>
    <div class="form-group"><label class="form-label">Ghi chú nội bộ</label><textarea class="form-input" rows="2" placeholder="Ghi chú cho team..."></textarea></div>
  `, () => {
    const r = DATA.reviews.find(x => x.id === id);
    if (r) r.status = 'hidden';
    showToast('Đã ẩn review vi phạm');
    renderAdminReviews();
  });
}

// ---------- ADMIN VOUCHERS ----------
function renderAdminVouchers() {
  document.getElementById('mainContent').innerHTML = `
    <div class="d-flex justify-between align-center" style="margin-bottom:14px">
      <div class="d-flex gap-6">
        <button class="btn" onclick="showFlashSaleModal()">⚡ Flash Sale</button>
        <button class="btn" onclick="showToast('Tạo mã nhóm FPT Student','info')">🎓 Mã sinh viên FPT</button>
      </div>
      <button class="btn btn-primary" onclick="showCreateVoucherModal()">+ Tạo voucher</button>
    </div>
    ${DATA.vouchers.map(v => `
      <div class="voucher-card">
        <div>
          <div class="voucher-code">${v.code}</div>
          <div class="text-muted mt-8" style="font-size:12px">${v.type}: <strong>${v.value}</strong> · Đơn tối thiểu: ${v.min.toLocaleString()}đ · HSD: ${v.expiry}</div>
          <div class="text-muted" style="font-size:12px;margin-top:3px">Đã dùng: ${v.used} / ${v.limit}</div>
          <div class="progress-bar mt-8" style="width:220px"><div class="progress-fill" style="width:${Math.round(v.used / v.limit * 100)}%${v.status === 'expired' ? ';background:#888' : ''}"></div></div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">
          <span class="badge ${v.status === 'active' ? 'badge-success' : 'badge-gray'}">${v.status === 'active' ? 'Đang chạy' : 'Hết hạn'}</span>
          ${v.status === 'active' ? `<button class="btn btn-sm btn-danger" onclick="showToast('Đã dừng voucher ${v.code}','warning')">Dừng</button>` : ''}
          <button class="btn btn-sm" onclick="copyToClipboard('${v.code}')">Sao chép mã</button>
        </div>
      </div>
    `).join('')}
  `;
}

function copyToClipboard(text) {
  navigator.clipboard?.writeText(text).catch(() => {});
  showToast(`Đã sao chép mã ${text}`);
}

function showCreateVoucherModal() {
  openModal('Tạo voucher mới', `
    <div class="form-group"><label class="form-label">Mã voucher</label><input class="form-input" placeholder="VD: PETGO50" style="text-transform:uppercase"></div>
    <div class="form-group"><label class="form-label">Loại giảm giá</label><select class="form-input"><option>Phần trăm (%)</option><option>Cố định (đồng)</option></select></div>
    <div class="form-group"><label class="form-label">Giá trị giảm</label><input class="form-input" placeholder="20 (%) hoặc 50000 (đ)"></div>
    <div class="form-group"><label class="form-label">Đơn tối thiểu (đ)</label><input class="form-input" placeholder="200000"></div>
    <div class="form-group"><label class="form-label">Ngày hết hạn</label><input class="form-input" type="date"></div>
    <div class="form-group"><label class="form-label">Giới hạn số lần sử dụng</label><input class="form-input" type="number" placeholder="500"></div>
    <div class="form-group"><label class="form-label">Áp dụng cho</label><select class="form-input"><option>Tất cả dịch vụ</option><option>Grooming</option><option>Thú y</option><option>Đối tác cụ thể</option></select></div>
  `, () => showToast('Đã tạo voucher mới thành công'));
}

function showFlashSaleModal() {
  openModal('Tạo Flash Sale', `
    <div class="alert alert-warning">⚡ Flash Sale sẽ hiển thị nổi bật trên trang chủ và gửi thông báo đến tất cả users.</div>
    <div class="form-group mt-12"><label class="form-label">Tên chương trình</label><input class="form-input" placeholder="Flash Sale tháng 3 - Mừng xuân"></div>
    <div class="form-group"><label class="form-label">Mức giảm</label><input class="form-input" placeholder="30%"></div>
    <div class="form-group"><label class="form-label">Thời gian bắt đầu</label><input class="form-input" type="datetime-local"></div>
    <div class="form-group"><label class="form-label">Thời gian kết thúc</label><input class="form-input" type="datetime-local"></div>
  `, () => showToast('Đã tạo Flash Sale thành công! ⚡'));
}

// ---------- ADMIN CONTENT ----------
function renderAdminContent() {
  document.getElementById('mainContent').innerHTML = `
    <div class="tabs">
      <div class="tab active">Banner trang chủ</div>
      <div class="tab" onclick="showToast('Tab Blog đang phát triển','info')">Blog & SEO</div>
      <div class="tab" onclick="showToast('Tab Trang tĩnh đang phát triển','info')">Trang tĩnh</div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-title">Danh sách banner</div>
        <button class="btn btn-primary btn-sm" onclick="showAddBannerModal()">+ Thêm banner</button>
      </div>
      ${[
        { title:'Flash Sale tháng 3 — Giảm 30%',     pos:'Banner chính',  status:'active',   icon:'🎉' },
        { title:'Mã FPT Student — Giảm 15%',          pos:'Banner phụ',    status:'active',   icon:'🎓' },
        { title:'Dịch vụ tiêm phòng mùa hè',          pos:'Banner popup',  status:'inactive', icon:'💉' },
      ].map((b, i) => `
        <div class="d-flex align-center gap-6" style="padding:12px 0;border-bottom:0.5px solid var(--border-tertiary)">
          <div style="width:90px;height:52px;background:var(--petgo-orange-light);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:24px">${b.icon}</div>
          <div class="flex-1">
            <div class="fw-500" style="font-size:13px">${b.title}</div>
            <div class="text-tiny">${b.pos}</div>
          </div>
          <span class="badge ${b.status === 'active' ? 'badge-success' : 'badge-gray'}">${b.status === 'active' ? 'Đang hiển thị' : 'Ẩn'}</span>
          <button class="btn btn-sm" onclick="showToast('Mở form chỉnh sửa banner')">Sửa</button>
          <button class="btn btn-sm btn-danger" onclick="showToast('Đã ẩn banner','warning')">${b.status === 'active' ? 'Ẩn' : 'Hiện'}</button>
        </div>`).join('')}
    </div>
  `;
}

function showAddBannerModal() {
  openModal('Thêm banner mới', `
    <div class="form-group"><label class="form-label">Tiêu đề banner</label><input class="form-input" placeholder="Flash Sale mùa hè"></div>
    <div class="form-group"><label class="form-label">Mô tả ngắn</label><input class="form-input" placeholder="Giảm đến 40%..."></div>
    <div class="form-group"><label class="form-label">Link hành động</label><input class="form-input" placeholder="/services?promo=summer"></div>
    <div class="form-group"><label class="form-label">Vị trí hiển thị</label><select class="form-input"><option>Banner chính</option><option>Banner phụ</option><option>Banner popup</option></select></div>
    <div class="form-group"><label class="form-label">Thời gian hiển thị</label><input class="form-input" type="date"></div>
  `, () => showToast('Đã thêm banner mới'));
}

// ---------- ADMIN REPORTS ----------
function renderAdminReports() {
  document.getElementById('mainContent').innerHTML = `
    <div class="metrics">
      <div class="metric-card"><div class="metric-label">User mới tháng 3</div><div class="metric-value">312</div><div class="metric-change metric-up">↑ 28% vs T2</div></div>
      <div class="metric-card"><div class="metric-label">Booking tháng 3</div><div class="metric-value">1,203</div><div class="metric-change metric-up">↑ 18%</div></div>
      <div class="metric-card"><div class="metric-label">Doanh thu T3</div><div class="metric-value">48.2M</div><div class="metric-change metric-up">↑ 22%</div></div>
      <div class="metric-card"><div class="metric-label">Khu vực hot nhất</div><div class="metric-value">Quận 1</div><div class="text-tiny mt-8">324 booking</div></div>
    </div>
    <div class="grid2">
      <div class="card">
        <div class="card-header"><div class="card-title">Tăng trưởng người dùng</div></div>
        <div class="chart-wrap"><canvas id="userGrowthChart"></canvas></div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Phân bố theo khu vực</div></div>
        <div class="chart-wrap"><canvas id="areaChart"></canvas></div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-title">Hành vi đặt lịch theo khung giờ</div>
        <button class="btn btn-sm" onclick="showToast('Đã xuất báo cáo Excel')">📊 Xuất Excel</button>
      </div>
      <div class="chart-wrap chart-wrap-sm"><canvas id="hourChart"></canvas></div>
    </div>
  `;
  setTimeout(() => {
    new Chart(document.getElementById('userGrowthChart'), {
      type: 'line',
      data: { labels:['T10','T11','T12','T1','T2','T3'], datasets:[{ label:'User mới', data:[180,220,310,280,245,312], borderColor:'#E8621A', backgroundColor:'rgba(232,98,26,.1)', fill:true, tension:.4 }] },
      options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}} }
    });
    new Chart(document.getElementById('areaChart'), {
      type: 'bar',
      data: { labels:['Q1','Q3','Q5','Bình Thạnh','Gò Vấp','Tân Bình'], datasets:[{ data:[324,256,198,178,145,132], backgroundColor:'#378ADD', borderRadius:4 }] },
      options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}} }
    });
    new Chart(document.getElementById('hourChart'), {
      type: 'bar',
      data: { labels:['6h','7h','8h','9h','10h','11h','12h','13h','14h','15h','16h','17h','18h','19h','20h'], datasets:[{ data:[5,12,28,45,52,38,22,18,42,56,48,35,20,15,8], backgroundColor:'#1D9E75', borderRadius:2 }] },
      options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{y:{display:false}} }
    });
  }, 100);
}

// ---------- ADMIN NOTIFICATIONS ----------
function renderAdminNotifications() {
  document.getElementById('mainContent').innerHTML = `
    <div class="card">
      <div class="card-header">
        <div class="card-title">Thông báo hệ thống</div>
        <button class="btn btn-sm" onclick="showToast('Đã đánh dấu tất cả là đã đọc')">Đọc tất cả</button>
      </div>
      ${DATA.notifications.map(n => `
        <div class="notification-item">
          <div class="notif-icon" style="background:${n.bg}">${n.icon}</div>
          <div class="notif-text">
            <div class="notif-title">${n.title}</div>
            <div class="notif-time">${n.time}</div>
          </div>
          <button class="btn btn-sm" onclick="showToast('Đã xử lý thông báo','success')">Xử lý</button>
        </div>
      `).join('')}
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title">Gửi thông báo thủ công</div></div>
      <div class="form-group"><label class="form-label">Đối tượng nhận</label>
        <select class="form-input">
          <option>Tất cả người dùng (2,847)</option>
          <option>Tất cả đối tác (156)</option>
          <option>Người dùng inactive 30 ngày</option>
          <option>Người dùng có thú cưng sắp tới lịch tiêm</option>
        </select>
      </div>
      <div class="form-group"><label class="form-label">Tiêu đề</label><input class="form-input" placeholder="Nhập tiêu đề thông báo..."></div>
      <div class="form-group"><label class="form-label">Nội dung</label><textarea class="form-input" rows="3" placeholder="Nội dung thông báo..."></textarea></div>
      <div class="form-group"><label class="form-label">Kênh gửi</label>
        <div class="d-flex gap-6 mt-8">
          <label class="d-flex align-center gap-6" style="font-size:13px"><input type="checkbox" checked> In-app</label>
          <label class="d-flex align-center gap-6" style="font-size:13px"><input type="checkbox" checked> Email</label>
          <label class="d-flex align-center gap-6" style="font-size:13px"><input type="checkbox"> SMS</label>
        </div>
      </div>
      <button class="btn btn-primary" onclick="showToast('Đã gửi thông báo đến 2,847 người dùng 🎉','success')">Gửi thông báo</button>
    </div>
  `;
}

// ---------- ADMIN LOGS ----------
function renderAdminLogs() {
  document.getElementById('mainContent').innerHTML = `
    <div class="search-bar">
      <input type="text" placeholder="🔍  Tìm action, người thực hiện...">
      <select><option>Hôm nay</option><option>7 ngày</option><option>30 ngày</option></select>
      <select><option>Tất cả loại</option><option>Duyệt/Từ chối</option><option>Khóa tài khoản</option><option>Tạo voucher</option></select>
      <button class="btn" onclick="showToast('Đã xuất log')">Xuất log</button>
    </div>
    <div class="card mb-0">
      ${DATA.logs.map(l => `
        <div class="log-item">
          <div class="log-time">⏱ ${l.time}</div>
          <div class="log-action">${l.action}</div>
          <div class="log-who">— ${l.who}</div>
        </div>`).join('')}
    </div>
  `;
}

// ============================================================
//  Extended Admin UI/UX Overrides for final delivery
// ============================================================

function renderAdminUsers() {
  const openViolations = DATA.userViolations.filter(v => v.status !== 'resolved').length;
  document.getElementById('mainContent').innerHTML = `
    <div class="metrics metrics-3">
      <div class="metric-card"><div class="metric-label">Tổng user đang quản lý</div><div class="metric-value">${DATA.users.length}</div><div class="metric-change metric-up">${DATA.users.filter(u=>u.status==='active').length} đang hoạt động</div></div>
      <div class="metric-card"><div class="metric-label">Tài khoản bị khóa</div><div class="metric-value">${DATA.users.filter(u=>u.status==='locked').length}</div><div class="metric-change metric-down">Cần theo dõi lại lý do vi phạm</div></div>
      <div class="metric-card"><div class="metric-label">Case vi phạm mở</div><div class="metric-value">${openViolations}</div><div class="metric-change metric-down">Ưu tiên xử lý hôm nay</div></div>
    </div>
    <div class="grid2">
      <div class="card">
        <div class="search-bar" style="margin-bottom:0">
          <input id="userSearch" type="text" placeholder="🔍  Tìm theo tên, email, SĐT..." oninput="filterUsers()">
          <select id="userStatusFilter" onchange="filterUsers()">
            <option value="">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="locked">Bị khóa</option>
            <option value="pending">Chờ xác thực</option>
          </select>
          <button class="btn btn-primary" onclick="showAddUserModal()">+ Thêm user</button>
        </div>
        <table id="usersTable">
          <thead>
            <tr><th>ID</th><th>Họ tên</th><th>Email</th><th>SĐT</th><th>Tham gia</th><th>Booking</th><th>Trạng thái</th><th>Thao tác</th></tr>
          </thead>
          <tbody id="usersBody">${renderUsersRows(DATA.users)}</tbody>
        </table>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Xử lý tài khoản vi phạm</div><button class="btn btn-sm" onclick="showToast('Đã xuất danh sách vi phạm','info')">Xuất danh sách</button></div>
        <div class="stack-list">
          ${DATA.userViolations.map(v => {
            const user = DATA.users.find(u => u.id === v.userId) || {name:v.userId};
            const badge = v.severity === 'high' ? 'badge-danger' : 'badge-warning';
            const status = v.status === 'resolved' ? 'badge-success' : v.status === 'reviewing' ? 'badge-info' : 'badge-warning';
            return `<div class="stack-item">
              <div>
                <div class="fw-500">${user.name}</div>
                <div class="text-muted text-small">${v.reason}</div>
                <div class="text-tiny" style="margin-top:4px">Case ${v.id} · ${v.updated} · ${v.reports} báo cáo</div>
              </div>
              <div class="d-flex flex-column gap-6 align-end">
                <span class="badge ${badge}">${v.severity === 'high' ? 'Nghiêm trọng' : 'Trung bình'}</span>
                <span class="badge ${status}">${v.status === 'resolved' ? 'Đã xử lý' : v.status === 'reviewing' ? 'Đang xem xét' : 'Mở'}</span>
                <div class="d-flex gap-6"><button class="btn btn-sm" onclick="reviewViolation('${v.id}')">Xử lý</button></div>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>`;
}

function reviewViolation(id) {
  const v = DATA.userViolations.find(x => x.id === id);
  if (!v) return;
  const user = DATA.users.find(u => u.id === v.userId) || {name:v.userId};
  openModal(`Xử lý vi phạm ${id}`, `
    <div class="alert alert-warning" style="margin-bottom:12px">⚠ <strong>${user.name}</strong> đang bị ghi nhận: ${v.reason}</div>
    <div class="form-group"><label class="form-label">Hướng xử lý</label>
      <select class="form-input" id="violationAction">
        <option value="reviewing">Chuyển trạng thái đang xem xét</option>
        <option value="lock">Khóa tài khoản ngay</option>
        <option value="resolved">Đánh dấu đã xử lý</option>
      </select>
    </div>
    <div class="form-group"><label class="form-label">Ghi chú nội bộ</label><textarea class="form-input" rows="3" placeholder="Mô tả hướng xử lý và bằng chứng liên quan..."></textarea></div>
  `, () => {
    const action = document.getElementById('violationAction')?.value;
    if (action === 'lock') {
      const userRow = DATA.users.find(u => u.id === v.userId);
      if (userRow) userRow.status = 'locked';
      v.status = 'resolved';
      showToast(`Đã khóa tài khoản ${user.name}`, 'warning');
    } else {
      v.status = action || 'reviewing';
      showToast(`Đã cập nhật case ${id}`);
    }
    renderAdminUsers();
  });
}

function renderAdminPartners() {
  const list = getFilteredPartners();
  document.getElementById('mainContent').innerHTML = `
    <div class="metrics metrics-3">
      <div class="metric-card"><div class="metric-label">Đối tác đã xác minh</div><div class="metric-value">${DATA.partners.filter(p=>p.status==='verified').length}</div><div class="metric-change metric-up">Vận hành ổn định</div></div>
      <div class="metric-card"><div class="metric-label">Đang chờ duyệt</div><div class="metric-value">${DATA.partners.filter(p=>['pending','reviewing'].includes(p.status)).length}</div><div class="metric-change metric-down">Cần đối soát hồ sơ</div></div>
      <div class="metric-card"><div class="metric-label">Đối tác bị khóa</div><div class="metric-value">${DATA.partners.filter(p=>p.status==='locked').length}</div><div class="metric-change metric-down">Theo dõi chất lượng vận hành</div></div>
    </div>
    <div class="search-bar">
      <input type="text" id="partnerSearch" placeholder="🔍  Tìm tên đối tác, địa chỉ..." oninput="filterAdminPartners()">
      <select id="partnerStatusFilter" onchange="filterAdminPartners()">
        <option value="all">Tất cả trạng thái</option>
        <option value="verified">Đã xác minh</option>
        <option value="pending">Chờ duyệt</option>
        <option value="reviewing">Đang xét duyệt</option>
        <option value="locked">Bị khóa</option>
      </select>
      <button class="btn" onclick="showToast('Đã đồng bộ trạng thái xác minh','info')">Đồng bộ xác minh</button>
    </div>
    <div class="card mb-0">
      <table>
        <thead><tr><th>Đối tác</th><th>Loại hình</th><th>Liên hệ</th><th>Booking</th><th>Rating</th><th>Hồ sơ</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
        <tbody id="partnersBody">${list.map(renderAdminPartnerRow).join('')}</tbody>
      </table>
    </div>`;
}

function getFilteredPartners() {
  const q = (document.getElementById('partnerSearch')?.value || '').toLowerCase();
  const s = document.getElementById('partnerStatusFilter')?.value || 'all';
  return DATA.partners.filter(p => (!q || `${p.name} ${p.address}`.toLowerCase().includes(q)) && (s === 'all' || p.status === s));
}

function renderAdminPartnerRow(p) {
  const toggleLabel = p.status === 'locked' ? 'Mở khóa' : 'Khóa';
  const toggleClass = p.status === 'locked' ? 'btn-success' : 'btn-danger';
  return `<tr>
    <td><div class="fw-500">${p.name}</div><div class="text-tiny">${p.address}</div></td>
    <td><span class="badge badge-info">${p.type}</span></td>
    <td>${p.phone}</td>
    <td>${p.bookings}</td>
    <td>${p.rating ? '⭐ ' + p.rating : '—'}</td>
    <td>${p.docs === '✓' ? '<span class="badge badge-success">Đủ hồ sơ</span>' : p.docs === '⟳' ? '<span class="badge badge-info">Đang soát</span>' : '<span class="badge badge-warning">Thiếu bổ sung</span>'}</td>
    <td>${partnerStatusBadge(p.status)}</td>
    <td><div class="d-flex gap-6 flex-wrap">
      <button class="btn btn-sm" onclick="viewPartnerDetail('${p.id}')">Xem</button>
      ${p.status !== 'verified' ? `<button class="btn btn-sm btn-success" onclick="adminApprovePartner('${p.id}')">Duyệt</button>` : ''}
      <button class="btn btn-sm" onclick="markPartnerVerified('${p.id}')">Xác minh</button>
      <button class="btn btn-sm ${toggleClass}" onclick="togglePartnerLock('${p.id}')">${toggleLabel}</button>
    </div></td>
  </tr>`;
}

function filterAdminPartners() {
  const body = document.getElementById('partnersBody');
  if (body) body.innerHTML = getFilteredPartners().map(renderAdminPartnerRow).join('');
}

function viewPartnerDetail(id) {
  const p = DATA.partners.find(x => x.id === id);
  if (!p) return;
  openModal(`Thông tin đối tác ${p.name}`, `
    <table style="width:100%;font-size:13px">
      <tr><td class="text-muted" style="padding:5px 0;width:130px">Mã đối tác</td><td>${p.id}</td></tr>
      <tr><td class="text-muted" style="padding:5px 0">Loại hình</td><td>${p.type}</td></tr>
      <tr><td class="text-muted" style="padding:5px 0">Địa chỉ</td><td>${p.address}</td></tr>
      <tr><td class="text-muted" style="padding:5px 0">Điện thoại</td><td>${p.phone}</td></tr>
      <tr><td class="text-muted" style="padding:5px 0">Ngày tham gia</td><td>${p.joined}</td></tr>
      <tr><td class="text-muted" style="padding:5px 0">Trạng thái xác minh</td><td>${partnerStatusBadge(p.status)}</td></tr>
      <tr><td class="text-muted" style="padding:5px 0">Booking đã xử lý</td><td>${p.bookings}</td></tr>
    </table>
    <div class="alert alert-info" style="margin-top:14px">Hồ sơ pháp lý: ${p.docs === '✓' ? 'Đã đầy đủ và hợp lệ' : 'Cần đối tác bổ sung giấy phép / CCCD / thông tin cửa hàng'}</div>
  `, null, 'Đóng');
}

function adminApprovePartner(id) {
  const p = DATA.partners.find(x => x.id === id);
  if (!p) return;
  p.status = 'verified';
  p.docs = '✓';
  showToast(`Đã duyệt đối tác ${p.name}`,'success');
  renderAdminPartners();
}

function markPartnerVerified(id) {
  const p = DATA.partners.find(x => x.id === id);
  if (!p) return;
  openModal('Gắn trạng thái xác minh', `
    <div class="form-group"><label class="form-label">Trạng thái mới</label>
      <select class="form-input" id="partnerVerificationStatus">
        <option value="verified">Đã xác minh</option>
        <option value="reviewing">Đang xét duyệt</option>
        <option value="pending">Chờ bổ sung hồ sơ</option>
      </select>
    </div>
    <div class="form-group"><label class="form-label">Ghi chú xác minh</label><textarea class="form-input" rows="3" placeholder="VD: Đã kiểm tra giấy phép kinh doanh, ảnh cửa hàng và CCCD đại diện..."></textarea></div>
  `, () => {
    p.status = document.getElementById('partnerVerificationStatus')?.value || 'verified';
    if (p.status === 'verified') p.docs = '✓';
    showToast(`Đã cập nhật xác minh cho ${p.name}`);
    renderAdminPartners();
  });
}

function togglePartnerLock(id) {
  const p = DATA.partners.find(x => x.id === id);
  if (!p) return;
  p.status = p.status === 'locked' ? 'verified' : 'locked';
  showToast(`Đã ${p.status === 'locked' ? 'khóa' : 'mở khóa'} đối tác ${p.name}`, p.status === 'locked' ? 'warning' : 'success');
  renderAdminPartners();
}

function renderAdminBookings() {
  document.getElementById('mainContent').innerHTML = `
    <div class="metrics metrics-3">
      <div class="metric-card"><div class="metric-label">Tổng booking hệ thống</div><div class="metric-value">${DATA.bookings.length}</div><div class="metric-change metric-up">${DATA.bookings.filter(b=>b.status==='confirmed').length} đã xác nhận</div></div>
      <div class="metric-card"><div class="metric-label">Đơn cần can thiệp</div><div class="metric-value">${DATA.bookingDisputes.filter(d=>d.status!=='resolved').length}</div><div class="metric-change metric-down">Có tranh chấp / đổi lịch</div></div>
      <div class="metric-card"><div class="metric-label">Tỷ lệ hủy mẫu</div><div class="metric-value">${Math.round((DATA.bookings.filter(b=>b.status==='cancelled').length / DATA.bookings.length) * 100)}%</div><div class="metric-change metric-down">Theo dõi nguyên nhân huỷ</div></div>
    </div>
    <div class="grid2">
      <div class="card">
        <div class="search-bar" style="margin-bottom:0">
          <input type="text" id="bkSearch" placeholder="🔍  Tìm booking ID, khách hàng..." oninput="filterAdminBookings()">
          <select id="bkStatusFilter" onchange="filterAdminBookings()">
            <option value="">Tất cả trạng thái</option>
            <option value="pending">Chờ xác nhận</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="in_progress">Đang thực hiện</option>
            <option value="completed">Hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>
        <table>
          <thead><tr><th>Mã</th><th>Khách</th><th>Dịch vụ</th><th>Đối tác</th><th>Lịch hẹn</th><th>Tiền</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
          <tbody id="bookingsBody">${renderBookingRows(DATA.bookings)}</tbody>
        </table>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Tranh chấp / can thiệp booking</div><button class="btn btn-sm" onclick="showToast('Đã chuyển danh sách cho đội CS','info')">Giao CSKH</button></div>
        <div class="stack-list">
          ${DATA.bookingDisputes.map(d => `<div class="stack-item">
            <div>
              <div class="fw-500">${d.bookingId} · ${d.customer} ↔ ${d.partner}</div>
              <div class="text-muted text-small">${d.issue}</div>
              <div class="text-tiny" style="margin-top:4px">Mức độ: ${d.priority === 'high' ? 'Cao' : 'Trung bình'} · Trạng thái: ${d.status === 'open' ? 'Mở' : d.status === 'processing' ? 'Đang xử lý' : 'Đã xong'}</div>
            </div>
            <div class="d-flex gap-6 flex-wrap">
              <button class="btn btn-sm" onclick="resolveDispute('${d.id}')">Can thiệp</button>
              <button class="btn btn-sm btn-primary" onclick="viewAdminBooking('${d.bookingId}')">Mở booking</button>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>`;
}

function resolveDispute(id) {
  const d = DATA.bookingDisputes.find(x => x.id === id);
  if (!d) return;
  openModal(`Can thiệp tranh chấp ${d.bookingId}`, `
    <div class="alert alert-danger" style="margin-bottom:12px">${d.issue}</div>
    <div class="form-group"><label class="form-label">Quyết định xử lý</label>
      <select class="form-input" id="disputeAction">
        <option value="processing">Yêu cầu bổ sung chứng cứ</option>
        <option value="confirm">Cập nhật booking thành đã xác nhận</option>
        <option value="cancel">Hủy booking và hoàn tiền</option>
        <option value="resolved">Đánh dấu đã xử lý</option>
      </select>
    </div>
  `, () => {
    const action = document.getElementById('disputeAction')?.value || 'resolved';
    const b = DATA.bookings.find(x => x.id === d.bookingId);
    if (b && action === 'confirm') b.status = 'confirmed';
    if (b && action === 'cancel') b.status = 'cancelled';
    d.status = action === 'processing' ? 'processing' : 'resolved';
    showToast(`Đã cập nhật xử lý cho ${d.bookingId}`);
    renderAdminBookings();
  });
}

function renderAdminServices() {
  document.getElementById('mainContent').innerHTML = `
    <div class="grid2">
      <div class="card">
        <div class="card-header"><div class="card-title">Dịch vụ toàn hệ thống</div><button class="btn btn-primary btn-sm" onclick="showAddCategoryModal()">+ Danh mục mới</button></div>
        <table>
          <thead><tr><th>ID</th><th>Tên dịch vụ</th><th>Danh mục</th><th>Đối tác</th><th>Giá</th><th>Thời lượng</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
          <tbody>
            ${DATA.services.map(s => `<tr>
              <td class="text-tiny">${s.id}</td>
              <td class="fw-500">${s.name}</td>
              <td><span class="badge badge-info">${s.category}</span></td>
              <td>${s.partner}</td>
              <td>${s.price}</td>
              <td>${s.duration}</td>
              <td>${s.status === 'active' ? '<span class="badge badge-success">Hiển thị</span>' : '<span class="badge badge-warning">Chờ duyệt</span>'}</td>
              <td><div class="d-flex gap-6 flex-wrap">
                ${s.status === 'pending' ? `<button class="btn btn-sm btn-success" onclick="approveService('${s.id}')">Duyệt</button>` : ''}
                <button class="btn btn-sm" onclick="editServiceType('${s.id}')">Chuẩn hóa loại</button>
                <button class="btn btn-sm btn-danger" onclick="toggleServiceVisibility('${s.id}')">${s.status === 'hidden' ? 'Hiện' : 'Ẩn'}</button>
              </div></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Danh mục dịch vụ chuẩn</div><button class="btn btn-sm" onclick="showToast('Đã mở form chỉnh sửa danh mục','info')">Sửa nhanh</button></div>
        <div class="stack-list">
          ${DATA.serviceCategories.map(c => `<div class="stack-item">
            <div>
              <div class="fw-500">${c.name}</div>
              <div class="text-muted text-small">Chuẩn hiển thị: ${c.normalized}</div>
              <div class="text-tiny" style="margin-top:4px">${c.services} dịch vụ đang dùng danh mục này</div>
            </div>
            <div class="d-flex gap-6 flex-wrap">
              <span class="badge ${c.status === 'active' ? 'badge-success' : 'badge-warning'}">${c.status === 'active' ? 'Đang dùng' : 'Bản nháp'}</span>
              <button class="btn btn-sm" onclick="editCategory('${c.id}')">Sửa</button>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>`;
}

function approveService(id) {
  const s = DATA.services.find(x => x.id === id);
  if (!s) return;
  s.status = 'active';
  showToast(`Đã duyệt dịch vụ ${s.name}`,'success');
  renderAdminServices();
}

function toggleServiceVisibility(id) {
  const s = DATA.services.find(x => x.id === id);
  if (!s) return;
  s.status = s.status === 'hidden' ? 'active' : 'hidden';
  showToast(`Đã ${s.status === 'hidden' ? 'ẩn' : 'hiện'} dịch vụ ${s.name}`, s.status === 'hidden' ? 'warning' : 'success');
  renderAdminServices();
}

function editServiceType(id) {
  const s = DATA.services.find(x => x.id === id);
  if (!s) return;
  openModal(`Chuẩn hóa loại dịch vụ`, `
    <div class="form-group"><label class="form-label">Tên dịch vụ gốc</label><input class="form-input" value="${s.name}" readonly></div>
    <div class="form-group"><label class="form-label">Danh mục chuẩn</label>
      <select class="form-input" id="normalizedCategory">${DATA.serviceCategories.map(c => `<option ${c.name === s.category ? 'selected' : ''}>${c.name}</option>`).join('')}</select>
    </div>
    <div class="form-group"><label class="form-label">Tên hiển thị chuẩn</label><input class="form-input" id="normalizedName" value="${s.name}"></div>
  `, () => {
    s.category = document.getElementById('normalizedCategory')?.value || s.category;
    s.name = document.getElementById('normalizedName')?.value || s.name;
    showToast('Đã chuẩn hóa loại dịch vụ');
    renderAdminServices();
  });
}

function editCategory(id) {
  const c = DATA.serviceCategories.find(x => x.id === id);
  if (!c) return;
  openModal(`Sửa danh mục ${c.name}`, `
    <div class="form-group"><label class="form-label">Tên danh mục</label><input class="form-input" id="categoryName" value="${c.name}"></div>
    <div class="form-group"><label class="form-label">Tên chuẩn hiển thị</label><input class="form-input" id="categoryNormalized" value="${c.normalized}"></div>
  `, () => {
    c.name = document.getElementById('categoryName')?.value || c.name;
    c.normalized = document.getElementById('categoryNormalized')?.value || c.normalized;
    showToast('Đã cập nhật danh mục dịch vụ');
    renderAdminServices();
  });
}

function renderAdminReviews() {
  const reported = DATA.reviews.filter(r => r.status === 'reported');
  document.getElementById('mainContent').innerHTML = `
    <div class="metrics metrics-3">
      <div class="metric-card"><div class="metric-label">Tổng review</div><div class="metric-value">${DATA.reviews.length}</div><div class="metric-change metric-up">Điểm TB 4.3/5</div></div>
      <div class="metric-card"><div class="metric-label">Review bị báo cáo</div><div class="metric-value">${reported.length}</div><div class="metric-change metric-down">Ưu tiên kiểm duyệt</div></div>
      <div class="metric-card"><div class="metric-label">Khiếu nại đang mở</div><div class="metric-value">2</div><div class="metric-change metric-down">Từ đối tác và khách hàng</div></div>
    </div>
    <div class="grid2">
      <div class="card mb-0">
        <div class="card-header"><div class="card-title">Danh sách review</div></div>
        <div id="adminReviewList">${renderReviewAdminItems(DATA.reviews)}</div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Xử lý khiếu nại review</div></div>
        <div class="stack-list">
          ${reported.map(r => `<div class="stack-item">
            <div>
              <div class="fw-500">${r.partner} · ${r.user}</div>
              <div class="text-muted text-small">${r.text}</div>
              <div class="text-tiny" style="margin-top:4px">Lý do mẫu: thông tin gây tranh cãi / bị đối tác phản hồi</div>
            </div>
            <div class="d-flex gap-6 flex-wrap">
              <button class="btn btn-sm" onclick="handleReviewComplaint('${r.id}')">Xử lý khiếu nại</button>
              <button class="btn btn-sm btn-danger" onclick="adminHideReview('${r.id}')">Ẩn</button>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>`;
}

function handleReviewComplaint(id) {
  openModal('Xử lý khiếu nại review', `
    <div class="form-group"><label class="form-label">Kết quả xử lý</label>
      <select class="form-input" id="reviewComplaintAction">
        <option value="keep">Giữ review hiển thị</option>
        <option value="hide">Ẩn review vi phạm</option>
        <option value="escalate">Chuyển quản trị viên cấp cao</option>
      </select>
    </div>
    <div class="form-group"><label class="form-label">Phản hồi nội bộ</label><textarea class="form-input" rows="3" placeholder="Tóm tắt căn cứ xử lý khiếu nại..."></textarea></div>
  `, () => {
    const action = document.getElementById('reviewComplaintAction')?.value;
    if (action === 'hide') {
      const r = DATA.reviews.find(x => x.id === id); if (r) r.status = 'hidden';
    }
    showToast('Đã xử lý khiếu nại review');
    renderAdminReviews();
  });
}

function renderAdminNotifications() {
  document.getElementById('mainContent').innerHTML = `
    <div class="metrics metrics-3">
      <div class="metric-card"><div class="metric-label">Thông báo booking mới</div><div class="metric-value">${DATA.operationNotifications.filter(n=>n.template==='booking_new').length}</div><div class="metric-change metric-up">Đã gửi cho đối tác</div></div>
      <div class="metric-card"><div class="metric-label">Xác nhận booking khách</div><div class="metric-value">${DATA.operationNotifications.filter(n=>n.template==='booking_confirmed').length}</div><div class="metric-change metric-up">Đồng bộ theo trạng thái booking</div></div>
      <div class="metric-card"><div class="metric-label">Thông báo hủy lịch</div><div class="metric-value">${DATA.operationNotifications.filter(n=>n.template==='booking_cancelled').length}</div><div class="metric-change metric-down">Có 1 thông báo chờ gửi</div></div>
    </div>
    <div class="grid2">
      <div class="card">
        <div class="card-header"><div class="card-title">Notification / vận hành cơ bản</div><button class="btn btn-sm" onclick="sendBulkOperationNotice()">Gửi thông báo thủ công</button></div>
        <div class="stack-list">
          ${DATA.operationNotifications.map(n => `<div class="stack-item">
            <div>
              <div class="fw-500">${n.title}</div>
              <div class="text-muted text-small">Kênh: ${n.channel} · Template: ${n.template}</div>
            </div>
            <div class="d-flex flex-column gap-6 align-end">
              <span class="badge ${n.status === 'sent' || n.status === 'logged' ? 'badge-success' : 'badge-warning'}">${n.status === 'queued' ? 'Chờ gửi' : n.status === 'logged' ? 'Đã log' : 'Đã gửi'}</span>
              <span class="text-tiny">${n.time}</span>
            </div>
          </div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Log hoạt động admin cơ bản</div><button class="btn btn-sm" onclick="renderPanel('admin-logs')">Xem log đầy đủ</button></div>
        <div class="timeline-list">
          ${DATA.logs.slice(0,6).map(l => `<div class="timeline-item"><div class="timeline-dot"></div><div><div class="fw-500">${l.action}</div><div class="text-tiny">${l.time} · ${l.who}</div></div></div>`).join('')}
        </div>
      </div>
    </div>`;
}

function sendBulkOperationNotice() {
  openModal('Gửi thông báo vận hành', `
    <div class="form-group"><label class="form-label">Đối tượng</label><select class="form-input"><option>Toàn bộ đối tác</option><option>Khách hàng có booking hôm nay</option><option>Đối tác đang chờ xác minh</option></select></div>
    <div class="form-group"><label class="form-label">Nội dung</label><textarea class="form-input" rows="4" placeholder="Ví dụ: Hệ thống sẽ bảo trì từ 23:00 đến 23:30 tối nay..."></textarea></div>
  `, () => showToast('Đã tạo thông báo vận hành')); 
}
