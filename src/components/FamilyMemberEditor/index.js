// Core
import React, { Component, forwardRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { object, string } from 'yup';
import cx from 'classnames';
import Select from 'react-select';

// Data Picker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Instruments
import Styles from '../StudentEditor/styles.module.css';

// Validation  Form
const schema = object().shape({
    firstName: string().required(),
    lastName:  string().required(),
});

class FamilyMemberEditor extends Component {
    options = [
        {
            value: 'parent',
            label: 'Parent',
        },
        {
            value: 'sibling',
            label: 'Sibling',
        },
        {
            value: 'spouse',
            label: 'Spouse',
        }
    ];

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
    };

    state = {
        relationship: 'parent',
        nationality:  this.props.nationalities[0].Title.toLowerCase() || '',
        dateOfBirth:  new Date(),
    };

    _selectRelationship = (selectedOption) => {
        this.setState({
            relationship: selectedOption.value,
        });
    };

    _submittingFamilyMember = (familyMemberData) => {
        console.log('→ FAMILY MEMBER SUBMITTED', familyMemberData);
    };

    _selectDateOfBirth = (date) => {
        this.setState({
            dateOfBirth: date,
        });
    };

    //   deleteFamilyMember = ID => {
    //     const { actions, ID } = this.props;
    //     actions.deleteFamilyMemberAsync(ID);
    // };

    render () {
        const { nationality: selectedNationality } = this.state;
        const { isFetching, role, modalMode } = this.props;

        const selectedOption = this.options.find(
            (relationship) => relationship.value === this.state.relationship,
        );
        const selectedNationalityOption = this.options.find(
            (nationality) => nationality.value === selectedNationality,
        );

        const initialValues = this.props.familyMember ? {
            firstName: this.props.familyMember.firstName,
            lastName:  this.props.familyMember.lastName,
        } : {
            firstName: '',
            lastName:  '',
        } 

        return (
            <Formik
                initialValues = { initialValues }
                ref = { this.props.familyMemberFormRef }
                onSubmit = { this._submittingFamilyMember }
                render = { (props) => {
                    const { isValid, touched, errors } = props;

                    const formStyle = cx(Styles.form, {
                        [Styles.disabledInput]: isFetching,
                    });

                    const invalidNameStyle = cx({
                        [Styles.invalidInput]:
                            !isValid && touched.firstName && errors.firstName,
                    });
                    const invalidLastNameStyle = cx({
                        [Styles.invalidInput]:
                            !isValid && touched.lastName && errors.lastName,
                    });

                    return (
                        <Form className = { Styles.form }>
                            <div className = { formStyle }>
                                <div className = { Styles.wrapper__form }>
                                    <Field
                                        className = { invalidNameStyle }
                                        disabled = {
                                            isFetching ||
                                            modalMode !== 'create' &&
                                                role === 'admin'
                                        }
                                        name = 'firstName'
                                        placeholder = 'Name'
                                        type = 'text'
                                    />
                                    <Field
                                        className = { invalidLastNameStyle }
                                        disabled = {
                                            isFetching ||
                                            modalMode !== 'create' &&
                                                role === 'admin'
                                        }
                                        name = 'lastName'
                                        placeholder = 'LastName'
                                        type = 'text'
                                    />
                                    <DatePicker
                                        disabled = {
                                            isFetching ||
                                            modalMode !== 'create' &&
                                                role === 'admin'
                                        }
                                        dropdownMode = 'select'
                                        onChange = { this._selectDateOfBirth }
                                        selected = { this.state.dateOfBirth }
                                        showYearDropdown
                                    />
                                      <div className = { Styles.Selector }>
                                        <Select
                                            isDisabled = {
                                                isFetching ||
                                                modalMode !== 'create' &&
                                                    role === 'admin'
                                            }
                                            dropdownMode = 'select'
                                            options = { this.options }
                                            value = { selectedOption }
                                            onChange = { this._selectRelationship }
                                        />
                                    </div>
                                    <div className = { Styles.Selector }>
                                    <Select
                                    
                                        isDisabled = {
                                            isFetching ||
                                            modalMode !== 'create' &&
                                                role === 'admin'
                                        }
                                        options = { this.nationalityOptions }
                                        value = { selectedNationalityOption }
                                        onChange = { this._selectNationality }
                                    />
                                    </div>
                                </div >
                            </div>
                        </Form>
                    );
                } }
                validationSchema = { schema }
            />
        );
    }
}
export default forwardRef((props, ref) => {
    return <FamilyMemberEditor { ...props } familyMemberFormRef = { ref } />;
});
