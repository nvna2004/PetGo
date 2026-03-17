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
