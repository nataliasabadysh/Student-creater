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

    static getDerivedStateFromProps (props) {
        if (props.studentDataInModal.familyMembers) {
            const familyMembersCount =
                props.studentDataInModal.familyMembers.length;

            return {
                familyMembersCount,
                familyMembersRefs: [...Array(familyMembersCount)].map(() => {
                    return createRef();
                }),
            };
        }

        return null;
    }

    state = {
        // Это — связь рефами между Modal и экземплярами FamilyMemberEditor
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

    // 1. ✓ Связать получение фемили мемберов в operations (когда получаем всех студентов)
    // 2. Связать созадние новых фемили мемберов с созданием ноовго студента (пока только по firstName, lastName)
    // 3. При открытии модалки (редактирование) загуржать данные о фемили мемберах в формы фемили мемберов (в зависимости от того, сколько их)
    // 4. Редактирование имени и фамалии каждого фемили мембера

    // 1. Основная точка создания студента.
    // Здесь мы собираем форму создания студента и формы создания фемили мемберов.
    _createStudent = (studentData) => {
        if (this.state.familyMembersCount) {
            const familyMembers = this.state.familyMembersRefs.map(
                (familyMemberRef) => {
                    return familyMemberRef.current.state.values;
                },
            );

            // Это — список фемили мемберов. Его нужно отпраить на сервер.
            console.log('→ familyMembers', familyMembers);
        }

        if (this.props.modalMode === 'create') {
            this.props.addStudentAsync({
                ...studentData,
                // ...familyMembersData
            });
        } else if (this.props.modalMode === 'update') {
            this.props.updateStudentAsync({
                ...studentData,
                // ...familyMembersData
            });
        }

        this.setState({
            familyMembersCount: 0,
            familyMembersRefs:  [],
        });
    };

    render () {
        const { modalMode } = this.props;
        const { familyMembersCount } = this.state;

        const modalHeadingText =
            modalMode === 'create' ? 'Create student' : 'Update student';

        console.log('→ this.state', this.state);
        console.log('→ this.props', this.props);

        return (
            this.props.isModalOpen && (
                <div
                    className = { Styles.backDrop }
                    ref = { this.backdropRef }
                    onClick = { this.handelBackdropClick }>
                    <div className = { Styles.modal }>
                        <h1>{modalHeadingText}</h1>
                        <section className = { Styles.sections }>
                            <StudentEditor
                                _createStudent = { this._createStudent }
                                addStudentAsync = { this.props.addStudentAsync }
                                clearStudentDataToModal = {
                                    this.props.clearStudentDataToModal
                                }
                                isFetching = { this.props.isFetching }
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
                            <div>
                                <button onClick = { this._addFamilyMember }>
                                    Add family member
                                </button>
                                <button onClick = { this._removeFamilyMember }>
                                    Remove family member
                                </button>
                                {/* Динамически генерируем формы создания familyMember */}
                                {[...Array(familyMembersCount).keys()].map(
                                    (count, index) => {
                                        return (
                                            <FamilyMemberEditor
                                                _createStudent = {
                                                    this._createStudent
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
                        <button
                            type = 'button'
                            onClick = { () => this.props.setModalOpenState(false) }>
                            {' '}
                            X{' '}
                        </button>
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

    // Family member

    // вынести в селектор возможноть редактировать поле (то, что мы проверяем в модалке – isFetching || modalMode !== 'create' && role === 'admin')
    // isAbleToEdit: checkIsAbleToEdit(state);
});

const mapDispatchToProps = {
    addStudentAsync:         operations.addStudentAsync,
    updateStudentAsync:      operations.updateStudentAsync,
    clearStudentDataToModal: actions.clearStudentDataToModal,
    setModalMode:            actions.setModalMode,
    setModalOpenState:       actions.setModalOpenState,

    // Family member
    // addFamilyMember : operations.familyMember.addFamilyMember,
    // deleteamilyMember : operations.familyMember.deleteamilyMember,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Modal);
