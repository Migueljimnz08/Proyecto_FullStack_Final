const express = require('express');
const favsController = require('../controllers/favs.controller');
const router = express.Router();
const protectedRoutes = require('../middlewares/tokenVerification');
const authorizeRole = require('../middlewares/roleVerification');

// GET
router.get('/user/me', protectedRoutes, /*authorizeRole('user'),*/ favsController.getFavsByUser);

// POST
router.post('/:recipeId', /*protectedRoutes, authorizeRole('user'),*/ favsController.addFav);

// DELETE
router.delete('/:recipeId', /*protectedRoutes, authorizeRole('user'),*/ favsController.deleteFav);

module.exports = router;