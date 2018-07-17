import * as React from 'react';
import Colors from '../services/colors';
import Path from '../services/path';
import Party from '../models/party';
interface PartyComponentProps {
    party: Party;
}
interface PartyComponentState {
    hover: boolean;
    expanded: boolean;
}
export default class PartyComponent extends React.Component<PartyComponentProps, PartyComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            expanded: Path.eventId() == props.party.id,
        }
    }
    render() {
        let {party} = this.props;
        return (
            <div className="event-list-item"
                style={{
                    width: 250,
                    height: 300,
                    boxShadow: this.state.hover ? `1px 1px 1px 1px ${Colors.grey}` :
                                                    `1px 1px 1px 1px ${Colors.accent}`,
                    transform: this.state.hover ? 'translate(-1px, -1px)' : null,
                    margin: 5,
                    color: this.state.hover ? Colors.primary : Colors.black,
                    textAlign: 'center',
                    display: 'flex',
                    flexFlow: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignContent: 'flex-start',
                    borderRadius: '15px',
                }}
                onMouseEnter={_ => this.setState({hover: true})}
                onMouseLeave={_ => this.setState({hover: false})}
            >
                <div className="event-list-item-header">
                    <h2>{party.name}</h2>
                    <h3>{party.date.format('ddd M/D/YYYY h:mm a')}</h3>
                </div>
                <div className="event-list-item-image"
                    style={{
                        width: "100%",
                        height: 235,
                        marginBottom: 15
                    }}
                >
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: Colors.black
                    }}
                    />
                </div>
            </div>
        )
    }

    get style(): React.CSSProperties {
        return this.state.expanded ?
            this.expandedStyle :
            this.collapsedStyle
    }
    get expandedStyle(): React.CSSProperties {
        return {}
    }
    get collapsedStyle(): React.CSSProperties {
        return this.state.hover ?
            this.collapsedHoverStyle :
            {}
    }
    get collapsedHoverStyle(): React.CSSProperties {
        return {}
    }
}