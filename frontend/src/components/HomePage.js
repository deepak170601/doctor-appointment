import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'daisyui/dist/full.css'; // Import DaisyUI CSS
import './HomePage.css'; // Your custom CSS file

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="container home-container">
      <button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={() => navigate('/doctor-login')}>
        Doctor
      </button>
      <button  class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={() => navigate('/patient-options')}>
        Patient
      </button>
    </div>
  );
}

export default HomePage;
