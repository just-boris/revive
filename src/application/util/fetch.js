import fetch from 'isomorphic-fetch';

function checkStatus(response) {
  if (response.ok) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
    return response.json();
}

function enhancedFetch(options) {
    return fetch(options)
        .then(checkStatus)
        .then(parseJSON);
}

export {enhancedFetch as fetch};
