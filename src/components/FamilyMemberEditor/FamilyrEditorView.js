// Core
import React, { Component, createRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { object, string } from 'yup';
import cx from 'classnames';
import Select from 'react-select';

// Component
// import { oparations } from '../../modules/Students';

// Instruments
import Styles from '../StudentEditor/styles.module.css';

// Validation  Form
const schema = object().shape({
    firstName: string().required(),
    lastName:  string().required(),
    // dateOfBirth: string().required(),
    // nationality: string().required(),
});

// const delay = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));
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
    
    formikForm = createRef();
 
  state = {
      relationship: 'parent',
  };

  // Add fetchNationalityFamilyAsync
//   componentDidMount () {
//     this.props.fetchNationalityFamilysAsync();
// }

  _selectRelationship = (selectedOption) => {

      this.setState({
          relationship: selectedOption.value,
      });
  }

  _submittingFamilyMember = (Data) => {
    //    this.props.addStudentAsync(Data);
  };

  _createPost = ({ Name, Relationship, Nationality }) => {
      this.props.actions.addStudentAsync({ Name, Relationship, Nationality });
  };

  //   deleteFamilyMember = ID => {
  //     const { actions, ID } = this.props;
  //     actions.deleteFamilyMemberAsync(ID);
  // };

  render () {
      const { isFetching, role, modalMode } = this.props;

      const selectedOption = this.options.find((relationship) => relationship.value === this.state.relationship);

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

                //   const invalidRelationshipStyle = cx({
                //       [Styles.disabledInput]: !isValid && touched.lastName && errors.lastName,
                //   });

                  const invalidNationalityStyle = cx({
                      [Styles.disabledInput]: !isValid && touched.nationality && errors.nationality,
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
                                      disabled = { isFetching }
                                      name = 'firstName'
                                      placeholder = 'Name'
                                      type = 'text'
                                  />
                                   <Field
                                      className = { invalidLastNameStyle }
                                      disabled = { isFetching }
                                      name = 'lastName'
                                      placeholder = 'LastName'
                                      type = 'text'
                                  />
                                  <Select
                                      isDisabled = { isFetching || modalMode !== 'create' && role === 'admin' }
                                      options = { this.options }
                                      value = { selectedOption }
                                      onChange = { this._selectRelationship }
                                      
                                  />
                                  <Field
                                      className = { invalidNationalityStyle }
                                      disabled = { isFetching }
                                      name = 'Nationality'
                                      placeholder = 'Nationality'
                                      type = 'text'
                                  />

                                  <button className = { buttonStyle } disabled = { isFetching } type = 'submit'>
                                      { buttonMessage }
                                  </button>
                                  <button type = 'submit'> Delete  </button>
                              </div>
                          </div>
                      </Form>
                  );
              } }
          />
      );
  }
}
