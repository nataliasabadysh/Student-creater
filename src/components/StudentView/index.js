// Core
import React from 'react';
import Moment from 'react-moment';

// Instuments
import './styles.module.css';

const header = ['First Name', 'Last Name', 'Date Of Birth', 'Family Name', 'Approve'];

const StudentView = ({ lastName, firstName, dateOfBirth, approve, onToggleApprove }) => (
    <div >
        <table >
            <tbody >
                <tr>
                    {header.map((item) => (
                        <th key = { item }>{item}</th>
                    ))}
                </tr>
                <tr>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>
                        <Moment format = 'YYYY/MM/DD'>
                            {dateOfBirth }
                        </Moment>
                    </td>
                    <td>Name</td>
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
