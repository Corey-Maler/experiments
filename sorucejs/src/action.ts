import { Observable } from 'rxjs/observable';


import { combine } from './tools';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import { of as Of } from 'rxjs/observable/of';

import { merge } from 'rxjs/observable/merge';

export const act = (actions$: Observable<any>, store$: Observable<any>) => ({ actions:  actions$.filter(v => v === 'random').withLatestFrom(store$).map(_ => ['setAbsolute', 3])});

export const rc = (actions$: Observable<any>, store$: Observable<any>) => ({
    state: actions$.filter(v => v === 'load').do(v => console.log('LOAD~!')).withLatestFrom(store$).flatMap(v => merge(Of('LOADING'), Of(Math.random()).delay(1000))).do(a => console.log('after flatMap', a ))
});

export const actions = combine(act, rc);