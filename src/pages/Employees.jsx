import React, { useState, useEffect } from 'react';
import EmployeeCard from '../components/EmployeeCard';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [loading, setLoading] = useState(true);

  // Fetch employees from API on page load
  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=30')
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data.users || []);
        setLoading(false);
      })
      .catch((err) => console.log(err));
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

      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <div className="employee-list">
          {filtered.map((emp) => (
            <EmployeeCard key={emp.id} employee={emp} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Employees;
