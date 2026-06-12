import Hls from 'hls.js';
import { HLS_CONFIG, ERROR_MESSAGES } from './constants';

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
 * Destroy HLS player instance
 * @param {Hls} hls - HLS instance to destroy
 */
export const destroyHLSPlayer = (hls) => {
  if (hls) {
    hls.destroy();
  }
};
