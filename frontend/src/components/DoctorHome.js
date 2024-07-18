import React from 'react';
import 'daisyui/dist/full.css'; // Import DaisyUI CSS

function Home() {
  const doctorName = localStorage.getItem('doctorName');
  const doctorUsername = localStorage.getItem('doctorUsername');

  return (
    <div className="container bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome, Dr. {doctorName}!</h2>
      <p className="text-lg">Your Username: {doctorUsername}</p>
    </div>
  );
}

export default Home;
