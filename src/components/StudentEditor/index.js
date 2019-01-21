// Core
import React, { Component, createRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { object, string } from 'yup';
import cx from 'classnames';
import Select from 'react-select';

// Data Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


// Instruments
import Styles from './styles.module.css';

// Validation  Form
const schema = object().shape({
    firstName: string().required(),
    lastName:  string().required(),
    // dateOfBirth:   number().required(),
    // nationalities: string().required(),
});

export default class StudentEditor extends Component {
    options = this.props.nationalities.map((nationality) => {
        return {
            value: nationality.Title.toLowerCase(),
            label: nationality.Title,
        };
    });
    formikForm = createRef();

    state = {
      //dateOfBirth:   '',
        nationality: (this.props.studentDataInModal.nationality && this.props.studentDataInModal.nationality.Title.toLowerCase()) || this.props.nationalities[0].Title.toLowerCase() || '',
        dateOfBirth: (this.props.studentDataInModal.dateOfBirth && new Date(this.props.studentDataInModal.dateOfBirth)) || new Date(),
    };

    _selectDateOfBirth = (date) => {
        this.setState({
            dateOfBirth: date,
        });
    }

    componentWillUnmount () {
        this.props.clearStudentDataToModal();
        this.props.setModalMode('create');
    }

    componentDidMount () {
        const { studentDataInModal, nationalities } = this.props;
        
        this.setState({
            nationality: studentDataInModal.nationality && studentDataInModal.nationality.Title.toLowerCase() || nationalities[0].Title.toLowerCase(),
        });
    }

    _submitNewStudent = (Data) => {
        if (this.props.modalMode === 'create') {
            this.props.addStudentAsync({
              ID:            this.props.studentDataInModal.ID,
              ...Data,
              nationalityId: this.props.nationalities.find((nationality) => nationality.Title.toLowerCase() === this.state.nationality).ID,
              dateOfBirth: this.state.dateOfBirth.toISOString()
          });
        } else if (this.props.modalMode === 'update') {
            this.props.updateStudentAsync({
                ...Data,
                ID: this.props.studentDataInModal.ID,
                dateOfBirth: this.state.dateOfBirth.toISOString(),
                nationalityId: this.props.nationalities.find((nationality) => nationality.Title.toLowerCase() === this.state.nationality).ID,
            });
        }
    };

    _selectNationality = (selectedOption) => {
        this.setState({
          nationality: selectedOption.value,
      });
    }

    _getSubmitButtonMessage = () => {
        const { isFetching, modalMode } = this.props;

        let buttonMessage = 'Create';

        if (modalMode === 'create' && isFetching) {
            buttonMessage = 'Creating...' ;
        } else if (modalMode === 'update'  && !isFetching) {
            buttonMessage = 'Update' ;
        } else if (modalMode === 'update' && isFetching) {
            buttonMessage = 'Updating...' ;
        }

        return buttonMessage;
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

                 const buttonMessage = this._getSubmitButtonMessage();

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
                                      selected = { this.state.dateOfBirth }
                                      onChange = { this._selectDateOfBirth }
                                  />
                                  <Select
                                      isDisabled = { isFetching || /* isAbleToEdit */ modalMode !== 'create' && role === 'admin' }
                                      options = { this.options }
                                      value = { selectedOption }
                                      onChange = { this._selectNationality }
                                  />

                                  <button className = { buttonStyle } disabled = { isFetching || modalMode !== 'create' && role === 'admin' } type = 'submit'>
                                      { buttonMessage }
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

