import { Request, Response } from "express";
import { Authenticator } from "../services/authenticator";
import { HashManager } from "../services/hashManager";
import { IdGenerator } from "../services/generatorID";
import { EmptyFields } from "../error/customError";
import { UserBussines } from "../business/userBusiness";

const idGenerator = new IdGenerator();
const hashManager = new HashManager();
const authenticator = new Authenticator();

const userBussines = new UserBussines(idGenerator, hashManager, authenticator)

export class UserController{
    async signup(req: Request, res: Response){
        try {
            const { name, email, password, role } = req.body;

            if(!name || !email || !password || !role){
               throw new EmptyFields();
            };

            const input = {
                name,
                email,
                password,
                role
            };

            const token = await userBussines.signup(input);

            res.status(201).send({ token })
        }catch(error: any){
            res.status(400).send({ error: error.message });
        }
    }

    async login(req: Request, res: Response){
        try {
            const { email, password } = req.body;

            if(!email || !password){
               throw new EmptyFields();
            };

            const input = {
                email,
                password
            };

            const token = await userBussines.login(input);

            res.status(200).send({ token })
        }catch(error: any){
            res.status(400).send({ error: error.message });
        }
    }
}