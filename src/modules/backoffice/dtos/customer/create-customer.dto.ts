export class CreateCustomerDto {
    constructor(
        public name: string,
        public document: string,
        public email: string,
        public type: string,
    ) {
    }
}