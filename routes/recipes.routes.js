const express = require('express');
const { upload, errorFileHandler } = require('../middlewares/uploadFile');
const recipesController = require('../controllers/recipes.controller');
const router = express.Router();
const protectedRoutes = require('../middlewares/tokenVerification');
const authorizeRole = require('../middlewares/roleVerification');
const { validateRequest, recipeValidation } = require('../middlewares/validators');

// GET http://localhost:3000/api/recipes?category=quesos&name=tarta
router.get('/', recipesController.getRecipes);

// GET http://localhost:3000/api/recipes/id/44  -->:Recipeid
router.get('/id/:recipeId',  recipesController.getRecipesById);

// GET http://localhost:3000/api/recipes/user/3  -->:user_id
router.get('/user/:userId', /*protectedRoutes,*/ recipesController.getRecipesByUserId);

// POST
router.post('/', /*protectedRoutes, authorizeRole('user'), upload.single('imagen'), errorFileHandler, recipeValidation, validateRequest,*/ recipesController.createRecipe);

// PUT
router.put('/', /*protectedRoutes, authorizeRole('user'), upload.single('imagen'), errorFileHandler, recipeValidation, validateRequest,*/ recipesController.editRecipes);

//DELETE http://localhost:3000/api/recipes/12 -->:recetaId
router.delete('/:recipeId', /*protectedRoutes, authorizeRole('user'),*/ recipesController.deleteRecipe);

module.exports = router;