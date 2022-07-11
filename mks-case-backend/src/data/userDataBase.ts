import {AppDataSource} from "../data-source"
import { User } from "../entity/User";

export class UserDataBase {
    async signup(user: any):Promise<void> {
        const userRepo = AppDataSource.getRepository(User).create(user);
        const results = await AppDataSource.getRepository(User).save(userRepo);
    }

    async login(user: any):Promise<void> {
        
    }

}