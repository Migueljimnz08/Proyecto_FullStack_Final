const recetaQueries = require('../queries/receta.queries');
const { executeQuery } = require('../utils/pgHelper');
const regex = require('../utils/regex');

// Crear receta
const createReceta = async (userID, nombre, descripcion, ingredientes, categoria, nombreFamiliar, imagen) => { 
    if(!regex.validateImg(imagen)){
        throw new Error("Valid formats for Images url are .jpg or .png");
    }
    return await executeQuery(recetaQueries.createReceta, [
    userID,
    nombre,
    descripcion,
    ingredientes,
    categoria,
    nombreFamiliar,
    imagen
  ]);
};

// Obtener todas las recetas
const getAllRecetas = async () => {
  return await executeQuery(recetaQueries.getAllRecetas);
};

// Buscar recetas por categoría
const getRecetasByCategoria = async (categoria) => {
  return await executeQuery(recetaQueries.getRecetasByCategoria, [categoria]);
};

// Buscar receta por ID
const getRecetaById = async (recetaID) => {
  return await executeQuery(recetaQueries.getRecetaById, [recetaID]);
};

// Actualizar receta
const updateReceta = async (recetaID, nombre, descripcion, ingredientes, categoria, nombreFamiliar, imagen) => {
  if(!regex.validateImg(imagen)){
        throw new Error("Valid formats for Images url are .jpg or .png");
    }
  return await executeQuery(recetaQueries.updateReceta, [
    nombre,
    descripcion,
    ingredientes,
    categoria,
    nombreFamiliar,
    imagen,
    recetaID
  ]);
};

// Borrar receta
const deleteReceta = async (recetaID) => {
  return await executeQuery(recetaQueries.deleteReceta, [recetaID]);
};

module.exports = {
  createReceta,
  getAllRecetas,
  getRecetasByCategoria,
  getRecetaById,
  updateReceta,
  deleteReceta
};
