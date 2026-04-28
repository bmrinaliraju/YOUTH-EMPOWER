import React, { useState } from 'react';
import { Globe, Shield, Activity, Calendar, ExternalLink } from 'lucide-react';

const CurrentAffairs = () => {
  const [activeTab, setActiveTab] = useState('daily');

  const categories = [
    { id: 'daily', name: 'Daily Updates' },
    { id: 'defence', name: 'Defence Updates' },
    { id: 'international', name: 'International Relations' }
  ];

  const newsData = {
    daily: [
      { id: 1, title: 'National Youth Festival Announced', summary: 'The Government has announced the dates for the upcoming National Youth Festival focusing on skill development.', date: 'Today, 09:00 AM', source: 'PIB' },
      { id: 2, title: 'New Education Policy Implementation Update', summary: 'Several states have fully adopted the NEP guidelines for higher education institutes.', date: 'Yesterday', source: 'The Hindu' },
    ],
    defence: [
      { id: 3, title: 'Indigenous Aircraft Carrier Sea Trials', summary: 'The new indigenous aircraft carrier has successfully completed its third phase of sea trials.', date: 'Today, 11:30 AM', source: 'Ministry of Defence' },
      { id: 4, title: 'Joint Military Exercise "Maitree"', summary: 'Indian Army and Royal Thai Army begin joint military exercise focusing on counter-terrorism.', date: 'Yesterday', source: 'ANI' },
      { id: 5, title: 'DRDO Tests New Missile System', summary: 'A successful test flight of the new surface-to-air missile was conducted off the coast of Odisha.', date: '2 days ago', source: 'DRDO' }
    ],
    international: [
      { id: 6, title: 'G20 Summit Key Takeaways', summary: 'Leaders agreed on a joint declaration focusing on climate finance and digital public infrastructure.', date: 'Today, 08:15 AM', source: 'Reuters' },
      { id: 7, title: 'Bilateral Talks with Japan', summary: 'India and Japan signed MoUs regarding semiconductor manufacturing and cybersecurity cooperation.', date: '3 days ago', source: 'MEA' }
    ]
  };

  const activeNews = newsData[activeTab] || [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Current Affairs & Geopolitics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Simple, curated summaries for NCC Cadets</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Sidebar: Categories */}
        <div className="lg:col-span-1 space-y-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3 px-2">Categories</h3>
            <nav className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg font-medium transition-colors flex items-center ${
                    activeTab === cat.id
                      ? 'bg-[#0B3D91] text-white shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat.id === 'daily' && <Activity size={18} className="mr-2" />}
                  {cat.id === 'defence' && <Shield size={18} className="mr-2" />}
                  {cat.id === 'international' && <Globe size={18} className="mr-2" />}
                  {cat.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content Area: News Cards */}
        <div className="lg:col-span-3 space-y-4">
          {activeNews.map(news => (
            <div key={news.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-xl text-[#0B3D91] dark:text-blue-400 leading-tight">
                  {news.title}
                </h3>
                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded font-medium whitespace-nowrap ml-4">
                  {news.source}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 mt-2">
                {news.summary}
              </p>
              <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-700 pt-3">
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 font-medium">
                  <Calendar size={14} className="mr-1.5" />
                  {news.date}
                </div>
                <button 
                  onClick={() => alert(`Opening full article: "${news.title}"`)}
                  className="flex items-center text-sm font-medium text-[#556B2F] hover:text-[#435525] dark:text-green-400 transition-colors"
                >
                  Read Full Article <ExternalLink size={14} className="ml-1" />
                </button>
              </div>
            </div>
          ))}
          {activeNews.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">No updates available in this category.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CurrentAffairs;
