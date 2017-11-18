import { Observable } from 'rxjs/observable';

import { SetRandomValue } from './reducers';

export const actions = (actions$: Observable<any>, store$: Observable<any>) => actions$.filter(v => v === 'random').withLatestFrom(store$).map(_ => new SetRandomValue(3));