import { Observable } from 'rxjs/observable';

import 'rxjs/add/operator/map';

export const reducer = (actions$: Observable<any>) => {
    let store = 0;
    return actions$.map(v => {
        if (v === '+') {
            return ++store;
        } else {
            return --store;
        }
    });
} 