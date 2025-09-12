const favQueries = require('../queries/fav.queries');
const { executeQuery } = require('../utils/pgHelper');

// Añadir receta a favs
const addFav = async (userID, recetaID) => {
  return await executeQuery(favQueries.addFavorite, [userID, recetaID]);
};

// Obtener favs de un usuario
const getFavsByUser = async (userID) => {
  return await executeQuery(favQueries.getFavsByUser, [userID]);
};

// Eliminar receta de favs
const deleteFav = async (userID, recetaID) => {
  return await executeQuery(favQueries.deleteFavorite, [userID, recetaID]);
};

module.exports = {
  addFav,
  getFavsByUser,
  deleteFav
};