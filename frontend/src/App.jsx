import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchDoctors from './pages/SearchDoctors';
import SearchPatients from './pages/SearchPatients';
import DoctorProfile from './pages/DoctorProfile';
import PatientProfile from './pages/PatientProfile';
import CreatePrescription from './pages/CreatePrescription';
import ViewPrescriptions from './pages/ViewPrescriptions';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search-doctors" element={<SearchDoctors />} />
        <Route path="/search-patients" element={<SearchPatients />} />
        <Route path="/doctor-profile/:id" element={<DoctorProfile />} />
        <Route path="/patient-profile/:id" element={<PatientProfile />} />
        <Route path="/create-prescription" element={<CreatePrescription />} />
        <Route path="/view-prescriptions" element={<ViewPrescriptions />} />
      </Routes>
    </Router>
  );
}

export default App;
