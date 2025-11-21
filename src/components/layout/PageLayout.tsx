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
      <div className={`app-container ${className}`}>
        <div className="content-container-fullscreen">
          {children}
        </div>
      </div>
    );
  }

  // Centered variant for welcome and dashboard pages
  // Uses flexible container system that adjusts to any width
  return (
    <div className={`app-container p-[1em] ${className}`}>
      <div className="content-container-centered">
        {children}
      </div>
    </div>
  );
};