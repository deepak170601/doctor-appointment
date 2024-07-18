import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'daisyui/dist/full.css'; // Import DaisyUI CSS
import './DoctorLoginPage.css'; // Your custom CSS file

function DoctorLoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/doctors/login', { user_id: userId, password }, { withCredentials: true });
      if (response.data.success) {
        const { name, user_id } = response.data.doctor;
        localStorage.setItem('doctorName', name);
        localStorage.setItem('doctorUsername', user_id);
        navigate('/doctor-home');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error', error);
      alert('Login failed');
    }
  };

  return (
    <div className="container">
      <div className="form-container bg-white shadow-lg rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Doctor Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="userId" className="label">
              User ID:
            </label>
            <input
              id="userId"
              type="text"
              className="input input-bordered"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="password" className="label">
              Password:
            </label>
            <input
              id="password"
              type="password"
              className="input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DoctorLoginPage;
