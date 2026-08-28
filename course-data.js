/*
 * Contenido modular. Para añadir contenido, agregue una fase o una lección a COURSE_PHASES.
 * La interfaz, las pestañas y el progreso se generan automáticamente.
 */
window.COURSE_PHASES = [
  {
    id: 'inicio-operativo', label: '01 · Puesta en marcha', title: 'Primer acceso y operación segura',
    summary: 'Acceder con privilegios administrativos, registrar apagados y comprender los controles de la consola virtual.',
    lessons: [
      {
        n: 5, title: 'Acceso del Administrador y controles de Hyper-V',
        concept: 'La cuenta Administrator permite terminar la configuración inicial. VMConnect controla la máquina virtual desde el host y ofrece acciones con efectos distintos.',
        why: 'Úselo en el primer arranque y para tareas que realmente requieran elevación. Para el trabajo diario se crearán cuentas con privilegios mínimos.',
        params: ['Contraseña: mayúscula + minúscula + número + símbolo', 'Sesión mejorada: resolución adecuada al monitor', 'Apagado: Shut Down; emergencia: Turn Off; laboratorio: Save'],
        steps: ['Inicie la VM y asigne una contraseña robusta a Administrator.', 'En Sesión mejorada seleccione la resolución y pulse Conectar.', 'Inicie sesión, cierre el aviso de Windows Admin Center si no se utilizará y espere a Server Manager.', 'Distinga Inicio, Apagar, Guardar, Pausar y Restablecer en VMConnect.', 'Para cerrar el laboratorio, prefiera Guardar; para mantenimiento use Apagar desde Windows.'],
        verify: ['Server Manager abre sin errores', 'La contraseña no contiene datos personales', 'Puede explicar por qué Turn Off puede causar pérdida de datos'],
        image: ['Pantalla de definición de contraseña de Administrator', 'Cuadro de resolución de Sesión mejorada', 'Barra de VMConnect con Start, Turn Off, Shut Down, Save, Pause y Reset'],
        note: 'Turn Off y Reset son equivalentes a cortar energía o reiniciar físicamente: resérvelos para recuperación.'
      },
      {
        n: 6, title: 'Seguimiento de eventos de apagado',
        concept: 'El rastreador de apagado conserva el motivo de reinicios y paradas para auditoría y diagnóstico.',
        why: 'Registre todo mantenimiento planificado y todo incidente no planificado. En servidores 24/7, un apagado sin contexto dificulta investigar interrupciones.',
        params: ['Atajo: Alt + F4 sobre el escritorio', 'Tipo: Planeado o No planeado', 'Comentario: causa, responsable, ventana y ticket'],
        steps: ['Cierre o minimice las aplicaciones y pulse Alt + F4 en el escritorio.', 'Seleccione Reiniciar o Apagar.', 'Marque Planeado para mantenimiento; use No planeado solo ante una incidencia.', 'Elija la categoría más precisa y escriba un comentario significativo.', 'Confirme y, después del arranque, revise el registro Sistema en Visor de eventos.'],
        verify: ['La acción y el motivo coinciden', 'El comentario permite reconstruir el cambio', 'El evento aparece en el registro Sistema'],
        image: ['Cuadro Apagar Windows con acción y tipo', 'Lista de motivos de apagado', 'Visor de eventos filtrado alrededor de la hora del reinicio'],
        note: 'Evite comentarios como “.”. Un registro útil incluye qué se hizo, por qué y bajo qué autorización.'
      }
    ]
  },
  {
    id: 'actualizaciones', label: '02 · Actualizaciones', title: 'Conectividad, mantenimiento y políticas',
    summary: 'Dar acceso temporal a Internet, aplicar ciclos de actualización y definir una ventana controlada.',
    lessons: [
      {
        n: 7, title: 'Primer ciclo de actualizaciones',
        concept: 'Windows Update corrige vulnerabilidades y estabilidad; en el laboratorio la VM cambia del conmutador interno al externo para llegar a Internet.',
        why: 'Actualice antes de instalar roles. En producción, haga el cambio dentro de una ventana y confirme que la ruta de red cumple la política de seguridad.',
        params: ['Adaptador de red: vSwitch externo/WAN', 'Ruta: Configuración > Actualización y seguridad > Windows Update', 'Instalación: Instalar ahora'],
        steps: ['Apague o guarde la VM si su procedimiento de cambios lo exige.', 'En Configuración de la VM > Adaptador de red, seleccione el vSwitch externo y aplique.', 'Inicie la VM y valide IP, puerta de enlace, DNS y navegación HTTPS.', 'Abra Windows Update, busque actualizaciones e instale las disponibles.', 'No reinicie de inmediato si existen usuarios o tareas activas.'],
        verify: ['ipconfig /all muestra la interfaz esperada', 'Resolve-DnsName funciona', 'Windows Update inicia descarga sin error'],
        image: ['Adaptador de red de Hyper-V seleccionando el conmutador externo', 'Windows Update con descargas en progreso', 'Prueba de conectividad previa a actualizar'],
        note: 'Conectar un servidor a Internet amplía su superficie de exposición; aplique firewall y limite el tiempo de conexión cuando sea posible.'
      },
      {
        n: 8, title: 'Administrar reinicios e historial',
        concept: 'Una actualización no termina hasta completar la instalación y, cuando corresponda, el reinicio. El historial y la desinstalación ayudan a diagnosticar regresiones.',
        why: 'Programe el reinicio en horas de baja demanda y comunique la interrupción. Use la reversión solo cuando exista evidencia de que una actualización causó el fallo.',
        params: ['Ejemplo del video: reinicio 00:00', 'Horas activas de ejemplo: 09:00–17:00', 'Reinicio inmediato: desactivado', 'Aviso de reinicio: activado'],
        steps: ['Abra Windows Update y confirme si aparece Reinicio requerido.', 'Use Programar el reinicio, active la opción y elija fecha/hora autorizadas.', 'Revise Opciones avanzadas: otros productos Microsoft, conexión medida y avisos.', 'Defina horas activas según la jornada real; el video utiliza 09:00–17:00.', 'Tras reiniciar, busque actualizaciones otra vez hasta quedar al día.', 'Consulte Historial; si hay una regresión documentada, evalúe Desinstalar actualizaciones o Recuperación.'],
        verify: ['La ventana no coincide con horas activas', 'El responsable fue notificado', 'El historial muestra el KB y su resultado'],
        image: ['Panel Programar el reinicio', 'Opciones avanzadas y horas activas', 'Historial agrupado en calidad, definiciones y otras actualizaciones'],
        note: 'No todas las actualizaciones se pueden desinstalar. Documente el KB, síntoma, copia de seguridad y plan de retorno.'
      },
      {
        n: 9, title: 'Política local de actualizaciones',
        concept: 'La directiva Configurar actualizaciones automáticas fija un comportamiento repetible y reduce cambios manuales.',
        why: 'Úsela en equipos aislados o de laboratorio. En un dominio, gestione la política mediante una GPO vinculada a la OU de servidores y valide primero en un grupo piloto.',
        params: ['Comando: gpedit.msc', 'Ruta: Equipo > Plantillas administrativas > Componentes de Windows > Windows Update > Administrar la experiencia del usuario final', 'Estado: Habilitada', 'Opción 4: descargar automáticamente y programar instalación', 'Ejemplo del video: domingo 07:00'],
        steps: ['Ejecute gpedit.msc como administrador.', 'Navegue hasta Windows Update y abra Configurar actualizaciones automáticas.', 'Seleccione Habilitada y la opción 4.', 'Defina domingo a las 07:00 o adapte el horario a la ventana aprobada.', 'Aplique, acepte y documente la decisión.', 'Ejecute gpupdate /force si necesita aplicar inmediatamente y revise la política efectiva.'],
        verify: ['La directiva figura Habilitada', 'Día y hora coinciden con el plan', 'gpresult /r refleja el ámbito esperado'],
        image: ['Árbol del Editor de directivas en Windows Update', 'Directiva habilitada con opción 4', 'Horario domingo 07:00 y botones Aplicar/Aceptar'],
        note: 'La ruta visible puede variar con las plantillas ADMX. Microsoft documenta la opción 4 y también la opción 7 para Server 2016 o posterior.'
      }
    ]
  },
  {
    id: 'identidades', label: '03 · Identidades', title: 'Usuarios, grupos y mínimo privilegio',
    summary: 'Crear identidades locales, delegar permisos por grupos y comprobar la experiencia de una cuenta estándar.',
    lessons: [
      {
        n: 10, title: 'Usuarios y grupos locales',
        concept: 'Los usuarios representan identidades; los grupos representan funciones. Asignar derechos al grupo simplifica altas, bajas y auditoría.',
        why: 'Use cuentas nominales para personas y grupos para roles. Reserve Administrator para contingencia y no modifique grupos integrados sin una justificación.',
        params: ['Ruta: Administración de equipos > Usuarios y grupos locales', 'Usuario del video: M Power', 'Grupo del video: Prueba 01', 'Segundo usuario: instalador01', 'Cambio de contraseña al siguiente inicio: activado'],
        steps: ['Abra Administración de equipos y seleccione Usuarios.', 'Cree M Power con nombre completo, descripción y contraseña temporal única.', 'Active El usuario debe cambiar la contraseña en el siguiente inicio.', 'En Grupos, revise Administradores y agregue usuarios solo si el rol lo exige.', 'Cree Prueba 01 con descripción “Grupo de instalación de programas”.', 'Agregue M Power; cree instalador01 y asígnelo al grupo personalizado.', 'Compruebe Miembro de y documente el propietario y propósito del grupo.'],
        verify: ['Cada cuenta tiene descripción y responsable', 'La contraseña temporal es robusta y de un solo uso', 'Los miembros del grupo coinciden con la autorización'],
        image: ['Carpetas Usuarios y Grupos en Administración de equipos', 'Formulario Nuevo usuario con cambio obligatorio', 'Propiedades de Prueba 01 mostrando sus miembros'],
        note: 'El nombre de ejemplo se conserva para reproducir la práctica; en producción use cuentas nominales y una convención institucional.'
      },
      {
        n: 11, title: 'Acceso con usuario estándar',
        concept: 'Una cuenta estándar puede trabajar sin administrar el servidor. UAC solicita credenciales elevadas cuando una operación supera sus derechos.',
        why: 'Es la base del principio de mínimo privilegio: reduce el impacto de errores, malware y uso indebido de credenciales administrativas.',
        params: ['VMConnect: Acción > Ctrl+Alt+Supr', 'Primer acceso: contraseña temporal y cambio obligatorio', 'Cambiar de usuario conserva sesión; Cerrar sesión la termina'],
        steps: ['Cierre sesión de Administrator.', 'En VMConnect envíe Ctrl+Alt+Supr y seleccione el usuario estándar.', 'Ingrese la contraseña temporal y establezca una nueva.', 'Espere la creación inicial del perfil.', 'Intente abrir una operación administrativa y observe la solicitud de UAC.', 'Compruebe que el usuario no puede agregarse por sí mismo a Administradores.', 'Practique Bloquear, Cambiar de usuario, Cerrar sesión y Cambiar contraseña.'],
        verify: ['El usuario inicia sesión correctamente', 'UAC impide elevar sin credenciales autorizadas', 'La cuenta permanece fuera de Administradores'],
        image: ['Menú Acción de VMConnect enviando Ctrl+Alt+Supr', 'Pantalla de cambio obligatorio de contraseña', 'Solicitud UAC al intentar una tarea administrativa'],
        note: 'No entregue credenciales administrativas para resolver una tarea habitual; delegue únicamente el derecho requerido.'
      }
    ]
  },
  {
    id: 'administracion-base', label: '04 · Administración base', title: 'Server Manager, identidad, tiempo y RDP',
    summary: 'Preparar la identidad técnica del servidor y habilitar administración remota de forma controlada.',
    lessons: [
      {
        n: 12, title: 'Primer recorrido por Server Manager',
        concept: 'Server Manager centraliza roles, inventario, eventos, servicios, rendimiento y tareas de varios servidores.',
        why: 'Úselo como punto de control después de cada cambio y antes de instalar roles para detectar alertas pendientes.',
        params: ['Panel: roles y estado', 'Servidor local: nombre, firewall, RDP, zona e IP', 'Ver > Zoom: ejemplo 125 %'],
        steps: ['Revise Panel y confirme que no existan alertas críticas.', 'Abra Servidor local y registre nombre, grupo de trabajo, firewall, RDP, zona horaria e IP.', 'Explore Todos los servidores y Servicios de archivos y almacenamiento.', 'En Administrar, ubique Agregar roles, Agregar servidores y Crear grupo.', 'En Herramientas, identifique Visor de eventos, Servicios, Rendimiento y Programador de tareas.', 'Use la bandera de notificaciones y Actualizar después de cambios.'],
        verify: ['El servidor aparece en Todos los servidores', 'Las tarjetas de salud están revisadas', 'Puede abrir al menos una herramienta administrativa'],
        image: ['Panel de Server Manager con tarjetas de salud', 'Servidor local con propiedades principales', 'Menús Administrar, Herramientas, Ver y Ayuda'],
        note: 'Un servicio detenido no implica por sí solo una falla. Confirme su tipo de inicio y dependencias antes de iniciarlo.'
      },
      {
        n: 13, title: 'Cambiar el nombre del servidor',
        concept: 'El nombre identifica al servidor en inventarios, DNS, registros y administración. Debe ser estable, corto y comprensible.',
        why: 'Hágalo antes de unir al dominio o instalar roles. Renombrar más tarde aumenta dependencias y riesgo operativo.',
        params: ['Ejemplo: AD01', 'Descripción: Administrador principal', 'Compatibilidad NetBIOS: máximo 15 caracteres', 'Caracteres recomendados: letras, números y guion'],
        steps: ['Defina una convención: rol + sede/entorno + consecutivo.', 'En Server Manager > Servidor local, pulse el nombre actual.', 'En Propiedades del sistema agregue una descripción y pulse Cambiar.', 'Escriba AD01 para reproducir el laboratorio; no use espacios ni un nombre solo numérico.', 'Aplique, acepte y programe el reinicio.', 'Después del reinicio ejecute hostname y verifique Server Manager.'],
        verify: ['hostname devuelve AD01', 'Server Manager muestra el nuevo nombre', 'Inventario y documentación fueron actualizados'],
        image: ['Propiedades del sistema en Nombre de equipo', 'Cuadro Cambios en el dominio o nombre con AD01', 'Aviso de reinicio necesario'],
        note: 'El video menciona 25 caracteres; el curso usa 15 para compatibilidad NetBIOS, conforme a la guía de nombres de Microsoft.'
      },
      {
        n: 14, title: 'Fecha, hora, zona y región',
        concept: 'La hora correcta sostiene autenticación, certificados, bases de datos y correlación de eventos. La región define cómo las aplicaciones interpretan números y fechas.',
        why: 'Configure antes de promover controladores de dominio o instalar aplicaciones. En un dominio, respete la jerarquía de tiempo de Active Directory.',
        params: ['Colombia: (UTC-05:00) Bogotá, Lima, Quito, Rio Branco', 'Origen de laboratorio: time.windows.com', 'Formatos regionales: según requisito de aplicación'],
        steps: ['En Server Manager > Servidor local, pulse Zona horaria.', 'Seleccione la zona correspondiente a la ubicación física; para Colombia use UTC-05:00 Bogotá.', 'En Hora de Internet revise el origen y use Actualizar ahora si el servidor es independiente y tiene conectividad.', 'Opcionalmente agregue relojes para equipos remotos.', 'Abra Región > Configuración adicional y cambie decimal, moneda, hora o fecha solo con requisito documentado.', 'Use Copiar configuración si debe aplicar el formato a pantalla de inicio y cuentas nuevas.'],
        verify: ['Zona y hora coinciden con una fuente confiable', 'w32tm /query /status devuelve un origen válido', 'La aplicación interpreta correctamente fecha y decimal'],
        image: ['Selector de zona horaria', 'Pestaña Hora de Internet y servidor de tiempo', 'Configuración regional de números, moneda, hora y fecha'],
        note: 'No desactive NTP porque el país no use horario estacional; zona horaria y sincronización son controles distintos.'
      },
      {
        n: 15, title: 'Escritorio remoto seguro',
        concept: 'RDP ofrece una sesión gráfica remota. Es distinto de Administración remota, usada por WMI y PowerShell.',
        why: 'Habilítelo solo cuando la operación lo requiera, limite usuarios y alcance de red, y nunca publique el puerto directamente en Internet.',
        params: ['Cliente: mstsc', 'Destino: nombre DNS o <IP-del-servidor>', 'Puerto predeterminado: TCP/UDP 3389', 'NLA: requerida', 'Grupo: Usuarios de escritorio remoto'],
        steps: ['En el servidor ejecute ipconfig y confirme la dirección de administración.', 'En Server Manager > Servidor local, pulse Escritorio remoto.', 'Seleccione Permitir conexiones remotas y mantenga NLA activada.', 'En Seleccionar usuarios agregue solo las cuentas autorizadas; Administradores ya tienen acceso.', 'Desde el host ejecute mstsc e ingrese el nombre DNS preferentemente.', 'Use AD01\\usuario o DOMINIO\\usuario y valide la identidad/certificado antes de aceptar.', 'Pruebe conexión y después restrinja las reglas de firewall a la subred administrativa.'],
        verify: ['NLA permanece habilitada', 'Solo los usuarios autorizados conectan', 'El firewall no expone 3389 a redes no confiables'],
        image: ['Propiedades de Escritorio remoto con NLA', 'Selector de usuarios autorizados', 'Cliente mstsc y validación de identidad del servidor'],
        note: 'Para acceso externo use VPN, RD Gateway o un host de salto; cambiar el puerto no sustituye los controles de seguridad.'
      }
    ]
  },
  {
    id: 'seguridad', label: '05 · Seguridad', title: 'Defender y Firewall avanzado',
    summary: 'Verificar antimalware y construir reglas de entrada y salida con alcance mínimo.',
    lessons: [
      {
        n: 16, title: 'Microsoft Defender Antivirus',
        concept: 'Defender aporta protección en tiempo real, nube, inteligencia de seguridad y análisis bajo demanda.',
        why: 'Mantenga una protección activa y actualizada. Las exclusiones reducen cobertura y solo deben existir por compatibilidad demostrada.',
        params: ['Protección en tiempo real: activada', 'Protección en la nube: activada', 'Envío automático de muestras: según política', 'Análisis: rápido, completo o personalizado'],
        steps: ['En Server Manager > Servidor local abra el estado de Windows Defender.', 'Revise Protección contra virus y amenazas y confirme protección en tiempo real.', 'Actualice Inteligencia de seguridad.', 'Ejecute un análisis rápido y use completo/personalizado ante una necesidad concreta.', 'Revise Historial de protección, notificaciones y Control de aplicaciones y navegador.', 'Antes de crear una exclusión, registre ruta, propietario, motivo, vigencia y compensación.', 'Si instala otro antivirus, verifique el modo con Get-MpComputerStatus.'],
        verify: ['AntivirusEnabled y RealTimeProtectionEnabled tienen el estado previsto', 'Firmas actualizadas', 'No existen exclusiones huérfanas'],
        image: ['Seguridad de Windows: Protección contra virus y amenazas', 'Opciones de análisis', 'Actualizaciones de inteligencia e historial de protección'],
        note: 'En Windows Server, otro antivirus no siempre coloca Defender automáticamente en modo pasivo; verifique AMRunningMode y siga la guía de Microsoft.'
      },
      {
        n: 17, title: 'Perfiles y consola de Firewall',
        concept: 'Los perfiles Dominio, Privado y Público aplican reglas según la red. Las reglas de entrada controlan tráfico hacia el servidor y las de salida, tráfico originado por él.',
        why: 'Mantenga el firewall activo y abra solo el flujo necesario. Seleccionar todos los perfiles por comodidad amplía el riesgo.',
        params: ['Perfiles: Dominio, Privado, Público', 'Consola avanzada: wf.msc', 'Acciones: permitir, permitir si es segura, bloquear'],
        steps: ['Abra Firewall y protección de red y confirme el perfil activo.', 'Compruebe que el firewall está activado en los tres perfiles.', 'Revise Permitir una aplicación, sin habilitar Público salvo necesidad explícita.', 'Abra Configuración avanzada o ejecute wf.msc.', 'Explore reglas de entrada, salida y seguridad de conexión.', 'Revise nombre, estado, perfil, acción, programa, direcciones, protocolo y puertos antes de cambiar una regla.'],
        verify: ['Los tres perfiles están activados', 'La regla se limita al perfil requerido', 'No se habilitaron aplicaciones obsoletas o innecesarias'],
        image: ['Estado de los perfiles Dominio, Privado y Público', 'Lista Permitir una aplicación', 'Firewall con seguridad avanzada y sus tres tipos de regla'],
        note: 'No desactive el firewall como prueba permanente. Capture el error y cree una regla mínima y reversible.'
      },
      {
        n: 18, title: 'Crear una regla de entrada',
        concept: 'Una regla de entrada autoriza o bloquea tráfico que intenta llegar al servidor. Debe describir protocolo, puerto, perfil y alcance.',
        why: 'Créela cuando una aplicación realmente escuche en el servidor y exista un origen autorizado. Abrir un puerto no inicia el servicio.',
        params: ['Ejemplo del video: TCP local 150', 'Acción: Permitir la conexión', 'Nombre: Sistema de contabilidad', 'Video: todos los perfiles; práctica segura: solo los necesarios'],
        steps: ['En wf.msc > Reglas de entrada seleccione Nueva regla.', 'Elija Puerto, TCP y Puertos locales específicos: 150.', 'Seleccione Permitir la conexión; use Permitir si es segura solo con IPsec correctamente diseñado.', 'Marque únicamente los perfiles donde funcionará la aplicación.', 'Nombre la regla Sistema de contabilidad y describa propietario, ticket y propósito.', 'En Propiedades > Ámbito limite las direcciones remotas autorizadas.', 'Valide que la aplicación escucha y pruebe desde un origen permitido y otro no permitido.'],
        verify: ['Get-NetFirewallRule localiza la regla', 'Get-NetTCPConnection confirma escucha cuando aplica', 'El acceso funciona solo desde el origen autorizado'],
        image: ['Asistente Nueva regla de entrada: tipo Puerto', 'TCP y puerto local 150', 'Resumen de Sistema de contabilidad con perfil y acción'],
        note: 'El puerto 150 es un ejemplo didáctico, no un valor recomendado universal. Use el puerto oficial de la aplicación y limite el ámbito.'
      },
      {
        n: 19, title: 'Crear reglas de salida',
        concept: 'Una regla de salida restringe conexiones iniciadas por el servidor. Puede filtrar por puerto o por ejecutable.',
        why: 'Úsela para contención o para una política explícita de lista permitida. Bloquear web solo por navegador o puerto es incompleto y puede romper actualizaciones y servicios.',
        params: ['Ejemplo 1: TCP remoto 443 y luego 80, acción Bloquear', 'Nombre: BLOQUEO INTERNET', 'Ejemplo 2: programa msedge.exe, acción Bloquear', 'Video: todos los perfiles'],
        steps: ['En Reglas de salida cree una regla de Puerto.', 'Seleccione TCP y Puertos remotos específicos: 443; para reproducir la prueba agregue 80.', 'Seleccione Bloquear la conexión y aplique solo a los perfiles necesarios.', 'Nombre BLOQUEO INTERNET y finalice.', 'Pruebe HTTPS y HTTP, registre el resultado y observe que otros procesos pueden comportarse diferente.', 'Cree una segunda regla de Programa, busque msedge.exe y bloquee para demostrar el filtrado por ejecutable.', 'Deshabilite o elimine las reglas de laboratorio al terminar y valide Windows Update y servicios dependientes.'],
        verify: ['Las propiedades muestran TCP y puertos remotos correctos', 'La prueba confirma el alcance real, no una suposición', 'Servicios críticos siguen operativos tras la prueba'],
        image: ['Asistente de salida con TCP 443,80', 'Regla BLOQUEO INTERNET con icono de bloqueo', 'Regla por programa apuntando a msedge.exe'],
        note: 'La afirmación “bloquea Internet para toda la red” no es correcta: una regla local afecta ese servidor. Para filtrado web empresarial use controles de red, proxy/DNS seguro o políticas de aplicación.'
      }
    ]
  },
  {
    id: 'servicios', label: '06 · Servicios', title: 'Servicios, recuperación y dependencias',
    summary: 'Administrar procesos en segundo plano sin iniciar, detener o reconfigurar componentes a ciegas.',
    lessons: [
      {
        n: 20, title: 'Administración de servicios',
        concept: 'Un servicio ejecuta funciones del sistema o de una aplicación en segundo plano. Su estado, inicio, cuenta y dependencias determinan el comportamiento operativo.',
        why: 'Use la consola para diagnosticar y aplicar cambios aprobados. Que un servicio esté detenido puede ser completamente normal si su inicio es Manual.',
        params: ['Comando: services.msc', 'Inicio: Automático, Automático (inicio retrasado), Manual o Deshabilitado', 'Ejemplo: Application Management / AppMgmt', 'Recuperación de ejemplo: reiniciar servicio tras 3 min; restablecer contador tras 1 día'],
        steps: ['Abra Server Manager > Herramientas > Servicios o ejecute services.msc.', 'Revise Nombre, Descripción, Estado, Tipo de inicio e Iniciar sesión como.', 'Abra Application Management, observe nombre AppMgmt y ruta; úselo solo para la demostración.', 'Practique iniciar, detener y reiniciar; devuélvalo a su tipo predeterminado Manual.', 'En Iniciar sesión como no cambie cuentas integradas sin documentación del proveedor.', 'En Recuperación defina acciones acordes con el servicio; evite reiniciar el servidor automáticamente sin análisis.', 'En Dependencias identifique requisitos; por ejemplo, WinRM depende de componentes como RPC y HTTP.', 'Correlacione el servicio con Administrador de tareas y Visor de eventos.'],
        verify: ['Tipo de inicio coincide con línea base/proveedor', 'Cuenta de servicio tiene mínimo privilegio', 'Dependencias están operativas', 'El cambio y su reversión quedaron documentados'],
        image: ['Consola Servicios con columnas principales', 'Propiedades de AppMgmt: General e Iniciar sesión', 'Pestañas Recuperación y Dependencias'],
        note: 'No inicie todos los servicios detenidos. Investigue el estado esperado, el error y el impacto antes de actuar.'
      }
    ]
  }
];

(function renderCourse() {
  const mount = document.getElementById('courseApp');
  if (!mount) return;
  const phases = window.COURSE_PHASES;
  const renderList = (items, cls = '') => `<ul class="${cls}">${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
  const lesson = (item, phaseIndex, lessonIndex) => `
    <details class="course-lesson" ${lessonIndex === 0 ? 'open' : ''}>
      <summary><span class="lesson-index">V${String(item.n).padStart(2, '0')}</span><span><small>Lección ${item.n}</small><strong>${item.title}</strong></span><b aria-hidden="true">+</b></summary>
      <div class="lesson-body">
        <div class="lesson-intro"><div><span>Concepto</span><p>${item.concept}</p></div><div><span>Cuándo y por qué</span><p>${item.why}</p></div></div>
        <div class="parameter-strip"><strong>Parámetros del laboratorio</strong>${renderList(item.params)}</div>
        <div class="lesson-columns">
          <div><h4>Procedimiento paso a paso</h4><ol class="procedure-list">${item.steps.map((step, i) => `<li><span>${i + 1}</span><p>${step}</p></li>`).join('')}</ol></div>
          <aside><h4>Comprobación</h4>${renderList(item.verify, 'verify-list')}
            <label class="lesson-complete"><input type="checkbox" data-course-check="${phaseIndex}-${lessonIndex}"><span>Lección completada</span></label>
          </aside>
        </div>
        <figure class="module-visual" aria-label="Referencia visual para la lección ${item.n}">
          <div class="visual-window"><div class="visual-bar"><i></i><i></i><i></i><strong>Referencia visual · Lección ${item.n}</strong></div><div class="visual-content"><span class="visual-icon">WS</span><div><h4>Capturas que debe incluir la evidencia</h4>${renderList(item.image)}</div></div></div>
          <figcaption><strong>Ubicación de imagen</strong><span>Inserte aquí capturas propias del procedimiento. Oculte contraseñas, IP públicas, dominios y datos personales.</span></figcaption>
        </figure>
        <div class="lesson-note"><strong>Criterio técnico</strong><p>${item.note}</p></div>
      </div>
    </details>`;
  mount.innerHTML = `
    <div class="phase-tabs" role="tablist" aria-label="Fases del curso">${phases.map((p, i) => `<button role="tab" id="tab-${p.id}" aria-controls="panel-${p.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-phase="${i}">${p.label}</button>`).join('')}</div>
    <div class="course-progress"><div><strong id="courseProgressText">0 de 16 lecciones completadas</strong><span>El progreso se conserva en este navegador.</span></div><div><i id="courseProgressBar"></i></div></div>
    ${phases.map((p, i) => `<section class="phase-panel" id="panel-${p.id}" role="tabpanel" aria-labelledby="tab-${p.id}" ${i ? 'hidden' : ''}><header><span>Fase ${String(i + 1).padStart(2, '0')}</span><h3>${p.title}</h3><p>${p.summary}</p></header>${p.lessons.map((l, j) => lesson(l, i, j)).join('')}<div class="future-slot"><span>+</span><div><strong>Espacio para ampliación futura</strong><p>Añada aquí la siguiente lección de esta fase; la navegación y el progreso se actualizarán desde <code>course-data.js</code>.</p></div></div></section>`).join('')}`;
})();
