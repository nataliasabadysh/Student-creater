// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import StudentRow from './StudentRow';

// Instuments
import Styles from './StudentRow/styles.module.css';

import { actions, selectors, operations } from '../../modules/Students';

class StudentTable extends Component {
    header = ['First Name', 'Last Name', 'Date Of Birth', 'Approve'];

    componentDidMount () {
        this.props.fetchNationalitiesAsync();
        this.props.fetchStudentsAsync();
    }

    render () {
        const { isModalOpen, loadStudentDataToModal, clearStudentDataToModal, setModalOpenState, role, setModalMode } = this.props;

        return (
            <div className = { Styles.wrapper }>
                <button className = { Styles.btn } onClick = { () => this.props.setModalOpenState(!isModalOpen) }>New Student</button>
                <table>
                    <tbody>
                        <tr>
                            {this.header.map((item) => (
                                <th key = { item }>{item}</th>
                            ))}
                        </tr>
                
                        { this.props.students.map((student) => (
                            <StudentRow
                                { ...student }
                                clearStudentDataToModal = { clearStudentDataToModal }
                                key = { student.ID }
                                loadStudentDataToModal = { loadStudentDataToModal }
                                role = { role }
                                setModalMode = { setModalMode }
                                setModalOpenState = { setModalOpenState }
                            />
                        )) }
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    students:    selectors.getNewStudent(state),
    isModalOpen: state.students.isModalOpen,
    role:        state.students.role,
});

const mapDispatchToProps = {
    fetchNationalitiesAsync: operations.fetchNationalitiesAsync,
    fetchStudentsAsync:      operations.fetchStudentsAsync,
    loadStudentDataToModal:  actions.loadStudentDataToModal,
    setModalOpenState:       actions.setModalOpenState,
    setModalMode:            actions.setModalMode,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(StudentTable);
