import * as React from 'react';
import Party from '../models/party';
interface PartyDescriptionProps {
    party: Party;
}
interface PartyDescriptionState {

}
export default class PartyDescription extends React.Component<PartyDescriptionProps, PartyDescriptionState> {
    render() {
        return (
            <div>
                <h2>{this.props.party.name}</h2>
            </div>
        )
    }
}