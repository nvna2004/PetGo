// ============================================================
//  PetGo — App Controller (Navigation & Role Switching)
// ============================================================

let currentRole = 'admin';
let currentPanel = 'admin-dashboard';

const NAV = {
  admin: [
    { section: 'Tổng quan' },
    { id: 'admin-dashboard',       icon: '📊', label: 'Dashboard' },
    { section: 'Quản lý hệ thống' },
    { id: 'admin-users',           icon: '👥', label: 'Người dùng', badge: 3 },
    { id: 'admin-partners',        icon: '🏪', label: 'Đối tác', badge: 5 },
    { id: 'admin-services',        icon: '✂️', label: 'Dịch vụ' },
    { id: 'admin-bookings',        icon: '📅', label: 'Booking' },
    { id: 'admin-reviews',         icon: '⭐', label: 'Review', badge: 2 },
    { section: 'Vận hành' },
    { id: 'admin-notifications',   icon: '🔔', label: 'Notification / Ops' },
    { id: 'admin-logs',            icon: '🗒️', label: 'Admin Log' },
    { section: 'Khác' },
    { id: 'admin-reports',         icon: '📈', label: 'Báo cáo' },
    { id: 'admin-vouchers',        icon: '🎫', label: 'Khuyến mãi' },
    { id: 'admin-content',         icon: '📝', label: 'Nội dung' },
  ],
  partner: [
    { section: 'Tổng quan' },
    { id: 'partner-dashboard',     icon: '📊', label: 'Dashboard' },
    { id: 'partner-profile',       icon: '🏷️', label: 'Hồ sơ cửa hàng' },
    { section: 'Vận hành' },
    { id: 'partner-bookings',      icon: '📅', label: 'Quản lý booking', badge: 2 },
    { id: 'partner-services',      icon: '✂️', label: 'Dịch vụ' },
    { id: 'partner-schedule',      icon: '📆', label: 'Lịch làm việc' },
    { section: 'Kinh doanh' },
    { id: 'partner-reviews',       icon: '⭐', label: 'Đánh giá' },
    { id: 'partner-pets',          icon: '🐾', label: 'Hồ sơ thú cưng' },
    { id: 'partner-reports',       icon: '📈', label: 'Doanh thu' },
    { id: 'partner-subscription',  icon: '💎', label: 'Gói đăng ký' },
  ],

  'partner-apply': [
    { section: 'Bắt đầu' },
    { id: 'partner-apply',        icon: '📝', label: 'Đăng ký làm đối tác' },
    { section: 'Tham khảo' },
    { id: 'partner-apply-guide',  icon: '📋', label: 'Quy trình xét duyệt' },
  ],
};

const PANEL_TITLES = {
  'admin-dashboard':     'Dashboard admin',
  'admin-users':         'Quản lý người dùng',
  'admin-partners':      'Quản lý đối tác',
  'admin-bookings':      'Quản lý booking toàn hệ thống',
  'admin-services':      'Quản lý dịch vụ toàn hệ thống',
  'admin-reviews':       'Quản lý review & khiếu nại',
  'admin-vouchers':      'Quản lý khuyến mãi',
  'admin-content':       'Quản lý nội dung',
  'admin-reports':       'Báo cáo & phân tích',
  'admin-notifications': 'Notification / vận hành cơ bản',
  'admin-logs':          'Log hoạt động admin',
  'partner-dashboard':   'Dashboard cho đối tác',
  'partner-profile':     'Hồ sơ cửa hàng đối tác',
  'partner-bookings':    'Đối tác quản lý booking',
  'partner-services':    'Đối tác quản lý dịch vụ',
  'partner-schedule':    'Đối tác quản lý lịch làm việc',
  'partner-reviews':     'Đánh giá & nhận xét',
  'partner-pets':        'Hồ sơ thú cưng khách hàng',
  'partner-reports':     'Doanh thu / thống kê đơn',
  'partner-subscription':'Gói đăng ký đối tác',
  'partner-apply':       'Đăng ký làm đối tác',
  'partner-apply-guide': 'Quy trình xét duyệt đối tác',
};

const PANEL_RENDERERS = {
  'admin-dashboard':     renderAdminDashboard,
  'admin-users':         renderAdminUsers,
  'admin-partners':      renderAdminPartners,
  'admin-bookings':      renderAdminBookings,
  'admin-services':      renderAdminServices,
  'admin-reviews':       renderAdminReviews,
  'admin-vouchers':      renderAdminVouchers,
  'admin-content':       renderAdminContent,
  'admin-reports':       renderAdminReports,
  'admin-notifications': renderAdminNotifications,
  'admin-logs':          renderAdminLogs,
  'partner-dashboard':   renderPartnerDashboard,
  'partner-profile':     renderPartnerProfile,
  'partner-bookings':    renderPartnerBookings,
  'partner-services':    renderPartnerServices,
  'partner-schedule':    renderPartnerSchedule,
  'partner-reviews':     renderPartnerReviews,
  'partner-pets':        renderPartnerPets,
  'partner-reports':     renderPartnerReports,
  'partner-subscription':renderPartnerSubscription,
  'partner-apply':       renderPartnerApply,
  'partner-apply-guide': renderPartnerApplyGuide,
};

function renderNav() {
  const nav = NAV[currentRole];
  const el = document.getElementById('sidebarNav');
  el.innerHTML = nav.map(n => {
    if (n.section) return `<div class="nav-section">${n.section}</div>`;
    const badge = n.badge ? `<span class="nav-badge">${n.badge}</span>` : '';
    return `<div class="nav-item ${n.id === currentPanel ? 'active' : ''}" onclick="renderPanel('${n.id}')">
      <span class="nav-icon">${n.icon}</span>
      <span>${n.label}</span>
      ${badge}
    </div>`;
  }).join('');
}

function renderPanel(id) {
  currentPanel = id;
  renderNav();
  document.getElementById('topbarTitle').textContent = PANEL_TITLES[id] || id;
  document.getElementById('mainContent').innerHTML = '';
  if (PANEL_RENDERERS[id]) PANEL_RENDERERS[id]();
}

function switchRole(role) {
  currentRole = role;
  currentPanel = role === 'admin' ? 'admin-dashboard' : role === 'partner' ? 'partner-dashboard' : 'partner-apply';
  document.getElementById('userAvatar').textContent = role === 'admin' ? 'AD' : role === 'partner' ? 'PS' : 'RG';
  renderNav();
  renderPanel(currentPanel);
}

renderNav();
renderPanel(currentPanel);
