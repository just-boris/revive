import {SET_TOKEN} from '../actions/token';

export default function(state = {}, action) {
    switch (action.type) {
        case SET_TOKEN:
            return {value: action.value};
        default:
            return state;
    }
}
