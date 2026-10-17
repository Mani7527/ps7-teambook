import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container home">
      <h1>Welcome to TeamBook</h1>
      <p>Simple Employee Directory portal for finding colleagues and company info.</p>
      <Link to="/employees" className="btn">View Team</Link>
    </div>
  );
}

export default Home;
