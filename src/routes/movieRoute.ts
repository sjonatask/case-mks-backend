import express = require('express');
import { MovieController } from '../controllers/movieController';

export const movieRouter = express.Router();
const movieController = new MovieController();

movieRouter.post('/insert', movieController.input);
movieRouter.get('/list', movieController.getAll);
movieRouter.put('/edit/', movieController.edit);
movieRouter.delete('/delete/:id', movieController.delete);
movieRouter.post('/favorite/:id', movieController.registerFavMovie);
movieRouter.get('/favorite', movieController.getFavMovies);
movieRouter.delete('/favorite/:id', movieController.deleteFavMovie);