import { View } from './view';
import { reducers } from './reducers';

import { actions } from './action';

import { Application, combine, makeReducer } from './tools';

const App = new Application(combine(actions, View, reducers), 0);

App.run();