import axios from 'axios';

import actions from './actions';
const fetchFamilyMemberSuccessAsync = () => async (dispatch) => {
    try {
        //GET Getting all Nationalities
        const response = await axios.get(`http://localhost:8088/api/FamilyMembers/{id}/Nationality/{id}`);
    } catch (error) {
        dispatch(actions.fetchError(error));
    }
};

// Add  to Student Family Members
const addFamilyMemberSuccessAsync = () => async (dispatch) => {
    try {
        //  PUT Saving new Member 
        const response = await axios.put(`http://localhost:8088/api/FamilyMembers/{id}`)
    
        // POST: Creates a new Family Member for a particular Student (without the nationality)
       await axios.post(`http://localhost:8088/api/Students/{id}/FamilyMembers/`)

        // PUT  Saving to Member Nationality
       await axios.put(`http://localhost:8088/api/FamilyMembers/{id}/Nationality/{id}`)

    } catch (error) {
        dispatch(actions.fetchError(error));
    }
};


// Add Student
const showFamilyMembersAsync = () => async (dispatch) => {
    try {
        // Gets Family Members for a particular Student
        const response = await axios.get(`http://localhost:8088/api/Students/{id}/FamilyMembers/`)

        // Gets a nationality associated with a family member
       await axios .get(`http://localhost:8088/api/FamilyMembers/{id}/Nationality/{id}`);

    } catch (error) {
        dispatch(actions.fetchError(error));
    }
};

export default{
    fetchFamilyMemberSuccessAsync,
    addFamilyMemberSuccessAsync,
    showFamilyMembersAsync,
    
};
