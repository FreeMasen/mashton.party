import * as Moment from 'moment';
import Place from './place';
import Rsvp from './rsvp';
/**
 * A party's description.
 */
export default class Party {
    constructor(
        /**The unique identifier for this party */
        public id: number = -1,
        /**The unique name for this party */
        public name: string = '',
        /**The date and time for this party */
        public date: Moment.Moment = Moment(),
        /**The place for this party */
        public place: Place = new Place(),
        /**A short description of this event */
        public snippet: string = '',
        /**A longer description of this event */
        public description: string = '',
        /**The path that should be used for this party */
        public imagePath: string = '',
        /**The list of people who have RSVP */
        public rsvpList?: Array<Rsvp>,
        /**The name of an item/person that guests are bringing */
        public rsvpItem?: string,
    ) {}
    /**Constructor for parsing server value */
    static fromJson(json: any): Party {
        return new Party(
            json.id,
            json.name,
            Moment(json.date),
            Place.fromJson(json.place),
            json.snippet,
            json.description,
            json.imagePath,
            json.rsvpList ? json.rsvpList.map(Rsvp.fromJson) : [],
            json.rsvpItem,
        )
    }
}
