// Types
import types from './types';

const initialState = {
    nationality:  [],
    familyMember: [],
    isFetching:   false,
};

export function familyMemberReducer (state = initialState, { type, payload }) {
    switch (type) {
        case types.FETCH_SUCCESS:
            return payload;

        case types.ADD_SUCCESS:
            return [...state, payload];

        case types.UPDATE_SUCCES:
            return state.map((student) => student.id === payload.id ? payload : student);

        case types.DELETE_SUCCES:
            return state.filter((student) => student.id !== payload);

        case types.SET_NATIONALITY_SUCCESS:
            return { ...state, isFetching: payload };

        case types.ADD_NATIONALITY_SUCCESS:
            return [...state, payload];

        case types.UPDATE_NATIONALITY_SUCCESS:
            return state.map((nationality) => nationality.id === payload.id ? payload : nationality);

        case types.DELETE_NATIONALITY_SUCCESS:
            return state.filter((nationality) => nationality.id !== payload);
        default:
            return state;
    }
}
