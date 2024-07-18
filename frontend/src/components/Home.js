import React from 'react';

function Home() {
  const doctorName = localStorage.getItem('doctorName');
  const doctorUsername = localStorage.getItem('doctorUsername');

  return (
    <div>
      <h2>Welcome, {doctorName ? doctorName : 'Doctor'}!</h2>
      <p>Username: {doctorUsername}</p>
    </div>
  );
}

export default Home;
