import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
  X,
  MessageSquare,
  User,
  LogOut
} from 'lucide-react';

const ALL_NAV_ITEMS = [
  { name: 'Dashboard', path: '/', icon: <Home size={20} />, roles: ['cadet', 'admin'] },
  { name: 'Skill Coaching', path: '/skills', icon: <BookOpen size={20} />, roles: ['cadet', 'admin'] },
  { name: 'Vigyan Yuvatha', path: '/vigyan', icon: <Cpu size={20} />, roles: ['cadet', 'admin'] },
  { name: 'Startup / Standup', path: '/startup', icon: <Lightbulb size={20} />, roles: ['cadet', 'admin'] },
  { name: 'Role Models', path: '/motivation', icon: <Star size={20} />, roles: ['cadet', 'admin'] },
  { name: 'Volunteer Connect', path: '/volunteer', icon: <Users size={20} />, roles: ['cadet', 'admin'] },
  { name: 'Blood Donation', path: '/blood-donation', icon: <Heart size={20} />, roles: ['cadet', 'admin', 'admin_blood'] },
  { name: 'Local Problem Reporting', path: '/report', icon: <AlertTriangle size={20} />, roles: ['cadet', 'admin', 'admin_problem'] },
  { name: 'Current Affairs', path: '/news', icon: <Globe size={20} />, roles: ['cadet', 'admin'] },
  { name: 'Connect', path: '/connect', icon: <MessageSquare size={20} />, roles: ['cadet', 'admin'] },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || 'cadet';

  // Filter nav items by role
  const navItems = ALL_NAV_ITEMS.filter(item => item.roles.includes(userRole));

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

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
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#0B3D91] text-white transition duration-300 transform lg:translate-x-0 lg:static lg:inset-auto flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Logo header */}
        <div className="flex items-center justify-between h-16 px-6 bg-[#092e6e] border-b border-[#1c55b5] flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1">
              <img src="/src/assets/yeplogo.jpeg" alt="YOUTH Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-sm font-bold uppercase tracking-wider leading-tight">YOUTH EMPOWER PORTAL</span>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden text-gray-300 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Nav items — scrollable */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/'}
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

        {/* Bottom: Profile + Logout */}
        <div className="flex-shrink-0 border-t border-[#1c55b5] p-4 space-y-1">
          {/* Profile */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${isActive
                ? 'bg-[#556B2F] text-white shadow-md'
                : 'text-gray-300 hover:bg-[#1c55b5] hover:text-white'
              }`
            }
          >
            <User size={20} className="mr-3" />
            <span className="font-medium">My Profile</span>
          </NavLink>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 rounded-lg text-red-300 hover:bg-red-900/40 hover:text-red-200 transition-colors duration-200"
          >
            <LogOut size={20} className="mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
