import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from "typeorm"

@Entity("MKS_USERS")
export class User {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @Column()
    password: string

    @Column()
    email: string

    @Column()
    role: string
}
