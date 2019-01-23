// Core
import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';

// Components
import StudentEditor from '../StudentEditor';
import FamilyMemberEditor from '../FamilyMemberEditor';

// Instruments
import Styles from './Modal.module.css';
import { actions, operations } from '../../modules/Students';

class Modal extends Component {
    backdropRef = createRef();

    state = {
        familyMembersCount: 0,
        familyMembersRefs:  [],
    };

    componentDidMount () {
        window.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount () {
        window.removeEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress = (e) => {
        if (e.code !== 'Escape') {
            return;
        }
        this.props.setModalOpenState(false);
    };

    handelBackdropClick = (e) => {
        if (e.target !== this.backdropRef.current) {
            return;
        }
        this.props.setModalOpenState(false);
    };

    _addFamilyMember = () => {
        this.setState((state) => ({
            familyMembersCount: state.familyMembersCount + 1,
            familyMembersRefs:  [...state.familyMembersRefs, createRef()],
        }));
    };

    _removeFamilyMember = () => {
        this.setState((state) => ({
            familyMembersCount: state.familyMembersCount - 1,
            familyMembersRefs:  state.familyMembersRefs.filter(
                (element, index, array) => {
                    return index !== array.length - 1;
                },
            ),
        }));
    };

    _createStudent = (studentData) => {
        if (this.state.familyMembersCount) {
            const familyMembers = this.state.familyMembersRefs.map(
                (familyMemberRef) => {
                    return familyMemberRef.current.state.values;
                },
            );
        }

        if (this.props.modalMode === 'create') {
            this.props.addStudentAsync({
                ...studentData,
            });
        } else if (this.props.modalMode === 'update') {
            this.props.updateStudentAsync({
                ...studentData,
            });
        }
        this._resetFamilyMembersState();
    };

    _resetFamilyMembersState = () => {
        this.setState({
            familyMembersCount: 0,
            familyMembersRefs:  [],
        });
    }

    _initFamilyMembers = (familyMembers) => {
        this.setState(familyMembers);
    }

    render () {
        const { modalMode } = this.props;
        const { familyMembersCount } = this.state;

        const modalHeadingText =
            modalMode === 'create' ? 'Create student' : 'Update student';

        return (
            this.props.isModalOpen && (
            <div
                className = { Styles.backDrop }
                ref = { this.backdropRef }
                onClick = { this.handelBackdropClick }>

                <div className = { Styles.modal }>
                    <h1>{modalHeadingText}</h1>

                    <button
                        className = { Styles.btnClose }
                        type = 'button'
                        onClick = { () => this.props.setModalOpenState(false) }>X
                    </button>
                    <div className = { Styles.wrapper }>

                        <section className = { Styles.sections }>
                            <StudentEditor
                                _createStudent = { this._createStudent }
                                _initFamilyMembers = { this._initFamilyMembers }
                                _resetFamilyMembersState = { this._resetFamilyMembersState }
                                addStudentAsync = { this.props.addStudentAsync }
                                clearStudentDataToModal = {
                                            this.props.clearStudentDataToModal
                                        }
                                isFetching = { this.props.isFetching }
                                modalMode = { this.props.modalMode }
                                nationalities = { this.props.nationalities }
                                role = { this.props.role }
                                setModalMode = { this.props.setModalMode }
                                studentDataInModal = {
                                            this.props.studentDataInModal
                                        }
                                updateStudentAsync = {
                                            this.props.updateStudentAsync
                                        }
                            />
                        </section>
                        <section className = { Styles.sections }>
                            <div className = { Styles.btn_modal }>
                                <button onClick = { this._addFamilyMember }>
                                    Add Family Member
                                </button>
                                <button
                                    onClick = { this._removeFamilyMember }
                                    disabled = { this.state.familyMembersCount === 0 }>Remove Family Member
                                </button>
                                {[...Array(familyMembersCount).keys()].map(
                                    (count, index) => {
                                        return (
                                            <FamilyMemberEditor
                                                _createStudent = {
                                                    this._createStudent
                                                }
                                                familyMember = {
                                                    this.props.studentDataInModal.familyMembers[index]
                                                }
                                                isFetching = {
                                                    this.props.isFetching
                                                }
                                                key = { count }
                                                modalMode = { this.props.modalMode }
                                                nationalities = {
                                                    this.props.nationalities
                                                }
                                                ref = {
                                                    this.state
                                                        .familyMembersRefs[
                                                            index
                                                        ]
                                                }
                                                role = { this.props.role }
                                                studentDataInModal = {
                                                    this.props
                                                        .studentDataInModal
                                                }
                                            />
                                        );
                                    },
                                )}
                            </div>
                        </section>
                    </div>
                </div>
                </div>
            )
        );
    }
}

const mapStateToProps = (state) => ({
    isModalOpen:        state.students.isModalOpen,
    isFetching:         state.students.isFetching,
    role:               state.students.role,
    studentDataInModal: state.students.studentDataInModal,
    nationalities:      state.students.nationalities,
    modalMode:          state.students.modalMode,
});

const mapDispatchToProps = {
    addStudentAsync:         operations.addStudentAsync,
    updateStudentAsync:      operations.updateStudentAsync,
    clearStudentDataToModal: actions.clearStudentDataToModal,
    setModalMode:            actions.setModalMode,
    setModalOpenState:       actions.setModalOpenState,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Modal);
