export class User {

    constructor(
        public username: string,
        public password: string,
        public gender: string,
        public active: boolean,
        public roles: string[]) {
    }
}