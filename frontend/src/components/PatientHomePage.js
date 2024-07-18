import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PatientNavbar from './PatientNavbar';
import './PatientHomePage.css';

function PatientHomePage() {
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    if (!user_id) {
      navigate('/patient-login'); // Redirect to login if user_id is not available
      return;
    }

    // Fetch patient details on component mount
    axios.get(`http://localhost:5000/api/patient/${user_id}`, { withCredentials: true })
      .then(response => {
        setPatient(response.data); // Update state with patient details
      })
      .catch(error => {
        console.error('Error fetching patient details', error);
      });

    // Fetch all doctor slots to find patient appointments
    axios.get('http://localhost:5000/api/doctors/slots', { withCredentials: true })
      .then(response => {
        const allAppointments = [];
        response.data.forEach(doctor => {
          Object.entries(doctor.days).forEach(([day, slots]) => {
            Object.entries(slots).forEach(([slot, slotDetails]) => {
              if (slotDetails.patientid && slotDetails.patientid.includes(user_id)) {
                allAppointments.push({
                  doctorUsername: doctor.doctorusername,
                  day,
                  slot
                });
              }
            });
          });
        });
        setAppointments(allAppointments);
      })
      .catch(error => {
        console.error('Error fetching appointments', error);
      });
  }, [user_id, navigate]);

  const handleLogout = () => {
    // Clear any session or local storage related to authentication
    localStorage.removeItem('user_id');
    navigate('/');
  };

  return (
    <div>
      <PatientNavbar handleLogout={handleLogout} />
      <div className="container mx-auto p-4">
        <div className="patient-details">
          {patient && (
            <div >
              <h2 className="text-2xl font-bold mb-4">Welcome, {patient.name}</h2>
              <p><strong>Name:</strong> {patient.name}</p>
              <p><strong>Place:</strong> {patient.place}</p>
              <p><strong>User ID:</strong> {patient.user_id}</p>
            </div>
          )}
        </div>
        <div className="overflow-x-auto">
          <h2 className="text-2xl font-bold mb-4">Upcoming Appointments</h2>
          {appointments.length > 0 ? (
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th >Doctor</th>
                  <th >Day</th>
                  <th >Time</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={index}>
                    <td >{appointment.doctorUsername}</td>
                    <td >{appointment.day}</td>
                    <td >{appointment.slot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">No upcoming appointments.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PatientHomePage;
