import {AppDataSource} from "../data-source"
import { Movie } from "../entity/Movie"
import { movieInputDTO } from "../model/movie";
import { 
    MovieModel,
    Order
} from "../model/movie";

export class MovieDataBase {
    async input(movie: movieInputDTO):Promise<void>{
       const movieRepo = AppDataSource.getRepository(Movie).create(movie);
       const results = await AppDataSource.getRepository(Movie).save(movieRepo);
    }

    async getAll(order: Order):Promise<any>{
        const results = await AppDataSource.createQueryBuilder(Movie, "MKS_MOVIE")
        .orderBy("MKS_MOVIE.year_of_release", order)
        .getMany();

        const movies = results.map(movie => MovieModel.toMovieModel(movie));
        return movies;
    }

    async edit(movie: movieInputDTO): Promise<void>{
        const movieRepo = await AppDataSource.getRepository(Movie).findOneBy({id: movie.id});
        AppDataSource.getRepository(Movie).merge(movieRepo, movie);

        const results = await AppDataSource.getRepository(Movie).save(movieRepo);
    }

    async delete(id: string): Promise<any>{
        const movieRepo = await AppDataSource.getRepository(Movie).findOneBy({id});
        const results = AppDataSource.getRepository(Movie).remove(movieRepo);
    }

    async getMovieById(id: string): Promise<any>{
        const movieRepo = await AppDataSource.getRepository(Movie).findOneBy({id})
        return movieRepo;
    }
}