import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

const logger = createLogger();

// define store middlewares as an array
export default [
    thunkMiddleware,
    promiseMiddleware,
];
