import * as Moment from 'moment';
import Place from './place';
export default class Party {
    constructor(
        public id: number,
        public name: string,
        public date: Moment.Moment,
        public place: Place,
        public snippet: string,
        public description: string,
        public imagePath: string,
        public rsvpList?: Array<RSVP>
    ) {}
}

export class RSVP {
    constructor(
        public name: string,
        public bringing?: string,
    ) {}
}