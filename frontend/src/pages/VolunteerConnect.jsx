import React, { useState, useEffect } from 'react';
import { Calendar, Users, Clock, Award, Image as ImageIcon, MapPin, Plus, ExternalLink, Info, X } from 'lucide-react';

const VolunteerConnect = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [selectedOrg, setSelectedOrg] = useState(null);

  const organizations = [
    {
      id: 'yfs',
      name: 'Youth For Seva',
      logo: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&q=80',
      info: 'Youth for Seva (YFS) is a nation-wide volunteering movement that inspires youth to volunteer and serve.',
      details: 'Founded in 2007, YFS aims to create a positive change in the society through volunteerism. They specialize in education (supporting government schools), healthcare (assisting in hospitals and camps), and environment (plantation drives and waste management). YFS works to build a self-reliant society powered by selfless service.',
      website: 'https://www.youthforseva.org/'
    },
    {
      id: 'ivolunteer',
      name: 'iVolunteer',
      logo: 'https://images.unsplash.com/photo-1526976780723-d3d411c260f1?w=500&q=80',
      info: 'iVolunteer is a social enterprise that promotes volunteering in India, connecting individuals with impactful NGO initiatives.',
      details: 'iVolunteer aims to impact community development through volunteering. They connect thousands of volunteers with over 350 NGOs across India, offering diverse opportunities ranging from skill-based coaching, professional assistance, marketing support to physical teaching and cleanup drives. They focus on leveraging unique individual talents for social good.',
      website: 'https://www.ivolunteer.in/'
    },
    {
      id: 'cry',
      name: 'CRY (Child Rights and You)',
      logo: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&q=80',
      info: 'CRY is an Indian non-profit organization that works to restore child rights and ensure happier childhoods.',
      details: 'CRY works towards ensuring children have access to education, healthcare, nutrition, and protection from child labor and abuse. Through extensive grassroots mobilization, advocacy, and direct support programs, CRY has positively transformed the lives of millions of children across rural and urban India for over four decades.',
      website: 'https://www.cry.org/'
    },
    {
      id: 'aiesec',
      name: 'AIESEC',
      logo: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&q=80',
      info: 'AIESEC is the world\'s largest youth-run organization, focused on providing young people with leadership development.',
      details: 'AIESEC is a global platform for young people to develop their leadership potential through international internships and volunteer opportunities. Present in over 120 countries, AIESEC enables youth to participate in projects that support the UN Sustainable Development Goals (SDGs), fostering intercultural understanding and global citizenship.',
      website: 'https://aiesec.org/'
    },
    {
      id: 'scouts',
      name: 'SCOUTS AND GUIDES',
      logo: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=500&q=80',
      info: 'The Bharat Scouts and Guides (BSG) is the national Scouting and Guiding association of India.',
      details: 'BSG is a voluntary, non-political, educational movement for young people. Through outdoor activities, service camps, skill-building exercises, and community projects, Scouting and Guiding prepares youth to become responsible, active citizens who contribute to social harmony and nation-building.',
      website: 'https://www.bsgindia.org/'
    },
    {
      id: 'nss',
      name: 'NSS (National Service Scheme)',
      logo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&q=80',
      info: 'NSS is a public service program conducted by the Ministry of Youth Affairs and Sports, Government of India.',
      details: 'Launched in 1969, the motto of NSS is "Not Me But You". It provides college and school students with opportunities to take part in community service activities, such as environmental conservation, health awareness campaigns, disaster relief, and adopting villages to improve local infrastructure and literacy.',
      website: 'https://nss.gov.in/'
    }
  ];

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('volunteer_events');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 1,
        title: 'Mega Plantation Drive',
        date: '15 Aug 2026',
        location: 'City Park',
        attendees: 3,
        organizer: 'Green Earth Foundation',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&q=80',
        description: 'Join us to plant 500 saplings in the city park. Refreshments and equipment will be provided to all volunteers. This drive aims to enhance green cover and promote biodiversity.',
        participants: [
          { name: 'Cadet Ramesh', age: 20, organization: 'NCC', unitName: '1 Delhi Bn NCC', location: 'Delhi' },
          { name: 'Cadet Ananya', age: 19, organization: 'NSS', unitName: '2 / 5 Delhi Bn NSS', location: 'Delhi' },
          { name: 'Cadet Vikram', age: 21, organization: 'Scouts', unitName: 'Delhi Central Scouts', location: 'Delhi' }
        ]
      },
      {
        id: 2,
        title: 'Swachh Bharat Campaign',
        date: '02 Oct 2026',
        location: 'Railway Station',
        attendees: 2,
        organizer: 'Municipal Corporation',
        image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&q=80',
        description: 'Cleanliness drive at the main railway station. Let us come together to keep public spaces tidy and spread awareness about hygiene and sanitation.',
        participants: [
          { name: 'Cadet Sarah', age: 22, organization: 'iVolunteer', unitName: 'iVolunteer Delhi Unit', location: 'Delhi' },
          { name: 'Cadet John', age: 20, organization: 'NSS', unitName: '2 / 5 Delhi Bn NSS', location: 'Delhi' }
        ]
      },
      {
        id: 3,
        title: 'Flood Relief Camp',
        date: '20 Jul 2026',
        location: 'Coastal District',
        attendees: 1,
        organizer: 'National Disaster Support',
        image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500&q=80',
        description: 'Assisting in distributing food, clean water, and medical kits to flood-affected families. Volunteers will undergo a brief training before deployment.',
        participants: [
          { name: 'Cadet Ramesh', age: 20, organization: 'NCC', unitName: '1 Delhi Bn NCC', location: 'Delhi' }
        ]
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('volunteer_events', JSON.stringify(events));
  }, [events]);

  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [newEventForm, setNewEventForm] = useState({ title: '', date: '', location: '', organizer: '', description: '', image: '' });
  
  const [selectedEventDetails, setSelectedEventDetails] = useState(null);
  const [searchUnitQuery, setSearchUnitQuery] = useState('');
  
  const [showJoinEventModal, setShowJoinEventModal] = useState(null);
  const [joinForm, setJoinForm] = useState({ name: '', age: '', organization: 'NCC', unitName: '', location: '' });

  const handleCreateEventSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now(),
      title: newEventForm.title,
      date: newEventForm.date || '2026-08-30',
      location: newEventForm.location,
      organizer: newEventForm.organizer,
      description: newEventForm.description,
      image: newEventForm.image || 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&q=80',
      attendees: 0,
      participants: []
    };
    const updated = [newEvent, ...events];
    setEvents(updated);
    localStorage.setItem('volunteer_events', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
    
    alert(`Successfully created event "${newEvent.title}"!`);
    setShowCreateEventModal(false);
    setNewEventForm({ title: '', date: '', location: '', organizer: '', description: '', image: '' });
  };

  const handleJoinEventSubmit = (e) => {
    e.preventDefault();
    const volunteer = {
      name: joinForm.name,
      age: parseInt(joinForm.age) || 18,
      organization: joinForm.organization,
      unitName: joinForm.unitName,
      location: joinForm.location
    };
    
    const updatedEvents = events.map(ev => {
      if (ev.id === showJoinEventModal.id) {
        if (ev.participants?.some(p => p.name === volunteer.name)) {
          alert("You have already joined this event!");
          return ev;
        }
        return {
          ...ev,
          attendees: (ev.attendees || 0) + 1,
          participants: [...(ev.participants || []), volunteer]
        };
      }
      return ev;
    });
    
    setEvents(updatedEvents);
    localStorage.setItem('volunteer_events', JSON.stringify(updatedEvents));
    
    // Increment volunteer hours for stats just to be neat
    try {
      const parsedHours = parseInt(localStorage.getItem('volunteer_hours') || '42') + 4;
      localStorage.setItem('volunteer_hours', parsedHours.toString());
    } catch {}

    window.dispatchEvent(new Event('storage'));
    
    alert(`Thank you ${volunteer.name}! You have successfully registered for "${showJoinEventModal.title}".`);
    setShowJoinEventModal(null);
    setJoinForm({ name: '', age: '', organization: 'NCC', unitName: '', location: '' });
  };

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
        <button
          onClick={() => setShowCreateEventModal(true)}
          className="flex items-center px-4 py-2 bg-[#0B3D91] text-white rounded-lg hover:bg-blue-800 transition-colors shadow-sm"
        >
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
                      <div
                        onClick={() => { setSelectedEventDetails(event); setSearchUnitQuery(''); }}
                        className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-[#0B3D91] cursor-pointer hover:underline transition-colors"
                      >
                        <Users size={16} className="mr-1" /> {event.participants?.length || event.attendees || 0} Attending
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => { setSelectedEventDetails(event); setSearchUnitQuery(''); }}
                          className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          Details & Volunteers
                        </button>
                        <button
                          onClick={() => setShowJoinEventModal(event)}
                          className="px-4 py-1.5 bg-[#556B2F] text-white text-xs font-bold rounded hover:bg-[#435525] transition-colors"
                        >
                          Join Event
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partner Volunteer Organizations */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <Users className="mr-2 text-[#0B3D91] dark:text-blue-400" /> Partner Volunteer Organizations
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Connect with leading national and international organizations to expand your horizons and volunteer.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {organizations.map(org => (
                <div
                  key={org.id}
                  onClick={() => setSelectedOrg(org)}
                  className="group cursor-pointer bg-gray-50 dark:bg-gray-700/30 rounded-xl overflow-hidden border border-gray-150 dark:border-gray-700 hover:shadow-md hover:scale-[1.02] transition-all flex flex-col h-full"
                >
                  <div className="h-32 w-full relative overflow-hidden">
                    <img src={org.logo} alt={org.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-355" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                      <span className="text-white text-[10px] font-bold bg-[#0B3D91]/80 px-2 py-0.5 rounded">
                        Info
                      </span>
                    </div>
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-[#0B3D91] dark:text-blue-400 mb-1 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                        {org.name}
                      </h3>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2">
                        {org.info}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center text-xs font-semibold text-[#556B2F] dark:text-green-400 group-hover:underline">
                      <Info size={12} className="mr-1" /> View Details
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

      {/* Organization Modal */}
      {/* Create Event Modal */}
      {showCreateEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700 animate-scale-up">
            <div className="bg-[#0B3D91] text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Plus size={20} /> Create Volunteer Event
              </h3>
              <button onClick={() => setShowCreateEventModal(false)} className="text-white/80 hover:text-white focus:outline-none">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateEventSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Event Title</label>
                  <input
                    required type="text" value={newEventForm.title}
                    onChange={(e) => setNewEventForm({ ...newEventForm, title: e.target.value })}
                    className="w-full rounded border border-gray-300 py-1.5 px-3 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="E.g. Lake Cleanup Campaign"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Conductor / Organizer</label>
                  <input
                    required type="text" value={newEventForm.organizer}
                    onChange={(e) => setNewEventForm({ ...newEventForm, organizer: e.target.value })}
                    className="w-full rounded border border-gray-300 py-1.5 px-3 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="E.g. Youth Green Force"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Venue / Location</label>
                  <input
                    required type="text" value={newEventForm.location}
                    onChange={(e) => setNewEventForm({ ...newEventForm, location: e.target.value })}
                    className="w-full rounded border border-gray-300 py-1.5 px-3 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="E.g. Central Lake Park"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Event Date</label>
                  <input
                    required type="date" value={newEventForm.date}
                    onChange={(e) => setNewEventForm({ ...newEventForm, date: e.target.value })}
                    className="w-full rounded border border-gray-300 py-1.5 px-3 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Banner Image URL (Optional)</label>
                <input
                  type="text" value={newEventForm.image}
                  onChange={(e) => setNewEventForm({ ...newEventForm, image: e.target.value })}
                  className="w-full rounded border border-gray-300 py-1.5 px-3 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Event Description</label>
                <textarea
                  required rows="2" value={newEventForm.description}
                  onChange={(e) => setNewEventForm({ ...newEventForm, description: e.target.value })}
                  className="w-full rounded border border-gray-300 py-1.5 px-3 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Provide schedule, details, prerequisites..."
                ></textarea>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-[#0B3D91] hover:bg-blue-800 text-white font-bold py-2 rounded text-sm transition-colors">
                  Create Event
                </button>
                <button type="button" onClick={() => setShowCreateEventModal(false)} className="flex-1 bg-gray-100 hover:bg-gray-250 text-gray-700 dark:bg-gray-700 dark:text-gray-300 font-bold py-2 rounded text-sm transition-colors border border-gray-200 dark:border-gray-600">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Join Event Modal */}
      {showJoinEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700 animate-scale-up">
            <div className="bg-[#556B2F] text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Users size={20} /> Register & Join Event
              </h3>
              <button onClick={() => setShowJoinEventModal(null)} className="text-white/80 hover:text-white focus:outline-none">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleJoinEventSubmit} className="p-6 space-y-4">
              <div className="bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-3 rounded text-xs text-green-700 dark:text-green-300">
                Registering for: <strong>{showJoinEventModal.title}</strong>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Your Full Name</label>
                  <input
                    required type="text" value={joinForm.name}
                    onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })}
                    className="w-full rounded border border-gray-300 py-1.5 px-3 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="E.g. Cadet Ananya"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Age</label>
                  <input
                    required type="number" min="1" value={joinForm.age}
                    onChange={(e) => setJoinForm({ ...joinForm, age: e.target.value })}
                    className="w-full rounded border border-gray-300 py-1.5 px-3 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Age"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Involvement / Organization</label>
                  <select
                    value={joinForm.organization}
                    onChange={(e) => setJoinForm({ ...joinForm, organization: e.target.value })}
                    className="w-full rounded border border-gray-300 py-1.5 px-3 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {['NCC', 'NSS', 'iVolunteer', 'Youth For Seva', 'Scouts & Guides', 'Other'].map(org => (
                      <option key={org}>{org}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Unit Name / Code</label>
                  <input
                    required type="text" value={joinForm.unitName}
                    onChange={(e) => setJoinForm({ ...joinForm, unitName: e.target.value })}
                    className="w-full rounded border border-gray-300 py-1.5 px-3 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="E.g. 1 Delhi Bn NCC"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Location / Pincode</label>
                <input
                  required type="text" value={joinForm.location}
                  onChange={(e) => setJoinForm({ ...joinForm, location: e.target.value })}
                  className="w-full rounded border border-gray-300 py-1.5 px-3 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Location"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-[#556B2F] hover:bg-[#435525] text-white font-bold py-2 rounded text-sm transition-colors">
                  Submit Enlistment
                </button>
                <button type="button" onClick={() => setShowJoinEventModal(null)} className="flex-1 bg-gray-100 hover:bg-gray-250 text-gray-700 dark:bg-gray-700 dark:text-gray-300 font-bold py-2 rounded text-sm transition-colors border border-gray-200 dark:border-gray-600">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details & Volunteers Modal */}
      {selectedEventDetails && (() => {
        const filteredParticipants = (selectedEventDetails.participants || []).filter(p => 
          p.unitName?.toLowerCase().includes(searchUnitQuery.toLowerCase())
        );
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700 animate-scale-up">
              <div className="bg-[#0B3D91] text-white px-6 py-4 flex justify-between items-center">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <ImageIcon size={20} /> Event Details & Volunteer Directory
                </h3>
                <button onClick={() => setSelectedEventDetails(null)} className="text-white/80 hover:text-white focus:outline-none">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                <div className="flex flex-col md:flex-row gap-4 border-b border-gray-100 dark:border-gray-700 pb-4">
                  <img src={selectedEventDetails.image} alt={selectedEventDetails.title} className="w-full md:w-48 h-32 object-cover rounded-lg" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-xl text-gray-800 dark:text-white">{selectedEventDetails.title}</h4>
                    <p className="text-xs text-[#556B2F] dark:text-green-400 font-semibold">Organized by: {selectedEventDetails.organizer}</p>
                    <div className="text-xs text-gray-500 space-y-0.5 pt-1">
                      <p><strong>Date:</strong> {selectedEventDetails.date}</p>
                      <p><strong>Location:</strong> {selectedEventDetails.location}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Description</h5>
                  <p className="text-xs text-gray-650 dark:text-gray-300 leading-relaxed">
                    {selectedEventDetails.description || 'No description provided.'}
                  </p>
                </div>
                <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                    <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Enlistment Directory</h5>
                    {/* Unit Search Query */}
                    <div className="relative w-full sm:w-64">
                      <input
                        type="text"
                        value={searchUnitQuery}
                        onChange={(e) => setSearchUnitQuery(e.target.value)}
                        placeholder="Filter by Unit Name..."
                        className="w-full bg-gray-50 dark:bg-gray-705 border border-gray-200 dark:border-gray-600 rounded px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#0B3D91] dark:text-white"
                      />
                    </div>
                  </div>

                  {searchUnitQuery && (
                    <div className="text-xs font-semibold text-green-650 dark:text-green-400 mb-2">
                      Found {filteredParticipants.length} volunteers from unit "{searchUnitQuery}" participating in this event!
                    </div>
                  )}

                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {filteredParticipants.map((p, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2.5 bg-gray-50 dark:bg-gray-700/40 rounded border border-gray-100 dark:border-gray-700">
                        <div>
                          <p className="font-bold text-xs text-gray-800 dark:text-white">{p.name} <span className="text-[10px] text-gray-550 font-normal">({p.age} yrs)</span></p>
                          <p className="text-[10px] text-gray-500">{p.unitName} · {p.organization}</p>
                        </div>
                        <span className="text-[10px] text-gray-450">{p.location}</span>
                      </div>
                    ))}
                    {filteredParticipants.length === 0 && (
                      <p className="text-xs text-gray-500 italic text-center py-6">No matching volunteers found.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
      {selectedOrg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700 animate-scale-up">
            <div className="relative h-48 w-full">
              <img src={selectedOrg.logo} alt={selectedOrg.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <button
                onClick={() => setSelectedOrg(null)}
                className="absolute top-4 right-4 p-1.5 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors focus:outline-none"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <h3 className="text-2xl font-bold text-white drop-shadow-md">
                  {selectedOrg.name}
                </h3>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">About the Organization</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedOrg.details}
                </p>
              </div>
              
              <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <a
                  href={selectedOrg.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 bg-[#0B3D91] hover:bg-blue-800 text-white text-sm font-bold py-2.5 px-4 rounded-lg transition-colors shadow-sm text-center"
                >
                  <ExternalLink size={16} /> Visit Website
                </a>
                <button
                  onClick={() => setSelectedOrg(null)}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-bold py-2.5 px-4 rounded-lg transition-colors border border-gray-200 dark:border-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerConnect;
