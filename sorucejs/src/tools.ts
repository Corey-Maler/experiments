import { BehaviorSubject } from 'rxjs/BehaviorSubject'; 

import { merge } from 'rxjs/observable/merge';

export interface AppProps {
  drivers: any[];
  actions?: any[];
  reducer: any;
}

export class Application {
  private state: BehaviorSubject<any>;
  private drivers: any[];
  private reducer: any;
  constructor(props: AppProps, initialState: any) {
    this.drivers = props.drivers;
    this.reducer = props.reducer;
    this.state = new BehaviorSubject<any>(initialState);
  }

  public run() {
    const actions$ = merge(...this.drivers.map(d => d(this.state)));
    this.reducer(actions$).subscribe(state => this.state.next(state));
  }
}