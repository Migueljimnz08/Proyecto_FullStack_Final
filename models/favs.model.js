const favQueries = require('../queries/fav.queries');
const { executeQuery } = require('../utils/pgHelper');

// Añadir receta a favs
const addFav = async (userID, recipeId) => {
  return await executeQuery(favQueries.addFavorite, [userID, recipeId]);
};

// Obtener favs de un usuario
const getFavsByUser = async (userID) => {
  return await executeQuery(favQueries.getFavsByUser, [userID]);
};

// Eliminar receta de favs
const deleteFav = async (userID, recipeId) => {
  return await executeQuery(favQueries.deleteFavorite, [userID, recipeId]);
};

module.exports = {
  addFav,
  getFavsByUser,
  deleteFav
};