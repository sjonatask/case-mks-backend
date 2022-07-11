import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne, OneToOne } from "typeorm"
import { Movie } from "./Movie";
import { User } from "./User";


@Entity("MKS_FAVORITE_MOVIE")
export class FavoriteMovie {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    user_id: string

    @Column()
    movie_id: string
}
