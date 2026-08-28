(function buildPhasePage() {
  const phaseId = document.body.dataset.phase;
  const phases = window.COURSE_PHASES || [];
  const phaseIndex = phases.findIndex((item) => item.id === phaseId);
  const phase = phases[phaseIndex];
  const mount = document.getElementById('phaseMount');
  if (!phase || !mount) return;

  const list = (items, className = '') => `<ul class="${className}">${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
  const pageLinks = {
    'inicio-operativo': 'puesta-en-marcha.html',
    actualizaciones: 'actualizaciones.html',
    identidades: 'identidades.html',
    'administracion-base': 'administracion-base.html',
    seguridad: 'seguridad.html',
    servicios: 'servicios.html'
  };

  document.title = `${phase.title} | Windows Server 2022`;
  document.getElementById('phaseEyebrow').textContent = `Fase ${String(phaseIndex + 1).padStart(2, '0')} · Windows Server 2022`;
  document.getElementById('phaseTitle').textContent = phase.title;
  document.getElementById('phaseSummary').textContent = phase.summary;
  document.getElementById('phaseCount').textContent = `${phase.lessons.length} ${phase.lessons.length === 1 ? 'lección' : 'lecciones'}`;

  const nav = document.getElementById('phaseNav');
  nav.innerHTML = phases.map((item, index) => `<a href="${pageLinks[item.id]}" ${item.id === phaseId ? 'aria-current="page"' : ''}><span>${String(index + 1).padStart(2, '0')}</span>${item.title}</a>`).join('');

  mount.innerHTML = phase.lessons.map((item, lessonIndex) => `
    <article class="phase-page-lesson" id="leccion-${item.n}">
      <header><span>Lección ${item.n}</span><h2>${item.title}</h2></header>
      <div class="lesson-intro"><div><span>Concepto</span><p>${item.concept}</p></div><div><span>Cuándo y por qué</span><p>${item.why}</p></div></div>
      <div class="parameter-strip"><strong>Parámetros del laboratorio</strong>${list(item.params)}</div>
      <div class="lesson-columns">
        <div><h3>Procedimiento paso a paso</h3><ol class="procedure-list">${item.steps.map((step, index) => `<li><span>${index + 1}</span><p>${step}</p></li>`).join('')}</ol></div>
        <aside><h3>Comprobación</h3>${list(item.verify, 'verify-list')}<label class="lesson-complete"><input type="checkbox" data-phase-check="${item.n}"><span>Lección completada</span></label></aside>
      </div>
      <figure class="module-visual"><div class="visual-window"><div class="visual-bar"><i></i><i></i><i></i><strong>Referencia visual · Lección ${item.n}</strong></div><div class="visual-content"><span class="visual-icon">WS</span><div><h3>Capturas que debe incluir la evidencia</h3>${list(item.image)}</div></div></div><figcaption><strong>Ubicación de imagen</strong><span>Inserte aquí capturas propias. Oculte contraseñas, IP públicas, dominios y datos personales.</span></figcaption></figure>
      <div class="lesson-note"><strong>Criterio técnico</strong><p>${item.note}</p></div>
    </article>`).join('');

  const previous = phases[phaseIndex - 1];
  const next = phases[phaseIndex + 1];
  const pager = document.getElementById('phasePager');
  pager.innerHTML = `${previous ? `<a href="${pageLinks[previous.id]}"><span>← Fase anterior</span><strong>${previous.title}</strong></a>` : '<span></span>'}${next ? `<a href="${pageLinks[next.id]}"><span>Siguiente fase →</span><strong>${next.title}</strong></a>` : '<a href="../index.html#curso-ampliado"><span>Curso completado</span><strong>Volver al manual</strong></a>'}`;

  const storageKey = `server-2022-phase-${phaseId}`;
  const checks = [...document.querySelectorAll('[data-phase-check]')];
  const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
  const bar = document.getElementById('phaseProgressBar');
  const text = document.getElementById('phaseProgressText');
  checks.forEach((box) => { box.checked = Boolean(saved[box.dataset.phaseCheck]); });
  const update = () => {
    const state = {};
    checks.forEach((box) => { state[box.dataset.phaseCheck] = box.checked; });
    const complete = checks.filter((box) => box.checked).length;
    bar.style.width = `${(complete / checks.length) * 100}%`;
    text.textContent = `${complete} de ${checks.length} completadas`;
    localStorage.setItem(storageKey, JSON.stringify(state));
  };
  checks.forEach((box) => box.addEventListener('change', update));
  update();

  const root = document.documentElement;
  if (localStorage.getItem('manual-theme') === 'dark') root.dataset.theme = 'dark';
  document.getElementById('themeToggle').addEventListener('click', () => {
    const dark = root.dataset.theme !== 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    localStorage.setItem('manual-theme', dark ? 'dark' : 'light');
  });
  document.getElementById('printButton').addEventListener('click', () => window.print());
})();
