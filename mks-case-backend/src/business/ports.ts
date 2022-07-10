export interface IHashGenerator {
    hash: (text: string) => Promise<string>;
}

export interface IHashComparer {
    compare: (text: string, hash: string) => Promise<boolean>;
}

export interface IAuthenticator {
    generateToken: (args: any) => Promise<string>
}