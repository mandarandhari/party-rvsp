import {
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    SET_ERROR,
    CLEAR_ERRORS,
    LOGOUT,
    SET_USER,
    AUTH_ERROR
} from '../Types';

export default (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);

            return {
                ...state,
                userAuth: true,
                errors: null
            }

        case REGISTER_FAILED:
        case LOGIN_FAILED:
        case SET_ERROR:
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: action.payload
        }

        case LOGOUT:
            localStorage.removeItem('token');

            return {
                ...state,
                userAuth: null,
                user: null
            }

        case SET_USER:
            return {
                ...state,
                user: action.payload,
                errors: null
            }

        case AUTH_ERROR:
            return {
                ...state,
                errors: action.payload
            }

        default:
            return state;
    }
}