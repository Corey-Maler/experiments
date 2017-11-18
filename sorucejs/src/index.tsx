import { View } from './view';
import { reducer } from './reducers';

import { actions } from './action';

import { Application } from './tools';



const App = new Application({
    drivers: [View],
    reducer,
    actions,
    },
    0
);

App.run();