import Party, { Rsvp } from '../models/party';
import * as moment from 'moment';
import Place from '../models/place';
const mockParties = [
    new Party(
        0,
        'Warriors B-day',
        moment('2010-01-31T22:00-06:00'),
        new Place('Washington House'),
        'My first b-day party in MN',
        'Small group of people + 2 out of towners',
        `img/0.jpg`,
    ),
    new Party(
        1,
        'Spring has Sprung',
        moment('2011-04-12T12:00-06:00'),
        new Place('Nash and Molly\'s'),
        'An attempt to celebrate the warmer weather',
        'It snowed that day...',
        `img/1.jpg`,
    ),
    new Party(
        2,
        '4th of July',
        moment('2012-07-04T12:00-06:00'),
        new Place('Elliot street house'),
        'Grilling and Water balloons',
        'It was so freaking hot that day',
        `img/2.jpg`,
    ),
    new Party(
        3,
        'Moon Parties',
        moment('2013-06-30T20:00-06:00'),
        new Place('The Moon'),
        'We had quite a few parties',
        'I don\'t remember what they all were for',
        `img/3.jpg`,
    ),
    new Party(
        4,
        'Pizza-Mas',
        moment('2014-04-15T20:00-06:00'),
        new Place('The Moon'),
        'We enjoyed lots of pizza',
        'it continues',
        `img/4.jpg`,
    ),
    new Party(
        5,
        'Bearded Lady Motorcycle freakshow',
        moment('2015-05-01T12:00-06:00'),
        new Place('University House'),
        'Sat in the yard and had some beers',
        'it was fun!',
        `img/5.jpg`,
    ),
    new Party(
        6,
        'House Warming Party',
        moment('2016-08-01T12:00-06:00'),
        new Place('Quincy House'),
        'Back yard potluck',
        'we made way too much food',
        `img/6.jpg`,
    ),
    new Party(
        7,
        'Pizza Birthday',
        moment('2017-01-20T20:00-06:00'),
        new Place('Quincy House'),
        'Made pizza for people for my birthday',
        'mmmmmmm..... pizzzzzaaaaa',
        `img/7.jpg`,
    ),
    new Party(
        8,
        'House Warming frreal',
        moment('2017-07-01T12:00-06:00'),
        new Place('Mashton Manor'),
        'Back yard hangouts with our friends',
        'We own a home!',
        `img/8.jpg`,
    ),
    new Party(
        9,
        'Mustard Party',
        moment('2018-01-31T20:00-06:00'),
        new Place('Masthon Manor'),
        'Eat stuff with mustard on it',
        'Must bring your own mustard',
        `img/9.jpg`,
        [new Rsvp(0, 'Joe Mollen', true, 'Beez Neez Honey Mustard'),
        new Rsvp(1, 'Christine Mollen', true, 'Curry Mustard')],
        'Mustard'
    ),
    new Party(
        10,
        'Our Wedding',
        moment('2019-09-21T18:00-06:00'),
        new Place('The Food Building',
            '1401 Marshall St. NE',
            'Minneapolis',
            'MN',
            '55413'
            ),
        'Toit Nups',
        'dinner, dancing, drinking, celebrating',
        `img/10.jpg`,
        [],
        "+1"
    )
]
/**The network/data service */
export default class Data {
    getPartyList(): Promise<Array<Party>> {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(mockParties), Math.floor(Math.random() * 4) * 1000);
        })
    }
}