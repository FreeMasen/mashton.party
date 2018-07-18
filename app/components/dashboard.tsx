import * as React from 'react';
import Party from '../models/party';
import PartyList from './eventList';
interface DashboardProps {
    upcoming: Array<Party>;
    past: Array<Party>;
}
interface DashboardState {

}
export default class Dashboard extends React.Component<DashboardProps, DashboardState> {
    render() {
        return (
            <div id="upcoming-parties">
                <PartyList
                    parties={this.props.upcoming}
                    name="Upcoming"
                />
                <PartyList
                    parties={this.props.past}
                    name="Past"
                />
            </div>
        );
    }
}