import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import doctorImage from './doctor.png'; // Import the image
import Navbar from './PatientNavbar';
import './DoctorList.css'; // Custom CSS for Doctors List

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const response = await axios.get('http://localhost:5000/api/doctors', { withCredentials: true });
        setDoctors(response.data.doctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    }

    fetchDoctors();
  }, []);

  const handleTakeAppointment = (username) => {
    navigate(`/doctor-slots/${username}`, { state: { user_id } });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search doctors by name or specialization"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="doctors-list-container">
        {filteredDoctors.map((doctor) => (
          <div key={doctor._id} className="doctor-card">
            <div className="avatar">
              <img
                src={doctorImage}
                alt={`${doctor.name} Avatar`}
                className="rounded-full"
              />
            </div>
            <div className="card-body">
              <h2 className="card-title">{doctor.name}</h2>
              <p>{doctor.specialization}</p>
              <p>{doctor.experience} years of experience</p>
              <div className="card-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => handleTakeAppointment(doctor.user_id)}
                >
                  Take Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Doctors;
