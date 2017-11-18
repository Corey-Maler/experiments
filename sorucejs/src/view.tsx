import * as React from 'react';
import { render } from 'react-dom';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

type fn = (a: any) => void;

class App extends React.Component<{state: any, dispatch: fn}, {}> {
    public render() {
        return (<div>
            <h1>Number {this.props.state}</h1>
            <button onClick={() => this.props.dispatch('+')}>inc</button>
            <button onClick={() => this.props.dispatch('-')}>dec</button>
            <button onClick={() => this.props.dispatch('random')}>random</button>
        </div>);
    }
}

export const View = (state$: Observable<any>) => {
    const d = document.getElementById('root');

    const acts = new Subject<any>();

    const dispatch = (action) => {
        acts.next(action);
    }

    state$.subscribe(state => {
        render(<App state={state} dispatch={dispatch} />, d);
    });

    return acts;
}