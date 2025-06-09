import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="p-4 bg-rose-900/20 border border-rose-800 rounded-xl">
      <div className="flex items-start">
        <ExclamationTriangleIcon className="w-5 h-5 text-rose-500 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-rose-200 mb-2">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-sm font-medium text-rose-300 hover:text-rose-200 transition-colors"
            >
              다시 시도
            </button>
          )}
        </div>
      </div>
    </div>
  );
}; 