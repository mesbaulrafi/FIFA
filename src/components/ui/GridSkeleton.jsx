import React from 'react';

const GridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[200px] gap-4 animate-pulse">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="bg-white/5 border border-white/5 rounded-2xl col-span-1"></div>
    ))}
  </div>
);

export default GridSkeleton;
