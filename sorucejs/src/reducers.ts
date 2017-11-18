import { Observable } from 'rxjs/observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';

import 'rxjs/add/operator/do';

import { merge } from 'rxjs/observable/merge';

export class SetRandomValue {
    constructor(public value: number) {}
}

export type Reducer = (action$: Observable<any>, store$: Observable<any>) => Observable<any>;

export const reducerInc = (actions$: Observable<any>, store$: Observable<any>) => actions$.filter(v => v === '+').withLatestFrom(store$).map(([v, store]) => ++store);
export const reducerDec = (actions$: Observable<any>, store$: Observable<any>) => actions$.filter(v => v === '-').withLatestFrom(store$).map(([v, store]) => --store);
export const reducerAbs = (actions$: Observable<any>, store$: Observable<any>) => actions$.filter(v => v instanceof SetRandomValue).withLatestFrom(store$).map(([val, store$]) => val.value);

const combineReducers = (...reducers: Reducer[]): Reducer => ($action, $store) => merge(...reducers.map(r => r($action, $store)));

export const reducer = combineReducers(
    reducerInc,
    reducerDec,
    reducerAbs
);