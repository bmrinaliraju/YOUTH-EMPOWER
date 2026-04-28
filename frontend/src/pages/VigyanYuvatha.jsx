import React, { useState } from 'react';
import { Cpu, Video, ExternalLink, ChevronRight, FileText, Play } from 'lucide-react';

const VigyanYuvatha = () => {
  const [activeTab, setActiveTab] = useState('robotics');

  const categories = [
    { id: 'robotics', name: 'Robotics' },
    { id: 'avionics', name: 'Avionics' },
    { id: 'ai_ml', name: 'AI/ML' },
    { id: 'space_tech', name: 'Space Tech' }
  ];

  const contentData = {
    robotics: {
      title: 'Robotics & Automation',
      description: 'Learn the fundamentals of robotics, microcontrollers, and automation systems.',
      roadmap: [
        'Electronics & Circuit Basics',
        'Microcontrollers (Arduino/Raspberry Pi)',
        'Sensors, Actuators & Motor Control',
        'Kinematics & Robot Operating System (ROS)',
        'Building a functional prototype'
      ],
      youtubeChannels: [
        { name: 'DroneBot Workshop', url: '#' },
        { name: 'How To Mechatronics', url: '#' },
        { name: 'Kevin McAleer (ROS & Robotics)', url: '#' },
        { name: 'GreatScott!', url: '#' },
        { name: 'James Bruton', url: '#' }
      ],
      links: [
        { title: 'Arduino Official Documentation', url: '#' },
        { title: 'ROS Tutorials', url: '#' }
      ],
      pdfs: [
        { title: 'Robotics Fundamentals PDF', url: '#' },
        { title: 'Basic Arduino Programming Guide', url: '#' }
      ]
    },
    avionics: {
      title: 'Avionics & Aerospace Engineering',
      description: 'Explore the electronic systems used on aircraft, artificial satellites, and spacecraft.',
      roadmap: [
        'Aerodynamics Basics & Flight Mechanics',
        'Aircraft Instrumentation',
        'Navigation & Communication Systems',
        'Flight Control Systems',
        'Unmanned Aerial Vehicles (UAVs)'
      ],
      youtubeChannels: [
        { name: 'Real Engineering', url: '#' },
        { name: 'AgentJayZ', url: '#' },
        { name: 'Mentour Pilot', url: '#' },
        { name: 'Aviation Theory', url: '#' },
        { name: 'Wendover Productions', url: '#' }
      ],
      links: [
        { title: 'FAA Aviation Handbooks', url: '#' },
        { title: 'NASA Aeronautics Educator Guide', url: '#' }
      ],
      pdfs: [
        { title: 'Intro to Avionics Systems PDF', url: '#' },
        { title: 'Drone Building Blueprint', url: '#' }
      ]
    },
    ai_ml: {
      title: 'Artificial Intelligence & Machine Learning',
      description: 'Master data analysis, predictive modeling, and intelligent systems.',
      roadmap: [
        'Python Programming & Math (Linear Algebra/Stats)',
        'Data Analysis (Pandas, NumPy)',
        'Machine Learning Algorithms (Scikit-Learn)',
        'Deep Learning (TensorFlow/PyTorch)',
        'Deploying AI Models (Computer Vision/NLP)'
      ],
      youtubeChannels: [
        { name: 'StatQuest with Josh Starmer', url: '#' },
        { name: 'Sentdex', url: '#' },
        { name: 'Lex Fridman', url: '#' },
        { name: 'Andrej Karpathy', url: '#' },
        { name: 'Corey Schafer', url: '#' }
      ],
      links: [
        { title: 'Kaggle Datasets & Courses', url: '#' },
        { title: 'Google Machine Learning Crash Course', url: '#' }
      ],
      pdfs: [
        { title: '100 Page ML Book Summary', url: '#' },
        { title: 'Deep Learning Cheatsheet', url: '#' }
      ]
    },
    space_tech: {
      title: 'Space Technology',
      description: 'Dive into space exploration, satellite technology, and astrophysics.',
      roadmap: [
        'Basics of Astrophysics & Orbital Mechanics',
        'Rocket Propulsion Systems',
        'Satellite Design & Subsystems',
        'Space Environment & Constraints',
        'Current ISRO/NASA Missions'
      ],
      youtubeChannels: [
        { name: 'Everyday Astronaut', url: '#' },
        { name: 'Scott Manley', url: '#' },
        { name: 'Kurzgesagt – In a Nutshell', url: '#' },
        { name: 'Isaac Arthur', url: '#' },
        { name: 'Garettios (ISRO Updates)', url: '#' }
      ],
      links: [
        { title: 'ISRO Student Portal', url: '#' },
        { title: 'NASA STEM Engagement', url: '#' }
      ],
      pdfs: [
        { title: 'Basics of Orbital Mechanics', url: '#' },
        { title: 'Satellite Engineering Guide', url: '#' }
      ]
    }
  };

  const activeContent = contentData[activeTab];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Vigyan Yuvatha</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Explore advanced technologies and futuristic skills</p>
        </div>
      </div>

      {/* Categories as Rectangle Boxes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`p-4 rounded-xl font-bold text-center border-2 transition-all duration-200 shadow-sm ${
              activeTab === cat.id
                ? 'border-[#0B3D91] bg-blue-50 dark:bg-blue-900/30 text-[#0B3D91] dark:text-blue-300 scale-105'
                : 'border-transparent bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 hover:shadow-md'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content Area: Roadmap & YouTube Channels */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-[#0B3D91] dark:text-blue-400 mb-2">{activeContent.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{activeContent.description}</p>
            
            <h3 className="text-lg font-semibold flex items-center mb-4 text-gray-800 dark:text-white">
              <Cpu className="mr-2 text-[#556B2F]" size={20} />
              Structured Preparation Roadmap
            </h3>
            
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent mb-8">
              {activeContent.roadmap.map((step, index) => (
                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-white dark:border-gray-800 bg-[#0B3D91] text-white font-bold text-xs shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    {index + 1}
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 shadow-sm">
                    <p className="font-medium text-gray-800 dark:text-gray-200">{step}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold flex items-center mb-4 text-gray-800 dark:text-white">
              <Play className="mr-2 text-red-500" size={20} />
              Top 5 YouTube Channels
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeContent.youtubeChannels.map((channel, idx) => (
                <a key={idx} href={channel.url} target="_blank" rel="noopener noreferrer" className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center text-red-500 mr-3 group-hover:bg-red-500 group-hover:text-white transition-colors">
                    {idx + 1}
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{channel.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Resources */}
        <div className="space-y-6">
          {/* Useful Links & PDFs */}
          <div className="bg-[#556B2F] rounded-xl p-6 text-white shadow-sm">
            <h3 className="text-lg font-semibold flex items-center mb-4">
              <ExternalLink className="mr-2" size={20} />
              Curated Links & PDFs
            </h3>
            
            <div className="mb-4">
              <h4 className="text-sm text-green-200 font-semibold mb-2 uppercase tracking-wider">Trusted Platforms</h4>
              <ul className="space-y-2">
                {activeContent.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline text-sm font-medium">
                      <ChevronRight size={16} className="mr-1" /> {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm text-green-200 font-semibold mb-2 uppercase tracking-wider">PDF Resources</h4>
              <ul className="space-y-2">
                {activeContent.pdfs.map((pdf, i) => (
                  <li key={i}>
                    <a href={pdf.url} target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline text-sm font-medium bg-white/10 p-2 rounded-md hover:bg-white/20 transition-colors">
                      <FileText size={16} className="mr-2" /> {pdf.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VigyanYuvatha;
