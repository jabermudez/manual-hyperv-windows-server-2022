# Manual web: Hyper-V y Windows Server 2022

Sitio web estático y adaptable con una ruta unificada de 28 lecciones sobre Hyper-V y administración de Windows Server 2022.

## Vista local

Abra `index.html` con su navegador. Para una vista servida localmente también puede ejecutar, dentro de esta carpeta:

```powershell
python -m http.server 8000
```

Luego visite `http://localhost:8000`.

## Publicar en GitHub Pages

1. Cree un repositorio nuevo en GitHub.
2. Suba el contenido de esta carpeta a la raíz del repositorio.
3. En GitHub vaya a **Settings → Pages**.
4. En **Build and deployment**, seleccione **Deploy from a branch**.
5. Elija la rama `main`, la carpeta `/(root)` y pulse **Save**.
6. Espere a que GitHub muestre la dirección pública del sitio.

Todas las rutas del proyecto son relativas y el archivo `.nojekyll` está incluido, por lo que el sitio funciona en una URL de proyecto como `https://usuario.github.io/repositorio/`.

## Estructura

- `index.html`: portada, catálogo ordenado y contenido fuente del manual.
- `lesson-map.js`: orden, títulos, fases y rutas de las 28 lecciones.
- `lesson-catalog.js`: genera las tarjetas de la página principal.
- `lesson-page.js`: genera el contenido y la navegación secuencial de cada lección.
- `course-data.js`: contenido técnico de las lecciones de administración.
- `lecciones/`: una página independiente por lección.
- `styles.css`: diseño adaptable, temas claro/oscuro e impresión.
- `script.js`: navegación, tema, comandos copiables y checklist del contenido base.
- `assets/`: imagen principal e icono del sitio.
