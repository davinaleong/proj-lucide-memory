import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = ''
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-gradient-to-br from-white via-slate to-slate-200 rounded-sm shadow-2xl w-full max-w-sm sm:max-w-md mx-4 border-2 border-blue backdrop-blur-sm max-h-[90vh] overflow-hidden flex flex-col ${className}`}>
        {/* Header */}
        {title && (
          <div className="text-center p-3 sm:p-4 border-b-2 border-blue bg-gradient-to-r from-slate to-white rounded-t-xl flex-shrink-0">
            <h3 className="text-lg font-montserrat font-bold bg-gradient-to-r from-blue to-dark-blue bg-clip-text text-transparent truncate">{title}</h3>
          </div>
        )}
        
        {/* Content */}
        <div className="p-3 sm:p-4 overflow-y-auto flex-1 min-h-0">
          {children}
        </div>
      </div>
    </div>
  );
};