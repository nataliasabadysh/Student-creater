import axios from 'axios';
// Actions
import actions from './actions';

const delay = (timeout = 1000) => new Promise((resolve) => setTimeout(resolve, timeout));

// Fetch all Students
const fetchNationalitiesAsync = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:8088/api/Nationalities');

        dispatch(actions.fillAllNationalities(response.data));
    } catch (error) {
        dispatch(actions.fetchError(error));
    }
};

const fetchStudentsAsync = () => async (dispatch) => {
    try {
        dispatch(actions.setFetchingState(true));

        const response = await axios.get('http://localhost:8088/api/Students/');

        dispatch(actions.fetchSuccess(response.data));
        dispatch(actions.setFetchingState(false));
    } catch (error) {
        dispatch(actions.fetchError(error));
    }
};

// Add Student
const addStudentAsync = (studentData) => async (dispatch) => {
    try {
        dispatch(actions.setFetchingState(true));

        // Создаем студента
        const response = await axios.post('http://localhost:8088/api/Students/', studentData);

        // и устанавливаем ему национальность
        await axios.put(`http://localhost:8088/api/Students/${response.data.ID}/Nationality/${studentData.nationalityId}`);
        await delay();

        dispatch(actions.addStudentSuccess(response.data));
        dispatch(actions.setFetchingState(false));
        dispatch(actions.setModalOpenState(false));
    } catch (error) {
        dispatch(actions.fetchError(error));
    }
};

// // Get  Student’s Nationality
// const getStudentsNationalityAsync = (nationality) => async (dispatch) => {
//     try {
//         dispatch(actions.setFetchingState(true));

//         dispatch(actions.getNatoionality(response.data));
//         dispatch(actions.setFetchingState(false));
//     } catch (error) {
//         dispatch(actions.fetchError(error));
//     }
// };

// Update Student
// const UpdateStudentAsync = students => async (dispatch)=> {
//   try{
//     dispatch(actions.setFetchingState(true));
//     const response = await axios.put(`http://localhost:8088/api/Students/{id}`, students);
//     dispatch(actions.updateStudentSuccess({data}));
//     dispatch(actions.addStudentSuccess(response.data));
//     dispatch(actions.setFetchingState(false));
//   }
//   catch(error) {
//     dispatch(actions.fetchError(error))
// }

export default { fetchStudentsAsync, addStudentAsync, fetchNationalitiesAsync };


// // Updates  Student’s Nationality
//  const updateStudentsNationality = students => dispatch => {
//     dispatch(actions.fetchRequest());

//       axios.post(`Students/{id}/Nationality/{id}`, students)
//       .then(({ data }) => dispatch(actions.updateStudentNationality(data)))
//       .catch(error => dispatch(actions.fetchError(error)))
// }


// const updateStudentsNationality =   students => dispatch => {  //  ??????/
//   dispatch(actions.fetchRequest());

//   const response = Promise.all([

//     axios.post(`Students/${id}/Nationality/${id}`, students)
//     .then(({ data }) => dispatch(actions.updateStudentSuccess(data)))
//     .catch(error => dispatch(actions.fetchError(error)))

// ]);
// }

/*
export const studentsNationality = async id => {
    const response = await Promise.all([
        axios.post(`Students/${id}/Nationality/${id}`),
    ]);

// const fetchStudents = () => async dispatch => {
//   dispatch(actions.fetchRequest());
//   try {
//     const response = await axios.get('http://localhost:8088/api/Students/');
//     dispatch(actions.fetchSuccess(response.data));
//   } catch (error) {
//     dispatch(actions.fetchError(error));
//   }
// };

*/
