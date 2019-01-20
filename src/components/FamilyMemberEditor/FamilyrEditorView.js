// Core
import React, { Component, createRef } from 'react';
// import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { object, string } from 'yup';
import cx from 'classnames';

// Component
// import { oparations } from '../../modules/Students';

// Instruments
import Styles from '../StudentEditor/styles.module.css';

// Validation  Form
const schema = object().shape({
    Name:         string().required(),
    Relationship: string().required(),
    Nationality:  string().required(),
});

// const delay = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));
export default class StudentEditor extends Component {
    formikForm = createRef();

  state = {
      Name:         '',
      Relationship: [],
      Nationality:  [],
  };

  _submittingFamilyMember = (Data) => {
      //  this.props.addStudentAsync(Data);
  };
  _createPost = ({ Name, Relationship, Nationality }) => {
      this.props.actions.addStudentAsync({ Name, Relationship, Nationality });
  };

//   deleteFamilyMember = ID => {
//     const { actions, ID } = this.props;
//     actions.deleteFamilyMemberAsync(ID);
// };

  render () {
      const { isFetching } = this.props;

      return (
          <Formik
              validationSchema = { schema }
              onSubmit = { this._submittingFamilyMember }
              render = { (props) => {

                  const { isValid, touched, errors } = props;

                  const formStyle = cx(Styles.form, {
                      [Styles.disabledInput]: isFetching,
                  });

                  const invalidNameStyle = cx({
                      [Styles.disabledInput]: !isValid && touched.firstName && errors.firstName,
                  });

                  const invalidRelationshipStyle = cx({
                      [Styles.disabledInput]: !isValid && touched.lastName && errors.lastName,
                  });

                  const invalidNationalityStyle = cx({
                      [Styles.disabledInput]: !isValid && touched.nationality && errors.nationality,
                  });
                  const buttonStyle = cx(Styles.formSubmit, {
                      [Styles.disabledButton]: isFetching,
                  });
                  const buttonMessage = isFetching ? 'Creating new Family Member...' : 'Family Member';

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
                                      className = { invalidRelationshipStyle }
                                      disabled = { isFetching }
                                      name = 'Relationship'
                                      placeholder = 'Relationship'
                                      type = 'text'
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
// const mapStateToProps = state =>({
//   // isFetching: state.students.isFetching
// });

// const mapDispatchToProps = {
//   // addStudentAsync: studentOperations.addStudentAsync
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(StudentEditor);
