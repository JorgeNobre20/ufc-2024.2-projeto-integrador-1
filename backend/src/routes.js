const express = require('express');
const { body } = require('express-validator');
const authController = require('./controllers/authController');
const saveMovieController = require('./controllers/saveMovieController');
const recommendationController = require('./controllers/recommendationController');
const movieController = require('./controllers/movieController');
const {authMiddleware} = require("./middlewares/authMiddleware");

const router = express.Router();

router.post(
    '/auth/signup',
    body('email').isEmail().withMessage('E-mail inválido'),
    body('password').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres'),
    authController.signUp
);

router.post('/auth/login', authController.login);
router.get('/auth/verify-email', authController.verifyEmail);


router.get('/genres', authMiddleware, movieController.getAvailableGenres);

router.get('/recommendations/:userId', authMiddleware, recommendationController.getRecommendedMovies);

router.get('/recommendations-genre/:genre', authMiddleware, recommendationController.getMoviesByGenre);

router.get('/saved-movies/:userId', authMiddleware, saveMovieController.getSavedMovie);
router.post('/saved-movies/:userId', authMiddleware, saveMovieController.saveMovie);

module.exports = router;
