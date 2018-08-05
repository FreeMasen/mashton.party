import * as React from  'react';
import Rsvp from '../models/rsvp';
import Colors from '../services/colors';
import Input from './input';
import Checkbox from './checkbox';

interface RsvpListProps {
    rsvpItem: string;
    rsvpList: Array<Rsvp>;
    displayRsvpList: boolean;
    displayRsvpForm: boolean;
    userRsvp?: Rsvp;
    userRsvpSaveHandler: (rsvp: Rsvp) => void;
}

interface RsvpListState {

}

export default class RsvpList extends React.Component<RsvpListProps, RsvpListState> {
    render() {
        console.log('RsvpList', this.props.rsvpList);
        let list = this.props.rsvpList.length > 0 ? this.props.rsvpList : [new Rsvp(-1, " ", false, -1, " ")];
        return (
            <div className="rsvp-list"
                style={{
                    display: 'flex',
                    flexFlow: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    alignContent: 'flex-start',
                }}
            >
                <table
                    style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                    }}
                >
                <tbody>
                    {this.props.displayRsvpList ?
                        <RsvpHeader
                            lhs="Name"
                            rhs={this.props.rsvpItem}
                        />
                    : null}
                    {list.map(r => {
                        return (<RsvpListItem
                            key={`rsvp-list-item-${r.id}`}
                            name={r.name}
                            attending={r.attending}
                            bringing={r.bringing}
                            isBlank={this.props.rsvpList.length < 1}
                        />)
                    })}
                    {this.props.displayRsvpForm ?
                        <RsvpHeader
                            lhs="Your Name"
                            rhs={this.props.rsvpItem != undefined ? `Your ${this.props.rsvpItem}` : undefined}
                        />
                    : null}
                    {this.props.displayRsvpForm ? 
                        <RsvpForm
                            name={this.props.userRsvp ? this.props.userRsvp.name : ''}
                            bringing={this.props.userRsvp ? this.props.userRsvp.bringing : ''}
                            attending={this.props.userRsvp ? this.props.userRsvp.attending : false}
                            saveHandler={(n, a, b) => this.saveUserRsvp(n, a, b)}
                        />
                    : null}
                </tbody>
                </table>
            </div>
        );
    }

    saveUserRsvp(name: string, attending: boolean, bringing?: string) {
        let newRsvp = Object.assign({}, this.props.userRsvp, {name, attending, bringing});
        this.props.userRsvpSaveHandler(newRsvp);
    }
}

interface RsvpListItemProps {
    isBlank: boolean;
    name: string;
    attending: boolean;
    bringing?: string;
}

interface RsvpListItemState {

}

class RsvpListItem extends React.Component<RsvpListItemProps, RsvpListItemState> {
    render() {
        return (
            <tr
                style={{
                    borderBottom: `1px solid ${Colors.grey.toString()}`,
                    height: 25
                }}
            >
                <td>
                    {this.props.isBlank ? null :
                        <Checkbox
                            initiallyChecked={this.props.attending}
                            style={{
                                margin: 'auto'
                            }}
                        />
                    }
                </td>
                <td
                    style={{
                        height: 25
                    }}
                >{this.props.name}</td>
                {this.props.bringing !== undefined ? <td style={{
                    height: 25
                }}>{this.props.bringing}</td> : null}
            </tr>
        );
    }
}
interface RsvpFormProps {
    name: string;
    attending: boolean;
    bringing?: string;
    saveHandler: (name: string, attending: boolean, bringing?: string) => void;
}
interface RsvpFormState {

}

class RsvpForm extends React.Component<RsvpFormProps, RsvpFormState> {
    nameInput: HTMLInputElement;
    bringingInput: HTMLInputElement;
    attendingInput: Checkbox;
    render() {
        return (
            <tr className="rsvp-form" style={{marginTop: 10}}>
            <td>
                <Checkbox
                    initiallyChecked={this.props.attending}
                    ref={i => this.attendingInput = i}
                    style={{
                        margin: 'auto',
                    }}
                />
            </td>
                <td>
                    <Input
                        type="text"
                        refFn={i => this.nameInput = i}
                        defaultValue={this.props.name}
                        style={{
                            width: '100%',
                        }}
                    />
                </td>
                {this.props.bringing !== undefined ? 
                    <td>
                        <Input 
                            type="text"
                            refFn={i => this.bringingInput = i}
                            style={{
                                width: '100%',
                            }}
                            defaultValue={this.props.bringing}
                        />
                    </td>
                : null}
                <td>
                    <button type="button"
                            style={{
                                padding: '5px 10px',
                                borderRadius: '15px',
                                border: 'none',
                                background: Colors.black.toString(),
                                color: Colors.white.toString(),
                                boxShadow: `1px 1px 1px 1px ${Colors.grey.toString()}`,
                                fontSize: '15pt',
                            }}
                            onClick={_ => this.save()}
                    >Save</button>
                </td>
            </tr>
        );
    }

    save() {
        let name = this.nameInput ? this.nameInput.value : this.props.name
        let attending = this.attendingInput ? this.attendingInput.checked : this.props.attending;
        let bringing = this.bringingInput ? this.bringingInput.value : this.props.bringing;
        this.props.saveHandler(name, attending, bringing);
    }
}
interface RsvpHeaderProps {
    lhs: string;
    rhs?: string;
}
interface RsvpHeaderState {

}

export class RsvpHeader extends React.Component<RsvpHeaderProps, RsvpHeaderState> {
    render() {
        return (
            <tr
                style={{
                    borderBottom: `2px solid ${Colors.grey.toString()}`,
                    textAlign: 'left',
                }}
            >
                <th
                    style={{paddingTop: 10}}
                >Attending</th>
                <th
                style={{paddingTop: 10}}>{this.props.lhs}</th>
                {
                    this.props.rhs !== undefined ?
                    <th
                    style={{paddingTop: 10}}>{this.props.rhs}</th>
                    : null
                }
            </tr>
        )
    }
}
