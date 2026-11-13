const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
function updateThemeControl() {
  const light = root.dataset.theme === 'light';
  themeButton?.setAttribute('aria-label', `Switch to ${light ? 'dark' : 'light'} mode`);
  document.querySelector('meta[name=theme-color]').content = light ? '#f3f0e8' : '#151713';
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

const caseNav = document.querySelector('.case-sidebar');
const chapters = [...(caseNav?.querySelectorAll('a') ?? [])]
  .map(link => ({ link, section: document.querySelector(link.hash) }))
  .filter(chapter => chapter.section);
if (chapters.length) {
  let readingLine = 0;
  let activeLink;
  let frame = 0;

  function updateChapter() {
    frame = 0;
    let current = chapters[0];
    for (const chapter of chapters) {
      if (chapter.section.getBoundingClientRect().top > readingLine) break;
      current = chapter;
    }
    if (activeLink === current.link) return;
    activeLink?.removeAttribute('aria-current');
    activeLink = current.link;
    activeLink.setAttribute('aria-current', 'location');
    if (!wideScreen.matches) {
      const item = activeLink.getBoundingClientRect();
      const rail = caseNav.getBoundingClientRect();
      if (item.right > rail.right) caseNav.scrollLeft += item.right - rail.right + 8;
      else if (item.left < rail.left) caseNav.scrollLeft -= rail.left - item.left + 8;
    }
  }
  function scheduleChapter() {
    if (!frame) frame = requestAnimationFrame(updateChapter);
  }
  function measureChapterLine() {
    readingLine = (parseFloat(getComputedStyle(root).scrollPaddingTop) || 0) +
      (parseFloat(getComputedStyle(chapters[0].section).scrollMarginTop) || 0) + 3;
    scheduleChapter();
  }
  measureChapterLine();
  window.addEventListener('scroll', scheduleChapter, { passive: true });
  window.addEventListener('resize', measureChapterLine);
  window.addEventListener('hashchange', scheduleChapter);
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
  dialog.querySelector('.viewer-original').href = button.href;
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
  const imageUrl = new URL(button.href);
  if (retry) imageUrl.searchParams.set('retry', Date.now());
  image.src = imageUrl.href;
}
if (typeof dialog?.showModal === 'function') {
  document.querySelectorAll('.image-zoom').forEach(link => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      loadViewer(link);
    });
  });
}
dialog?.querySelector('.viewer-retry').addEventListener('click', () => { if (lastImageButton) loadViewer(lastImageButton, true); });
dialog?.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
dialog?.addEventListener('close', () => {
  viewerRequest++;
  const image = dialog.querySelector('img');
  if (image) { image.onload = null; image.onerror = null; }
  lastImageButton?.focus();
});
