import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PatientRegisterPage.css';

function PatientRegisterPage() {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/patients/register', { name, place, user_id: userId, password });
      if (response.data.success) {
        navigate('/patient-login');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Registration error', error);
    }
  };

  return (
    <div className="container">
      <h2>Patient Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Place: </label>
          <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} required />
        </div>
        <div>
          <label>User ID: </label>
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Confirm Password: </label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default PatientRegisterPage;
