import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createHistory from './history';
import { reduxReactRouter, routerStateReducer } from 'redux-router';

import reduceProjects from './reducers/projects';

const reducers = combineReducers({
    projects: reduceProjects,
    router: routerStateReducer
});

const createAsyncStore = compose(
    applyMiddleware(thunkMiddleware),
    reduxReactRouter({createHistory})
)(createStore);

export default createAsyncStore(reducers);
