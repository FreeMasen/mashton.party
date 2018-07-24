import * as React from  'react';
import { Rsvp } from '../models/party';
import Colors from '../services/colors';
import Input from './input';

interface RsvpListProps {
    rsvpItem: string;
    rsvpList: Array<Rsvp>;
    displayRsvpList: boolean;
    displayRsvpForm: boolean;
    rsvpFormName?: string;
    rsvpFormBringing?: string;
}

interface RsvpListState {

}

export default class RsvpList extends React.Component<RsvpListProps, RsvpListState> {
    render() {
        let list = this.props.rsvpList.length > 0 ? this.props.rsvpList : [new Rsvp(-1, " ", false, " ")];
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
                    {this.props.displayRsvpList ? list.map(r => {
                        return (<RsvpListItem
                            key={`rsvp-list-item-${r.id}`}
                            name={r.name}
                            bringing={r.bringing}
                        />)
                    })
                    : null}
                    {this.props.displayRsvpForm ? 
                        <RsvpHeader
                            lhs="Your Name"
                            rhs={this.props.rsvpItem != undefined ? `Your ${this.props.rsvpItem}` : undefined}
                        />
                    : null}
                    {this.props.displayRsvpForm ? 
                        <RsvpForm
                            name={this.props.rsvpFormName}
                            bringing={this.props.rsvpFormBringing}
                        />
                    : null}
                </tbody>
                </table>
            </div>
        );
    }
}

interface RsvpListItemProps {
    name: string;
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
    bringing?: string;
}
interface RsvpFormState {

}

class RsvpForm extends React.Component<RsvpFormProps, RsvpFormState> {
    nameInput: HTMLInputElement;
    bringingInput: HTMLInputElement;
    render() {
        return (
            <tr className="rsvp-form" style={{marginTop: 10}}>
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
                    >Save</button>
                </td>
            </tr>
        );
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
                >{this.props.lhs}</th>
                {
                    this.props.rhs !== undefined ?
                    <th>{this.props.rhs}</th>
                    : null
                }
            </tr>
        )
    }
}
