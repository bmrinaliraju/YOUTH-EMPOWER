import React, { useState } from 'react';
import { ArrowRight, Lock, User, Shield, Droplet, AlertTriangle, CheckCircle, XCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ── Custom Modal Dialog ── */
const Modal = ({ modal, onClose }) => {
  if (!modal.show) return null;
  const isSuccess = modal.type === 'success';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Dialog */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden animate-modal">
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

const Login = () => {
  const [role, setRole] = useState('cadet');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modal, setModal] = useState({ show: false, type: 'error', message: '' });
  const navigate = useNavigate();

  const showModal = (type, message) => setModal({ show: true, type, message });
  const closeModal = () => {
    const wasSuccess = modal.type === 'success';
    setModal({ show: false, type: 'error', message: '' });
    if (wasSuccess) navigate('/');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userMatch = users.find(u => u.username === username && u.password === password);
    const isMockSuccess =
      (role === 'admin' && username === 'admin' && password === 'admin123') ||
      (role === 'cadet' && username === 'cadet' && password === 'cadet123') ||
      (role === 'admin_blood' && username === 'bloodadmin' && password === 'blood123') ||
      (role === 'admin_problem' && username === 'problemadmin' && password === 'problem123');

    if (userMatch || isMockSuccess) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', role);
      localStorage.setItem('currentUser', JSON.stringify(userMatch || { name: username, username }));
      showModal('success', 'Login Successful! Welcome to Youth Empower Portal.');
    } else {
      showModal('error', 'Invalid credentials! Use bloodadmin/blood123, problemadmin/problem123, admin/admin123, or cadet/cadet123.');
    }
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
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <a href="https://ncc.manabadi.info/" target="_blank" rel="noopener noreferrer" className="font-medium text-[#0B3D91] hover:text-[#092e6e] dark:text-[#556B2F] dark:hover:text-[#6a853b]">
              visit the official YOUTH portal
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100 dark:border-gray-700">
            <form className="space-y-6" onSubmit={handleLogin}>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select Role
                </label>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('cadet')}
                    className={`flex justify-center items-center py-2 px-3 border rounded-md text-xs font-medium focus:outline-none transition-colors ${
                      role === 'cadet'
                        ? 'border-[#0B3D91] text-[#0B3D91] bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400 dark:text-blue-400'
                        : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-700'
                    }`}
                  >
                    <User className="mr-1.5" size={14} /> User
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('admin_blood')}
                    className={`flex justify-center items-center py-2 px-3 border rounded-md text-xs font-medium focus:outline-none transition-colors ${
                      role === 'admin_blood'
                        ? 'border-red-600 text-red-600 bg-red-50 dark:bg-red-900/20 dark:border-red-400 dark:text-red-400'
                        : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-700'
                    }`}
                  >
                    <Droplet className="mr-1.5" size={14} /> Blood Admin
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('admin_problem')}
                    className={`flex justify-center items-center py-2 px-3 border rounded-md text-xs font-medium focus:outline-none transition-colors ${
                      role === 'admin_problem'
                        ? 'border-yellow-600 text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-400 dark:text-yellow-400'
                        : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-700'
                    }`}
                  >
                    <AlertTriangle className="mr-1.5" size={14} /> Problem Admin
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`flex justify-center items-center py-2 px-3 border rounded-md text-xs font-medium focus:outline-none transition-colors ${
                      role === 'admin'
                        ? 'border-[#556B2F] text-[#556B2F] bg-green-50 dark:bg-green-900/20 dark:border-green-400 dark:text-green-400'
                        : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-700'
                    }`}
                  >
                    <Shield className="mr-1.5" size={14} /> Super Admin
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Regimental Number / Username
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="focus:ring-[#0B3D91] focus:border-[#0B3D91] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Enter your ID"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="focus:ring-[#0B3D91] focus:border-[#0B3D91] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#0B3D91] focus:ring-[#0B3D91] border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-[#0B3D91] hover:text-[#092e6e] dark:text-blue-400">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0B3D91] hover:bg-[#092e6e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B3D91] transition-colors"
                >
                  Sign in
                </button>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{' '}
                  <a href="/signup" className="font-medium text-[#0B3D91] hover:text-[#092e6e] dark:text-blue-400">
                    Sign up here
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

export default Login;
