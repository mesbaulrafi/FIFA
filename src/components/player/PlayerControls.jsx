import React from 'react';

const PlayerControls = ({ onPlay, onPause, onMute, isMuted, volume, onVolumeChange }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onPlay}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            title="Play"
          >
            ▶
          </button>
          <button
            onClick={onPause}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            title="Pause"
          >
            ⏸
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onMute}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={onVolumeChange}
            className="w-24 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
            title="Volume"
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerControls;
