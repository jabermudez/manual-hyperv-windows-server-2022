const root = document.documentElement;
const progress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');
const themeToggle = document.getElementById('themeToggle');
const printButton = document.getElementById('printButton');
const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
const toast = document.getElementById('toast');

const savedTheme = localStorage.getItem('manual-theme');
if (savedTheme === 'dark') root.dataset.theme = 'dark';

function updateScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = `${percent}%`;
  backToTop.classList.toggle('visible', window.scrollY > 650);
}

window.addEventListener('scroll', updateScroll, { passive: true });
updateScroll();

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
printButton.addEventListener('click', () => window.print());

themeToggle.addEventListener('click', () => {
  const dark = root.dataset.theme !== 'dark';
  root.dataset.theme = dark ? 'dark' : 'light';
  localStorage.setItem('manual-theme', dark ? 'dark' : 'light');
});

menuButton.addEventListener('click', () => {
  const opening = mobileMenu.hidden;
  mobileMenu.hidden = !opening;
  menuButton.setAttribute('aria-expanded', String(opening));
});

mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 1800);
}

document.querySelectorAll('.copy-button').forEach((button) => {
  button.addEventListener('click', async () => {
    const code = button.closest('.code-card').querySelector('code').textContent;
    try {
      await navigator.clipboard.writeText(code);
      button.textContent = 'Copiado';
      showToast('Comando copiado al portapapeles');
      setTimeout(() => { button.textContent = 'Copiar'; }, 1500);
    } catch {
      showToast('Seleccione el comando y cópielo manualmente');
    }
  });
});

// Curso modular: pestañas accesibles y progreso persistente.
const phaseTabs = [...document.querySelectorAll('[role="tab"][data-phase]')];
const phasePanels = [...document.querySelectorAll('.phase-panel')];

function activatePhase(index, focus = false) {
  phaseTabs.forEach((tab, position) => {
    const active = position === index;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    phasePanels[position].hidden = !active;
  });
  if (focus) phaseTabs[index].focus();
}

phaseTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activatePhase(index));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % phaseTabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + phaseTabs.length) % phaseTabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = phaseTabs.length - 1;
    activatePhase(next, true);
  });
});

const courseChecks = [...document.querySelectorAll('[data-course-check]')];
const courseProgressBar = document.getElementById('courseProgressBar');
const courseProgressText = document.getElementById('courseProgressText');
const courseProgressKey = 'windows-server-2022-course-progress-v1';
if (courseChecks.length) {
  const savedCourseProgress = JSON.parse(localStorage.getItem(courseProgressKey) || '{}');
  courseChecks.forEach((box) => { box.checked = Boolean(savedCourseProgress[box.dataset.courseCheck]); });
  const updateCourseProgress = () => {
    const state = {};
    courseChecks.forEach((box) => { state[box.dataset.courseCheck] = box.checked; });
    const complete = courseChecks.filter((box) => box.checked).length;
    courseProgressBar.style.width = `${(complete / courseChecks.length) * 100}%`;
    courseProgressText.textContent = `${complete} de ${courseChecks.length} lecciones completadas`;
    localStorage.setItem(courseProgressKey, JSON.stringify(state));
  };
  courseChecks.forEach((box) => box.addEventListener('change', updateCourseProgress));
  updateCourseProgress();
}

const imageDialog = document.getElementById('imageDialog');
const dialogStage = document.getElementById('dialogStage');
const dialogCaption = document.getElementById('dialogCaption');
const dialogCounter = document.getElementById('dialogCounter');
const dialogClose = document.getElementById('dialogClose');
const dialogPrevious = document.getElementById('dialogPrevious');
const dialogNext = document.getElementById('dialogNext');
const guideImages = [...document.querySelectorAll('[data-lightbox]')];
let activeImageIndex = 0;

function showGuideImage(index) {
  if (!guideImages.length) return;
  activeImageIndex = (index + guideImages.length) % guideImages.length;
  const source = guideImages[activeImageIndex];
  const screen = source.querySelector('.screen-mock').cloneNode(true);
  const caption = source.querySelector('figcaption span').textContent.trim();
  dialogStage.replaceChildren(screen);
  dialogCaption.textContent = caption;
  dialogCounter.textContent = `Imagen ${activeImageIndex + 1} de ${guideImages.length}`;
  if (!imageDialog.open) imageDialog.showModal();
}

guideImages.forEach((figure, index) => {
  figure.addEventListener('click', () => showGuideImage(index));
  figure.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      showGuideImage(index);
    }
  });
});

dialogClose.addEventListener('click', () => imageDialog.close());
dialogPrevious.addEventListener('click', () => showGuideImage(activeImageIndex - 1));
dialogNext.addEventListener('click', () => showGuideImage(activeImageIndex + 1));

imageDialog.addEventListener('click', (event) => {
  if (event.target === imageDialog) imageDialog.close();
});

imageDialog.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') showGuideImage(activeImageIndex - 1);
  if (event.key === 'ArrowRight') showGuideImage(activeImageIndex + 1);
});

const checklist = document.querySelector('[data-checklist]');
if (checklist) {
  const key = `checklist-${checklist.dataset.checklist}`;
  const boxes = [...checklist.querySelectorAll('input[type="checkbox"]')];
  const bar = document.getElementById('checkProgressBar');
  const label = document.getElementById('checkProgressText');
  const saved = JSON.parse(localStorage.getItem(key) || '[]');

  boxes.forEach((box, index) => { box.checked = Boolean(saved[index]); });

  const updateChecklist = () => {
    const values = boxes.map((box) => box.checked);
    const complete = values.filter(Boolean).length;
    bar.style.width = `${(complete / boxes.length) * 100}%`;
    label.textContent = `${complete} de ${boxes.length} completadas`;
    localStorage.setItem(key, JSON.stringify(values));
  };

  boxes.forEach((box) => box.addEventListener('change', updateChecklist));
  updateChecklist();
}

const tocLinks = [...document.querySelectorAll('.toc a')];
const sections = tocLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      tocLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-18% 0px -70% 0px', threshold: 0 });
  sections.forEach((section) => observer.observe(section));
}
