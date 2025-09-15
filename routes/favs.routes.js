const express = require('express');
const favsController = require('../controllers/favs.controller');
const router = express.Router();
const protectedRoutes = require('../middlewares/tokenVerification');
const authorizeRole = require('../middlewares/roleVerification');

// GET
router.get('/user/:userId', /*protectedRoutes, authorizeRole('user'),*/ favsController.getFavsByUser);

// POST
router.post('/', /*protectedRoutes, authorizeRole('user'),*/ favsController.addFav);

// DELETE
router.delete('/', /*protectedRoutes, authorizeRole('user'),*/ favsController.deleteFav);

module.exports = router;