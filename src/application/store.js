import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/lib/createHashHistory';
import { reduxReactRouter, routerStateReducer } from 'redux-router';

import reduceProjects from './reducers/projects';

const reducers = combineReducers({
    projects: reduceProjects,
    router: routerStateReducer
});

const createAsyncStore = compose(
    applyMiddleware(thunkMiddleware),
    reduxReactRouter({
        createHistory: (options) => createHistory(Object.assign({queryKey: false}, options))
    })
)(createStore);

export default createAsyncStore(reducers);
