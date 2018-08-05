/**
 * A Guest's commitment to attend
 */
export default class Rsvp {
    constructor(
        /**The unique of id a guest's RSVP */
        public id: number,
        /**The name of the guest */
        public name: string,
        /**If this guest can make it */
        public attending: boolean,
        public guestId: number,
        /**The item this guest is bringing */
        public bringing?: string,
        /**A short message about their response */
        public message?: string,
    ) {}
    static fromJson(json: any): Rsvp {
        return new Rsvp(
            json.id,
            json.name,
            json.attending,
            json.guestId,
            json.bringing,
            json.message,
        )
    }
}