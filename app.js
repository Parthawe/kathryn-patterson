const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
function updateThemeControl() {
  const light = root.dataset.theme === 'light';
  themeButton?.setAttribute('aria-label', `Switch to ${light ? 'dark' : 'light'} theme`);
  themeButton?.setAttribute('aria-pressed', String(light));
}
updateThemeControl();
themeButton?.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
  try { localStorage.setItem('kp-theme', root.dataset.theme); } catch {}
  updateThemeControl();
});

const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.mobile-nav');
function closeMenu({ restore = false } = {}) {
  if (!menu || !menuButton) return;
  menu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = 'Menu';
  if (restore) menuButton.focus();
}
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menu.hidden = open;
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.textContent = open ? 'Menu' : 'Close';
});
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu?.hidden) closeMenu({ restore: true }); });
document.addEventListener('click', e => { if (!e.target.closest('.site-header') && !menu?.hidden) closeMenu(); });
const wideScreen = matchMedia('(min-width: 768px)');
wideScreen.addEventListener('change', e => { if (e.matches) closeMenu(); });

const motion = matchMedia('(prefers-reduced-motion: reduce)');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
}, { threshold: 0.08 });
if (!motion.matches) document.querySelectorAll('.reveal').forEach(el => { el.classList.add('will-reveal'); observer.observe(el); });

const art = document.querySelector('.hero-art');
if (art && matchMedia('(pointer:fine)').matches) {
  art.addEventListener('pointermove', e => {
    if (motion.matches) return;
    const rect = art.getBoundingClientRect();
    art.style.setProperty('--rx', `${(e.clientY - rect.top - rect.height / 2) / 90}deg`);
    art.style.setProperty('--ry', `${(e.clientX - rect.left - rect.width / 2) / -90}deg`);
  });
  art.addEventListener('pointerleave', () => { art.style.setProperty('--rx', '0deg'); art.style.setProperty('--ry', '0deg'); });
}

const tabs = [...document.querySelectorAll('.findings [role=tab]')];
function selectTab(tab, focus = false) {
  tabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected)); item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  });
  if (focus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', e => {
    const positions = { ArrowRight: (index + 1) % tabs.length, ArrowLeft: (index + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1 };
    if (e.key in positions) { e.preventDefault(); selectTab(tabs[positions[e.key]], true); }
  });
});

const dialog = document.querySelector('.image-dialog');
let lastImageButton;
document.querySelectorAll('.image-zoom').forEach(button => button.addEventListener('click', () => {
  lastImageButton = button;
  const image = dialog.querySelector('img');
  image.src = button.dataset.image; image.alt = button.querySelector('img').alt;
  dialog.querySelector('.image-dialog-caption').textContent = button.dataset.caption;
  dialog.showModal();
}));
dialog?.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
dialog?.addEventListener('close', () => lastImageButton?.focus());
