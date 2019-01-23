import axios from 'axios';
import actions from './actions';

const delay = (timeout = 1000) =>
    new Promise((resolve) => setTimeout(resolve, timeout));

const fetchNationalitiesAsync = () => async (dispatch) => {
    try {
        const response = await axios.get(
            'http://localhost:8088/api/Nationalities',
        );

        dispatch(actions.fillAllNationalities(response.data));
    } catch (error) {
        dispatch(actions.fetchError(error));
    }
};

const fetchStudentsAsync = () => async (dispatch) => {
    try {
        dispatch(actions.setFetchingState(true));

        const students = await axios.get('http://localhost:8088/api/Students/');
        const studentsNationalitiesPromises = students.data.map((student) => {
            return axios.get(
                `http://localhost:8088/api/Students/${student.ID}/Nationality`,
            );
        });
        const nationalities = await Promise.all(studentsNationalitiesPromises);

        const familyMembersPromises = students.data.map((student) => {
            return axios.get(
                `http://localhost:8088/api/Students/${
                    student.ID
                }/FamilyMembers/`,
            );
        });

        const familyMembers = await Promise.all(familyMembersPromises);

        const assembledStudents = students.data.map(
            (student, index) => {

                return {
                    ...student,
                    ...nationalities[index].data,
                    familyMembers: familyMembers[index].data,
                };
            },
        );

        dispatch(actions.fillStudents(assembledStudents));
        dispatch(actions.setFetchingState(false));
    } catch (error) {
        dispatch(actions.fetchError(error));
    }
};

const addStudentAsync = (studentData) => async (dispatch) => {
    try {
        dispatch(actions.setFetchingState(true));

        const createdStudent = await axios.post(
            'http://localhost:8088/api/Students/',
            studentData,
        );

        const studentWithNationality = await axios.put(
            `http://localhost:8088/api/Students/${
                createdStudent.data.ID
            }/Nationality/${studentData.nationalityId}`,
        );

        await delay();
        dispatch(
            actions.addStudentSuccess({
                ...createdStudent.data,
                ...studentWithNationality.data,
            }),
        );
        dispatch(actions.setFetchingState(false));
        dispatch(actions.setModalOpenState(false));
    } catch (error) {
        dispatch(actions.fetchError(error));
    }
};

const updateStudentAsync = (studentData) => async (dispatch) => {
    try {
        dispatch(actions.setFetchingState(true));
        const updatedStudent = await axios.put(
            `http://localhost:8088/api/Students/${studentData.ID}`,
            studentData,
        );
        const studentWithNationality = await axios.put(
            `http://localhost:8088/api/Students/${studentData.ID}/Nationality/${
                studentData.nationalityId
            }`,
        );

        await delay();
        dispatch(
            actions.updateStudent({
                ...updatedStudent.data,
                ...studentWithNationality.data,
            }),
        );
        dispatch(actions.setFetchingState(false));
        dispatch(actions.setModalOpenState(false));
    } catch (error) {
        dispatch(actions.fetchError(error));
    }
};

export default {
    fetchStudentsAsync,
    addStudentAsync,
    fetchNationalitiesAsync,
    updateStudentAsync,
};
