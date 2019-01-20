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

const setModalMode = (mode) => ({
    type:    types.SET_MODAL_MODE,
    payload: mode,
});

const loadStudentDataToModal = (studentData) => ({
    type:    types.LOAD_STUDENT_DATA_TO_MODAL,
    payload: studentData,
});

const clearStudentDataToModal = () => ({
    type: types.CLEAR_STUDENT_DATA_TO_MODAL,
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

// Get Student's Nationality
const fillAllNationalities = (nationalities) => ({
    type:    types.FILL_ALL_NATIONALITIES,
    payload: nationalities,
});

const getNatoionality = (students) => ({
    type:    types.GET_STUDENT_NATIONALITY,
    payload: students,
});

// UPDATE Student's Nationality
const updateStudentNationality = (ID) => ({
    type:    types.UPDATE_STUDENT_NATIONALITY,
    payload: ID,
});

const setRole = (role) => ({
    type:    types.SET_ROLE,
    payload: role,
});


export default {
    setFetchingState,
    setModalOpenState,
    setModalMode,
    loadStudentDataToModal,
    clearStudentDataToModal,

    updateStudentNationality,

    fillAllNationalities,
    getNatoionality,
    updateStudentSuccess,
    addStudentSuccess,
    modalAddStudentSuccess,
    fetchSuccess,
    fetchError,

    setRole
};
