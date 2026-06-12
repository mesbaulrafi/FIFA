# AuraSports - Premium Live Sports Streaming App

A modern React application for streaming live sports content with HLS support, smooth scrolling, and a beautiful glassmorphic UI.

## Project Structure

```
src/
├── assets/                 # Static assets (images, icons, global CSS)
├── components/
│   ├── layout/             # Navigation, Footer, wrappers
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── RootLayouts.jsx
│   ├── player/             # VideoPlayer and controls
│   │   ├── VideoPlayer.jsx
│   │   └── PlayerControls.jsx
│   ├── ui/                 # Reusable glassmorphic cards, loaders
│   │   ├── Button.jsx
│   │   ├── Container.jsx
│   │   ├── Flex.jsx
│   │   ├── Images.jsx
│   │   ├── GridSkeleton.jsx
│   │   └── BentoCard.jsx
│   └── grid/               # Channel grid components
│       ├── ChannelGrid.jsx
│       └── BentoCard.jsx
├── hooks/                  # Custom hooks
│   └── useLenis.js         # Smooth scrolling hook
├── pages/                  # Route components
│   ├── Home.jsx
│   ├── About.jsx
│   └── Error.jsx
├── store/                  # Zustand state management
│   └── store.js
├── utils/                  # Utilities
│   ├── hlsConfig.js        # HLS player configuration
│   └── constants.js        # App constants
├── App.jsx                 # Router and App providers
├── main.jsx                # React DOM entry point
└── index.css               # Tailwind directives & base styles
```

## Features

- **Live Video Streaming**: HLS (HTTP Live Streaming) support with automatic quality selection
- **Responsive Design**: Glassmorphic UI with Tailwind CSS
- **Smooth Scrolling**: Integrated Lenis smooth scrolling library
- **Channel Grid**: Bento layout with multiple streaming channels
- **State Management**: Zustand for global state management
- **Error Handling**: Robust HLS error recovery
- **Lazy Loading**: Code splitting for optimized performance

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Linting

```bash
npm run lint
```

## Dependencies

- **React 19**: Latest React library
- **React Router DOM 7**: Routing
- **Tailwind CSS 4**: Utility-first CSS
- **Zustand**: State management
- **HLS.js**: HLS streaming support
- **Lenis**: Smooth scrolling
- **React Helmet**: Document head management
- **React Icons**: Icon library
- **Lucide**: Additional icons

## Key Components

### VideoPlayer
Main video player component with HLS support and automatic error recovery.

### ChannelGrid
Bento layout grid displaying multiple streaming channels with selection state.

### RootLayouts
Main layout wrapper with header, footer, and route outlet.

## State Management

The app uses Zustand for global state:
```javascript
- activeChannel: Current selected channel
- setActiveChannel: Update active channel
- isPlayerLoading: Player loading state
- setPlayerLoading: Update loading state
```

## Configuration

### HLS Configuration
Located in `src/utils/hlsConfig.js`:
- `maxBufferLength`: 30 seconds for live sports
- `enableWorker`: Enabled for better performance
- `lowLatencyMode`: True for reduced latency

## Browser Support

- Chrome/Edge (via HLS.js)
- Firefox (via HLS.js)
- Safari (native HLS support)
- iOS Safari (native HLS support)

## License

MIT
