import * as React from 'react';
import * as ReactDom from 'react-dom';
import PartyList from './components/eventList';
import Colors from './services/colors';
import Path from './services/path';
import Party from './models/party';
import Data from './services/data';
class AppState {
    constructor(
        public isLoading = true,
        public parties: Array<Party> = []
    ){}
}
class App extends React.Component<{}, AppState> {
    data: Data;
    constructor(props) {
        super(props);
        if (!history.state) {
            Path.init();
        }
        console.log('rendering App');
        this.state = new AppState();
        this.data = new Data();
        this.data.getPartyList().then(parties => this.setState({parties}))
    }

    render() {
        return (
            <div>
                <header
                    style={{
                        width: '100%',
                        height: 75,
                        display: 'flex',
                        flexFlow: 'row',
                        alignItems: 'center',
                        alignContent: 'center',
                        background: Colors.primary,
                        color: Colors.white,
                        fontSize: 48,
                    }}
                    dangerouslySetInnerHTML={{__html: '<marquee>party party party party party party party party party party party party party party party party party party party party party party party party party party party party party party party party party party party party party party party party party party party party party party party party party party party party party party party</marquee>'}}
                >
                    
                </header>
                <main>
                    <PartyList 
                        parties={this.state.parties}
                    />
                </main>
            </div>
        );
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