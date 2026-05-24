import React, { useState, useEffect } from 'react';
import { Cpu, ExternalLink, ChevronRight, FileText, CheckCircle, Award, PlayCircle, Download, Briefcase, Play, Check, Sparkles, HelpCircle } from 'lucide-react';

const VigyanYuvatha = () => {
  const [activeTab, setActiveTab] = useState('robotics');
  
  // Synced states with localStorage
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const saved = localStorage.getItem('vigyan_enrolled');
    if (saved) return JSON.parse(saved);
    return [];
  });

  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('vigyan_progress');
    if (saved) return JSON.parse(saved);
    return {};
  });

  const [completedResources, setCompletedResources] = useState(() => {
    const saved = localStorage.getItem('vigyan_completed_resources');
    if (saved) return JSON.parse(saved);
    return {}; // { robotics: ['Arduino Official Documentation', ...] }
  });

  const [showExam, setShowExam] = useState(false);
  const [showResultsReview, setShowResultsReview] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [examScore, setExamScore] = useState(null);
  const [passedExams, setPassedExams] = useState(() => {
    const saved = localStorage.getItem('vigyan_passed_exams');
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
        { name: 'DroneBot Workshop', url: 'https://www.youtube.com/@Dronebotworkshop' },
        { name: 'How To Mechatronics', url: 'https://www.youtube.com/@HowToMechatronics' },
        { name: 'Kevin McAleer (ROS & Robotics)', url: 'https://www.youtube.com/@kevinmcaleer28' },
        { name: 'GreatScott!', url: 'https://www.youtube.com/@greatscottlab' },
        { name: 'James Bruton', url: 'https://www.youtube.com/@JamesBruton' }
      ],
      links: [
        { title: 'Arduino Official Documentation', url: 'https://www.arduino.cc/' },
        { title: 'ROS Tutorials', url: 'https://wiki.ros.org/ROS/Tutorials' }
      ],
      pdfs: [
        { title: 'Robotics Fundamentals PDF', url: 'https://sist.sathyabama.ac.in/sist_coursematerial/uploads/SMR1401.pdf' },
        { title: 'Basic Arduino Programming Guide', url: 'https://www.geeksforgeeks.org/electronics-engineering/arduino-coding-basics/' }
      ],
      internships: [
        { title: 'Robotics Intern - DRDO', link: 'https://drdo.gov.in/' },
        { title: 'Automation Trainee - Tata Tech', link: 'https://www.tatatechnologies.com/' }
      ],
      testQuestions: [
        { q: '1. What is the primary software framework used in robotics kinematics?', options: ['Robot Operating System (ROS)', 'HTML5', 'Python Kernel', 'BIOS System'], correct: 'Robot Operating System (ROS)' },
        { q: '2. Which microcontroller is commonly used for basic sensor controls?', options: ['Arduino UNO', 'Core i7', 'Pentium III', 'DDR4 Controller'], correct: 'Arduino UNO' },
        { q: '3. Which of these is a key robotics sensor for measuring distances?', options: ['Ultrasonic Sensor', 'Thermistor', 'Barometer', 'Hygrometer'], correct: 'Ultrasonic Sensor' }
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
        { name: 'Real Engineering', url: 'https://www.youtube.com/@RealEngineering' },
        { name: 'AgentJayZ', url: 'https://www.youtube.com/@AgentJayZ' },
        { name: 'Mentour Pilot', url: 'https://www.youtube.com/@MentourPilot' },
        { name: 'Aviation Theory', url: 'https://www.youtube.com/@AviationTheory' },
        { name: 'Wendover Productions', url: 'https://www.youtube.com/@Wendoverproductions' }
      ],
      links: [
        { title: 'FAA Aviation Handbooks', url: 'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation' },
        { title: 'NASA Aeronautics Educator Guide', url: 'https://www.nasa.gov/aeroresearch/resources/educational-materials' }
      ],
      pdfs: [
        { title: 'Intro to Avionics Systems PDF', url: 'https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation/advanced_avionics_handbook.pdf' },
        { title: 'Drone Building Blueprint', url: 'https://diydrones.com/' }
      ],
      internships: [
        { title: 'Avionics Intern - HAL', link: 'https://hal-india.co.in/' },
        { title: 'UAV Research - NAL', link: 'https://www.nal.res.in/' }
      ],
      testQuestions: [
        { q: '1. What does UAV stand for in aeronautics?', options: ['Unmanned Aerial Vehicle', 'Unified Aviation Vehicle', 'Universal Aerial Vector', 'Utility Aero Vessel'], correct: 'Unmanned Aerial Vehicle' },
        { q: '2. Which agency publishes standard aviation safety handbooks?', options: ['FAA (Federal Aviation Administration)', 'NASA', 'DRDO', 'ISRO'], correct: 'FAA (Federal Aviation Administration)' },
        { q: '3. What is the primary force that counters gravity to keep an aircraft in flight?', options: ['Lift', 'Drag', 'Thrust', 'Weight'], correct: 'Lift' }
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
        { name: 'StatQuest with Josh Starmer', url: 'https://www.youtube.com/@statquest' },
        { name: 'Sentdex', url: 'https://www.youtube.com/@sentdex' },
        { name: 'Lex Fridman', url: 'https://www.youtube.com/@lexfridman' },
        { name: 'Andrej Karpathy', url: 'https://www.youtube.com/@AndrejKarpathy' },
        { name: 'Corey Schafer', url: 'https://www.youtube.com/@coreymschafer' }
      ],
      links: [
        { title: 'Kaggle Datasets & Courses', url: 'https://www.kaggle.com/' },
        { title: 'Google Machine Learning Crash Course', url: 'https://developers.google.com/machine-learning/crash-course' }
      ],
      pdfs: [
        { title: '100 Page ML Book Summary', url: 'https://leanpub.com/thehundredpage-machinelearningbook' },
        { title: 'Deep Learning Cheatsheet', url: 'https://github.com/afshinea/stanford-cs-229-machine-learning' }
      ],
      internships: [
        { title: 'AI Research Intern - CDAC', link: 'https://www.cdac.in/' },
        { title: 'Data Science Intern - TCS', link: 'https://www.tcs.com/' }
      ],
      testQuestions: [
        { q: '1. Which Python library is widely used for tabular data analysis?', options: ['Pandas', 'PyTorch', 'Django', 'Flask'], correct: 'Pandas' },
        { q: '2. What type of machine learning uses labeled data?', options: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Evolutionary Learning'], correct: 'Supervised Learning' },
        { q: '3. Which of the following is a famous deep learning library developed by Google?', options: ['TensorFlow', 'PyTorch', 'Scikit-Learn', 'NumPy'], correct: 'TensorFlow' }
      ]
    },
    space_tech: {
      title: 'Space Technology',
      description: 'Dive into space exploration, satellite technology, and astrophysics.',
      roadmap: [
        'Basics of Orbital Mechanics',
        'Rocket Propulsion Systems',
        'Satellite Design & Subsystems',
        'Space Environment & Constraints',
        'Current ISRO/NASA Missions'
      ],
      youtubeChannels: [
        { name: 'Everyday Astronaut', url: 'https://www.youtube.com/@EverydayAstronaut' },
        { name: 'Scott Manley', url: 'https://www.youtube.com/@scottmanley' },
        { name: 'Kurzgesagt – In a Nutshell', url: 'https://www.youtube.com/@kurzgesagt' },
        { name: 'Isaac Arthur', url: 'https://www.youtube.com/@IsaacArthur' },
        { name: 'Garettios (ISRO Updates)', url: 'https://www.youtube.com/@Garettios' }
      ],
      links: [
        { title: 'ISRO Student Portal', url: 'https://www.isro.gov.in/' },
        { title: 'NASA STEM Engagement', url: 'https://www.nasa.gov/learning-resources/nasa-stem-engagement/' }
      ],
      pdfs: [
        { title: 'Basics of Orbital Mechanics', url: 'https://www.nasa.gov/sites/default/files/atoms/files/basics_of_orbital_mechanics.pdf' },
        { title: 'Satellite Engineering Guide', url: 'https://www.isro.gov.in/' }
      ],
      internships: [
        { title: 'Summer Intern - ISRO', link: 'https://www.isro.gov.in/' },
        { title: 'Space Tech Trainee - Agnikul', link: 'https://agnikul.in/' }
      ],
      testQuestions: [
        { q: '1. Which organization is the Indian space research body?', options: ['ISRO', 'NASA', 'ESA', 'Roscosmos'], correct: 'ISRO' },
        { q: '2. What is the primary fuel oxidizer used in liquid propulsion rocket stages?', options: ['Liquid Oxygen', 'Liquid Hydrogen', 'Kerosene', 'Nitrogen Gas'], correct: 'Liquid Oxygen' },
        { q: '3. Which law describes orbital mechanics of satellites around Earth?', options: ['Kepler\'s Laws', 'Ohm\'s Law', 'Mendel\'s Laws', 'Bernoulli\'s Principle'], correct: 'Kepler\'s Laws' }
      ]
    }
  };

  const activeContent = contentData[activeTab];
  const isEnrolled = enrolledCourses.includes(activeTab);
  const currentProgress = progress[activeTab] || 0;

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('vigyan_enrolled', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  useEffect(() => {
    localStorage.setItem('vigyan_progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('vigyan_completed_resources', JSON.stringify(completedResources));
  }, [completedResources]);

  useEffect(() => {
    localStorage.setItem('vigyan_passed_exams', JSON.stringify(passedExams));
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
    const totalCount = (activeContent.youtubeChannels?.length || 0) + (activeContent.pdfs?.length || 0) + (activeContent.links?.length || 0);
    const newPercent = totalCount > 0 ? Math.round((updatedList.length / totalCount) * 100) : 0;
    
    setProgress({
      ...progress,
      [activeTab]: newPercent
    });
  };

  const handleExamSubmit = (e) => {
    e.preventDefault();
    let scoreCount = 0;
    
    activeContent.testQuestions.forEach((q, idx) => {
      const selected = selectedAnswers[`q${idx + 1}`];
      if (selected === q.correct) {
        scoreCount += 1;
      }
    });

    const calculatedScore = Math.round((scoreCount / activeContent.testQuestions.length) * 100);
    setExamScore(calculatedScore);
    
    if (calculatedScore >= 50) {
      if (!passedExams.includes(activeTab)) {
        setPassedExams([...passedExams, activeTab]);
      }
    }
    
    setShowExam(false);
    setShowResultsReview(true);
  };

  const renderCertificateAndInternships = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-yellow-250 dark:border-yellow-900/50 text-center relative overflow-hidden max-w-2xl mx-auto">
        <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500"></div>
        <Award size={72} className="mx-auto text-yellow-500 mb-4 animate-bounce" />
        <h2 className="text-3xl font-serif font-bold text-gray-850 dark:text-white mb-2">Certificate of Excellence</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 italic">This is to certify that the cadet has successfully mastered the</p>
        <h3 className="text-2xl font-bold text-[#0B3D91] dark:text-blue-400 mb-6">{activeContent.title} Curriculum</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-8 font-medium">Redeemed with an Exam Final Score of <span className="font-bold text-green-600 text-lg">{examScore}%</span></p>
        
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

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-green-200 dark:border-green-900/50 max-w-2xl mx-auto">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
          <Briefcase className="mr-2 text-green-500 animate-pulse" /> Recommended Internships
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">Based on your excellent performance, here are some related internships you should apply for:</p>
        <div className="space-y-3">
          {activeContent.internships.map((internship, idx) => (
            <a key={idx} href={internship.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/10 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-all border border-green-100 dark:border-green-800">
              <span className="font-bold text-xs text-green-800 dark:text-green-400">{internship.title}</span>
              <ExternalLink size={16} className="text-green-600 dark:text-green-500" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  const renderResultsReview = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-150 dark:border-gray-755 max-w-2xl mx-auto space-y-6">
      <div className="text-center pb-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-855 dark:text-white">Exam Results Overview</h2>
        <div className="mt-4 inline-flex items-center justify-center p-6 rounded-full bg-gray-50 dark:bg-gray-750 border-4 border-gray-100 dark:border-gray-700">
          <div className="text-center">
            <span className={`text-4xl font-extrabold ${examScore >= 50 ? 'text-green-600' : 'text-red-650'}`}>{examScore}%</span>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">Final Score</p>
          </div>
        </div>
        <p className="text-sm mt-3 font-semibold text-gray-705 dark:text-gray-300">
          {examScore >= 50 
            ? "Congratulations! You have passed the final examination and unlocked your certificate & recommended internships." 
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
              <p className="font-bold text-gray-855 dark:text-white mb-2 text-xs">{q.q}</p>
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
        {examScore >= 50 ? (
          <button 
            onClick={() => {
              setShowResultsReview(false);
              setShowCertificate(true);
            }}
            className="flex-1 py-3 bg-[#556B2F] hover:bg-[#435525] text-white font-extrabold rounded-lg transition-colors text-sm shadow flex items-center justify-center gap-1.5"
          >
            <Award size={16} />
            <span>Claim Certificate & Internships</span>
          </button>
        ) : (
          <button 
            onClick={() => {
              setShowResultsReview(false);
              setShowExam(true);
              setSelectedAnswers({ q1: '', q2: '', q3: '' });
            }}
            className="flex-1 py-3 bg-red-650 hover:bg-red-750 text-white font-extrabold rounded-lg transition-colors text-sm shadow"
          >
            Retake Exam
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

  const renderExam = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-150 dark:border-gray-750 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-700 pb-3">
        <h2 className="text-xl font-bold text-[#0B3D91] dark:text-blue-400 flex items-center">
          <HelpCircle className="mr-2" /> {activeContent.title} Final Examination
        </h2>
        <span className="text-xs bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded">Required: 50%</span>
      </div>

      <form onSubmit={handleExamSubmit} className="space-y-6">
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
            Submit Exam
          </button>
          <button 
            type="button"
            onClick={() => setShowExam(false)}
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
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Vigyan Yuvatha</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Explore advanced technology and liberal science disciplines for Indias growth</p>
        </div>
      </div>

      {/* Course Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {categories.map((cat) => {
          const courseProgress = progress[cat.id] || 0;
          const started = enrolledCourses.includes(cat.id);
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                setShowExam(false);
                setShowCertificate(false);
              }}
              className={`p-4 rounded-xl font-bold text-center border-2 transition-all duration-200 shadow-sm relative flex flex-col items-center justify-center ${
                activeTab === cat.id
                  ? 'border-[#0B3D91] bg-blue-50/50 dark:bg-blue-900/20 text-[#0B3D91] dark:text-blue-300 scale-[1.02]'
                  : 'border-transparent bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-205'
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
              <Cpu size={56} className="mx-auto text-blue-500 animate-pulse" />
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
            renderCertificateAndInternships()
          ) : showResultsReview ? (
            renderResultsReview()
          ) : showExam ? (
            renderExam()
          ) : (
            /* Syllabus Details & Progress tracker once Enrolled */
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-gray-100 dark:border-gray-700 pb-4 gap-3">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#0B3D91] dark:text-blue-400">{activeContent.title}</h2>
                  <p className="text-xs text-gray-500">Track your tasks link-by-link to unlock the Final Exam.</p>
                </div>
                
                {/* Exam Unlock Action */}
                {currentProgress === 100 ? (
                  <button 
                    onClick={() => {
                      setShowExam(true);
                      setSelectedAnswers({ q1: '', q2: '', q3: '' });
                    }}
                    className="px-4 py-2 bg-[#556B2F] text-white rounded-lg hover:bg-[#435525] transition-colors font-bold shadow flex items-center text-xs animate-bounce"
                  >
                    <PlayCircle size={16} className="mr-1.5" /> Unlock Final Exam
                  </button>
                ) : (
                  <div className="px-3 py-1 bg-yellow-50 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-400 rounded text-xs font-bold flex items-center border border-yellow-100/50">
                    🔒 Complete 100% resources to unlock Exam
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
                <h3 className="text-lg font-semibold flex items-center mb-4 text-gray-800 dark:text-white">
                  <Cpu className="mr-2 text-[#556B2F]" size={20} />
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
        {isEnrolled && isStudying && !showCertificate && !showExam && (
          <div className="space-y-6">
            {/* Youtube channels checklist */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
              <h3 className="text-md font-bold flex items-center text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">
                <Play className="mr-2 text-red-500" size={18} />
                YouTube Prep Channels
              </h3>
              <div className="space-y-3">
                {activeContent.youtubeChannels.map((vid, idx) => {
                  const completed = (completedResources[activeTab] || []).includes(vid.name);
                  return (
                    <div key={idx} className="flex items-start justify-between gap-3 p-3 bg-gray-50/50 dark:bg-gray-750 rounded border border-gray-100 dark:border-gray-700 hover:shadow-xs transition-shadow">
                      <div className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          checked={completed}
                          onChange={() => handleToggleResource(vid.name)}
                          className="mt-0.5 text-[#0B3D91] focus:ring-[#0B3D91] rounded border-gray-300 h-3.5 w-3.5"
                        />
                        <div>
                          <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{vid.name}</p>
                          <a href={vid.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-red-500 hover:underline inline-flex items-center mt-1">
                            Visit YouTube Channel <ExternalLink size={10} className="ml-1" />
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
                <span className="text-[10px] font-bold text-green-200 uppercase tracking-widest block">Reference Guides (PDF)</span>
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

export default VigyanYuvatha;
