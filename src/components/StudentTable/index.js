// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import StudentView from '../StudentView';

// Instuments
import Styles from '../StudentView/styles.module.css';

import { actions, selectors, operations } from '../../modules/Students';

class StudentTable extends Component {
    componentDidMount () {
        this.props.fetchStudents();
    }
    render () {
        const { isModalOpen } = this.props;

        return (
            <div>
                <button className = { Styles.button } onClick = { () => this.props.setModalOpenState(!isModalOpen) }>New Student</button>
                { this.props.students.map((student) => (
                    <StudentView
                        key = { student.ID }
                        { ...student }
                        onToggleApprove = { () => this.props.toggleApprove(student.ID) }
                    />
                )) }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    students: selectors.getNewStudent(state),

    isModalOpen: state.students.isModalOpen,

});

const mapDispatchToProps = {
    fetchStudents: operations.fetchStudents, 
    toggleApprove: actions.toggleApprove,

    setModalOpenState: actions.setModalOpenState,
};

export default connect( 
    mapStateToProps,
    mapDispatchToProps,
)(StudentTable);
