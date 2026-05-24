import React, { useState, useEffect } from 'react';
import { Heart, Search, Bell, Activity, MapPin, UserPlus, Building, AlertCircle, Send, Calendar, Award, Upload, X, CheckCircle, Plus, Users, Droplet, Phone } from 'lucide-react';

const BloodDonation = () => {
  const [role, setRole] = useState('donor'); // Default active role panel
  const [notification, setNotification] = useState('');

  // Enhanced Donor Form State
  const [donorForm, setDonorForm] = useState({
    name: '',
    age: '',
    weight: '',
    group: 'A+',
    location: '',
    timesDonated: 0,
    lastDonation: '',
    noDiseases: false
  });

  // Blood Bank Form State
  const [bankForm, setBankForm] = useState({ group: 'A+', location: '', units: 0, lastUpdated: '' });

  // Enhanced Receiver Form State
  const [receiverForm, setReceiverForm] = useState({
    name: '',
    group: 'O-',
    location: '',
    unitsNeeded: 1,
    urgency: 'Critical (Within 2 hrs)',
    contact: '',
    reason: ''
  });

  // State for Join camp registration
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [joinForm, setJoinForm] = useState({ name: '', age: '', weight: '', group: 'A+', timesDonated: 0, lastDonation: '', noDiseases: false });

  // State for Certificate proofs
  const [donorProof, setDonorProof] = useState({ name: '', group: 'A+', date: '', proofImage: '' });
  const [receiverProof, setReceiverProof] = useState({ name: '', group: 'A+', date: '', proofImage: '', usageDetails: '' });

  // Drives state loaded from localStorage - matching Second Screenshot Exactly
  const [drives, setDrives] = useState(() => {
    const saved = localStorage.getItem('blood_camps');
    if (saved) return JSON.parse(saved);
    return [
      { 
        id: 1, 
        name: 'Delhi NCC HQ Mega Blood Drive', 
        date: '2026-06-01', 
        time: '10:00 AM', 
        location: 'NCC Parade Ground, New Delhi', 
        organizer: 'Lt. Col. Sandeep (9876543210)', 
        approved: true, 
        status: 'Approved', 
        doctors: 'Lt. Col. Sandeep', 
        contact: '9876543210', 
        info: 'Mega drive camp organized under Delhi NCC Directorate.' 
      },
      { 
        id: 2, 
        name: 'Cantonment Area Donation Camp', 
        date: '2026-06-15', 
        time: '09:00 AM', 
        location: 'Military Hospital Sector 4', 
        organizer: 'Maj. Meera Sen (9812345678)', 
        approved: true, 
        status: 'Approved', 
        doctors: 'Maj. Meera Sen', 
        contact: '9812345678', 
        info: 'Donation drive camp located inside Cantonment.' 
      },
      { 
        id: 3, 
        name: 'NCC Unity Blood Drive Bangalore', 
        date: '2026-06-20', 
        time: '08:30 AM', 
        location: 'St. John\'s Auditorium, Bangalore', 
        organizer: 'Capt. Joseph (9900112233)', 
        approved: true, 
        status: 'Approved', 
        doctors: 'Capt. Joseph', 
        contact: '9900112233', 
        info: 'Unity drive camp Bangalore.' 
      }
    ];
  });

  // State for camp proposals
  const [showCampModal, setShowCampModal] = useState(false);
  const [campForm, setCampForm] = useState({ name: '', location: '', organizer: '', doctors: '', date: '', time: '', contact: '', info: '' });

  // Drive registrations state
  const [driveRegistrations, setDriveRegistrations] = useState(() => {
    const saved = localStorage.getItem('blood_drive_registrations');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, driveName: 'Delhi NCC HQ Mega Blood Drive', userName: 'Cadet Rajesh Kumar', group: 'O+', timesDonated: 3, status: 'Pending Verification' },
      { id: 2, driveName: 'Delhi NCC HQ Mega Blood Drive', userName: 'Cadet Pooja Sharma', group: 'A+', timesDonated: 1, status: 'Pending Verification' }
    ];
  });

  // Registered donors state
  const [registeredDonors, setRegisteredDonors] = useState(() => {
    const saved = localStorage.getItem('blood_donors');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, name: 'Cadet Amit Kumar', age: 21, weight: 68, group: 'A+', location: 'Delhi Cantt', timesDonated: 4, lastDonation: '2026-02-15' },
      { id: 2, name: 'Cadet Sneha Reddy', age: 20, weight: 52, group: 'O-', location: 'South Ext', timesDonated: 2, lastDonation: '2026-01-10' }
    ];
  });

  // Emergency receiver requests matching First Screenshot
  const [receiverRequests, setReceiverRequests] = useState(() => {
    const saved = localStorage.getItem('blood_receiver_requests');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, name: 'Anil Mehta', group: 'O-', unitsNeeded: 2, location: 'City Hospital ICU', urgency: 'CRITICAL (WITHIN 2 HRS)', contact: '+91 98765 43210', reason: 'Emergency Surgery', status: 'Pending Help' },
      { id: 2, name: 'Sonia Sharma', group: 'AB+', unitsNeeded: 1, location: 'Apollo Hospital', urgency: 'HIGH (TODAY)', contact: '+91 87654 32109', reason: 'Thalassemia patient', status: 'Pending Help' }
    ];
  });

  // Blood inventory synced with localStorage
  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('blood_inventory');
    if (saved) return JSON.parse(saved);
    return {
      'A+': 12, 'A-': 8, 'B+': 15, 'B-': 5,
      'O+': 20, 'O-': 4, 'AB+': 7, 'AB-': 2
    };
  });

  // Sync to localStorage and poll updates for active cross-page synchronization
  useEffect(() => {
    localStorage.setItem('blood_camps', JSON.stringify(drives));
  }, [drives]);

  useEffect(() => {
    localStorage.setItem('blood_drive_registrations', JSON.stringify(driveRegistrations));
  }, [driveRegistrations]);

  useEffect(() => {
    localStorage.setItem('blood_donors', JSON.stringify(registeredDonors));
  }, [registeredDonors]);

  useEffect(() => {
    localStorage.setItem('blood_receiver_requests', JSON.stringify(receiverRequests));
  }, [receiverRequests]);

  useEffect(() => {
    localStorage.setItem('blood_inventory', JSON.stringify(inventory));
  }, [inventory]);

  // Reactive listener to pull updates from admin console instantly
  useEffect(() => {
    const handleStorageChange = () => {
      const savedCamps = localStorage.getItem('blood_camps');
      if (savedCamps) setDrives(JSON.parse(savedCamps));

      const savedRegs = localStorage.getItem('blood_drive_registrations');
      if (savedRegs) setDriveRegistrations(JSON.parse(savedRegs));

      const savedDonors = localStorage.getItem('blood_donors');
      if (savedDonors) setRegisteredDonors(JSON.parse(savedDonors));

      const savedRequests = localStorage.getItem('blood_receiver_requests');
      if (savedRequests) setReceiverRequests(JSON.parse(savedRequests));

      const savedInventory = localStorage.getItem('blood_inventory');
      if (savedInventory) setInventory(JSON.parse(savedInventory));
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000); // Polling backup

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Helper to count drive registrations
  const getRegCount = (driveName) => {
    return driveRegistrations.filter(r => r.driveName === driveName).length;
  };

  // Propose blood camp drive
  const handleCampRequestSubmit = (e) => {
    e.preventDefault();
    const newCamp = {
      id: Date.now(),
      name: campForm.name,
      location: campForm.location,
      organizer: campForm.organizer || campForm.contact,
      doctors: campForm.doctors,
      date: campForm.date || '2026-07-01',
      time: campForm.time || '09:00 AM - 04:00 PM',
      contact: campForm.contact,
      info: campForm.info,
      approved: false,
      status: 'Pending'
    };
    const updated = [newCamp, ...drives];
    setDrives(updated);
    localStorage.setItem('blood_camps', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
    
    alert("Blood Drive / Camp request submitted successfully! It will show under active drives once approved by the Blood Admin.");
    setShowCampModal(false);
    setCampForm({ name: '', location: '', organizer: '', doctors: '', date: '', time: '', contact: '', info: '' });
  };

  // Join Active Blood Camp Drive with full eligibility checks
  const handleJoinDriveSubmit = (e) => {
    e.preventDefault();
    
    // Eligibility validations
    if (!joinForm.name.trim()) {
      alert("Eligibility Error: Please enter your full name.");
      return;
    }

    const ageNum = parseInt(joinForm.age);
    if (isNaN(ageNum) || ageNum < 18 || ageNum > 65) {
      alert("Eligibility Error: You must be between 18 and 65 years old to donate blood.");
      return;
    }

    const weightNum = parseInt(joinForm.weight);
    if (isNaN(weightNum) || weightNum < 45) {
      alert("Eligibility Error: You must weigh at least 45 kg to donate blood.");
      return;
    }

    if (!joinForm.noDiseases) {
      alert("Eligibility Error: You must confirm that you do not suffer from any transmissible diseases or high-risk medical conditions.");
      return;
    }
    
    if (joinForm.lastDonation) {
      const lastDate = new Date(joinForm.lastDonation);
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays < 90) {
        alert(`Eligibility Error: You are not eligible to donate blood yet. A minimum gap of 90 days is required between donations. (Your last donation was ${diffDays} days ago)`);
        return;
      }
    }

    // Process registration
    const savedRegs = JSON.parse(localStorage.getItem('blood_drive_registrations') || '[]');
    const newReg = {
      id: Date.now(),
      driveName: selectedDrive.name,
      userName: joinForm.name,
      age: joinForm.age,
      weight: joinForm.weight,
      group: joinForm.group,
      timesDonated: parseInt(joinForm.timesDonated) || 0,
      lastDonationDate: joinForm.lastDonation || 'First Time',
      status: 'Pending Verification'
    };
    
    const updatedRegs = [newReg, ...savedRegs];
    localStorage.setItem('blood_drive_registrations', JSON.stringify(updatedRegs));
    setDriveRegistrations(updatedRegs);
    window.dispatchEvent(new Event('storage'));

    // Dynamic increment in the registered donors if not present
    const isDonorRegistered = registeredDonors.some(d => d.name.toLowerCase() === joinForm.name.toLowerCase());
    if (!isDonorRegistered) {
      const newDonor = {
        id: Date.now(),
        name: joinForm.name,
        age: ageNum,
        weight: weightNum,
        group: joinForm.group,
        location: 'Camp Ground',
        timesDonated: (parseInt(joinForm.timesDonated) || 0) + 1,
        lastDonation: new Date().toISOString().split('T')[0]
      };
      const updatedDonors = [newDonor, ...registeredDonors];
      setRegisteredDonors(updatedDonors);
      localStorage.setItem('blood_donors', JSON.stringify(updatedDonors));
    }

    alert("Registered successfully! You have successfully joined the blood donation drive.");
    setSelectedDrive(null);
    setJoinForm({ name: '', age: '', weight: '', group: 'A+', timesDonated: 0, lastDonation: '', noDiseases: false });
  };

  // Register / Save general Donor Profile
  const handleDonorRegisterSubmit = (e) => {
    e.preventDefault();

    if (!donorForm.name.trim()) {
      alert("Eligibility Error: Full name is required.");
      return;
    }

    const ageNum = parseInt(donorForm.age);
    if (isNaN(ageNum) || ageNum < 18 || ageNum > 65) {
      alert("Eligibility Error: You must be between 18 and 65 years old to donate blood.");
      return;
    }

    const weightNum = parseInt(donorForm.weight);
    if (isNaN(weightNum) || weightNum < 45) {
      alert("Eligibility Error: You must weigh at least 45 kg to donate blood.");
      return;
    }

    if (!donorForm.noDiseases) {
      alert("Eligibility Error: You must declare that you do not suffer from any transmissible diseases or high-risk medical conditions.");
      return;
    }

    if (donorForm.lastDonation) {
      const lastDate = new Date(donorForm.lastDonation);
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays < 90) {
        alert(`Eligibility Error: You are not eligible to donate blood yet. A minimum gap of 90 days is required between donations. (Your last donation was ${diffDays} days ago)`);
        return;
      }
    }

    const newDonor = {
      id: Date.now(),
      name: donorForm.name,
      age: ageNum,
      weight: weightNum,
      group: donorForm.group,
      location: donorForm.location || 'Local Area',
      timesDonated: parseInt(donorForm.timesDonated) || 0,
      lastDonation: donorForm.lastDonation || 'Never'
    };

    const updated = [newDonor, ...registeredDonors];
    setRegisteredDonors(updated);
    localStorage.setItem('blood_donors', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));

    alert("Successfully registered as a Donor. Thank you for your service!");
    setDonorForm({
      name: '',
      age: '',
      weight: '',
      group: 'A+',
      location: '',
      timesDonated: 0,
      lastDonation: '',
      noDiseases: false
    });
  };

  // Submit Donor Certificate / Proof
  const handleDonorProofSubmit = (e) => {
    e.preventDefault();
    if (!donorProof.proofImage) {
      alert("Please upload a proof image.");
      return;
    }
    const savedProofs = JSON.parse(localStorage.getItem('blood_donor_proofs') || '[]');
    const newProof = {
      id: Date.now(),
      name: donorProof.name,
      group: donorProof.group,
      date: donorProof.date || new Date().toISOString().split('T')[0],
      proofImage: donorProof.proofImage,
      status: 'Pending Verification',
      type: 'Donor'
    };
    localStorage.setItem('blood_donor_proofs', JSON.stringify([newProof, ...savedProofs]));
    window.dispatchEvent(new Event('storage'));
    alert("Donation proof submitted successfully! Pending approval by Blood Admin.");
    setDonorProof({ name: '', group: 'A+', date: '', proofImage: '' });
  };

  const handleDonorProofPhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDonorProof({ ...donorProof, proofImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Receiver Request
  const handleReceiverRequestSubmit = (e) => {
    e.preventDefault();
    if (!receiverForm.name.trim()) {
      alert("Please enter patient/receiver name.");
      return;
    }
    if (!receiverForm.location.trim()) {
      alert("Please specify the hospital/delivery location.");
      return;
    }

    const newRequest = {
      id: Date.now(),
      name: receiverForm.name,
      group: receiverForm.group,
      unitsNeeded: parseInt(receiverForm.unitsNeeded) || 1,
      location: receiverForm.location,
      urgency: receiverForm.urgency,
      contact: receiverForm.contact || '+91 99888 77665',
      reason: receiverForm.reason || 'Medical Emergency',
      status: 'Pending Help'
    };

    const updated = [newRequest, ...receiverRequests];
    setReceiverRequests(updated);
    localStorage.setItem('blood_receiver_requests', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));

    alert("Request submitted! Nearby Blood Banks and Donors have been notified via SMS and App Alerts.");
    setReceiverForm({
      name: '',
      group: 'O-',
      location: '',
      unitsNeeded: 1,
      urgency: 'High (Today)',
      contact: '',
      reason: ''
    });
  };

  // Submit Receiver Usage Proof (in 24 hours)
  const handleReceiverProofSubmit = (e) => {
    e.preventDefault();
    if (!receiverProof.proofImage) {
      alert("Please upload a usage proof image.");
      return;
    }
    const savedProofs = JSON.parse(localStorage.getItem('blood_donor_proofs') || '[]');
    const newProof = {
      id: Date.now(),
      name: receiverProof.name,
      group: receiverProof.group,
      date: receiverProof.date || new Date().toISOString().split('T')[0],
      proofImage: receiverProof.proofImage,
      status: 'Pending Verification',
      type: 'Receiver',
      usageDetails: receiverProof.usageDetails
    };
    localStorage.setItem('blood_donor_proofs', JSON.stringify([newProof, ...savedProofs]));
    window.dispatchEvent(new Event('storage'));
    alert("Receiver usage proof submitted successfully! Pending verification by Admin.");
    setReceiverProof({ name: '', group: 'A+', date: '', proofImage: '', usageDetails: '' });
  };

  const handleReceiverProofPhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiverProof({ ...receiverProof, proofImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Accept receiver request (Help)
  const handleAcceptReceiverRequest = (id) => {
    const updated = receiverRequests.map(r => {
      if (r.id === id) {
        return { ...r, status: 'Cadet Responded' };
      }
      return r;
    });
    setReceiverRequests(updated);
    localStorage.setItem('blood_receiver_requests', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
    alert("Thank you! You have accepted the request. Please coordinate with the patient/hospital immediately.");
  };

  // Update Inventory directly from Bank View
  const handleBankFormSubmit = (e) => {
    e.preventDefault();
    const updatedInventory = {
      ...inventory,
      [bankForm.group]: (parseInt(inventory[bankForm.group]) || 0) + (parseInt(bankForm.units) || 0)
    };
    setInventory(updatedInventory);
    localStorage.setItem('blood_inventory', JSON.stringify(updatedInventory));
    window.dispatchEvent(new Event('storage'));
    setNotification(`Successfully added ${bankForm.units} units of ${bankForm.group} to inventory!`);
    setTimeout(() => setNotification(''), 4000);
    setBankForm({ group: 'A+', location: '', units: 0, lastUpdated: '' });
  };

  const activeDrives = drives.filter(d => d.approved || d.status === 'Approved');

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-4xl font-extrabold text-[#0B3D91] dark:text-blue-400 tracking-tight flex items-center justify-center gap-2">
          <Heart className="text-red-500 fill-red-500" size={36} /> Blood Donation Portal
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Save a Life. Support the nation. Connect instantly with emergency receivers, track camp drives, and manage medical stocks.
        </p>
      </div>

      {/* Top 3 Interactive Option Cards (Always Visible side-by-side) - Matching Second Screenshot Descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Donor Box */}
        <button 
          onClick={() => setRole('donor')} 
          className={`p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all border-2 flex flex-col items-center text-center ${
            role === 'donor' 
              ? 'bg-red-50/40 dark:bg-red-950/20 border-red-500 scale-[1.02]' 
              : 'bg-white dark:bg-gray-800 border-gray-150 dark:border-gray-700 hover:border-red-300'
          }`}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${
            role === 'donor' ? 'bg-red-500 text-white' : 'bg-red-100 dark:bg-red-900/30 text-red-500'
          }`}>
            <Heart size={32} className={role === 'donor' ? 'fill-white' : 'fill-red-500'} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">I am a Donor</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Register as a volunteer donor, submit certificates to redeem merit stars, and browse active drives.
          </p>
        </button>

        {/* Blood Bank Box */}
        <button 
          onClick={() => setRole('bank')} 
          className={`p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all border-2 flex flex-col items-center text-center ${
            role === 'bank' 
              ? 'bg-blue-50/40 dark:bg-blue-950/20 border-blue-500 scale-[1.02]' 
              : 'bg-white dark:bg-gray-800 border-gray-150 dark:border-gray-700 hover:border-blue-300'
          }`}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${
            role === 'bank' ? 'bg-blue-500 text-white' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-500'
          }`}>
            <Building size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Blood Bank Management</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Directly sync blood bank inventory levels and review critical unit availability stats.
          </p>
        </button>

        {/* Receiver Box */}
        <button 
          onClick={() => setRole('receiver')} 
          className={`p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all border-2 flex flex-col items-center text-center ${
            role === 'receiver' 
              ? 'bg-yellow-50/40 dark:bg-yellow-950/20 border-yellow-500 scale-[1.02]' 
              : 'bg-white dark:bg-gray-800 border-gray-150 dark:border-gray-700 hover:border-yellow-300'
          }`}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${
            role === 'receiver' ? 'bg-yellow-500 text-white' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-500'
          }`}>
            <AlertCircle size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Emergency Receiver</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Request emergency supply, notify nearest local units, and upload 24hr usage receipts.
          </p>
        </button>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-xl shadow-sm animate-pulse flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle className="mr-2 text-green-600" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification('')} className="text-green-800 hover:text-green-950 font-bold"><X size={16} /></button>
        </div>
      )}

      {/* DYNAMIC FORMS ACCORDING TO SELECTED ROLE */}
      
      {/* 1. DONOR PORTAL ACTION PLAN - Matches First Screenshot Exactly */}
      {role === 'donor' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
          {/* Cadet Donor Enlistment Form */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
            <h2 className="text-xl font-bold text-[#0B3D91] dark:text-white flex items-center gap-2">
              <UserPlus className="text-red-500" size={24} /> Cadet Donor Enlistment
            </h2>
            <p className="text-xs text-gray-500">
              Submit your basic information below to join the emergency cadet donor network.
            </p>

            <form onSubmit={handleDonorRegisterSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    value={donorForm.name} 
                    onChange={(e) => setDonorForm({ ...donorForm, name: e.target.value })} 
                    className="w-full rounded-lg border border-gray-200 py-2 px-3 dark:bg-gray-700 dark:text-white text-sm focus:ring-1 focus:ring-red-500 focus:outline-none" 
                    placeholder="E.g., Cadet Amit" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Age (18 - 65)</label>
                  <input 
                    required 
                    type="number" 
                    min="18" 
                    max="65"
                    value={donorForm.age} 
                    onChange={(e) => setDonorForm({ ...donorForm, age: e.target.value })} 
                    className="w-full rounded-lg border border-gray-200 py-2 px-3 dark:bg-gray-700 dark:text-white text-sm focus:ring-1 focus:ring-red-500 focus:outline-none" 
                    placeholder="Min 18" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Weight (kg)</label>
                  <input 
                    required 
                    type="number" 
                    min="1" 
                    value={donorForm.weight} 
                    onChange={(e) => setDonorForm({ ...donorForm, weight: e.target.value })} 
                    className="w-full rounded-lg border border-gray-250 py-2 px-3 dark:bg-gray-700 dark:text-white text-sm focus:ring-1 focus:ring-red-500 focus:outline-none" 
                    placeholder="Min 45 kg" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Blood Group</label>
                  <select 
                    value={donorForm.group} 
                    onChange={(e) => setDonorForm({ ...donorForm, group: e.target.value })} 
                    className="w-full rounded-lg border-gray-250 py-2 px-3 dark:bg-gray-700 dark:text-white text-sm focus:ring-1 focus:ring-red-500 focus:outline-none"
                  >
                    {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Location Pincode</label>
                  <input 
                    required 
                    type="text" 
                    value={donorForm.location} 
                    onChange={(e) => setDonorForm({ ...donorForm, location: e.target.value })} 
                    className="w-full rounded-lg border-gray-250 py-2 px-3 dark:bg-gray-700 dark:text-white text-sm focus:ring-1 focus:ring-red-500 focus:outline-none" 
                    placeholder="E.g., 110010" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Times Donated Before</label>
                  <input 
                    type="number" 
                    min="0" 
                    value={donorForm.timesDonated} 
                    onChange={(e) => setDonorForm({ ...donorForm, timesDonated: e.target.value })} 
                    className="w-full rounded-lg border-gray-250 py-2 px-3 dark:bg-gray-700 dark:text-white text-sm focus:ring-1 focus:ring-red-500 focus:outline-none" 
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Last Donation Date</label>
                  <input 
                    type="date" 
                    value={donorForm.lastDonation} 
                    onChange={(e) => setDonorForm({ ...donorForm, lastDonation: e.target.value })} 
                    className="w-full rounded-lg border-gray-250 py-2 px-3 dark:bg-gray-700 dark:text-white text-sm focus:ring-1 focus:ring-red-500 focus:outline-none" 
                  />
                </div>
              </div>

              <div className="flex items-start space-x-2 pt-2">
                <input 
                  required 
                  type="checkbox" 
                  id="donorNoDiseases" 
                  checked={donorForm.noDiseases} 
                  onChange={(e) => setDonorForm({ ...donorForm, noDiseases: e.target.checked })} 
                  className="mt-0.5 h-4 w-4 rounded text-red-650 focus:ring-red-500 border-gray-300" 
                />
                <label htmlFor="donorNoDiseases" className="text-xs text-gray-500 dark:text-gray-400">
                  I confirm that I am fit, weigh over 45kg, have no transmissible viruses (HIV/Hep), and no tattoo work in the last 6 months.
                </label>
              </div>

              <button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg transition-colors text-sm shadow-sm"
              >
                Register as Active Donor
              </button>
            </form>
          </div>

          {/* Right Column: Emergency Receiver Alerts & Submit Donation Proof */}
          <div className="space-y-6">
            
            {/* Emergency Receiver Notices Card */}
            <div className="bg-[#FFF8F8] dark:bg-red-950/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/30 space-y-4">
              <h3 className="text-xl font-bold text-red-800 dark:text-red-400 flex items-center gap-2">
                <Bell size={22} className="text-red-600" /> Emergency Receiver Notices
              </h3>
              
              <div className="space-y-4 overflow-y-auto max-h-[220px] pr-1 custom-scrollbar">
                {receiverRequests.map(req => (
                  <div key={req.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-red-100/40 dark:border-gray-700 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 font-extrabold px-2 py-0.5 rounded text-xs">
                        {req.group} Group
                      </span>
                      <span className="text-[10px] text-red-600 font-extrabold bg-red-50 px-2 py-0.5 rounded">
                        {req.urgency}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 font-semibold">Patient: {req.name}</p>
                    <p className="text-xs text-gray-505 flex items-center gap-1">
                      <MapPin size={12} className="text-red-500" /> {req.location}
                    </p>
                    <p className="text-[11px] text-gray-450 italic">Reason: {req.reason} | Units: {req.unitsNeeded}</p>
                    
                    <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                      <span className="text-[10px] text-gray-400">Phone: {req.contact}</span>
                      {req.status === 'Pending Help' ? (
                        <button 
                          onClick={() => handleAcceptReceiverRequest(req.id)}
                          className="bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold px-3 py-1 rounded transition-colors"
                        >
                          Respond &amp; Donate
                        </button>
                      ) : (
                        <span className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 text-[11px] font-bold px-2 py-0.5 rounded">
                          {req.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {receiverRequests.length === 0 && (
                  <p className="text-xs text-gray-500 italic text-center py-8">No emergency requests active.</p>
                )}
              </div>
            </div>

            {/* Submit Donation Proof Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Award className="text-yellow-500" size={22} /> Submit Donation Proof
              </h3>
              <form onSubmit={handleDonorProofSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Donor Name</label>
                    <input 
                      required type="text" value={donorProof.name} 
                      onChange={(e) => setDonorProof({ ...donorProof, name: e.target.value })} 
                      className="w-full rounded border border-gray-250 py-1.5 px-3 text-xs dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#0B3D91]" 
                      placeholder="E.g., Amit Kumar" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Blood Group</label>
                    <select 
                      value={donorProof.group} 
                      onChange={(e) => setDonorProof({ ...donorProof, group: e.target.value })} 
                      className="w-full rounded border border-gray-250 py-1.5 px-3 text-xs dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#0B3D91]"
                    >
                      {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Donation Date</label>
                    <input 
                      required type="date" value={donorProof.date} 
                      onChange={(e) => setDonorProof({ ...donorProof, date: e.target.value })} 
                      className="w-full rounded border border-gray-250 py-1.5 px-3 text-xs dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#0B3D91]" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Upload Certificate (Image)</label>
                    <div className="flex items-center space-x-2">
                      <label className="flex-1 flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-600 rounded-lg py-1.5 px-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 text-xs text-gray-500">
                        <Upload size={12} className="mr-1" />
                        <span className="truncate">{donorProof.proofImage ? "Selected" : "Choose File"}</span>
                        <input type="file" accept="image/*" onChange={handleDonorProofPhoto} className="hidden" />
                      </label>
                      {donorProof.proofImage && (
                        <button type="button" onClick={() => setDonorProof({ ...donorProof, proofImage: '' })} className="p-1 bg-red-100 hover:bg-red-200 text-red-600 rounded">
                          <X size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-[#0B3D91] hover:bg-blue-800 text-white font-bold py-2 rounded text-xs transition-colors"
                >
                  Upload &amp; Notify Admin
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 2. BLOOD BANK MANAGEMENT PANEL */}
      {role === 'bank' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
          {/* Inventory visualizer */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-150 dark:border-gray-700 space-y-4">
            <h2 className="text-xl font-bold text-[#0B3D91] dark:text-white flex items-center gap-2">
              <Droplet className="text-red-500" /> Current Stock Levels
            </h2>
            <p className="text-xs text-gray-500">
              Real-time available blood units. Syncs with Blood Admin and hospital requests.
            </p>

            <div className="grid grid-cols-4 gap-4 pt-2">
              {Object.keys(inventory).map(bg => (
                <div key={bg} className="p-4 bg-gray-50 dark:bg-gray-700/40 rounded-xl border border-gray-100 dark:border-gray-600 text-center shadow-sm">
                  <span className="block font-black text-lg text-red-650 dark:text-red-400">{bg}</span>
                  <span className="block font-bold text-gray-800 dark:text-white text-base mt-1">{inventory[bg]}</span>
                  <span className="block text-[10px] text-gray-400">Units</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stock Refill Form */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-150 dark:border-gray-700 space-y-4">
            <h2 className="text-xl font-bold text-[#0B3D91] dark:text-white flex items-center gap-2">
              <Building className="text-blue-500" /> Refill Inventory
            </h2>
            <p className="text-xs text-gray-500">
              For blood bank managers to quickly log received donation camp stock.
            </p>

            <form onSubmit={handleBankFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Blood Group</label>
                  <select 
                    value={bankForm.group} 
                    onChange={(e) => setBankForm({ ...bankForm, group: e.target.value })} 
                    className="w-full rounded-lg border-gray-200 dark:border-gray-600 py-2 px-3 border dark:bg-gray-700 dark:text-white text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  >
                    {Object.keys(inventory).map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Units (Refill / Log)</label>
                  <input 
                    required 
                    type="number" 
                    min="1" 
                    value={bankForm.units || ''} 
                    onChange={(e) => setBankForm({ ...bankForm, units: e.target.value })} 
                    className="w-full rounded-lg border-gray-200 dark:border-gray-600 py-2 px-3 border dark:bg-gray-700 dark:text-white text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none" 
                    placeholder="E.g., 5" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Location Center</label>
                <input 
                  required 
                  type="text" 
                  value={bankForm.location} 
                  onChange={(e) => setBankForm({ ...bankForm, location: e.target.value })} 
                  className="w-full rounded-lg border-gray-200 dark:border-gray-600 py-2 px-3 border dark:bg-gray-700 dark:text-white text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none" 
                  placeholder="E.g., Central Military Hospital" 
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#0B3D91] hover:bg-blue-800 text-white font-bold py-2.5 rounded-lg text-sm shadow-sm transition-colors"
              >
                Log Refill Units
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. EMERGENCY RECEIVER PORTAL */}
      {role === 'receiver' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
          {/* File Emergency Request form */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-150 dark:border-gray-700 space-y-4">
            <h2 className="text-xl font-bold text-[#0B3D91] dark:text-white flex items-center gap-2">
              <AlertCircle className="text-yellow-500" /> Request Emergency Blood
            </h2>
            <p className="text-xs text-gray-500">
              Submit patient requirements. Nearby registered cadet donors and hospital banks will receive instant system notifications.
            </p>

            <form onSubmit={handleReceiverRequestSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Patient Name</label>
                  <input 
                    required 
                    type="text" 
                    value={receiverForm.name} 
                    onChange={(e) => setReceiverForm({ ...receiverForm, name: e.target.value })} 
                    className="w-full rounded-lg border-gray-200 dark:border-gray-600 py-2 px-3 border dark:bg-gray-700 dark:text-white text-sm focus:ring-1 focus:ring-yellow-500 focus:outline-none" 
                    placeholder="Patient Full Name" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Blood Group Needed</label>
                  <select 
                    value={receiverForm.group} 
                    onChange={(e) => setReceiverForm({ ...receiverForm, group: e.target.value })} 
                    className="w-full rounded-lg border-gray-200 dark:border-gray-600 py-2 px-3 border dark:bg-gray-700 dark:text-white text-sm focus:ring-1 focus:ring-yellow-500 focus:outline-none"
                  >
                    {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Units Required</label>
                  <input 
                    required 
                    type="number" 
                    min="1" 
                    value={receiverForm.unitsNeeded} 
                    onChange={(e) => setReceiverForm({ ...receiverForm, unitsNeeded: e.target.value })} 
                    className="w-full rounded-lg border-gray-200 dark:border-gray-600 py-2 px-3 border dark:bg-gray-700 dark:text-white text-sm focus:ring-1 focus:ring-yellow-500 focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Urgency</label>
                  <select 
                    value={receiverForm.urgency} 
                    onChange={(e) => setReceiverForm({ ...receiverForm, urgency: e.target.value })} 
                    className="w-full rounded-lg border-gray-200 dark:border-gray-600 py-2 px-3 border dark:bg-gray-700 dark:text-white text-sm focus:ring-1 focus:ring-yellow-500 focus:outline-none"
                  >
                    <option value="Critical (Within 2 hrs)">Critical (Within 2 hrs)</option>
                    <option value="High (Today)">High (Today)</option>
                    <option value="Moderate (Within 24 hrs)">Moderate (Within 24 hrs)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Emergency Phone</label>
                  <input 
                    required 
                    type="text" 
                    value={receiverForm.contact} 
                    onChange={(e) => setReceiverForm({ ...receiverForm, contact: e.target.value })} 
                    className="w-full rounded-lg border-gray-200 dark:border-gray-600 py-2 px-3 border dark:bg-gray-700 dark:text-white text-sm focus:ring-1 focus:ring-yellow-500 focus:outline-none" 
                    placeholder="99888xxxxx" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Hospital Name &amp; Room Details</label>
                <input 
                  required 
                  type="text" 
                  value={receiverForm.location} 
                  onChange={(e) => setReceiverForm({ ...receiverForm, location: e.target.value })} 
                  className="w-full rounded-lg border-gray-200 dark:border-gray-600 py-2 px-3 border dark:bg-gray-700 dark:text-white text-sm focus:ring-1 focus:ring-yellow-500 focus:outline-none" 
                  placeholder="E.g., City Trauma Center, Room 302" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Medical Reason / Purpose</label>
                <textarea 
                  value={receiverForm.reason} 
                  onChange={(e) => setReceiverForm({ ...receiverForm, reason: e.target.value })} 
                  className="w-full rounded-lg border-gray-200 dark:border-gray-600 py-2 px-3 border dark:bg-gray-700 dark:text-white text-sm focus:ring-1 focus:ring-yellow-500 focus:outline-none" 
                  placeholder="E.g., Open Heart Surgery" 
                  rows="2"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-red-650 hover:bg-red-750 text-white font-bold py-2.5 rounded-lg text-sm transition-colors shadow-sm"
              >
                Submit Emergency Notice
              </button>
            </form>
          </div>

          {/* Submit Blood Usage Proof */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-150 dark:border-gray-700 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-4 text-[#0B3D91] dark:text-white flex items-center gap-2">
                <Award className="text-yellow-600" /> Submit Usage Verification (24 Hrs)
              </h2>
              <p className="text-xs text-gray-500 mb-4">
                Receivers are required to upload image proof of how the received blood was used in 24 hours to prevent hoarding or misuse.
              </p>
              
              <form onSubmit={handleReceiverProofSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Your Name</label>
                    <input 
                      required type="text" value={receiverProof.name} 
                      onChange={(e) => setReceiverProof({ ...receiverProof, name: e.target.value })} 
                      className="w-full rounded-lg border-gray-250 py-2 px-3 border dark:bg-gray-700 dark:text-white text-xs" 
                      placeholder="Receiver Name" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Blood Group Used</label>
                    <select 
                      value={receiverProof.group} 
                      onChange={(e) => setReceiverProof({ ...receiverProof, group: e.target.value })} 
                      className="w-full rounded-lg border-gray-250 py-2 px-3 border dark:bg-gray-700 dark:text-white text-xs"
                    >
                      {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Date Utilized</label>
                    <input 
                      required type="date" value={receiverProof.date} 
                      onChange={(e) => setReceiverProof({ ...receiverProof, date: e.target.value })} 
                      className="w-full rounded-lg border-gray-250 py-2 px-3 border dark:bg-gray-700 dark:text-white text-xs" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Upload Photo (Proof of usage)</label>
                    <div className="flex items-center space-x-2">
                      <label className="flex-1 flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-600 rounded-lg py-2 px-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 text-xs text-gray-500">
                        <Upload size={12} className="mr-1" />
                        <span className="truncate">{receiverProof.proofImage ? "Proof Uploaded" : "Browse..."}</span>
                        <input type="file" accept="image/*" onChange={handleReceiverProofPhoto} className="hidden" />
                      </label>
                      {receiverProof.proofImage && (
                        <button type="button" onClick={() => setReceiverProof({ ...receiverProof, proofImage: '' })} className="p-2 bg-red-150 text-red-650 rounded">
                          <X size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Utilization Details</label>
                  <textarea 
                    required 
                    value={receiverProof.usageDetails} 
                    onChange={(e) => setReceiverProof({ ...receiverProof, usageDetails: e.target.value })} 
                    className="w-full rounded-lg border-gray-250 py-2 px-3 border dark:bg-gray-700 dark:text-white text-xs" 
                    placeholder="E.g., Successfully transfused units during surgery."
                    rows="2"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-yellow-600 hover:bg-yellow-750 text-white font-bold py-2.5 rounded-lg text-xs transition-colors"
                >
                  Submit Usage Verification Proof
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ALWAYS VISIBLE UNDERNEATH SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        
        {/* Left/Middle Column (span-2): Active Blood Camps & Drives - Matching Second Screenshot Exactly */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-150 dark:border-gray-700 lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-850 dark:text-white flex items-center gap-2">
                <Calendar className="text-red-500" /> Active Blood Camps &amp; Drives
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Upcoming donation camps organized by units. Cadets and civilians can select a camp to enlist.
              </p>
            </div>
            <button
              onClick={() => setShowCampModal(true)}
              className="flex items-center px-4 py-2 bg-[#0B3D91] hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
            >
              <Plus size={14} className="mr-1" /> Propose Camp/Drive
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {activeDrives.map(drive => (
              <div 
                key={drive.id} 
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 bg-white dark:bg-gray-800/40 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="space-y-2">
                  <h3 className="font-extrabold text-base text-[#0B3D91] dark:text-blue-400">
                    {drive.name}
                  </h3>
                  <div className="space-y-1 text-xs text-gray-550 dark:text-gray-400 pt-1">
                    <p className="flex items-center gap-1.5"><Calendar size={12} className="text-red-500" /> {drive.date} | {drive.time || '09:00 AM'}</p>
                    <p className="flex items-center gap-1.5"><MapPin size={12} className="text-red-500" /> {drive.location}</p>
                    <p className="flex items-center gap-1.5"><Phone size={12} className="text-red-500" /> {drive.organizer}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-50 dark:border-gray-700">
                  <div className="bg-[#EBF7EE] dark:bg-green-950/30 text-[#27AE60] dark:text-green-400 text-xs font-semibold px-2.5 py-1 rounded-md border border-[#D1F2D9]">
                    {getRegCount(drive.name)} Registered
                  </div>
                  <button
                    onClick={() => setSelectedDrive(drive)}
                    className="bg-[#D2122E] hover:bg-red-700 text-white text-xs font-extrabold py-1.5 px-4 rounded transition-colors"
                  >
                    Join Camp
                  </button>
                </div>
              </div>
            ))}
            {activeDrives.length === 0 && (
              <p className="text-xs text-gray-500 italic py-10 text-center col-span-2">No active drives posted. Be the first to host one!</p>
            )}
          </div>
        </div>

        {/* Right Column (span-1): Active Cadet Donor Directory */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-150 dark:border-gray-700 lg:col-span-1 space-y-4">
          <h2 className="text-xl font-bold text-gray-850 dark:text-white flex items-center gap-2">
            <Users className="text-red-500" /> Cadet Donor Registry
          </h2>
          <p className="text-xs text-gray-500">
            Registered cadet leaders in the regional pool. Ready for immediate deploy.
          </p>

          <div className="space-y-3 overflow-y-auto max-h-[360px] pr-1 custom-scrollbar">
            {registeredDonors.map(donor => (
              <div key={donor.id} className="p-3 bg-gray-50/50 dark:bg-gray-750/30 rounded-xl border border-gray-100 dark:border-gray-750 flex justify-between items-center">
                <div className="space-y-0.5">
                  <p className="font-extrabold text-sm text-gray-800 dark:text-white">{donor.name}</p>
                  <p className="text-[10px] text-gray-500">
                    Loc: {donor.location} | Age: {donor.age} | {donor.weight}kg
                  </p>
                  <p className="text-[9px] text-gray-400 italic">Last donation: {donor.lastDonation}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 font-black px-2.5 py-0.5 rounded text-xs">
                    {donor.group}
                  </span>
                  <p className="text-[10px] font-bold text-gray-650 dark:text-gray-300 mt-1">{donor.timesDonated} times</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* JOIN DRIVE CAMP MODAL */}
      {selectedDrive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700 animate-scale-up">
            <div className="bg-[#0B3D91] text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-base font-bold flex items-center gap-1.5">
                <Heart size={18} className="fill-red-500 stroke-none" /> Join Blood Camp
              </h3>
              <button onClick={() => setSelectedDrive(null)} className="text-white/80 hover:text-white"><X size={20} /></button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-3 rounded-lg text-xs text-blue-700 dark:text-blue-300">
                <p className="font-bold">Registering For: {selectedDrive.name}</p>
                <p className="mt-0.5">Date: {selectedDrive.date} | Location: {selectedDrive.location}</p>
              </div>

              <form onSubmit={handleJoinDriveSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Your Full Name</label>
                    <input 
                      required type="text" value={joinForm.name}
                      onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })}
                      className="w-full rounded-lg border border-gray-250 py-1.5 px-3 text-xs dark:bg-gray-700 dark:text-white"
                      placeholder="E.g., Cadet Rajesh"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Age (18 - 65)</label>
                    <input 
                      required type="number" min="18" max="65" value={joinForm.age || ''}
                      onChange={(e) => setJoinForm({ ...joinForm, age: e.target.value })}
                      className="w-full rounded-lg border border-gray-250 py-1.5 px-3 text-xs dark:bg-gray-700 dark:text-white"
                      placeholder="Age"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Weight (kg)</label>
                    <input 
                      required type="number" min="1" value={joinForm.weight || ''}
                      onChange={(e) => setJoinForm({ ...joinForm, weight: e.target.value })}
                      className="w-full rounded-lg border border-gray-250 py-1.5 px-3 text-xs dark:bg-gray-700 dark:text-white"
                      placeholder="Min 45"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Blood Group</label>
                    <select
                      value={joinForm.group}
                      onChange={(e) => setJoinForm({ ...joinForm, group: e.target.value })}
                      className="w-full rounded-lg border border-gray-250 py-1.5 px-3 text-xs dark:bg-gray-700 dark:text-white"
                    >
                      {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Times Donated</label>
                    <input 
                      type="number" min="0" value={joinForm.timesDonated}
                      onChange={(e) => setJoinForm({ ...joinForm, timesDonated: e.target.value })}
                      className="w-full rounded-lg border border-gray-250 py-1.5 px-3 text-xs dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">When did you donate last time?</label>
                  <input 
                    type="date" value={joinForm.lastDonation}
                    onChange={(e) => setJoinForm({ ...joinForm, lastDonation: e.target.value })}
                    className="w-full rounded-lg border border-gray-250 py-1.5 px-3 text-xs dark:bg-gray-700 dark:text-white"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">Leave empty if this is your first donation.</p>
                </div>

                <div className="flex items-start space-x-2 pt-1">
                  <input 
                    required type="checkbox" id="joinHealthCheck"
                    checked={joinForm.noDiseases}
                    onChange={(e) => setJoinForm({ ...joinForm, noDiseases: e.target.checked })}
                    className="mt-0.5 text-red-650 h-3.5 w-3.5"
                  />
                  <label htmlFor="joinHealthCheck" className="text-[10px] text-gray-500">
                    I confirm that I do not suffer from transmissible conditions, hepatitis, high blood pressure, or viral diseases.
                  </label>
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    type="submit" 
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded text-xs transition-colors"
                  >
                    Submit &amp; Register
                  </button>
                  <button 
                    type="button" onClick={() => setSelectedDrive(null)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-bold py-2 rounded text-xs transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* HOST DRIVE PROPOSAL MODAL */}
      {showCampModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700 animate-scale-up">
            <div className="bg-[#0B3D91] text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-base font-bold flex items-center gap-1.5">
                <Building size={18} /> Request to Host Blood Camp
              </h3>
              <button onClick={() => setShowCampModal(false)} className="text-white/80 hover:text-white"><X size={20} /></button>
            </div>

            <form onSubmit={handleCampRequestSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Camp / Drive Name</label>
                  <input 
                    required type="text" value={campForm.name} 
                    onChange={(e) => setCampForm({ ...campForm, name: e.target.value })} 
                    className="w-full rounded border border-gray-250 py-1.5 px-3 dark:bg-gray-700 dark:text-white" 
                    placeholder="E.g., JNU Campus Drive"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Organizing Body / Unit</label>
                  <input 
                    required type="text" value={campForm.organizer} 
                    onChange={(e) => setCampForm({ ...campForm, organizer: e.target.value })} 
                    className="w-full rounded border border-gray-250 py-1.5 px-3 dark:bg-gray-700 dark:text-white" 
                    placeholder="E.g., NCC 3rd Coy JNU"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Location / Venue</label>
                  <input 
                    required type="text" value={campForm.location} 
                    onChange={(e) => setCampForm({ ...campForm, location: e.target.value })} 
                    className="w-full rounded border border-gray-250 py-1.5 px-3 dark:bg-gray-700 dark:text-white" 
                    placeholder="Students Activity Centre"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Proposed Date</label>
                  <input 
                    required type="date" value={campForm.date} 
                    onChange={(e) => setCampForm({ ...campForm, date: e.target.value })} 
                    className="w-full rounded border border-gray-250 py-1.5 px-3 dark:bg-gray-700 dark:text-white" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Proposed Time</label>
                  <input 
                    required type="text" value={campForm.time} 
                    onChange={(e) => setCampForm({ ...campForm, time: e.target.value })} 
                    className="w-full rounded border border-gray-250 py-1.5 px-3 dark:bg-gray-700 dark:text-white" 
                    placeholder="E.g., 09:00 AM - 04:00 PM"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Contact Phone</label>
                  <input 
                    required type="text" value={campForm.contact} 
                    onChange={(e) => setCampForm({ ...campForm, contact: e.target.value })} 
                    className="w-full rounded border border-gray-250 py-1.5 px-3 dark:bg-gray-700 dark:text-white" 
                    placeholder="+91 99999 xxxxx"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Chief Doctors in Charge</label>
                  <input 
                    required type="text" value={campForm.doctors} 
                    onChange={(e) => setCampForm({ ...campForm, doctors: e.target.value })} 
                    className="w-full rounded border border-gray-250 py-1.5 px-3 dark:bg-gray-700 dark:text-white" 
                    placeholder="E.g., Dr. Seema Gupta (SJH)"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Description / Expected Turnout</label>
                  <textarea 
                    required value={campForm.info} 
                    onChange={(e) => setCampForm({ ...campForm, info: e.target.value })} 
                    className="w-full rounded border border-gray-250 py-1.5 px-3 dark:bg-gray-700 dark:text-white" 
                    placeholder="Provide details about expectations, chief guest, cadet involvement..."
                    rows="2"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="submit" 
                  className="flex-1 bg-[#D2122E] hover:bg-red-700 text-white font-bold py-2 rounded text-xs transition-colors"
                >
                  Submit Proposal
                </button>
                <button 
                  type="button" onClick={() => setShowCampModal(false)}
                  className="flex-1 bg-gray-150 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 font-bold py-2 rounded text-xs transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default BloodDonation;
