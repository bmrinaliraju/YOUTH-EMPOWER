import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Cpu,
  Lightbulb,
  Star,
  Users,
  Heart,
  AlertTriangle,
  Globe,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'Skill Coaching', path: '/skills', icon: <BookOpen size={20} /> },
    { name: 'Vigyan Yuvatha', path: '/vigyan', icon: <Cpu size={20} /> },
    { name: 'Startup / Standup', path: '/startup', icon: <Lightbulb size={20} /> },
    { name: 'Role Models', path: '/motivation', icon: <Star size={20} /> },
    { name: 'Volunteer Connect', path: '/volunteer', icon: <Users size={20} /> },
    { name: 'Blood Donation', path: '/blood-donation', icon: <Heart size={20} /> },
    { name: 'Local Problem Reporting', path: '/report', icon: <AlertTriangle size={20} /> },
    { name: 'Current Affairs', path: '/news', icon: <Globe size={20} /> },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      <div
        className={`fixed inset-0 z-20 bg-gray-900 bg-opacity-50 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#0B3D91] text-white transition duration-300 transform lg:translate-x-0 lg:static lg:inset-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-[#092e6e] border-b border-[#1c55b5]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1">
              <img src="/src/assets/logo.jpeg" alt="NCC Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold uppercase tracking-wider">NCC EMPOWER PORTAL</span>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden text-gray-300 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)] custom-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 group ${isActive
                  ? 'bg-[#556B2F] text-white shadow-md'
                  : 'text-gray-300 hover:bg-[#1c55b5] hover:text-white'
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
