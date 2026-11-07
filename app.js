const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
function updateThemeControl() {
  const light = root.dataset.theme === 'light';
  themeButton?.setAttribute('aria-label', `Switch to ${light ? 'dark' : 'light'} mode`);
  const label = themeButton?.querySelector('.theme-label');
  if (label) label.textContent = light ? 'Dark mode' : 'Light mode';
  document.querySelector('meta[name=theme-color]').content = light ? '#f7f6f0' : '#11130f';
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
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  closeMenu();
  const href = link.getAttribute('href');
  if (href?.startsWith('#')) document.querySelector(href)?.focus({ preventScroll: true });
}));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu?.hidden) closeMenu({ restore: true }); });
document.addEventListener('click', e => { if (!e.target.closest('.site-header') && !menu?.hidden) closeMenu(); });
const wideScreen = matchMedia('(min-width: 768px)');
wideScreen.addEventListener('change', e => { if (e.matches) closeMenu(); });

const motion = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !motion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => { el.classList.add('will-reveal'); observer.observe(el); });
}

const sectionLinks = [...document.querySelectorAll('.case-sidebar a')];
if (sectionLinks.length && 'IntersectionObserver' in window) {
  function markSection(id) {
    sectionLinks.forEach(link => {
      if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  markSection(sectionLinks[0].hash.slice(1));
  const sectionObserver = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible[0]) markSection(visible[0].target.id);
  }, { rootMargin: '-12% 0px -60% 0px', threshold: 0 });
  sectionLinks.forEach(link => {
    const section = document.querySelector(link.hash);
    if (section) sectionObserver.observe(section);
    link.addEventListener('click', () => markSection(link.hash.slice(1)));
  });
}

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

const dialog = document.querySelector('.image-dialog');
let lastImageButton;
let viewerRequest = 0;
function loadViewer(button, retry = false) {
  if (!dialog) return;
  const request = ++viewerRequest;
  const image = document.createElement('img');
  dialog.querySelector('.dialog-image-wrap').replaceChildren(image);
  const thumbnail = button.querySelector('img');
  const status = dialog.querySelector('.viewer-status');
  const recovery = dialog.querySelector('.viewer-recovery');
  lastImageButton = button;
  dialog.dataset.state = 'loading';
  image.hidden = true;
  image.alt = thumbnail.alt;
  image.width = thumbnail.naturalWidth || Number(thumbnail.getAttribute('width'));
  image.height = thumbnail.naturalHeight || Number(thumbnail.getAttribute('height'));
  recovery.hidden = true;
  status.textContent = 'Loading image…';
  status.hidden = false;
  dialog.querySelector('.image-dialog-caption').textContent = button.dataset.caption;
  dialog.querySelector('.viewer-original').href = button.dataset.image;
  image.onload = () => {
    if (request !== viewerRequest) return;
    dialog.dataset.state = 'ready';
    image.hidden = false;
    status.hidden = true;
  };
  image.onerror = () => {
    if (request !== viewerRequest) return;
    dialog.dataset.state = 'error';
    status.textContent = "This image couldn't load. Try again or open the image file.";
    recovery.hidden = false;
  };
  if (!dialog.open) dialog.showModal();
  const imageUrl = new URL(button.dataset.image, location.href);
  if (retry) imageUrl.searchParams.set('retry', Date.now());
  image.src = imageUrl.href;
}
document.querySelectorAll('.image-zoom').forEach(button => button.addEventListener('click', () => loadViewer(button)));
dialog?.querySelector('.viewer-retry').addEventListener('click', () => { if (lastImageButton) loadViewer(lastImageButton, true); });
dialog?.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
dialog?.addEventListener('close', () => {
  viewerRequest++;
  const image = dialog.querySelector('img');
  if (image) { image.onload = null; image.onerror = null; }
  lastImageButton?.focus();
});
