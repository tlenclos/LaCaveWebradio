import {applyMiddleware, createStore, compose} from 'redux';
import devTools from 'remote-redux-devtools';

import middleware from './middleware';
import rootReducer from './reducer';

const enhancer = compose(
    applyMiddleware(...middleware),
    devTools()
);

// create the store
const store = createStore(
    rootReducer,
    {},
    enhancer
);

export default store;
