// ============================================================
//  PetGo — Partner Panel Renderers
// ============================================================

// ---------- PARTNER DASHBOARD ----------
function renderPartnerDashboard() {
  document.getElementById('mainContent').innerHTML = `
    <div class="alert alert-success" style="margin-bottom:16px">
      <span style="font-size:22px">✂️</span>
      <div class="flex-1">
        <div class="fw-500" style="font-size:15px">Pawsome Spa & Grooming</div>
        <div class="text-muted" style="font-size:13px">123 Lê Lợi, Q1, TP.HCM · ✓ Đã xác minh · Gói <strong>Pro</strong></div>
      </div>
      <button class="btn btn-sm" onclick="showEditProfileModal()">Cập nhật hồ sơ</button>
    </div>
    <div class="metrics">
      <div class="metric-card"><div class="metric-label">Booking tháng này</div><div class="metric-value">145</div><div class="metric-change metric-up">↑ 12% vs T2</div></div>
      <div class="metric-card"><div class="metric-label">Doanh thu (VNĐ)</div><div class="metric-value">36.5M</div><div class="metric-change metric-up">↑ 18%</div></div>
      <div class="metric-card"><div class="metric-label">Rating trung bình</div><div class="metric-value">4.8 ★</div><div class="text-tiny mt-8">247 đánh giá</div></div>
      <div class="metric-card"><div class="metric-label">Chờ xác nhận</div><div class="metric-value">2</div><div class="metric-change metric-down">Cần xử lý ngay!</div></div>
    </div>
    <div class="grid2">
      <div class="card">
        <div class="card-header">
          <div class="card-title">📅 Booking hôm nay (17/03)</div>
          <button class="btn btn-sm" onclick="renderPanel('partner-bookings')">Xem tất cả</button>
        </div>
        ${DATA.partnerBookings.filter(b => b.date === '17/03/2025').map(b => `
          <div class="d-flex align-center gap-6" style="padding:10px 0;border-bottom:0.5px solid var(--border-tertiary)">
            <div style="width:42px;height:42px;border-radius:8px;background:var(--petgo-orange-light);display:flex;align-items:center;justify-content:center;font-size:20px">🐾</div>
            <div class="flex-1">
              <div class="fw-500" style="font-size:13px">${b.customer}</div>
              <div class="text-tiny">${b.pet} · ${b.service}</div>
            </div>
            <div style="text-align:right">
              <div style="font-size:13px">${b.time}</div>
              ${statusBadge(b.status)}
            </div>
          </div>`).join('')}
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Doanh thu 7 ngày gần nhất</div></div>
        <div class="chart-wrap"><canvas id="partnerRevChart"></canvas></div>
      </div>
    </div>
  `;
  setTimeout(() => {
    new Chart(document.getElementById('partnerRevChart'), {
      type: 'line',
      data: {
        labels: ['11/3','12/3','13/3','14/3','15/3','16/3','17/3'],
        datasets: [{ label:'Doanh thu', data:[1200000,980000,1450000,1100000,1680000,1350000,1920000], borderColor:'#E8621A', backgroundColor:'rgba(232,98,26,.1)', fill:true, tension:.4 }]
      },
      options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{y:{ticks:{callback:v=>Math.round(v/1000000)+'M'}}} }
    });
  }, 100);
}

function showEditProfileModal() {
  openModal('Cập nhật hồ sơ cửa hàng', `
    <div class="form-group"><label class="form-label">Tên cửa hàng</label><input class="form-input" value="Pawsome Spa & Grooming"></div>
    <div class="form-group"><label class="form-label">Mô tả</label><textarea class="form-input" rows="3">Chuyên spa, grooming và chăm sóc thú cưng cao cấp tại TP.HCM.</textarea></div>
    <div class="form-group"><label class="form-label">Địa chỉ</label><input class="form-input" value="123 Lê Lợi, Q1, TP.HCM"></div>
    <div class="form-group"><label class="form-label">Số điện thoại</label><input class="form-input" value="0281234567"></div>
    <div class="form-group"><label class="form-label">Website</label><input class="form-input" placeholder="https://pawsome.vn"></div>
  `, () => showToast('Đã cập nhật hồ sơ cửa hàng'));
}

// ---------- PARTNER BOOKINGS ----------
function renderPartnerBookings() {
  const pending = DATA.partnerBookings.filter(b => b.status === 'pending');
  document.getElementById('mainContent').innerHTML = `
    <div class="tabs">
      <div class="tab active" onclick="switchPartnerBkTab(this,'all')">Tất cả (${DATA.partnerBookings.length})</div>
      <div class="tab" onclick="switchPartnerBkTab(this,'pending')">Chờ xác nhận (${pending.length})</div>
      <div class="tab" onclick="switchPartnerBkTab(this,'confirmed')">Đã xác nhận</div>
      <div class="tab" onclick="switchPartnerBkTab(this,'in_progress')">Đang thực hiện</div>
      <div class="tab" onclick="switchPartnerBkTab(this,'completed')">Hoàn thành</div>
    </div>
    <div id="partnerBkList">${DATA.partnerBookings.map(b => renderPartnerBkCard(b)).join('')}</div>
  `;
}

function renderPartnerBkCard(b) {
  return `<div class="card" id="pbk-${b.id}">
    <div class="d-flex justify-between align-center" style="margin-bottom:10px">
      <div><span class="text-tiny">${b.id}</span> <span class="fw-500" style="font-size:14px">${b.customer}</span></div>
      ${statusBadge(b.status)}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:13px;margin-bottom:12px">
      <div><span class="text-muted">Thú cưng:</span> ${b.pet}</div>
      <div><span class="text-muted">Dịch vụ:</span> ${b.service}</div>
      <div><span class="text-muted">Ngày:</span> ${b.date}</div>
      <div><span class="text-muted">Giờ:</span> ${b.time}</div>
      <div><span class="text-muted">Số tiền:</span> <span class="text-orange fw-500">${fmt(b.amount)}</span></div>
      ${b.note ? `<div><span class="text-muted">⚠ Ghi chú:</span> <span style="color:var(--text-danger)">${b.note}</span></div>` : '<div></div>'}
    </div>
    <div class="d-flex gap-6 flex-wrap">
      ${b.status === 'pending' ? `
        <button class="btn btn-sm btn-success" onclick="partnerConfirmBk('${b.id}')">✓ Xác nhận</button>
        <button class="btn btn-sm btn-danger" onclick="partnerRejectBk('${b.id}')">✗ Từ chối</button>` : ''}
      ${b.status === 'confirmed' ? `<button class="btn btn-sm btn-primary" onclick="partnerStartBk('${b.id}')">▶ Bắt đầu thực hiện</button>` : ''}
      ${b.status === 'in_progress' ? `<button class="btn btn-sm btn-success" onclick="partnerCompleteBk('${b.id}')">✓ Hoàn thành</button>` : ''}
      <button class="btn btn-sm" onclick="viewPetProfileModal('${b.id}')">🐾 Hồ sơ thú cưng</button>
      <button class="btn btn-sm" onclick="addBkNote('${b.id}')">📝 Ghi chú nội bộ</button>
      ${b.status === 'confirmed' || b.status === 'pending' ? `<button class="btn btn-sm btn-warning" onclick="partnerRescheduleBk('${b.id}')">🔄 Đổi lịch</button>` : ''}
    </div>
  </div>`;
}

function switchPartnerBkTab(el, filter) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const list = filter === 'all' ? DATA.partnerBookings : DATA.partnerBookings.filter(b => b.status === filter);
  document.getElementById('partnerBkList').innerHTML = list.length
    ? list.map(b => renderPartnerBkCard(b)).join('')
    : '<div style="text-align:center;padding:40px;color:var(--text-secondary)">Không có booking nào</div>';
}

function partnerConfirmBk(id) {
  const b = DATA.partnerBookings.find(x => x.id === id);
  openModal('Xác nhận booking', `
    <p style="font-size:14px">Xác nhận booking <strong>${b.id}</strong> của khách <strong>${b.customer}</strong>?</p>
    <p class="text-muted mt-8" style="font-size:13px">Khách hàng sẽ nhận thông báo xác nhận qua app và email.</p>
  `, () => {
    b.status = 'confirmed';
    showToast(`Đã xác nhận booking ${id} ✓`, 'success');
    renderPartnerBookings();
  });
}

function partnerRejectBk(id) {
  openModal('Từ chối booking', `
    <div class="form-group"><label class="form-label">Lý do từ chối</label>
      <select class="form-input" style="margin-bottom:8px">
        <option>Hết slot trong khung giờ này</option>
        <option>Nhân viên nghỉ bệnh</option>
        <option>Cửa hàng bảo trì</option>
        <option>Khác</option>
      </select>
    </div>
    <div class="form-group"><label class="form-label">Ghi chú thêm cho khách</label><textarea class="form-input" rows="2" placeholder="VD: Xin lỗi, vui lòng đặt lại vào ngày khác..."></textarea></div>
  `, () => showToast('Đã từ chối booking', 'warning'));
}

function partnerStartBk(id) {
  const b = DATA.partnerBookings.find(x => x.id === id);
  b.status = 'in_progress';
  showToast('Bắt đầu thực hiện dịch vụ 🐾');
  renderPartnerBookings();
}

function partnerCompleteBk(id) {
  const b = DATA.partnerBookings.find(x => x.id === id);
  openModal('Hoàn thành dịch vụ', `
    <p style="font-size:14px;margin-bottom:12px">Xác nhận hoàn thành dịch vụ cho <strong>${b.customer}</strong>?</p>
    <div class="form-group"><label class="form-label">Ghi chú sau dịch vụ (tùy chọn)</label><textarea class="form-input" rows="2" placeholder="VD: Mochi đã được cắt tỉa đẹp, chủ nhân rất hài lòng..."></textarea></div>
  `, () => {
    b.status = 'completed';
    showToast('Hoàn thành dịch vụ thành công! 🎉', 'success');
    renderPartnerBookings();
  });
}

function partnerRescheduleBk(id) {
  openModal('Đổi lịch hẹn', `
    <div class="alert alert-info mb-0" style="margin-bottom:12px">ℹ Khách hàng sẽ nhận thông báo yêu cầu đổi lịch.</div>
    <div class="form-group"><label class="form-label">Ngày mới</label><input class="form-input" type="date"></div>
    <div class="form-group"><label class="form-label">Khung giờ mới</label>
      <select class="form-input">
        <option>08:00 – 09:00</option><option>09:00 – 10:00</option><option>10:00 – 11:00</option>
        <option>13:00 – 14:00</option><option>14:00 – 15:00</option><option>15:00 – 16:00</option>
      </select>
    </div>
    <div class="form-group"><label class="form-label">Lý do đổi</label><textarea class="form-input" rows="2" placeholder="VD: Slot trước hết chỗ, xin lỗi quý khách..."></textarea></div>
  `, () => showToast('Đã gửi yêu cầu đổi lịch cho khách hàng'));
}

function viewPetProfileModal(id) {
  const b = DATA.partnerBookings.find(x => x.id === id);
  const pet = DATA.partnerPets.find(p => p.owner === b.customer) || { name:'—', type:'—', age:'—', weight:'—', note:'', visits:0, last:'—' };
  openModal(`Hồ sơ thú cưng — ${b.pet}`, `
    <div class="d-flex align-center gap-6" style="margin-bottom:16px">
      <div style="width:50px;height:50px;border-radius:10px;background:var(--petgo-orange-light);display:flex;align-items:center;justify-content:center;font-size:28px">🐾</div>
      <div><div class="fw-500" style="font-size:15px">${b.pet}</div><div class="text-muted" style="font-size:13px">Chủ: ${b.customer}</div></div>
    </div>
    ${b.note ? `<div class="alert alert-danger" style="margin-bottom:12px">⚠ <strong>Lưu ý đặc biệt:</strong> ${b.note}</div>` : ''}
    <table style="width:100%;font-size:13px">
      <tr><td class="text-muted" style="padding:5px 0;width:130px">Số lần đến</td><td>${pet.visits} lần</td></tr>
      <tr><td class="text-muted" style="padding:5px 0">Lần gần nhất</td><td>${pet.last}</td></tr>
      <tr><td class="text-muted" style="padding:5px 0">Dịch vụ đã dùng</td><td>Tắm & Cắt tỉa, Spa</td></tr>
    </table>
  `, null, 'Đóng');
}

function addBkNote(id) {
  openModal('Ghi chú nội bộ', `
    <p class="text-muted" style="font-size:13px;margin-bottom:12px">Ghi chú này chỉ hiển thị cho staff, không gửi cho khách hàng.</p>
    <div class="form-group"><label class="form-label">Ghi chú</label><textarea class="form-input" rows="4" placeholder="VD: Chó hay cắn, cần đeo mõm. Chủ nhân dặn không dùng máy sấy nóng. Lần trước dị ứng xà phòng hương chanh..."></textarea></div>
  `, () => showToast('Đã lưu ghi chú nội bộ'));
}

// ---------- PARTNER SERVICES ----------
function renderPartnerServices() {
  document.getElementById('mainContent').innerHTML = `
    <div class="d-flex justify-between align-center" style="margin-bottom:14px">
      <div class="d-flex gap-6">
        <span class="badge badge-success">${DATA.partnerServices.filter(s => s.status === 'active').length} dịch vụ đang hoạt động</span>
        <span class="badge badge-gray">${DATA.partnerServices.filter(s => s.status === 'inactive').length} đã tắt</span>
      </div>
      <button class="btn btn-primary" onclick="showAddPartnerServiceModal()">+ Thêm dịch vụ</button>
    </div>
    ${DATA.partnerServices.map(s => `
      <div class="card">
        <div class="d-flex justify-between align-center">
          <div class="flex-1">
            <div class="d-flex align-center gap-6" style="margin-bottom:6px">
              <span class="fw-500" style="font-size:14px">${s.name}</span>
              <span class="badge badge-info">${s.category}</span>
              <span class="badge ${s.status === 'active' ? 'badge-success' : 'badge-gray'}">${s.status === 'active' ? 'Hoạt động' : 'Đã tắt'}</span>
            </div>
            <div class="d-flex gap-6 flex-wrap" style="font-size:13px;color:var(--text-secondary)">
              <span>💰 ${s.priceSmall.toLocaleString()}đ – ${s.priceLarge.toLocaleString()}đ</span>
              <span>⏱ ${s.duration} phút</span>
            </div>
          </div>
          <div class="d-flex gap-6">
            <button class="btn btn-sm" onclick="editPartnerService('${s.id}')">✏ Sửa</button>
            <button class="btn btn-sm ${s.status === 'active' ? 'btn-danger' : 'btn-success'}" onclick="togglePartnerService('${s.id}','${s.status}')">
              ${s.status === 'active' ? '⏸ Tắt' : '▶ Bật'}
            </button>
          </div>
        </div>
      </div>`).join('')}
  `;
}

function showAddPartnerServiceModal() {
  openModal('Thêm dịch vụ mới', `
    <div class="form-group"><label class="form-label">Tên dịch vụ</label><input class="form-input" placeholder="VD: Tắm & Sấy cao cấp"></div>
    <div class="form-group"><label class="form-label">Danh mục</label>
      <select class="form-input"><option>Grooming</option><option>Spa</option><option>Thú y</option><option>Lưu trú</option></select>
    </div>
    <div class="form-group"><label class="form-label">Giá thú nhỏ (đ)</label><input class="form-input" type="number" placeholder="80000"></div>
    <div class="form-group"><label class="form-label">Giá thú lớn (đ)</label><input class="form-input" type="number" placeholder="200000"></div>
    <div class="form-group"><label class="form-label">Thời lượng (phút)</label><input class="form-input" type="number" placeholder="60"></div>
    <div class="form-group"><label class="form-label">Mô tả dịch vụ</label><textarea class="form-input" rows="3" placeholder="Chi tiết dịch vụ..."></textarea></div>
  `, () => showToast('Đã thêm dịch vụ mới — chờ admin duyệt'));
}

function editPartnerService(id) {
  const s = DATA.partnerServices.find(x => x.id === id);
  openModal(`Sửa dịch vụ: ${s.name}`, `
    <div class="form-group"><label class="form-label">Tên dịch vụ</label><input class="form-input" value="${s.name}"></div>
    <div class="form-group"><label class="form-label">Giá thú nhỏ (đ)</label><input class="form-input" type="number" value="${s.priceSmall}"></div>
    <div class="form-group"><label class="form-label">Giá thú lớn (đ)</label><input class="form-input" type="number" value="${s.priceLarge}"></div>
    <div class="form-group"><label class="form-label">Thời lượng (phút)</label><input class="form-input" type="number" value="${s.duration}"></div>
  `, () => showToast(`Đã cập nhật dịch vụ ${s.name}`));
}

function togglePartnerService(id, status) {
  const s = DATA.partnerServices.find(x => x.id === id);
  s.status = status === 'active' ? 'inactive' : 'active';
  showToast(`Đã ${s.status === 'active' ? 'bật' : 'tắt'} dịch vụ ${s.name}`);
  renderPartnerServices();
}

// ---------- PARTNER SCHEDULE ----------
function renderPartnerSchedule() {
  const days = ['T2','T3','T4','T5','T6','T7','CN'];
  const dayStatus = ['available','available','busy','partial','available','available','off'];
  const slots = ['08:00','09:00','10:00','11:00','13:00','14:00','15:00','16:00','17:00'];
  const slotUsed = [2,3,0,2,1,3,2,1,0];
  const maxSlot = 3;

  document.getElementById('mainContent').innerHTML = `
    <div class="card" style="margin-bottom:16px">
      <div class="card-header">
        <div class="card-title">Trạng thái tuần này (17–23/03/2025)</div>
        <button class="btn btn-sm btn-primary" onclick="showToast('Đã lưu lịch làm việc ✓','success')">Lưu thay đổi</button>
      </div>
      <p class="text-muted" style="font-size:12px;margin-bottom:12px">Nhấn vào ô ngày để thay đổi trạng thái · <span style="color:var(--text-success)">Xanh = Còn trống</span> · <span style="color:var(--text-danger)">Đỏ = Đầy chỗ</span> · <span style="color:var(--text-warning)">Vàng = Còn ít</span> · <span style="color:var(--text-tertiary)">Xám = Nghỉ</span></p>
      <div class="schedule-grid" id="scheduleGrid">
        ${days.map((d, i) => `
          <div class="day-cell ${dayStatus[i]}" data-day="${d}" onclick="cycleDay(this)">
            ${d}<br>
            <span style="font-size:10px" class="day-status-label">${{ available:'Còn trống', busy:'Đầy chỗ', partial:'Còn ít', off:'Nghỉ' }[dayStatus[i]]}</span>
          </div>`).join('')}
      </div>
    </div>

    <div class="card" style="margin-bottom:16px">
      <div class="card-header">
        <div class="card-title">Quản lý slot — Thứ 4 (19/03)</div>
        <button class="btn btn-sm" onclick="showAddSlotModal()">+ Thêm slot</button>
      </div>
      <div class="slot-grid">
        ${slots.map((s, i) => `
          <div class="slot-item" onclick="editSlot('${s}',${slotUsed[i]},${maxSlot})">
            <div class="fw-500" style="font-size:14px">${s}</div>
            <div class="text-muted" style="font-size:12px;margin:4px 0">${slotUsed[i]}/${maxSlot} chỗ</div>
            <div class="progress-bar">
              <div class="progress-fill" style="width:${Math.round(slotUsed[i]/maxSlot*100)}%${slotUsed[i]===maxSlot?';background:#E24B4A':''}"></div>
            </div>
          </div>`).join('')}
      </div>
    </div>

    <div class="card">
      <div class="card-header"><div class="card-title">Chặn ngày nghỉ</div></div>
      <div class="grid2" style="margin-bottom:12px">
        <div class="form-group mb-0"><label class="form-label">Ngày cần chặn</label><input class="form-input" type="date"></div>
        <div class="form-group mb-0"><label class="form-label">Lý do</label><input class="form-input" placeholder="Nghỉ tết, bảo trì..."></div>
      </div>
      <button class="btn btn-danger btn-sm" onclick="showToast('Đã chặn ngày nghỉ','warning')">Chặn ngày này</button>
      <div class="mt-12" style="font-size:13px;color:var(--text-secondary)">Ngày đã chặn: <strong>30/04/2025</strong> (Giỗ tổ Hùng Vương), <strong>01/05/2025</strong> (Quốc tế lao động)</div>
    </div>
  `;
}

function cycleDay(el) {
  const statuses = ['available','busy','partial','off'];
  const labels = { available:'Còn trống', busy:'Đầy chỗ', partial:'Còn ít', off:'Nghỉ' };
  const cur = statuses.find(s => el.classList.contains(s)) || 'available';
  const next = statuses[(statuses.indexOf(cur) + 1) % statuses.length];
  statuses.forEach(s => el.classList.remove(s));
  el.classList.add(next);
  el.querySelector('.day-status-label').textContent = labels[next];
}

function editSlot(time, used, max) {
  openModal(`Quản lý slot ${time}`, `
    <div class="form-group"><label class="form-label">Số lượng tối đa</label><input class="form-input" type="number" value="${max}" min="1" max="10"></div>
    <div class="form-group"><label class="form-label">Trạng thái slot</label>
      <select class="form-input"><option>Mở — nhận booking</option><option>Đóng tạm thời</option><option>Chỉ nhận booking thủ công</option></select>
    </div>
    <p class="text-muted" style="font-size:13px">Hiện có ${used}/${max} chỗ đã đặt.</p>
  `, () => showToast(`Đã cập nhật slot ${time}`));
}

function showAddSlotModal() {
  openModal('Thêm slot mới', `
    <div class="form-group"><label class="form-label">Giờ bắt đầu</label><input class="form-input" type="time" value="18:00"></div>
    <div class="form-group"><label class="form-label">Giờ kết thúc</label><input class="form-input" type="time" value="19:00"></div>
    <div class="form-group"><label class="form-label">Số lượng tối đa</label><input class="form-input" type="number" value="3"></div>
  `, () => showToast('Đã thêm slot 18:00 – 19:00'));
}

// ---------- PARTNER REVIEWS ----------
function renderPartnerReviews() {
  document.getElementById('mainContent').innerHTML = `
    <div class="metrics metrics-3" style="margin-bottom:16px">
      <div class="metric-card"><div class="metric-label">Rating trung bình</div><div class="metric-value">4.8 ★</div></div>
      <div class="metric-card"><div class="metric-label">Tổng đánh giá</div><div class="metric-value">247</div></div>
      <div class="metric-card"><div class="metric-label">Chưa phản hồi</div><div class="metric-value">12</div><div class="metric-change metric-down">Nên phản hồi sớm</div></div>
    </div>
    <div class="card mb-0">
      ${DATA.reviews.map(r => `
        <div class="review-item">
          <div class="review-header">
            <span class="review-user">${r.user}</span>
            <div class="d-flex align-center gap-6">
              <span class="stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</span>
              <span class="text-tiny">${r.date}</span>
              ${r.status === 'reported' ? '<span class="badge badge-danger">Bị báo cáo</span>' : ''}
            </div>
          </div>
          <div class="review-text">${r.text}</div>
          <div class="d-flex gap-6">
            <button class="btn btn-sm btn-primary" onclick="replyToReview('${r.id}')">💬 Phản hồi</button>
            <button class="btn btn-sm btn-danger" onclick="reportReviewToAdmin('${r.id}')">⚑ Báo cáo sai sự thật</button>
          </div>
        </div>`).join('')}
    </div>
  `;
}

function replyToReview(id) {
  openModal('Phản hồi đánh giá', `
    <p class="text-muted" style="font-size:13px;margin-bottom:12px">Phản hồi của bạn sẽ hiển thị công khai bên dưới đánh giá.</p>
    <div class="form-group">
      <label class="form-label">Nội dung phản hồi</label>
      <textarea class="form-input" rows="4" placeholder="Cảm ơn quý khách đã tin tưởng sử dụng dịch vụ của Pawsome Spa. Chúng tôi rất vui được phục vụ..."></textarea>
    </div>
  `, () => showToast('Đã gửi phản hồi đánh giá ✓', 'success'));
}

function reportReviewToAdmin(id) {
  openModal('Báo cáo review vi phạm', `
    <div class="form-group"><label class="form-label">Lý do báo cáo</label>
      <select class="form-input">
        <option>Thông tin sai sự thật / bịa đặt</option>
        <option>Nội dung xúc phạm, thô tục</option>
        <option>Review từ đối thủ / cạnh tranh không lành mạnh</option>
        <option>Người dùng chưa từng sử dụng dịch vụ</option>
      </select>
    </div>
    <div class="form-group"><label class="form-label">Bằng chứng / Mô tả chi tiết</label><textarea class="form-input" rows="3" placeholder="Mô tả lý do bạn cho rằng review này vi phạm..."></textarea></div>
  `, () => showToast('Đã gửi báo cáo đến admin PetGo'));
}

// ---------- PARTNER PETS ----------
function renderPartnerPets() {
  document.getElementById('mainContent').innerHTML = `
    <div class="search-bar">
      <input type="text" placeholder="🔍  Tìm tên thú cưng hoặc chủ nhân...">
      <select><option>Tất cả loài</option><option>Chó</option><option>Mèo</option></select>
    </div>
    <div class="grid2">
      ${DATA.partnerPets.map(p => `
        <div class="card">
          <div class="d-flex align-center gap-6" style="margin-bottom:10px">
            <div style="width:46px;height:46px;border-radius:10px;background:var(--petgo-orange-light);display:flex;align-items:center;justify-content:center;font-size:24px">🐾</div>
            <div>
              <div class="fw-500" style="font-size:14px">${p.name}</div>
              <div class="text-muted" style="font-size:12px">${p.type} · ${p.owner}</div>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:12px;margin-bottom:8px">
            <div><span class="text-muted">Tuổi:</span> ${p.age}</div>
            <div><span class="text-muted">Cân nặng:</span> ${p.weight}</div>
            <div><span class="text-muted">Giới tính:</span> ${p.gender}</div>
            <div><span class="text-muted">Lần đến:</span> ${p.visits} lần</div>
            <div><span class="text-muted">Gần nhất:</span> ${p.last}</div>
          </div>
          ${p.note ? `<div class="alert alert-warning" style="font-size:12px;padding:8px 10px;margin-bottom:8px">⚠ ${p.note}</div>` : ''}
          <div class="d-flex gap-6">
            <button class="btn btn-sm" onclick="showToast('Mở hồ sơ đầy đủ','info')">Xem hồ sơ</button>
            <button class="btn btn-sm" onclick="addPetNote('${p.name}')">📝 Ghi chú</button>
          </div>
        </div>`).join('')}
    </div>
  `;
}

function addPetNote(petName) {
  openModal(`Ghi chú cho ${petName}`, `
    <div class="form-group"><label class="form-label">Ghi chú chăm sóc</label><textarea class="form-input" rows="4" placeholder="VD: Dị ứng thuốc X, sợ tiếng ồn, thích được khen ngợi..."></textarea></div>
    <div class="form-group"><label class="form-label">Ghi chú sức khỏe</label><textarea class="form-input" rows="3" placeholder="VD: Viêm da mãn tính, cần dùng sữa tắm đặc biệt..."></textarea></div>
  `, () => showToast(`Đã lưu ghi chú cho ${petName}`));
}

// ---------- PARTNER REPORTS ----------
function renderPartnerReports() {
  document.getElementById('mainContent').innerHTML = `
    <div class="d-flex justify-between align-center" style="margin-bottom:16px">
      <div class="d-flex gap-6">
        <button class="btn active-filter">Tháng 3/2025</button>
        <button class="btn" onclick="showToast('Chọn tháng 2/2025','info')">Tháng 2/2025</button>
      </div>
      <button class="btn" onclick="showToast('Đã xuất báo cáo Excel')">📊 Xuất Excel</button>
    </div>
    <div class="metrics">
      <div class="metric-card"><div class="metric-label">Doanh thu T3</div><div class="metric-value">36.5M</div><div class="metric-change metric-up">↑ 18% vs T2</div></div>
      <div class="metric-card"><div class="metric-label">Tổng booking T3</div><div class="metric-value">145</div><div class="metric-change metric-up">↑ 12%</div></div>
      <div class="metric-card"><div class="metric-label">Tỷ lệ hủy</div><div class="metric-value">5.2%</div><div class="metric-change metric-up">↓ 1.3% tốt hơn</div></div>
      <div class="metric-card"><div class="metric-label">Khách quay lại</div><div class="metric-value">68%</div><div class="metric-change metric-up">↑ 5%</div></div>
    </div>
    <div class="grid2">
      <div class="card">
        <div class="card-header"><div class="card-title">Dịch vụ bán chạy</div></div>
        <div class="chart-wrap"><canvas id="topSvcChart"></canvas></div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Doanh thu theo tháng</div></div>
        <div class="chart-wrap"><canvas id="partnerMonthChart"></canvas></div>
      </div>
    </div>
  `;
  setTimeout(() => {
    new Chart(document.getElementById('topSvcChart'), {
      type: 'bar',
      data: {
        labels: ['Tắm & Cắt','Spa VIP','Tắm trị liệu','Cắt tỉa','Nhuộm lông'],
        datasets: [{ data:[58,32,24,18,13], backgroundColor:['#E8621A','#1D9E75','#378ADD','#BA7517','#D4537E'], borderRadius:4 }]
      },
      options: { responsive:true, maintainAspectRatio:false, indexAxis:'y', plugins:{legend:{display:false}} }
    });
    new Chart(document.getElementById('partnerMonthChart'), {
      type: 'bar',
      data: {
        labels: ['T10','T11','T12','T1','T2','T3'],
        datasets: [{ data:[24.5,29.2,32.1,28.8,30.9,36.5], backgroundColor:'#E8621A', borderRadius:4 }]
      },
      options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{y:{ticks:{callback:v=>v+'M'}}} }
    });
  }, 100);
}

// ---------- PARTNER SUBSCRIPTION ----------
function renderPartnerSubscription() {
  const plans = [
    { name:'Basic',   price:299000,  current:false, features:['Hiển thị cơ bản','Tối đa 3 dịch vụ','Quản lý booking','Thống kê cơ bản'] },
    { name:'Pro',     price:599000,  current:true,  features:['Ưu tiên hiển thị','Không giới hạn dịch vụ','Dashboard nâng cao','Huy hiệu xác minh','Hỗ trợ ưu tiên'] },
    { name:'Premium', price:999000,  current:false, features:['Đứng đầu tìm kiếm','API tích hợp','Báo cáo chi tiết','Account manager riêng','Marketing support'] },
  ];

  document.getElementById('mainContent').innerHTML = `
    <div class="alert alert-success" style="margin-bottom:16px">
      ✓ Đang dùng gói <strong>Pro</strong> · Gia hạn ngày <strong>15/04/2025</strong> · Tự động gia hạn: <strong>BẬT</strong>
      <button class="btn btn-sm" style="margin-left:auto" onclick="showToast('Đã tắt tự động gia hạn','warning')">Tắt tự động gia hạn</button>
    </div>
    <div class="grid3" style="margin-bottom:16px">
      ${plans.map(p => `
        <div class="plan-card ${p.current ? 'current' : ''}">
          ${p.current ? `<div style="text-align:center;margin-bottom:10px"><span class="badge badge-orange">Gói hiện tại</span></div>` : ''}
          <div class="fw-500" style="font-size:18px;margin-bottom:4px">${p.name}</div>
          <div style="font-size:24px;font-weight:500;color:var(--petgo-orange);margin-bottom:14px">${p.price.toLocaleString()}đ<span class="text-muted" style="font-size:13px">/tháng</span></div>
          ${p.features.map(f => `<div class="d-flex align-center gap-6" style="font-size:13px;margin-bottom:7px;color:var(--text-secondary)"><span style="color:#1D9E75">✓</span>${f}</div>`).join('')}
          <button class="btn ${p.current ? 'btn-primary' : ''} w-100" style="margin-top:14px" onclick="showToast('${p.current ? 'Đang sử dụng gói này' : 'Chuyển sang gói ' + p.name}','${p.current ? 'info' : 'success'}')">
            ${p.current ? 'Đang sử dụng' : 'Nâng cấp → ' + p.name}
          </button>
        </div>`).join('')}
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title">Lịch sử thanh toán</div></div>
      <table>
        <thead><tr><th>Ngày</th><th>Gói</th><th>Số tiền</th><th>Phương thức</th><th>Trạng thái</th></tr></thead>
        <tbody>
          <tr><td>15/03/2025</td><td>Pro</td><td class="text-orange fw-500">599,000đ</td><td>VNPay</td><td><span class="badge badge-success">Thành công</span></td></tr>
          <tr><td>15/02/2025</td><td>Pro</td><td class="text-orange fw-500">599,000đ</td><td>VNPay</td><td><span class="badge badge-success">Thành công</span></td></tr>
          <tr><td>15/01/2025</td><td>Basic</td><td class="text-orange fw-500">299,000đ</td><td>Momo</td><td><span class="badge badge-success">Thành công</span></td></tr>
        </tbody>
      </table>
    </div>
  `;
}

// ============================================================
//  Extended Partner UI/UX Overrides for final delivery
// ============================================================

function renderPartnerDashboard() {
  const p = DATA.partnerProfile;
  document.getElementById('mainContent').innerHTML = `
    <div class="alert alert-info" style="margin-bottom:16px">🏪 Đối tác đang đăng nhập: <strong>${p.name}</strong> · Trạng thái hồ sơ: <strong>${p.verification}</strong> · Mức độ hoàn thiện: <strong>${p.completion}%</strong></div>
    <div class="metrics">
      <div class="metric-card"><div class="metric-label">Booking hôm nay</div><div class="metric-value">${DATA.partnerBookings.filter(b=>b.date==='17/03/2025').length}</div><div class="metric-change metric-up">2 đã xác nhận</div></div>
      <div class="metric-card"><div class="metric-label">Chờ xác nhận</div><div class="metric-value">${DATA.partnerBookings.filter(b=>b.status==='pending').length}</div><div class="metric-change metric-down">Cần phản hồi sớm</div></div>
      <div class="metric-card"><div class="metric-label">Doanh thu tháng</div><div class="metric-value">36.5M</div><div class="metric-change metric-up">↑ 18%</div></div>
      <div class="metric-card"><div class="metric-label">Đánh giá trung bình</div><div class="metric-value">4.8</div><div class="metric-change metric-up">68% khách quay lại</div></div>
    </div>
    <div class="grid2">
      <div class="card">
        <div class="card-header"><div class="card-title">Tổng quan vận hành</div><button class="btn btn-sm" onclick="renderPanel('partner-profile')">Cập nhật hồ sơ</button></div>
        <div class="stack-list">
          <div class="stack-item"><div><div class="fw-500">Hồ sơ cửa hàng</div><div class="text-muted text-small">${p.address}</div></div><span class="badge badge-success">${p.completion}% hoàn thiện</span></div>
          <div class="stack-item"><div><div class="fw-500">Dịch vụ đang hoạt động</div><div class="text-muted text-small">${DATA.partnerServices.filter(s=>s.status==='active').length} dịch vụ đang hiển thị</div></div><button class="btn btn-sm" onclick="renderPanel('partner-services')">Quản lý</button></div>
          <div class="stack-item"><div><div class="fw-500">Lịch làm việc tuần này</div><div class="text-muted text-small">Đã mở 32 slot, khóa 1 buổi chiều thứ 5</div></div><button class="btn btn-sm" onclick="renderPanel('partner-schedule')">Xem lịch</button></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Thông báo mới</div><button class="btn btn-sm" onclick="showToast('Đã đánh dấu đã đọc','info')">Đánh dấu đã đọc</button></div>
        <div class="timeline-list">
          <div class="timeline-item"><div class="timeline-dot"></div><div><div class="fw-500">Booking mới #BK008</div><div class="text-tiny">Khách vừa đặt dịch vụ cắt tỉa cơ bản</div></div></div>
          <div class="timeline-item"><div class="timeline-dot"></div><div><div class="fw-500">Khách đã xác nhận lịch #BK001</div><div class="text-tiny">Ca 09:00 ngày 17/03 đã chốt</div></div></div>
          <div class="timeline-item"><div class="timeline-dot"></div><div><div class="fw-500">Nhắc bổ sung ảnh cửa hàng</div><div class="text-tiny">Để tăng tỷ lệ chuyển đổi trên trang đối tác</div></div></div>
        </div>
      </div>
    </div>`;
}

function renderPartnerProfile() {
  const p = DATA.partnerProfile;
  document.getElementById('mainContent').innerHTML = `
    <div class="grid2">
      <div class="card">
        <div class="card-header"><div class="card-title">Hồ sơ cửa hàng</div><span class="badge badge-success">${p.verification}</span></div>
        <div class="form-group"><label class="form-label">Tên cửa hàng</label><input id="partnerName" class="form-input" value="${p.name}"></div>
        <div class="form-group"><label class="form-label">Chủ sở hữu</label><input id="partnerOwner" class="form-input" value="${p.owner}"></div>
        <div class="form-group"><label class="form-label">Số điện thoại</label><input id="partnerPhone" class="form-input" value="${p.phone}"></div>
        <div class="form-group"><label class="form-label">Email liên hệ</label><input id="partnerEmail" class="form-input" value="${p.email}"></div>
        <div class="form-group"><label class="form-label">Địa chỉ</label><textarea id="partnerAddress" class="form-input" rows="2">${p.address}</textarea></div>
        <div class="form-group"><label class="form-label">Mô tả ngắn</label><textarea id="partnerDescription" class="form-input" rows="4">${p.description}</textarea></div>
        <button class="btn btn-primary" onclick="savePartnerProfile()">Lưu hồ sơ cửa hàng</button>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Thiết lập vận hành</div></div>
        <div class="form-group"><label class="form-label">Giờ mở cửa</label><input id="partnerHours" class="form-input" value="${p.openHours}"></div>
        <div class="form-group"><label class="form-label">Trạng thái hiển thị</label><select class="form-input"><option>Đang mở nhận booking</option><option>Tạm đóng</option></select></div>
        <div class="form-group"><label class="form-label">Ảnh đại diện / banner</label><input class="form-input" placeholder="Thêm URL ảnh mẫu hoặc tên file upload"></div>
        <div class="alert alert-success">✓ Hồ sơ đầy đủ sẽ giúp tăng độ tin cậy và tỷ lệ được khách đặt lịch.</div>
      </div>
    </div>`;
}

function savePartnerProfile() {
  DATA.partnerProfile.name = document.getElementById('partnerName')?.value || DATA.partnerProfile.name;
  DATA.partnerProfile.owner = document.getElementById('partnerOwner')?.value || DATA.partnerProfile.owner;
  DATA.partnerProfile.phone = document.getElementById('partnerPhone')?.value || DATA.partnerProfile.phone;
  DATA.partnerProfile.email = document.getElementById('partnerEmail')?.value || DATA.partnerProfile.email;
  DATA.partnerProfile.address = document.getElementById('partnerAddress')?.value || DATA.partnerProfile.address;
  DATA.partnerProfile.description = document.getElementById('partnerDescription')?.value || DATA.partnerProfile.description;
  DATA.partnerProfile.openHours = document.getElementById('partnerHours')?.value || DATA.partnerProfile.openHours;
  showToast('Đã cập nhật hồ sơ cửa hàng', 'success');
  renderPartnerProfile();
}

function renderPartnerServices() {
  document.getElementById('mainContent').innerHTML = `
    <div class="d-flex justify-between align-center" style="margin-bottom:14px">
      <div class="d-flex gap-6">
        <span class="badge badge-success">${DATA.partnerServices.filter(s => s.status === 'active').length} dịch vụ đang hoạt động</span>
        <span class="badge badge-gray">${DATA.partnerServices.filter(s => s.status !== 'active').length} đang tắt / chờ duyệt</span>
      </div>
      <button class="btn btn-primary" onclick="showAddPartnerServiceModal()">+ Thêm dịch vụ</button>
    </div>
    ${DATA.partnerServices.map(s => `
      <div class="card">
        <div class="d-flex justify-between align-center">
          <div class="flex-1">
            <div class="d-flex align-center gap-6" style="margin-bottom:6px">
              <span class="fw-500" style="font-size:14px">${s.name}</span>
              <span class="badge badge-info">${s.category}</span>
              <span class="badge ${s.status === 'active' ? 'badge-success' : 'badge-gray'}">${s.status === 'active' ? 'Hoạt động' : 'Đã tắt'}</span>
            </div>
            <div class="d-flex gap-6 flex-wrap" style="font-size:13px;color:var(--text-secondary)">
              <span>💰 ${s.priceSmall.toLocaleString()}đ – ${s.priceLarge.toLocaleString()}đ</span>
              <span>⏱ ${s.duration} phút</span>
            </div>
          </div>
          <div class="d-flex gap-6 flex-wrap">
            <button class="btn btn-sm" onclick="editPartnerService('${s.id}')">✏ Sửa</button>
            <button class="btn btn-sm btn-danger" onclick="deletePartnerService('${s.id}')">🗑 Xóa</button>
            <button class="btn btn-sm ${s.status === 'active' ? 'btn-danger' : 'btn-success'}" onclick="togglePartnerService('${s.id}','${s.status}')">${s.status === 'active' ? 'Ẩn' : 'Hiện'}</button>
          </div>
        </div>
      </div>`).join('')}
  `;
}

function deletePartnerService(id) {
  const idx = DATA.partnerServices.findIndex(x => x.id === id);
  if (idx < 0) return;
  openModal('Xóa dịch vụ', `<p>Bạn chắc chắn muốn xóa dịch vụ <strong>${DATA.partnerServices[idx].name}</strong> khỏi danh sách cửa hàng?</p>`, () => {
    DATA.partnerServices.splice(idx,1);
    showToast('Đã xóa dịch vụ');
    renderPartnerServices();
  });
}

function togglePartnerService(id) {
  const s = DATA.partnerServices.find(x => x.id === id);
  if (!s) return;
  s.status = s.status === 'active' ? 'inactive' : 'active';
  showToast(`Đã ${s.status === 'active' ? 'hiện' : 'ẩn'} dịch vụ ${s.name}`);
  renderPartnerServices();
}


// ---------- PARTNER REGISTRATION ----------
function renderPartnerApply() {
  const d = DATA.partnerRegistrationDraft;
  const uploaded = d.documents.filter(x => x.status === 'uploaded').length;
  document.getElementById('mainContent').innerHTML = `
    <div class="card" style="background:linear-gradient(135deg,var(--bg-primary),var(--petgo-orange-light));overflow:hidden">
      <div class="grid2" style="margin-bottom:0;align-items:center">
        <div>
          <div class="badge badge-orange" style="margin-bottom:10px">Chế độ demo UI</div>
          <div style="font-size:24px;font-weight:600;line-height:1.35;margin-bottom:8px">Đăng ký trở thành đối tác PetGo</div>
          <div class="text-muted" style="line-height:1.7;margin-bottom:14px">Dành cho spa, phòng khám thú y, khách sạn thú cưng và đơn vị huấn luyện. Hoàn tất hồ sơ để đội vận hành xét duyệt và kích hoạt tài khoản bán dịch vụ.</div>
          <div class="d-flex gap-6 flex-wrap">
            <span class="badge badge-success">Phí tham gia: 0đ</span>
            <span class="badge badge-info">Duyệt hồ sơ: 1–2 ngày làm việc</span>
            <span class="badge badge-warning">Cần giấy tờ xác minh</span>
          </div>
        </div>
        <div class="card" style="margin-bottom:0">
          <div class="card-header"><div class="card-title">Tiến độ hồ sơ mẫu</div><span class="badge badge-orange">${uploaded}/${d.documents.length} giấy tờ</span></div>
          ${d.steps.map((s,i)=>`<div class="d-flex align-center justify-between" style="padding:10px 0;border-bottom:${i<d.steps.length-1?'0.5px solid var(--border-tertiary)':'none'}"><div class="d-flex align-center gap-6"><span style="width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:${s.done?'var(--bg-success)':'var(--bg-secondary)'};color:${s.done?'var(--text-success)':'var(--text-secondary)'}">${s.done?'✓':i+1}</span><span class="fw-500">${s.label}</span></div><span class="text-tiny">${s.done?'Hoàn tất':'Đang chờ'}</span></div>`).join('')}
        </div>
      </div>
    </div>

    <div class="grid2">
      <div class="card">
        <div class="card-header"><div class="card-title">Thông tin cửa hàng</div><button class="btn btn-sm" onclick="editPartnerApplication()">Chỉnh sửa</button></div>
        <div class="grid2" style="gap:12px;margin-bottom:0">
          <div><div class="text-tiny">Tên cửa hàng</div><div class="fw-500">${d.storeName}</div></div>
          <div><div class="text-tiny">Loại hình</div><div class="fw-500">${d.type}</div></div>
          <div><div class="text-tiny">Chủ sở hữu</div><div class="fw-500">${d.owner}</div></div>
          <div><div class="text-tiny">Số điện thoại</div><div class="fw-500">${d.phone}</div></div>
          <div><div class="text-tiny">Email</div><div class="fw-500">${d.email}</div></div>
          <div><div class="text-tiny">Khu vực</div><div class="fw-500">${d.district}, ${d.city}</div></div>
          <div style="grid-column:1 / -1"><div class="text-tiny">Địa chỉ</div><div class="fw-500">${d.address}</div></div>
          <div><div class="text-tiny">Giờ mở cửa</div><div class="fw-500">${d.openHours}</div></div>
          <div><div class="text-tiny">Dịch vụ dự kiến</div><div class="fw-500">${d.services.join(', ')}</div></div>
          <div style="grid-column:1 / -1"><div class="text-tiny">Mô tả</div><div>${d.description}</div></div>
        </div>
      </div>

      <div class="card">
        <div class="card-header"><div class="card-title">Hồ sơ xác minh</div><button class="btn btn-sm" onclick="uploadPartnerDocs()">Tải thêm giấy tờ</button></div>
        <div class="stack-list">
          ${d.documents.map(doc => `<div class="stack-item"><div><div class="fw-500">${doc.name}</div><div class="text-muted text-small">${doc.status === 'uploaded' ? 'Đã tải lên, sẵn sàng xét duyệt' : 'Chưa có tệp đính kèm'}</div></div><span class="badge ${doc.status === 'uploaded' ? 'badge-success' : 'badge-warning'}">${doc.status === 'uploaded' ? 'Đã có' : 'Còn thiếu'}</span></div>`).join('')}
        </div>
        <div class="alert alert-info" style="margin-top:12px">ℹ Sau khi gửi hồ sơ, admin có thể duyệt, yêu cầu bổ sung giấy tờ hoặc từ chối nếu thông tin chưa hợp lệ.</div>
      </div>
    </div>

    <div class="grid2">
      <div class="card">
        <div class="card-header"><div class="card-title">Lợi ích khi trở thành đối tác</div></div>
        <div class="timeline-list">
          <div class="timeline-item"><div class="timeline-dot"></div><div><div class="fw-500">Nhận booking trực tiếp từ khách</div><div class="text-tiny">Đồng bộ trạng thái booking, lịch làm việc và doanh thu trên một dashboard.</div></div></div>
          <div class="timeline-item"><div class="timeline-dot"></div><div><div class="fw-500">Tăng uy tín nhờ xác minh</div><div class="text-tiny">Hiển thị badge xác minh và hồ sơ cửa hàng minh bạch trên hệ thống.</div></div></div>
          <div class="timeline-item"><div class="timeline-dot"></div><div><div class="fw-500">Tự quản lý dịch vụ</div><div class="text-tiny">Thêm, sửa, ẩn/hiện dịch vụ và theo dõi hiệu suất đơn hàng.</div></div></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Hồ sơ đăng ký gần đây</div><button class="btn btn-sm" onclick="renderPanel('partner-apply-guide')">Xem quy trình</button></div>
        ${DATA.partnerApplications.map(app => `<div class="partner-card" style="padding:12px 0;border:none;border-bottom:0.5px solid var(--border-tertiary);border-radius:0"><div class="partner-avatar">${partnerIcon(app.type)}</div><div class="partner-info"><div class="partner-name">${app.storeName} <span class="badge ${app.status === 'approved' ? 'badge-success' : app.status === 'reviewing' ? 'badge-info' : 'badge-warning'}">${app.status === 'approved' ? 'Đã duyệt' : app.status === 'reviewing' ? 'Đang xét' : 'Chờ duyệt'}</span></div><div class="partner-meta">${app.type} · ${app.city} · ${app.submitted}</div><div class="text-tiny">${app.owner} · ${app.documents.length} tài liệu · ${app.services} dịch vụ dự kiến</div></div></div>`).join('')}
      </div>
    </div>

    <div class="d-flex justify-end gap-6" style="margin-top:2px">
      <button class="btn" onclick="savePartnerApplicationDraft()">Lưu nháp</button>
      <button class="btn btn-primary" onclick="submitPartnerApplication()">Gửi hồ sơ đăng ký</button>
    </div>
  `;
}

function renderPartnerApplyGuide() {
  document.getElementById('mainContent').innerHTML = `
    <div class="metrics metrics-3">
      <div class="metric-card"><div class="metric-label">Hồ sơ chờ duyệt</div><div class="metric-value">${DATA.partnerApplications.filter(a=>a.status==='pending').length}</div><div class="metric-change metric-up">Chờ kiểm tra giấy tờ</div></div>
      <div class="metric-card"><div class="metric-label">Đang xét duyệt</div><div class="metric-value">${DATA.partnerApplications.filter(a=>a.status==='reviewing').length}</div><div class="metric-change metric-up">Có tương tác với admin</div></div>
      <div class="metric-card"><div class="metric-label">Đã kích hoạt</div><div class="metric-value">${DATA.partnerApplications.filter(a=>a.status==='approved').length}</div><div class="metric-change metric-up">Tạo tài khoản đối tác thành công</div></div>
    </div>
    <div class="grid2">
      <div class="card">
        <div class="card-header"><div class="card-title">Quy trình xét duyệt</div></div>
        <div class="timeline-list">
          <div class="timeline-item"><div class="timeline-dot"></div><div><div class="fw-500">1. Đăng ký hồ sơ cửa hàng</div><div class="text-tiny">Khai báo thông tin cơ bản, loại hình, khu vực hoạt động và dịch vụ dự kiến.</div></div></div>
          <div class="timeline-item"><div class="timeline-dot"></div><div><div class="fw-500">2. Upload giấy tờ xác minh</div><div class="text-tiny">CCCD, giấy phép, ảnh cơ sở và các giấy tờ chuyên môn nếu có.</div></div></div>
          <div class="timeline-item"><div class="timeline-dot"></div><div><div class="fw-500">3. Admin xét duyệt</div><div class="text-tiny">Đối chiếu tính hợp lệ, yêu cầu bổ sung nếu thiếu và gắn trạng thái xác minh.</div></div></div>
          <div class="timeline-item"><div class="timeline-dot"></div><div><div class="fw-500">4. Kích hoạt & onboarding</div><div class="text-tiny">Sau khi được duyệt, đối tác đăng nhập dashboard để tạo dịch vụ và nhận booking.</div></div></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Checklist hồ sơ</div></div>
        <table>
          <thead><tr><th>Hạng mục</th><th>Bắt buộc</th><th>Ghi chú</th></tr></thead>
          <tbody>
            <tr><td>Thông tin chủ cửa hàng</td><td><span class="badge badge-success">Có</span></td><td>Họ tên, SĐT, email</td></tr>
            <tr><td>Giấy phép kinh doanh</td><td><span class="badge badge-success">Có</span></td><td>Bản scan rõ nét</td></tr>
            <tr><td>Chứng chỉ chuyên môn</td><td><span class="badge badge-warning">Tùy loại hình</span></td><td>Áp dụng cho thú y, huấn luyện</td></tr>
            <tr><td>Ảnh cửa hàng / cơ sở</td><td><span class="badge badge-success">Có</span></td><td>Mặt tiền và khu vực phục vụ</td></tr>
            <tr><td>Bảng giá dịch vụ</td><td><span class="badge badge-info">Khuyến nghị</span></td><td>Giúp duyệt nhanh hơn</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function editPartnerApplication() {
  const d = DATA.partnerRegistrationDraft;
  openModal('Chỉnh sửa hồ sơ đăng ký', `
    <div class="form-group"><label class="form-label">Tên cửa hàng</label><input class="form-input" value="${d.storeName}"></div>
    <div class="form-group"><label class="form-label">Chủ sở hữu</label><input class="form-input" value="${d.owner}"></div>
    <div class="form-group"><label class="form-label">Loại hình</label><select class="form-input"><option ${d.type==='Spa'?'selected':''}>Spa</option><option ${d.type==='Thú y'?'selected':''}>Thú y</option><option ${d.type==='Lưu trú'?'selected':''}>Lưu trú</option><option ${d.type==='Huấn luyện'?'selected':''}>Huấn luyện</option></select></div>
    <div class="form-group"><label class="form-label">Địa chỉ</label><input class="form-input" value="${d.address}"></div>
    <div class="form-group"><label class="form-label">Mô tả</label><textarea class="form-input" rows="3">${d.description}</textarea></div>
  `, () => showToast('Đã cập nhật thông tin hồ sơ mẫu'));
}

function uploadPartnerDocs() {
  openModal('Tải thêm giấy tờ', `
    <div class="form-group"><label class="form-label">Loại giấy tờ</label><select class="form-input"><option>Bảng giá dịch vụ</option><option>Ảnh cửa hàng</option><option>Giấy phép kinh doanh</option><option>Khác</option></select></div>
    <div class="form-group"><label class="form-label">Tệp đính kèm</label><input class="form-input" placeholder="chon-tep-demo.pdf"></div>
    <div class="alert alert-warning">Tệp chỉ là dữ liệu mô phỏng để hoàn thiện UI/UX.</div>
  `, () => {
    const missing = DATA.partnerRegistrationDraft.documents.find(x => x.status === 'missing');
    if (missing) missing.status = 'uploaded';
    showToast('Đã thêm giấy tờ vào hồ sơ', 'success');
    renderPartnerApply();
  });
}

function savePartnerApplicationDraft() {
  showToast('Đã lưu nháp hồ sơ đăng ký', 'info');
}

function submitPartnerApplication() {
  openModal('Gửi hồ sơ đăng ký đối tác', `
    <div class="alert alert-success">✓ Hồ sơ đã đủ thông tin cơ bản để gửi xét duyệt.</div>
    <p style="font-size:14px;line-height:1.6">Gửi hồ sơ của <strong>${DATA.partnerRegistrationDraft.storeName}</strong> để admin xét duyệt?</p>
    <p class="text-muted mt-8" style="font-size:13px">Sau khi gửi, trạng thái hồ sơ sẽ chuyển sang <strong>Đang xét duyệt</strong> và hiển thị trong khu quản lý đối tác của admin.</p>
  `, () => {
    DATA.partnerApplications.unshift({
      id: 'PA' + String(DATA.partnerApplications.length + 1).padStart(3,'0'),
      storeName: DATA.partnerRegistrationDraft.storeName,
      owner: DATA.partnerRegistrationDraft.owner,
      type: DATA.partnerRegistrationDraft.type,
      city: DATA.partnerRegistrationDraft.city,
      submitted: '17/03/2026',
      status: 'reviewing',
      documents: DATA.partnerRegistrationDraft.documents.filter(x => x.status === 'uploaded').map(x => x.name),
      services: DATA.partnerRegistrationDraft.services.length,
      note: 'Hồ sơ gửi từ màn hình đăng ký demo'
    });
    showToast('Đã gửi hồ sơ đăng ký cho admin', 'success');
    renderPartnerApply();
  }, 'Gửi hồ sơ');
}


// ============================================================
//  Rich Partner Onboarding Flow Overrides
// ============================================================
function _partnerApplyStatusMeta(status) {
  const map = {
    draft: { label:'Nháp', cls:'draft' },
    submitted: { label:'Đã gửi hồ sơ', cls:'submitted' },
    reviewing: { label:'Đang xét duyệt', cls:'reviewing' },
    need_more: { label:'Cần bổ sung', cls:'need_more' },
    approved: { label:'Đã phê duyệt', cls:'approved' },
    activated: { label:'Đã trở thành đối tác', cls:'activated' },
  };
  return map[status] || map.draft;
}

function _partnerDocBadge(status) {
  if (status === 'verified') return '<span class="badge badge-success">Đã xác minh</span>';
  if (status === 'uploaded') return '<span class="badge badge-info">Đã tải lên</span>';
  return '<span class="badge badge-warning">Còn thiếu</span>';
}

function _renderPartnerApplySteps(d) {
  const current = d.status === 'need_more' ? 'reviewing' : d.status;
  const labels = {
    draft:'Khai báo hồ sơ cửa hàng',
    submitted:'Gửi hồ sơ cho admin',
    reviewing:'Kiểm tra pháp lý & vận hành',
    approved:'Phê duyệt và tạo tài khoản',
    activated:'Mở dashboard đối tác',
  };
  const descs = {
    draft:'Điền đủ thông tin chủ cửa hàng, cơ sở và dịch vụ dự kiến.',
    submitted:'Hồ sơ đi vào hàng chờ xử lý của đội vận hành.',
    reviewing:'Admin đối chiếu giấy tờ, có thể yêu cầu bổ sung.',
    approved:'Gắn trạng thái xác minh và mở bước onboarding.',
    activated:'Đối tác có thể đăng dịch vụ và nhận booking thực tế.',
  };
  const order = ['draft','submitted','reviewing','approved','activated'];
  const idx = order.indexOf(current);
  return `<div class="stepper">${order.map((k,i)=>{
    const done = i < idx || (d.status==='activated' && i<=idx) || (d.status==='approved' && i<idx) || (d.status==='need_more' && i<idx);
    const cls = `${done ? 'done' : ''} ${i===idx ? 'current' : ''}`.trim();
    return `<div class="step-card ${cls}"><div class="step-index">${done ? '✓' : i+1}</div><div class="step-title">${labels[k]}</div><div class="step-desc">${descs[k]}</div></div>`;
  }).join('')}</div>`;
}

function renderPartnerApply() {
  const d = DATA.partnerRegistrationDraft;
  const meta = _partnerApplyStatusMeta(d.status);
  const verifiedDocs = d.documents.filter(x => x.status === 'verified').length;
  const uploadedDocs = d.documents.filter(x => x.status === 'verified' || x.status === 'uploaded').length;
  const missingDocs = d.documents.filter(x => x.status === 'missing').length;
  const onboardingDone = d.onboardingTasks.filter(x => x.done).length;
  document.getElementById('mainContent').innerHTML = `
    <div class="onboarding-banner">
      <div class="d-flex justify-between align-center flex-wrap gap-6" style="margin-bottom:10px">
        <div>
          <div class="badge badge-orange" style="margin-bottom:10px">Flow demo hoàn chỉnh từ đăng ký → xét duyệt → kích hoạt</div>
          <div style="font-size:26px;font-weight:600;line-height:1.35;margin-bottom:8px">Đăng ký trở thành đối tác PetGo như một hồ sơ thực tế</div>
          <div class="text-muted" style="line-height:1.7;max-width:880px">Màn hình này giả lập đầy đủ quá trình điền thông tin cửa hàng, nộp giấy tờ, nhận phản hồi từ admin, bổ sung hồ sơ và hoàn tất onboarding để trở thành đối tác đang hoạt động trên hệ thống.</div>
        </div>
        <div class="d-flex gap-6 flex-wrap align-center">
          <span class="status-pill ${meta.cls}">${meta.label}</span>
          <span class="badge badge-info">Mã hồ sơ: ${d.applicationId}</span>
          <span class="badge badge-success">Hoàn thiện ${d.completion}%</span>
        </div>
      </div>
      <div class="inline-stat">
        <span class="badge badge-info">Người đại diện: ${d.owner}</span>
        <span class="badge badge-info">Loại hình: ${d.type}</span>
        <span class="badge badge-info">Khu vực: ${d.district}, ${d.city}</span>
        <span class="badge badge-info">Gửi hồ sơ: ${d.submittedAt}</span>
        <span class="badge badge-warning">Còn thiếu: ${missingDocs} tài liệu</span>
      </div>
      ${_renderPartnerApplySteps(d)}
    </div>

    ${d.status === 'need_more' ? `<div class="alert alert-warning" style="margin-top:16px"><span style="font-size:20px">🛠️</span><div><div class="fw-500" style="margin-bottom:4px">Admin đang yêu cầu bổ sung hồ sơ</div><div>Vui lòng tải lên <strong>bảng giá dịch vụ</strong> và xác nhận lại ảnh khu vực tiếp khách. Sau khi bổ sung, hồ sơ sẽ quay lại bước xét duyệt mà không cần tạo lại từ đầu.</div></div></div>` : ''}
    ${d.status === 'approved' || d.status === 'activated' ? `<div class="alert alert-success" style="margin-top:16px"><span style="font-size:20px">🎉</span><div><div class="fw-500" style="margin-bottom:4px">Hồ sơ đã được phê duyệt</div><div>Đối tác đã vượt qua bước xét duyệt. Hoàn tất checklist onboarding để bắt đầu nhận booking như một đối tác thật sự.</div></div></div>` : ''}

    <div class="metrics" style="margin-top:16px">
      <div class="metric-card"><div class="metric-label">Tiến độ hồ sơ</div><div class="metric-value">${d.completion}%</div><div class="metric-change metric-up">Cập nhật lần cuối ${d.lastUpdated}</div></div>
      <div class="metric-card"><div class="metric-label">Tài liệu đã nộp</div><div class="metric-value">${uploadedDocs}/${d.documents.length}</div><div class="metric-change metric-up">${verifiedDocs} tài liệu đã xác minh</div></div>
      <div class="metric-card"><div class="metric-label">Dịch vụ dự kiến</div><div class="metric-value">${d.services.length}</div><div class="metric-change metric-up">${d.expectedMonthlyBookings} booking/tháng kỳ vọng</div></div>
      <div class="metric-card"><div class="metric-label">Checklist onboarding</div><div class="metric-value">${onboardingDone}/${d.onboardingTasks.length}</div><div class="metric-change ${d.status === 'activated' ? 'metric-up' : 'metric-down'}">${d.status === 'activated' ? 'Đã kích hoạt thành công' : 'Sẵn sàng sau khi được duyệt'}</div></div>
    </div>

    <div class="grid2">
      <div class="card">
        <div class="card-header"><div class="card-title">Thông tin pháp lý & cửa hàng</div><button class="btn btn-sm" onclick="editPartnerApplication()">Chỉnh sửa hồ sơ</button></div>
        <div class="section-heading">Thông tin người đại diện</div>
        <div class="mini-grid" style="margin-bottom:14px">
          <div class="info-tile"><div class="info-k">Họ tên</div><div class="info-v">${d.owner}</div></div>
          <div class="info-tile"><div class="info-k">Vai trò</div><div class="info-v">${d.ownerRole}</div></div>
          <div class="info-tile"><div class="info-k">Ngày sinh</div><div class="info-v">${d.ownerDob}</div></div>
          <div class="info-tile"><div class="info-k">Số CCCD</div><div class="info-v">${d.ownerId}</div></div>
          <div class="info-tile"><div class="info-k">Điện thoại</div><div class="info-v">${d.phone}</div></div>
          <div class="info-tile"><div class="info-k">Email</div><div class="info-v">${d.email}</div></div>
        </div>
        <div class="section-heading">Thông tin cơ sở kinh doanh</div>
        <div class="mini-grid">
          <div class="info-tile"><div class="info-k">Tên cửa hàng hiển thị</div><div class="info-v">${d.storeName}</div></div>
          <div class="info-tile"><div class="info-k">Pháp nhân / mô hình</div><div class="info-v">${d.legalName}<br><span class="text-muted">${d.businessModel}</span></div></div>
          <div class="info-tile"><div class="info-k">Mã số / mã nội bộ</div><div class="info-v">${d.taxCode}</div></div>
          <div class="info-tile"><div class="info-k">Loại hình</div><div class="info-v">${d.type}</div></div>
          <div class="info-tile"><div class="info-k">Địa chỉ</div><div class="info-v">${d.address}</div></div>
          <div class="info-tile"><div class="info-k">Ngày hoạt động</div><div class="info-v">${d.workingDays}<br><span class="text-muted">${d.openHours}</span></div></div>
          <div class="info-tile"><div class="info-k">Nhân sự / thiết bị</div><div class="info-v">${d.staffCount} nhân sự · ${d.groomingTables} bàn grooming · ${d.bathStations} bồn tắm</div></div>
          <div class="info-tile"><div class="info-k">Khu lưu thú / an toàn</div><div class="info-v">${d.petHoldingArea}</div></div>
        </div>
        <div class="info-tile" style="margin-top:12px">
          <div class="info-k">Mô tả cửa hàng</div>
          <div class="info-v" style="font-weight:400">${d.description}</div>
        </div>
      </div>

      <div class="card">
        <div class="card-header"><div class="card-title">Đối soát, vận hành & tiêu chuẩn chất lượng</div><button class="btn btn-sm" onclick="showToast('Đã mở form cập nhật tài khoản đối soát','info')">Cập nhật đối soát</button></div>
        <div class="section-heading">Thông tin nhận thanh toán</div>
        <div class="mini-grid" style="margin-bottom:14px">
          <div class="info-tile"><div class="info-k">Ngân hàng</div><div class="info-v">${d.bankName}</div></div>
          <div class="info-tile"><div class="info-k">Chu kỳ đối soát</div><div class="info-v">${d.payoutCycle}</div></div>
          <div class="info-tile"><div class="info-k">Tên tài khoản</div><div class="info-v">${d.bankAccountName}</div></div>
          <div class="info-tile"><div class="info-k">Số tài khoản</div><div class="info-v">${d.bankAccountNumber}</div></div>
          <div class="info-tile"><div class="info-k">Hotline vận hành</div><div class="info-v">${d.alternatePhone}</div></div>
          <div class="info-tile"><div class="info-k">Email hỗ trợ</div><div class="info-v">${d.supportEmail}</div></div>
        </div>
        <div class="section-heading">Điểm mạnh / dịch vụ nổi bật</div>
        <div class="d-flex gap-6 flex-wrap" style="margin-bottom:14px">${d.specialties.map(x=>`<span class="badge badge-orange">${x}</span>`).join('')}</div>
        <div class="section-heading">Checklist tiêu chuẩn tham gia PetGo</div>
        <div class="check-list">${d.compliance.map(c=>`<div class="check-item ${c.value ? 'done' : ''}"><div class="check-bullet">${c.value ? '✓' : '•'}</div><div><div class="fw-500" style="font-size:13px">${c.label}</div><div class="text-tiny">${c.value ? 'Đã đáp ứng theo hồ sơ và cam kết' : 'Chưa xác nhận trong hồ sơ'}</div></div></div>`).join('')}</div>
      </div>
    </div>

    <div class="grid2">
      <div class="card">
        <div class="card-header"><div class="card-title">Danh mục dịch vụ dự kiến sau khi kích hoạt</div><button class="btn btn-sm" onclick="showToast('Đã mở form thêm dịch vụ mẫu','info')">Thêm dịch vụ</button></div>
        <table>
          <thead><tr><th>Dịch vụ</th><th>Nhóm</th><th>Giá từ</th><th>Thời lượng</th><th>Phù hợp</th></tr></thead>
          <tbody>
            ${d.services.map(s=>`<tr><td>${s.name}</td><td>${s.category}</td><td class="fw-500 text-orange">${s.priceFrom}</td><td>${s.duration}</td><td>${s.target}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>

      <div class="card">
        <div class="card-header"><div class="card-title">Bộ giấy tờ xác minh</div><button class="btn btn-sm" onclick="uploadPartnerDocs()">Tải thêm giấy tờ</button></div>
        ${d.documents.map(doc=>`<div class="doc-row"><div class="doc-meta"><div class="doc-name">${doc.name}</div><div class="doc-sub">${doc.file ? `Tệp: ${doc.file}` : 'Chưa có tệp đính kèm'}<br>${doc.note}</div></div><div>${_partnerDocBadge(doc.status)}</div></div>`).join('')}
      </div>
    </div>

    <div class="grid2">
      <div class="card">
        <div class="card-header"><div class="card-title">Timeline xử lý hồ sơ</div><button class="btn btn-sm" onclick="renderPanel('partner-apply-guide')">Xem flow tổng thể</button></div>
        <div class="timeline-list">${d.timeline.map(t=>`<div class="timeline-item"><div class="timeline-dot" style="background:${t.status === 'done' ? '#1D9E75' : t.status === 'current' ? 'var(--petgo-orange)' : 'var(--border-primary)'}"></div><div><div class="fw-500">${t.title}</div><div class="text-tiny">${t.time}</div><div class="text-small text-muted">${t.detail}</div></div></div>`).join('')}</div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Trao đổi giữa admin và đối tác</div><button class="btn btn-sm" onclick="simulateAdminNeedMore()">Giả lập admin phản hồi</button></div>
        <div class="timeline-list">${d.reviewFeedback.map(f=>`<div class="timeline-item"><div class="timeline-dot" style="background:${f.type==='success' ? '#1D9E75' : f.type==='warning' ? '#BA7517' : '#378ADD'}"></div><div><div class="fw-500">${f.by}</div><div class="text-tiny">${f.time}</div><div class="text-small text-muted">${f.message}</div></div></div>`).join('')}</div>
      </div>
    </div>

    <div class="grid2">
      <div class="card">
        <div class="card-header"><div class="card-title">Onboarding sau khi được duyệt</div><button class="btn btn-sm" onclick="completePartnerOnboardingTask()">Hoàn tất 1 bước demo</button></div>
        <div class="check-list">${d.onboardingTasks.map(task=>`<div class="check-item ${task.done ? 'done' : ''}"><div class="check-bullet">${task.done ? '✓' : '•'}</div><div><div class="fw-500" style="font-size:13px">${task.label}</div><div class="text-tiny">${task.done ? 'Đã hoàn tất trong flow mô phỏng' : 'Sẽ hoàn thành sau khi hồ sơ được duyệt'}</div></div></div>`).join('')}</div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Màn đích của flow</div></div>
        <div class="stack-list">
          <div class="stack-item"><div><div class="fw-500">1. Hồ sơ được phê duyệt</div><div class="text-small text-muted">Admin gắn xác minh, tạo tài khoản partner và gửi thông báo kích hoạt.</div></div><span class="badge ${d.status === 'approved' || d.status === 'activated' ? 'badge-success' : 'badge-gray'}">${d.status === 'approved' || d.status === 'activated' ? 'Đạt' : 'Chưa đạt'}</span></div>
          <div class="stack-item"><div><div class="fw-500">2. Tạo dịch vụ đầu tiên</div><div class="text-small text-muted">Đối tác thêm bảng giá thật, thời lượng, khu vực phục vụ và chính sách hủy.</div></div><span class="badge ${d.onboardingTasks.find(x=>x.key==='services')?.done ? 'badge-success' : 'badge-gray'}">${d.onboardingTasks.find(x=>x.key==='services')?.done ? 'Xong' : 'Chưa xong'}</span></div>
          <div class="stack-item"><div><div class="fw-500">3. Mở lịch nhận booking</div><div class="text-small text-muted">Thiết lập ca làm, slot nhận đơn, ngày nghỉ và năng lực phục vụ.</div></div><span class="badge ${d.onboardingTasks.find(x=>x.key==='schedule')?.done ? 'badge-success' : 'badge-gray'}">${d.onboardingTasks.find(x=>x.key==='schedule')?.done ? 'Xong' : 'Chưa xong'}</span></div>
          <div class="stack-item"><div><div class="fw-500">4. Chuyển sang dashboard đối tác</div><div class="text-small text-muted">Sau khi đủ điều kiện, có thể đăng nhập vai trò đối tác thật để vận hành hàng ngày.</div></div><button class="btn btn-sm btn-primary" onclick="activatePartnerNow()">Kích hoạt ngay</button></div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-between align-center flex-wrap gap-6" style="margin-top:4px">
      <div class="d-flex gap-6 flex-wrap">
        <button class="btn" onclick="savePartnerApplicationDraft()">Lưu nháp</button>
        <button class="btn" onclick="simulatePartnerSubmit()">Gửi hồ sơ</button>
        <button class="btn" onclick="uploadPartnerDocs()">Bổ sung giấy tờ</button>
      </div>
      <div class="d-flex gap-6 flex-wrap">
        <button class="btn" onclick="simulateAdminNeedMore()">Giả lập yêu cầu bổ sung</button>
        <button class="btn" onclick="simulateAdminApprovePartnerFlow()">Giả lập phê duyệt</button>
        <button class="btn btn-primary" onclick="activatePartnerNow()">Hoàn tất trở thành đối tác</button>
      </div>
    </div>
  `;
}

function renderPartnerApplyGuide() {
  document.getElementById('mainContent').innerHTML = `
    <div class="metrics metrics-3">
      <div class="metric-card"><div class="metric-label">Đăng ký mới</div><div class="metric-value">${DATA.partnerApplications.filter(a=>a.status==='pending' || a.status==='reviewing').length}</div><div class="metric-change metric-up">Đang đi trong pipeline xét duyệt</div></div>
      <div class="metric-card"><div class="metric-label">Đã phê duyệt</div><div class="metric-value">${DATA.partnerApplications.filter(a=>a.status==='approved').length}</div><div class="metric-change metric-up">Có thể chuyển sang tài khoản partner</div></div>
      <div class="metric-card"><div class="metric-label">Flow demo hiện tại</div><div class="metric-value">${_partnerApplyStatusMeta(DATA.partnerRegistrationDraft.status).label}</div><div class="metric-change metric-down">Theo hồ sơ ${DATA.partnerRegistrationDraft.applicationId}</div></div>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title">Flow hoàn chỉnh từ người đăng ký đến khi trở thành đối tác thật</div></div>
      <div class="flow-board">
        <div class="flow-col">
          <div class="flow-col-title">📝 Người đăng ký / Chủ cửa hàng</div>
          <span class="flow-chip">1. Tạo hồ sơ, điền thông tin pháp lý, cửa hàng, liên hệ, địa chỉ, dịch vụ dự kiến.</span>
          <span class="flow-chip">2. Upload giấy tờ bắt buộc: CCCD, giấy phép, ảnh mặt tiền, ảnh cơ sở, bảng giá, tài khoản đối soát.</span>
          <span class="flow-chip">3. Gửi hồ sơ và theo dõi trạng thái: nháp → đã gửi → cần bổ sung / đang xét duyệt.</span>
          <span class="flow-chip">4. Bổ sung giấy tờ theo phản hồi admin mà không cần tạo lại hồ sơ.</span>
          <span class="flow-chip">5. Sau khi được duyệt, hoàn tất onboarding: tạo dịch vụ, mở lịch, xác nhận payout.</span>
        </div>
        <div class="flow-col">
          <div class="flow-col-title">👑 Admin / Vận hành hệ thống</div>
          <span class="flow-chip">1. Nhận hồ sơ từ hàng chờ đăng ký đối tác trong dashboard admin.</span>
          <span class="flow-chip">2. Kiểm tra tính hợp lệ giấy tờ, mô hình cửa hàng, bảng giá, điều kiện vận hành.</span>
          <span class="flow-chip">3. Có thể yêu cầu bổ sung, từ chối hoặc phê duyệt hồ sơ.</span>
          <span class="flow-chip">4. Khi phê duyệt: tạo hồ sơ đối tác, gắn xác minh, cấp quyền đăng nhập dashboard.</span>
          <span class="flow-chip">5. Theo dõi log xét duyệt và tình trạng onboarding sau phê duyệt.</span>
        </div>
        <div class="flow-col">
          <div class="flow-col-title">⚙️ Hệ thống PetGo</div>
          <span class="flow-chip">1. Ghi nhận timeline hồ sơ và thông báo cho các bên liên quan.</span>
          <span class="flow-chip">2. Đồng bộ hồ sơ sang khu quản lý đối tác cho admin.</span>
          <span class="flow-chip">3. Sau khi kích hoạt, chuyển người dùng sang role đối tác thật với dashboard vận hành.</span>
          <span class="flow-chip">4. Cho phép đối tác thêm dịch vụ, mở lịch làm việc, xác nhận booking và xem doanh thu.</span>
          <span class="flow-chip">5. Lưu log thao tác onboarding để phục vụ vận hành và kiểm soát chất lượng.</span>
        </div>
      </div>
    </div>
    <div class="grid2">
      <div class="card">
        <div class="card-header"><div class="card-title">Các trạng thái cần có trong flow</div></div>
        <div class="timeline-list">
          <div class="timeline-item"><div class="timeline-dot"></div><div><div class="fw-500">Nháp</div><div class="text-tiny">Chưa gửi admin, người đăng ký vẫn đang điền thông tin.</div></div></div>
          <div class="timeline-item"><div class="timeline-dot"></div><div><div class="fw-500">Đã gửi hồ sơ</div><div class="text-tiny">Hệ thống khóa logic gửi lặp và hiển thị hàng chờ xét duyệt.</div></div></div>
          <div class="timeline-item"><div class="timeline-dot"></div><div><div class="fw-500">Đang xét duyệt</div><div class="text-tiny">Admin kiểm tra giấy tờ, tình trạng cơ sở, dịch vụ và thông tin payout.</div></div></div>
          <div class="timeline-item"><div class="timeline-dot"></div><div><div class="fw-500">Cần bổ sung</div><div class="text-tiny">Admin phản hồi hạng mục thiếu; đối tác bổ sung rồi gửi lại đúng hồ sơ cũ.</div></div></div>
          <div class="timeline-item"><div class="timeline-dot"></div><div><div class="fw-500">Đã phê duyệt / kích hoạt</div><div class="text-tiny">Tạo tài khoản đối tác thật sự, mở dashboard quản lý vận hành.</div></div></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Hồ sơ mẫu đang tham chiếu</div></div>
        <table>
          <thead><tr><th>Mã hồ sơ</th><th>Cửa hàng</th><th>Loại hình</th><th>Trạng thái</th></tr></thead>
          <tbody>
            ${DATA.partnerApplications.map(a=>`<tr><td>${a.id}</td><td>${a.storeName}</td><td>${a.type}</td><td>${_partnerApplyStatusMeta(a.status).label}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function editPartnerApplication() {
  const d = DATA.partnerRegistrationDraft;
  openModal('Chỉnh sửa hồ sơ đăng ký chi tiết', `
    <div class="form-group"><label class="form-label">Tên cửa hàng hiển thị</label><input class="form-input" value="${d.storeName}"></div>
    <div class="form-group"><label class="form-label">Tên pháp lý / hộ kinh doanh</label><input class="form-input" value="${d.legalName}"></div>
    <div class="form-group"><label class="form-label">Loại hình</label><select class="form-input"><option ${d.type==='Spa'?'selected':''}>Spa</option><option ${d.type==='Thú y'?'selected':''}>Thú y</option><option ${d.type==='Lưu trú'?'selected':''}>Lưu trú</option><option ${d.type==='Huấn luyện'?'selected':''}>Huấn luyện</option></select></div>
    <div class="form-group"><label class="form-label">Địa chỉ cửa hàng</label><input class="form-input" value="${d.address}"></div>
    <div class="form-group"><label class="form-label">Giờ hoạt động</label><input class="form-input" value="${d.openHours} · ${d.workingDays}"></div>
    <div class="form-group"><label class="form-label">Mô tả cửa hàng</label><textarea class="form-input" rows="4">${d.description}</textarea></div>
  `, () => showToast('Đã lưu thay đổi hồ sơ chi tiết', 'success'));
}

function savePartnerApplicationDraft() {
  DATA.partnerRegistrationDraft.lastUpdated = '17/03/2026 13:05';
  DATA.partnerRegistrationDraft.completion = Math.min(100, DATA.partnerRegistrationDraft.completion + 2);
  showToast('Đã lưu nháp hồ sơ đăng ký chi tiết', 'info');
  renderPartnerApply();
}

function uploadPartnerDocs() {
  const d = DATA.partnerRegistrationDraft;
  openModal('Bổ sung hồ sơ / giấy tờ', `
    <div class="form-group"><label class="form-label">Hạng mục cần bổ sung</label><select class="form-input"><option>Bảng giá dịch vụ</option><option>Ảnh khu vực tiếp khách</option><option>Xác nhận tài khoản ngân hàng</option><option>Giấy tờ khác</option></select></div>
    <div class="form-group"><label class="form-label">Tên tệp mô phỏng</label><input class="form-input" value="bang_gia_dich_vu_03_2026.pdf"></div>
    <div class="form-group"><label class="form-label">Ghi chú gửi admin</label><textarea class="form-input" rows="3" placeholder="Đã bổ sung bảng giá có ký xác nhận và ảnh chụp khu vực tiếp khách rõ nét hơn..."></textarea></div>
  `, () => {
    const missing = d.documents.find(x => x.status === 'missing');
    if (missing) {
      missing.status = 'uploaded';
      missing.file = 'bang_gia_dich_vu_03_2026.pdf';
      missing.note = 'Đối tác đã bổ sung theo yêu cầu; chờ admin xác minh lại';
    }
    d.status = 'reviewing';
    d.lastUpdated = '17/03/2026 13:12';
    d.completion = Math.min(100, d.completion + 6);
    d.timeline[3] = { time:'17/03/2026 13:12', title:'Đối tác đã bổ sung hồ sơ', detail:'Bảng giá dịch vụ và tệp bổ sung đã gửi lại cho admin', status:'done' };
    d.timeline[4] = { time:'Đang chờ admin xác minh', title:'Kiểm tra lại hồ sơ bổ sung', detail:'Admin sẽ rà soát tài liệu vừa tải lên trước khi phê duyệt', status:'current' };
    d.reviewFeedback.push({ by:'Chủ cửa hàng', time:'17/03/2026 13:12', type:'success', message:'Đã bổ sung bảng giá dịch vụ và cập nhật lại các ảnh cơ sở theo yêu cầu.' });
    const app = DATA.partnerApplications.find(x => x.id === d.applicationId);
    if (app) {
      app.status = 'reviewing';
      if (!app.documents.includes('Bảng giá dịch vụ')) app.documents.push('Bảng giá dịch vụ');
      app.note = 'Đối tác đã bổ sung hồ sơ, chờ admin xác minh lại';
    }
    showToast('Đã bổ sung giấy tờ cho hồ sơ đăng ký', 'success');
    renderPartnerApply();
  }, 'Gửi bổ sung');
}

function simulatePartnerSubmit() {
  const d = DATA.partnerRegistrationDraft;
  d.status = 'reviewing';
  d.submittedAt = '17/03/2026 09:15';
  d.lastUpdated = '17/03/2026 09:42';
  d.steps = d.steps.map((s,idx)=> ({ ...s, done: idx < 3 ? true : false }));
  const app = DATA.partnerApplications.find(x => x.id === d.applicationId);
  if (!app) {
    DATA.partnerApplications.unshift({
      id: d.applicationId,
      storeName: d.storeName,
      owner: d.owner,
      type: d.type,
      city: d.city,
      submitted: '17/03/2026',
      status: 'reviewing',
      documents: d.documents.filter(x=>x.status !== 'missing').map(x=>x.name),
      services: d.services.length,
      note: 'Hồ sơ gửi từ flow đăng ký chi tiết',
      phone: d.phone,
      address: d.address,
    });
  }
  showToast('Hồ sơ đã được gửi vào quy trình xét duyệt', 'success');
  renderPartnerApply();
}

function submitPartnerApplication() {
  simulatePartnerSubmit();
}

function simulateAdminNeedMore() {
  const d = DATA.partnerRegistrationDraft;
  d.status = 'need_more';
  d.lastUpdated = '17/03/2026 11:10';
  const missing = d.documents.find(x => x.name === 'Bảng giá dịch vụ') || d.documents.find(x => x.status === 'missing');
  if (missing) {
    missing.status = 'missing';
    missing.note = 'Admin yêu cầu bảng giá có ký xác nhận để đối chiếu giá niêm yết';
  }
  d.reviewFeedback.push({ by:'PetGo Ops', time:'17/03/2026 13:18', type:'warning', message:'Vui lòng tải lên bảng giá dịch vụ mới nhất và ảnh khu vực tiếp khách đủ sáng trước 17:00 hôm nay.' });
  const app = DATA.partnerApplications.find(x => x.id === d.applicationId);
  if (app) {
    app.status = 'reviewing';
    app.note = 'Đang chờ bổ sung bảng giá dịch vụ và ảnh cơ sở';
  }
  showToast('Đã giả lập trạng thái cần bổ sung hồ sơ', 'warning');
  renderPartnerApply();
}

function simulateAdminApprovePartnerFlow() {
  const d = DATA.partnerRegistrationDraft;
  d.status = 'approved';
  d.lastUpdated = '17/03/2026 14:05';
  d.completion = 100;
  d.documents.forEach(doc => { if (doc.status !== 'missing') doc.status = 'verified'; });
  d.steps = d.steps.map((s,idx)=> ({ ...s, done: idx < 4 }));
  d.timeline = [
    { time:'17/03/2026 09:15', title:'Tạo hồ sơ đăng ký đối tác', detail:'Lưu nháp lần đầu với thông tin cửa hàng và người đại diện', status:'done' },
    { time:'17/03/2026 09:42', title:'Gửi hồ sơ xét duyệt', detail:'Hồ sơ chuyển sang hàng đợi của admin', status:'done' },
    { time:'17/03/2026 10:20', title:'Kiểm tra bước 1', detail:'Đối chiếu giấy tờ cá nhân và địa chỉ cơ sở', status:'done' },
    { time:'17/03/2026 13:12', title:'Bổ sung giấy tờ theo phản hồi', detail:'Đối tác đã gửi thêm bảng giá và ảnh cơ sở', status:'done' },
    { time:'17/03/2026 14:05', title:'Admin phê duyệt hồ sơ', detail:'Tạo tài khoản partner và mở checklist onboarding', status:'current' },
  ];
  d.reviewFeedback.push({ by:'PetGo Ops', time:'17/03/2026 14:05', type:'success', message:'Hồ sơ đã được phê duyệt. Bạn có thể bắt đầu hoàn tất onboarding để trở thành đối tác đang hoạt động.' });
  const app = DATA.partnerApplications.find(x => x.id === d.applicationId);
  if (app) {
    app.status = 'approved';
    app.note = 'Đã phê duyệt, chờ hoàn tất onboarding';
  }
  showToast('Đã giả lập admin phê duyệt hồ sơ', 'success');
  renderPartnerApply();
}

function completePartnerOnboardingTask() {
  const d = DATA.partnerRegistrationDraft;
  const next = d.onboardingTasks.find(x => !x.done);
  if (!next) {
    showToast('Tất cả bước onboarding đã hoàn tất', 'success');
    return;
  }
  next.done = true;
  d.lastUpdated = '17/03/2026 14:20';
  showToast(`Đã hoàn tất bước: ${next.label}`, 'success');
  renderPartnerApply();
}

function activatePartnerNow() {
  const d = DATA.partnerRegistrationDraft;
  if (d.status !== 'approved' && d.status !== 'activated') {
    showToast('Cần phê duyệt hồ sơ trước khi kích hoạt vai trò đối tác', 'warning');
    return;
  }
  d.status = 'activated';
  d.steps = d.steps.map(s => ({ ...s, done:true }));
  d.onboardingTasks.forEach(t => t.done = true);
  d.timeline.push({ time:'17/03/2026 14:30', title:'Kích hoạt vai trò đối tác thành công', detail:'Tài khoản đã có thể truy cập dashboard partner và nhận booking', status:'done' });
  const exists = DATA.partners.find(x => x.name === d.storeName);
  if (!exists) {
    DATA.partners.unshift({
      id: 'P' + String(DATA.partners.length + 1).padStart(3,'0'),
      name: d.storeName,
      type: d.type,
      address: d.address,
      phone: d.phone,
      bookings: 0,
      rating: '—',
      docs: '✓',
      joined: '17/03/2026',
      status: 'verified'
    });
  }
  const app = DATA.partnerApplications.find(x => x.id === d.applicationId);
  if (app) app.status = 'approved';
  showToast('Flow hoàn tất: tài khoản đã trở thành đối tác thật sự', 'success');
  switchRole('partner');
}
