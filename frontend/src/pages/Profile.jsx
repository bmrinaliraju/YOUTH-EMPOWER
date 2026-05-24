import React, { useState, useEffect } from 'react';
import { 
  User, Award, Heart, Users, BookOpen, Cpu, LogOut,
  Shield, MapPin, Phone, Mail, Calendar, CheckCircle,
  TrendingUp, Clock, Droplet, Star, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('currentUser') || '{}');
    } catch {
      return {};
    }
  });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        const updatedUser = { ...currentUser, profilePic: base64String };
        setCurrentUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        // Also update in the registered users list in localStorage if it exists
        try {
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const updatedUsers = users.map(u => u.username === currentUser.username ? { ...u, profilePic: base64String } : u);
          localStorage.setItem('users', JSON.stringify(updatedUsers));
        } catch (err) {
          console.error("Failed to update users list:", err);
        }

        // Dispatch a storage event to let Navbar know
        window.dispatchEvent(new Event('storage'));
        alert('Profile picture updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const [userRole] = useState(() => localStorage.getItem('userRole') || 'cadet');

  // Pull progress data from localStorage
  const [coachingProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('coaching_progress') || '{}');
    } catch {
      return {};
    }
  });

  const [vigyanProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('vigyan_progress') || '{}');
    } catch {
      return {};
    }
  });

  const [coachingCerts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('coaching_passed_exams') || '[]');
    } catch {
      return [];
    }
  });

  const [vigyanCerts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('vigyan_passed_exams') || '[]');
    } catch {
      return [];
    }
  });

  const [volunteerEvents] = useState(() => {
    try {
      const events = JSON.parse(localStorage.getItem('volunteer_events') || '[]');
      // filter events where current user is a participant
      const username = currentUser.name || currentUser.username || '';
      return events.filter(e => 
        e.participants?.some(p => p.name === username)
      );
    } catch {
      return [];
    }
  });

  const [bloodDonations] = useState(() => {
    try {
      const proofs = JSON.parse(localStorage.getItem('blood_donor_proofs') || '[]');
      const username = currentUser.name || currentUser.username || '';
      return proofs.filter(p => p.name === username);
    } catch {
      return [];
    }
  });

  const [driveRegistrations] = useState(() => {
    try {
      const regs = JSON.parse(localStorage.getItem('blood_drive_registrations') || '[]');
      const username = currentUser.name || currentUser.username || '';
      return regs.filter(r => r.userName === username);
    } catch {
      return [];
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const getRoleBadge = () => {
    if (userRole === 'admin') return { label: 'Super Admin', color: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300', icon: <Shield size={14} /> };
    if (userRole === 'admin_blood') return { label: 'Blood Admin', color: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300', icon: <Droplet size={14} /> };
    if (userRole === 'admin_problem') return { label: 'Problem Admin', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300', icon: <Shield size={14} /> };
    return { label: 'Cadet', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300', icon: <Star size={14} /> };
  };

  const roleBadge = getRoleBadge();

  const displayName = currentUser.name || currentUser.username || 'Cadet User';
  const initials = displayName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  const allCerts = [...coachingCerts, ...vigyanCerts];
  const totalVolunteerEvents = volunteerEvents.length;
  const totalDonations = bloodDonations.filter(d => d.status === 'Approved').length + driveRegistrations.length;

  return (
    <div className="space-y-6 animate-fade-in pb-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
          <User className="mr-3 text-[#0B3D91]" size={32} /> My Profile
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm transition-colors shadow"
        >
          <LogOut size={16} className="mr-2" /> Logout
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-br from-[#0B3D91] to-[#1a5abf] rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="relative group flex-shrink-0">
            <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center text-3xl font-bold text-white overflow-hidden">
              {currentUser.profilePic ? (
                <img src={currentUser.profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                initials || 'C'
              )}
            </div>
            <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <span className="text-white text-xs font-semibold">Change</span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          </div>
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl font-bold">{displayName}</h2>
            <p className="text-blue-200 text-sm mt-0.5">@{currentUser.username || 'user'}</p>
            <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${roleBadge.color}`}>
                {roleBadge.icon} {roleBadge.label}
              </span>
              {currentUser.city && (
                <span className="inline-flex items-center gap-1 text-xs text-blue-200">
                  <MapPin size={12} /> {currentUser.city}
                </span>
              )}
            </div>
          </div>
          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 text-center mt-2 sm:mt-0">
            <div>
              <p className="text-2xl font-bold">{totalVolunteerEvents}</p>
              <p className="text-[11px] text-blue-200 mt-0.5">Events Joined</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{totalDonations}</p>
              <p className="text-[11px] text-blue-200 mt-0.5">Donations</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{allCerts.length}</p>
              <p className="text-[11px] text-blue-200 mt-0.5">Certificates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Skills & Vigyan Progress */}
        {(userRole === 'cadet' || userRole === 'admin') && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <BookOpen className="mr-2 text-[#0B3D91]" size={20} /> Learning Progress
            </h3>
            {Object.keys(coachingProgress).length === 0 && Object.keys(vigyanProgress).length === 0 ? (
              <div className="text-center py-8">
                <BookOpen size={32} className="mx-auto text-gray-300 dark:text-gray-600 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">No courses started yet.</p>
                <a href="/skills" className="mt-2 inline-block text-xs font-semibold text-[#0B3D91] hover:underline">Start Skill Coaching →</a>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries({ ...coachingProgress, ...vigyanProgress }).map(([course, pct]) => (
                  <div key={course}>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-gray-700 dark:text-gray-300 capitalize">{course}</span>
                      <span className="text-[#0B3D91] dark:text-blue-400">{pct}%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-[#0B3D91] to-[#556B2F] transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Certificates */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <Award className="mr-2 text-yellow-500" size={20} /> Certificates Earned
          </h3>
          {allCerts.length === 0 ? (
            <div className="text-center py-8">
              <Award size={32} className="mx-auto text-gray-300 dark:text-gray-600 mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">No certificates earned yet.</p>
              <p className="text-xs text-gray-400 mt-1">Complete a course with 50%+ score to earn one.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {allCerts.map((cert, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-100 dark:border-yellow-900/30 rounded-lg">
                  <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 dark:text-white">{cert}</p>
                  </div>
                  <CheckCircle size={16} className="ml-auto text-green-500 flex-shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Volunteer History */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <Users className="mr-2 text-[#556B2F]" size={20} /> Volunteer Participation
          </h3>
          {volunteerEvents.length === 0 ? (
            <div className="text-center py-8">
              <Users size={32} className="mx-auto text-gray-300 dark:text-gray-600 mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">No events joined yet.</p>
              <a href="/volunteer" className="mt-2 inline-block text-xs font-semibold text-[#556B2F] hover:underline">Explore Events →</a>
            </div>
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {volunteerEvents.map((event, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/10 border border-green-100 dark:border-green-900/20 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 text-[#556B2F] rounded-full flex items-center justify-center flex-shrink-0">
                    <Users size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 dark:text-white truncate">{event.title}</p>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500">
                      <Calendar size={10} /> {event.date}
                      <MapPin size={10} /> {event.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Blood Donation Log */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <Heart className="mr-2 text-red-500" size={20} /> Blood Donation History
          </h3>
          {bloodDonations.length === 0 && driveRegistrations.length === 0 ? (
            <div className="text-center py-8">
              <Heart size={32} className="mx-auto text-gray-300 dark:text-gray-600 mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">No donation records yet.</p>
              <a href="/blood-donation" className="mt-2 inline-block text-xs font-semibold text-red-500 hover:underline">Donate Blood →</a>
            </div>
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {bloodDonations.map((proof, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/20 rounded-lg">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Droplet size={14} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800 dark:text-white">Donation Proof — {proof.group}</p>
                    <p className="text-[10px] text-gray-500">{proof.date}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    proof.status === 'Approved' ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300' :
                    proof.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300'
                  }`}>
                    {proof.status}
                  </span>
                </div>
              ))}
              {driveRegistrations.map((reg, i) => (
                <div key={`reg-${i}`} className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-900/20 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-[#0B3D91] rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar size={14} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800 dark:text-white truncate">Camp: {reg.driveName}</p>
                    <p className="text-[10px] text-gray-500">{reg.group} · {reg.timesDonated} donation(s)</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
                    Enlisted
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
