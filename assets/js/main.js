// Simple client-side interactions for the demo site
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.pointerEvents = 'auto';
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.pointerEvents = 'none';
  }, 1800);
}

function subscribe() {
  const email = document.querySelector('#email')?.value;
  if (email) {
    showToast('Thanks for subscribing, ' + email + '!');
    document.querySelector('#email').value = '';
  } else {
    showToast('Please enter a valid email.');
  }
}

function addToCart(item) {
  showToast(item + ' added to cart');
}

// small accessibility helper for keyboard users
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const toast = document.getElementById('toast');
    if (toast) { toast.style.opacity = '0'; toast.style.pointerEvents = 'none'; }
  }
});

// 3D tilt setup for cards
function enableTilt() {
  const wrappers = document.querySelectorAll('.tilt-enabled');
  wrappers.forEach(w => {
    w.addEventListener('mousemove', (ev) => {
      const r = w.getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width;
      const py = (ev.clientY - r.top) / r.height;
      const tiltX = (0.5 - py) * 14; // degrees
      const tiltY = (px - 0.5) * 14; // degrees
      const card = w.querySelector('.card');
      if (card) { card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`; }
    });
    w.addEventListener('mouseleave', () => {
      const card = w.querySelector('.card');
      if (card) { card.style.transform = ''; }
    });
  });
}
window.addEventListener('load', enableTilt);

// Simple hash-based router for a static site
function hideAllSections() {
  const sections = document.querySelectorAll('.section');
  sections.forEach((sec) => sec.classList.add('hidden'));
}

function showSection(id) {
  hideAllSections();
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
}

function routeFromHash() {
  const hash = window.location.hash || '#home';
  switch (hash) {
    case '#shop':
      showSection('shop-section');
      // ensure main content area is visible and header reflects
      break;
    case '#product-silk-slip-dress':
      showSection('product-silk-slip-dress');
      break;
    case '#product-rib-knit-sweater':
      showSection('product-rib-knit-sweater');
      break;
    case '#product-flowy-midi-skirt':
      showSection('product-flowy-midi-skirt');
      break;
    case '#home':
    default:
      showSection('home-section');
      // Ensure newsletter is visible on home
      const news = document.getElementById('section-newsletter');
      if (news) news.classList.remove('hidden');
      break;
  }
}

window.addEventListener('hashchange', routeFromHash);
window.addEventListener('load', routeFromHash);
