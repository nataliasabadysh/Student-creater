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
       familyMembersCount: 1, // можно увеличивать, уменьшать 
   }

   async componentDidMount () {
       window.addEventListener('keydown', this.handleKeyPress);

       // ПОЛУЧАЕМ НАЦИОНАЛЬНОСТЬ СТУДЕНТА – ЭТО В редакс мы договорились не выносить, потому что больше нигде эта инфа использоватся не будет
       // const r = await fetch( 'http://localhost:8088/api/Students/16984/Nationality/', { method: 'GET'});
       // const rr = await r.json()

      // console.log(rr);
   }
   componentWillUnmount () {
       window.removeEventListener('keydown', this.handleKeyPress);
   }
   handleKeyPress = (e) => {
       if (e.code !== 'Escape') { return; }
       this.props.setModalOpenState(false);
   };
   handelBackdropClick = (e) => {
       if (e.target!== this.backdropRef.current) { return; }
       this.props.setModalOpenState(false);
   };

   render () {
       const { modalMode } = this.props;

       const modalHeadingText = modalMode === 'create' ? 'Create student' : 'Update student'

       return this.props.isModalOpen &&
           (<div className = { Styles.backDrop } ref = { this.backdropRef } onClick = { this.handelBackdropClick }>
               <div className = { Styles.modal }>
                   <h1>{modalHeadingText}</h1>
                   <section className = { Styles.sections }>
                    <StudentEditor 
                       isFetching = {this.props.isFetching}
                       role = { this.props.role }
                       studentDataInModal = { this.props.studentDataInModal }
                       nationalities = { this.props.nationalities } 
                       modalMode = { this.props.modalMode}
                       addStudentAsync = { this.props.addStudentAsync}
                       clearStudentDataToModal = {this.props.clearStudentDataToModal}
                       setModalMode = {this.props.setModalMode}
                       updateStudentAsync = { this.props.updateStudentAsync}
                        
                       />
                    </section>
                   <section className = { Styles.sections }>
                        <FamilyrEditorView
                            isFetching = {this.props.isFetching}
                            role = { this.props.role }
                            studentDataInModal = { this.props.studentDataInModal }
                            nationalities = { this.props.nationalities } 
                            modalMode = { this.props.modalMode}
                        />
                    </section>
                   <button type = 'button' onClick = { () => this.props.setModalOpenState(false) }> Close </button>
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

    // вынести в селектор возможноть редактировать поле (то, что мы проверяем в модалке – isFetching || modalMode !== 'create' && role === 'admin')
    // isAbleToEdit: checkIsAbleToEdit(state);
});

const mapDispatchToProps = {
    addStudentAsync:         operations.addStudentAsync,
    updateStudentAsync:      operations.updateStudentAsync,
    clearStudentDataToModal: actions.clearStudentDataToModal,
    setModalMode:            actions.setModalMode,
    setModalOpenState:       actions.setModalOpenState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
