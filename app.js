const express = require('express');
const cowsay = require('cowsay');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

// Middlewares
const morgan = require('./middlewares/morgan');
const setRole = require('./middlewares/roleAccess');

// Middleware para servir archivos estáticos (como CSS)
// app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Todas las rutas tienen acceso a req.user
app.use(setRole);

// Configuración del logger con morgan
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));

// Ficheros estáticos de la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(helmet());

app.listen(port, () => {
  console.log(
    cowsay.say({
      text: `Example app listening on port http://localhost:${port}`,
      f: "tux", // Use the tux ASCII art // tux
    })
  );
});