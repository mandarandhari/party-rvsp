import { TOGGLE_FILTER, SEARCH_GUEST, CLEAR_SEARCH, ADD_GUEST, DELETE_GUEST, UPDATE_GUEST, EDIT_GUEST, CLEAR_EDIT, SET_GUESTS, GUESTS_ERROR } from '../Types';

export default (state, { type, payload }) => {
    switch(type) {
        case TOGGLE_FILTER:
            return {
                ...state,
                filterGuests: !state.filterGuests
            }

        case SEARCH_GUEST:
            const reg = new RegExp(`${payload}`, 'gi')
            return {
                ...state,
                search: state.guests.filter(guest => guest.name.match(reg))
            }

        case CLEAR_SEARCH: 
            return {
                ...state,
                search: null
            }

        case ADD_GUEST: 
            return {
                ...state,
                guests: [...state.guests, payload]
            }

        case DELETE_GUEST:
            return {
                ...state,
                guests: state.guests.filter(guest => guest._id !== payload)
            }

        case UPDATE_GUEST:
            return {
                ...state,
                guests: state.guests.map(guest => guest._id === payload._id ? payload : guest)
            }

        case EDIT_GUEST:
            return {
                ...state,
                editAble: payload
            }

        case CLEAR_EDIT:
            return {
                ...state,
                editAble: null
            }

        case SET_GUESTS:
            return {
                ...state,
                guests: payload,
                errors: null
            }

        case GUESTS_ERROR:
            return {
                ...state,
                errors: payload
            }
        
        default:
            return state;
    }
}