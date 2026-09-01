(function renderLessonCatalog(){
  const mount=document.getElementById('lessonCatalog');
  if(!mount) return;
  const lessons=window.LESSON_MAP;
  const saved=JSON.parse(localStorage.getItem('windows-server-2022-lessons-v2')||'{}');
  const phases=[...new Set(lessons.map((lesson)=>lesson.phase))];
  mount.innerHTML=phases.map((phase)=>{
    const items=lessons.filter((lesson)=>lesson.phase===phase);
    return `<section class="catalog-phase ${items.some((lesson)=>lesson.featured)?'catalog-phase-featured':''}"><header><span>${String(lessons.indexOf(items[0])+1).padStart(2,'0')}–${String(lessons.indexOf(items.at(-1))+1).padStart(2,'0')}</span><h3>${phase}</h3></header><div class="lesson-card-grid">${items.map((lesson)=>`<a class="lesson-card ${lesson.featured?'lesson-card-featured':''} ${saved[lesson.id]?'completed':''}" href="${window.lessonHref(lesson)}"><span class="lesson-card-number">${saved[lesson.id]?'✓':String(lesson.id).padStart(2,'0')}</span><div><small>${lesson.featured?'Módulo especial':'Lección '+lesson.id}</small><strong>${lesson.title}</strong><p>${lesson.summary}</p><b>${saved[lesson.id]?'Completada · Revisar →':'Comenzar lección →'}</b></div></a>`).join('')}</div></section>`;
  }).join('');
  const complete=lessons.filter((lesson)=>saved[lesson.id]).length;
  document.getElementById('catalogCount').textContent=`${complete} de ${lessons.length} completadas`;
})();
