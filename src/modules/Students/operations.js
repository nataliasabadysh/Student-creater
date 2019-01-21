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

        const students = await axios.get('http://localhost:8088/api/Students/');
        const promises = students.data.map((student) => {
            return axios.get(`http://localhost:8088/api/Students/${student.ID}/Nationality`);
        })
        const nationalities = await Promise.all(promises);
 // family memb + promice all 
        const studentsWithNationalities = students.data.map((student, index) => {
            return {
                ...student,
                ...nationalities[index].data,
            }
        })

        dispatch(actions.fillStudents(studentsWithNationalities));
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
    
        // if (studentData.familyMembers) – создать мембера запросом
        // if (!studentData.familyMembers) – пропускаем этот шаг
        await delay();

        dispatch(actions.addStudentSuccess({ ...createdStudent.data, ...studentWithNationality.data }));
        dispatch(actions.setFetchingState(false));
        dispatch(actions.setModalOpenState(false));
    } catch (error) {
        dispatch(actions.fetchError(error));
    }
};

// Update Student
const updateStudentAsync = studentData => async (dispatch) => {
  try{
    dispatch(actions.setFetchingState(true));
    const updatedStudent = await axios.put(`http://localhost:8088/api/Students/${studentData.ID}`, studentData);
    const studentWithNationality = await axios.put(`http://localhost:8088/api/Students/${studentData.ID}/Nationality/${studentData.nationalityId}`);
    await delay();
    dispatch(actions.updateStudent({ ...updatedStudent.data, ...studentWithNationality.data }));
    dispatch(actions.setFetchingState(false));
    dispatch(actions.setModalOpenState(false));
  }
  catch(error) {
    dispatch(actions.fetchError(error))
}
}

export default { fetchStudentsAsync, addStudentAsync, fetchNationalitiesAsync, updateStudentAsync };
