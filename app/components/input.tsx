import * as React from 'react';
import Colors from '../services/colors';
interface InputProps {
    id?: string;
    name?: string;
    type?: string;
    className?: string;
    style?: React.CSSProperties;
    defaultValue?: string;
    refFn?: (i) => void;
}
interface InputState {
    focused: boolean;
}

export default class Input extends React.Component<InputProps, InputState> {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
        };
    } 
    render() {
        return (
            <div
                style={{
                    width: this.props.style ? this.props.style.width : undefined,
                    height: this.props.style ? this.props.style.height : undefined,
                }}
            >
                <input 
                    id={this.props.id}
                    name={this.props.name}
                    type={this.props.type}
                    className={this.props.className}
                    style={Object.assign({
                        border: 'none',
                        background: Colors.white.toString(),
                    },this.props.style)}
                    defaultValue={this.props.defaultValue}
                    ref={this.props.refFn ? i => this.props.refFn(i) : null}
                    onFocus={_ => this.setState({focused: true})}
                    onBlur={_ => this.setState({focused: false})}
                />
                <div className="hr-block"
                    style={{
                        position: 'relative',
                        height: 2,
                    }}
                >
                <hr 
                    style={{
                        width: '100%',
                        border: 'none',
                        borderBottom: `1px solid ${Colors.grey.toString()}`,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1,
                        height: 0,
                        margin: 0,
                        padding: 0,
                    }}
                />
                <hr
                    style={{
                        width: this.props.style ? this.props.style.width : '100%',
                        border: 'none',
                        borderBottom: `1px solid ${Colors.accent.toString()}`,
                        transform: `scale(${this.state.focused ? 1 : 0})`,
                        transformOrigin: 'center center',
                        transition: 'all 500ms linear',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 2,
                        height: 0,
                        margin: 0,
                        padding: 0,
                    }}
                />
                </div>
            </div>
        )
    }
}