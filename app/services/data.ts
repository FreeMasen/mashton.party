import Party from '../models/party';
import Rsvp from '../models/rsvp';
import User from '../models/user';
import Path from './path';

/**The network/data service */
export default class Data {
    getPartyList(): Promise<Array<Party>> {
        Path.inviteId();
        return fetch('/api/parties')
            .then(r => r.json())
            .then((json: Array<any>) =>
                json.map(p => Party.fromJson(p)))
    }
    getRsvpsForUser(): Promise<Array<number>> {
        let id = localStorage.getItem('user_token');
        if (!id) return Promise.reject('unknown user');
        return fetch(`/api/rsvps/${id}`).then(r => r.json())
    }
    getUserForInvite(): Promise<User> {
        let inviteId = Path.inviteId();
        if (!inviteId) return Promise.resolve(new User())//Promise.reject('no invite id available');
        return fetch(`/api/user/invite/${inviteId}`)
            .then(r => r.json())
            .then(json => {
                console.log('got user from invite', json);
                localStorage.setItem('user_token', json.token);
                return User.fromJson(json);
            })
    }
    postUserRsvp(rsvp: Rsvp): Promise<Array<Party>> {
        return fetch('/api/rsvp', {method: 'POST', body: JSON.stringify(rsvp), headers: {'Content-Type': 'application/json'}})
                .then(r => r.json())
                .then(j => j.map(Party.fromJson));
    }
}