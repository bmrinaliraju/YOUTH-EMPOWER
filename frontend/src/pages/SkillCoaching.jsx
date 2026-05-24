import React, { useState, useEffect } from 'react';
import { Book, Video, ExternalLink, ChevronRight, FileText, CheckCircle, Award, PlayCircle, Download, Check, Sparkles, HelpCircle } from 'lucide-react';

const SkillCoaching = () => {
  const [activeTab, setActiveTab] = useState('ssb');
  
  // Synced states with localStorage
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const saved = localStorage.getItem('coaching_enrolled');
    if (saved) return JSON.parse(saved);
    return [];
  });

  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('coaching_progress');
    if (saved) return JSON.parse(saved);
    return {};
  });

  const [completedResources, setCompletedResources] = useState(() => {
    const saved = localStorage.getItem('coaching_completed_resources');
    if (saved) return JSON.parse(saved);
    return {}; // { ssb: ['OIR Test Strategies', ...] }
  });

  const [showMockTest, setShowMockTest] = useState(false);
  const [showResultsReview, setShowResultsReview] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [mockTestScore, setMockTestScore] = useState(null);
  const [passedExams, setPassedExams] = useState(() => {
    const saved = localStorage.getItem('coaching_passed_exams');
    if (saved) return JSON.parse(saved);
    return [];
  });
  
  // Mock Exam Answers
  const [selectedAnswers, setSelectedAnswers] = useState({ q1: '', q2: '', q3: '' });
  const [isStudying, setIsStudying] = useState(false);

  useEffect(() => {
    setIsStudying(false);
  }, [activeTab]);

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
        { title: 'Join Indian Army Official', url: 'https://joinindianarmy.nic.in/' },
        { title: 'SSB Crack Tips', url: 'https://www.pw.live/defence/exams/how-to-prepare-for-ssb-interview-in-just-30-days' }
      ],
      pdfs: [
        { title: 'OIR Practice Set PDF', url: 'https://www.scribd.com/document/881255257/SSB-OIR-Test-Sample-Questions-with-Answers-2025' },
        { title: 'Psychology Test Workbook', url: 'https://www.scribd.com/document/582208978/SSB-Psychological-Test-Practice-ABHISHEK-LAL' }
      ],
      testQuestions: [
        { q: '1. What does SSB stand for in the context of the Indian Armed Forces?', options: ['Service Selection Board', 'Security Selection Bureau', 'Soldier Recruitment Board', 'Staff Service Bureau'], correct: 'Service Selection Board' },
        { q: '2. Which test is conducted on Day 1 (Screening)?', options: ['GTO Task', 'OIR & PPDT', 'Conference', 'TAT & WAT'], correct: 'OIR & PPDT' },
        { q: '3. What is the fundamental motto of the National Cadet Corps?', options: ['Unity and Discipline', 'Service Before Self', 'Valour and Faith', 'Touch the Sky with Glory'], correct: 'Unity and Discipline' }
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
        { title: 'UPSC Official Website', url: 'https://upsc.gov.in/' },
        { title: 'Mains PYQs by Subject', url: 'https://www.drishtiias.com/upsc-mains-solved-papers-subjectwise' }
      ],
      pdfs: [
        { title: 'UPSC Detailed Syllabus PDF', url: 'https://insightsonindia.com/wp-content/uploads/2013/07/upsc-syllabus.pdf' }
      ],
      testQuestions: [
        { q: '1. How many stages are there in the UPSC Civil Services Examination?', options: ['One', 'Two', 'Three', 'Four'], correct: 'Three' },
        { q: '2. Which article of the Constitution provides for the Union Public Service Commission?', options: ['Article 315', 'Article 280', 'Article 324', 'Article 370'], correct: 'Article 315' },
        { q: '3. What constitutes the Prelims stage?', options: ['GS & CSAT', 'Essay & Optional', 'General Studies only', 'Interview'], correct: 'GS & CSAT' }
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
        { title: 'NDA Official Notification', url: 'https://upsc.gov.in/sites/default/files/Notif-NDA-NA-I-2026-Engl-101225.pdf' },
        { title: 'NDA Preparation Strategy', url: 'https://chandigarhdefenceacademy.in/nda-aspirants-complete-guide-to-nda-preparation-ssb-interview-selection-journey/' }
      ],
      pdfs: [
        { title: 'NDA Math Formula Sheet', url: 'https://www.scribd.com/document/769122633/NDA-Mathematics-Formula-Booklet-2' },
        { title: 'GAT Vocabulary List', url: 'https://www.scribd.com/doc/89040039/Important-Vocabulary-and-Practice-for-GAT-General' }
      ],
      testQuestions: [
        { q: '1. NDA cadets are trained at which premier academy?', options: ['IMA Dehradun', 'NDA Khadakwasla', 'OTA Chennai', 'AFA Dundigal'], correct: 'NDA Khadakwasla' },
        { q: '2. The NDA exam consists of Mathematics and which other paper?', options: ['General Ability Test (GAT)', 'Technical Aptitude', 'Civil Services Aptitude', 'Military Strategy'], correct: 'General Ability Test (GAT)' },
        { q: '3. How often is the NDA written examination conducted in a year?', options: ['Once', 'Twice', 'Thrice', 'Four times'], correct: 'Twice' }
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
        { title: 'SSC Official Portal', url: 'https://ssc.gov.in/' },
        { title: 'SSC GD Mock Tests', url: 'https://testbook.com/ssc-gd-constable/test-series' }
      ],
      pdfs: [
        { title: 'SSC GD Previous Papers', url: 'https://www.adda247.com/jobs/ssc-gd-previous-year-question-papers/' },
        { title: 'GK & Current Affairs Capsule', url: 'https://www.gktoday.in/' }
      ],
      testQuestions: [
        { q: '1. What is the minimum educational qualification required for SSC GD Constable?', options: ['10th Standard Pass', '12th Standard Pass', 'Graduation', 'Post Graduation'], correct: '10th Standard Pass' },
        { q: '2. Which of the following is NOT a section in the SSC GD written exam?', options: ['General Intelligence & Reasoning', 'Elementary Mathematics', 'Advanced Astrophysics', 'General Knowledge & Awareness'], correct: 'Advanced Astrophysics' },
        { q: '3. What follows the written Computer Based Examination (CBE) in SSC GD?', options: ['Physical Standard Test & Physical Efficiency Test', 'Direct Selection interview', 'Personality Analysis Day', 'No other stage'], correct: 'Physical Standard Test & Physical Efficiency Test' }
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
        { title: 'State PSC Official Site', url: 'https://appsc.gov.in/' },
        { title: 'Group Exam Syllabus Details', url: 'https://appsc.gov.in/' }
      ],
      pdfs: [
        { title: 'State Economy Summary PDF', url: 'https://appsc.gov.in/' },
        { title: 'Important Schemes Document', url: 'https://pib.gov.in/' }
      ],
      testQuestions: [
        { q: '1. Group I examinations generally lead to recruitment of which officers?', options: ['Deputy Collectors / DSPs', 'Junior Assistants', 'Village Revenue Officers', 'Police Constables'], correct: 'Deputy Collectors / DSPs' },
        { q: '2. In state-level exams, which subject is given maximum weightage next to GS?', options: ['State Geography, History & Schemes', 'International Space Laws', 'European Union Politics', 'Advanced Bio-informatics'], correct: 'State Geography, History & Schemes' },
        { q: '3. Group exams are conducted by which state agency?', options: ['State Public Service Commission', 'Union Public Service Commission', 'Staff Selection Commission', 'State Education Board'], correct: 'State Public Service Commission' }
      ]
    }
  };

  const activeContent = contentData[activeTab];
  const isEnrolled = enrolledCourses.includes(activeTab);
  const currentProgress = progress[activeTab] || 0;

  // Sync back to local storage
  useEffect(() => {
    localStorage.setItem('coaching_enrolled', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  useEffect(() => {
    localStorage.setItem('coaching_progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('coaching_completed_resources', JSON.stringify(completedResources));
  }, [completedResources]);

  useEffect(() => {
    localStorage.setItem('coaching_passed_exams', JSON.stringify(passedExams));
  }, [passedExams]);

  const handleStartNow = () => {
    if (!isEnrolled) {
      setEnrolledCourses([...enrolledCourses, activeTab]);
    }
    setProgress({ ...progress, [activeTab]: 0 });
    setCompletedResources({ ...completedResources, [activeTab]: [] });
    setIsStudying(true);
  };

  const handleResumeNow = () => {
    setIsStudying(true);
  };

  const handleToggleResource = (title) => {
    const activeList = completedResources[activeTab] || [];
    let updatedList;
    if (activeList.includes(title)) {
      updatedList = activeList.filter(item => item !== title);
    } else {
      updatedList = [...activeList, title];
    }

    const newCompleted = {
      ...completedResources,
      [activeTab]: updatedList
    };
    setCompletedResources(newCompleted);

    // Calculate percentage dynamically
    const totalCount = (activeContent.videos?.length || 0) + (activeContent.pdfs?.length || 0) + (activeContent.links?.length || 0);
    const newPercent = totalCount > 0 ? Math.round((updatedList.length / totalCount) * 100) : 0;
    
    setProgress({
      ...progress,
      [activeTab]: newPercent
    });
  };

  const handleMockTestSubmit = (e) => {
    e.preventDefault();
    let scoreCount = 0;
    
    activeContent.testQuestions.forEach((q, idx) => {
      const selected = selectedAnswers[`q${idx + 1}`];
      if (selected === q.correct) {
        scoreCount += 1;
      }
    });

    const calculatedScore = Math.round((scoreCount / activeContent.testQuestions.length) * 100);
    setMockTestScore(calculatedScore);
    
    if (calculatedScore >= 50) {
      if (!passedExams.includes(activeTab)) {
        setPassedExams([...passedExams, activeTab]);
      }
    }
    
    setShowMockTest(false);
    setShowResultsReview(true);
  };

  const renderCertificate = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-yellow-250 dark:border-yellow-900/50 text-center relative overflow-hidden max-w-2xl mx-auto">
      <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-600"></div>
      <Award size={72} className="mx-auto text-yellow-500 mb-4 animate-bounce" />
      <h2 className="text-3xl font-serif font-bold text-gray-850 dark:text-white mb-2">Certificate of Excellence</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6 italic">This is to certify that the cadet has successfully mastered the</p>
      <h3 className="text-2xl font-bold text-[#0B3D91] dark:text-blue-400 mb-6">{activeContent.title} Curriculum</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-8 font-medium">Redeemed with a Mock Test Final Score of <span className="font-bold text-green-600 text-lg">{mockTestScore}%</span></p>
      
      <div className="flex justify-center space-x-4 print:hidden">
        <button 
          onClick={() => window.print()}
          className="inline-flex items-center px-6 py-3 bg-[#0B3D91] text-white font-bold rounded-lg hover:bg-blue-800 transition-colors shadow"
        >
          <Download className="mr-2" size={18} /> Download Certificate PDF
        </button>
        <button 
          onClick={() => {
            setShowCertificate(false);
            setSelectedAnswers({ q1: '', q2: '', q3: '' });
          }}
          className="px-5 py-3 bg-gray-100 hover:bg-gray-250 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg font-bold text-sm"
        >
          Study More
        </button>
      </div>
    </div>
  );

  const renderResultsReview = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-150 dark:border-gray-755 max-w-2xl mx-auto space-y-6">
      <div className="text-center pb-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-850 dark:text-white">Mock Test Results Overview</h2>
        <div className="mt-4 inline-flex items-center justify-center p-6 rounded-full bg-gray-50 dark:bg-gray-750 border-4 border-gray-100 dark:border-gray-700">
          <div className="text-center">
            <span className={`text-4xl font-extrabold ${mockTestScore >= 50 ? 'text-green-600' : 'text-red-650'}`}>{mockTestScore}%</span>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">Final Score</p>
          </div>
        </div>
        <p className="text-sm mt-3 font-semibold text-gray-700 dark:text-gray-300">
          {mockTestScore >= 50 
            ? "Congratulations! You have passed the examination and unlocked your certificate." 
            : "Unfortunately, you scored below the passing threshold of 50%. Please review the questions below and try again!"}
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Question Performance Review</h3>
        {activeContent.testQuestions.map((q, idx) => {
          const selected = selectedAnswers[`q${idx + 1}`];
          const isCorrect = selected === q.correct;
          return (
            <div key={idx} className={`p-4 rounded-lg border ${isCorrect ? 'bg-green-50/50 border-green-200 dark:bg-green-950/10 dark:border-green-800' : 'bg-red-50/50 border-red-200 dark:bg-red-950/10 dark:border-red-800'}`}>
              <p className="font-bold text-gray-850 dark:text-white mb-2 text-xs">{q.q}</p>
              <div className="space-y-1 text-xs">
                <p className="flex items-center">
                  <span className="font-medium text-gray-550 dark:text-gray-400 mr-1.5">Your Choice:</span>
                  <span className={`font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>{selected || 'Not answered'}</span>
                </p>
                {!isCorrect && (
                  <p className="flex items-center text-green-600">
                    <span className="font-medium text-gray-550 dark:text-gray-400 mr-1.5">Correct Answer:</span>
                    <span className="font-bold">{q.correct}</span>
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 pt-2">
        {mockTestScore >= 50 ? (
          <button 
            onClick={() => {
              setShowResultsReview(false);
              setShowCertificate(true);
            }}
            className="flex-1 py-3 bg-[#556B2F] hover:bg-[#435525] text-white font-extrabold rounded-lg transition-colors text-sm shadow flex items-center justify-center gap-1.5"
          >
            <Award size={16} />
            <span>Claim & View Certificate</span>
          </button>
        ) : (
          <button 
            onClick={() => {
              setShowResultsReview(false);
              setShowMockTest(true);
              setSelectedAnswers({ q1: '', q2: '', q3: '' });
            }}
            className="flex-1 py-3 bg-red-600 hover:bg-red-750 text-white font-extrabold rounded-lg transition-colors text-sm shadow"
          >
            Retake Mock Test
          </button>
        )}
        <button 
          onClick={() => {
            setShowResultsReview(false);
            setIsStudying(true);
          }}
          className="px-5 py-3 bg-gray-150 hover:bg-gray-250 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg font-bold text-sm"
        >
          Review Roadmap
        </button>
      </div>
    </div>
  );

  const renderMockTest = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-150 dark:border-gray-750 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-700 pb-3">
        <h2 className="text-xl font-bold text-[#0B3D91] dark:text-blue-400 flex items-center">
          <HelpCircle className="mr-2" /> {activeContent.title} Mock Examination
        </h2>
        <span className="text-xs bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded">Required: 50%</span>
      </div>

      <form onSubmit={handleMockTestSubmit} className="space-y-6">
        {activeContent.testQuestions.map((q, idx) => (
          <div key={idx} className="bg-gray-50/50 dark:bg-gray-750 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <p className="font-bold text-gray-800 dark:text-white mb-3 text-sm">{q.q}</p>
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <label key={i} className="flex items-center space-x-3 p-2 rounded hover:bg-white dark:hover:bg-gray-700 cursor-pointer border border-transparent hover:border-gray-200 transition-colors">
                  <input
                    type="radio"
                    required
                    name={`q${idx + 1}`}
                    value={opt}
                    checked={selectedAnswers[`q${idx + 1}`] === opt}
                    onChange={(e) => setSelectedAnswers({ ...selectedAnswers, [`q${idx + 1}`]: e.target.value })}
                    className="text-[#0B3D91] focus:ring-[#0B3D91]"
                  />
                  <span className="text-xs text-gray-700 dark:text-gray-300">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        
        <div className="flex space-x-3 pt-2">
          <button 
            type="submit"
            className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors text-sm shadow"
          >
            Submit Answers
          </button>
          <button 
            type="button"
            onClick={() => setShowMockTest(false)}
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg text-sm font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Skill Coaching</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Goal-oriented study modules for Competitive & Defence Preparations</p>
        </div>
      </div>

      {/* Course Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {categories.map((cat) => {
          const courseProgress = progress[cat.id] || 0;
          const started = enrolledCourses.includes(cat.id);
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                setShowMockTest(false);
                setShowCertificate(false);
              }}
              className={`p-4 rounded-xl font-bold text-center border-2 transition-all duration-200 shadow-sm relative flex flex-col items-center justify-center ${
                activeTab === cat.id
                  ? 'border-[#0B3D91] bg-blue-50/50 dark:bg-blue-900/20 text-[#0B3D91] dark:text-blue-300 scale-[1.02]'
                  : 'border-transparent bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-200'
              }`}
            >
              <span className="text-md">{cat.name}</span>
              {started && (
                <span className="text-[10px] text-green-600 dark:text-green-400 font-bold mt-1 bg-green-50 dark:bg-green-950 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle size={10} /> {courseProgress}%
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Work Area */}
        <div className="lg:col-span-2 space-y-6">
          {!isEnrolled ? (
            /* Welcome / Start Now Launcher View */
            <div className="bg-white dark:bg-gray-800 rounded-xl p-10 shadow-sm border border-gray-100 dark:border-gray-700 text-center space-y-6">
              <Book size={56} className="mx-auto text-blue-500 animate-pulse" />
              <div className="space-y-2">
                <h2 className="text-3xl font-extrabold text-gray-850 dark:text-white">{activeContent.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">{activeContent.description}</p>
              </div>
              
              <div className="bg-blue-50/30 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100/50 max-w-md mx-auto text-left space-y-2">
                <p className="text-xs font-bold text-[#0B3D91] uppercase tracking-wider">Preparation Roadmap Overview</p>
                <div className="grid grid-cols-1 gap-1">
                  {activeContent.roadmap.slice(0, 3).map((step, idx) => (
                    <div key={idx} className="flex items-center text-xs text-gray-700 dark:text-gray-300">
                      <ChevronRight size={14} className="text-blue-500 mr-1 shrink-0" /> {step}
                    </div>
                  ))}
                  {activeContent.roadmap.length > 3 && (
                    <p className="text-[10px] text-gray-500 italic pl-5">And {activeContent.roadmap.length - 3} more phases...</p>
                  )}
                </div>
              </div>

              <button 
                onClick={handleStartNow}
                className="px-8 py-3 bg-[#0B3D91] hover:bg-blue-800 text-white font-extrabold rounded-lg shadow-md hover:scale-[1.03] transition-transform text-md flex items-center justify-center mx-auto space-x-2"
              >
                <Sparkles size={18} />
                <span>Start Now</span>
              </button>
            </div>
          ) : !isStudying ? (
            /* Start Now / Resume Now Choice View */
            <div className="bg-white dark:bg-gray-800 rounded-xl p-10 shadow-sm border border-gray-100 dark:border-gray-700 text-center space-y-6">
              <Award size={56} className="mx-auto text-[#556B2F] animate-bounce" />
              <div className="space-y-2">
                <h2 className="text-3xl font-extrabold text-gray-850 dark:text-white">{activeContent.title}</h2>
                <p className="text-sm text-gray-650 dark:text-gray-305 max-w-xl mx-auto leading-relaxed">
                  {passedExams.includes(activeTab) 
                    ? "Congratulations! You have successfully completed this module." 
                    : "You are already enrolled in this module. Current progress: "}
                  {!passedExams.includes(activeTab) && <span className="font-extrabold text-green-600">{currentProgress}%</span>}
                </p>
              </div>

              {passedExams.includes(activeTab) ? (
                <div className="grid grid-cols-1 gap-4 max-w-md mx-auto pt-4">
                  <button
                    onClick={() => {
                      setIsStudying(true);
                      setShowCertificate(true);
                    }}
                    className="p-6 rounded-xl border-2 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/10 flex flex-col items-center justify-center text-center transition-all duration-200 hover:-translate-y-1 cursor-pointer"
                  >
                    <Award size={32} className="text-yellow-600 mb-2" />
                    <span className="font-extrabold text-yellow-700 dark:text-yellow-500 text-sm">View Certificate</span>
                    <span className="text-[10px] text-gray-500 mt-1">Download your completion certificate</span>
                  </button>
                  <button
                    onClick={handleResumeNow}
                    className="text-xs text-[#0B3D91] hover:underline pt-2"
                  >
                    Review Course Materials
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto pt-4">
                  <button
                    onClick={handleStartNow}
                    className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-750 flex flex-col items-center justify-center text-center transition-all duration-200 hover:-translate-y-1 hover:border-[#0B3D91] cursor-pointer"
                  >
                    <PlayCircle size={32} className="text-[#0B3D91] mb-2" />
                    <span className="font-extrabold text-[#0B3D91] text-sm">Start Now</span>
                    <span className="text-[10px] text-gray-500 mt-1">Reset progress & start new</span>
                  </button>
  
                  <button
                    onClick={handleResumeNow}
                    className="p-6 rounded-xl border-2 border-[#556B2F] bg-green-50/20 dark:bg-green-950/10 hover:bg-green-50/40 dark:hover:bg-green-950/25 flex flex-col items-center justify-center text-center transition-all duration-200 hover:-translate-y-1 cursor-pointer"
                  >
                    <Award size={32} className="text-[#556B2F] mb-2" />
                    <span className="font-extrabold text-[#556B2F] text-sm">Resume Now</span>
                    <span className="text-[10px] text-gray-500 mt-1">Continue from {currentProgress}% progress</span>
                  </button>
                </div>
              )}
            </div>
          ) : showCertificate ? (
            renderCertificate()
          ) : showResultsReview ? (
            renderResultsReview()
          ) : showMockTest ? (
            renderMockTest()
          ) : (
            /* Syllabus Details & Progress tracker once Enrolled */
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-gray-100 dark:border-gray-700 pb-4 gap-3">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#0B3D91] dark:text-blue-400">{activeContent.title}</h2>
                  <p className="text-xs text-gray-500">Track your tasks link-by-link to unlock the Mock Exam.</p>
                </div>
                
                {/* Exam Unlock Action */}
                {currentProgress === 100 ? (
                  <button 
                    onClick={() => {
                      setShowMockTest(true);
                      setSelectedAnswers({ q1: '', q2: '', q3: '' });
                    }}
                    className="px-4 py-2 bg-[#556B2F] text-white rounded-lg hover:bg-[#435525] transition-colors font-bold shadow flex items-center text-xs animate-bounce"
                  >
                    <PlayCircle size={16} className="mr-1.5" /> Unlock Mock Test
                  </button>
                ) : (
                  <div className="px-3 py-1 bg-yellow-50 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-400 rounded text-xs font-bold flex items-center border border-yellow-100/50">
                    🔒 Complete 100% resources to unlock Mock Test
                  </div>
                )}
              </div>

              {/* Progress Slider */}
              <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-gray-650 dark:text-gray-400">Preparation Progress</span>
                  <span className={currentProgress === 100 ? 'text-green-600 font-bold' : 'text-[#0B3D91]'}>{currentProgress}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ${currentProgress === 100 ? 'bg-green-600' : 'bg-gradient-to-r from-blue-600 to-[#0B3D91]'}`} 
                    style={{ width: `${currentProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Roadmap Phases */}
              <div>
                <h3 className="text-md font-bold flex items-center mb-4 text-gray-800 dark:text-white">
                  <Book className="mr-2 text-[#556B2F]" size={18} />
                  Syllabus Preparation Roadmap
                </h3>
                <div className="space-y-3 relative before:absolute before:inset-0 before:ml-4 before:h-full before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
                  {activeContent.roadmap.map((step, index) => (
                    <div key={index} className="relative flex items-start gap-4 pl-8">
                      <div className="absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full bg-[#0B3D91] border-2 border-white dark:border-gray-800 z-10"></div>
                      <div className="bg-gray-50/50 dark:bg-gray-750 p-3 rounded-lg border border-gray-100 dark:border-gray-650 flex-1 hover:shadow-sm transition-shadow">
                        <p className="text-xs font-bold text-gray-850 dark:text-gray-200">Phase {index + 1}: {step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar resource checklists (only visible once started) */}
        {isEnrolled && isStudying && !showCertificate && !showMockTest && (
          <div className="space-y-6">
            {/* Video checklist */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
              <h3 className="text-md font-bold flex items-center text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">
                <Video className="mr-2 text-red-500" size={18} />
                Video Lessons Checklist
              </h3>
              <div className="space-y-3">
                {activeContent.videos.map((vid, idx) => {
                  const completed = (completedResources[activeTab] || []).includes(vid.title);
                  return (
                    <div key={idx} className="flex items-start justify-between gap-3 p-3 bg-gray-50/50 dark:bg-gray-750 rounded border border-gray-100 dark:border-gray-700 hover:shadow-xs transition-shadow">
                      <div className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          checked={completed}
                          onChange={() => handleToggleResource(vid.title)}
                          className="mt-0.5 text-[#0B3D91] focus:ring-[#0B3D91] rounded border-gray-300 h-3.5 w-3.5"
                        />
                        <div>
                          <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{vid.title}</p>
                          <a href={vid.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-red-500 hover:underline inline-flex items-center mt-1">
                            Play Lesson Link <ExternalLink size={10} className="ml-1" />
                          </a>
                        </div>
                      </div>
                      {completed && <CheckCircle size={14} className="text-green-500 shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PDFs and platforms checklist */}
            <div className="bg-[#556B2F] rounded-xl p-5 text-white shadow-sm space-y-4">
              <h3 className="text-md font-bold flex items-center border-b border-white/20 pb-2">
                <ExternalLink className="mr-2" size={18} />
                Platform Links & PDFs
              </h3>
              
              {/* Platforms */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-green-200 uppercase tracking-widest block">Trusted educational sites</span>
                {activeContent.links.map((link, idx) => {
                  const completed = (completedResources[activeTab] || []).includes(link.title);
                  return (
                    <div key={idx} className="flex items-center justify-between p-2 bg-white/10 rounded hover:bg-white/15 transition-all text-xs">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={completed}
                          onChange={() => handleToggleResource(link.title)}
                          className="text-[#556B2F] focus:ring-[#556B2F] bg-transparent rounded border-white/40 h-3.5 w-3.5"
                        />
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">
                          {link.title}
                        </a>
                      </div>
                      {completed && <Check size={14} className="text-green-300" />}
                    </div>
                  );
                })}
              </div>

              {/* PDFs */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-[10px] font-bold text-green-200 uppercase tracking-widest block">Reference Workbooks (PDF)</span>
                {activeContent.pdfs.map((pdf, idx) => {
                  const completed = (completedResources[activeTab] || []).includes(pdf.title);
                  return (
                    <div key={idx} className="flex items-center justify-between p-2 bg-white/10 rounded hover:bg-white/15 transition-all text-xs">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={completed}
                          onChange={() => handleToggleResource(pdf.title)}
                          className="text-[#556B2F] focus:ring-[#556B2F] bg-transparent rounded border-white/40 h-3.5 w-3.5"
                        />
                        <a href={pdf.url} target="_blank" rel="noopener noreferrer" className="font-bold hover:underline inline-flex items-center">
                          <FileText size={12} className="mr-1.5 shrink-0" /> {pdf.title}
                        </a>
                      </div>
                      {completed && <Check size={14} className="text-green-300" />}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Resume Now status indicator */}
            <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100/50 dark:border-blue-900/30 rounded-xl p-4 text-center">
              <span className="text-[10px] font-bold text-[#0B3D91] dark:text-blue-300 uppercase tracking-wider block">Resume Now State</span>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">Your progress is locked in local storage. Exit or refresh safely, you can click "Resume Now" on category selection tabs anytime!</p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default SkillCoaching;
