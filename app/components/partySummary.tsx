import * as React from 'react';
import Colors from '../services/colors';
import Path from '../services/path';
import Party from '../models/party';
interface PartySummaryProps {
    party: Party;
}
interface PartySummaryState {
    hover: boolean;
}
const titleLimit = 17;
export default class PartySummary extends React.Component<PartySummaryProps, PartySummaryState> {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
        }
    }
    render() {
        let {party} = this.props;
        let title = party.name.trim();
        if (title.length > titleLimit) {
            let trunc = title.substr(0, titleLimit);
            let lastSpace = trunc.lastIndexOf(' ')
            if (lastSpace > -1) {
                trunc = trunc.substring(0, lastSpace);
            }
            title = `${trunc}...`;
        }
        return (
            <div className="event-list-item"
                style={{
                    width: 250,
                    height: 300,
                    boxShadow: this.state.hover ? `1px 1px 1px 1px ${Colors.grey.toString()}` :
                                                    `1px 1px 1px 1px ${Colors.accent.toString()}`,
                    transform: this.state.hover ? 'translate(-1px, -1px)' : null,
                    margin: 5,
                    color: (this.state.hover ? Colors.primary : Colors.black).toString(),
                    textAlign: 'center',
                    display: 'flex',
                    flexFlow: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignContent: 'flex-start',
                    borderRadius: '15px',
                    cursor: 'pointer',
                }}
                onMouseEnter={_ => this.setState({hover: true})}
                onMouseLeave={_ => this.setState({hover: false})}
            >
                <div className="event-list-item-header"
                    style={{
                        width: '100%',
                        borderRadius: '8px 8px 0 0',
                        background: Colors.primary.toString(),
                        color: (this.state.hover ? Colors.accent : Colors.white).toString(),
                    }}
                >
                    <h2>{title}</h2>
                    <span>{party.date.format('ddd M/D/YYYY h:mm a')}</span>
                    <h3>{party.snippet}</h3>
                </div>
                <div className="event-list-item-image"
                    style={{
                        width: "100%",
                        height: 235,
                        marginBottom: 15,
                        overflow: 'hidden',
                        backgroundImage: `url(${party.imagePath})`,
                        backgroundSize: 'cover',
                    }}
                >
                </div>
            </div>
        )
    }
}