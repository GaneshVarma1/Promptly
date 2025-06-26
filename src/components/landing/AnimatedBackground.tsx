import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-white dark:bg-slate-950">
      {/* Completely solid background - no gradients or transparency */}
      <div className="absolute inset-0 bg-white dark:bg-slate-950" />
    </div>
  );
};

export default AnimatedBackground; 