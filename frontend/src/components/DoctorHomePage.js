import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './DoctorHome';
import SelectSlots from './DoctorSelectSlotsPage';
import 'daisyui/dist/full.css'; // Import DaisyUI CSS
import './DoctorHomePage.css';
 
function DoctorHomePage() {
  return (
    <div className="container bg-white shadow-lg rounded-lg p-6">
      <nav className="navbar bg-base-100">
        <div className="navbar-start">
          <a href="/doctor-home" className="btn btn-ghost text-lg font-semibold">Doctor Dashboard</a>
        </div>
        <div className="navbar-end">
          <ul className="flex space-x-4">
            <li><Link to="/doctor-home" className="btn btn-ghost">Home</Link></li>
            <li><Link to="/doctor-home/select-slots" className="btn btn-ghost">Select Slots</Link></li>
            <li>
              <Link to="/" className="btn btn-ghost" onClick={() => {
                localStorage.removeItem('doctorName');
                localStorage.removeItem('doctorUsername');
              }}>Logout</Link>
            </li>
          </ul>
        </div>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select-slots" element={<SelectSlots />} />
      </Routes>
    </div>
  );
}

export default DoctorHomePage;
