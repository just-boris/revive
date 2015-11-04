import 'whatwg-fetch';

export const REQUEST_REPOS = 'REQUEST_REPOS';
export const RECEIVE_REPOS = 'RECEIVE_REPOS';

const endpoint = 'https://api.github.com';

function request(url) {
    return fetch(url).then((res) => {
        return res.json();
    });
}

function requestMock(url) {
    return new Promise((resolve) => {
        console.log('Fake request', url);
        setTimeout(()=> resolve(require('../mocks/repositories')), 1000)
    })
}

function reposRequested(query) {
    return {type: REQUEST_REPOS, query};
}

function reposReceived(repos) {
    return {
        type: RECEIVE_REPOS,
        projects: repos
    }
}

export function fetchProjects(query) {
    return dispatch => {
        dispatch(reposRequested(query));
        return requestMock(endpoint + `/search/repositories?q=${query}&sort=stars&order=desc`)
            .then((data) => dispatch(reposReceived(data.items)));
    }
}
