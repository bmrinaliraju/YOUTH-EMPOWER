import React from 'react';
import { ArrowRight, Users, Droplet, Shield, Award, Target, Flag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-[#0B3D91] text-white shadow-xl">
        <div className="absolute inset-0 opacity-40 bg-[url('/bg-hero.png')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-2/3 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Empowering the Youth,<br />
              <span className="text-[#556B2F] bg-white px-2 mt-2 inline-block rounded">Building the Nation</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl">
              Welcome to the NCC Empower Portal. A unified platform for cadets to learn, innovate, volunteer, and lead. Unity and Discipline in action.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/skills" className="px-6 py-3 bg-[#556B2F] hover:bg-[#435525] text-white font-semibold rounded-lg shadow-md transition-transform hover:-translate-y-1 flex items-center">
                Explore Dashboard <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link to="/volunteer" className="px-6 py-3 bg-white text-[#0B3D91] hover:bg-gray-100 font-semibold rounded-lg shadow-md transition-transform hover:-translate-y-1">
                Join Initiatives
              </Link>
            </div>
          </div>
          <div className="hidden md:flex md:w-1/3 justify-center">
            <img 
              src="/src/assets/logo.jpeg" 
              alt="NCC Logo" 
              className="w-48 h-48 drop-shadow-2xl object-contain"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Users size={32} />} title="Total Cadets" value="1.5M+" color="bg-blue-500" />
        <StatCard icon={<Droplet size={32} />} title="Blood Donated" value="50K+ Units" color="bg-red-500" />
        <StatCard icon={<Flag size={32} />} title="Swachh Bharat" value="100K+ Hrs" color="bg-green-500" />
      </div>

      {/* Core Values Section */}
      <div className="py-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">Core Pillars of NCC</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Shield size={40} className="text-[#0B3D91]" />}
            title="Discipline"
            description="Instilling a sense of duty, punctuality, and unwavering commitment to the nation."
          />
          <FeatureCard 
            icon={<Target size={40} className="text-[#556B2F]" />}
            title="Leadership"
            description="Molding tomorrow's leaders through structured training, responsibility, and practical experience."
          />
          <FeatureCard 
            icon={<Award size={40} className="text-yellow-500" />}
            title="Unity"
            description="Fostering camaraderie and teamwork among youth from diverse backgrounds across India."
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center space-x-4 hover:shadow-md transition-shadow">
    <div className={`p-4 rounded-full text-white ${color}`}>
      {icon}
    </div>
    <div>
      <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center hover:shadow-lg transition-shadow group">
    <div className="mx-auto w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

export default Home;
