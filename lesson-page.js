(async function renderLessonPage(){
  const lessonId=Number(document.body.dataset.lesson);
  const lessons=window.LESSON_MAP||[];
  const index=lessons.findIndex((item)=>item.id===lessonId);
  const lesson=lessons[index];
  if(!lesson) return;
  const href=(item)=>`${item.slug}.html`;
  const byCourseNumber=(number)=>(window.COURSE_PHASES||[]).flatMap((phase)=>phase.lessons).find((item)=>item.n===number);
  const list=(items,className='')=>`<ul class="${className}">${items.map((item)=>`<li>${item}</li>`).join('')}</ul>`;

  document.title=`Lección ${lesson.id}: ${lesson.title} | Windows Server 2022`;
  document.querySelector('meta[name="description"]').setAttribute('content',lesson.summary);
  document.getElementById('lessonPhase').textContent=lesson.phase;
  document.getElementById('lessonTitle').textContent=lesson.title;
  document.getElementById('lessonSummary').textContent=lesson.summary;
  document.getElementById('lessonPosition').textContent=`Lección ${lesson.id} de ${lessons.length}`;
  document.getElementById('lessonPositionBar').style.width=`${(lesson.id/lessons.length)*100}%`;
  document.getElementById('lessonRoute').innerHTML=lessons.map((item)=>`<a href="${href(item)}" ${item.id===lesson.id?'aria-current="page"':''}><span>${String(item.id).padStart(2,'0')}</span>${item.title}</a>`).join('');

  const mount=document.getElementById('lessonContent');
  if(lesson.source){
    const response=await fetch('../index.html');
    if(!response.ok) throw new Error('No fue posible cargar el contenido base.');
    const sourceDocument=new DOMParser().parseFromString(await response.text(),'text/html');
    const sourceSection=sourceDocument.getElementById(lesson.source);
    const clone=sourceSection.cloneNode(true);
    clone.removeAttribute('id');
    mount.replaceChildren(clone);
  }else{
    const item=byCourseNumber(lesson.course);
    mount.innerHTML=`<article class="phase-page-lesson"><div class="lesson-intro"><div><span>Concepto</span><p>${item.concept}</p></div><div><span>Cuándo y por qué</span><p>${item.why}</p></div></div><div class="parameter-strip"><strong>Parámetros del laboratorio</strong>${list(item.params)}</div><div class="lesson-columns"><div><h3>Procedimiento paso a paso</h3><ol class="procedure-list">${item.steps.map((step,stepIndex)=>`<li><span>${stepIndex+1}</span><p>${step}</p></li>`).join('')}</ol></div><aside><h3>Comprobación</h3>${list(item.verify,'verify-list')}</aside></div><figure class="module-visual"><div class="visual-window"><div class="visual-bar"><i></i><i></i><i></i><strong>Referencia visual · Lección ${lesson.id}</strong></div><div class="visual-content"><span class="visual-icon">WS</span><div><h3>Capturas que debe incluir la evidencia</h3>${list(item.image)}</div></div></div><figcaption><strong>Ubicación de imagen</strong><span>Inserte aquí capturas propias. Oculte contraseñas, IP públicas, dominios y datos personales.</span></figcaption></figure><div class="lesson-note"><strong>Criterio técnico</strong><p>${item.note}</p></div></article>`;
  }

  const completion=document.getElementById('lessonComplete');
  const storageKey='windows-server-2022-lessons-v2';
  const saved=JSON.parse(localStorage.getItem(storageKey)||'{}');
  completion.checked=Boolean(saved[lesson.id]);
  completion.addEventListener('change',()=>{saved[lesson.id]=completion.checked;localStorage.setItem(storageKey,JSON.stringify(saved));});

  const previous=lessons[index-1], next=lessons[index+1];
  document.getElementById('lessonPager').innerHTML=`${previous?`<a href="${href(previous)}"><span>← Lección ${previous.id}</span><strong>${previous.title}</strong></a>`:'<a href="../index.html#lecciones"><span>Vista general</span><strong>Volver a todas las lecciones</strong></a>'}${next?`<a href="${href(next)}"><span>Lección ${next.id} →</span><strong>${next.title}</strong></a>`:'<a href="../index.html#lecciones"><span>Recorrido terminado</span><strong>Volver a la portada</strong></a>'}`;

  const root=document.documentElement;
  if(localStorage.getItem('manual-theme')==='dark') root.dataset.theme='dark';
  document.getElementById('themeToggle').addEventListener('click',()=>{const dark=root.dataset.theme!=='dark';root.dataset.theme=dark?'dark':'light';localStorage.setItem('manual-theme',dark?'dark':'light');});
  document.getElementById('printButton').addEventListener('click',()=>window.print());
  document.querySelectorAll('.copy-button').forEach((button)=>button.addEventListener('click',async()=>{const code=button.closest('.code-card').querySelector('code').textContent;await navigator.clipboard.writeText(code);button.textContent='Copiado';setTimeout(()=>button.textContent='Copiar',1400);}));
})().catch(()=>{document.getElementById('lessonContent').innerHTML='<div class="callout danger"><span>!</span><div><strong>No se pudo cargar la lección</strong><p>Actualice la página o vuelva a la portada del curso.</p></div></div>';});
