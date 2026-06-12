import React, { useEffect, useRef } from 'react';
import useStore from '../../store/store';
import { initializeHLSPlayer, destroyHLSPlayer } from '../../utils/hlsConfig';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const { activeChannel, setPlayerLoading } = useStore();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeChannel?.streamUrl) return;

    const handleLoadSuccess = () => {
      setPlayerLoading(false);
    };

    const handleLoadError = (error) => {
      console.error('Player error:', error);
      setPlayerLoading(false);
    };

    // Initialize HLS player
    hlsRef.current = initializeHLSPlayer(
      video,
      activeChannel.streamUrl,
      handleLoadSuccess,
      handleLoadError
    );

    // Cleanup function to prevent memory leaks on channel switch or unmount
    return () => {
      destroyHLSPlayer(hlsRef.current);
    };
  }, [activeChannel, setPlayerLoading]);

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/50 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-xl group">
      <video
        ref={videoRef}
        poster={activeChannel?.poster}
        className="w-full h-full object-cover"
        controls
        playsInline
        muted // Muted to allow autoplay policies in modern browsers
      />
      
      {/* Glassmorphic Overlay for Channel Info */}
      <div className="absolute top-4 left-4 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className="text-white text-sm font-semibold tracking-wide flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          LIVE • {activeChannel?.name}
        </span>
      </div>
    </div>
  );
};

export default VideoPlayer;
