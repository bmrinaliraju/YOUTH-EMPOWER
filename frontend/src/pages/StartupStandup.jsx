import React, { useState } from 'react';
import { Lightbulb, ThumbsUp, CheckCircle, Award, BookOpen, Send } from 'lucide-react';

const StartupStandup = () => {
  const [isAdmin, setIsAdmin] = useState(false); // Toggle for demo purposes
  const [ideas, setIdeas] = useState([
    { id: 1, title: 'Drone-based Local Delivery', description: 'Using automated drones to deliver medical supplies to remote NCC camps.', author: 'Cadet Rahul', upvotes: 124, approved: true, funded: false },
    { id: 2, title: 'AI Driven Training Analytics', description: 'Platform to track cadet fitness and target practice using computer vision.', author: 'Cadet Priya', upvotes: 89, approved: true, funded: true },
    { id: 3, title: 'Smart Uniform Embedded Sensors', description: 'Monitoring heart rate and hydration levels during extreme weather drills.', author: 'Cadet Amit', upvotes: 45, approved: false, funded: false },
  ]);

  const [newIdea, setNewIdea] = useState({ title: '', description: '' });

  const handleUpvote = (id) => {
    setIdeas(ideas.map(idea => idea.id === id ? { ...idea, upvotes: idea.upvotes + 1 } : idea));
  };

  const handleApprove = (id) => {
    setIdeas(ideas.map(idea => idea.id === id ? { ...idea, approved: true } : idea));
  };

  const handleFund = (id) => {
    setIdeas(ideas.map(idea => idea.id === id ? { ...idea, funded: true } : idea));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newIdea.title && newIdea.description) {
      setIdeas([{
        id: ideas.length + 1,
        title: newIdea.title,
        description: newIdea.description,
        author: 'Current User',
        upvotes: 0,
        approved: false,
        funded: false
      }, ...ideas]);
      setNewIdea({ title: '', description: '' });
    }
  };

  const topIdeas = [...ideas].filter(i => i.approved).sort((a, b) => b.upvotes - a.upvotes);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Startup / Standup Platform</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Submit, explore, and fund innovative ideas</p>
        </div>
        <button 
          onClick={() => setIsAdmin(!isAdmin)}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${isAdmin ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          {isAdmin ? 'Admin View: ON' : 'Switch to Admin View'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Submit Idea & Guidance */}
        <div className="space-y-6">
          {/* Submit Idea */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold flex items-center mb-4 text-gray-800 dark:text-white">
              <Lightbulb className="mr-2 text-yellow-500" size={20} />
              Submit Your Startup Idea
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Idea Title</label>
                <input 
                  type="text" 
                  required
                  value={newIdea.title}
                  onChange={(e) => setNewIdea({...newIdea, title: e.target.value})}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B3D91] focus:ring-[#0B3D91] dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm py-2 px-3 border"
                  placeholder="E.g., Smart Uniforms"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description (Text only)</label>
                <textarea 
                  required
                  rows={4}
                  value={newIdea.description}
                  onChange={(e) => setNewIdea({...newIdea, description: e.target.value})}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B3D91] focus:ring-[#0B3D91] dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm py-2 px-3 border"
                  placeholder="Describe the problem and your solution..."
                />
              </div>
              <button type="submit" className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0B3D91] hover:bg-[#092e6e] transition-colors">
                <Send size={16} className="mr-2" /> Submit Idea
              </button>
            </form>
          </div>

          {/* Startup Guidance */}
          <div className="bg-[#556B2F] text-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold flex items-center mb-4">
              <BookOpen className="mr-2" size={20} />
              Startup Guidance
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <CheckCircle size={16} className="mr-2 mt-0.5 text-green-300 flex-shrink-0" />
                <span><strong>Business Plan:</strong> Start with the problem, market size, and your unique solution.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle size={16} className="mr-2 mt-0.5 text-green-300 flex-shrink-0" />
                <span><strong>Marketing:</strong> Identify your target audience and the best channels to reach them.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle size={16} className="mr-2 mt-0.5 text-green-300 flex-shrink-0" />
                <span><strong>Funding:</strong> Understand bootstrap, angel investors, and venture capital stages.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Ideas Feed & Top Ideas */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Top Ideas Section */}
          <div className="bg-gradient-to-r from-[#0B3D91] to-blue-800 rounded-xl p-6 shadow-sm text-white">
            <h3 className="text-lg font-semibold flex items-center mb-4">
              <Award className="mr-2 text-yellow-400" size={24} />
              Top Funded & Approved Ideas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topIdeas.slice(0, 2).map(idea => (
                <div key={idea.id} className="bg-white/10 p-4 rounded-lg border border-white/20 backdrop-blur-sm">
                  <h4 className="font-bold text-lg leading-tight mb-1">{idea.title}</h4>
                  <p className="text-sm text-blue-100 mb-3 line-clamp-2">{idea.description}</p>
                  <div className="flex justify-between items-center text-xs font-medium">
                    <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded flex items-center">
                      <ThumbsUp size={12} className="mr-1" /> {idea.upvotes}
                    </span>
                    {idea.funded && <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded">Funded</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Ideas Feed */}
          <h3 className="text-xl font-bold text-gray-800 dark:text-white pt-2">Recent Submissions</h3>
          <div className="space-y-4">
            {ideas.map((idea) => (
              <div key={idea.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg text-[#0B3D91] dark:text-blue-400">{idea.title}</h4>
                  <div className="flex space-x-2">
                    {idea.approved ? (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Approved</span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">Pending Review</span>
                    )}
                    {idea.funded && (
                      <span className="bg-blue-100 text-[#0B3D91] text-xs px-2 py-1 rounded-full font-medium border border-[#0B3D91]/20">Funded</span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Submitted by: {idea.author}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{idea.description}</p>
                
                <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
                  <button 
                    onClick={() => handleUpvote(idea.id)}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-[#0B3D91] dark:hover:text-blue-400 transition-colors"
                  >
                    <ThumbsUp size={18} className="mr-1.5" /> 
                    <span className="font-medium">{idea.upvotes} Upvotes</span>
                  </button>
                  
                  {/* Admin Controls */}
                  {isAdmin && (
                    <div className="flex space-x-2">
                      {!idea.approved && (
                        <button onClick={() => handleApprove(idea.id)} className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors">
                          Approve
                        </button>
                      )}
                      {idea.approved && !idea.funded && (
                        <button onClick={() => handleFund(idea.id)} className="text-xs bg-[#0B3D91] hover:bg-blue-800 text-white px-3 py-1 rounded transition-colors">
                          Mark Funded
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default StartupStandup;
