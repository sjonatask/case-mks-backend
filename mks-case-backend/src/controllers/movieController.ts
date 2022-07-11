import { Order } from './../model/movie';
import { Request, Response } from "express";
import { Authenticator } from "../services/authenticator";
import { IdGenerator } from "../services/generatorID";
import {
    EmptyFields,
    NoLog
} from "../error/customError";
import { MovieBusiness } from "../business/movieBusiness";


const idGenerator = new IdGenerator();
const authenticator = new Authenticator();

const movieBusiness = new MovieBusiness(idGenerator, authenticator);

export class MovieController{
    async input(req: Request, res: Response){
        try {
            const { title, description, durationInMinutes, yearOfRelease } = req.body;
            const token = req.headers.authorization as string;

            if(!title || !description || !durationInMinutes || !yearOfRelease){
                throw new EmptyFields();
            }

            if(!token){
                throw new NoLog;
            }

            const input = {
                title,
                description,
                durationInMinutes,
                yearOfRelease,
                token
            }

            await movieBusiness.input(input)
            
            res.status(201).send({message: "Movie created with success"});
        }catch(error: any){
            res.status(error.code).send({ error: error.message });
        }
    }

    async getAll(req: Request, res: Response){
        try {
            const token = req.headers.authorization as string;
            const order = req.query.order as Order;
            
            if(!token){
                throw new NoLog;
            }

            const movies = await movieBusiness.getAll(order, token);

            res.status(200).send({message: movies})
        }catch(error: any){
            res.status(error.code).send({ error: error.message });
        }
    }

    async edit(req: Request, res: Response){
        try {
            const { movieId, title, description, durationInMinutes, yearOfRelease } = req.body;
            const token = req.headers.authorization as string;

            if(!title || !description || !durationInMinutes || !yearOfRelease || !movieId){
                throw new EmptyFields();
            }

            if(!token){
                throw new NoLog;
            }

            const input = {
                movieId,
                title,
                description,
                durationInMinutes,
                yearOfRelease,
                token
            }

            await movieBusiness.edit(input)

            res.status(201).send({message: "Movie edited with success"});
        }catch(error: any){
            res.status(error.code).send({ error: error.message });
        }
    }

    async delete(req: Request, res: Response){
        try {
            const id = req.params.id;
            const token = req.headers.authorization as string;

            if(!token){
                throw new NoLog;
            }

            if(!id){
                throw new EmptyFields();
            }

            await movieBusiness.delete(id, token);

            res.status(200).send({message: "Movie deleted with success"});
        }catch(error: any){
           res.status(error.code).send({ error: error.message });
        }
    }

    async registerFavMovie(req: Request, res: Response){
        try {
            const movieId = req.params.id;
            const token = req.headers.authorization as string;

            if(!token){
                throw new NoLog;
            }

            if(!movieId){
                throw new EmptyFields();
            }

            await movieBusiness.registerFavMovie(movieId, token);

            res.status(200).send({message: "favorite movie registered with success"});
        }catch(error: any){
            res.status(error.code).send({ error: error.message });
        }
    }

    async getFavMovies(req: Request, res: Response){
        try {
            const token = req.headers.authorization as string;

            if(!token){
                throw new NoLog;
            }

            const movie = await movieBusiness.getFavMovies(token);

            res.status(200).send({message: movie})
        }catch(error: any){
            res.status(500).send({ error: error.message });
        }
    }

    async deleteFavMovie(req: Request, res: Response){
        try {
            const token = req.headers.authorization as string;
            const movieId = req.params.id;

            if(!token){
                throw new NoLog;
            }

            const movie = await movieBusiness.deleteFavMovie(movieId, token);

            res.status(200).send({message: "favorite movie deleted with success"});
        }catch(error: any){
            res.status(500).send({ error: error.message });
        }
    }
}