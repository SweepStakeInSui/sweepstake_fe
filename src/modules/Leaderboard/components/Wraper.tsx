import React from 'react';

interface WraperProps {
  children: React.ReactNode;
}

const Wraper: React.FC<WraperProps> = ({ children }) => {
  return (
    <div className="p-2 rounded-sm bg-bg-surface shadow-leaderboard-shadow">
      {children}
    </div>
  );
};

export default Wraper;
