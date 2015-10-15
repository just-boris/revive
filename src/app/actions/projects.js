import 'whatwg-fetch';

export const REQUEST_REPOS = 'REQUEST_REPOS';
export const RECEIVE_REPOS = 'RECEIVE_REPOS';

const endpoint = 'https://api.github.com';

function request(url) {
    return fetch(url).then((res) => {
        return res.json();
    })
}

export function fetchProjects(query) {
    return request(endpoint + `/search/repositories?q=${query}&sort=stars&order=desc`).then(function(data) {
        return {
            type: RECEIVE_REPOS,
            projects: data.items
        }
    })
}
