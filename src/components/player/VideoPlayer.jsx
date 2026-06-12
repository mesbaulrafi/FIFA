import React, { useEffect, useRef, useState } from 'react';
import useStore from '../../store/store';
import { initializeMediaPlayer, destroyMediaPlayer } from '../../utils/hlsConfig';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { activeChannel, setPlayerLoading } = useStore();
  const [error, setError] = useState(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeChannel?.streamUrl) return;

    // Clear any previous error
    setError(null);
    setPlayerLoading(true);

    const handleLoadSuccess = () => {
      setPlayerLoading(false);
      setError(null);
    };

    const handleLoadError = (error) => {
      console.error('Player error:', error);
      setPlayerLoading(false);
      setError('Unable to load stream. Please try another channel.');
      
      // Retry with timeout
      setTimeout(() => {
        if (videoRef.current && activeChannel?.streamUrl) {
          playerRef.current = initializeMediaPlayer(
            videoRef.current,
            activeChannel.streamUrl,
            handleLoadSuccess,
            handleLoadError
          );
        }
      }, 3000);
    };

    // Initialize appropriate media player based on stream type
    playerRef.current = initializeMediaPlayer(
      video,
      activeChannel.streamUrl,
      handleLoadSuccess,
      handleLoadError
    );

    // Cleanup function to prevent memory leaks on channel switch or unmount
    return () => {
      destroyMediaPlayer(playerRef.current);
      playerRef.current = null;
    };
  }, [activeChannel, setPlayerLoading]);

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/50 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-xl group">
      <video
        ref={videoRef}
        poster={activeChannel?.logo || 'https://via.placeholder.com/1280x720?text=Loading'}
        className="w-full h-full object-cover"
        controls
        playsInline
        autoPlay
      />
      
      {/* Error message */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="text-center px-4">
            <p className="text-red-400 font-semibold mb-2">Stream Error</p>
            <p className="text-white/70 text-sm">{error}</p>
          </div>
        </div>
      )}
      
      {/* Glassmorphic Overlay for Channel Info */}
      <div className="absolute top-4 left-4 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className="text-white text-sm font-semibold tracking-wide flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          LIVE • {activeChannel?.name}
        </span>
      </div>
      
      {/* Channel Logo */}
      {activeChannel?.logo && (
        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
          <img 
            src={activeChannel.logo} 
            alt={activeChannel.name}
            className="h-12 w-12 object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
