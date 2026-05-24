import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Users, Droplet, Shield, Award, Target, Flag, 
  AlertTriangle, Check, CheckCircle, Clock, Upload, X, Building, Plus, Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole') || 'cadet');
  const [adminView, setAdminView] = useState(() => {
    const role = localStorage.getItem('userRole');
    if (role === 'admin_blood') return 'blood';
    if (role === 'admin_problem') return 'problems';
    return null;
  });

  // Blood Inventory State synced with localStorage
  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('blood_inventory');
    if (saved) return JSON.parse(saved);
    return {
      'A+': 12, 'A-': 8, 'B+': 15, 'B-': 5,
      'O+': 20, 'O-': 4, 'AB+': 7, 'AB-': 2
    };
  });

  // Donor Proofs/Records synced with localStorage
  const [donorProofs, setDonorProofs] = useState(() => {
    const saved = localStorage.getItem('blood_donor_proofs');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, name: 'Cadet Amit Kumar', group: 'A+', date: '2026-05-18', status: 'Pending Verification', proofImage: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=500&q=80' },
      { id: 2, name: 'Cadet Sneha Reddy', group: 'O-', date: '2026-05-15', status: 'Approved', proofImage: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=500&q=80' }
    ];
  });

  // Local Issues State synced with localStorage
  const [issues, setIssues] = useState(() => {
    const saved = localStorage.getItem('local_issues');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, type: 'Potholes', location: 'Main Road, Block A', status: 'In Progress', date: '12 Aug 2026', image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=500&q=80', resolvedImage: null },
      { id: 2, type: 'Garbage', location: 'Near Central Park', status: 'Pending', date: '14 Aug 2026', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&q=80', resolvedImage: null },
      { id: 3, type: 'Streetlight', location: 'Street 5, Phase 2', status: 'Resolved', date: '01 Aug 2026', image: null, resolvedImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80' },
    ];
  });

  // Drive Registrations synced with localStorage
  const [driveRegistrations, setDriveRegistrations] = useState(() => {
    const saved = localStorage.getItem('blood_drive_registrations');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, driveName: 'Delhi YOUTH HQ Mega Blood Drive', userName: 'Cadet Rajesh Kumar', group: 'O+', timesDonated: 3, status: 'Pending Verification' },
      { id: 2, driveName: 'Delhi YOUTH HQ Mega Blood Drive', userName: 'Cadet Pooja Sharma', group: 'A+', timesDonated: 1, status: 'Pending Verification' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('blood_drive_registrations', JSON.stringify(driveRegistrations));
  }, [driveRegistrations]);

  // Blood Camps/Drives synced with localStorage
  const [bloodCamps, setBloodCamps] = useState(() => {
    const saved = localStorage.getItem('blood_camps');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, name: 'Delhi YOUTH HQ Mega Blood Drive', date: '2026-06-05', location: 'YOUTH HQ Delhi', organizer: 'Indian Red Cross', approved: true, status: 'Approved' },
      { id: 2, name: 'National Unity Camp Blood Drive', date: '2026-06-12', location: 'NCC Parade Ground', organizer: 'YOUTH Welfare Ministry', approved: true, status: 'Approved' },
      { id: 3, name: 'Rotary Club Joint Camp', date: '2026-06-20', location: 'Sector 12 Community Hall', organizer: 'Rotary Club', approved: true, status: 'Approved' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('blood_camps', JSON.stringify(bloodCamps));
  }, [bloodCamps]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('blood_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('blood_donor_proofs', JSON.stringify(donorProofs));
  }, [donorProofs]);

  useEffect(() => {
    localStorage.setItem('local_issues', JSON.stringify(issues));
  }, [issues]);

  // Listen to storage changes to ensure reactive updates
  useEffect(() => {
    const handleStorageChange = () => {
      const role = localStorage.getItem('userRole') || 'cadet';
      setUserRole(role);
      if (role === 'admin_blood') setAdminView('blood');
      else if (role === 'admin_problem') setAdminView('problems');
      
      const savedInv = localStorage.getItem('blood_inventory');
      if (savedInv) setInventory(JSON.parse(savedInv));

      const savedProofs = localStorage.getItem('blood_donor_proofs');
      if (savedProofs) setDonorProofs(JSON.parse(savedProofs));

      const savedIssues = localStorage.getItem('local_issues');
      if (savedIssues) setIssues(JSON.parse(savedIssues));

      const savedRegs = localStorage.getItem('blood_drive_registrations');
      if (savedRegs) setDriveRegistrations(JSON.parse(savedRegs));

      const savedCamps = localStorage.getItem('blood_camps');
      if (savedCamps) setBloodCamps(JSON.parse(savedCamps));
    };

    window.addEventListener('storage', handleStorageChange);
    // Periodically sync in case of local actions
    const interval = setInterval(handleStorageChange, 1500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Inventory Update Handlers
  const handleInventoryChange = (bg, val) => {
    const parsed = parseInt(val) || 0;
    setInventory({
      ...inventory,
      [bg]: parsed >= 0 ? parsed : 0
    });
  };

  // Proof Approval Handlers
  const handleProofStatus = (id, status) => {
    setDonorProofs(donorProofs.map(p => p.id === id ? { ...p, status } : p));
    if (status === 'Approved') {
      const approvedProof = donorProofs.find(p => p.id === id);
      if (approvedProof) {
        const savedDonors = JSON.parse(localStorage.getItem('blood_donors') || '[]');
        const updatedDonors = savedDonors.map(donor => {
          if (donor.name === approvedProof.name && donor.group === approvedProof.group) {
            return { ...donor, timesDonated: (donor.timesDonated || 0) + 1 };
          }
          return donor;
        });
        localStorage.setItem('blood_donors', JSON.stringify(updatedDonors));
        window.dispatchEvent(new Event('storage'));
      }
    }
  };

  const handleDriveRegStatus = (id, status) => {
    const updated = driveRegistrations.map(r => r.id === id ? { ...r, status } : r);
    setDriveRegistrations(updated);
    localStorage.setItem('blood_drive_registrations', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  const handleCampRequestStatus = (id, status) => {
    const updated = bloodCamps.map(camp => {
      if (camp.id === id) {
        return { ...camp, status, approved: status === 'Approved' };
      }
      return camp;
    });
    setBloodCamps(updated);
    localStorage.setItem('blood_camps', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  // Issue Status Update & Photo Upload for Admin
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

  // ── Sub-admin short-circuit: show ONLY their console ──────────────────────
  if (userRole === 'admin_blood') {
    return (
      <div className="space-y-6 animate-fade-in pb-10">
        <div className="flex items-center space-x-3 mb-2">
          <Droplet className="text-red-500" size={28} />
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Blood Bank Admin Console</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Manage inventory, verify proofs, and track drive registrations.</p>
          </div>
        </div>
        {/* Blood console content inlined */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Inventory Editor */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 lg:col-span-1">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <Building className="mr-2 text-red-500" size={20} /> Update Blood Inventory
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(inventory).map(bg => (
                <div key={bg} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex flex-col justify-center">
                  <span className="font-bold text-sm text-gray-700 dark:text-gray-300">{bg} Group</span>
                  <input
                    type="number" min="0" value={inventory[bg]}
                    onChange={(e) => handleInventoryChange(bg, e.target.value)}
                    className="mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-sm font-bold text-[#0B3D91] dark:text-blue-300 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Donor Proofs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 lg:col-span-1 flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <Award className="mr-2 text-blue-500" size={20} /> Donation Approvals &amp; Proofs
            </h3>
            <div className="space-y-4 overflow-y-auto max-h-[380px] pr-1 flex-1 custom-scrollbar">
              {donorProofs.map(proof => (
                <div key={proof.id} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-sm text-gray-800 dark:text-white flex items-center gap-1.5">
                        {proof.name}
                        {proof.type && (
                          <span className={`text-[9px] px-1 rounded font-bold ${
                            proof.type === 'Receiver' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {proof.type}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">Requested: {proof.group} | {proof.date}</p>
                      {proof.usageDetails && (
                        <p className="text-[11px] text-gray-650 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/30 p-1.5 rounded mt-1">
                          <strong className="text-[10px]">Usage:</strong> {proof.usageDetails}
                        </p>
                      )}
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      proof.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      proof.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>{proof.status}</span>
                  </div>
                  {proof.status === 'Pending Verification' && (
                    <div className="flex space-x-2">
                      <button onClick={() => handleProofStatus(proof.id, 'Approved')} className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-1.5 rounded">Approve</button>
                      <button onClick={() => handleProofStatus(proof.id, 'Rejected')} className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1.5 rounded">Reject</button>
                    </div>
                  )}
                </div>
              ))}
              {donorProofs.length === 0 && <p className="text-xs text-gray-500 italic text-center py-10">No donation proofs uploaded yet.</p>}
            </div>
          </div>
          {/* Drive Registrations */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 lg:col-span-1">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <Users className="mr-2 text-green-500" size={20} /> Drive Join Registrations
            </h3>
            <div className="space-y-3 overflow-y-auto max-h-[350px] pr-1 custom-scrollbar">
              {driveRegistrations.map((reg, idx) => (
                <div key={reg.id || idx} className="p-3 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100/30 rounded-lg space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-[#0B3D91] dark:text-blue-300">{reg.driveName}</span>
                    <span className="bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 font-bold px-1.5 py-0.5 rounded text-[10px]">{reg.group}</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Name: {reg.userName}</p>
                  <p className="text-[10px] text-gray-500">Donations: {reg.timesDonated} time(s)</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      (reg.status || 'Pending Verification') === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300' :
                      (reg.status || 'Pending Verification') === 'Rejected' ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300'
                    }`}>
                      {reg.status || 'Pending Verification'}
                    </span>
                  </div>
                  {(!reg.status || reg.status === 'Pending Verification') && (
                    <div className="flex space-x-2 mt-2 pt-2 border-t border-gray-150 dark:border-gray-700">
                      <button
                        onClick={() => handleDriveRegStatus(reg.id, 'Approved')}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white text-[10px] font-bold py-1 rounded transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDriveRegStatus(reg.id, 'Rejected')}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold py-1 rounded transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {driveRegistrations.length === 0 && <p className="text-xs text-gray-500 italic text-center py-10">No registration notifications yet.</p>}
            </div>
          </div>

          {/* Blood Camp Hosting Requests */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 lg:col-span-1 flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <Building className="mr-2 text-red-500" size={20} /> Camp Hosting Proposals
            </h3>
            <div className="space-y-4 overflow-y-auto max-h-[350px] pr-1 flex-1 custom-scrollbar">
              {bloodCamps.filter(c => c.status === 'Pending' || !c.approved).map((camp) => (
                <div key={camp.id} className="p-3 bg-red-50/20 dark:bg-red-950/10 border border-red-100/30 rounded-lg space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-xs text-[#0B3D91] dark:text-blue-300">{camp.name}</h4>
                      <p className="text-[10px] text-gray-500">Proposed by: {camp.organizer}</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 font-bold px-1.5 py-0.5 rounded text-[9px]">{camp.status || 'Pending'}</span>
                  </div>
                  <div className="text-[10px] text-gray-650 dark:text-gray-400 space-y-0.5">
                    <p><strong>Date:</strong> {camp.date}</p>
                    <p><strong>Venue:</strong> {camp.location}</p>
                    <p><strong>Doctors:</strong> {camp.doctors}</p>
                    <p><strong>Contact:</strong> {camp.contact}</p>
                    <p className="italic text-[9px] bg-white dark:bg-gray-700 p-1 rounded mt-1">"{camp.info}"</p>
                  </div>
                  <div className="flex space-x-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                    <button
                      onClick={() => handleCampRequestStatus(camp.id, 'Approved')}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white text-[10px] font-bold py-1.5 rounded transition-colors animate-pulse"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleCampRequestStatus(camp.id, 'Rejected')}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold py-1.5 rounded transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
              {bloodCamps.filter(c => c.status === 'Pending' || !c.approved).length === 0 && (
                <p className="text-xs text-gray-500 italic text-center py-10">No pending camp proposals.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (userRole === 'admin_problem') {
    return (
      <div className="space-y-6 animate-fade-in pb-10">
        <div className="flex items-center space-x-3 mb-2">
          <AlertTriangle className="text-yellow-500" size={28} />
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Local Problem Reporting Console</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Review complaints, update status, and upload resolution proofs.</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {issues.map(issue => (
              <div key={issue.id} className="border border-gray-100 dark:border-gray-700 rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow bg-gray-50/50 dark:bg-gray-800/40">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-lg text-gray-800 dark:text-white">{issue.type}</h4>
                      <p className="text-xs text-gray-500">Report ID: #{1000 + issue.id} | {issue.date}</p>
                    </div>
                    <select
                      value={issue.status}
                      onChange={(e) => handleIssueStatusChange(issue.id, e.target.value)}
                      className={`text-xs font-bold rounded-full border px-3 py-1 focus:outline-none cursor-pointer ${
                        issue.status === 'Resolved' ? 'bg-green-100 text-green-800 border-green-200' :
                        issue.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        'bg-red-100 text-red-800 border-red-200'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                    <Flag size={12} className="mr-1 text-gray-400" /> Location: {issue.location}
                  </p>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Reported Photo</span>
                      {issue.image ? (
                        <img src={issue.image} alt="Reported" className="h-20 w-full object-cover rounded border border-gray-200" />
                      ) : (
                        <div className="h-20 w-full bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-[10px] text-gray-400">No Photo</div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider block">Resolved Photo</span>
                      {issue.resolvedImage ? (
                        <div className="relative h-20 w-full rounded overflow-hidden border border-green-200">
                          <img src={issue.resolvedImage} alt="Resolved" className="h-full w-full object-cover" />
                          <button onClick={() => setIssues(issues.map(iss => iss.id === issue.id ? { ...iss, resolvedImage: null } : iss))} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 hover:bg-red-700"><X size={10} /></button>
                        </div>
                      ) : (
                        <div className="h-20 w-full bg-green-50 dark:bg-green-950/20 rounded border border-dashed border-green-200 flex items-center justify-center text-[10px] text-green-500 italic text-center p-1">Pending fix</div>
                      )}
                    </div>
                  </div>
                </div>
                {issue.status === 'Resolved' && !issue.resolvedImage && (
                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <label className="flex items-center justify-center border border-dashed border-[#0B3D91] hover:bg-blue-50 rounded-md py-2 px-3 cursor-pointer text-xs font-bold text-[#0B3D91] transition-colors">
                      <Upload size={14} className="mr-1.5" /> Upload Resolved Photo
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleIssuePhotoUpload(issue.id, e.target.files[0])} />
                    </label>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  // ── End sub-admin short-circuit ──────────────────────────────────────────────

  return (
    <div className="space-y-8 animate-fade-in pb-10">
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
              Welcome to the YOUTH Empower Portal. A unified platform for cadets to learn, innovate, volunteer, and lead. Unity and Discipline in action.
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
              src="/yeplogo.jpeg" 
              alt="YOUTH Logo" 
              className="w-48 h-48 drop-shadow-2xl object-contain rounded-full bg-white p-2"
              onError={(e) => {
                e.target.src = "/yeplogo.jpeg";
              }}
            />
          </div>
        </div>
      </div>

      {/* Admin Panel Selector */}
      {userRole === 'admin' && (
        <div className="bg-gradient-to-r from-blue-950 to-indigo-950 text-white rounded-2xl p-6 shadow-xl border border-blue-900/60 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="text-yellow-400" size={28} />
              <div>
                <h2 className="text-2xl font-bold">Admin Command Center</h2>
                <p className="text-blue-300 text-xs mt-0.5">Manage cadet programs, blood bank inventories, and civic issues reported.</p>
              </div>
            </div>
            {adminView && (
              <button 
                onClick={() => setAdminView(null)}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-md text-xs font-semibold flex items-center transition-colors"
              >
                <X size={14} className="mr-1" /> Close Admin Console
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setAdminView(adminView === 'blood' ? null : 'blood')}
              className={`p-5 rounded-xl border flex flex-col items-start text-left transition-all duration-200 hover:-translate-y-0.5 ${
                adminView === 'blood' 
                  ? 'bg-red-950/60 border-red-500 shadow-lg shadow-red-950/30' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center space-x-2 text-red-400 mb-2">
                <Droplet size={24} />
                <span className="font-bold text-lg">Blood Bank Admin Portal</span>
              </div>
              <p className="text-xs text-blue-200 leading-relaxed">Update inventory units, verify donor certificates, view approvals, and track drive attendance registrations.</p>
            </button>

            <button
              onClick={() => setAdminView(adminView === 'problems' ? null : 'problems')}
              className={`p-5 rounded-xl border flex flex-col items-start text-left transition-all duration-200 hover:-translate-y-0.5 ${
                adminView === 'problems' 
                  ? 'bg-yellow-950/60 border-yellow-500 shadow-lg shadow-yellow-950/30' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center space-x-2 text-yellow-400 mb-2">
                <AlertTriangle size={24} />
                <span className="font-bold text-lg">Local Problem reporting Admin</span>
              </div>
              <p className="text-xs text-blue-200 leading-relaxed">Review public civic complaints, transition status from Pending to Resolved, and upload proof of successful resolutions.</p>
            </button>
          </div>
        </div>
      )}

      {/* 3a. BLOOD BANK ADMIN DASHBOARD */}
      {(userRole === 'admin' || userRole === 'admin_blood') && adminView === 'blood' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 animate-slide-in">
          {/* Inventory Editor */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 lg:col-span-1">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <Building className="mr-2 text-red-500" size={20} /> Update Blood Inventory
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Input direct values to live synchronize the public blood bank inventory.</p>
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(inventory).map(bg => (
                <div key={bg} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex flex-col justify-center">
                  <span className="font-bold text-sm text-gray-700 dark:text-gray-300">{bg} Group</span>
                  <input
                    type="number"
                    min="0"
                    value={inventory[bg]}
                    onChange={(e) => handleInventoryChange(bg, e.target.value)}
                    className="mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-sm font-bold text-[#0B3D91] dark:text-blue-300 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Donor Proofs List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 lg:col-span-1 flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <Award className="mr-2 text-blue-500" size={20} /> Donation Approvals & Proofs
            </h3>
            <div className="space-y-4 overflow-y-auto max-h-[380px] pr-1 flex-1 custom-scrollbar">
              {donorProofs.map(proof => (
                <div key={proof.id} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-sm text-gray-800 dark:text-white flex items-center gap-1.5">
                        {proof.name}
                        {proof.type && (
                          <span className={`text-[9px] px-1 rounded font-bold ${
                            proof.type === 'Receiver' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {proof.type}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">Requested: {proof.group} | {proof.date}</p>
                      {proof.usageDetails && (
                        <p className="text-[11px] text-gray-650 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/30 p-1.5 rounded mt-1">
                          <strong className="text-[10px]">Usage:</strong> {proof.usageDetails}
                        </p>
                      )}
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      proof.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300' :
                      proof.status === 'Rejected' ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300'
                    }`}>
                      {proof.status}
                    </span>
                  </div>

                  {proof.proofImage && (
                    <div className="h-24 w-full rounded overflow-hidden relative group">
                      <img src={proof.proofImage} alt="Donation Proof" className="w-full h-full object-cover" />
                      <a href={proof.proofImage} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity">
                        View Full Image
                      </a>
                    </div>
                  )}

                  {proof.status === 'Pending Verification' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleProofStatus(proof.id, 'Approved')}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-1.5 rounded transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleProofStatus(proof.id, 'Rejected')}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1.5 rounded transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {donorProofs.length === 0 && (
                <p className="text-xs text-gray-500 italic text-center py-10">No donation proofs uploaded yet.</p>
              )}
            </div>
          </div>

          {/* Drive Join Record List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 lg:col-span-1">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <Users className="mr-2 text-green-500" size={20} /> Drive Join Registrations
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">View notifications of cadets joining active blood donation drives.</p>
            <div className="space-y-3 overflow-y-auto max-h-[350px] pr-1 custom-scrollbar">
              {driveRegistrations.map((reg, idx) => (
                <div key={reg.id || idx} className="p-3 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100/30 rounded-lg space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-[#0B3D91] dark:text-blue-300">{reg.driveName}</span>
                    <span className="bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 font-bold px-1.5 py-0.5 rounded text-[10px]">{reg.group}</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Name: {reg.userName}</p>
                  <p className="text-[10px] text-gray-500">Donations completed: {reg.timesDonated} time(s)</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      (reg.status || 'Pending Verification') === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300' :
                      (reg.status || 'Pending Verification') === 'Rejected' ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300'
                    }`}>
                      {reg.status || 'Pending Verification'}
                    </span>
                  </div>
                  {(!reg.status || reg.status === 'Pending Verification') && (
                    <div className="flex space-x-2 mt-2 pt-2 border-t border-gray-150 dark:border-gray-700">
                      <button
                        onClick={() => handleDriveRegStatus(reg.id, 'Approved')}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white text-[10px] font-bold py-1 rounded transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDriveRegStatus(reg.id, 'Rejected')}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold py-1 rounded transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {driveRegistrations.length === 0 && (
                <p className="text-xs text-gray-500 italic text-center py-10">No registration notifications yet.</p>
              )}
            </div>
          </div>

          {/* Blood Camp Hosting Requests */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 lg:col-span-1 flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <Building className="mr-2 text-red-500" size={20} /> Camp Hosting Proposals
            </h3>
            <div className="space-y-4 overflow-y-auto max-h-[350px] pr-1 flex-1 custom-scrollbar">
              {bloodCamps.filter(c => c.status === 'Pending' || !c.approved).map((camp) => (
                <div key={camp.id} className="p-3 bg-red-50/20 dark:bg-red-950/10 border border-red-100/30 rounded-lg space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-xs text-[#0B3D91] dark:text-blue-300">{camp.name}</h4>
                      <p className="text-[10px] text-gray-500">Proposed by: {camp.organizer}</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 font-bold px-1.5 py-0.5 rounded text-[9px]">{camp.status || 'Pending'}</span>
                  </div>
                  <div className="text-[10px] text-gray-650 dark:text-gray-400 space-y-0.5">
                    <p><strong>Date:</strong> {camp.date}</p>
                    <p><strong>Venue:</strong> {camp.location}</p>
                    <p><strong>Doctors:</strong> {camp.doctors}</p>
                    <p><strong>Contact:</strong> {camp.contact}</p>
                    <p className="italic text-[9px] bg-white dark:bg-gray-700 p-1 rounded mt-1">"{camp.info}"</p>
                  </div>
                  <div className="flex space-x-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                    <button
                      onClick={() => handleCampRequestStatus(camp.id, 'Approved')}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white text-[10px] font-bold py-1.5 rounded transition-colors animate-pulse"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleCampRequestStatus(camp.id, 'Rejected')}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold py-1.5 rounded transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
              {bloodCamps.filter(c => c.status === 'Pending' || !c.approved).length === 0 && (
                <p className="text-xs text-gray-500 italic text-center py-10">No pending camp proposals.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3b. LOCAL PROBLEM REPORTING ADMIN DASHBOARD */}
      {(userRole === 'admin' || userRole === 'admin_problem') && adminView === 'problems' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 animate-slide-in">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <AlertTriangle className="mr-2 text-yellow-500" size={20} /> Local Problem Reporting Console
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Review public complaints, update process stages, and upload resolved visual evidence.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {issues.map(issue => (
              <div key={issue.id} className="border border-gray-100 dark:border-gray-700 rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow bg-gray-50/50 dark:bg-gray-800/40">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-lg text-gray-800 dark:text-white">{issue.type}</h4>
                      <p className="text-xs text-gray-500">Report ID: #{1000 + issue.id} | {issue.date}</p>
                    </div>
                    <select
                      value={issue.status}
                      onChange={(e) => handleIssueStatusChange(issue.id, e.target.value)}
                      className={`text-xs font-bold rounded-full border px-3 py-1 focus:outline-none focus:ring-1 focus:ring-[#0B3D91] cursor-pointer ${
                        issue.status === 'Resolved' ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 border-green-200' :
                        issue.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300 border-yellow-200' :
                        'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border-red-200'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>

                  <p className="text-xs text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                    <Flag size={12} className="mr-1 text-gray-400" /> Location: {issue.location}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Reported Photo</span>
                      {issue.image ? (
                        <img src={issue.image} alt="Reported" className="h-20 w-full object-cover rounded border border-gray-200 dark:border-gray-700" />
                      ) : (
                        <div className="h-20 w-full bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-[10px] text-gray-400">No Photo</div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider block">Resolved Photo</span>
                      {issue.resolvedImage ? (
                        <div className="relative h-20 w-full rounded overflow-hidden border border-green-200">
                          <img src={issue.resolvedImage} alt="Resolved" className="h-full w-full object-cover" />
                          <button 
                            onClick={() => setIssues(issues.map(iss => iss.id === issue.id ? { ...iss, resolvedImage: null } : iss))}
                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 hover:bg-red-700"
                          >
                            <X size={10} />
                          </button>
                        </div>
                      ) : (
                        <div className="h-20 w-full bg-green-50 dark:bg-green-950/20 rounded border border-dashed border-green-200 dark:border-green-800 flex items-center justify-center text-[10px] text-green-500 italic text-center p-1">Pending fix</div>
                      )}
                    </div>
                  </div>
                </div>

                {issue.status === 'Resolved' && !issue.resolvedImage && (
                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
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
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Users size={32} />} title="Total Cadets" value="1.5M+" color="bg-blue-500" />
        <StatCard icon={<Droplet size={32} />} title="Blood Donated" value="50K+ Units" color="bg-red-500" />
        <StatCard icon={<Flag size={32} />} title="Swachh Bharat" value="100K+ Hrs" color="bg-green-500" />
      </div>

      {/* Core Values Section */}
      <div className="py-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">Core Pillars of YOUTH</h2>
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

      {/* About YOUTH Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* About YOUTH */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-[#0B3D91] dark:text-blue-400 border-b border-gray-100 dark:border-gray-700 pb-3">About YOUTH Organizations (NCC, NSS, Scouts & Guides)</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
            The Youth Empower Portal brings together the vast network of India's premier youth organizations, including the <strong>National Cadet Corps (NCC)</strong>, <strong>National Service Scheme (NSS)</strong>, and <strong>Bharat Scouts and Guides</strong>. Together, these organizations mobilize millions of young minds to contribute to nation-building, social service, and disaster relief.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-800/40">
              <h3 className="font-bold text-[#0B3D91] dark:text-blue-300 text-sm uppercase tracking-wider mb-2">NCC (National Cadet Corps)</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">Grooms the youth of the country into disciplined and patriotic citizens through Tri-Services training. Motto: "Unity and Discipline".</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-100 dark:border-green-800/40">
              <h3 className="font-bold text-[#556B2F] dark:text-green-300 text-sm uppercase tracking-wider mb-2">NSS & Scouts</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">Focuses on community service, personality development, and emergency relief operations across the nation. Motto: "Not Me But You".</p>
            </div>
          </div>
          <div className="space-y-2 mt-6">
            <h3 className="font-bold text-gray-800 dark:text-white text-md">Youth Contributions to the Nation:</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>Mega blood donation and health camps</li>
              <li>Swachh Bharat and environmental drives</li>
              <li>Disaster management and relief support</li>
              <li>Skill development and innovation for Viksit Bharat</li>
            </ul>
          </div>
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
