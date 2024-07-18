// PatientNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './PatientNavbar.css';
function PatientNavbar({ handleLogout }) {
  return (
        <div className="container bg-white shadow-lg rounded-lg p-6">
          <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link to="/patient-home" className="btn btn-ghost text-xl">Patient Home</Link>
      </div>
      <div className="navbar-end">
        <ul className="flex space-x-4">
          <li><Link to="/doctors" className="btn btn-ghost">Doctors</Link></li>
          <li><Link to="/history" className="btn btn-ghost">History</Link></li>
          <li><Link to="/" onClick={handleLogout} className="btn btn-ghost">Logout</Link></li>
        </ul>
      </div>
    </div>
        </div>
  );
}

export default PatientNavbar;
