import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
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
import setToken from '../../utils/SetToken';

const AuthState = (props) => {
    const initialState = {
        userAuth: null,
        errors: null,
        user: null
    }

    const [ state, dispatch ] = useReducer( AuthReducer, initialState );

    //Register User
    const registerUser = async userdata => {
        try {
            const response = await axios.post('/register', userdata, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data
            });
        } catch (errors) {
            dispatch({
                type: REGISTER_FAILED,
                payload: errors.response.data
            });
        }
    }

    //Login User
    const loginUser = async userdata => {

        try {
            const response = await axios.post('/login', userdata, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            });
        } catch (errors) {
            dispatch({
                type: LOGIN_FAILED,
                payload: errors.response.data
            })
        }
    }

    const logout = () => {
        dispatch({
            type: LOGOUT
        });
    }

    const getUser = async () => {
        if (localStorage.token) {
            setToken(localStorage.token);
        }

        try {
            const response = await axios.get('/login')

            dispatch({
                type: SET_USER,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: error.response.data
            })
        }
    }

    const setError = err => {
        dispatch({
            type: SET_ERROR,
            payload: err
        });
    }

    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS,
            payload: null
        })
    }

    return (
        <>
            <AuthContext.Provider value={{
                user: state.user,
                userAuth: state.userAuth,
                errors: state.errors,
                registerUser,
                loginUser,
                setError,
                clearErrors,
                logout,
                getUser
            }}>
                {props.children}
            </AuthContext.Provider>
        </>
    )
}

export default AuthState;