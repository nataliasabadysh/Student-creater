// Types
import types from './types';

const initialState = {
    // ui
    isFetching:    false,
    isModalOpen:   false,
    modalMode:     'create',
    role:          'registrar',

    // meta
    nationalities: [],

    // students
    students:      [],

    // studentDataInModal
    studentDataInModal: {
        ID:            0,
        firstName:     '',
        lastName:      '',
        // TODO: связать это поле с результатом запроса к серверу, который вернет нам национальность студента по айди
        // nationalitity: '', 
    }
};

export function studentsReducer (state = initialState, { type, payload }) {
    switch (type) {

        case types.SET_FETCHING_STATE:
            return { ...state, isFetching: payload };

        case types.SET_MODAL_OPEN_STATE:
            return { ...state, isModalOpen: payload };

        case types.SET_MODAL_MODE:
            return { ...state, modalMode: payload };

        case types.SET_ROLE:
            return { ...state, role: payload };

        case types.LOAD_STUDENT_DATA_TO_MODAL:
            return { ...state, studentDataInModal: payload };

        case types.CLEAR_STUDENT_DATA_TO_MODAL:
            return { ...state, studentDataInModal: initialState.studentDataInModal };

        case types.FILL_STUDENTS:
            return { ...state, students: payload };

        case types.FILL_ALL_NATIONALITIES:
            return { ...state, nationalities: payload };

        case types.ADD_STUDENT_SUCCESS:
            return { ...state, students: [...state.students, payload]};

        case types.UPDATE_STUDENT:
            return {...state, students: state.students.map((student) => student.ID === payload.ID ? payload : student) }

        // case types.UPDATE_STUDENT_NATIONALITY:
        //     return state.map((students) => students.id === payload.id ? payload : students);
            
        case types.GET_STUDENT_NATIONALITY:
            return { ...state, payload };

        case types.GET_STUDENT_FAMILY_MEMBER:
            return { ...state, payload };

        default:
            return state;
    }
}
