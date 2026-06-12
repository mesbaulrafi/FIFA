import React, { useState, useEffect } from 'react';
import useStore from '../../store/store';
import fifaData from '../../store/app/data/fifa.json';
import sportsData from '../../store/app/data/sports.json';
import banglaData from '../../store/app/data/bangla.json';

const getGradient = (group, index) => {
  const gradients = {
    'FIFA': ['from-blue-900/40 to-black/40', 'from-indigo-900/40 to-black/40', 'from-purple-900/40 to-black/40'],
    'Sports': ['from-emerald-900/40 to-black/40', 'from-green-900/40 to-black/40', 'from-teal-900/40 to-black/40'],
    'Bangla': ['from-orange-900/40 to-black/40', 'from-amber-900/40 to-black/40', 'from-yellow-900/40 to-black/40']
  };
  const groupGradients = gradients[group] || ['from-gray-900/40 to-black/40'];
  return groupGradients[index % groupGradients.length];
};

const getBentoSize = (index) => {
  const sizes = [
    'col-span-1 md:col-span-2 row-span-2', // Large
    'col-span-1 row-span-1', // Small
    'col-span-1 row-span-1', // Small
    'col-span-1 md:col-span-3 row-span-1' // Wide
  ];
  return sizes[index % sizes.length];
};

const ChannelGrid = () => {
  const { setActiveChannel, activeChannel } = useStore();
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const allChannels = [
      ...fifaData.map((ch, idx) => ({
        id: ch.id || `fifa-${idx}`,
        name: ch.name,
        category: ch.group || 'FIFA',
        streamUrl: ch.url,
        logo: ch.logo,
        status: ch.status,
        size: getBentoSize(idx),
        gradient: getGradient(ch.group || 'FIFA', idx)
      })),
      ...sportsData.map((ch, idx) => ({
        id: ch.id || `sports-${idx}`,
        name: ch.name,
        category: ch.group || 'Sports',
        streamUrl: ch.url,
        logo: ch.logo,
        status: ch.status,
        size: getBentoSize(fifaData.length + idx),
        gradient: getGradient(ch.group || 'Sports', idx)
      })),
      ...banglaData.map((ch, idx) => ({
        id: ch.id || `bangla-${idx}`,
        name: ch.name,
        category: ch.group || 'Bangla',
        streamUrl: ch.url,
        logo: ch.logo,
        status: ch.status,
        size: getBentoSize(fifaData.length + sportsData.length + idx),
        gradient: getGradient(ch.group || 'Bangla', idx)
      }))
    ];
    setChannels(allChannels);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[200px] gap-4">
      {channels.map((channel) => {
        const isActive = activeChannel?.id === channel.id;
        
        return (
          <button
            key={channel.id}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to player on click
              setActiveChannel(channel);
            }}
            className={`
              ${channel.size} group relative flex flex-col justify-end p-6 text-left
              rounded-2xl border transition-all duration-300 overflow-hidden
              ${isActive 
                ? 'border-indigo-500 shadow-[0_0_30px_rgba(79,70,229,0.2)] scale-[1.02] z-10' 
                : 'border-white/10 hover:border-white/30 hover:bg-white/5'
              }
              bg-white/5 backdrop-blur-lg
            `}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-linear-to-br ${channel.gradient} opacity-50 group-hover:opacity-80 transition-opacity z-0`}></div>
            
            {/* Logo */}
            {channel.logo && (
              <img 
                src={channel.logo} 
                alt={channel.name}
                className="absolute top-4 right-4 h-10 w-10 object-contain opacity-40 group-hover:opacity-60 transition-opacity z-50"
              />
            )}
            
            {/* Status Badge */}
            {channel.status && (
              <div className="absolute top-4 left-4 z-50">
                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full backdrop-blur-sm ${
                  channel.status === 'live' 
                    ? 'bg-red-500/30 text-red-300 border border-red-500/50' 
                    : 'bg-gray-500/30 text-gray-300 border border-gray-500/50'
                }`}>
                  {channel.status === 'live' ? '🔴 LIVE' : 'OFFLINE'}
                </span>
              </div>
            )}
            
            {/* Content */}
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-white bg-black/40 border border-white/10 rounded-full backdrop-blur-sm">
                {channel.category}
              </span>
              <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                {channel.name}
              </h3>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ChannelGrid;
