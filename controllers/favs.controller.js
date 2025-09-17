const favModel = require('../models/favs.model');

// GET http://localhost:3000/api/favorites/id
const getFavsByUser = async (req, res) => {
  const userID = req.user.id;
  try {
    const favs = await favModel.getFavsByUser(userID);
    // console.log('Favs', favs);
    res.status(200).json(favs);
  } catch (error) {
    res.status(500).json({ error: 'Error getting favs' });
  }
};

// POST http://localhost:3000/api/favorites
const addFav = async (req, res) => {
  const recipeId = req.params.recipeId;
  const userID = req.user.id;
  try {
    const fav = await favModel.addFav(userID, recipeId);
    res.status(201).json({ msg: 'Recipe added to favs', data: fav });
  } catch (error) {
    res.status(500).json({ error: 'Error adding fav' });
  }
};

// DELETE http://localhost:3000/api/favorites
const deleteFav = async (req, res) => {
  const recipeId = req.params.recipeId;
  const userID = req.user.id;
  try {
    await favModel.deleteFav(userID, recipeId);
    res.status(200).json({ msg: 'Recipe deleted from favs' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting fav' });
  }
};

module.exports = {
    getFavsByUser,
    addFav,
    deleteFav
}