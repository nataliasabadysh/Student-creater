// Core
import React from 'react';
import Moment from 'react-moment';

// Instuments
import './styles.module.css';

const header = ['First Name', 'Last Name', 'Date Of Birth',  'Approve'];

const StudentView = ({ role, ID, lastName, firstName, dateOfBirth, nationality, loadStudentDataToModal, setModalOpenState, setModalMode , date}) => {
    return     <table onClick = { (event) => {
            if (event.target.type !== 'checkbox') {
                loadStudentDataToModal({ ID, firstName, lastName, nationality, dateOfBirth })
                setModalMode('update');
                setModalOpenState(true)
            }
        }}>
            <tbody >
                <tr>
                    {header.map((item) => (
                        <th key = { item }>{item}</th>
                    ))}
                </tr>
                <tr >
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>
                        <Moment format = 'YYYY/MM/DD' onChange={date}>
                            {dateOfBirth }
                        </Moment>
                    </td>
                
                    <td>
                        <label >Approve
                            <input
                                disabled = { role === 'admin' }
                                type = 'checkbox'
                            />
                        </label>
                    </td>
                </tr>
            </tbody>
        </table>
}

export default StudentView;

