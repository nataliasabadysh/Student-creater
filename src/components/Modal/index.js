// Core
import React, { Component, createRef } from "react";
import { connect } from 'react-redux';

// Components
import StudentEditor from '../StudentEditor';
import FamilyrEditorView from '../FamilyMemberEditor/FamilyrEditorView';

// Instruments
import Styles from './Modal.module.css';
import { actions } from '../../modules/Students';

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
       return this.props.isModalOpen &&
           (<div className = { Styles.backDrop } ref = { this.backdropRef } onClick = { this.handelBackdropClick }>
               <div className = { Styles.modal }>
                   <section className = { Styles.sections }><StudentEditor /></section>
                   <section className = { Styles.sections }><FamilyrEditorView /></section>
                   <button type = 'button' onClick = { () => this.props.setModalOpenState(false) }> Close </button>
               </div>
           </div>
           );
   }

}

const mapStateToProps = (state) => ({
    isModalOpen:        state.students.isModalOpen,
});

const mapDispatchToProps = {
    setModalOpenState: actions.setModalOpenState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
