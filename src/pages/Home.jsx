import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import VideoPlayer from '../components/player/VideoPlayer';
import GridSkeleton from '../components/ui/GridSkeleton';
import { useLenis } from '../hooks/useLenis';

// Lazy load the Bento Grid to prioritize loading the Hero/Video Player first
const ChannelGrid = lazy(() => import('../components/grid/ChannelGrid'));

const Home = () => {
  // Initialize Lenis Smooth Scrolling
  useLenis();

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-indigo-500/30">
      <Helmet>
        <title>Live Sports | Premium Streaming</title>
        <meta name="description" content="Watch live sports in HD with our buttery smooth streaming app." />
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Header Section */}
        <header className="flex items-center justify-between py-4">
          <h1 className="text-3xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            AuraSports.
          </h1>
          <nav className="flex gap-4">
            <button className="px-5 py-2 text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all">
              Schedule
            </button>
            <button className="px-5 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-full transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)]">
              Sign In
            </button>
          </nav>
        </header>

        {/* Hero / Active Player Section */}
        <section className="w-full">
          <VideoPlayer />
        </section>

        {/* Bento Grid Section with Suspense */}
        <section className="pb-24">
          <h2 className="text-2xl font-bold mb-6 tracking-tight text-white/90">Live Channels</h2>
          <Suspense fallback={<GridSkeleton />}>
            <ChannelGrid />
          </Suspense>
        </section>
      </main>
    </div>
  );
};

export default Home;
