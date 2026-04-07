<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>EcoSmart — User Portal</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
<link rel="stylesheet" href="css/main.css"/>
</head>
<body>

<!-- AUTH SCREEN -->
<div id="authScreen">
  <div class="auth-wrap">
    <div style="width:100%;max-width:420px">
      <a class="auth-back" href="index.html"><i class="fas fa-arrow-left"></i> Back to home</a>
      <div class="auth-card">
        <div class="auth-logo">
          <div class="auth-logo-icon">♻</div>
          <div class="auth-logo-text">Eco<span>Smart</span></div>
        </div>
        <div class="auth-tabs">
          <button class="auth-tab active" id="tabA" onclick="switchTab('login')">Sign In</button>
          <button class="auth-tab"        id="tabB" onclick="switchTab('register')">Register</button>
        </div>

        <!-- LOGIN -->
        <div id="loginForm">
          <div class="auth-heading">Welcome back</div>
          <div class="auth-sub">Sign in to report problems and track your requests</div>
          <div class="error-msg" id="loginErr"></div>
          <div class="field">
            <label>Email address</label>
            <input type="email" id="lEmail" placeholder="you@example.com" autocomplete="email"/>
          </div>
          <div class="field">
            <label>Password</label>
            <input type="password" id="lPass" placeholder="Your password" autocomplete="current-password"
              onkeydown="if(event.key==='Enter')doLogin()"/>
          </div>
          <button class="btn btn-green btn-full" id="loginBtn" onclick="doLogin()">
            <i class="fas fa-sign-in-alt"></i> Sign In
          </button>
          <div class="auth-footer">No account? <a onclick="switchTab('register')">Register here</a></div>
        </div>

        <!-- REGISTER -->
        <div id="regForm" style="display:none">
          <div class="auth-heading">Create account</div>
          <div class="auth-sub">Register to report waste problems in your area</div>
          <div class="error-msg" id="regErr"></div>
          <div class="field-row">
            <div class="field">
              <label>Full name <span style="color:var(--red)">*</span></label>
              <input type="text" id="rName" placeholder="Your name"/>
            </div>
            <div class="field">
              <label>Phone <span style="color:var(--red)">*</span></label>
              <input type="tel" id="rPhone" placeholder="9876543210" maxlength="10"/>
            </div>
          </div>
          <div class="field">
            <label>Email address <span style="color:var(--red)">*</span></label>
            <input type="email" id="rEmail" placeholder="you@example.com"/>
          </div>
          <div class="field-row">
            <div class="field">
              <label>City</label>
              <input type="text" id="rCity" placeholder="Mysuru"/>
            </div>
            <div class="field">
              <label>Password <span style="color:var(--red)">*</span> <span style="color:var(--muted);font-size:11px;font-weight:400">(min 6)</span></label>
              <input type="password" id="rPass" placeholder="Create a password"/>
            </div>
          </div>
          <button class="btn btn-green btn-full" id="regBtn" onclick="doRegister()">
            <i class="fas fa-user-plus"></i> Create Account
          </button>
          <div class="auth-footer">Already registered? <a onclick="switchTab('login')">Sign in</a></div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- MAIN APP -->
<div id="appScreen" style="display:none">
  <div class="app-shell">
    <aside class="sidebar">
      <div class="sidebar-brand">
        <div class="sidebar-brand-icon">♻</div>
        <div class="sidebar-brand-name">Eco<span>Smart</span></div>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-group-label">Menu</div>
        <button class="nav-btn active" data-page="dashboard"  onclick="goPage('dashboard')"><i class="fas fa-home"></i> Dashboard</button>
        <button class="nav-btn"        data-page="report"     onclick="goPage('report')"><i class="fas fa-flag"></i> Report Problem</button>
        <button class="nav-btn"        data-page="myreports"  onclick="goPage('myreports')"><i class="fas fa-list-ul"></i> My Reports</button>
        <button class="nav-btn"        data-page="bins"       onclick="goPage('bins')"><i class="fas fa-trash-alt"></i> Bin Status</button>
      </nav>
      <div class="sidebar-footer">
        <div class="sidebar-profile">
          <div class="sidebar-avatar" id="sbAvatar">U</div>
          <div>
            <div class="sidebar-profile-name"  id="sbName">User</div>
            <div class="sidebar-profile-email" id="sbEmail"></div>
          </div>
        </div>
        <button class="btn btn-outline btn-full btn-sm" onclick="logout('index.html')"
          style="color:var(--sidebar-text);border-color:var(--sidebar-border)">
          <i class="fas fa-sign-out-alt"></i> Sign Out
        </button>
      </div>
    </aside>

    <div class="main-area">
      <div class="topbar">
        <div class="topbar-title" id="pageTitle">Dashboard</div>
        <div class="topbar-right">
          <button class="btn btn-green btn-sm" onclick="goPage('report')">
            <i class="fas fa-plus"></i> Report Problem
          </button>
        </div>
      </div>

      <!-- DASHBOARD -->
      <div id="pgDashboard" class="page-wrap">
        <div class="page-head">
          <h1 id="greeting">Dashboard</h1>
          <p>Overview of your activity and live bin status from IoT sensors.</p>
        </div>
        <div class="stats-row">
          <div class="stat-box blue">
            <div class="stat-label">My Reports</div>
            <div class="stat-val" id="dTotal">0</div>
            <div class="stat-hint">Total submitted</div>
          </div>
          <div class="stat-box amber">
            <div class="stat-label">Pending</div>
            <div class="stat-val" id="dPending">0</div>
            <div class="stat-hint">Awaiting action</div>
          </div>
          <div class="stat-box green">
            <div class="stat-label">Resolved</div>
            <div class="stat-val" id="dResolved">0</div>
            <div class="stat-hint">Fixed by team</div>
          </div>
          <div class="stat-box red">
            <div class="stat-label">Critical Bins</div>
            <div class="stat-val" id="dCritical">0</div>
            <div class="stat-hint">Near overflow</div>
          </div>
        </div>
        <div class="card">
          <div class="card-title">
            Recent Reports
            <button class="btn btn-outline btn-sm" onclick="goPage('myreports')">View all</button>
          </div>
          <div id="dashReports"><p style="color:var(--muted);font-size:14px">No reports yet.</p></div>
        </div>
        <div class="card">
          <div class="card-title">Live Bin Status <span style="font-size:12px;color:var(--muted);font-weight:400">(from Arduino sensors)</span></div>
          <div class="bins-grid" id="dashBins"></div>
        </div>
      </div>

      <!-- REPORT PROBLEM -->
      <div id="pgReport" class="page-wrap" style="display:none">
        <div class="page-head">
          <h1>Report a Problem</h1>
          <p>Your contact details are automatically attached — admin will see your name, email and phone.</p>
        </div>
        <div class="card" style="max-width:600px">
          <!-- Auto-filled reporter info -->
          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:9px;padding:14px 16px;margin-bottom:20px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.4px;color:#0369a1;margin-bottom:8px">Your details — sent to admin automatically</div>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;font-size:13px">
              <div><div style="color:#0369a1">Name</div><div style="font-weight:600" id="rInfoName">—</div></div>
              <div><div style="color:#0369a1">Email</div><div style="font-weight:600" id="rInfoEmail">—</div></div>
              <div><div style="color:#0369a1">Phone</div><div style="font-weight:600" id="rInfoPhone">—</div></div>
            </div>
          </div>

          <div class="field-row">
            <div class="field">
              <label>Problem type <span style="color:var(--red)">*</span></label>
              <select id="fCategory">
                <option value="">Select a category</option>
                <option value="Bin Overflow">Bin Overflow</option>
                <option value="Illegal Dumping">Illegal Dumping</option>
                <option value="Damaged Bin">Damaged Bin</option>
                <option value="Missed Collection">Missed Collection</option>
                <option value="Foul Smell">Foul Smell / Hygiene</option>
                <option value="Stray Animals">Stray Animals at Bin</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="field">
              <label>Priority</label>
              <select id="fPriority">
                <option value="low">Low — not urgent</option>
                <option value="normal" selected>Normal</option>
                <option value="high">High — urgent</option>
              </select>
            </div>
          </div>
          <div class="field">
            <label>Location <span style="color:var(--red)">*</span></label>
            <input type="text" id="fLocation" placeholder="e.g. Near Park Street main junction"/>
          </div>
          <div class="field-row">
            <div class="field">
              <label>Full address</label>
              <input type="text" id="fAddress" placeholder="Street, landmark, area"/>
            </div>
            <div class="field">
              <label>Pincode</label>
              <input type="text" id="fPincode" placeholder="570001" maxlength="6"/>
            </div>
          </div>
          <div class="field">
            <label>GPS location <span style="font-size:12px;font-weight:400;color:var(--muted)">(optional — helps admin find exact spot)</span></label>
            <div style="display:flex;gap:8px">
              <input type="text" id="fCoords" placeholder="Click Detect to auto-fill" readonly/>
              <button class="btn btn-outline btn-sm" onclick="detectGPS()" style="white-space:nowrap;flex-shrink:0">
                <i class="fas fa-crosshairs"></i> Detect
              </button>
            </div>
          </div>
          <div class="field">
            <label>Describe the problem <span style="color:var(--red)">*</span></label>
            <textarea id="fDesc" rows="4" placeholder="Describe what you see — e.g. The bin near the school gate has been overflowing since Monday..."></textarea>
          </div>
          <div class="error-msg" id="reportErr"></div>
          <div style="display:flex;gap:10px;margin-top:4px">
            <button class="btn btn-green" style="flex:1" onclick="submitReport()">
              <i class="fas fa-paper-plane"></i> Submit Report
            </button>
            <button class="btn btn-outline" onclick="clearReport()">
              <i class="fas fa-times"></i> Clear
            </button>
          </div>
        </div>
      </div>

      <!-- MY REPORTS -->
      <div id="pgMyreports" class="page-wrap" style="display:none">
        <div class="page-head">
          <h1>My Reports</h1>
          <p>All problems you have reported. Admin notes appear here once reviewed.</p>
        </div>
        <div id="myReportsList"><p style="color:var(--muted)">Loading...</p></div>
      </div>

      <!-- BIN STATUS -->
      <div id="pgBins" class="page-wrap" style="display:none">
        <div class="page-head">
          <h1>Bin Status</h1>
          <p>Live fill levels sent directly from the Arduino sensors. Updates every 20 seconds.</p>
        </div>
        <div class="bins-grid" id="allBinsGrid"></div>
      </div>
    </div>
  </div>
</div>

<script src="js/utils.js"></script>
<script>
'use strict';
let me = null, myReports = [], allBins = [], ticker = null;

// ── TAB SWITCH ────────────────────────────────────────────────
function switchTab(tab) {
  const isLogin = tab === 'login';
  document.getElementById('loginForm').style.display = isLogin ? '' : 'none';
  document.getElementById('regForm').style.display   = isLogin ? 'none' : '';
  document.getElementById('tabA').classList.toggle('active', isLogin);
  document.getElementById('tabB').classList.toggle('active', !isLogin);
  document.getElementById('loginErr').style.display = 'none';
  document.getElementById('regErr').style.display   = 'none';
}

// ── LOGIN ─────────────────────────────────────────────────────
async function doLogin() {
  const email = document.getElementById('lEmail').value.trim();
  const pass  = document.getElementById('lPass').value;
  const err   = document.getElementById('loginErr');
  err.style.display = 'none';
  if (!email) { showErr(err, 'Please enter your email.'); return; }
  if (!pass)  { showErr(err, 'Please enter your password.'); return; }

  const btn = document.getElementById('loginBtn');
  btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
  const r = await apiFetch('/api/auth/user/login', { method:'POST', body:JSON.stringify({ email, password:pass }) });
  btn.disabled = false; btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';

  if (r.ok) { setToken(r.token); setUser(r.user); toast(r.message, 'success'); bootApp(r.user); }
  else { showErr(err, r.message || 'Login failed.'); }
}

// ── REGISTER ──────────────────────────────────────────────────
async function doRegister() {
  const name  = document.getElementById('rName').value.trim();
  const phone = document.getElementById('rPhone').value.trim();
  const email = document.getElementById('rEmail').value.trim();
  const city  = document.getElementById('rCity').value.trim();
  const pass  = document.getElementById('rPass').value;
  const err   = document.getElementById('regErr');
  err.style.display = 'none';

  if (!name)           { showErr(err, 'Full name is required.');                  return; }
  if (!phone)          { showErr(err, 'Phone number is required.');               return; }
  if (!/^\d{10}$/.test(phone)) { showErr(err, 'Enter a valid 10-digit number.'); return; }
  if (!email)          { showErr(err, 'Email address is required.');              return; }
  if (!pass)           { showErr(err, 'Password is required.');                   return; }
  if (pass.length < 6) { showErr(err, 'Password must be at least 6 characters.'); return; }

  const btn = document.getElementById('regBtn');
  btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...';
  const r = await apiFetch('/api/auth/register', { method:'POST', body:JSON.stringify({ name, phone, email, city, password:pass }) });
  btn.disabled = false; btn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';

  if (r.ok) { setToken(r.token); setUser(r.user); toast(r.message, 'success'); bootApp(r.user); }
  else { showErr(err, r.message || 'Registration failed.'); }
}

function showErr(el, msg) { el.textContent = msg; el.style.display = 'block'; }

// ── BOOT ─────────────────────────────────────────────────────
function bootApp(user) {
  me = user;
  document.getElementById('authScreen').style.display = 'none';
  document.getElementById('appScreen').style.display  = '';
  document.getElementById('sbAvatar').textContent  = user.name[0].toUpperCase();
  document.getElementById('sbName').textContent    = user.name;
  document.getElementById('sbEmail').textContent   = user.email;
  document.getElementById('rInfoName').textContent  = user.name;
  document.getElementById('rInfoEmail').textContent = user.email;
  document.getElementById('rInfoPhone').textContent = user.phone || 'Not set';
  const h = new Date().getHours();
  document.getElementById('greeting').textContent =
    (h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening') + ', ' + user.name.split(' ')[0];
  loadDashboard();
  ticker = setInterval(loadDashboard, 20000);
}

// ── NAVIGATION ────────────────────────────────────────────────
const PAGE_TITLES = { dashboard:'Dashboard', report:'Report a Problem', myreports:'My Reports', bins:'Bin Status' };
function goPage(name) {
  ['dashboard','report','myreports','bins'].forEach(p => {
    document.getElementById('pg' + p.charAt(0).toUpperCase() + p.slice(1)).style.display = p === name ? '' : 'none';
  });
  document.getElementById('pageTitle').textContent = PAGE_TITLES[name];
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.page === name));
  if (name === 'myreports') renderMyReports();
  if (name === 'bins')      renderAllBins();
}

// ── DATA LOADING ──────────────────────────────────────────────
async function loadDashboard() {
  const [rr, rb] = await Promise.all([
    apiFetch('/api/reports/mine'),
    apiFetch('/api/bins')
  ]);
  if (rr.ok) myReports = rr.data;
  if (rb.ok) allBins   = rb.data;

  document.getElementById('dTotal').textContent    = myReports.length;
  document.getElementById('dPending').textContent  = myReports.filter(r => r.status === 'pending').length;
  document.getElementById('dResolved').textContent = myReports.filter(r => r.status === 'resolved').length;
  document.getElementById('dCritical').textContent = allBins.filter(b => b.status === 'critical').length;

  const el = document.getElementById('dashReports');
  if (!myReports.length) {
    el.innerHTML = '<p style="color:var(--muted);font-size:14px">No reports yet. <a style="color:var(--green);cursor:pointer" onclick="goPage(\'report\')">Submit your first report →</a></p>';
  } else {
    el.innerHTML = myReports.slice(0, 4).map(r => `
      <div style="display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid var(--border)">
        <div style="flex:1">
          <div style="font-size:14px;font-weight:600">${r.category}</div>
          <div style="font-size:12px;color:var(--muted);margin-top:2px">${r.location} · ${timeAgo(r.createdAt)}</div>
          ${r.adminNote ? `<div style="font-size:12px;color:var(--green);margin-top:3px">Admin: ${r.adminNote}</div>` : ''}
        </div>
        <span class="badge badge-${r.status}">${r.status.replace('_', ' ')}</span>
      </div>`).join('');
  }
  renderBinCards('dashBins', allBins.slice(0, 6));
}

function renderMyReports() {
  const el = document.getElementById('myReportsList');
  if (!myReports.length) {
    el.innerHTML = `<div class="card" style="text-align:center;padding:40px">
      <p style="color:var(--muted);margin-bottom:12px">No reports submitted yet.</p>
      <button class="btn btn-green" onclick="goPage('report')"><i class="fas fa-plus"></i> Submit a report</button>
    </div>`;
    return;
  }
  el.innerHTML = myReports.map(r => `
    <div class="report-card">
      <div class="rc-top">
        <div>
          <div class="rc-category">${r.category}</div>
          <div class="rc-id">Report #${r.id.slice(-8)} · ${timeAgo(r.createdAt)}</div>
        </div>
        <span class="badge badge-${r.status}">${r.status.replace('_', ' ')}</span>
      </div>
      <div class="rc-location"><i class="fas fa-map-marker-alt"></i> ${r.location}${r.address && r.address !== r.location ? ' · ' + r.address : ''}</div>
      <div class="rc-desc">${r.description}</div>
      ${r.adminNote ? `<div class="rc-admin-note"><i class="fas fa-comment"></i> Admin: ${r.adminNote}</div>` : ''}
    </div>`).join('');
}

function renderAllBins() { renderBinCards('allBinsGrid', allBins); }

function renderBinCards(id, bins) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!bins.length) { el.innerHTML = '<p style="color:var(--muted);font-size:14px">No bins found.</p>'; return; }
  el.innerHTML = bins.map(b => {
    const c = binColor(b.level);
    return `<div class="bin-card ${b.status}">
      <div class="bin-id">${b.id} · ${b.type}</div>
      <div class="bin-loc">${b.location}</div>
      <div class="bin-bar"><div class="bin-fill" style="width:${b.level}%;background:${c}"></div></div>
      <div class="bin-footer">
        <span class="bin-pct" style="color:${c}">${Math.round(b.level)}%</span>
        <span class="badge badge-${b.status}">${b.status}</span>
      </div>
    </div>`;
  }).join('');
}

// ── REPORT FORM ───────────────────────────────────────────────
function detectGPS() {
  if (!navigator.geolocation) { toast('Geolocation not supported.', 'error'); return; }
  navigator.geolocation.getCurrentPosition(
    p => { document.getElementById('fCoords').value = `${p.coords.latitude.toFixed(6)}, ${p.coords.longitude.toFixed(6)}`; toast('Location detected!', 'success'); },
    () => toast('Could not detect location. Allow location access and try again.', 'warning')
  );
}

async function submitReport() {
  const category = document.getElementById('fCategory').value;
  const location = document.getElementById('fLocation').value.trim();
  const address  = document.getElementById('fAddress').value.trim();
  const pincode  = document.getElementById('fPincode').value.trim();
  const coords   = document.getElementById('fCoords').value.trim();
  const desc     = document.getElementById('fDesc').value.trim();
  const priority = document.getElementById('fPriority').value;
  const err      = document.getElementById('reportErr');
  err.style.display = 'none';

  if (!category)        { showErr(err, 'Please select a problem category.');     return; }
  if (!location)        { showErr(err, 'Please enter the location.');            return; }
  if (desc.length < 10) { showErr(err, 'Please describe the problem in more detail.'); return; }

  let lat = null, lng = null;
  if (coords) { const p = coords.split(','); lat = parseFloat(p[0]); lng = parseFloat(p[1]); }

  const r = await apiFetch('/api/reports', {
    method: 'POST',
    body: JSON.stringify({ category, location, address, pincode, description: desc, priority, lat, lng })
  });

  if (r.ok) {
    toast(r.message, 'success');
    clearReport();
    if (r.report) myReports.unshift(r.report);
    goPage('myreports');
  } else {
    showErr(err, r.message || 'Submission failed. Please try again.');
  }
}

function clearReport() {
  ['fCategory','fLocation','fAddress','fPincode','fCoords','fDesc'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.getElementById('fPriority').value = 'normal';
  document.getElementById('reportErr').style.display = 'none';
}

// ── BOOT ─────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  const u = getUser(), t = getToken();
  if (u && t && u.role === 'user') bootApp(u);
});
</script>
</body>
</html>
