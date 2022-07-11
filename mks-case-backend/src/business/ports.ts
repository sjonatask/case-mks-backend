export interface IHashManager {
    hash: (text: string) => Promise<string>;
    compare: (text: string, hash: string) => Promise<boolean>;
}

export interface IAuthenticator {
    generateToken: (args: any) => string
    getData: (token: string) => any
}

export interface IGenerateId {
    generateId: () => string
}