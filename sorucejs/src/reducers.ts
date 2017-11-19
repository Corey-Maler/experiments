import { makeReducer, combine } from './tools';

export const incReducer = (action, state) => ++state;
export const decReducer = (action, state) => --state;
export const absReducer = ([action, value], state) => value;

export const reducers = combine(
    makeReducer('+', incReducer),
    makeReducer('-', decReducer),
    makeReducer(['setAbsolute'], absReducer),
)