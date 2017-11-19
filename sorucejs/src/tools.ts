import { BehaviorSubject } from 'rxjs/BehaviorSubject'; 
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';

import { merge } from 'rxjs/observable/merge';

export class Application {
  private state: BehaviorSubject<any>;
  private drivers: any[];
  private reducer: any;
  private actions: any;
  constructor(actions, initialState: any) {
    this.state = new BehaviorSubject<any>(initialState);
    this.actions = actions;
  }

  public run() {
    const actions$ = new Subject<any>();
    const {actions, state} = this.actions(actions$, this.state);
    actions.subscribe(act => actions$.next(act));
    state.subscribe(state => this.state.next(state));
  }
}

export const combine = (...fns) => (actions$, state$) => {
    const rs = fns.map(fn => fn(actions$, state$));
    return {
        actions: merge(...rs.filter(f => f.actions !== undefined).map(f => f.actions)),
        state: merge(...rs.filter(f => f.state !== undefined).map(f => f.state)),
    }
}

export const makeReducer = (s, fn) => (actions$, state$) => {
  return {
    state: actions$.filter(v => {
      if (Array.isArray(s) && Array.isArray(v)) { return  s[0] === v[0]; }
      if (v.constructor === s) { return true; }
      return v === s;
    }).withLatestFrom(state$).map(([act, state]) => { return fn(act, state)}),
  }
}