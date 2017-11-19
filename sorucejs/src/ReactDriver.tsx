import * as React from 'react'
import { object } from 'prop-types'

import { render } from 'react-dom';

import { Subject } from 'rxjs/Subject';

// TODO: make it possible to insert it as ReactComponent
export function ReactDriver(ReactElement, element, contextKey = 'sorucejs') {
    return function (actions$, store$) {
        const acts = new Subject<any>();

        const dispatch = (act) => {
            acts.next(act);
        }

        class Provider extends React.Component<{}, {}> {
            static childContextTypes = {
                [contextKey]: object.isRequired,
            }
            getChildContext() {
                return { [contextKey]: { actions$, store$, dispatch } }
            }

            render() {
                return <ReactElement />
            }
        }

        render(<Provider />, element);

        return {
            actions: acts,
        }
    }
}

export const Connect = (propsMap) => (Component) => {
    class ConnectComponent extends React.Component<{}, any> {

        componentWillMount() {
            const ctx = this.context.sorucejs;
            this.setState({
                dispatch: ctx.dispatch,
            });

            ctx.store$.subscribe(store => {
                this.setState(propsMap(store));
            });
        }

        static contextTypes = {
            sorucejs: object.isRequired,
        }

        public render() {
            return <Component {...this.state} />
        }
    }

    return ConnectComponent;
}