import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  label,
  className = ''
}) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-montserrat font-medium text-black">
            {label}
          </span>
          <span className="text-sm font-montserrat text-gray-600">
            {current}/{total}
          </span>
        </div>
      )}
      
      <div className="w-full bg-gray-200 rounded-full h-3 border border-gray-300">
        <div
          className="h-full bg-black rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        >
          <div className="h-full bg-gradient-to-r from-transparent to-white opacity-20 rounded-full"></div>
        </div>
      </div>
      
      <div className="mt-1 text-center">
        <span className="text-xs font-montserrat text-gray-500">
          {percentage.toFixed(0)}% Complete
        </span>
      </div>
    </div>
  );
};