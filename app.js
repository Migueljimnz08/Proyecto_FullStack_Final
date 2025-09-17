const express = require('express');
const cowsay = require('cowsay');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

dotenv.config();

// Middlewares
const morgan = require('./middlewares/morgan');
const setRole = require('./middlewares/roleAccess');

// Middleware para servir archivos estáticos (como CSS)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Todas las rutas tienen acceso a req.user
app.use(setRole);

// 
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

// Mas protección para la web
app.use(helmet());

// Configuración del logger con morgan
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));

// Ficheros estáticos de la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
const usersRoutes = require('./routes/users.routes');
const favsRoutes = require('./routes/favs.routes');
const recipesRoutes = require('./routes/recipes.routes');

// Rutas API 
app.use('/api', usersRoutes);
app.use('/api/favs', favsRoutes);
app.use('/api/recipes', recipesRoutes);

//* Serve static assets in production, must be at this location of this file
if (process.env.NODE_ENV === 'production') {
    //*Set static folder
    app.use(express.static('client/build'));
    
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
  }

app.listen(port, () => {
  console.log(
    cowsay.say({
      text: `Example app listening on port http://localhost:${port}`,
      f: "tux", // Use the tux ASCII art // tux
    })
  );
});