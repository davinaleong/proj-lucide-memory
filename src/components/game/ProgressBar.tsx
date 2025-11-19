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
          <span className="text-sm font-montserrat font-medium text-dark-blue">
            {label}
          </span>
          <span className="text-sm font-montserrat text-blue">
            {current}/{total}
          </span>
        </div>
      )}
      
      <div className="w-full bg-slate-200 rounded-full h-3 border-2 border-blue shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-blue via-sky-blue to-orange rounded-full transition-all duration-500 ease-out shadow-lg"
          style={{ width: `${percentage}%` }}
        >
          <div className="h-full bg-gradient-to-r from-transparent to-white opacity-30 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <div className="mt-1 text-center">
        <span className="text-xs font-montserrat text-blue">
          {percentage.toFixed(0)}% Complete
        </span>
      </div>
    </div>
  );
};