// Types
import types from './types';

const initialState = {
    isModalOpen: false,
    students:    [],
    role:        false,
    isFetching:  false,
};

export function studentsReducer (state = initialState, { type, payload }) {
    switch (type) {

        case types.SET_FETCHING_STATE:
            return { ...state, isFetching: payload };

        case types.SET_MODAL_OPEN_STATE:
            return { ...state, isModalOpen: payload };

        case types.FETCH_STUDENT_SUCCESS:
            return { ...state, students: payload };

        case types.ADD_STUDENT_SUCCESS:
            return { ...state, students: [...state.students, payload]};

        case types.UPDATE_STUDENT_NATIONALITY:
            return state.map((students) => students.id === payload.id ? payload : students);

        case types.TOGGLE_STUDENT_APPROVED:
            return state.map((students) =>
                students.ID === payload ? { ...students, approve: !students.approve } : students,
            );
        case types.GET_STUDENT_NATIONALITY:
            return { ...state, payload };

            // Roles 

        case types.ROLE_PROFILE:
            return payload;
        case types.ROLE_REGISTRAR_PROFILE:
            return [payload];
        case types.ROLE_ADMIN_PROFILE:
            return [payload];

        default:
            return state;
    }
}
