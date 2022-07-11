import { FavoriteMovie } from './../entity/FavoriteMovie';
import {AppDataSource} from "../data-source"
import { 
    favMovieInputDTO,
    MovieModel
} from '../model/movie';

export class FavoriteMovieDataBase {
    async register(favoriteMovie: favMovieInputDTO):Promise<void>{
        const favMovieRepo = AppDataSource.getRepository(FavoriteMovie).create(favoriteMovie)
        const results = await AppDataSource.getRepository(FavoriteMovie).save(favMovieRepo)
    }

    async getAllFavoriteMovie(user_id: string):Promise<any>{
        const results = await AppDataSource.createQueryBuilder(FavoriteMovie, "MKS_FAVORITE_MOVIE")
        .select("*")
        .leftJoinAndSelect("MKS_FAVORITE_MOVIE.movie_id", "MKS_MOVIE.id")
        .where("MKS_FAVORITE_MOVIE.user_id = :user_id", {user_id})
        .getMany();

        console.log(results);
        
        const movies = results.map(movie => MovieModel.toMovieModel(movie));
        return movies;
    }

    async delete(favoriteMovie: any):Promise<any>{
        const favMovieRepo = await AppDataSource.getRepository(FavoriteMovie).findOneBy({id: favoriteMovie.id})
        const results = AppDataSource.getRepository(FavoriteMovie).remove(favMovieRepo)
    }
}