import {AppDataSource} from "../data-source"
import { User } from "../entity/User";
import { UserNotFound } from "../error/customError";
import { userInputDTO } from "../model/user";
import { UserModel } from "../model/user";

export class UserDataBase {
    async signup(user: userInputDTO):Promise<void> {
        const userRepo = AppDataSource.getRepository(User).create(user);
        const results = await AppDataSource.getRepository(User).save(userRepo);
    }

    async getUserByEmail(email: string):Promise<any> {        
        const results = await AppDataSource.getRepository(User).findBy({email});
        
        if(!results[0]){
            throw new UserNotFound();
        }

        return UserModel.toUserModel(results[0]);
    }

}