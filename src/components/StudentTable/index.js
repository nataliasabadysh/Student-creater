// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import StudentRow from './StudentRow';

// Instuments
import Styles from './StudentRow/styles.module.css';

import { actions, selectors, operations } from '../../modules/Students';

class StudentTable extends Component {
    componentDidMount () {
        this.props.fetchNationalitiesAsync();
        this.props.fetchStudentsAsync();
    }
    render () {
        const { isModalOpen, loadStudentDataToModal, clearStudentDataToModal, setModalOpenState, role, setModalMode } = this.props;

        return (
            <div className = { Styles.wrapper }>
                <button className = { Styles.button } onClick = { () => this.props.setModalOpenState(!isModalOpen) }>New Student</button>
                { this.props.students.map((student) => (
                    <StudentRow
                        key = { student.ID }
                        { ...student }
                        loadStudentDataToModal = { loadStudentDataToModal }
                        clearStudentDataToModal = { clearStudentDataToModal }
                        setModalOpenState = { setModalOpenState }
                        role = { role }
                        setModalMode = { setModalMode }
                    />
                )) }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    students: selectors.getNewStudent(state),

    isModalOpen: state.students.isModalOpen,
    role:        state.students.role,
});

const mapDispatchToProps = {
    fetchNationalitiesAsync: operations.fetchNationalitiesAsync,
    fetchStudentsAsync: operations.fetchStudentsAsync, 
    loadStudentDataToModal: actions.loadStudentDataToModal,
    setModalOpenState: actions.setModalOpenState,
    setModalMode: actions.setModalMode,
};

export default connect( 
    mapStateToProps,
    mapDispatchToProps,
)(StudentTable);
