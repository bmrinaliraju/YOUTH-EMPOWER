import React, { useState } from 'react';
import { Book, Video, ExternalLink, ChevronRight, FileText } from 'lucide-react';

const SkillCoaching = () => {
  const [activeTab, setActiveTab] = useState('ssb');

  const categories = [
    { id: 'ssb', name: 'SSB' },
    { id: 'upsc', name: 'UPSC' },
    { id: 'nda', name: 'NDA' },
    { id: 'ssc_gd', name: 'SSC GD' },
    { id: 'groups', name: 'GROUPS' }
  ];

  const contentData = {
    ssb: {
      title: 'SSB Interview Preparation',
      description: 'Master the 5-day Service Selection Board interview process with structured guidance.',
      roadmap: [
        'Screening Test (OIR & PPDT)',
        'Psychological Tests (TAT, WAT, SRT, SD)',
        'GTO Tasks (Group Discussion, PGT, HGT, Command Task)',
        'Personal Interview',
        'Conference Day'
      ],
      videos: [
        { title: 'OIR Test Strategies', url: 'https://youtu.be/fBo2ukXMEPw?si=7aPLmP6Tf4C9T967' },
        { title: 'Mastering PPDT Narration', url: 'https://youtu.be/bsZ88UXb8k8?si=Eij_YhYY2Iuoz819' }
      ],
      links: [
        { title: 'Join Indian Army Official', url: '#' },
        { title: 'SSB Crack Tips', url: '#' }
      ],
      pdfs: [
        { title: 'OIR Practice Set PDF', url: '#' },
        { title: 'Psychology Test Workbook', url: '#' }
      ]
    },
    upsc: {
      title: 'UPSC Civil Services',
      description: 'Comprehensive study plan for UPSC Prelims and Mains.',
      roadmap: [
        'Understand Syllabus & Exam Pattern',
        'NCERT Basics & Current Affairs',
        'Standard Reference Books',
        'Optional Subject Preparation',
        'Mock Tests & Answer Writing'
      ],
      videos: [
        { title: 'How to start UPSC Prep', url: 'https://youtu.be/O3214OVS1NM?si=gPlmRAdMmkFcEudN' },
        { title: 'Current Affairs Analysis', url: 'https://youtu.be/bohG3BpNK5A?si=op8dQko7XmLXgxQQ' }
      ],
      links: [
        { title: 'UPSC Official Website', url: '#' },
        { title: 'Vision IAS Resources', url: '#' }
      ],
      pdfs: [
        { title: 'UPSC Detailed Syllabus PDF', url: '#' },
        { title: 'Previous Year Question Papers', url: '#' }
      ]
    },
    nda: {
      title: 'NDA & NA Examination',
      description: 'Study plan for Mathematics and General Ability Test.',
      roadmap: [
        'Mathematics: Algebra & Trigonometry',
        'Mathematics: Calculus & Statistics',
        'GAT: English Proficiency',
        'GAT: General Sciences',
        'GAT: History & Geography'
      ],
      videos: [
        { title: 'NDA Math Shortcuts', url: 'https://youtu.be/XiE2TYIRXfY?si=3Nwl5HEbRkTUnrwW' },
        { title: 'GAT English Preparation', url: 'https://youtu.be/tuyk2-1ZmXU?si=COFX_lVYIab2B1qo' }
      ],
      links: [
        { title: 'NDA Notification Info', url: '#' },
        { title: 'NDA Preparation Strategy', url: '#' }
      ],
      pdfs: [
        { title: 'NDA Math Formula Sheet', url: '#' },
        { title: 'GAT Vocabulary List', url: '#' }
      ]
    },
    ssc_gd: {
      title: 'SSC GD Constable',
      description: 'Preparation path for SSC General Duty examinations.',
      roadmap: [
        'General Intelligence & Reasoning',
        'General Knowledge & Awareness',
        'Elementary Mathematics',
        'English/Hindi Language',
        'Physical Efficiency Test (PET) Prep'
      ],
      videos: [
        { title: 'SSC GD Reasoning Tricks', url: 'https://www.youtube.com/live/EdButB8cIXk?si=jwvI_z3e2Rgl3NUE' },
        { title: 'Maths Fast Calculation', url: 'https://youtu.be/2ZT_FkMDm-o?si=vmg1S1ZAt5xj-fFF' }
      ],
      links: [
        { title: 'SSC Official Portal', url: '#' },
        { title: 'SSC GD Mock Tests', url: '#' }
      ],
      pdfs: [
        { title: 'SSC GD Previous Papers', url: '#' },
        { title: 'GK & Current Affairs Capsule', url: '#' }
      ]
    },
    groups: {
      title: 'State Public Service Groups (I/II/III/IV)',
      description: 'A unified approach for state-level group examinations.',
      roadmap: [
        'State History, Culture & Geography',
        'Indian Polity & Economy',
        'General Science & Mental Ability',
        'Current Affairs (State & National)',
        'Mains Answer Writing (For Group I)'
      ],
      videos: [
        { title: 'State History Crash Course', url: 'https://www.youtube.com/live/4ONdj-0qouo?si=3ZXXrqgAYE3PmFws' },
        { title: 'Polity Important Articles', url: 'https://youtu.be/gXhdno374Og?si=-Y3nP2rg3NixyW3a' }
      ],
      links: [
        { title: 'State PSC Official Site', url: '#' },
        { title: 'Group Exam Syllabus Details', url: '#' }
      ],
      pdfs: [
        { title: 'State Economy Summary PDF', url: '#' },
        { title: 'Important Schemes Document', url: '#' }
      ]
    }
  };

  const activeContent = contentData[activeTab];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Skill Coaching</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Goal-based learning paths for defence and civil services</p>
        </div>
      </div>

      {/* Categories as Rectangle Boxes */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
        
        {/* Main Content Area: Roadmap */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-[#0B3D91] dark:text-blue-400 mb-2">{activeContent.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{activeContent.description}</p>
            
            <h3 className="text-lg font-semibold flex items-center mb-4 text-gray-800 dark:text-white">
              <Book className="mr-2 text-[#556B2F]" size={20} />
              Structured Preparation Roadmap
            </h3>
            
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
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
          </div>
        </div>

        {/* Sidebar Resources */}
        <div className="space-y-6">
          {/* Video Resources */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold flex items-center mb-4 text-gray-800 dark:text-white">
              <Video className="mr-2 text-red-500" size={20} />
              Video Links
            </h3>
            <div className="space-y-4">
              {activeContent.videos.map((vid, i) => (
                <a key={i} href={vid.url} target="_blank" rel="noopener noreferrer" className="group cursor-pointer block">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 mb-2">
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-40 group-hover:bg-opacity-20 transition-all">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <ChevronRight size={24} />
                      </div>
                    </div>
                  </div>
                  <p className="font-medium text-sm text-gray-800 dark:text-gray-200 group-hover:text-[#0B3D91] dark:group-hover:text-blue-400 transition-colors">{vid.title}</p>
                </a>
              ))}
            </div>
          </div>

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

export default SkillCoaching;
