const express = require('express');
const { upload, errorFileHandler } = require('../middlewares/uploadFile');
const recetasController = require('../controllers/recetas.controller');
const router = express.Router();
const protectedRoutes = require('../middlewares/tokenVerification');
const authorizeRole = require('../middlewares/roleVerification');
const { validateRequest, recetaValidation } = require('../middlewares/validators');

// GET http://localhost:3000/api/recipe?category=quesos&name=tarta
router.get('/', recetasController.getRecetas);

// GET http://localhost:3000/api/recipe/id/44  -->:Recetaid
router.get('/id/:recetaId',  recetasController.getRecetasById);

// GET http://localhost:3000/api/recipe/user/3  -->:user_id
router.get('/user/:userId', /*protectedRoutes,*/ recetasController.getRecetasByUserId);

// POST
router.post('/', /*protectedRoutes, authorizeRole('user'), upload.single('imagen'), errorFileHandler, recetaValidation, validateRequest,*/ recetasController.createReceta);

// PUT
router.put('/', /*protectedRoutes, authorizeRole('user'), upload.single('imagen'), errorFileHandler, recetaValidation, validateRequest,*/ recetasController.editReceta);

//DELETE http://localhost:3000/api/recipe/12 -->:recetaId
router.delete('/:recetaId', /*protectedRoutes, authorizeRole('user'),*/ recetasController.deleteReceta);

module.exports = router;