import React, { useState, useEffect, useMemo } from 'react';
import useStore from '../../store/store';
import fifaData from '../../store/app/data/fifa.json';
import sportsData from '../../store/app/data/sports.json';
import banglaData from '../../store/app/data/bangla.json';
import { FiSearch } from 'react-icons/fi';

const ChannelBrowser = () => {
  const { selectedCategory, searchQuery, setSearchQuery, setActiveChannel, activeChannel } = useStore();
  const [filteredChannels, setFilteredChannels] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Combine all channel data
  const allChannels = useMemo(() => {
    const combined = [
      ...fifaData.map((ch, idx) => ({
        id: ch.id || `fifa-${idx}`,
        name: ch.name,
        category: 'FIFA',
        group: 'FIFA',
        streamUrl: ch.url,
        logo: ch.logo,
        status: ch.status
      })),
      ...sportsData.map((ch, idx) => ({
        id: ch.id || `sports-${idx}`,
        name: ch.name,
        category: ch.group || 'Sports',
        group: ch.group || 'Sports',
        streamUrl: ch.url,
        logo: ch.logo,
        status: ch.status
      })),
      ...banglaData.map((ch, idx) => ({
        id: ch.id || `bangla-${idx}`,
        name: ch.name,
        category: ch.group || 'Bangla',
        group: ch.group || 'Bangla',
        streamUrl: ch.url,
        logo: ch.logo,
        status: ch.status
      }))
    ];
    return combined;
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(allChannels.map(ch => ch.category))];
    return ['All', ...cats];
  }, [allChannels]);

  // Filter channels based on category, search, and selected filter
  useEffect(() => {
    let filtered = allChannels;

    // Filter by category from sidebar
    if (selectedCategory === 'fifa') {
      filtered = filtered.filter(ch => ch.group === 'FIFA');
    } else if (selectedCategory === 'sports') {
      filtered = filtered.filter(ch => ch.group === 'Sports');
    } else if (selectedCategory === 'bangla') {
      filtered = filtered.filter(ch => ch.group === 'Bangla');
    }

    // Filter by selected filter tab
    if (selectedFilter !== 'All') {
      filtered = filtered.filter(ch => ch.category === selectedFilter);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(ch =>
        ch.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredChannels(filtered);
  }, [selectedCategory, searchQuery, selectedFilter, allChannels]);

  return (
    <div className="flex-1 bg-linear-to-br from-black/20 to-black/40 backdrop-blur-xl p-8 space-y-6">
      {/* Tabs */}
      <div className="flex gap-4 items-center justify-between">
        <div className="flex gap-4">
          <button className="px-6 py-2.5 bg-linear-to-r from-indigo-600 to-purple-600 rounded-full text-white font-semibold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all">
            📂 Browse Channels
          </button>
          <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-semibold flex items-center gap-2 transition-all">
            📋 Playlists Manager
          </button>
        </div>
        <div className="text-right">
          <div className="text-white/50 text-sm">74 Watchers</div>
          <div className="text-white font-semibold">Playlist: {selectedCategory.toUpperCase()}</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <FiSearch className="absolute left-4 top-3.5 text-white/40 text-xl" />
        <input
          type="text"
          placeholder="Search live TV..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-indigo-500/50 focus:bg-white/15 transition-all"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-3 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              selectedFilter === cat
                ? 'bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]'
                : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 hover:border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Channels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredChannels.map((channel) => (
          <button
            key={channel.id}
            onClick={() => {
              setActiveChannel(channel);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`group relative rounded-xl overflow-hidden border transition-all duration-300 hover:scale-105 ${
              activeChannel?.id === channel.id
                ? 'border-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.4)] ring-2 ring-indigo-500/30'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-linear-to-br from-white/5 to-black/40 group-hover:from-white/10" />

            {/* Logo */}
            <div className="relative z-10 aspect-square flex flex-col items-center justify-center p-4 bg-black/20 group-hover:bg-black/10 transition-all">
              {channel.logo && (
                <img
                  src={channel.logo}
                  alt={channel.name}
                  className="h-12 w-12 object-contain mb-2"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}

              {/* Play Button */}
              <div className="absolute opacity-0 group-hover:opacity-100 transition-all">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">▶</span>
                </div>
              </div>
            </div>

            {/* Channel Info */}
            <div className="relative z-10 p-3 bg-linear-to-t from-black/60 to-transparent">
              <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-1">
                {channel.category}
              </p>
              <h3 className="text-sm font-bold text-white line-clamp-2 group-hover:text-indigo-300 transition-colors">
                {channel.name}
              </h3>
              {channel.status === 'live' && (
                <div className="mt-2 flex items-center gap-1 text-xs">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-red-400">LIVE</span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filteredChannels.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-white/50 text-lg">No channels found</p>
          <p className="text-white/30 text-sm">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default ChannelBrowser;
