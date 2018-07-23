import * as React from  'react';
import { Rsvp } from '../models/party';

interface RsvpListProps {
    rsvpItem: string;
    rsvpList: Array<Rsvp>;
}

interface RsvpListState {

}

export default class RsvpList extends React.Component<RsvpListProps, RsvpListState> {
    render() {
        return (
            <div className="rsvp-list">
                {this.props.rsvpList.map(r => {
                    return (
                        <RsvpListItem

                        />
                    )
                })}
            </div>
        );
    }
}

interface RsvpListItemProps {

}

interface RsvpListItemState {

}

class RsvpListItem extends React.Component<RsvpListItemProps, RsvpListItemState> {
    render() {
        return (
            <div>

            </div>
        );
    }
}

class RsvpForm extends React.Component<{}, {}> {
    render() {
        return (
            <div className="rsvp-form">

            </div>
        );
    }
}