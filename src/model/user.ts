export class UserModel{
    constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private role: UserRole
    ){}

    getId(){
        return this.id;
    }

    getName(){
        return this.name
    }

    getEmail(){
        return this.email;
    }

    getPassword(){
        return this.password;
    }

    getRole(){
        return this.role;
    }

    setId(id: string){
        this.id = id;
    }

    setName(name: string){
        this.name = name;
    }

    setEmail(email: string){
        this.email = email;
    }

    setPassword(password: string){
        this.password = password;
    }

    setRole(role: UserRole){
        this.role = role;
    }

   static stringToUserRole(input: string): UserRole{
        switch (input) {
            case "NORMAL":
              return UserRole.NORMAL;
            case "ADMIN":
              return UserRole.ADMIN;
            default:
              throw new Error("Invalid user role, you can try 'NORMAL'");
          }
    }

    static toUserModel(user: any): UserModel {
        return new UserModel(user.id, user.name, user.email, user.password, UserModel.stringToUserRole(user.role));
    }
}

export enum UserRole{
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface userInput {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

export interface userInputDTO {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

export interface userLoginInput {
    email: string;
    password: string;
}