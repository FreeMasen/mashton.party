import * as React from 'react';
import * as ReactDom from 'react-dom';
import Dashboard from './components/dashboard';
import Colors from './services/colors';
import Path, { HistoryState } from './services/path';
import Party from './models/party';
import Data from './services/data';
import Dates from './services/dates';
import LoadingSpinner from './components/loadingSpinner';
import PartyDescription from './components/partyDescription';

class AppState {
    constructor(
        public isLoading = true,
        public parties: Array<Party> = [],
        public selectedParty?: Party,
    ){}
}
class App extends React.Component<{}, AppState> {
    data: Data;
    constructor(props) {
        super(props);
        console.log('rendering App');
        this.state = new AppState();
        this.data = new Data();
        this.data.getPartyList().then(parties => this.init(parties));
        Path.registerListener(state => this.routeChanted(state));
    }

    init(parties: Array<Party>) {
        let selectedParty;
        let pathName = Path.partyName();
        console.log('party name: ', pathName);
        if (pathName) {
            selectedParty = parties.find(p => p.name.toLowerCase().replace(/\s/g, '-') == pathName);
        }
        Path.init(selectedParty);
        this.setState({parties, isLoading: false, selectedParty});
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
                    }}
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
            return (<Dashboard
                upcoming={this.state.parties.filter(p => p.date > Dates.tomorrow)}
                past={this.state.parties.filter(p => p.date <= Dates.tomorrow)}
            />)
        }
        return (
            <PartyDescription
                party={this.state.selectedParty}
            />
        )
    }

    routeChanted(partyInfo?: HistoryState) {
        if (partyInfo) {
            this.setState({selectedParty: this.state.parties.find(p => p.id == partyInfo.partyId)});
        } else {
            this.setState({selectedParty: null});
        }
    }

    updateRoute(route: Route, party?: Party) {
        switch (route) {
            case Route.Root:
                Path.root()
            break;
            case Route.Party:
                if (!party) return;
                Path.party(party)
        }
    }
}

enum Route {
    Root,
    Party,
}

ReactDom.render((
    <App />
), document.getElementById('app'))