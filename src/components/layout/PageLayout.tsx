import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  variant?: 'centered' | 'fullscreen';
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  variant = 'centered',
  className = ''
}) => {
  if (variant === 'fullscreen') {
    return (
      <div className={`min-h-screen w-full bg-white flex flex-col ${className}`}>
        {children}
      </div>
    );
  }

  // Centered variant for welcome and dashboard pages
  // Background fills entire viewport, content is centered within
  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 ${className}`} 
         style={{
           background: 'linear-gradient(135deg, #F1F5F9 0%, #e2e8f0 100%)'
         }}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-4 sm:p-8 border-2 border-blue backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
};