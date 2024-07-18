import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PatientLoginPage.css';

function PatientLoginPage() {
  const [user_id, setUser_id] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/patient/login',
        { user_id, password },
        { withCredentials: true }
      );
      if (response.data.success) {
        localStorage.setItem('user_id', user_id); // Store user_id in local storage
        navigate('/patient-home'); // Redirect to patient-home
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div className="login-container">
      <h2 className="text-2xl font-bold mb-6">Patient Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          value={user_id}
          onChange={(e) => setUser_id(e.target.value)}
          placeholder="User ID"
          required
          className="input input-bordered w-full mb-6"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="input input-bordered w-full mb-6"
        />
        <button type="submit" className="btn btn-active btn-neutral-">
          Login
        </button>
      </form>
    </div>
  );
}

export default PatientLoginPage;
