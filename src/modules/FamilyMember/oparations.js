import axios from 'axios';
import actions from './actions';

//FamilyMembers
const addFamilyMemberSuccessAsync = () => (dispatch) => {
    dispatch(actions.fetchRequest());

    axios
        .put(`http://localhost:8088/api/FamilyMembers/{id}`)
        .then(({ data }) => dispatch(actions.addMemberSuccess(data)))
        .catch((error) => dispatch(actions.fetchError(error)));
};

//  getting id and deleting by id
const deleteFamilyMemberAsync = (id) => (dispatch) => {
    dispatch(actions.fetchRequest());

    axios
        .delete(`http://localhost:8088/api/FamilyMembers/{id}`)
        .then(({ data }) => dispatch(actions.deleteFamilyMemberSuccess(id)))
        .catch((error) => dispatch(actions.fetchError(error)));
};

//  Get Nationality for Famile Member
const getNationalityAsync = () => async (dispatch) => {
    try {
        dispatch(actions.fetchNationalityASuccess(true));

        const response = await axios.get(`http://localhost:8088/api/FamilyMembers/{id}/Nationality/{id}`);

        dispatch(actions.fetchNationalityASuccess(response.data));
        dispatch(actions.setFetchingState(false));
    } catch (error) {
        dispatch(actions.fetchError(error));
    }
};

// Get all Nationality for Famile Member
const getAllNationalityAsync = (nationality) => async (dispatch) => {
    try {
        dispatch(actions.fetchNationalityASuccess(true));

        const response = await axios.get(`http://localhost:8088/api/FamilyMembers/{id}/Nationality/{id}`);

        dispatch(actions.fetchNationalityASuccess(response.data));
        dispatch(actions.getAllNationality(false));
    } catch (error) {
        dispatch(actions.fetchError(error));
    }
};

// Get all Nationality for Famile Member
const updateFamilyNationalityAsync = (nationality) => async (dispatch) => {
    try {
        dispatch(actions.fetchNationalityASuccess(true));

        const response = await axios.put(`http://localhost:8088/api/FamilyMembers/{id}/Nationality/{id}`);

        dispatch(actions.fetchNationalityASuccess(response.data));
        dispatch(actions.updateStudentNationalitySuccess(false));
    } catch (error) {
        dispatch(actions.fetchError(error));
    }
};

// Nationality
// const getNationality = () => dispatch => {
//     dispatch(actions.fetchRequest());

//     axios
//       .get(`http://localhost:8088/api/FamilyMembers/${id}/Nationality/${id}`)
//       .then(({ data }) => dispatch(actions.fetchSuccess(data)))
//       .catch(error => dispatch(actions.fetchError(error)));
// };

// const updateFamilyNationality = () => dispatch => {
//     dispatch(actions.fetchRequest());

//     axios
//       .put(`http://localhost:8088/api/FamilyMembers/${id}/Nationality/${id}`)
//       .then(({ data }) => dispatch(actions.fetchSuccess(data)))
//       .catch(error => dispatch(actions.fetchError(error)));
// };

// const getAllNationality = () => dispatch => {
//     dispatch(actions.fetchRequest());
//     axios
//       .get(`http://localhost:8088/api/Nationalities`)
//       .then(({ data }) => dispatch(actions.fetchSuccess(data)))
//       .catch(error => dispatch(actions.fetchError(error)));
// };

export default{
    getNationalityAsync,
    getAllNationalityAsync,
    updateFamilyNationalityAsync,
    addFamilyMemberSuccessAsync,
    deleteFamilyMemberAsync,
};
