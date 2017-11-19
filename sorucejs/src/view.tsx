import * as React from 'react';
import { render } from 'react-dom';

import { Connect, ReactDriver } from './ReactDriver';

class DisplayPure extends React.Component<{result: any}, {}> {
    public render() {
        return <h1>Display: {this.props.result}</h1>;
    }
}

class ButtonsPure extends React.Component<{dispatch: any}, {}> {
    public render() {
        return (<div>
            <button onClick={() => this.props.dispatch('+')}>inc</button>
            <button onClick={() => this.props.dispatch('-')}>dec</button>
            <button onClick={() => this.props.dispatch('random')}>random</button>
            <button onClick={() => this.props.dispatch('load')}>load</button>
        </div>);
    }
}

const Display = Connect((a) => ({result: a}))(DisplayPure);
const Buttons = Connect((a) => {{}})(ButtonsPure);

class App extends React.Component<{}, {}> {
    public render() {
        return (<div>
            <Display />
            <Buttons />
       </div>);
    }
}

export const View = ReactDriver(App, document.getElementById('root'));