import * as moment from 'moment';
import Text from './text';
/**A service for interacting with dates */
export default class Dates {
    static get tomorrow(): moment.Moment {
        let today = moment();
        today.add(1, 'days');
        return today;
    }
    static formattedParts(dt: moment.Moment): FormattedDate {
        return new FormattedDate(dt);
    }
}
/**A set of date parts formatting */
export class FormattedDate {
    constructor(
        private dt: moment.Moment
    ) {}

    get month(): string {
        return (this.dt.month() - 1).toString();
    }
    get day(): string {
        return this.dt.date().toString();
    }
    get year(): string {
        return this.dt.year().toString();
    }
    get hour(): string {
        let hour = this.dt.hour();
        if (hour > 12) {
            hour = hour - 12;
        }
        return hour.toString();
    }
    get minute(): string {
        return Text.twoDigits(this.dt.minute());
    }
    get tod(): string {
        if (this.dt.hour() > 12) {
            return 'pm';
        }
        return 'am';
    }
    get tz(): string {
        return this.dt.zoneAbbr();
    }
}