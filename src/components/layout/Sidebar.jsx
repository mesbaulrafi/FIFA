import React from 'react';
import useStore from '../../store/store';

const Sidebar = () => {
  const { selectedCategory, setSelectedCategory } = useStore();

  const categories = [
    { id: 'sports', name: 'Sports', count: 244, icon: '⚽' },
    { id: 'universal', name: 'Universal', count: 7479, icon: '📺' },
    { id: 'bangla', name: 'Bangla', count: 102, icon: '🇧🇩' },
    { id: 'fifa', name: 'FIFA', count: 15, icon: '⚽', selected: true }
  ];

  return (
    <div className="w-80 bg-black/40 backdrop-blur-lg border-r border-white/10 p-6 space-y-6 min-h-screen sticky top-0">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl">
        <span className="text-2xl">📋</span>
        <h2 className="text-lg font-bold text-white">Your Playlists</h2>
      </div>

      {/* Categories List */}
      <div className="space-y-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`w-full p-4 rounded-xl border transition-all duration-300 text-left ${
              selectedCategory === category.id
                ? 'bg-indigo-600/30 border-indigo-500/50 shadow-[0_0_20px_rgba(79,70,229,0.2)]'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <h3 className="text-white font-semibold">{category.name}</h3>
                  <p className="text-white/50 text-xs uppercase tracking-wider">{category.count} CHANNELS</p>
                </div>
              </div>
              {selectedCategory === category.id && (
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 border border-green-500">
                  <span className="text-green-400 text-sm">✓</span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
