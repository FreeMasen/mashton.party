/**The description of a party's location */
export default class Place {
    constructor(
        public name: string = '',
        public address?: string,
        public city?: string,
        public state?: string,
        public zip?: string,
        public description?: string,
    ) {}
    static fromJson(json: any): Place {
        return new Place(
            json.name,
            json.address,
            json.city,
            json.state,
            json.zip,
            json.description,
        )
    }
}