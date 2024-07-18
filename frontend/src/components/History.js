import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import PatientNavbar from './PatientNavbar';
import './History.css';

function History() {
  const [history, setHistory] = useState([]);
  const user_id = localStorage.getItem('user_id');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (!user_id) {
      navigate('/patient-login'); // Redirect to login if user_id is not available
      return;
    }

    const fetchHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/history/${user_id}`, { withCredentials: true });
        setHistory(response.data.history);
      } catch (error) {
        console.error('Error fetching history', error);
      }
    };

    fetchHistory();
  }, [user_id, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    navigate('/');
  };

  return (
    <div>
      <PatientNavbar handleLogout={handleLogout} />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Appointment History</h1>
        {history.length > 0 ? (
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((record) => (
                <tr key={record._id}>
                  <td>{record.doctorname}</td>
                  <td>{new Date(record.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No past appointments found.</p>
        )}
      </div>
    </div>
  );
}

export default History;
