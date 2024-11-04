'use client';

import React from 'react';

interface ProgressBarProps {
  stepsCompleted: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ stepsCompleted, totalSteps }) => (
  <div className="flex items-center space-x-2 mb-6">
    {[...Array(totalSteps)].map((_, index) => (
      <div
        key={index}
        className={`h-1 flex-1 ${index < stepsCompleted ? 'bg-green-500' : 'bg-gray-200'}`}
      />
    ))}
  </div>
);

export default ProgressBar;
