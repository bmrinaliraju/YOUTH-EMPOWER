import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import SkillCoaching from './pages/SkillCoaching';
import VigyanYuvatha from './pages/VigyanYuvatha';
import StartupStandup from './pages/StartupStandup';
import RoleModels from './pages/RoleModels';
import VolunteerConnect from './pages/VolunteerConnect';
import BloodDonation from './pages/BloodDonation';
import LocalProblemReporting from './pages/LocalProblemReporting';
import CurrentAffairs from './pages/CurrentAffairs';
import Signup from './pages/Signup';
import Connect from './pages/Connect';
import Profile from './pages/Profile';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Home />} />
          <Route path="skills" element={<SkillCoaching />} />
          <Route path="vigyan" element={<VigyanYuvatha />} />
          <Route path="startup" element={<StartupStandup />} />
          <Route path="motivation" element={<RoleModels />} />
          <Route path="volunteer" element={<VolunteerConnect />} />
          <Route path="blood-donation" element={<BloodDonation />} />
          <Route path="report" element={<LocalProblemReporting />} />
          <Route path="news" element={<CurrentAffairs />} />
          <Route path="connect" element={<Connect />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
