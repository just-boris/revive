import 'whatwg-fetch';

export const REQUEST_REPOS = 'REQUEST_REPOS';
export const RECEIVE_REPOS = 'RECEIVE_REPOS';

const endpoint = 'https://api.github.com';

function request(url) {
    if(MOCK_REQUEST) {
        return requestMock(url);
    }
    return fetch(url).then((res) => {
        return res.json();
    });
}

function requestMock(url) {
    return new Promise((resolve) => {
        console.log('Fake request', url);
        require(['../mocks/repositories'], function(repos) {
            resolve(repos);
        });
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
        return request(endpoint + `/search/repositories?q=${query}&sort=stars&order=desc`)
            .then((data) => dispatch(reposReceived(data.items)));
    }
}
