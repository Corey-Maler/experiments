import { View } from './view';
import { reducer } from './reducers';

import { Application } from './tools';



const App = new Application({
    drivers: [View],
    reducer,
    },
    0
);

App.run();