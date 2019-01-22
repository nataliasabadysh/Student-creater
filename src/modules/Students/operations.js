import axios from 'axios';
// Actions
import actions from './actions';

const delay = (timeout = 1000) =>
    new Promise((resolve) => setTimeout(resolve, timeout));

// Fetch all Students
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

        // Тут мы получили фемили мемберов всех студентов, их нужно объединить со студентами и загрузить в редакс.
        const familyMembers = await Promise.all(familyMembersPromises);

        // const studentWithFamilyMember = students.data.map(
        //     (familyMember, index) => {
        //         return {
        //             ...familyMember,
        //             ...familyMember[index].data,
        //         };
        //     },
        // );

        /*
        GET: Gets Family Members for a particular Student
    http://localhost:8088/api/FamilyMembers/ {id} /Nationality/ {id}

 */
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

// Add Student
const addStudentAsync = (studentData) => async (dispatch) => {
    try {
        dispatch(actions.setFetchingState(true));

        // Создаем студента
        const createdStudent = await axios.post(
            'http://localhost:8088/api/Students/',
            studentData,
        );

        // и устанавливаем ему национальность
        const studentWithNationality = await axios.put(
            `http://localhost:8088/api/Students/${
                createdStudent.data.ID
            }/Nationality/${studentData.nationalityId}`,
        );
        // const studentWithNationality = await axios.put(`http://localhost:8088/api/Students/${createdStudent.data.ID}/FamilyMembers/`, familyMembers);

        /*
        POST: Creates a new Family Member for a particular Student (without the nationality)
                http://localhost:8088/api/Students / {id} /FamilyMembers/

        */
        // if (studentData.familyMembers) {
        //   const studentsFamilyMembes  = await axios.put(`http://localhost:8088/api/Students/${student.data.ID}/FamilyMembers/`);
        //   const familyMemberWithNationality  = await axios.put (`http://localhost:8088/api/FamilyMembers/${familyMember.ID}/Nationality/{id}`)
        //  }

        // if (!studentData.familyMembers) return;

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

// Update Student
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

        // PUT: Updates a particular Family Member
        // const familyMemberWithNationality = await axios.put(`http://localhost:8088/api/FamilyMembers/${familyMember.ID}`);

        // PUT: Updates a particular Family Member’s Nationality - familyMemberWithNationality
        // const familyMemberWithNationality = await axios.put(`http://localhost:8088/api/FamilyMembers/${familyMember.ID}/Nationality/${familyMember.nationalityId}`);

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
