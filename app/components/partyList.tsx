import * as React from 'react';
import Colors from '../services/colors';
import Text from '../services/text';
import Party from '../models/party';
import PartySummary from './partySummary';
import Path from '../services/path';
interface PartyListProps {
    parties: Array<Party>;
    name: string;
}

export default class PartyList extends React.Component<PartyListProps, {}> {
    render() {
        let events = this.props.parties;
        return (
            <div id="event-list"
                style={{
                    display: 'flex',
                    flexFlow: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    alignContent: 'flex-start',
                    minHeight: 100,
                    color: Colors.accent.toString(),
                }}
            >
                <div className="events-header"
                    style={{
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    <h2 className="events-title">{this.props.name}</h2>
                    <hr
                        style={{
                            width: '90%',
                            margin: 'auto',
                            border: 'none',
                            borderBottom: `1px solid ${Colors.grey}`,
                        }}
                    />
                </div>
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
                                    <PartySummary
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
