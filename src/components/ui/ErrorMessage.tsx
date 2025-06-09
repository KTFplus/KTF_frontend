import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="p-4 bg-rose-900/30 rounded-xl border border-rose-800/50">
      <div className="flex items-start">
        <ExclamationCircleIcon className="w-5 h-5 text-rose-400 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-rose-200">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 px-4 py-2 text-sm font-medium text-rose-200 bg-rose-900/50 rounded-lg hover:bg-rose-800/50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              다시 시도
            </button>
          )}
        </div>
      </div>
    </div>
  );
}; 