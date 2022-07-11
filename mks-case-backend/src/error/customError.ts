export class CustomError extends Error {
    constructor(message: string, public code: number) {
        super(message);
    }
}

export class EmptyFields extends CustomError {
    constructor() {
        super("Fields cannot be empty", 400)
    }
}

export class InvalidName extends CustomError {
    constructor() {
        super("Invalid Name", 400);
    }
}

export class InvalidEmail extends CustomError {
    constructor() {
        super("Invalid Email", 400);
    }
}

export class InvalidPassword extends CustomError {
    constructor() {
        super("Invalid Password", 400);
    }
}

export class UnauthorizedUser extends CustomError {
    constructor() {
        super("Unauthorized User", 401);
    }
}

export class InvalidToken extends CustomError {
    constructor() {
        super("Invalid Token", 498);
    }
}

export class NoLog extends CustomError {
    constructor() {
        super("User not logged in", 400)
    }
}

export class UserNotFound extends CustomError {
    constructor() {
        super("User not Found", 404);
    }
}

export class UserAlreadyExists extends CustomError {
    constructor() {
        super("User already exists", 409);
    }
}

export class MovieNotFound extends CustomError {
    constructor() {
        super("Movie not Found", 404);
    }
}