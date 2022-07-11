export class MovieModel{
    constructor(
    private id: string,
    private title: string,
    private description: string,
    private durationInMinutes: number,
    private yearOfRelease: number
    ){}

    getId(){
        return this.id;
    }

    getTitle(){
        return this.title
    }

    getDescription(){
        return this.description;
    }

    getDurationInMinutes(){
        return this.durationInMinutes;
    }

    getYearOfRelease(){
        return this.yearOfRelease;
    }

    setId(id: string){
        this.id = id;
    }

    setTitle(title: string){
        this.title = title;
    }

    setDescription(description: string){
        this.description = description;
    }

    setDurationInMinutes(durationInMinutes: number){
        this.durationInMinutes = durationInMinutes;
    }

    setYearOfRelease(yearOfRelease: number){
        this.yearOfRelease = yearOfRelease;
    }    

    static toMovieModel(movie: any): MovieModel {
        return new MovieModel(movie.id, movie.title, movie.description, movie.duration_in_minutes, movie.year_of_release);
    }
}

export interface movieInput {
    title: string;
    description: string;
    durationInMinutes: number;
    yearOfRelease: number;
    token: string;
}

export interface movieInputDTO {
    id: string;
    title: string;
    description: string;
    duration_in_minutes: number;
    year_of_release: number;
}

export interface movieEditInput {
    movieId: string;
    title: string;
    description: string;
    durationInMinutes: number;
    yearOfRelease: number;
    token: string;
}


export enum Order {
    ASC = 'ASC',
    DESC = 'DESC'
}