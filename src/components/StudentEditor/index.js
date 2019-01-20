// Core
import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { object, string, number } from 'yup';
import cx from 'classnames';

// Data Picker
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Component
import { operations } from '../../modules/Students';

// Instruments
import Styles from './styles.module.css';

// Validation  Form
const schema = object().shape({
    firstName:     string().required(),
    lastName:      string().required(),
    dateOfBirth:   number().required(),
    nationalities: string().required(),
});

class StudentEditor extends Component {
    formikForm = createRef();

  state = {
      firstName:     '',
      lastName:      '',
      //dateOfBirth:   '',
      nationalities: '',
    //   startDate:     new Date(),
  };
//   handleChange (date) {
//       this.setState({
//           startDate: date,
//       });
//   }

  _submitNewStudent = (Data) => {
      this.props.addStudentAsync(Data);
      //   this.setState({ ...this.state });
  };
  _createPost = ({ firstName, lastName, dateOfBirth, nationalities }) => {
      this.props.actions.addStudentAsync({ firstName, lastName, dateOfBirth, nationalities });
  };

  render () {
      const { isFetching } = this.props;

      return (
          <Formik
              validationSchema = { schema }
              onSubmit = { this._submitNewStudent }
              render = { (props) => {

                  const { isValid, touched, errors } = props;

                  const formStyle = cx(Styles.form, {
                      [Styles.disabledInput]: isFetching,
                  });

                  const invalidNameStyle = cx({
                      [Styles.disabledInput]: !isValid && touched.firstName && errors.firstName,
                  });

                  const invalidLastNameStyle = cx({
                      [Styles.disabledInput]: !isValid && touched.lastName && errors.lastName,
                  });
                    // const invaliDateStyle = cx({
                    //     [Styles.disabledInput]: !isValid && touched.dateOfBirth && errors.dateOfBirth,
                    // });
                  const invalidNationalityStyle = cx({
                      [Styles.isabledInput]: !isValid && touched.nationality && errors.nationality,
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
                                      disabled = { isFetching }
                                      name = 'firstName'
                                      placeholder = 'Name'
                                      type = 'text'
                                  />
                                  <Field
                                      className = { invalidLastNameStyle }
                                      disabled = { isFetching }
                                      name = 'lastName'
                                      placeholder = 'Last Name'
                                      type = 'text'
                                  />
                                
                                  {/* <DatePicker
                                      selected = { this.state.startDate }
                                      onChange = { this.handleChange }
                                  /> */}
                                  <Field
                                      className = { invalidNationalityStyle }
                                      disabled = { isFetching }
                                      name = 'nationalities'
                                      placeholder = 'Nationality'
                                      type = 'text'
                                  />

                                  <button className = { buttonStyle } disabled = { isFetching } type = 'submit'>
                                      { buttonMessage }
                                  </button>
                                  <button className = { buttonStyle } disabled = { isFetching } type = 'submit'>
                                      Cancel
                                  </button>
                              </div>
                          </div>
                      </Form>
                  );
              } }
          />
      );
  }
}
const mapStateToProps = (state) => ({
    isFetching: state.students.isFetching,
});

const mapDispatchToProps = {
    addStudentAsync: operations.addStudentAsync,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StudentEditor);
