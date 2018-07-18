import Party from '../models/party';
window.addEventListener('popstate', ev => {
    console.log('popstate', ev);
    Path.dispatch(ev.state);
})
export default class Path {
    private static listener: (HistoryState) => void;
    static partyName?(): string {
        let target = '/events/';
        let eventsIndex = location.pathname.indexOf(target);
        if (eventsIndex > -1) {
            return location.pathname.substr(eventsIndex + target.length);
        }
    }
    static eventId?(): number {
        return history.state.id as number;
    }
    static atRoot(): boolean {
        return location.pathname == '' || location.pathname == '/';
    }
    static party(p: Party) {
        let entry = HistoryEntry.fromParty(p);
        history.pushState(entry.state, entry.title, entry.path);
        Path.dispatch(entry.state);
    }
    static root() {
        let entry = new HistoryEntry();
        history.pushState(entry.state, entry.title, entry.path);
        Path.dispatch(entry.state);
    }
    static init(p?: Party) {
        let entry;
        if (p) {
            entry = HistoryEntry.fromParty(p);
        } else {
            entry = new HistoryEntry();
        }
        history.replaceState(entry.state, entry.title, entry.path);
        Path.dispatch(entry.state);
    }
    static registerListener(listener: (HistoryState) => void) {
        Path.listener = listener;
    }
    static dispatch(state: HistoryState) {
        if (Path.listener) {
            Path.listener(state);
        }
    }
}

class HistoryEntry {
    constructor(
        public state: HistoryState = new HistoryState(),
        public title: string = 'Party with the Mashtons!',
        public path: string = '/',
    ) {}
    static fromParty(p: Party): HistoryEntry {
        return new HistoryEntry(
            new HistoryState(p.id, p.name),
            `Party with the Mashtons at ${p.name}`,
            `/events/${p.name.toLowerCase().replace(/\s/g, '-')}`
        )
    }
}

export class HistoryState {
    constructor(
        public partyId: number = null,
        public partyName: string = null,
    ) {}
}