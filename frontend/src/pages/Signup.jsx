import React, { useState } from 'react';
import { Lock, User, Phone, MapPin, Briefcase, CheckCircle, XCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ── Custom Modal Dialog ── */
const Modal = ({ modal, onClose }) => {
  if (!modal.show) return null;
  const isSuccess = modal.type === 'success';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        {/* Header */}
        <div className={`flex items-center justify-between px-5 py-4 ${isSuccess ? 'bg-[#0B3D91]' : 'bg-red-600'}`}>
          <div className="flex items-center gap-2">
            <img src="/yeplogo.jpeg" alt="YEP Logo" className="w-7 h-7 rounded-full object-cover bg-white p-0.5" />
            <span className="text-white font-bold text-sm tracking-wide">YOUTH EMPOWER PORTAL</span>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>
        {/* Body */}
        <div className="px-6 py-6 text-center">
          <div className={`mx-auto mb-4 w-14 h-14 rounded-full flex items-center justify-center ${isSuccess ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
            {isSuccess
              ? <CheckCircle size={32} className="text-[#0B3D91]" />
              : <XCircle size={32} className="text-red-500" />
            }
          </div>
          <p className="text-gray-800 dark:text-gray-100 font-medium text-base leading-relaxed">
            {modal.message}
          </p>
        </div>
        {/* Footer */}
        <div className="px-6 pb-5 flex justify-center">
          <button
            onClick={onClose}
            className={`px-8 py-2 rounded-lg text-white font-semibold text-sm transition-all hover:scale-105 active:scale-95 shadow ${isSuccess ? 'bg-[#0B3D91] hover:bg-[#092e6e]' : 'bg-red-600 hover:bg-red-700'}`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    youthOrg: '',
    username: '',
    password: '',
  });
  const [modal, setModal] = useState({ show: false, type: 'error', message: '' });
  const navigate = useNavigate();

  const showModal = (type, message) => setModal({ show: true, type, message });
  const closeModal = () => {
    const wasSuccess = modal.type === 'success';
    setModal({ show: false, type: 'error', message: '' });
    if (wasSuccess) navigate('/login');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (existingUsers.some(u => u.username === formData.username)) {
      showModal('error', 'Username / Regimental Number already registered!');
      return;
    }
    existingUsers.push(formData);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    showModal('success', 'Registration Successful! Redirecting to login page.');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Modal modal={modal} onClose={closeModal} />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center p-2 shadow-md">
              <img src="/yeplogo.jpeg" alt="YOUTH Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create a new account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
          <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100 dark:border-gray-700">
            <form className="space-y-6" onSubmit={handleSignup}>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="focus:ring-[#0B3D91] focus:border-[#0B3D91] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="focus:ring-[#0B3D91] focus:border-[#0B3D91] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    City
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="focus:ring-[#0B3D91] focus:border-[#0B3D91] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="New Delhi"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="youthOrg" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Youth Org Involvement
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="youthOrg"
                      name="youthOrg"
                      type="text"
                      value={formData.youthOrg}
                      onChange={handleChange}
                      className="focus:ring-[#0B3D91] focus:border-[#0B3D91] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="e.g., YOUTH, NSS, Scouts (Optional)"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username / Regimental Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="focus:ring-[#0B3D91] focus:border-[#0B3D91] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Choose a username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="focus:ring-[#0B3D91] focus:border-[#0B3D91] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0B3D91] hover:bg-[#092e6e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B3D91] transition-colors"
                >
                  Sign up
                </button>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                  <a href="/login" className="font-medium text-[#0B3D91] hover:text-[#092e6e] dark:text-blue-400">
                    Sign in here
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
