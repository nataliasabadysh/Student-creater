// Types
import types from './types';

// fetchSuccess - GET_NATIONALITY_SUCCESS
const setFetchingState = (state) => ({
    type:    types.SET_NATIONALITY_SUCCESS,
    payload: state,
});

const getAllNationality = (students) => ({
    type:    types.GET_ALL_NATIONALITY_SUCCESS,
    payload: students,
});

const updateStudentNationalitySuccess = (students) => ({
    type:    types.UPDATE_NATIONALITY_SUCCESS,
    payload: students,
});
const fetchNationalityASuccess = () => ({ });

// ADD MEMBER
const addFamilyMemberSuccess = (id) => ({
    type: types.ADD_SUCCESS,
});

// DELETE MEMBER
const deleteFamilyMemberSuccess = (id) => ({
    type: types.DELETE_SUCCES,
});

export default {
    setFetchingState,
    getAllNationality,
    updateStudentNationalitySuccess,
    fetchNationalityASuccess,
    deleteFamilyMemberSuccess,
    addFamilyMemberSuccess,
};
