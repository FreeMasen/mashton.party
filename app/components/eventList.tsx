import * as React from 'react';
import Colors from '../services/colors';
import Text from '../services/text';
import Party from '../models/party';
import PartyComponent from './party';
import Path from '../services/path';
interface PartyListProps {
    parties: Array<Party>;
}

export default class PartyList extends React.Component<PartyListProps, {}> {
    render() {
        console.log('rendering EventList', this.props);
        let events = this.props.parties;
        return (
            <div id="event-list">
                <div className="events-container"
                    style={{
                        display: 'flex',
                        flexFlow: 'row wrap',
                        justifyContent: 'space-around',
                        alignItems: 'flex-start',
                        alignContent: 'flex-start',
                    }}
                >
                    {events.map((p, i) => {
                        return (
                            <div key={`event-list-item-${i}`}>
                                <div 
                                    style={{textDecoration: 'none'}}
                                    onClick={_ => Path.party(p)}
                                >
                                    <PartyComponent
                                        party={p}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
