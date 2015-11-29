import {RESET_QUERY, REQUEST_REPOS, RECEIVE_REPOS} from '../actions/projects';

function update(state, newState) {
    return Object.assign({}, state, newState);
}

export default function(state = {projects: [], page: 0}, action = {}) {
    switch(action.type) {
        case RESET_QUERY:
            return  update(state, {
                projects: [],
                page: 0,
                projectsDone: false,
                query: action.query
            });
        case REQUEST_REPOS:
            return update(state, {projectsLoading: true});
        case RECEIVE_REPOS:
            const projects = [...state.projects, ...action.projects];
            return update(state, {
                projects,
                page: state.page + 1,
                projectsLoading: false,
                projectsDone: projects.length >= action.total
            });
        default:
            return state;
    }
}
