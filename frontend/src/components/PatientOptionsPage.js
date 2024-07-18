import React from 'react';
import { useNavigate } from 'react-router-dom';

function PatientOptionsPage() {
  const navigate = useNavigate();

  return (
    <div className="container flex flex-col items-center justify-center h-screen bg-gray-100">
      <button
        className="btn btn-primary mb-4"
        onClick={() => navigate('/patient-login')}
      >
        Login
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => navigate('/patient-register')}
      >
        Register
      </button>
    </div>
  );
}

export default PatientOptionsPage;
