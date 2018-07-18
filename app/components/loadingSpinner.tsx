import * as React from 'react';
import Colors from '../services/colors';
export default class LoadingSpinner extends React.Component {
    render() {
        return (
            <div
                className="spinner-overlay"
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: 10,
                    display: 'flex',
                    flexFlow: 'column',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    background: Colors.grey.withOpacity(0.25).toString(),
                }}
            >
                <div id="spinner">
                    {spinner()}
                    {spinner()}
                </div>
            </div>
        )
    }
}

const spinner = () => (<div className="spinner-inner"/>);