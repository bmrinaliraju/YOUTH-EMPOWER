import React, { useState } from 'react';
import { ArrowRight, Lock, User, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('cadet');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login logic
    console.log(`Logging in as ${role} with ${username}`);
    // Redirect to dashboard on success
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center p-2 shadow-md">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/National_Cadet_Corps_India_logo.svg/120px-National_Cadet_Corps_India_logo.svg.png" alt="NCC Logo" className="w-full h-full object-contain" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Or{' '}
          <a href="https://ncc.manabadi.info/" target="_blank" rel="noopener noreferrer" className="font-medium text-[#0B3D91] hover:text-[#092e6e] dark:text-[#556B2F] dark:hover:text-[#6a853b]">
            visit the official NCC portal
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
                  className={`flex justify-center items-center py-2 px-4 border rounded-md text-sm font-medium focus:outline-none transition-colors ${
                    role === 'cadet' 
                      ? 'border-[#0B3D91] text-[#0B3D91] bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400 dark:text-blue-400' 
                      : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <User className="mr-2" size={16} /> Cadet
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`flex justify-center items-center py-2 px-4 border rounded-md text-sm font-medium focus:outline-none transition-colors ${
                    role === 'admin' 
                      ? 'border-[#556B2F] text-[#556B2F] bg-green-50 dark:bg-green-900/20 dark:border-green-400 dark:text-green-400' 
                      : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <Shield className="mr-2" size={16} /> Admin
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
