// BentoCard component for reusable card layout
import React from 'react';

const BentoCard = ({ 
  title, 
  category, 
  gradient, 
  size, 
  isActive, 
  onClick, 
  children 
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${size} group relative flex flex-col justify-end p-6 text-left
        rounded-2xl border transition-all duration-300 overflow-hidden
        ${isActive 
          ? 'border-indigo-500 shadow-[0_0_30px_rgba(79,70,229,0.2)] scale-[1.02] z-10' 
          : 'border-white/10 hover:border-white/30 hover:bg-white/5'
        }
        bg-white/5 backdrop-blur-lg
      `}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50 group-hover:opacity-80 transition-opacity z-0`}></div>
      
      {/* Content */}
      <div className="relative z-10">
        {category && (
          <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-white bg-black/40 border border-white/10 rounded-full backdrop-blur-sm">
            {category}
          </span>
        )}
        <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
          {title}
        </h3>
        {children}
      </div>
    </button>
  );
};

export default BentoCard;
