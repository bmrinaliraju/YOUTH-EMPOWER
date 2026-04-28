import React, { useState, useRef, useEffect } from 'react';
import { Menu, Sun, Moon, Bell, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleSidebar, toggleDarkMode, darkMode }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, text: "New Skill Coaching video added", time: "2 hours ago" },
    { id: 2, text: "Blood donation camp this weekend", time: "5 hours ago" },
    { id: 3, text: "Your problem report is resolved", time: "1 day ago" }
  ];
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 focus:outline-none lg:hidden dark:text-gray-300 mr-4"
          >
            <Menu size={24} />
          </button>
          <img
            src="/src/assets/logo.jpeg"
            alt="NCC Logo"
            className="w-8 h-8 mr-2 hidden sm:block object-contain"
          />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white hidden sm:block">
            NCC EMPOWER PORTAL
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300 transition-colors"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300 transition-colors relative focus:outline-none"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-700 z-50">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800 dark:text-white">Notifications</h3>
                  <span className="bg-[#0B3D91] text-white text-xs px-2 py-0.5 rounded-full">3 New</span>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map(notif => (
                    <div key={notif.id} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer border-b border-gray-50 dark:border-gray-700/50 last:border-0">
                      <p className="text-sm text-gray-800 dark:text-gray-200">{notif.text}</p>
                      <p className="text-xs text-[#556B2F] dark:text-green-400 mt-1 font-medium">{notif.time}</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700 text-center">
                  <button className="text-sm text-[#0B3D91] dark:text-blue-400 hover:underline font-medium focus:outline-none">Mark all as read</button>
                </div>
              </div>
            )}
          </div>

          <a href="https://ncc.manabadi.info/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-sm font-medium text-white bg-[#0B3D91] hover:bg-[#092e6e] px-4 py-2 rounded-md transition-colors">
            <User size={16} />
            <span>Login</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
