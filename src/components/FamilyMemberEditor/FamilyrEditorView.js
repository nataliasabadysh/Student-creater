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
import Styles from '../StudentEditor/styles.module.css';

// Validation  Form
const schema = object().shape({
    firstName: string().required(),
    lastName:  string().required(),
});

export default class FamilyMemberEditor extends Component {

    options = [{
        value: 'parent',
        label: 'Parent',
    }, {
        value: 'sibling',
        label: 'Sibling',
    }, {
        value: 'spouse',
        label: 'Spouse',
    }]

    nationalityOptions = this.props.nationalities.map((nationality) => {
        return {
            value: nationality.Title.toLowerCase(),
            label: nationality.Title,
        };
    });
    _selectNationality = (selectedNatoinalityOption) => {
        this.setState({
            nationality: selectedNatoinalityOption.value,
        });
    }
    formikForm = createRef();

    state = {
        relationship: 'parent',
        nationality:  this.props.nationalities[0].Title.toLowerCase() || '',
        dateOfBirth:  new Date(),

    };

    _selectRelationship = (selectedOption) => {
        this.setState({
            relationship: selectedOption.value,
        });
    }

    _submittingFamilyMember = (Data) => {

    //    this.props.addStudentAsync(Data);
    };
    _selectDateOfBirth = (date) => {
        this.setState({
            dateOfBirth: date,
        });
    }

  //   deleteFamilyMember = ID => {
  //     const { actions, ID } = this.props;
  //     actions.deleteFamilyMemberAsync(ID);
  // };

    render () {
        const { nationality: selectedNationality } = this.state;
        const { isFetching, role, modalMode } = this.props;

        const selectedOption = this.options.find((relationship) => relationship.value === this.state.relationship);
        const selectedNatoinalityOption = this.options.find((nationality) => nationality.value === selectedNationality);

        return (
            <Formik
                initialValues = { {
                  firstName: '',
                  lastName:  '',
              } }
                validationSchema = { schema }
                onSubmit = { this._submittingFamilyMember }
                
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
                  const buttonMessage = isFetching ? 'Creating...' : 'Family Member';

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
                                      placeholder = 'LastName'
                                      type = 'text'
                                  />
                                  <DatePicker
                                      showYearDropdown
                                      dropdownMode = 'select'
                                      disabled = { isFetching || modalMode !== 'create' && role === 'admin' }
                                      selected = { this.state.dateOfBirth }
                                      onChange = { this._selectDateOfBirth }
                                  />
                                  <Select
                                      isDisabled = { isFetching || modalMode !== 'create' && role === 'admin' }
                                      options = { this.options }
                                      value = { selectedOption }
                                      onChange = { this._selectRelationship }

                                  />
                                  <Select
                                      isDisabled = { isFetching || /* isAbleToEdit */ modalMode !== 'create' && role === 'admin' }
                                      options = { this.nationalityOptions }
                                      value = { selectedNatoinalityOption }
                                      onChange = { this._selectNationality }
                                  />

                                  <button className = { buttonStyle } disabled = { isFetching } type = 'submit'>
                                      { buttonMessage }
                                  </button>
                                  <button type = 'submit'>Delete</button>
                              </div>
                          </div>
                      </Form>
                  );
              } }
            />
        );
    }
}
