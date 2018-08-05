import * as React from 'react';
import Colors from '../services/colors';
interface CheckboxProps {
    initiallyChecked: boolean;
    style?: React.CSSProperties;
    disabled?: boolean;
}
interface CheckboxState {
    checked: boolean;
}

export default class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.initiallyChecked
        };
    }
    componentWillReceiveProps(props) {
        console.log('Checkbox.componentWillReceiveProps', props);
        if (this.state.checked != props.initiallyChecked) {
            this.setState({checked: props.initiallyChecked});
        }
    }
    render() {
        return (
            <div
                style={Object.assign({}, {
                    borderRadius: 5,
                    background: Colors.accent.toString(),
                    color: Colors.primary.toString(),
                    width: 25,
                    height: 25,
                    textAlign: 'center',
                    cursor: 'default',

                }, this.props.style)}
                onClick={_ => !this.props.disabled ? this.onClick() : void(0)}
            >
                <span
                    style={{
                        display: 'block',
                        lineHeight: '29px',
                        fontSize: '16pt',
                    }}
                >{this.state.checked ? '✓' : ''}</span>
            </div>
        )
    }
    onClick() {
        this.setState((prev) => {
            return {
                checked: !prev.checked
            }
        })
    }

    get checked(): boolean {
        return this.state.checked;
    }
}
