import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm"

@Entity("MKS_MOVIE")
export class Movie {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    duration_in_minutes: number

    @Column()
    year_of_release: number
}
