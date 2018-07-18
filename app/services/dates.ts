import * as moment from 'moment';

export default class Dates {
    static get tomorrow(): moment.Moment {
        let today = moment();
        today.add(1, 'days');
        return today;
    }
}