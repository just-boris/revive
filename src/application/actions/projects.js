import 'whatwg-fetch';

export const RESET_QUERY = 'RESET_QUERY';
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
        console.log('Fake request', url); //eslint-disable-line no-console
        const page = (url.match(/\d+$/) || [])[0];
        setTimeout(() => {
            require(['../data/repositories'], function(repos) {
                resolve(Object.assign({}, repos, {
                    items: repos.items.map((repo) => Object.assign({}, repo, {id: page + '-' + repo.id}))
                }));
            });
        }, 1000);
    })
}

function reposRequested(query) {
    return {type: REQUEST_REPOS, query};
}

function reposReceived(projects, total) {
    return {type: RECEIVE_REPOS, projects, total};
}

export function resetQuery(query) {
    return {type: RESET_QUERY, query};
}

export function fetchProjects() {
    return (dispatch, getState) => {
        const {query, page} = getState().projects;
        dispatch(reposRequested(query));
        return request(endpoint + `/search/repositories?q=${query}&sort=stars&order=desc&page=${page+1}`)
            .then((data) =>  dispatch(reposReceived(data.items, data.total_count)));
    }
}
