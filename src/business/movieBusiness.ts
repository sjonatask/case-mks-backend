import { InvalidToken } from './../error/customError';
import {
    movieInput, 
    Order,
    movieEditInput
} from "../model/movie";
import { 
    IAuthenticator,
    IGenerateId
} from "./ports";
import { MovieDataBase } from "../data/movieDataBase";
import { MovieNotFound, UnauthorizedUser } from '../error/customError';
import { FavoriteMovieDataBase } from '../data/favoriteMovieDataBase';

export class MovieBusiness{
    constructor(
        private idGenerator: IGenerateId,
        private authenticator: IAuthenticator
    ){ }

    async input(movie: movieInput):Promise<void>{
        const { title, description, durationInMinutes, token, yearOfRelease } = movie

        const acessToken = this.authenticator.getData(token);

        if(!acessToken.role && !acessToken.id){
            throw new InvalidToken();
        }

        if(acessToken.role !== 'ADMIN'){
            throw new UnauthorizedUser()
        }

        const id = this.idGenerator.generateId();

        const input = {
            id,
            title,
            description,
            duration_in_minutes: durationInMinutes,
            year_of_release: yearOfRelease,
        }
        await new MovieDataBase().input(input);
    }

    async getAll(order: Order, token: string):Promise<any>{
        const acessToken = this.authenticator.getData(token);

        if(!acessToken.role && !acessToken.id){
            throw new InvalidToken();
        }

        if(!order || order !== 'ASC' && order !== 'DESC'){
            order = Order.DESC;
        }


        const movies = await new MovieDataBase().getAll(order);
        return movies;
    }

    async edit(movie: movieEditInput):Promise<void>{
        const { title, description, durationInMinutes, token, yearOfRelease, movieId } = movie

        const acessToken = this.authenticator.getData(token);

        if(!acessToken.role && !acessToken.id){
            throw new InvalidToken();
        }

        if(acessToken.role !== 'ADMIN'){
            throw new UnauthorizedUser()
        }

        const input = { 
            id: movieId,
            title,
            description,
            duration_in_minutes: durationInMinutes,
            year_of_release: yearOfRelease,
        }

        await new MovieDataBase().edit(input);
    }

    async delete(id: string, token: string):Promise<void>{
        const acessToken = this.authenticator.getData(token);

        if(!acessToken.role && !acessToken.id){
            throw new InvalidToken();
        }
        if(acessToken.role !== 'ADMIN'){
            throw new UnauthorizedUser()
        }

        const checkMovie = await new MovieDataBase().getMovieById(id);
        if(!checkMovie){
            throw new MovieNotFound();
        }

        const result = await new MovieDataBase().delete(id);
    }

    async registerFavMovie(movieId: string, token: string):Promise<void>{
        const acessToken = this.authenticator.getData(token);

        if(!acessToken.role && !acessToken.id){
            throw new InvalidToken();
        }

        const checkMovie = await new MovieDataBase().getMovieById(movieId);
        if(!checkMovie){
            throw new MovieNotFound();
        }  

        const input = {
            id: this.idGenerator.generateId(),
            movie_id: movieId,
            user_id: acessToken.id
        }

        const result = await new FavoriteMovieDataBase().register(input);
    }

    async getFavMovies(token: string):Promise<any>{
        const acessToken = this.authenticator.getData(token);

        if(!acessToken.role && !acessToken.id){
            throw new InvalidToken();
        }

        const movies = await new FavoriteMovieDataBase().getAllFavoriteMovie(acessToken.id);
        return movies;
    }

    async deleteFavMovie(movieId: string, token: string):Promise<void>{
        const acessToken = this.authenticator.getData(token);

        if(!acessToken.role && !acessToken.id){
            throw new InvalidToken();
        }

        const checkMovie = await new MovieDataBase().getMovieById(movieId);
        if(!checkMovie){
            throw new MovieNotFound();
        }  

        const input = {
            movie_id: movieId,
            user_id: acessToken.id
        }
        
        const result = await new FavoriteMovieDataBase().delete(input);
    }
}