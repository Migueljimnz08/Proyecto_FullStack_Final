require('dotenv').config();
const bcrypt = require('bcryptjs');

// Modelos
const userModel = require('./models/user.model');
const recetaModel = require('./models/receta.model');
const favModel = require('./models/fav.model');

// Mock data 
const users = [
  { username: 'AdminPrueba', email: 'admin@email.com', password: 'Admin123$' },
  { username: 'Pepe', email: 'pepe@email.com', password: 'PepeKey-1' },
  { username: 'Maria', email: 'maria@email.com', password: 'MariaKey-1' },
];

const recetas = [
  {
    userID: 1,
    nombre: 'Paella',
    descripcion: 'Arroz valenciano tradicional',
    ingredientes: 'Arroz, pollo, conejo, verduras',
    categoria: 'Arroces',
    nombreFamiliar: 'Paella de la yaya',
    imagen: 'uploads/paella.jpg',
  },
  {
    userID: 2,
    nombre: 'Tarta de queso',
    descripcion: 'Postre casero con base de galleta',
    ingredientes: 'Queso, galleta, nata, azúcar',
    categoria: 'Postres',
    nombreFamiliar: 'Cheesecake de Pepe',
    imagen: 'uploads/tarta.jpg',
  },
];

const seed = async () => {
  try {
    console.log('Starting seeder...');

    // USERS
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await userModel.signUpUser(user.username, user.email, hashedPassword);
    }
    console.log('Users injected');

    // RECETAS
    for (const receta of recetas) {
      await recetaModel.createReceta(
        receta.userID,
        receta.nombre,
        receta.descripcion,
        receta.ingredientes,
        receta.categoria,
        receta.nombreFamiliar,
        receta.imagen
      );
    }
    console.log('Recipes injected');

    // FAVORITOS 
    await favModel.addFav(2, 2); // Pepe guarda la tarta
    await favModel.addFav(3, 1); // Maria guarda la paella
    console.log('Favs injected');

    console.log('All data injected');
    process.exit(0);
  } catch (error) {
    console.error('Error executing seeder:', error);
    process.exit(1);
  }
};
