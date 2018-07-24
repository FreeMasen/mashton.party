import * as Moment from 'moment';
import Place from './place';
/**
 * A party's description.
 */
export default class Party {
    constructor(
        /**The unique identifier for this party */
        public id: number,
        /**The unique name for this party */
        public name: string,
        /**The date and time for this party */
        public date: Moment.Moment,
        /**The place for this party */
        public place: Place,
        /**A short description of this event */
        public snippet: string,
        /**A longer description of this event */
        public description: string,
        /**The path that should be used for this party */
        public imagePath: string,
        /**The list of people who have RSVP */
        public rsvpList?: Array<Rsvp>,
        /**The name of an item/person that guests are bringing */
        public rsvpItem?: string,
    ) {}
}
/**
 * A Guest's commitment to attend
 */
export class Rsvp {
    constructor(
        /**The unique of id a guest's RSVP */
        public id: number,
        /**The name of the guest */
        public name: string,
        /**If this guest can make it */
        public attending: boolean,
        /**The item this guest is bringing */
        public bringing?: string,
        /**A short message about their response */
        public message?: string,
    ) {}
}