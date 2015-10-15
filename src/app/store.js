import { createStore, applyMiddleware } from 'redux';
import awaitPromise from 'redux-promise';

import reduceProjects from './reducers/projects';

const createAsyncStore = applyMiddleware(awaitPromise)(createStore);

export default createAsyncStore(reduceProjects);
