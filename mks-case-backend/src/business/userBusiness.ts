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
import { 
    UserModel,
    userInput,
    userInputDTO,
    userLoginInput
} from "../model/user";

export class UserBussines{
    constructor(
        private idGenerator: IGenerateId,
        private hashGenerator: IHashManager,
        private authenticator: IAuthenticator
    ){ }

    async signup(user:userInput): Promise<string>{
        if(user.name.length <3){
            throw new InvalidName();
        }

        if(user.password.length < 6){
            throw new InvalidPassword();
        }

        if(!user.email.includes("@")){
            throw new InvalidEmail();
        }

        let role = UserModel.stringToUserRole(user.role);
        const id = this.idGenerator.generateId();
        const hashPassword = await this.hashGenerator.hash(user.password);
        
        const input:userInputDTO = {
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

    async login(user:userLoginInput): Promise<any>{

        if(!user.email.includes("@")){
            throw new InvalidEmail();
        }

        const userDataBase = new UserDataBase();

        const userFromDB = await userDataBase.getUserByEmail(user.email);
        const isValidPassword = await this.hashGenerator.compare(user.password, userFromDB.password);

        if(!isValidPassword){
            throw new InvalidPassword();
        }

        const token = this.authenticator.generateToken({
            id: userFromDB.id,
            role: userFromDB.role
        })

        return token;
    }
}