import React, { useState } from 'react';
import { Calendar, Users, Clock, Award, Image as ImageIcon, MapPin, Plus } from 'lucide-react';

const VolunteerConnect = () => {
  const [activeTab, setActiveTab] = useState('events');

  const events = [
    { id: 1, title: 'Mega Plantation Drive', date: '15 Aug 2026', location: 'City Park', attendees: 45, image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&q=80' },
    { id: 2, title: 'Swachh Bharat Campaign', date: '02 Oct 2026', location: 'Railway Station', attendees: 120, image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&q=80' },
    { id: 3, title: 'Flood Relief Camp', date: '20 Jul 2026', location: 'Coastal District', attendees: 85, image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500&q=80' },
  ];

  const leaderboard = [
    { rank: 1, name: 'Cadet Ramesh', hours: 145, badge: 'Gold' },
    { rank: 2, name: 'Cadet Ananya', hours: 120, badge: 'Silver' },
    { rank: 3, name: 'Cadet Vikram', hours: 95, badge: 'Bronze' },
    { rank: 4, name: 'Cadet Sarah', hours: 80, badge: 'Participant' },
    { rank: 5, name: 'Cadet John', hours: 65, badge: 'Participant' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Volunteer Connect</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Make a difference in your community</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-[#0B3D91] text-white rounded-lg hover:bg-blue-800 transition-colors shadow-sm">
          <Plus size={18} className="mr-2" /> Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Events */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <Calendar className="mr-2 text-[#556B2F]" /> Upcoming Events
            </h2>
            <div className="space-y-4">
              {events.map(event => (
                <div key={event.id} className="flex flex-col md:flex-row border border-gray-100 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="md:w-1/3 h-40 md:h-auto">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 md:w-2/3 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-[#0B3D91] dark:text-blue-400 mb-1">{event.title}</h3>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <Calendar size={14} className="mr-1" /> <span className="mr-4">{event.date}</span>
                        <MapPin size={14} className="mr-1" /> <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Users size={16} className="mr-1" /> {event.attendees} Attending
                      </div>
                      <button 
                        onClick={(e) => {
                          e.target.innerText = 'Joined!';
                          e.target.classList.replace('bg-[#556B2F]', 'bg-gray-500');
                          e.target.disabled = true;
                          alert(`You have successfully joined the ${event.title}!\n\nDate: ${event.date}\nLocation: ${event.location}`);
                        }}
                        className="px-4 py-1.5 bg-[#556B2F] text-white text-sm font-medium rounded hover:bg-[#435525] transition-colors"
                      >
                        Join Event
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Event Gallery */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <ImageIcon className="mr-2 text-blue-500" /> Event Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&q=80" className="rounded-lg h-32 w-full object-cover hover:opacity-90 cursor-pointer" alt="Gallery 1" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Track Hours */}
          <div className="bg-gradient-to-br from-[#0B3D91] to-blue-800 rounded-xl p-6 shadow-sm text-white text-center">
            <Clock size={40} className="mx-auto mb-3 text-blue-200" />
            <h3 className="text-lg font-medium mb-1">Your Volunteer Hours</h3>
            <p className="text-4xl font-bold mb-2">42 <span className="text-xl font-normal text-blue-200">hrs</span></p>
            <p className="text-sm text-blue-200">8 hours away from Silver Badge</p>
          </div>

          {/* Leaderboard */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <Award className="mr-2 text-yellow-500" /> Top Volunteers
            </h2>
            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div key={user.rank} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${
                      user.rank === 1 ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' :
                      user.rank === 2 ? 'bg-gray-200 text-gray-700 border border-gray-300' :
                      user.rank === 3 ? 'bg-orange-100 text-orange-700 border border-orange-300' :
                      'bg-blue-50 text-[#0B3D91]'
                    }`}>
                      {user.rank}
                    </div>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{user.name}</span>
                  </div>
                  <span className="text-sm font-bold text-[#556B2F] dark:text-green-400">{user.hours} hrs</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VolunteerConnect;
