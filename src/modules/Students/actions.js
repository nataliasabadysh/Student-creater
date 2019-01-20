// Types
import types from './types';

// Fetching All list of Students
const setFetchingState = (state) => ({
    type:    types.SET_FETCHING_STATE,
    payload: state,
});

const setModalOpenState = (state) => ({
    type:    types.SET_MODAL_OPEN_STATE,
    payload: state,
});

const fetchSuccess = (students) => ({
    type:    types.FETCH_STUDENT_SUCCESS,
    payload: students,
});

const fetchError = (error) => ({
    type:    types.FETCH_STUDENT_ERROR,
    payload: error,
});

// Add new student
const addStudentSuccess = (students) => ({
    type:    types.ADD_STUDENT_SUCCESS,
    payload: students,
});

// Update Student Action
const updateStudentSuccess = (students) => ({
    type:    types.UPDATE_STUDENT_SUCCES,
    payload: students,
});

// Modal  to Add Student
const modalAddStudentSuccess = (students) => ({
    type:    types.MODAL_OPEN,
    payload: students,
});


// Registrar  Can Approve a new student in the table
const toggleApprove = (ID) => ({
    type:    types.TOGGLE_STUDENT_APPROVED,
    payload: {
        ID,
        approve: false,
    },
});

// Get Student's Nationality
const getNatoionality = (students) => ({
    type:    types.GET_STUDENT_NATIONALITY,
    payload: students,
});

// UPDATE Student's Nationality
const updateStudentNationality = (ID) => ({
    type:    types.UPDATE_STUDENT_NATIONALITY,
    payload: ID,
});

export default {
    setFetchingState,
    setModalOpenState,

    updateStudentNationality,

    getNatoionality,
    updateStudentSuccess,
    addStudentSuccess,
    modalAddStudentSuccess,
    fetchSuccess,
    fetchError,
    toggleApprove,
};
