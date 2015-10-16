import {RECEIVE_REPOS} from '../actions/projects';

export default function(state = {}, action = {}) {
    switch(action.type) {
        case RECEIVE_REPOS:
            return Object.assign({}, state, {projects: action.projects});
        default:
            return state;
    }
}
