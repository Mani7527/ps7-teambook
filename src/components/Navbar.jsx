import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">TeamBook</Link>
      <div>
        <Link to="/">Home</Link>
        <Link to="/employees">Employees</Link>
      </div>
    </nav>
  );
}

export default Navbar;
