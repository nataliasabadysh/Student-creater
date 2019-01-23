// Core
import React from 'react';
import Moment from 'react-moment';

// Instuments
import './styles.module.css';

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
        <tr
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
          <input disabled = { role === 'admin' } type = 'checkbox' />
                </label>
            </td>
        </tr>
    );
};

export default StudentView;
