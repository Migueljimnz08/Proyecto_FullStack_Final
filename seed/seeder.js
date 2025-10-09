require('dotenv').config();
const bcrypt = require('bcryptjs');

// Modelos
const userModel = require('../models/users.model');
const recipeModel = require('../models/recipes.model');
const favModel = require('../models/favs.model');

// Mock data 
const users = [
  { username: 'userPrueba', email: 'userPrueba@gmail.com', password: 'Prueba-123' },
  { username: 'Pepe', email: 'pepe@email.com', password: 'PepeKey-1' },
  { username: 'Maria', email: 'maria@email.com', password: 'MariaKey-1' },
  { username: 'adminPrueba', email: 'adminPrueba@gmail.com', password: 'Admin-321' },
];

const recipes = [
  {
    userID: 1,
    name: 'Paella',
    description: 'Arroz valenciano tradicional',
    ingredients: 'Arroz, pollo, conejo, verduras',
    category: 'Arroces',
    familyName: 'Paella de la yaya',
    image: 'uploads/paella.jpg',
  },
  {
    userID: 2,
    name: 'Tarta de queso',
    description: 'Postre casero con base de galleta',
    ingredients: 'Queso, galleta, nata, azúcar',
    category: 'Postres',
    familyName: 'Cheesecake de Pepe',
    image: 'uploads/tarta.jpg',
  },
   {
    userID: 2,
    name: 'Pavo a la naranja',
    description: 'Pavo tierno con salsa a la naranja',
    ingredients: 'Pavo, cebolla, romero, pimienta negra, aceite',
    category: 'Carnes',
    familyName: 'Pavo de Petri',
    image: 'uploads/pavo.jpg',
  },
  {
    userID: 2,
    name: 'Arroz Negro',
    description: 'Arroz meloso con sepia y tinta de calamar',
    ingredients: 'Arroz, sepia, tinta de calamar, caldo de pescado',
    category: 'Arroces',
    familyName: 'Arroz negro del abuelo',
    image: 'uploads/arroz_negro.jpg',
  },
  {
    userID: 3,
    name: 'Risotto de Setas',
    description: 'Cremoso risotto con setas variadas',
    ingredients: 'Arroz arborio, setas, parmesano, caldo de verduras',
    category: 'Arroces',
    familyName: 'Risotto casero',
    image: 'uploads/risotto.jpg',
  },
  {
    userID: 1,
    name: 'Pollo al Ajillo',
    description: 'Clásico pollo frito con ajo y vino blanco',
    ingredients: 'Pollo, ajo, vino blanco, aceite de oliva',
    category: 'Carnes',
    familyName: 'Pollo de la abuela',
    image: 'uploads/pollo_ajillo.jpg',
  },
  {
    userID: 2,
    name: 'Carrilleras al Vino Tinto',
    description: 'Carrilleras guisadas a fuego lento en vino tinto',
    ingredients: 'Carrilleras de cerdo, vino tinto, cebolla, zanahoria',
    category: 'Carnes',
    familyName: 'Carrilleras de mamá',
    image: 'uploads/carrilleras.jpg',
  },
  {
    userID: 3,
    name: 'Cordero Asado',
    description: 'Cordero lechal asado al horno con patatas',
    ingredients: 'Cordero lechal, ajo, romero, patatas',
    category: 'Carnes',
    familyName: 'Cordero al horno',
    image: 'uploads/cordero_asado.jpg',
  },
  {
    userID: 1,
    name: 'Lubina al Horno',
    description: 'Lubina fresca al horno con patatas y cebolla',
    ingredients: 'Lubina, patatas, cebolla, limón',
    category: 'Pescados',
    familyName: 'Lubina familiar',
    image: 'uploads/lubina.jpg',
  },
  {
    userID: 2,
    name: 'Bacalao a la Vizcaína',
    description: 'Bacalao con salsa de pimientos choriceros',
    ingredients: 'Bacalao, pimientos choriceros, cebolla, tomate',
    category: 'Pescados',
    familyName: 'Bacalao de la amama',
    image: 'uploads/bacalao.jpg',
  },
  {
    userID: 3,
    name: 'Calamares en su Tinta',
    description: 'Calamares guisados en su propia tinta',
    ingredients: 'Calamares, cebolla, ajo, tinta de calamar',
    category: 'Pescados',
    familyName: 'Calamares caseros',
    image: 'uploads/calamares.jpg',
  },
  {
    userID: 1,
    name: 'Lentejas Estofadas',
    description: 'Lentejas tradicionales con verduras y chorizo',
    ingredients: 'Lentejas, zanahoria, chorizo, patata',
    category: 'Cuchara',
    familyName: 'Lentejas de la abuela',
    image: 'uploads/lentejas.jpg',
  },
  {
    userID: 2,
    name: 'Cocido Madrileño',
    description: 'Cocido completo con garbanzos, carne y verduras',
    ingredients: 'Garbanzos, morcillo, chorizo, repollo, patata',
    category: 'Cuchara',
    familyName: 'Cocido de la abuela',
    image: 'uploads/cocido.jpg',
  },
  {
    userID: 3,
    name: 'Sopa de Marisco',
    description: 'Sopa caliente con mariscos variados y fideos',
    ingredients: 'Gambas, mejillones, calamares, fideos',
    category: 'Cuchara',
    familyName: 'Sopa especial',
    image: 'uploads/sopa_marisco.jpg',
  },
   {
    userID: 2,
    name: 'Arroz con Leche',
    description: 'Postre tradicional asturiano con canela',
    ingredients: 'Arroz, leche, azúcar, canela',
    category: 'Postres',
    familyName: 'Arroz con leche casero',
    image: 'uploads/arroz_leche.jpg',
  },
  {
    userID: 3,
    name: 'Flan de Huevo',
    description: 'Flan clásico al baño maría',
    ingredients: 'Huevos, leche, azúcar, caramelo',
    category: 'Postres',
    familyName: 'Flan de la abuela',
    image: 'uploads/flan.jpg',
  }
];

const seed = async () => {
  try {
    console.log('Starting seeder...');

    // USERS
    for (const user of users) {
      await userModel.signUpUser(user.username, user.email, user.password);
    }
    console.log('Users injected');

    // RECETAS
    for (const recipe of recipes) {
      await recipeModel.createRecipe(
        recipe.userID,
        recipe.name,
        recipe.description,
        recipe.ingredients,
        recipe.category,
        recipe.familyName,
        recipe.image
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

seed();

