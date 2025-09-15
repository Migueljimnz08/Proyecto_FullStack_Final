const recetaModel = require('../models/recetas.model');
const path = require('path');
const { updateReceta } = require('../queries/receta.queries');

// POST http://localhost:3000/api/recipe
const createReceta = async (req, res) => {
  const { nombre, descripcion, ingredientes, categoria, nombreFamiliar } = req.body;
  const userID = req.user.id
    if (!req.file) return res.status(400).json({ msg: 'Missing image file' });
    const imagen = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  try {
    const receta = await recetaModel.createReceta(
      userID,
      nombre,
      descripcion,
      ingredientes,
      categoria,
      nombreFamiliar,
      imagen
    );
    res.status(201).json({ msg: 'New recipe added', data: receta });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating recipe' });
  }
};

// GET http://localhost:3000/api/recipe?category=quesos&name=tarta
const getRecetas = async (req, res) => {
  let recetas;
  let name = req.query.name;
  let category = req.query.category;
  try {
    if(name && category){
      recetas = await recetaModel.getRecetasByNameAndCategoria(name,category);
    }
    else if(category){
      recetas = await recetaModel.getRecetasByCategoria(category);
    }
    else if(name){
      recetas = await recetaModel.getRecetasByName(name)
    }
    else{
      recetas = await recetaModel.getAllRecetas();
    }
    if (!recetas) {
      return res.status(404).json({ message: 'Recipes not found' });
    }
      res.status(200).json(recetas);
    } catch (error) {
      res.status(500).json({ error: 'Error getting recipes' });
    }
};

// GET http://localhost:3000/api/recipe/id
const getRecetasById = async (req, res) => {
  const { recetaID } = req.params;
  try {
    const recetas = await recetaModel.getRecetaById(recetaID);
    res.status(200).json(recetas);
  } catch (error) {
    res.status(500).json({ error: 'Error filtering recipes' });
  }
};

// GET http://localhost:3000/api/recipe/user/3  -->:user_id
const getRecetasByUserId = async (req, res) => {
  const { userId } = req.user.id;
  try {
    const recetas = await recetaModel.getRecetasByUserID(userId);
    res.status(200).json(recetas);
  } catch (error) {
    res.status(500).json({ error: 'Error filtering recipes' });
  }
};

// PUT http://localhost:3000/api/recipe
const editReceta = async (req, res) => {
  const { recetaID, nombre, descripcion, ingredientes, categoria, nombreFamiliar } = req.body;
  if (!recetaID || !nombre || !descripcion || !ingredientes || !categoria) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (!req.file) return res.status(400).json({ msg: 'Missing image file' });
  const imagen = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  try {
    const updatedReceta = await recetaModel.updateReceta(
      recetaID,
      nombre,
      descripcion,
      ingredientes,
      categoria,
      nombreFamiliar,
      imagen
    );
    if (updatedReceta.rowCount === 0) {
      return res.status(404).json({ message: 'Could not find the recipe' });
    }

    res.status(200).json({ message: 'Recipe updated successfully', data: updatedReceta });
  } catch (error) {
    console.error('Error in editRecipe:', error);
    res.status(500).json({ error: 'Error updating the recipe' });
  }
};

// DELETE http://localhost:3000/api/recipe
const deleteReceta = async (req, res) => {
  const { recetaID } = req.params;
  const userIdFromToken = req.user.id;
  if (!recetaID) {
    return res.status(400).json({ error: 'Could not identify the recipe' });
  }
  try {
    const receta = await recetaModel.getRecetaById(recetaID);

     if (receta[0].UserID !== userIdFromToken) {
      return res.status(403).json({ error: 'You can only delete your own recipes' });
    } else {
      const deleted = await recetaModel.deleteReceta(recetaID);
      if (deleted.rowCount === 0) {
      return res.status(404).json({ message: 'Could not find or delete recipe' });
      }
      res.status(200).json({ message: `Recipe successfully deleted` });
    }
  } catch (error) {
    console.error('Error in deleteReceta:', error);
    res.status(500).json({ error: 'Error deleting recipe' });
  }
};

module.exports = {
  createReceta,
  getRecetas,
  getRecetasById,
  getRecetasByUserId,
  editReceta,
  deleteReceta
};