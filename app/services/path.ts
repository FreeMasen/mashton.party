import Party from '../models/party';
window.addEventListener('popstate', ev => {
    Path.dispatch(ev.state);
});
/**
* A static class for interacting with the history
* and location APIs
*/
export default class Path {
    /**
     * The single event listener for a change in location
    */
    private static listener: (HistoryState) => void;
    /**
     * Extract the party name from the current location
     */
    static partyName?(): string {
        let target = '/events/';
        let eventsIndex = location.pathname.indexOf(target);
        if (eventsIndex > -1) {
            return location.pathname.substr(eventsIndex + target.length);
        }
    }
    /**
     * Extract the id of our current party from the history state
     */
    static eventId?(): number {
        return history.state.id as number;
    }
    /**
     * Checks if we are currently at the site's root
     */
    static atRoot(): boolean {
        return location.pathname == '' || location.pathname == '/';
    }
    /**
     * Navigate to the page for a party
     * @param p {Party} - The party that should be displayed
     */
    static party(p: Party) {
        let entry = HistoryEntry.fromParty(p);
        history.pushState(entry.state, entry.title, entry.path);
        Path.dispatch(entry.state);
    }
    /**
     * Navigate to the dashboard
     */
    static root() {
        if (Path.atRoot()) {
            return;
        }
        let entry = new HistoryEntry();
        history.pushState(entry.state, entry.title, entry.path);
        Path.dispatch(entry.state);
    }
    /**
     * Initialize the history state
     * @param p {Party} - The party currently listed in the url
     */
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
    /**
     * Register the event listener for location changes
     * @param listener {(HistoryState) => void} - The event listener
     */
    static registerListener(listener: (HistoryState) => void) {
        Path.listener = listener;
    }
    /**
     * Fire an event for changes to the location.
     * @param state {HistoryState} - The new history state.
     */
    static dispatch(state: HistoryState) {
        if (Path.listener) {
            Path.listener(state);
        }
    }
}
/**
 * The history api components
 */
class HistoryEntry {
    constructor(
        public state: HistoryState = new HistoryState(),
        public title: string = 'Party with the Mashtons!',
        public path: string = '/',
    ) {}
    /**
     * Alternative constructor for history updates
     * @param p {Party} - The party for this change
     */
    static fromParty(p: Party): HistoryEntry {
        return new HistoryEntry(
            new HistoryState(p.id, p.name),
            `Party with the Mashtons at ${p.name}`,
            `/events/${p.name.toLowerCase().replace(/\s/g, '-')}`
        )
    }
}
/**
 * The history state.
 */
export class HistoryState {
    constructor(
        public partyId: number = null,
        public partyName: string = null,
    ) {}
}