
import React from 'react';

const ChristmasDecor: React.FC = () => {
  return (
    <>
      {/* Top Left Branch */}
      <div className="fixed top-0 left-0 w-32 md:w-48 pointer-events-none z-10 opacity-80">
        <svg viewBox="0 0 100 100" fill="currentColor" className="text-green-800">
           <path d="M0,0 Q30,10 50,50 Q10,30 0,0" />
           <circle cx="20" cy="20" r="4" className="text-red-600" />
           <circle cx="40" cy="35" r="3" className="text-red-500" />
        </svg>
      </div>
      {/* Top Right Branch */}
      <div className="fixed top-0 right-0 w-32 md:w-48 pointer-events-none z-10 opacity-80 scale-x-[-1]">
        <svg viewBox="0 0 100 100" fill="currentColor" className="text-green-800">
           <path d="M0,0 Q30,10 50,50 Q10,30 0,0" />
           <circle cx="20" cy="20" r="4" className="text-red-600" />
           <circle cx="40" cy="35" r="3" className="text-red-500" />
        </svg>
      </div>
      {/* Bottom Garland */}
      <div className="fixed bottom-0 left-0 w-full h-12 bg-gradient-to-t from-green-900 to-transparent opacity-50 z-10"></div>
    </>
  );
};

export default ChristmasDecor;
