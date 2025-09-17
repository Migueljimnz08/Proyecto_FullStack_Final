# Proyecto_FullStack_Final

&#x20; &#x20;

Este proyecto es una **aplicación web FullStack** para gestionar recetas familiares. Permite a los usuarios registrarse, iniciar sesión, buscar recetas, ver detalles y añadir recetas a favoritos.

---

## 📦 Tecnologías

- **Frontend:** React, React Router, Sass (SCSS), Vite
- **Backend:** Node.js, Express
- **Base de datos:** PostgreSQL
- **Autenticación:** JWT con cookies httpOnly
- **Otros:** bcrypt, react-loader-spinner, fetch API

---

## 📁 Estructura del Proyecto

```
src/
├─ components/       # Componentes reutilizables (Header, Footer, Nav, RecipeCard, etc.)
├─ services/         # Servicios para llamadas al backend (users, recipes, favs)
├─ views/            # Vistas principales (Home, Register, Login, RecipeDetails)
├─ styles/           # SCSS, organizado en components, utils, views
├─ App.jsx
└─ main.jsx
```

- `styles/utils/` contiene variables y mixins para colores, tipografía y espaciados.
- `styles/components/` contiene estilos SCSS de cada componente.
- `styles/views/` contiene estilos globales por vista y `styles.scss` principal.

---

## 🚀 Instalación

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
DATABASE_URL=postgres://usuario:contraseña@localhost:5432/recetas
SECRET_KEY=tu_clave_secreta
```

4. Inicia el backend:

```bash
npm run dev
```

5. Inicia el frontend (Vite):

```bash
npm run dev --prefix client
```

---

## 🖥️ Uso

- **Registro y Login:** Crear un usuario y acceder a su cuenta.
- **Buscador:** Buscar recetas por nombre o categoría.
- **Lista de recetas:** Visualizar recetas en tarjetas con imagen, nombre, categoría y descripción.
- **Detalles de receta:** Ver receta completa, ingredientes y añadir/eliminar de favoritos.
- **Favoritos:** Guardar recetas favoritas.

### Vista Home



### Vista Detalles de Receta



### Vista Registro



### Vista Login



---

## 🎨 Diseño

- **Colores principales:** Azul (`#2196F3`) y verde (`#4CAF50`)
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

---

## ⚡ Contribución

Si quieres contribuir:

1. Haz un fork del repositorio.
2. Crea tu branch: `git checkout -b feature/nueva-funcionalidad`
3. Realiza cambios y commit: `git commit -m 'Agrega nueva funcionalidad'`
4. Push a tu branch: `git push origin feature/nueva-funcionalidad`
5. Crea un Pull Request.

---

## 📄 Licencia

Este proyecto es **propio** y puede usarse como referencia o para fines educativos.

