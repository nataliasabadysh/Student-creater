// Core
import React, { Component, createRef } from "react";
import { connect } from 'react-redux';

// Components
import StudentEditor from '../StudentEditor';
import FamilyrEditorView from '../FamilyMemberEditor/FamilyrEditorView';

// Instruments
import Styles from './Modal.module.css';
import { actions, operations } from '../../modules/Students';

class Modal extends Component {
    backdropRef = createRef();

    state = {
        familyMembersCount: 1, 
    }

    async componentDidMount () {
        window.addEventListener('keydown', this.handleKeyPress);

      // console.log(rr);
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
        if (e.target!== this.backdropRef.current) {
            return;
        }
        this.props.setModalOpenState(false);
    };
    handleOpenFamilyMember= () => {
        this.setState({
            familyMembersCount: + 1,
        })
    }

    render () {
        const { modalMode } = this.props;

        const modalHeadingText = modalMode === 'create' ? 'Create student' : 'Update student';

        return this.props.isModalOpen &&
           (<div className = { Styles.backDrop } ref = { this.backdropRef } onClick = { this.handelBackdropClick }>
               <div className = { Styles.modal }>
                   <h1>{modalHeadingText}</h1>
                   <section className = { Styles.sections }>
                       <StudentEditor
                           isFetching = { this.props.isFetching }
                           role = { this.props.role }
                           studentDataInModal = { this.props.studentDataInModal }
                           nationalities = { this.props.nationalities }
                           modalMode = { this.props.modalMode }
                           addStudentAsync = { this.props.addStudentAsync }
                           clearStudentDataToModal = { this.props.clearStudentDataToModal }
                           setModalMode = { this.props.setModalMode }
                           updateStudentAsync = { this.props.updateStudentAsync }
                       />
                   </section>
                   <section className = { Styles.sections }>
                       <div>

                           <button
                               type = 'button' onClick = { () => (
                                   <FamilyrEditorView
                                       isFetching = { this.props.isFetching }
                                       role = { this.props.role }
                                       studentDataInModal = { this.props.studentDataInModal }
                                       nationalities = { this.props.nationalities }
                                       modalMode = { this.props.modalMode }
                                   />) 
                                   }> Add Family member 
                            </button>
                       </div>
                   </section>
                   <button type = 'button' onClick = { () => this.props.setModalOpenState(false) }> X </button>
               </div>
           </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
