import React, { useState } from 'react';
import { Star, Award, Quote, ChevronRight } from 'lucide-react';

const RoleModels = () => {
  const [activeTab, setActiveTab] = useState('defence');

  const categories = [
    { id: 'defence', name: 'Defence' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'medicine', name: 'Medicine' },
    { id: 'civil_services', name: 'Civil Services' },
    { id: 'other', name: 'Other' }
  ];

  const contentData = {
    defence: [
      {
        name: 'Field Marshal Sam Manekshaw',
        image: '/src/assets/fieldmarshalsammanekshaw.jpg',
        story: 'Widely known as Sam Bahadur, he was the Chief of the Army Staff of the Indian Army during the Indo-Pakistani War of 1971, and the first Indian Army officer to be promoted to the rank of field marshal.',
        achievements: [
          'Military Cross (1942)',
          'Padma Bhushan (1968)',
          'Padma Vibhushan (1972)'
        ],
        quote: 'If a man says he is not afraid of dying, he is either lying or is a Gurkha.'
      },
      {
        name: 'Captain Vikram Batra',
        image: '/src/assets/vk.jpg',
        story: 'An officer of the Indian Army, awarded with the Param Vir Chakra, India\'s highest and most prestigious award for valour, for his actions during the 1999 Kargil War.',
        achievements: [
          'Param Vir Chakra (Posthumous)',
          'Captured Point 5140 and Point 4875 during Kargil War'
        ],
        quote: 'Either I will come back after hoisting the Tricolour, or I will come back wrapped in it, but I will be back for sure.'
      }
    ],
    engineering: [
      {
        name: 'A. P. J. Abdul Kalam',
        image: '/src/assets/APJ-ABDUL-KALAM.png',
        story: 'An Indian aerospace scientist and statesman who served as the 11th president of India from 2002 to 2007. He spent the next four decades as a scientist and science administrator, mainly at the DRDO and ISRO.',
        achievements: [
          'Padma Bhushan (1981)',
          'Padma Vibhushan (1990)',
          'Bharat Ratna (1997)'
        ],
        quote: 'Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.'
      }
    ],
    medicine: [
      {
        name: 'Dr. B. C. Roy',
        image: '/src/assets/bc_roy.png',
        story: 'An eminent Indian physician, educationist, philanthropist and freedom fighter who served as the Chief Minister of West Bengal. National Doctors\' Day is celebrated in his memory every year on 1 July in India.',
        achievements: [
          'Bharat Ratna (1961)',
          'Established Indian Medical Association',
          'Established Medical Council of India'
        ],
        quote: 'I do not want anything for myself. I want to build a better Bengal, a better India.'
      }
    ],
    civil_services: [
      {
        name: 'Kiran Bedi',
        image: '/src/assets/kiranbedi.avif',
        story: 'An Indian politician, social activist, retired police officer and tennis player, who was the 24th Lieutenant Governor of Puducherry. She is the first woman in India to join the officer ranks of the Indian Police Service (IPS).',
        achievements: [
          'President\'s Police Medal (1979)',
          'Ramon Magsaysay Award (1994)',
          'United Nations Medal (2004)'
        ],
        quote: 'There is no such thing as a problem without a gift for you in its hands. You seek problems because you need their gifts.'
      }
    ],
    other: [
      {
        name: 'Milkha Singh',
        image: '/src/assets/milkha-singh.webp',
        story: 'Also known as The Flying Sikh, was an Indian track and field sprinter who was introduced to the sport while serving in the Indian Army. He is the only athlete to win gold at 400 metres at the Asian Games as well as the Commonwealth Games.',
        achievements: [
          'Padma Shri (1959)',
          'Gold at 1958 Commonwealth Games',
          'Gold at 1958 and 1962 Asian Games'
        ],
        quote: 'Hard work, willpower, and dedication. For a person with these qualities, the sky is the limit.'
      }
    ]
  };

  const activeProfiles = contentData[activeTab] || [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Motivation & Role Models</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Draw inspiration from those who paved the way</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto space-x-2 pb-2 custom-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-5 py-2.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === cat.id
                ? 'bg-[#0B3D91] text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {activeProfiles.map((profile, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gray-100 dark:bg-gray-700">
                <img 
                  src={profile.image} 
                  alt={profile.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover min-h-[250px] object-top grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="p-6 md:w-2/3 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#0B3D91] dark:text-blue-400 mb-3">{profile.name}</h2>
                  
                  <div className="mb-4">
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {profile.story}
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                      <Award size={16} className="mr-1 text-yellow-500" /> Achievements
                    </h3>
                    <ul className="space-y-1">
                      {profile.achievements.map((ach, i) => (
                        <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                          <ChevronRight size={16} className="mr-1 text-[#556B2F] flex-shrink-0 mt-0.5" /> 
                          {ach}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 relative">
                  <Quote size={32} className="absolute -top-4 left-0 text-gray-100 dark:text-gray-700 -z-10" />
                  <p className="italic text-gray-700 dark:text-gray-200 font-medium pl-4 border-l-4 border-[#0B3D91]">
                    "{profile.quote}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleModels;
