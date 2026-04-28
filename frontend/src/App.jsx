import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="skills" element={<SkillCoaching />} />
          <Route path="vigyan" element={<VigyanYuvatha />} />
          <Route path="startup" element={<StartupStandup />} />
          <Route path="motivation" element={<RoleModels />} />
          <Route path="volunteer" element={<VolunteerConnect />} />
          <Route path="blood-donation" element={<BloodDonation />} />
          <Route path="report" element={<LocalProblemReporting />} />
          <Route path="news" element={<CurrentAffairs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
