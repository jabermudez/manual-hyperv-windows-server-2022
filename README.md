# Manual web: Hyper-V y Windows Server 2022

Sitio web estático, adaptable y sin dependencias externas. Puede abrirse directamente en un navegador o publicarse en GitHub Pages.

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

- `index.html`: contenido completo del manual.
- `styles.css`: diseño adaptable, temas claro/oscuro e impresión.
- `script.js`: navegación, progreso, comandos copiables y checklist.
- `assets/`: imagen principal e icono del sitio.

