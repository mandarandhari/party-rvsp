import React, { useReducer } from 'react';
import axios from 'axios';
import GuestContext from './GuestContext';
import GuestReducer from './GuestReducer';
import {
    TOGGLE_FILTER,
    SEARCH_GUEST,
    CLEAR_SEARCH,
    ADD_GUEST,
    DELETE_GUEST,
    UPDATE_GUEST,
    EDIT_GUEST,
    CLEAR_EDIT,
    SET_GUESTS,
    GUESTS_ERROR
} from '../Types';

const GuestState = (props) => {
    const initialState = {
        filterGuests: false,
        search: null,
        editAble: null,
        guests: [],
        errors: null
    }

    const [state, dispatch] = useReducer(GuestReducer, initialState)
    
    const getGuests = async () => {
        try {
            const response = await axios.get('/guests');

            dispatch({
                type: SET_GUESTS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GUESTS_ERROR,
                payload: error.response.msg
            });
        }
    }

    const toggleFilter = () => {
        dispatch({
            type: TOGGLE_FILTER
        })
    }

    const searchGuest = (guest) => {
        dispatch({
            type: SEARCH_GUEST,
            payload: guest
        })
    }

    const clearSearch = () => {
        dispatch({
            type: CLEAR_SEARCH
        })
    }

    const addGuest = async (guest) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const response = await axios.post('/guests', guest, config);

            dispatch({
                type: ADD_GUEST,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GUESTS_ERROR,
                payload: error.response.data
            });
        }
    }

    const deleteGuest = async (id) => {
        try {
            await axios.delete(`/guests/${id}`);

            dispatch({
                type: DELETE_GUEST,
                payload: id
            })
        } catch (error) {
            dispatch({
                type: GUESTS_ERROR,
                payload: error.response.data
            });
        }
    }

    const updateGuest = async (guest) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const response = await axios.put(`/guests/${guest._id}`, guest, config);

            dispatch({
                type: UPDATE_GUEST,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: GUESTS_ERROR,
                payload: error.response.data
            })
        }
    }

    const editGuest = (guest) => {
        dispatch({
            type: EDIT_GUEST,
            payload: guest
        })
    }

    const clearEdit = () => {
        dispatch({
            type: CLEAR_EDIT
        })
    }

    return (
        <>
            <GuestContext.Provider value={{
                guests: state.guests,
                filterGuests: state.filterGuests,
                search: state.search,
                editAble: state.editAble,
                toggleFilter,
                searchGuest,
                clearSearch,
                addGuest,
                deleteGuest,
                updateGuest,
                editGuest,
                clearEdit,
                getGuests
            }}>{ props.children }</GuestContext.Provider>
        </>
    )
}

export default GuestState;