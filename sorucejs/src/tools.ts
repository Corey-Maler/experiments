import { BehaviorSubject } from 'rxjs/BehaviorSubject'; 
import { Subject } from 'rxjs/Subject';

import { merge } from 'rxjs/observable/merge';

export interface AppProps {
  drivers: any[];
  actions?: any;
  reducer: any;
}

export class Application {
  private state: BehaviorSubject<any>;
  private drivers: any[];
  private reducer: any;
  private actions: any;
  constructor(props: AppProps, initialState: any) {
    this.drivers = props.drivers;
    this.reducer = props.reducer;
    this.state = new BehaviorSubject<any>(initialState);
    this.actions = props.actions;
  }

  public run() {
    const actions$ = new Subject<any>();
    merge(...this.drivers.map(d => d(this.state))).subscribe(act => actions$.next(act));
    this.reducer(actions$, this.state).subscribe(state => this.state.next(state));
    this.actions(actions$, this.state).subscribe(action => actions$.next(action));
  }
}