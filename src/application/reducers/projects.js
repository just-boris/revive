import {REQUEST_REPOS, RECEIVE_REPOS} from '../actions/projects';

function update(state, newState) {
    return Object.assign({}, state, newState);
}

export default function(state = {}, action = {}) {
    switch(action.type) {
        case REQUEST_REPOS:
            return  update(state, {projects: [], projectsLoading: true});
        case RECEIVE_REPOS:
            return update(state, {projects: action.projects, projectsLoading: false});
        default:
            return state;
    }
}
