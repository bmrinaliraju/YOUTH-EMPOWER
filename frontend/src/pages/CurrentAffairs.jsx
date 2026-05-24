import React, { useState, useEffect } from 'react';
import { Globe, Shield, Activity, Calendar, ExternalLink, X, HelpCircle, CheckCircle, AlertCircle } from 'lucide-react';

const CurrentAffairs = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [selectedDate, setSelectedDate] = useState('today');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categories = [
    { id: 'daily', name: 'Daily Updates (TimesNow)' },
    { id: 'defence', name: 'Defence Updates' },
    { id: 'international', name: 'International Relations' },
    { id: 'quiz', name: 'Geopolitics Quiz' }
  ];

  const [timesNowNews, setTimesNowNews] = useState([]);
  const [isLoadingFeed, setIsLoadingFeed] = useState(false);
  const [quizState, setQuizState] = useState({ started: false, currentQ: 0, score: 0, answers: {}, finished: false });

  const quizQuestions = [
    { id: 1, question: "Which military exercise was recently conducted between Indian and Royal Thai Army?", options: ["Malabar", "Maitree", "Surya Kiran", "Yudh Abhyas"], correct: "Maitree", explanation: "Maitree is the joint military exercise focusing on counter-terrorism in jungle terrains." },
    { id: 2, question: "What is the primary focus of the upcoming National Youth Festival?", options: ["Sports Excellence", "Youth Innovation for Nation Building", "Digital Literacy", "Healthcare"], correct: "Youth Innovation for Nation Building", explanation: "The core focus is Youth Innovation for Nation Building (Viksit Bharat @ 2047)." },
    { id: 3, question: "Which organization successfully tested the new surface-to-air missile off the coast of Odisha?", options: ["ISRO", "DRDO", "HAL", "BEL"], correct: "DRDO", explanation: "DRDO conducted the test flight of the new generation surface-to-air missile system." },
    { id: 4, question: "Bilateral talks between India and Japan primarily focused on which sector?", options: ["Agriculture", "Semiconductor manufacturing", "Space exploration", "Maritime security"], correct: "Semiconductor manufacturing", explanation: "The talks resulted in MoUs focusing on semiconductor supply chain resilience and cybersecurity." },
    { id: 5, question: "What is the cardinal principle of discipline in NCC?", options: ["Obey with a smile", "Win at all costs", "Lead from the front", "Serve the nation"], correct: "Obey with a smile", explanation: "One of the cardinal principles of discipline is 'Obey with a smile'." }
  ];

  useEffect(() => {
    // Fetch TimesNow RSS Feed
    const fetchNews = async () => {
      setIsLoadingFeed(true);
      try {
        const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.timesnownews.com/rss/india');
        const data = await res.json();
        if (data.status === 'ok') {
          const formattedNews = data.items.slice(0, 10).map((item, index) => ({
            id: `timesnow-${index}`,
            title: item.title,
            summary: item.description.replace(/(<([^>]+)>)/ig, "").slice(0, 150) + '...',
            date: new Date(item.pubDate).toLocaleString(),
            source: 'TimesNow',
            details: item.content ? item.content.replace(/(<([^>]+)>)/ig, "") : 'Click the link to read the full article on TimesNow.',
            link: item.link
          }));
          setTimesNowNews(formattedNews);
        }
      } catch (e) {
        console.error("Failed to fetch RSS feed", e);
      } finally {
        setIsLoadingFeed(false);
      }
    };
    fetchNews();
  }, []);

  const newsData = {
    daily: [
      { 
        id: 1, 
        title: 'National Youth Festival Announced', 
        summary: 'The Government has announced the dates for the upcoming National Youth Festival focusing on skill development.', 
        date: 'Today, 09:00 AM', 
        source: 'PIB',
        details: "The Ministry of Youth Affairs and Sports has officially unveiled the schedule and blueprint for the upcoming National Youth Festival. This annual event gathers the brightest young minds, YOUTH cadets, and NSS volunteers from all states and union territories. The core focus of this year's festival is 'Youth Innovation for Nation Building' (Viksit Bharat @ 2047). Key highlights include skill development workshops led by industry tech leaders, youth-led policy debates on sustainable development, and interactive geopolitical forums. Over 50,000 cadets and youth are expected to participate both physically and virtually, creating a massive collaborative environment."
      },
      { 
        id: 2, 
        title: 'New Education Policy Implementation Update', 
        summary: 'Several states have fully adopted the NEP guidelines for higher education institutes.', 
        date: 'Yesterday', 
        source: 'The Hindu',
        details: "The implementation of the New Education Policy (NEP) has reached a major milestone as several state governments announce full adaptation across all state-run higher education institutes. The policy focuses heavily on vocational training, multi-disciplinary research, and credit-based flexible learning systems. For cadets and students, this translates to academic credits for youth development activities, including YOUTH service camps, social volunteering, and skill-coaching certifications. This integration bridges formal education with real-world leadership and community service."
      },
    ],
    defence: [
      { 
        id: 3, 
        title: 'Indigenous Aircraft Carrier Sea Trials', 
        summary: 'The new indigenous aircraft carrier has successfully completed its third phase of sea trials.', 
        date: 'Today, 11:30 AM', 
        source: 'Ministry of Defence',
        details: "India's defense manufacturing has achieved yet another victory as the second indigenous aircraft carrier successfully completes its complex phase of sea trials. The trials tested the advanced catapult launching systems, deck landing safety gear, and high-tech radar arrays in real oceanic environments. Built with 76% indigenous content, the massive carrier stands as a proud testament to the 'Atmanirbhar Bharat' vision. Cadets interested in navy and defense technology can look forward to upcoming educational ship tours organized by naval command centers."
      },
      { 
        id: 4, 
        title: 'Joint Military Exercise "Maitree"', 
        summary: 'Indian Army and Royal Thai Army begin joint military exercise focusing on counter-terrorism.', 
        date: 'Yesterday', 
        source: 'ANI',
        details: "The Indian Army and Royal Thai Army have officially commenced their joint military training exercise, Maitree, in Northern India. The exercise focuses heavily on tactical training, counter-terrorism maneuvers in jungle terrains, and establishing dynamic command centers during crisis scenarios. These joint platforms foster strong strategic and tactical relationships between partner nations, offering valuable case studies for cadets preparing for NDA and SSB entries."
      },
      { 
        id: 5, 
        title: 'DRDO Tests New Missile System', 
        summary: 'A successful test flight of the new surface-to-air missile was conducted off the coast of Odisha.', 
        date: '2 days ago', 
        source: 'DRDO',
        details: "The Defence Research and Development Organisation (DRDO) has successfully conducted a test flight of its new generation surface-to-air missile system off the coast of Odisha. The missile hit its low-altitude target with pin-point precision, proving its stellar radar-guidance and highly responsive propulsion system. This weapon system will bolster air-defense shields for the Indian Armed Forces."
      }
    ],
    international: [
      { 
        id: 6, 
        title: 'G20 Summit Key Takeaways', 
        summary: 'Leaders agreed on a joint declaration focusing on climate finance and digital public infrastructure.', 
        date: 'Today, 08:15 AM', 
        source: 'Reuters',
        details: "The G20 Summit has concluded with all major world leaders signing a comprehensive joint declaration. Major milestones include unified guidelines for global climate financing, a clear roadmap for digital public infrastructure adoption, and establishing sustainable food security systems. This geopolitical consensus highlights India's leading role in representing the Global South and steering international policy."
      },
      { 
        id: 7, 
        title: 'Bilateral Talks with Japan', 
        summary: 'India and Japan signed MoUs regarding semiconductor manufacturing and cybersecurity cooperation.', 
        date: '3 days ago', 
        source: 'MEA',
        details: "Bilateral talks between the Prime Ministers of India and Japan in Tokyo have resulted in the signing of key Memorandum of Understandings (MoUs). The cooperation focuses primarily on establishing semiconductor supply chain resilience, setting up joint cybersecurity response frameworks, and expanding student-cadet cultural exchange programs. This deepens the strategic alliance for mutual growth and Indo-Pacific stability."
      }
    ]
  };

  const archiveNewsData = {
    today: [],
    yesterday: [
      {
        id: 'arch-1',
        title: 'India-US Strategic Partnership Strengthened',
        summary: 'India and the United States held key talks on defense collaboration and critical technology supply chains.',
        date: '23 May 2026',
        source: 'TimesNow Archive',
        details: 'The high-level talks between India and the United States resulted in a joint blueprint focusing heavily on clean energy co-development, cybersecurity information sharing, and establishing secure aerospace electronics corridors. This dialogue strengthens mutual strategic alliance.'
      },
      {
        id: 'arch-2',
        title: 'Swachh Bharat Cleanliness Drive Reaches 1000 Districts',
        summary: 'The national cleanliness campaign celebrated a milestone with massive youth enlistment across schools.',
        date: '23 May 2026',
        source: 'TimesNow Archive',
        details: 'The Swachh Bharat volunteer drive achieved a historic milestone as over 1,000 districts registered unified youth plantation and waste recycling initiatives. Active participation from youth organizations helped clear 50 tons of ocean and riverfront plastics.'
      }
    ],
    dayBefore: [
      {
        id: 'arch-3',
        title: 'ISRO Unveils Next-Gen Launch Vehicle Design',
        summary: 'ISRO has released preliminary details of its upcoming reusable heavy-lift rocket system.',
        date: '22 May 2026',
        source: 'TimesNow Archive',
        details: 'The Indian Space Research Organisation officially presented design specs for the Reusable Heavy Launch Vehicle (RHLV). Built with dual-thrust cryogenic engines, the rocket aims to reduce commercial launch costs by 60%.'
      },
      {
        id: 'arch-4',
        title: 'National Startup Ecosystem Ranking Released',
        summary: 'Karnataka, Gujarat, and Maharashtra ranked top performers in developing state incubators.',
        date: '22 May 2026',
        source: 'TimesNow Archive',
        details: 'The annual state-level startup ranking report was unveiled, highlighting top performance in institutional funding access, regulatory ease, and mentoring networks. The rankings foster competitive growth across all states.'
      }
    ]
  };

  const combinedDaily = timesNowNews.length > 0 ? timesNowNews : newsData.daily;
  
  const getDailyNewsList = () => {
    if (selectedDate === 'today') return combinedDaily;
    return archiveNewsData[selectedDate] || [];
  };

  const activeNews = activeTab === 'daily' ? getDailyNewsList() : (newsData[activeTab] || []);

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    let calculatedScore = 0;
    quizQuestions.forEach(q => {
      if (quizState.answers[q.id] === q.correct) {
        calculatedScore += 1;
      }
    });
    setQuizState({ ...quizState, score: calculatedScore, finished: true });
  };

  const renderQuiz = () => {
    if (!quizState.started) {
      return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-100 dark:border-gray-700 text-center">
          <HelpCircle size={48} className="mx-auto text-blue-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Geopolitics & Current Affairs Quiz</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Test your knowledge on recent national and international developments.</p>
          <button 
            onClick={() => setQuizState({ ...quizState, started: true })}
            className="px-6 py-2.5 bg-[#0B3D91] hover:bg-blue-800 text-white font-bold rounded-lg shadow-sm"
          >
            Start Quiz
          </button>
        </div>
      );
    }

    if (quizState.finished) {
      return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-[#0B3D91] dark:text-blue-400 mb-2">Quiz Results</h2>
          <p className="font-bold text-lg mb-6 text-gray-800 dark:text-white">You scored {quizState.score} out of {quizQuestions.length}!</p>
          
          <div className="space-y-4">
            {quizQuestions.map((q, idx) => {
              const isCorrect = quizState.answers[q.id] === q.correct;
              return (
                <div key={q.id} className={`p-4 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-200 dark:bg-green-900/10' : 'bg-red-50 border-red-200 dark:bg-red-900/10'}`}>
                  <p className="font-bold text-gray-800 dark:text-gray-200 text-sm mb-2">{idx + 1}. {q.question}</p>
                  <p className="text-xs mb-1">
                    Your Answer: <span className={`font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>{quizState.answers[q.id] || 'None'}</span>
                  </p>
                  {!isCorrect && (
                    <p className="text-xs text-green-600 font-bold mb-1">Correct Answer: {q.correct}</p>
                  )}
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 italic">{q.explanation}</p>
                </div>
              );
            })}
          </div>
          
          <button 
            onClick={() => setQuizState({ started: false, currentQ: 0, score: 0, answers: {}, finished: false })}
            className="mt-6 px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white font-bold rounded-lg"
          >
            Retake Quiz
          </button>
        </div>
      );
    }

    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#0B3D91] dark:text-blue-400">Knowledge Check</h2>
          <span className="text-xs font-bold bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Question {quizState.currentQ + 1} of {quizQuestions.length}</span>
        </div>
        
        <form onSubmit={quizState.currentQ === quizQuestions.length - 1 ? handleQuizSubmit : (e) => { e.preventDefault(); setQuizState({ ...quizState, currentQ: quizState.currentQ + 1 }); }} className="space-y-6">
          <div className="space-y-4">
            <p className="font-bold text-gray-800 dark:text-white text-md">{quizQuestions[quizState.currentQ].question}</p>
            <div className="space-y-2">
              {quizQuestions[quizState.currentQ].options.map((opt, i) => (
                <label key={i} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    required
                    name={`q-${quizQuestions[quizState.currentQ].id}`}
                    value={opt}
                    checked={quizState.answers[quizQuestions[quizState.currentQ].id] === opt}
                    onChange={(e) => setQuizState({ ...quizState, answers: { ...quizState.answers, [quizQuestions[quizState.currentQ].id]: e.target.value } })}
                    className="text-[#0B3D91] focus:ring-[#0B3D91]"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{opt}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <button 
              type="button"
              disabled={quizState.currentQ === 0}
              onClick={() => setQuizState({ ...quizState, currentQ: quizState.currentQ - 1 })}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button 
              type="submit"
              className="px-6 py-2 bg-[#0B3D91] hover:bg-blue-800 text-white font-bold rounded shadow-sm"
            >
              {quizState.currentQ === quizQuestions.length - 1 ? 'Submit Quiz' : 'Next Question'}
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Current Affairs & Geopolitics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Simple, curated summaries for YOUTH Cadets</p>
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
                  {cat.id === 'quiz' && <HelpCircle size={18} className="mr-2" />}
                  {cat.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content Area: News Cards or Quiz */}
        <div className="lg:col-span-3 space-y-4">
          {activeTab === 'quiz' ? renderQuiz() : (
            <>
              {activeTab === 'daily' && (
                <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Archive Selection:</span>
                  <div className="flex gap-2">
                    {['today', 'yesterday', 'dayBefore'].map(dKey => (
                      <button
                        key={dKey}
                        onClick={() => setSelectedDate(dKey)}
                        className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                          selectedDate === dKey
                            ? 'bg-[#556B2F] text-white'
                            : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-650'
                        }`}
                      >
                        {dKey === 'today' && 'Today\'s News'}
                        {dKey === 'yesterday' && 'Yesterday (23 May)'}
                        {dKey === 'dayBefore' && 'Previous Day (22 May)'}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {isLoadingFeed && activeTab === 'daily' && selectedDate === 'today' && (
                <div className="text-center py-8">
                  <Activity className="animate-spin text-blue-500 mx-auto mb-2" size={24} />
                  <p className="text-sm text-gray-500">Loading live updates from TimesNow...</p>
                </div>
              )}
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
                    {news.link ? (
                      <a 
                        href={news.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm font-medium text-[#556B2F] hover:text-[#435525] dark:text-green-400 transition-colors"
                      >
                        Read Full Article <ExternalLink size={14} className="ml-1" />
                      </a>
                    ) : (
                      <button 
                        onClick={() => setSelectedArticle(news)}
                        className="flex items-center text-sm font-medium text-[#556B2F] hover:text-[#435525] dark:text-green-400 transition-colors"
                      >
                        Read Full Article <ExternalLink size={14} className="ml-1" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {activeNews.length === 0 && !isLoadingFeed && (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                  <p className="text-gray-500 dark:text-gray-400">No updates available in this category.</p>
                </div>
              )}
            </>
          )}
        </div>

      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedArticle(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/80">
              <span className="text-xs bg-blue-100 text-[#0B3D91] dark:bg-blue-900/40 dark:text-blue-200 px-2 py-1 rounded font-bold uppercase tracking-wider">
                {selectedArticle.source}
              </span>
              <button onClick={() => setSelectedArticle(null)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <h2 className="text-2xl font-bold text-[#0B3D91] dark:text-blue-400 leading-tight">
                {selectedArticle.title}
              </h2>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 font-medium">
                <Calendar size={14} className="mr-1.5" />
                {selectedArticle.date}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm italic font-medium bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg border-l-4 border-[#556B2F]">
                "{selectedArticle.summary}"
              </p>
              <div className="text-gray-700 dark:text-gray-200 leading-relaxed text-sm space-y-3">
                <p>{selectedArticle.details}</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700 text-right">
              <button 
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 bg-[#556B2F] hover:bg-[#435525] text-white rounded font-bold transition-colors text-sm"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CurrentAffairs;
