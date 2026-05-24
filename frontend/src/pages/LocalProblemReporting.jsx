import React, { useState, useEffect } from 'react';
import { Map, MapPin, UploadCloud, AlertTriangle, CheckCircle, Clock, Upload, X } from 'lucide-react';

const LocalProblemReporting = () => {
  const [isAdmin, setIsAdmin] = useState(() => {
    const role = localStorage.getItem('userRole');
    return role === 'admin' || role === 'admin_problem';
  });

  // Issues state synced with localStorage
  const [issues, setIssues] = useState(() => {
    const saved = localStorage.getItem('local_issues');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, type: 'Potholes', location: 'Main Road, Block A', status: 'In Progress', date: '12 Aug 2026', image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=500&q=80', resolvedImage: null },
      { id: 2, type: 'Garbage', location: 'Near Central Park', status: 'Pending', date: '14 Aug 2026', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&q=80', resolvedImage: null },
      { id: 3, type: 'Streetlight', location: 'Street 5, Phase 2', status: 'Resolved', date: '01 Aug 2026', image: null, resolvedImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80' },
    ];
  });

  const [newIssue, setNewIssue] = useState({ type: 'Garbage', location: '', description: '', image: null });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('local_issues', JSON.stringify(issues));
  }, [issues]);

  // Reactive listener to pull updates from other components (like Home.jsx admin)
  useEffect(() => {
    const handleSync = () => {
      const saved = localStorage.getItem('local_issues');
      if (saved) setIssues(JSON.parse(saved));
      
      const role = localStorage.getItem('userRole');
      setIsAdmin(role === 'admin' || role === 'admin_problem');
    };

    window.addEventListener('storage', handleSync);
    const interval = setInterval(handleSync, 1500);

    return () => {
      window.removeEventListener('storage', handleSync);
      clearInterval(interval);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newIssue.location) {
      const report = {
        id: issues.length + 1,
        type: newIssue.type,
        location: newIssue.location,
        status: 'Pending',
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        image: newIssue.image || null,
        resolvedImage: null
      };
      setIssues([report, ...issues]);
      setNewIssue({ type: 'Garbage', location: '', description: '', image: null });
      alert('Issue reported successfully!');
    }
  };

  const handleIssueStatusChange = (id, newStatus) => {
    setIssues(issues.map(iss => iss.id === id ? { ...iss, status: newStatus } : iss));
  };

  const handleIssuePhotoUpload = (id, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIssues(issues.map(iss => iss.id === id ? { ...iss, resolvedImage: reader.result } : iss));
      };
      reader.readAsDataURL(file);
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'Resolved') return <CheckCircle size={14} className="text-green-500" />;
    if (status === 'In Progress') return <Clock size={14} className="text-yellow-500" />;
    return <AlertTriangle size={14} className="text-red-500" />;
  };

  const getStatusBg = (status) => {
    if (status === 'Resolved') return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300';
    if (status === 'In Progress') return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300';
    return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300';
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Local Problem Reporting</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Report civic issues and track their resolution status</p>
        </div>
        {(localStorage.getItem('userRole') === 'admin' || localStorage.getItem('userRole') === 'admin_problem') && (
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className={`px-4 py-2 text-sm font-medium rounded-lg shadow-sm transition-colors ${
              isAdmin 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {isAdmin ? '🔴 Exit Admin Console' : '⚙️ Enter Admin Console'}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Report Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-fit">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Report a New Issue</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Issue Category</label>
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
              <div className="relative">
                <input 
                  type="text" 
                  required
                  value={newIssue.location}
                  onChange={(e) => setNewIssue({...newIssue, location: e.target.value})}
                  className="w-full pl-10 pr-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-[#0B3D91] focus:ring-[#0B3D91] dark:bg-gray-700 dark:border-gray-600 dark:text-white border text-sm"
                  placeholder="Drop a pin or type location..."
                />
                <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload Photo</label>
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
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setNewIssue({...newIssue, image: reader.result});
                            };
                            reader.readAsDataURL(e.target.files[0]);
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
          
          <div className="space-y-4 max-h-[650px] overflow-y-auto pr-2 custom-scrollbar">
            {issues.map(issue => (
              <div key={issue.id} className="border border-gray-100 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50/30 dark:bg-gray-800/20">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white">{issue.type}</h3>
                  {isAdmin ? (
                    <select
                      value={issue.status}
                      onChange={(e) => handleIssueStatusChange(issue.id, e.target.value)}
                      className={`text-xs font-bold rounded-full border px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#0B3D91] cursor-pointer ${getStatusBg(issue.status)}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  ) : (
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border flex items-center gap-1.5 ${getStatusBg(issue.status)}`}>
                      {getStatusIcon(issue.status)}
                      {issue.status}
                    </span>
                  )}
                </div>
                
                <div className="flex text-xs text-gray-600 dark:text-gray-400 mb-3 items-center">
                  <MapPin size={12} className="mr-1 text-gray-400" /> {issue.location}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {issue.image && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Reported Site State</span>
                      <div className="h-28 w-full rounded bg-gray-100 dark:bg-gray-700 overflow-hidden border border-gray-200 dark:border-gray-600">
                        <img src={issue.image} alt="Reported Condition" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  )}
                  
                  {issue.status === 'Resolved' && issue.resolvedImage && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wider block">Resolved Site Proof</span>
                      <div className="h-28 w-full rounded bg-green-50 dark:bg-green-950/20 overflow-hidden border border-green-200 dark:border-green-800">
                        <img src={issue.resolvedImage} alt="Resolved Site" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  )}
                </div>

                {isAdmin && issue.status === 'Resolved' && !issue.resolvedImage && (
                  <div className="mb-3">
                    <label className="flex items-center justify-center border border-dashed border-[#0B3D91] hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-md py-2 px-3 cursor-pointer text-xs font-bold text-[#0B3D91] dark:text-blue-300 transition-colors">
                      <Upload size={14} className="mr-1.5" /> Upload Resolved Photo
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleIssuePhotoUpload(issue.id, e.target.files[0])} 
                      />
                    </label>
                  </div>
                )}
                
                <div className="text-[10px] text-gray-500 dark:text-gray-500 border-t border-gray-100 dark:border-gray-700 pt-3 flex justify-between">
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
