import Hls from 'hls.js';
import dashjs from 'dashjs';
import { HLS_CONFIG, ERROR_MESSAGES } from './constants';

/**
 * Detect stream type from URL
 * @param {string} streamUrl - Stream URL
 * @returns {string} - 'hls', 'dash', or 'native'
 */
export const detectStreamType = (streamUrl) => {
  if (!streamUrl) return 'native';
  const url = streamUrl.toLowerCase();
  if (url.includes('.m3u8') || url.includes('application/vnd.apple.mpegurl')) return 'hls';
  if (url.includes('.mpd') || url.includes('application/dash+xml')) return 'dash';
  return 'native';
};

/**
 * Initialize media player (HLS or DASH)
 * @param {HTMLVideoElement} videoElement - Video HTML element
 * @param {string} streamUrl - Stream URL
 * @param {Function} onLoadCallback - Callback when stream is ready
 * @param {Function} onErrorCallback - Callback on error
 * @returns {Object} - Player instance (Hls, DASH, or null)
 */
export const initializeMediaPlayer = (videoElement, streamUrl, onLoadCallback, onErrorCallback) => {
  if (!videoElement || !streamUrl) return null;

  const streamType = detectStreamType(streamUrl);

  if (streamType === 'dash') {
    return initializeDASHPlayer(videoElement, streamUrl, onLoadCallback, onErrorCallback);
  } else if (streamType === 'hls') {
    return initializeHLSPlayer(videoElement, streamUrl, onLoadCallback, onErrorCallback);
  } else {
    // Native playback (for MP4, WebM, etc.)
    videoElement.src = streamUrl;
    videoElement.addEventListener('loadedmetadata', () => {
      videoElement.play().catch((e) => console.log('Autoplay prevented:', e));
      onLoadCallback?.();
    });
    return null;
  }
};

/**
 * Initialize DASH player
 * @param {HTMLVideoElement} videoElement - Video HTML element
 * @param {string} streamUrl - DASH stream URL
 * @param {Function} onLoadCallback - Callback when stream is ready
 * @param {Function} onErrorCallback - Callback on error
 * @returns {Object} - DASH.js player instance
 */
const initializeDASHPlayer = (videoElement, streamUrl, onLoadCallback, onErrorCallback) => {
  if (!videoElement || !streamUrl) return null;

  try {
    const player = dashjs.MediaPlayer().create();
    
    player.initialize(videoElement, streamUrl, false);
    
    // Event listeners
    player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
      videoElement.play().catch((e) => console.log('Autoplay prevented:', e));
      onLoadCallback?.();
    });

    player.on(dashjs.MediaPlayer.events.ERROR, (event) => {
      console.error('DASH player error:', event);
      onErrorCallback?.(event);
    });

    return player;
  } catch (error) {
    console.error('DASH player initialization error:', error);
    onErrorCallback?.(error);
    return null;
  }
};

/**
 * Initialize HLS player with optimized configuration
 * @param {HTMLVideoElement} videoElement - Video HTML element
 * @param {string} streamUrl - HLS stream URL
 * @param {Function} onLoadCallback - Callback when stream is ready
 * @param {Function} onErrorCallback - Callback on error
 * @returns {Hls|null} - HLS instance or null if not supported
 */
export const initializeHLSPlayer = (videoElement, streamUrl, onLoadCallback, onErrorCallback) => {
  if (!videoElement || !streamUrl) return null;

  // Check if browser supports HLS natively (Safari, iOS)
  if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
    videoElement.src = streamUrl;
    videoElement.addEventListener('loadedmetadata', () => {
      videoElement.play().catch((e) => console.log('Autoplay prevented:', e));
      onLoadCallback?.();
    });
    return null;
  }

  // Use HLS.js for other browsers
  if (!Hls.isSupported()) {
    onErrorCallback?.(ERROR_MESSAGES.BROWSER_UNSUPPORTED);
    return null;
  }

  const hls = new Hls(HLS_CONFIG);
  
  hls.loadSource(streamUrl);
  hls.attachMedia(videoElement);

  hls.on(Hls.Events.MANIFEST_PARSED, () => {
    videoElement.play().catch((e) => console.log('Autoplay prevented:', e));
    onLoadCallback?.();
  });

  // Robust Error Handling
  hls.on(Hls.Events.ERROR, (event, data) => {
    if (data.fatal) {
      switch (data.type) {
        case Hls.ErrorTypes.NETWORK_ERROR:
          console.error(ERROR_MESSAGES.NETWORK_ERROR);
          hls.startLoad();
          break;
        case Hls.ErrorTypes.MEDIA_ERROR:
          console.error(ERROR_MESSAGES.MEDIA_ERROR);
          hls.recoverMediaError();
          break;
        default:
          console.error(ERROR_MESSAGES.FATAL_ERROR);
          hls.destroy();
          onErrorCallback?.(ERROR_MESSAGES.FATAL_ERROR);
          break;
      }
    }
  });

  return hls;
};

/**
 * Destroy media player instance (HLS or DASH)
 * @param {Hls|dashjs.MediaPlayer|null} player - Player instance to destroy
 */
export const destroyMediaPlayer = (player) => {
  if (!player) return;
  
  try {
    // DASH.js player
    if (player.reset) {
      player.reset();
    }
    // HLS.js player
    else if (player.destroy) {
      player.destroy();
    }
  } catch (error) {
    console.error('Error destroying player:', error);
  }
};

/**
 * Destroy HLS player instance
 * @param {Hls} hls - HLS instance to destroy
 */
export const destroyHLSPlayer = (hls) => {
  if (hls) {
    hls.destroy();
  }
};
