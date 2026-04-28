import React, { useState } from 'react';
import { Map, MapPin, UploadCloud, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const LocalProblemReporting = () => {
  const [issues, setIssues] = useState([
    { id: 1, type: 'Potholes', location: 'Main Road, Block A', status: 'In Progress', date: '12 Aug 2026', image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=500&q=80' },
    { id: 2, type: 'Garbage', location: 'Near Central Park', status: 'Pending', date: '14 Aug 2026', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&q=80' },
    { id: 3, type: 'Streetlight', location: 'Street 5, Phase 2', status: 'Resolved', date: '01 Aug 2026', image: null },
  ]);

  const [newIssue, setNewIssue] = useState({ type: 'Garbage', location: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newIssue.location) {
      setIssues([{
        id: issues.length + 1,
        type: newIssue.type,
        location: newIssue.location,
        status: 'Pending',
        date: 'Today',
        image: newIssue.image || null
      }, ...issues]);
      setNewIssue({ type: 'Garbage', location: '', description: '', image: null });
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'Resolved') return <CheckCircle size={16} className="text-green-500" />;
    if (status === 'In Progress') return <Clock size={16} className="text-yellow-500" />;
    return <AlertTriangle size={16} className="text-red-500" />;
  };

  const getStatusBg = (status) => {
    if (status === 'Resolved') return 'bg-green-100 text-green-800 border-green-200';
    if (status === 'In Progress') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Local Problem Reporting</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Report civic issues and track their resolution status</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Report Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Report a New Issue</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Issue Category</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Garbage', 'Potholes', 'Water leakage', 'Streetlight'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setNewIssue({...newIssue, type})}
                    className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-md border transition-colors ${
                      newIssue.type === type 
                      ? 'bg-[#0B3D91] text-white border-[#0B3D91]' 
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
              <div className="relative">
                <input 
                  type="text" 
                  required
                  value={newIssue.location}
                  onChange={(e) => setNewIssue({...newIssue, location: e.target.value})}
                  className="w-full pl-10 pr-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-[#0B3D91] focus:ring-[#0B3D91] dark:bg-gray-700 dark:border-gray-600 dark:text-white border"
                  placeholder="Drop a pin or type location..."
                />
                <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upload Photo</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                <div className="space-y-1 text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                    <label className="relative cursor-pointer bg-transparent rounded-md font-medium text-[#0B3D91] hover:text-blue-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#0B3D91]">
                      <span>Click to upload</span>
                      <input 
                        type="file" 
                        accept="image/*"
                        className="sr-only" 
                        onChange={(e) => {
                          if(e.target.files && e.target.files[0]) {
                            const imgUrl = URL.createObjectURL(e.target.files[0]);
                            setNewIssue({...newIssue, image: imgUrl});
                          }
                        }} 
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {newIssue.image ? 'Image selected successfully' : 'PNG, JPG, GIF up to 10MB'}
                  </p>
                </div>
              </div>
            </div>

            <button type="submit" className="w-full bg-[#556B2F] text-white font-bold py-3 px-4 rounded-md shadow hover:bg-[#435525] transition-colors">
              Submit Report
            </button>
          </form>
        </div>

        {/* Tracking List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Recent Reports Status</h2>
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {issues.map(issue => (
              <div key={issue.id} className="border border-gray-100 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white">{issue.type}</h3>
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border flex items-center gap-1.5 ${getStatusBg(issue.status)}`}>
                    {getStatusIcon(issue.status)}
                    {issue.status}
                  </span>
                </div>
                
                <div className="flex text-sm text-gray-600 dark:text-gray-400 mb-3 items-center">
                  <MapPin size={14} className="mr-1" /> {issue.location}
                </div>
                
                {issue.image && (
                  <div className="h-24 w-full rounded bg-gray-100 dark:bg-gray-700 mb-3 overflow-hidden">
                    <img src={issue.image} alt="Issue" className="w-full h-full object-cover" />
                  </div>
                )}
                
                <div className="text-xs text-gray-500 dark:text-gray-500 border-t border-gray-100 dark:border-gray-700 pt-3 flex justify-between">
                  <span>Report ID: #{1000 + issue.id}</span>
                  <span>Reported on: {issue.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default LocalProblemReporting;
