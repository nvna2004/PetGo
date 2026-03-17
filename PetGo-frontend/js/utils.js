// ============================================================
//  PetGo — Shared Utilities
// ============================================================

function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  const icons = { success: '✓', warning: '⚠', error: '✕', info: 'ℹ' };
  const colors = { success: '#1D9E75', warning: '#BA7517', error: '#E24B4A', info: '#185fa5' };
  document.getElementById('toastIcon').textContent = icons[type] || '✓';
  document.getElementById('toastMsg').textContent = msg;
  t.style.borderLeftColor = colors[type] || colors.success;
  t.className = 'toast show';
  setTimeout(() => t.className = 'toast', 3000);
}

function openModal(title, bodyHTML, confirmFn, confirmLabel = 'Xác nhận') {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = bodyHTML;
  const btn = document.getElementById('modalConfirm');
  btn.textContent = confirmLabel;
  btn.onclick = () => { if (confirmFn) confirmFn(); closeModal(); };
  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}

function statusBadge(s) {
  const map = {
    confirmed:   ['badge-success', 'Đã xác nhận'],
    pending:     ['badge-warning', 'Chờ xác nhận'],
    in_progress: ['badge-info',    'Đang thực hiện'],
    completed:   ['badge-gray',    'Hoàn thành'],
    cancelled:   ['badge-danger',  'Đã hủy'],
  };
  const [cls, label] = map[s] || ['badge-gray', s];
  return `<span class="badge ${cls}">${label}</span>`;
}

function partnerStatusBadge(s) {
  const map = {
    verified:  ['badge-success', 'Đã xác minh'],
    pending:   ['badge-warning', 'Chờ duyệt'],
    reviewing: ['badge-info',    'Đang xét duyệt'],
    locked:    ['badge-danger',  'Bị khóa'],
  };
  const [cls, label] = map[s] || ['badge-gray', s];
  return `<span class="badge ${cls}">${label}</span>`;
}

function partnerIcon(type) {
  const map = { 'Spa': '✂️', 'Thú y': '🏥', 'Lưu trú': '🏠', 'Huấn luyện': '🎓' };
  return map[type] || '🏪';
}

function fmt(num) {
  return num.toLocaleString('vi-VN') + 'đ';
}

function showProfileMenu() {
  showToast('Xem hồ sơ tài khoản', 'info');
}

// Keyboard shortcut: Escape closes modal
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
