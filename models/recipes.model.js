const recipeQueries = require('../queries/recipe.queries');
const { executeQuery } = require('../utils/pgHelper');
const regex = require('../utils/regex');

// Crear receta
const createRecipe = async (userID, name, description, ingredients, category, familyName, image) => { 
    if(!regex.validateImg(image)){
        throw new Error("Valid formats for Images url are .jpg or .png");
    }
    return await executeQuery(recipeQueries.createRecipe, [
    userID,
    name,
    description,
    ingredients,
    category,
    familyName,
    image
  ]);
};

// Obtener todas las recetas
const getAllRecipes = async () => {
  return await executeQuery(recipeQueries.getAllRecipes);
};

// Buscar recetas por categoría
const getRecipesByCategory = async (category) => {
  return await executeQuery(recipeQueries.getRecipesByCategory, [category]);
};

// Buscar receta por ID
const getRecipesById = async (recipeID) => {
  return await executeQuery(recipeQueries.getRecipesById, [recipeID]);
};

// Buscar receta por UserID
const getRecipesByUserID = async (userID) => {
  return await executeQuery(recipeQueries.getRecipesByUserID, [userID]);
};

// Buscar receta por name
const getRecipesByName = async (name) => {
  return await executeQuery(recipeQueries.getRecipesByName, [name]);
};

// Buscar receta por name y Categoria
const getRecipesByNameAndCategory = async (name, category) => {
  return await executeQuery(recipeQueries.getRecipesByNameAndCategory, [name, category]);
};

// Actualizar receta
const updateRecipe = async (recipeID, name, description, ingredients, category, familyName, image) => {
  if(!regex.validateImg(image)){
        throw new Error("Valid formats for Images url are .jpg or .png");
    }
  return await executeQuery(recipeQueries.updateRecipe, [
    recipeID,
    name,
    description,
    ingredients,
    category,
    familyName,
    image
  ]);
};

// Borrar receta
const deleteRecipe = async (recipeID) => {
  return await executeQuery(recipeQueries.deleteRecipe, [recipeID]);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipesByCategory,
  getRecipesById,
  getRecipesByUserID,
  getRecipesByName,
  getRecipesByNameAndCategory,
  updateRecipe,
  deleteRecipe
};
