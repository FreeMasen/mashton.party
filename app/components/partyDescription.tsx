import * as React from 'react';
import Party from '../models/party';
import { Moment } from '../../node_modules/moment';
import Place from '../models/place';
import Dates from '../services/dates';
import Colors from '../services/colors';
interface PartyDescriptionProps {
    party: Party;
}
interface PartyDescriptionState {

}
export default class PartyDescription extends React.Component<PartyDescriptionProps, PartyDescriptionState> {
    render() {
        return (
            <div>
                <div
                    className="jumbotron"
                    style={{
                        backgroundImage: `url(${this.props.party.imagePath})`,
                        backgroundSize: 'cover',
                        width: '100%',
                        height: '75vh',
                        backgroundPositionX: '50%',
                        backgroundPositionY: '50%',
                    }}
                >
                </div>
                <div className="details-container"
                    style={{
                        width: '100%',
                        background: Colors.black.toString(),
                        paddingTop: 10,
                        paddingBottom: 25,
                    }}
                >
                    <PartyDetails
                        name={this.props.party.name}
                        date={this.props.party.date}
                        place={this.props.party.place}
                        description={this.props.party.description}
                    />
                </div>
            </div>
        )
    }
}
interface PartyDetailsProps {
    name: string;
    date: Moment;
    place: Place;
    description: string;
}
interface PartyDetailsState {

}
class PartyDetails extends React.Component<PartyDetailsProps, PartyDetailsState> {
    render() {
        return(
            <div className="party-details"
                style={{
                    maxWidth: 800,
                    minWidth: 300,
                    margin: '0 auto',
                    background: Colors.white.toString(),
                    borderRadius: 15,
                    padding: 10,
                }}
            >
                <h2
                    style={{
                        color: Colors.black.toString(),
                    }}
                >
                    {this.props.name}
                </h2>
                <div className="party-date-time">
                    {subTitle('When')}
                    <DateComponent
                        date={this.props.date}
                    />
                    {subTitle('Where')}
                    <PlaceComponent
                        place={this.props.place}
                    />
                    {subTitle('Details')}
                    <div className="party-details">
                        {this.props.description}
                    </div>
                </div>
            </div>
        )
    }
}

const subTitle = (name: string) => {
    return [
        <h3
            style={{
                color: Colors.black.toString(),
            }}
        >
            {name}
        </h3>,
        <hr style={{marginTop: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: `1px solid ${Colors.accent.toString()}`}} />
    ]
}

class DateComponent extends React.Component<{date: Moment}, {}> {
    render() {
        let dt = Dates.formattedParts(this.props.date);
        return (
            <div className="date-component"
                style={{
                    display: 'flex',
                    flexFlow: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    alignContent: 'flex-start',
                    color: Colors.black.toString(),
                }}
            >
                <div className="date-part">
                    <span className="month-part">{dt.month}</span>/
                    <span className="day-part">{dt.day}</span>/
                    <span className="year-part">{dt.year}</span>
                </div>
                <div className="time-part" style={{marginLeft: 10}}>
                    <span className="hour-part">{dt.hour}</span>:
                    <span className="minute-part">{dt.minute}</span>
                    <span className="tod-part">{dt.tod}</span>
                </div>
            </div>
        )
    }
}

class PlaceComponent extends React.Component<{place: Place}, {}> {
    render() {
        return (
            <div className="party-place"
                style={{
                    display: 'flex',
                    flexFlow: 'column',
                }}
            >
                <span className="place-title">{this.props.place.name}</span>
                {
                    this.props.place.address ? (
                        <div
                            style={{
                                display: 'flex',
                                flexFlow: 'column',
                            }}
                        >
                            <div className="address-line-1">
                                {
                                this.props.place.address ?
                                    <span>{this.props.place.address}</span>
                                    : null
                                }
                            </div>
                            <div className="address-line-2"
                                style={{
                                    display: 'flex',
                                    flexFlow: 'row',
                                }}
                            >
                                {
                                    this.props.place.city ?
                                        <span>{this.props.place.city},</span>
                                        : null
                                }
                                {
                                    this.props.place.state ?
                                        <span style={{marginLeft: 10}}>{this.props.place.state}</span>
                                        : null
                                }
                                {
                                    this.props.place.zip ?
                                        <span style={{marginLeft: 10}}>{this.props.place.zip}</span>
                                        : null
                                }
                            </div>
                        </div>)
                            : null
                        }
                        {
                            this.props.place.description ?(
                                <div>
                                    {this.props.place.description}
                                </div>
                            ) : null
                        }
            </div>
        )
    }
}