import { Request, Response } from "express";
import { Authenticator } from "../services/authenticator";
import { HashManager } from "../services/hashManager";

export class UserController{
    async signup(req: Request, res: Response){
        try {
            
        }catch(error: any){
            res.status(400).send({ error: error.message });
        }
    }
}