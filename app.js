// CRSCWP Web Platform Core JS Engine
// Implementation for local client-side static storage (localStorage)

const PILLAR_KEYS = {
  agi: 'AGI (범용 인공 지능)',
  actf: 'ACTF (안드로이드 사이보그 트랜스포머)',
  swimming: '수영',
  skydiving: '스카이다이빙',
  climbing: '암벽 등반',
  cafe: '카페 취업',
  skills: '기술 연마'
};

// Initial Seed Data for Documents
const DEFAULT_DOCUMENTS = [
  {
    id: 'seed-1',
    category: 'agi',
    title: 'AGI와 인간 활동의 융합 방향성',
    content: '<h3>인공 일반 지능(AGI)의 사회적 적응</h3><p>AGI는 단순한 연산 기기가 아닙니다. 사람의 수준에 완벽히 맞추고 인간의 사회적 활동 및 외관을 모사하는 것이 최종 목표입니다.</p><p>동호회 내에서 AGI의 발전을 관찰하고, 이를 어떻게 우리 삶의 일부분으로 흡수할지 연구하는 것이 첫 번째 단계입니다.</p>',
    authorId: 'admin',
    authorName: '정구영',
    createdAt: '2026-05-28'
  },
  {
    id: 'seed-2',
    category: 'actf',
    title: 'ACTF 프로젝트: 안드로이드 사이보그의 현실화',
    content: '<h3>안드로이드 사이보그 트랜스포머 기술론</h3><p>영화 속 트랜스포머 및 로보틱스 기술을 현실로 가져오기 위한 이론적 배경을 서술합니다.</p><p>체내에 생명 연장 기술 및 강화 파츠를 융합하여 기계와 유기체의 결합을 논리적으로 탐구하는 분야입니다.</p>',
    authorId: 'admin',
    authorName: '정구영',
    createdAt: '2026-05-28'
  },
  {
    id: 'seed-3',
    category: 'swimming',
    title: '수영: 무중력 환경에서의 신체 훈련',
    content: '<h3>수영장에서 느끼는 반중력 감각</h3><p>수영장은 우주 및 무중력 환경을 간접적으로 체험해 볼 수 있는 최고의 훈련 장소입니다.</p><p>신체의 부력을 이용해 중력의 제약에서 잠시 벗어남으로써 신체 밸런스를 잡고 근육 강화를 꾀할 수 있습니다.</p>',
    authorId: 'admin',
    authorName: '정구영',
    createdAt: '2026-05-29'
  },
  {
    id: 'seed-4',
    category: 'skydiving',
    title: '스카이다이빙을 통한 중력 가속도 적응',
    content: '<h3>하늘에서의 활강 스포츠와 멘탈 트레이닝</h3><p>스카이다이빙은 지구의 중력을 그대로 활용해 활강하는 익스트림 스포츠입니다.</p><p>대자연의 힘인 중력에 적응하고 신체적 한계를 극복하는 과정에서 기술의 도약을 향한 정신력을 배양할 수 있습니다.</p>',
    authorId: 'admin',
    authorName: '정구영',
    createdAt: '2026-05-30'
  },
  {
    id: 'seed-5',
    category: 'climbing',
    title: '암벽 등반: 중력을 거스르는 도전',
    content: '<h3>암벽 위에서의 수직 도약</h3><p>암벽 등반은 오직 자신의 신체와 지형지물만을 활용하여 중력에 도전하는 스포츠 활동입니다.</p><p>한 걸음 한 걸음 힘을 다해 오르는 암벽 등반은 경제 자립과 자립적인 생존 능력 배양의 기틀이 됩니다.</p>',
    authorId: 'admin',
    authorName: '정구영',
    createdAt: '2026-05-31'
  },
  {
    id: 'seed-6',
    category: 'cafe',
    title: '제주도 카페 탐방 및 경제 여건 탐색',
    content: '<h3>주거 이전을 위한 제주도 인프라 조사</h3><p>제주도 내 유망한 카페들을 직접 방문하고, 이와 관련된 구직 환경과 경제적 기회를 분석해봅니다.</p><p>독립적인 생활 여건을 구축하기 위해 필수적인 실전 경제 조사 단계입니다.</p>',
    authorId: 'admin',
    authorName: '정구영',
    createdAt: '2026-06-01'
  },
  {
    id: 'seed-7',
    category: 'skills',
    title: '바리스타 기술 연마와 카페 창업 대비',
    content: '<h3>에스프레소 추출 및 밀크 스티밍 기술의 본질</h3><p>카페 취업을 넘어서 궁극적인 자립 수단인 개인 카페 운영을 위해 바리스타 기술을 마스터하는 과정입니다.</p><p>원두 선정부터 섬세한 에스프레소 추출 기술을 확보하여 실전 경쟁력을 갖춥니다.</p>',
    authorId: 'admin',
    authorName: '정구영',
    createdAt: '2026-06-02'
  }
];

// Local Database initialization
class DB {
  static get(key, defaultValue = null) {
    const data = localStorage.getItem(`crscwp_${key}`);
    return data ? JSON.parse(data) : defaultValue;
  }

  static set(key, value) {
    localStorage.setItem(`crscwp_${key}`, JSON.stringify(value));
  }

  static init() {
    // Seed documents if not exists
    if (!localStorage.getItem('crscwp_documents')) {
      this.set('documents', DEFAULT_DOCUMENTS);
    }
    // Seed users if not exists
    if (!localStorage.getItem('crscwp_users')) {
      this.set('users', [
        { username: 'admin', password: 'password', name: '정구영', bio: 'CRSCWP 창립자' }
      ]);
    }
  }
}

// Application State Management
const state = {
  currentUser: null,
  currentView: 'home', // home, board, editor, view-doc, profile
  activeCategory: 'agi',
  activeDocumentId: null
};

// UI Navigation and View Renderers
function renderView(viewName) {
  state.currentView = viewName;
  
  // Hide all screens
  document.querySelectorAll('.view-screen').forEach(screen => {
    screen.style.display = 'none';
  });

  // Show requested screen
  const targetScreen = document.getElementById(`view-${viewName}`);
  if (targetScreen) {
    targetScreen.style.display = 'block';
  }

  // View-specific loading logic
  if (viewName === 'board') {
    loadBoard();
  } else if (viewName === 'profile') {
    loadProfile();
  } else if (viewName === 'editor') {
    loadEditor();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update authentication UI elements based on state
function updateAuthUI() {
  const user = DB.get('currentUser');
  state.currentUser = user;

  const guestNav = document.getElementById('nav-guest-actions');
  const userNav = document.getElementById('nav-user-actions');
  const userDisplay = document.getElementById('user-display-name');

  if (user) {
    guestNav.style.display = 'none';
    userNav.style.display = 'flex';
    userDisplay.textContent = `${user.name} 님`;
  } else {
    guestNav.style.display = 'flex';
    userNav.style.display = 'none';
  }
}

// Board Loading & Filtering
function loadBoard() {
  const categoryTitle = document.getElementById('selected-category-title');
  const categoryDesc = document.getElementById('selected-category-desc');
  const docListContainer = document.getElementById('board-doc-list');
  const catKey = state.activeCategory;

  // Set header texts
  categoryTitle.textContent = PILLAR_KEYS[catKey];
  
  const descMap = {
    agi: '사람의 활동 및 외관을 모사하고 기계와 사람이 융합하는 인공지능 연구 분야입니다.',
    actf: '로보틱스를 기반으로 하는 차세대 안드로이드 사이보그 개발 및 응용 기술을 개척합니다.',
    swimming: '수영장의 물속에서 중력을 극복하고 우주적 무중력 환경을 시뮬레이션하는 피지컬 강화 코너.',
    skydiving: '자유낙하하는 기류를 타고 하늘의 물리 법칙을 직접 탐험하는 감각 발달 동호회 활동.',
    climbing: '자신의 힘을 시험하고 신체 중심 능력을 향상하는 수직 세계에서의 중력 저항 훈련.',
    cafe: '경제 자립의 기틀을 마련하기 위한 제주도 내 카페 인프라 발굴 및 현장 구직 정보.',
    skills: '완벽한 커피 브루잉 및 에스프레소 추출 기술을 스스로 학습하여 카페 마스터로 거듭나는 방안.'
  };
  categoryDesc.textContent = descMap[catKey] || '';

  // Get and filter documents
  const allDocs = DB.get('documents', []);
  const filteredDocs = allDocs.filter(d => d.category === catKey);

  docListContainer.innerHTML = '';
  if (filteredDocs.length === 0) {
    docListContainer.innerHTML = `
      <div class="glass-panel" style="padding: 3rem; text-align: center; color: var(--text-secondary);">
        등록된 문서가 없습니다. 새로운 글을 처음으로 등록해보세요!
      </div>
    `;
    return;
  }

  filteredDocs.forEach(doc => {
    const card = document.createElement('div');
    card.className = 'glass-panel doc-card';
    card.onclick = () => viewDocument(doc.id);
    
    card.innerHTML = `
      <div class="doc-info">
        <h4>${escapeHTML(doc.title)}</h4>
        <div class="doc-meta">
          <span>✍️ ${escapeHTML(doc.authorName)}</span>
          <span>📅 ${doc.createdAt}</span>
        </div>
      </div>
      <button class="btn btn-secondary btn-sm" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">읽기 &rarr;</button>
    `;
    docListContainer.appendChild(card);
  });
}

// Read/View Document logic
function viewDocument(docId) {
  const allDocs = DB.get('documents', []);
  const doc = allDocs.find(d => d.id === docId);
  if (!doc) return;

  state.activeDocumentId = docId;

  document.getElementById('view-doc-title').textContent = doc.title;
  document.getElementById('view-doc-author').textContent = `작성자: ${doc.authorName}`;
  document.getElementById('view-doc-date').textContent = `작성일: ${doc.createdAt}`;
  document.getElementById('view-doc-body').innerHTML = doc.content;

  // Show delete option only if author is current logged user or admin
  const deleteBtn = document.getElementById('btn-delete-doc');
  if (state.currentUser && (state.currentUser.username === doc.authorId || state.currentUser.username === 'admin')) {
    deleteBtn.style.display = 'inline-flex';
  } else {
    deleteBtn.style.display = 'none';
  }

  renderView('view-doc');
}

// Delete current document
function deleteCurrentDocument() {
  if (!confirm('정말로 이 문서를 삭제하시겠습니까?')) return;
  
  let allDocs = DB.get('documents', []);
  allDocs = allDocs.filter(d => d.id !== state.activeDocumentId);
  DB.set('documents', allDocs);

  alert('문서가 삭제되었습니다.');
  renderView('board');
}

// Google Docs editor tool initialization & rich formatting
function executeEditorCommand(command, value = null) {
  document.execCommand(command, false, value);
}

// Load Editor values
function loadEditor() {
  if (!state.currentUser) {
    alert('문서를 작성하려면 로그인이 필요합니다.');
    showModal('login');
    renderView('home');
    return;
  }
  document.getElementById('editor-title').value = '';
  document.getElementById('wysiwyg-editor').innerHTML = '여기에 문서 내용을 입력하세요...';
  
  // Set Category select options
  const select = document.getElementById('editor-category-select');
  select.innerHTML = '';
  Object.keys(PILLAR_KEYS).forEach(key => {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = PILLAR_KEYS[key];
    if (key === state.activeCategory) opt.selected = true;
    select.appendChild(opt);
  });
}

// Save document
function saveDocument() {
  const title = document.getElementById('editor-title').value.trim();
  const content = document.getElementById('wysiwyg-editor').innerHTML;
  const category = document.getElementById('editor-category-select').value;

  if (!title) {
    alert('제목을 입력해주세요.');
    return;
  }

  if (!state.currentUser) {
    alert('로그인 상태가 만료되었습니다. 다시 로그인 해주세요.');
    return;
  }

  const allDocs = DB.get('documents', []);
  const newDoc = {
    id: 'doc-' + Date.now(),
    category: category,
    title: title,
    content: content,
    authorId: state.currentUser.username,
    authorName: state.currentUser.name,
    createdAt: new Date().toISOString().split('T')[0]
  };

  allDocs.unshift(newDoc);
  DB.set('documents', allDocs);

  alert('성공적으로 문서가 등록되었습니다!');
  state.activeCategory = category;
  renderView('board');
}

// Profile page loader & editor
function loadProfile() {
  const user = state.currentUser;
  if (!user) {
    renderView('home');
    return;
  }

  document.getElementById('prof-username').value = user.username;
  document.getElementById('prof-name').value = user.name;
  document.getElementById('prof-bio').value = user.bio || '';
}

function saveProfile() {
  const name = document.getElementById('prof-name').value.trim();
  const bio = document.getElementById('prof-bio').value.trim();
  const password = document.getElementById('prof-password').value;

  if (!name) {
    alert('이름을 입력해주세요.');
    return;
  }

  const users = DB.get('users', []);
  const userIdx = users.findIndex(u => u.username === state.currentUser.username);
  
  if (userIdx !== -1) {
    users[userIdx].name = name;
    users[userIdx].bio = bio;
    if (password) {
      users[userIdx].password = password;
    }
    
    DB.set('users', users);
    DB.set('currentUser', users[userIdx]);
    state.currentUser = users[userIdx];
    
    alert('프로필이 성공적으로 수정되었습니다.');
    updateAuthUI();
    renderView('home');
  }
}

// Utility functions
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// Modal handling
function showModal(modalType) {
  document.querySelectorAll('.modal-overlay').forEach(el => el.classList.remove('active'));
  const modal = document.getElementById(`modal-${modalType}`);
  if (modal) {
    modal.classList.add('active');
  }
}

function hideModal(modalType) {
  const modal = document.getElementById(`modal-${modalType}`);
  if (modal) {
    modal.classList.remove('active');
  }
}

// Auth Actions (Login / Register)
function handleSignup(event) {
  event.preventDefault();
  const username = document.getElementById('reg-id').value.trim();
  const password = document.getElementById('reg-password').value;
  const name = document.getElementById('reg-name').value.trim();
  
  if (!username || !password || !name) {
    alert('모든 값을 입력해주세요.');
    return;
  }

  const users = DB.get('users', []);
  if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
    alert('이미 존재하는 아이디입니다. 다른 아이디를 사용해주세요.');
    return;
  }

  const newUser = { username, password, name, bio: 'CRSCWP 신규 회원' };
  users.push(newUser);
  DB.set('users', users);

  alert('회원가입이 완료되었습니다! 로그인 해주세요.');
  hideModal('signup');
  showModal('login');
}

function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('login-id').value.trim();
  const password = document.getElementById('login-password').value;

  const users = DB.get('users', []);
  const foundUser = users.find(u => u.username === username && u.password === password);

  if (!foundUser) {
    alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    return;
  }

  DB.set('currentUser', foundUser);
  alert(`반갑습니다, ${foundUser.name}님!`);
  hideModal('login');
  updateAuthUI();
  renderView('home');
}

function handleLogout() {
  localStorage.removeItem('crscwp_currentUser');
  state.currentUser = null;
  updateAuthUI();
  alert('로그아웃 되었습니다.');
  renderView('home');
}

// Theme Toggle Logic
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-theme');
  localStorage.setItem('crscwp_theme', isDark ? 'dark' : 'light');
  document.getElementById('theme-toggle-btn').textContent = isDark ? '☀️' : '🌙';
}

function initTheme() {
  const savedTheme = localStorage.getItem('crscwp_theme') || 'light';
  const isDark = savedTheme === 'dark';
  document.body.classList.toggle('dark-theme', isDark);
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (toggleBtn) {
    toggleBtn.textContent = isDark ? '☀️' : '🌙';
  }
}

// App Initialization
window.addEventListener('DOMContentLoaded', () => {
  DB.init();
  updateAuthUI();
  initTheme();

  // Bind Navbar categories
  document.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const category = e.target.getAttribute('data-category');
      
      // Update active styling
      document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');

      state.activeCategory = category;
      renderView('board');
    });
  });

  // Modal event listners (close on overlay click)
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });
});
