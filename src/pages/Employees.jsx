import React, { useState, useEffect } from 'react';
import EmployeeCard from '../components/EmployeeCard';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch employees from API on page load
  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=30')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch employees');
        }
        return res.json();
      })
      .then((data) => {
        setEmployees(data.users || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError('Error loading employees. Please try again.');
        setLoading(false);
      });
  }, []);

  // Filter employees by search name and department
  const filtered = employees.filter((emp) => {
    const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(search.toLowerCase());
    const matchesDept = department === 'All' || emp.company?.department === department;
    return matchesSearch && matchesDept;
  });

  // Extract unique departments for dropdown
  const depts = ['All', ...new Set(employees.map((e) => e.company?.department).filter(Boolean))];

  return (
    <div className="container">
      <h2>Employees Directory</h2>

      {/* Search & Department Filter */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
          {depts.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Loading & Error States */}
      {loading && <p>Loading employees...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <div className="employee-list">
          {filtered.length === 0 ? (
            <p>No employees found.</p>
          ) : (
            filtered.map((emp) => (
              <EmployeeCard key={emp.id} employee={emp} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Employees;
