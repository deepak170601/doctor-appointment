import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import DoctorLoginPage from './components/DoctorLoginPage';
import PatientOptionsPage from './components/PatientOptionsPage';
import PatientLoginPage from './components/PatientLoginPage';
import PatientRegisterPage from './components/PatientRegisterPage';
import DoctorHomePage from './components/DoctorHomePage';
import PatientHomePage from './components/PatientHomePage';
import Doctors from './components/Doctors';
import Appointment from './components/Appointment';
import './App.css'; // Import the global CSS file
import { AuthProvider } from './components/AuthContext';
import { UserProvider } from './components/UserContext';
import History from './components/History';

function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/doctor-login" element={<DoctorLoginPage />} />
            <Route path="/patient-options" element={<PatientOptionsPage />} />
            <Route path="/patient-login" element={<PatientLoginPage />} />
            <Route path="/patient-register" element={<PatientRegisterPage />} />
            <Route path="/doctor-home/*" element={<DoctorHomePage />} />
            <Route path="/patient-home/*" element={<PatientHomePage />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctor-slots/:username" element={<Appointment />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </Router>
      </AuthProvider>
    </UserProvider>
  );
}

export default App;
