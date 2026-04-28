import React, { useState } from 'react';
import { Heart, Search, Bell, Activity, MapPin, UserPlus, Building, AlertCircle, Send } from 'lucide-react';

const BloodDonation = () => {
  const [role, setRole] = useState(null); // 'donor', 'bank', 'receiver'
  const [notification, setNotification] = useState('');

  // Forms states
  const [donorForm, setDonorForm] = useState({ group: 'A+', location: '', timesDonated: 0, lastDonation: '' });
  const [bankForm, setBankForm] = useState({ group: 'A+', location: '', units: 0, lastUpdated: '' });
  const [receiverForm, setReceiverForm] = useState({ group: 'O-', location: '', unitsNeeded: 1, urgency: 'High' });

  const handleReceiverRequest = (e) => {
    e.preventDefault();
    setNotification('Request submitted! Nearby Blood Banks and Donors have been notified via SMS and App Alerts.');
    setTimeout(() => setNotification(''), 5000);
  };

  const handleDonorRegister = (e) => {
    e.preventDefault();
    setNotification('Successfully registered as a Donor. Thank you for your service!');
    setTimeout(() => setNotification(''), 5000);
  };

  const handleBankUpdate = (e) => {
    e.preventDefault();
    setNotification('Blood Bank inventory updated successfully.');
    setTimeout(() => setNotification(''), 5000);
  };

  if (!role) {
    return (
      <div className="space-y-8 animate-fade-in text-center max-w-4xl mx-auto pt-10">
        <h1 className="text-4xl font-bold text-[#0B3D91] dark:text-blue-400">Blood Donation Portal</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">Save a life. Donate blood. Please select your role below to continue.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <button onClick={() => setRole('donor')} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:scale-105 transition-all border-2 border-transparent hover:border-red-500 group">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 text-red-500 mx-auto rounded-full flex items-center justify-center mb-6 group-hover:bg-red-500 group-hover:text-white transition-colors">
              <Heart size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">I am a Donor</h2>
            <p className="text-gray-500 dark:text-gray-400">Register to donate blood and help those in need in your area.</p>
          </button>

          <button onClick={() => setRole('bank')} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:scale-105 transition-all border-2 border-transparent hover:border-blue-500 group">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 text-blue-500 mx-auto rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <Building size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Blood Bank</h2>
            <p className="text-gray-500 dark:text-gray-400">Manage your inventory and fulfill urgent blood requests.</p>
          </button>

          <button onClick={() => setRole('receiver')} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:scale-105 transition-all border-2 border-transparent hover:border-yellow-500 group">
            <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-500 mx-auto rounded-full flex items-center justify-center mb-6 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
              <AlertCircle size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">I need Blood (Receiver)</h2>
            <p className="text-gray-500 dark:text-gray-400">Request urgent blood supply and notify nearby banks and donors.</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
            {role === 'donor' && <><Heart className="mr-3 text-red-500" /> Donor Portal</>}
            {role === 'bank' && <><Building className="mr-3 text-blue-500" /> Blood Bank Portal</>}
            {role === 'receiver' && <><AlertCircle className="mr-3 text-yellow-500" /> Receiver Portal</>}
          </h1>
        </div>
        <button onClick={() => setRole(null)} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
          Change Role
        </button>
      </div>

      {notification && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-sm animate-pulse flex items-center">
          <Activity className="mr-2" /> {notification}
        </div>
      )}

      {/* DONOR VIEW */}
      {role === 'donor' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Register / Update Profile</h2>
            <form onSubmit={handleDonorRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Blood Group</label>
                  <select value={donorForm.group} onChange={(e) => setDonorForm({...donorForm, group: e.target.value})} className="w-full rounded-md border-gray-300 py-2 px-3 border dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(bg => <option key={bg}>{bg}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location / Pincode</label>
                  <input required type="text" value={donorForm.location} onChange={(e) => setDonorForm({...donorForm, location: e.target.value})} className="w-full rounded-md border-gray-300 py-2 px-3 border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Times Donated</label>
                  <input type="number" min="0" value={donorForm.timesDonated} onChange={(e) => setDonorForm({...donorForm, timesDonated: e.target.value})} className="w-full rounded-md border-gray-300 py-2 px-3 border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Donation Date</label>
                  <input type="date" value={donorForm.lastDonation} onChange={(e) => setDonorForm({...donorForm, lastDonation: e.target.value})} className="w-full rounded-md border-gray-300 py-2 px-3 border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
              </div>
              <button type="submit" className="w-full mt-4 bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700">Save Profile</button>
            </form>
          </div>
          <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-100 dark:border-red-900/30">
             <h2 className="text-xl font-bold mb-4 text-red-800 dark:text-red-400 flex items-center"><Bell className="mr-2"/> Urgent Requests Near You</h2>
             <div className="space-y-3">
               <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                 <h3 className="font-bold text-lg text-gray-800 dark:text-white">O- Needed URGENTLY</h3>
                 <p className="text-sm text-gray-600 dark:text-gray-400"><MapPin size={12} className="inline mr-1"/> City Hospital (2km away)</p>
                 <button className="mt-2 text-sm bg-red-100 text-red-600 px-3 py-1 rounded font-bold">Accept Request</button>
               </div>
             </div>
          </div>
        </div>
      )}

      {/* BANK VIEW */}
      {role === 'bank' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Update Inventory</h2>
            <form onSubmit={handleBankUpdate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Blood Group</label>
                  <select value={bankForm.group} onChange={(e) => setBankForm({...bankForm, group: e.target.value})} className="w-full rounded-md border-gray-300 py-2 px-3 border dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(bg => <option key={bg}>{bg}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location / Pincode</label>
                  <input required type="text" value={bankForm.location} onChange={(e) => setBankForm({...bankForm, location: e.target.value})} className="w-full rounded-md border-gray-300 py-2 px-3 border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Available Units</label>
                  <input type="number" min="0" value={bankForm.units} onChange={(e) => setBankForm({...bankForm, units: e.target.value})} className="w-full rounded-md border-gray-300 py-2 px-3 border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Updated</label>
                  <input type="date" value={bankForm.lastUpdated} onChange={(e) => setBankForm({...bankForm, lastUpdated: e.target.value})} className="w-full rounded-md border-gray-300 py-2 px-3 border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
              </div>
              <button type="submit" className="w-full mt-4 bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700">Update Inventory</button>
            </form>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-900/30">
            <h2 className="text-xl font-bold mb-4 text-[#0B3D91] dark:text-blue-400">Current Inventory Overview</h2>
            <div className="grid grid-cols-4 gap-2 text-center">
              {['A+', 'B+', 'O+', 'AB+'].map(bg => (
                <div key={bg} className="bg-white dark:bg-gray-800 p-2 rounded shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="font-bold text-lg text-gray-800 dark:text-white">{bg}</div>
                  <div className="text-blue-600 font-bold">
                    {bg === bankForm.group && bankForm.units > 0 ? bankForm.units : 12} Units
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RECEIVER VIEW */}
      {role === 'receiver' && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
            <AlertCircle className="mr-2 text-red-500" /> Request Blood
          </h2>
          <form onSubmit={handleReceiverRequest} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Blood Group Needed</label>
                <select value={receiverForm.group} onChange={(e) => setReceiverForm({...receiverForm, group: e.target.value})} className="w-full rounded-md border-gray-300 py-2 px-3 border dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:border-yellow-500 focus:ring-yellow-500">
                  {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(bg => <option key={bg}>{bg}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Units Needed</label>
                <input type="number" min="1" required value={receiverForm.unitsNeeded} onChange={(e) => setReceiverForm({...receiverForm, unitsNeeded: e.target.value})} className="w-full rounded-md border-gray-300 py-2 px-3 border dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:border-yellow-500 focus:ring-yellow-500" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location / Hospital Name</label>
                <input type="text" required value={receiverForm.location} onChange={(e) => setReceiverForm({...receiverForm, location: e.target.value})} className="w-full rounded-md border-gray-300 py-2 px-3 border dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:border-yellow-500 focus:ring-yellow-500" placeholder="E.g., City Hospital, Ward 3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Urgency</label>
                <select value={receiverForm.urgency} onChange={(e) => setReceiverForm({...receiverForm, urgency: e.target.value})} className="w-full rounded-md border-gray-300 py-2 px-3 border dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:border-yellow-500 focus:ring-yellow-500">
                  <option>Critical (Within 2 hrs)</option>
                  <option>High (Today)</option>
                  <option>Moderate (Within 24 hrs)</option>
                </select>
              </div>
            </div>

            <button type="submit" className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-red-600 hover:bg-red-700 focus:outline-none transition-colors">
              <Send size={20} className="mr-2" /> Request & Notify Nearby Banks
            </button>
            <p className="text-xs text-center text-gray-500 mt-4">
              By submitting this request, nearby Blood Banks and registered donors will receive an immediate notification alert.
            </p>
          </form>
        </div>
      )}

    </div>
  );
};

export default BloodDonation;
