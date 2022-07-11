import {
   IAuthenticator,
   IGenerateId,
   IHashManager
} from "./ports"
import { UserDataBase } from "../data/userDataBase"
import { 
    InvalidEmail,
    InvalidName,
    InvalidPassword 
} from "../error/customError"
import { User } from "../model/user";

export class UserBussines{
    constructor(
        private idGenerator: IGenerateId,
        private hashGenerator: IHashManager,
        private authenticator: IAuthenticator
    ){ }

    async signup(user: any): Promise<string>{
        if(user.name.length <3){
            throw new InvalidName();
        }

        if(user.password.length < 6){
            throw new InvalidPassword();
        }

        if(!user.email.includes("@")){
            throw new InvalidEmail();
        }

        let role = User.stringToUserRole(user.role);
        const id = this.idGenerator.generateId();
        const hashPassword = await this.hashGenerator.hash(user.password);
        
        const input = {
            id,
            name: user.name,
            email: user.email,
            password: hashPassword,
            role
        }

        const userDataBase = new UserDataBase();

        userDataBase.signup(input)
        console.log(input);
        
        const token = this.authenticator.generateToken({
            id,
            role
        })

        return token
    }
}