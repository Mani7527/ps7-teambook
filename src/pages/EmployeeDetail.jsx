import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TaskItem from '../components/TaskItem';

function EmployeeDetail() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch single employee
    fetch(`https://dummyjson.com/users/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Employee not found');
        }
        return res.json();
      })
      .then((data) => {
        setEmployee(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError('Error loading employee profile. Please try again.');
        setLoading(false);
      });

    // Bonus: Fetch employee tasks
    fetch(`https://dummyjson.com/users/${id}/todos`)
      .then((res) => res.json())
      .then((data) => setTodos(data.todos || []))
      .catch((err) => console.log(err));
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="container">
        <p>Loading details...</p>
      </div>
    );
  }

  // Error state
  if (error || !employee) {
    return (
      <div className="container">
        <p style={{ color: 'red', marginBottom: '10px' }}>{error || 'Employee not found.'}</p>
        <Link to="/employees" style={{ color: '#0d6efd', textDecoration: 'none' }}>
          &larr; Back to Employees
        </Link>
      </div>
    );
  }

  // Rule: Do not show password, ssn, or bank anywhere
  return (
    <div className="container">
      {/* Back button */}
      <Link to="/employees" style={{ color: '#0d6efd', textDecoration: 'none' }}>
        &larr; Back to Employees
      </Link>

      <div className="detail-card">
        <div className="detail-header">
          <img src={employee.image} alt={employee.firstName} />
          <div>
            <h2>{employee.firstName} {employee.lastName}</h2>
            <p style={{ color: '#666' }}>{employee.company?.title} ({employee.company?.department})</p>
          </div>
        </div>

        <div className="info-group">
          <h4>Personal Details</h4>
          <p><b>Age:</b> {employee.age}</p>
          <p><b>Email:</b> {employee.email}</p>
          <p><b>Phone:</b> {employee.phone}</p>
          <p><b>City:</b> {employee.address?.city || 'N/A'}</p>
        </div>

        <div className="info-group">
          <h4>Company Details</h4>
          <p><b>Company:</b> {employee.company?.name || 'N/A'}</p>
          <p><b>Department:</b> {employee.company?.department || 'N/A'}</p>
          <p><b>Job Title:</b> {employee.company?.title || 'N/A'}</p>
        </div>

        <div className="info-group">
          <h4>Assigned Tasks ({todos.length})</h4>
          {todos.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            todos.map((task) => (
              <TaskItem key={task.id} todo={task} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetail;
