import * as React from 'react';
import * as ReactDom from 'react-dom';
import Dashboard from './components/dashboard';
import Colors from './services/colors';
import Path, { HistoryState } from './services/path';
import Party from './models/party';
import Guest from './models/user';
import Data from './services/data';
import Dates from './services/dates';
import Rsvp from './models/rsvp';
import LoadingSpinner from './components/loadingSpinner';
import PartyDescription from './components/partyDescription';

class AppState {
    constructor(
        public isLoading = true,
        public parties: Array<Party> = [],
        public selectedParty?: Party,
        public guest?: Guest,
    ){}
}

class App extends React.Component<{}, AppState> {
    data: Data;
    constructor(props) {
        super(props);
        this.state = new AppState();
        this.data = new Data();
        this.data.getPartyList().then(parties => this.init(parties));
        Path.registerListener(state => this.routeChanged(state));
    }

    async init(parties: Array<Party>) {
        let selectedParty;
        let pathName = Path.partyName();
        if (pathName) {
            selectedParty = parties.find(p => p.name.toLowerCase().replace(/\s/g, '-') == pathName);
        }
        Path.init(selectedParty);
        let guest = await this.data.getUserForInvite().then(u => u).catch(e => {
            console.error('error getting guest information', e);
            return null;
        });
        this.setState(() => {
            return {parties, isLoading: false, selectedParty, guest}
        });
    }

    render() {
        return (
            <div
                style={{
                    color: Colors.black.toString(),
                }}
            >
                <header
                    style={{
                        width: '100%',
                        height: 75,
                        display: 'flex',
                        flexFlow: 'row',
                        alignItems: 'center',
                        alignContent: 'center',
                        background: Colors.primary.toString(),
                        color: Colors.white.toString(),
                        fontSize: 48,
                        cursor: 'pointer',
                    }}
                    onClick={_ => Path.root()}
                >
                    <div id="header-animation-container"
                        style={{
                            width: '100%',
                            height: '100%',
                            textAlign: 'center',
                            flexFlow: 'row',
                            alignItems: 'center',
                            alignContent: 'center',
                        }}
                    >
                        <h1 className="header-text">Party with the Mashtons!</h1>
                    </div>
                </header>
                <main>
                    {this.pickContents()}
                </main>
            </div>
        );
    }

    pickContents(): JSX.Element {
        if (this.state.isLoading) {
            return (
                <LoadingSpinner />
            )
        }

        if (Path.atRoot()) {
            console.log('atRoot', this.state);
            let userParties = this.state.parties.filter(p => (this.state.guest ? this.state.guest.invitedTo : []).indexOf(p.id) > -1);
            let upcoming = userParties.filter(p => p.date > Dates.tomorrow);
            let past = userParties.filter(p => p.date <= Dates.tomorrow);
            return <Dashboard
                upcoming={upcoming}
                past={past}
            />
        }
        if (this.state.selectedParty && this.state.guest) {
            let userRsvp = (this.state.selectedParty.rsvpList || []).find(r => r.guestId == this.state.guest.id)
            return <PartyDescription
                    party={this.state.selectedParty}
                    userRsvp={userRsvp}
                    userRsvpSaveHandler={rsvp => this.saveRsvp(rsvp)}
                />
        }
        if (!this.state.guest) {
            Path.root();
            return <Dashboard
                upcoming={[]}
                past={[]}
            />
        }
    }

    routeChanged(partyInfo?: HistoryState) {
        window.scroll(0,0);
        if (partyInfo) {
            this.setState({selectedParty: this.state.parties.find(p => p.id == partyInfo.partyId)});
        } else {
            this.setState({selectedParty: null});
        }
    }

    async saveRsvp(rsvp: Rsvp) {
        let newState = {parties: await this.data.postUserRsvp(rsvp)} as any;
        this.setState(prev => {
            if (prev.selectedParty) {
                newState.selectedParty = newState.parties.find(p => prev.selectedParty.id == p.id);
            }
            console.log('updating after rsvp save', newState);
            return newState;
        })
    }
}

ReactDom.render((
    <App />
), document.getElementById('app'))