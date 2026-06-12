import React from 'react';
import useStore from '../../store/store';

const mockChannels = [
  {
    id: 'ch-1',
    name: 'Premier Sports HD',
    category: 'Football',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    size: 'col-span-1 md:col-span-2 row-span-2', // Bento large block
    gradient: 'from-blue-900/40 to-black/40'
  },
  {
    id: 'ch-2',
    name: 'Cricket Action',
    category: 'Cricket',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    size: 'col-span-1 row-span-1', // Bento small block
    gradient: 'from-emerald-900/40 to-black/40'
  },
  {
    id: 'ch-3',
    name: 'F1 Trackside',
    category: 'Motorsport',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    size: 'col-span-1 row-span-1',
    gradient: 'from-red-900/40 to-black/40'
  },
  {
    id: 'ch-4',
    name: 'Hoops Central',
    category: 'Basketball',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    size: 'col-span-1 md:col-span-3 row-span-1', // Bento wide block
    gradient: 'from-orange-900/40 to-black/40'
  }
];

const ChannelGrid = () => {
  const { setActiveChannel, activeChannel } = useStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[200px] gap-4">
      {mockChannels.map((channel) => {
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
            <div className={`absolute inset-0 bg-gradient-to-br ${channel.gradient} opacity-50 group-hover:opacity-80 transition-opacity z-0`}></div>
            
            {/* Content */}
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-white bg-black/40 border border-white/10 rounded-full backdrop-blur-sm">
                {channel.category}
              </span>
              <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
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
