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
/**The character limit for the party summary's title*/
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
        let title = this.formatTitle(party.name);
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
                    <h2 style={{color: (this.state.hover ? Colors.accent : Colors.white).toString()}}>{title}</h2>
                    <span style={{color: (this.state.hover ? Colors.accent : Colors.white).toString()}}>{party.date.format('ddd M/D/YYYY h:mm a')}</span>
                    <h3 style={{color: (this.state.hover ? Colors.accent : Colors.white).toString()}}>{party.snippet}</h3>
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
    /**format the party's name for displaying */
    formatTitle(title: string): string {
        title = title.trim();
        //if the title is longer than the length
        if (title.length > titleLimit) {
            //truncate it to the limit
            let trunc = title.substr(0, titleLimit);
            //find the last space in the title
            let lastSpace = trunc.lastIndexOf(' ')
            //if there is a space
            if (lastSpace > -1) {
                //trim to that space
                trunc = trunc.substring(0, lastSpace);
            }
            //Add an ellipsis to
            title = `${trunc}...`;
        }
        return title;
    }
}