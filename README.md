# Proyecto_FullStack_Final

&#x20; &#x20;

Este proyecto es una **aplicación web FullStack** para gestionar recetas familiares. Permite a los usuarios registrarse, iniciar sesión, buscar recetas, ver detalles y añadir recetas a favoritos.

---

## 🛠  Tecnologías

- **Frontend:** React, React Router, Sass (SCSS), Vite
- **Backend:** Node.js, Express
- **Base de datos:** PostgreSQL
- **Autenticación:** JWT con cookies httpOnly
- **Otros:** bcrypt, react-loader-spinner, fetch API

---

## 📁 Estructura del Proyecto

```
src/
├─ assets/           # Fotos por defecto de comidas por categoria (En caso de que la imagen o el url no funcionen bien)
├─ components/       # Componentes reutilizables (Header, Footer, Nav, RecipeCard, etc.)
├─ services/         # Servicios para llamadas al backend (users, recipes, favs)          
├─ styles/           # SCSS, organizado en components, utils, views
├─ App.jsx
└─ main.jsx
```

- `styles/utils/` contiene variables y mixins para colores, tipografía y espaciados.
- `styles/components/` contiene estilos SCSS de cada componente.
- `styles/views/` contiene estilos globales por vista y `styles.scss` principal.

---

## ⚙️ Instalación y uso

1. Clona el repositorio:

```bash
git clone https://github.com/Migueljimnz08/Proyecto_FullStack_Final.git
cd Proyecto_FullStack_Final
```

2. Instala dependencias:

```bash
npm install
```

3. Configura las variables de entorno en un archivo `.env`:

```
PORT=3000
DB_USER= 
DB_HOST= La url de tu base de datos
DB_NAME= El nombre de tu base de datos
DB_PASS= La contraseña de tu puerto
DB_PORT= Tu puerto
SECRET_KEY=tu_clave_secreta
```

4. Inicia el backend y el frontend (Vite):

```bash
npm run deploy
```

---

## 🖥️ Uso

- **Registro y Login:** Crear un usuario y acceder a su cuenta.
- **Buscador:** Buscar recetas por nombre o categoría.
- **Lista de recetas:** Visualizar recetas en tarjetas con imagen, nombre, categoría y descripción.
- **Detalles de receta:** Ver receta completa, ingredientes y añadir/eliminar de favoritos.
- **Favoritos:** Guardar recetas favoritas.

### Vista Home

![Vista Home](./assets/Vista%20home.png)

### Vista Detalles de Receta

![Vista Detalles de Receta](./assets/Vista%20detallada%20de%20receta.png)

### Vista Registro

![Vista Registro](./assets/Vista%20de%20registro.png)

### Vista Login

![Vista Login](./assets/Vista%20de%20login.png)

---

## 🎨 Diseño

- **Colores principales:** Azul y verde 
- **Tipografía:** Arial, sans-serif
- **SASS:** Variables y mixins para consistencia de estilos.
- **Responsive:** Diseñado para escritorio y tabletas, con flexbox y grid.

---

## 🧩 Funcionalidades futuras

- Filtrado avanzado por ingredientes.
- Comentarios y valoraciones de recetas.
- Gestión de perfil de usuario.
- Mejoras de responsive design para móviles.
- Posibilidad de subir recetas por los usuarios.
- Vista de todas las recetas favoritas de un usuario

---

## ⚡ Contribución

Si quieres contribuir:

1. Haz un fork del repositorio.
2. Crea tu branch: `git checkout -b feature/nueva-funcionalidad`
3. Realiza cambios y commit: `git commit -m 'Agrega nueva funcionalidad'`
4. Push a tu branch: `git push origin feature/nueva-funcionalidad`
5. Crea un Pull Request.

---

## 👨‍💻 Autor

**Miguel Ángel Jiménez Morante**

Desarrollador Web Full Stack

[GitHub](https://github.com/Migueljimnz08) 

---

## 📝 Licencia

Este proyecto está libre para uso educativo y personal. Si lo usas, ¡menciona el autor!

