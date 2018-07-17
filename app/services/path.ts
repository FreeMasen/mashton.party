import Party from '../models/party';
export default class Path {
    static eventId?(): number {
        return history.state.id as number;
    }
    static atRoot(): boolean {
        return history.state.id === null;
    }
    static party(p: Party) {
        let title = `Party with the Mashtons at ${p.name}`;
        let state = {partyId: p.id};
        let path = `/events/${p.name.replace(/\s/g, '-').toLowerCase()}`;
        history.pushState(state, title, path);
    }
    static root() {
        let title = 'Party with the Mashtons!';
        let state = {partyId: null};
        let path = '/';
        history.pushState(state, title, path);
    }
    static init() {
        history.replaceState({partyId: null}, 'Party with the Mashtons!', '/')
    }
}