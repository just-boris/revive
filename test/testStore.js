import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reduceProjects from 'application/reducers/projects';
import reduceToken from 'application/reducers/token';

const reducers = combineReducers({
    projects: reduceProjects,
    token: reduceToken
});

const createTestStore = compose(
    applyMiddleware(thunkMiddleware)
)(createStore);

export default function() {
    return createTestStore(reducers);
}
