import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';
import createHistory from './history';
import { reduxReactRouter, routerStateReducer } from 'redux-router';

import reduceProjects from './reducers/projects';
import reduceToken from './reducers/token';

const reducers = combineReducers({
    projects: reduceProjects,
    token: reduceToken,
    router: routerStateReducer
});

const createAsyncStore = compose(
    persistState(['token'], {key: 'revive_store'}),
    applyMiddleware(thunkMiddleware),
    reduxReactRouter({createHistory})
)(createStore);

export default createAsyncStore(reducers);
