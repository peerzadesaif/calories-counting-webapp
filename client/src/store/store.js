/* eslint-disable */
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import rootReducers from './reducers';

// eslint-disable-next-line
import { connectRouter, routerMiddleware } from 'connected-react-router';
import history from './history';

// End React Redux Router
const initialState = {};

const middleware = [
    thunk,
    routerMiddleware(history),
    // customMiddleWare
];

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    process.env.NODE_ENV === 'development' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : a => a
);
// eslint-disable-next-line
const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    ...rootReducers
});;

const store = createStore(
    // connectRouter(history)(rootReducer),
    rootReducer(history),
    initialState,
    composedEnhancers
);

export default store;
