import Party from '../models/party';
import * as moment from 'moment';
import Place from '../models/place';
const mockParties = [
    new Party(
        0,
        'Warriors B-day',
        moment('1/31/2010'),
        new Place('Washington House'),
        'My first b-day party in MN',
        'Small group of people + 2 out of towners',
        `img/0.jpg`,
    ),
    new Party(
        1,
        'Spring has Sprung',
        moment('4/12/2011'),
        new Place('Nash and Molly\'s'),
        'An attempt to celebrate the warmer weather',
        'It snowed that day...',
        `img/1.jpg`,
    ),
    new Party(
        2,
        '4th of July',
        moment('7/4/2012'),
        new Place('Elliot street house'),
        'Grilling and Water balloons',
        'It was so freaking hot that day',
        `img/2.jpg`,
    ),
    new Party(
        3,
        'Moon Parties',
        moment('6/30/2013'),
        new Place('The Moon'),
        'We had quite a few parties',
        'I don\'t remember what they all were for',
        `img/3.jpg`,
    ),
    new Party(
        4,
        'Pizza-Mas',
        moment('4/15/2014'),
        new Place('The Moon'),
        'We enjoyed lots of pizza',
        'it continues',
        `img/4.jpg`,
    ),
    new Party(
        5,
        'Bearded Lady Motorcycle freakshow',
        moment('5/1/2015'),
        new Place('University House'),
        'Sat in the yard and had some beers',
        'it was fun!',
        `img/5.jpg`,
    ),
    new Party(
        6,
        'House Warming Party',
        moment('8/1/2016'),
        new Place('Quincy House'),
        'Back yard potluck',
        'we made way too much food',
        `img/6.jpg`,
    ),
    new Party(
        7,
        'Pizza Birthday',
        moment('1/20/2017'),
        new Place('Quincy House'),
        'Made pizza for people for my birthday',
        'mmmmmmm..... pizzzzzaaaaa',
        `img/7.jpg`,
    ),
    new Party(
        8,
        'House Warming frreal',
        moment('7/1/2017'),
        new Place('Mashton Manor'),
        'Back yard hangouts with our friends',
        'We own a home!',
        `img/8.jpg`,
    ),
    new Party(
        9,
        'Mustard Party',
        moment('1/31/2018'),
        new Place('Masthon Manor'),
        'Eat stuff with mustard on it',
        'Must bring your own mustard',
        `img/9.jpg`,
    ),
    new Party(
        10,
        'Our Wedding',
        moment('9/21/2019'),
        new Place('The Food Building'),
        'Toit Nups',
        'dinner, dancing, drinking, celebrating',
        `img/10.jpg`,
    )
]
export default class Data {
    getPartyList(): Promise<Array<Party>> {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(mockParties), Math.floor(Math.random() * 4) * 1000);
        })
    }
}