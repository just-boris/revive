import 'whatwg-fetch';

export const REQUEST_REPOS = 'REQUEST_REPOS';
export const RECEIVE_REPOS = 'RECEIVE_REPOS';

const endpoint = 'https://api.github.com';

function request(url) {
    return fetch(url).then((res) => {
        return res.json();
    });
}

function requestMock() {
    return new Promise((resolve) => {
        setTimeout(()=> resolve(require('../mocks/repositories')), 1000)
    })
}

function reposRequested() {
    return {type: REQUEST_REPOS};
}

function reposReceived(repos) {
    return {
        type: RECEIVE_REPOS,
        projects: repos
    }
}

export function fetchProjects(query) {
    return dispatch => {
        dispatch(reposRequested());
        return requestMock(endpoint + `/search/repositories?q=${query}&sort=stars&order=desc`)
            .then((data) => dispatch(reposReceived(data.items)));
    }
}
