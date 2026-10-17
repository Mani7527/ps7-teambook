import React from 'react';
import { Link } from 'react-router-dom';

// Demonstrating Props in React: Receiving employee via props
function EmployeeCard({ employee }) {
  return (
    <div className="card">
      <img src={employee.image} alt={employee.firstName} />
      <h4>{employee.firstName} {employee.lastName}</h4>
      <p>{employee.company?.title}</p>
      <p><b>{employee.company?.department}</b></p>
      <Link to={`/employees/${employee.id}`}>View Profile</Link>
    </div>
  );
}

export default EmployeeCard;
