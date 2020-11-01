import * as types from '../actions/types';

export default function(state={},action) {
    switch (action) {
        case types.LOGIN_USER:
            return {...state, loginSuccess: action.payload}
            break;
        case types.REGISTER_USER:
            return {...state, loginSuccess:action.payload}
        default:
            return state;
    }

}