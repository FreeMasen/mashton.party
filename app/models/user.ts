export default class Guest {
    constructor(
        public id: number = -1,
        public name: string = '',
        public token: string = '',
        public invitedTo: Array<number> = [],
        public email: string = '',
    ) {}
    static fromJson(json: any): Guest {
        return new Guest(
            json.id,
            json.name,
            json.token,
            json.invitedTo,
            json.email,
        )
    }
}