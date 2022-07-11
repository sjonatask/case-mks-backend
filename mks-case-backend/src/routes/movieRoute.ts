import express = require('express');
import { MovieController } from '../controllers/movieController';

export const movieRouter = express.Router();
const movieController = new MovieController();

movieRouter.post('/signup', movieController.signup);
movieRouter.get('/list', movieController.getAll);
movieRouter.put('/edit/', movieController.edit);