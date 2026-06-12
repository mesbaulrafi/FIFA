// HLS Configuration for video streaming
export const HLS_CONFIG = {
  maxBufferLength: 30, // Optimized for live sports
  enableWorker: true,
  lowLatencyMode: true,
  backBufferLength: 90,
  fragLoadingMaxRetry: 6,
  manifestLoadingMaxRetry: 3,
  levelLoadingMaxRetry: 4
};

// Stream quality levels
export const QUALITY_LEVELS = {
  AUTO: 'auto',
  HD: 'hd',
  SD: 'sd',
  MOBILE: 'mobile'
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error encountered, trying to recover...',
  MEDIA_ERROR: 'Media error encountered, trying to recover...',
  FATAL_ERROR: 'Unrecoverable fatal error, destroying player.',
  BROWSER_UNSUPPORTED: 'Your browser does not support HLS streaming.'
};

// API Endpoints (if needed)
export const API_ENDPOINTS = {
  CHANNELS: '/api/channels',
  STREAMS: '/api/streams',
  SCHEDULE: '/api/schedule'
};
