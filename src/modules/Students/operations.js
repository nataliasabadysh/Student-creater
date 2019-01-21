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

        // get student
        const students = await axios.get('http://localhost:8088/api/Students/');

        // get Nationality
        const promises = students.data.map((student) => {
            return axios.get(`http://localhost:8088/api/Students/${student.ID}/Nationality`);
        });
        const nationalities = await Promise.all(promises);
        const studentsWithNationalities = students.data.map((student, index) => {

            return {

                ...student,
                ...nationalities[index].data,
            };
        });

// ForFamily  Member
         // Gets Family Members for a particular Student
         const promisesFamily = students.data.map((student) => {
             return axios.get(`http://localhost:8088/api/Students/${student.data.ID}/FamilyMembers/`);
         });
         console.log(promisesFamily);
         const familyMembers = await Promise.all(promisesFamily);
         const studentsWithfamilyMembers = students.data.map((student, index) => {

             return {
                 ...student,
                 ...familyMembers[index].data,
             };
         });




        dispatch(actions.fillStudents(studentsWithNationalities));
        dispatch(actions.fillStudents(studentsWithfamilyMembers));
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
        const createdStudent = await axios.post('http://localhost:8088/api/Students/', studentData);

        // и устанавливаем ему национальность
        const studentWithNationality = await axios.put(`http://localhost:8088/api/Students/${createdStudent.data.ID}/Nationality/${studentData.nationalityId}`);

    /*
        if (studentData.familyMembers){
            return (
                const createFamilyMember = await axios.post(`http://localhost:8088/api/Students/${studentData.data.ID}/FamilyMembers/`)
                const addFamilyMemberNationality = await axios.post(`http://localhost:8088/api/FamilyMembers/${createFamilyMember.ID}/Nationality/${studentData.nationalityId}`)
            );
        }else if(!studentData.familyMembers) { return null;  }

*/

        await delay();

        dispatch(actions.addStudentSuccess({ ...createdStudent.data, ...studentWithNationality.data }));
        dispatch(actions.setFetchingState(false));
        dispatch(actions.setModalOpenState(false));
    } catch (error) {
        dispatch(actions.fetchError(error));
    }
};

// Update Student
const updateStudentAsync = (studentData) => async (dispatch) => {
    try {
        dispatch(actions.setFetchingState(true));
        const updatedStudent = await axios.put(`http://localhost:8088/api/Students/${studentData.ID}`, studentData);
        const studentWithNationality = await axios.put(`http://localhost:8088/api/Students/${studentData.ID}/Nationality/${studentData.nationalityId}`);

        await delay();
        dispatch(actions.updateStudent({ ...updatedStudent.data, ...studentWithNationality.data }));
        dispatch(actions.setFetchingState(false));
        dispatch(actions.setModalOpenState(false));
    }    catch (error) {
        dispatch(actions.fetchError(error));
    }
};

export default { fetchStudentsAsync, addStudentAsync, fetchNationalitiesAsync, updateStudentAsync };
