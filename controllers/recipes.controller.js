const recipeModel = require('../models/recipes.model');
const path = require('path');

// POST http://localhost:3000/api/recipe
const createRecipe = async (req, res) => {
  const { name, description, ingredients, category, familyName } = req.body;
  const userID = req.user.id
    if (!req.file) return res.status(400).json({ msg: 'Missing image file' });
    const image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  try {
    const recipe = await recipeModel.createRecipe(
      userID,
      name,
      description,
      ingredients,
      category,
      familyName,
      image
    );
    res.status(201).json({ msg: 'New recipe added', data: recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating recipe' });
  }
};

// GET http://localhost:3000/api/recipe?category=quesos&name=tarta
const getRecipes = async (req, res) => {
  let recipes;
  let name = req.query.name;
  let category = req.query.category;
  try {
    if(name && category){
      recipes = await recipeModel.getRecipesByNameAndCategory(name,category);
    }
    else if(category){
      recipes = await recipeModel.getRecipesByCategory(category);
    }
    else if(name){
      recipes = await recipeModel.getRecipesByName(name)
    }
    else{
      recipes = await recipeModel.getAllRecipes();
    }
    if (!recipes) {
      return res.status(404).json({ message: 'Recipes not found' });
    }
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ error: 'Error getting recipes' });
    }
};

// GET http://localhost:3000/api/recipe/id
const getRecipesById = async (req, res) => {
  const { recipeId } = req.params;
  try {
    const recipe = await recipeModel.getRecipesById(recipeId);
    res.status(200).json(recipe[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error filtering recipes' });
  }
};

// GET http://localhost:3000/api/recipe/user/3  -->:user_id
const getRecipesByUserId = async (req, res) => {
  const { userId } = req.user.id;
  try {
    const recipes = await recipeModel.getRecipesByUserID(userId);
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Error filtering recipes' });
  }
};

// PUT http://localhost:3000/api/recipe
const editRecipes = async (req, res) => {
  const { recipeID, name, description, ingredients, category, familyName } = req.body;
  if (!recipeID || !name || !description || !ingredients || !category) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (!req.file) return res.status(400).json({ msg: 'Missing image file' });
  const image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  try {
    const updatedRecipe = await recipeModel.updateRecipe(
      recipeID,
      name,
      description,
      ingredients,
      category,
      familyName,
      image
    );
    if (updatedRecipe.rowCount === 0) {
      return res.status(404).json({ message: 'Could not find the recipe' });
    }

    res.status(200).json({ message: 'Recipe updated successfully', data: updatedRecipe });
  } catch (error) {
    console.error('Error in editRecipe:', error);
    res.status(500).json({ error: 'Error updating the recipe' });
  }
};

// DELETE http://localhost:3000/api/recipe
const deleteRecipe = async (req, res) => {
  const { recipeID } = req.params;
  const userIdFromToken = req.user.id;
  if (!recipeID) {
    return res.status(400).json({ error: 'Could not identify the recipe' });
  }
  try {
    const recipe = await recipeModel.getRecipesById(recipeID);

     if (recipe[0].UserID !== userIdFromToken) {
      return res.status(403).json({ error: 'You can only delete your own recipes' });
    } else {
      const deleted = await recipeModel.deleteRecipe(recipeID);
      if (deleted.rowCount === 0) {
      return res.status(404).json({ message: 'Could not find or delete recipe' });
      }
      res.status(200).json({ message: `Recipe successfully deleted` });
    }
  } catch (error) {
    console.error('Error in deleteRecipe:', error);
    res.status(500).json({ error: 'Error deleting recipe' });
  }
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipesById,
  getRecipesByUserId,
  editRecipes,
  deleteRecipe
};