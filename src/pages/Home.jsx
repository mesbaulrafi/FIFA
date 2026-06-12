import React from 'react';
import { Helmet } from 'react-helmet-async';
import Sidebar from '../components/layout/Sidebar';
import ChannelBrowser from '../components/grid/ChannelBrowser';
import VideoPlayer from '../components/player/VideoPlayer';
import useStore from '../store/store';

const Home = () => {
  const { isPlayerLoading } = useStore();

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-purple-950/10 to-black text-slate-100 font-sans selection:bg-indigo-500/30">
      <Helmet>
        <title>Live Sports | Premium Streaming</title>
        <meta name="description" content="Watch live sports streaming with MR Prime." />
      </Helmet>

      {/* Top Bar */}
      <div className="bg-black/40 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="max-w-full mx-auto">
          <h1 className="text-3xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">
            MR Prime.
          </h1>
        </div>
      </div>

      {/* Video Player Section - TOP */}
      <div className="bg-linear-to-br from-black/20 to-black/40 backdrop-blur-xl p-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <VideoPlayer />
          </div>
          {isPlayerLoading && (
            <div className="mt-4 text-center text-white/50 text-sm">Loading stream...</div>
          )}
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content - Channel Browser */}
        <ChannelBrowser />
      </div>
    </div>
  );
};

export default Home;
