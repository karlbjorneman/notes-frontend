import {LOGIN, LOGOUT} from '../actions/authActions'
import { fromJS } from 'immutable';

const authReducer = (state = {
    tokenId: '',
    googleAccessToken: '',
    user: null,
    isAuthenticated: false
}, action:any) => {
    let immutableState = fromJS(state);
    switch (action.type) {
        case LOGIN:
            immutableState = immutableState.set('tokenId', action.payload.token);
            immutableState = immutableState.set('googleAccessToken', action.payload.googleAccessToken);
            immutableState = immutableState.set('user', action.payload.user);
            immutableState = immutableState.set('isAuthenticated', true);
            break;
        case LOGOUT:
            immutableState = immutableState.set('tokenId', '');
            immutableState = immutableState.set('googleAccessToken', '');
            immutableState = immutableState.set('user', null);
            immutableState = immutableState.set('isAuthenticated', false);
            break;
        default:
            break;
    };
    return immutableState.toJS();
};

export default authReducer;