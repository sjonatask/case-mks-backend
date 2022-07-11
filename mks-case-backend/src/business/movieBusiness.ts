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
import { UnauthorizedUser } from '../error/customError';

export class MovieBusiness{
    constructor(
        private idGenerator: IGenerateId,
        private authenticator: IAuthenticator
    ){ }

    async signup(movie: movieInput):Promise<void>{
        const { title, description, durationInMinutes, token, yearOfRelease } = movie

        const acessToken = this.authenticator.getData(token);
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
        await new MovieDataBase().signup(input);
    }

    async getAll(order: Order):Promise<any>{

        if(!order || order !== 'ASC' && order !== 'DESC'){
            order = Order.DESC;
        }


        const movies = await new MovieDataBase().getAll(order);
        return movies;
    }

    async edit(movie: movieEditInput):Promise<void>{
        const { title, description, durationInMinutes, token, yearOfRelease, movieId } = movie

        const acessToken = this.authenticator.getData(token);
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
}