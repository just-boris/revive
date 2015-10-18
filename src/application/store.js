import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reduceProjects from './reducers/projects';

const createAsyncStore = applyMiddleware(thunkMiddleware)(createStore);

export default createAsyncStore(reduceProjects);
