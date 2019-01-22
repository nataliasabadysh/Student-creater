// Core
import React from 'react';
import Moment from 'react-moment';

// Instuments
import './styles.module.css';

const header = ['First Name', 'Last Name', 'Date Of Birth', 'Approve'];

const StudentView = ({
    role,
    ID,
    lastName,
    firstName,
    dateOfBirth,
    nationality,
    familyMembers,
    loadStudentDataToModal,
    setModalOpenState,
    setModalMode,
    date,
}) => {
    return (
        <table
            onClick = { (event) => {
                if (event.target.type !== 'checkbox') {
                    loadStudentDataToModal({
                        ID,
                        firstName,
                        lastName,
                        nationality,
                        dateOfBirth,
                        familyMembers,
                    });
                    setModalMode('update');
                    setModalOpenState(true);
                }
            } }>
            <tbody>
                <tr>
                    {header.map((item) => (
                        <th key = { item }>{item}</th>
                    ))}
                </tr>
                <tr>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>
                        <Moment format = 'YYYY/MM/DD' onChange = { date }>
                            {dateOfBirth}
                        </Moment>
                    </td>

                    <td>
                        <label>
                            Approve
                            <input
                                disabled = { role === 'admin' }
                                type = 'checkbox'
                            />
                        </label>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default StudentView;

/*

import React from 'react';
import './styles.module.css';

const header = ['First Name', 'Last Name', 'Date Of Birth'];

const StudentView = ({ approve, onToggleApprove, onShowOrder }) => (
    <div >
        <table >
            <tbody >
                <tr>
                    {header.map((item) => (
                        <th key = { item }>{item}</th>
                    ))}
                </tr>

                <tr onClick = {() => { onShowOrder(this.props.students.ID) } } >
                    {this.props.students.map(({ ID, firstName, lastName }) => (
                        <tr key = { ID }>
                            <td>{firstName}</td>
                            <td>{lastName}</td>
                        </tr>
                    ))}
                    <td>
                        <label >Approve
                            <input
                                checked = { approve }
                                onChange = { onToggleApprove }
                                type = 'checkbox'
                            />
                        </label>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
);

export default StudentView;
*/
