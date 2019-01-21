// Core
import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { object, string } from 'yup';
import cx from 'classnames';
import Select from 'react-select';

// Data Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Component
import { actions, operations } from '../../modules/Students';

// Instruments
import Styles from './styles.module.css';

// Validation  Form
const schema = object().shape({
    firstName: string().required(),
    lastName:  string().required(),
    // dateOfBirth:   number().required(),
    // nationalities: string().required(),
});

class StudentEditor extends Component {
    options = this.props.nationalities.map((nationality) => {
        return {
            value: nationality.Title.toLowerCase(),
            label: nationality.Title,
        };
    });
    formikForm = createRef();

    state = {
      //dateOfBirth:   '',
        nationality: this.props.nationalities[0].Title.toLowerCase() || '',
        startDate:   new Date(),
    };
    handleChange (date) {
        this.setState({
          startDate: date,
      });
    }

    componentWillUnmount () {
        this.props.clearStudentDataToModal();
        this.props.setModalMode('create');
    }

    componentDidMount () {
        this.setState({
            nationality: this.props.nationalities[0].Title.toLowerCase(),
        });
    }

    _submitNewStudent = (Data) => {
        this.props.addStudentAsync({
          ID:            this.props.studentDataInModal.ID,
          ...Data,
          nationalityId: this.props.nationalities.find((nationality) => nationality.Title.toLowerCase() === this.state.nationality).ID,
      });
    };

    _selectNationality = (selectedOption) => {
        this.setState({
          nationality: selectedOption.value,
      });
    }

    render () {
        const { nationality: selectedNationality } = this.state;
        const { isFetching, studentDataInModal, role, modalMode } = this.props;

        const selectedOption = this.options.find((nationality) => nationality.value === selectedNationality);

        return (
          <Formik
              initialValues = { {
                  firstName: studentDataInModal.firstName,
                  lastName:  studentDataInModal.lastName,
              } }
              validationSchema = { schema }
              render = { (props) => {

                  const { isValid, touched, errors } = props;

                  const formStyle = cx(Styles.form, {
                      [Styles.disabledInput]: isFetching,
                  });

                  const invalidNameStyle = cx({
                      [Styles.invalidInput]: !isValid && touched.firstName && errors.firstName,
                  });

                  const invalidLastNameStyle = cx({
                      [Styles.invalidInput]: !isValid && touched.lastName && errors.lastName,
                  });

                  const buttonStyle = cx(Styles.formSubmit, {
                      [Styles.disabledButton]: isFetching,
                  });
                  const buttonMessage = isFetching ? 'Creating new Student...' : 'Save';

                  return (
                      <Form className = { Styles.form }>
                          <div className = { formStyle }>
                              <div>
                                  <Field
                                      className = { invalidNameStyle }
                                      disabled = { isFetching || modalMode !== 'create' && role === 'admin' }
                                      name = 'firstName'
                                      placeholder = 'Name'
                                      type = 'text'
                                  />
                                  <Field
                                      className = { invalidLastNameStyle }
                                      disabled = { isFetching || modalMode !== 'create' && role === 'admin' }
                                      name = 'lastName'
                                      placeholder = 'Last Name'
                                      type = 'text'
                                  />

                                  <DatePicker
                                      selected = { this.state.startDate }
                                      onChange = { this.handleChange }
                                  />
                                  <Select
                                      isDisabled = { isFetching || modalMode !== 'create' && role === 'admin' }
                                      options = { this.options }
                                      value = { selectedOption }
                                      onChange = { this._selectNationality }
                                  />

                                  <button className = { buttonStyle } disabled = { isFetching || modalMode !== 'create' && role === 'admin' } type = 'submit'>
                                      { buttonMessage }
                                  </button>
                                  <button className = { buttonStyle } type = 'submit'>
                                      Cancel
                                  </button>
                              </div>
                          </div>
                      </Form>
                  );
              } }
              onSubmit = { this._submitNewStudent }
          />
      );
    }
}
const mapStateToProps = (state) => ({
    isFetching:         state.students.isFetching,
    role:               state.students.role,
    studentDataInModal: state.students.studentDataInModal,
    nationalities:      state.students.nationalities,
    modalMode:          state.students.modalMode,
});

const mapDispatchToProps = {
    addStudentAsync:         operations.addStudentAsync,
    clearStudentDataToModal: actions.clearStudentDataToModal,
    setModalMode:            actions.setModalMode,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StudentEditor);
