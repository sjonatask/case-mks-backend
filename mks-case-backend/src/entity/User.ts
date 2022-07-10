import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    nickName: string

    @Column()
    password: string

    @Column()
    email: string

}
