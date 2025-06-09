import React from 'react';

interface TranscriptViewerProps {
  transcript: string;
  speakers: string[];
}

export const TranscriptViewer: React.FC<TranscriptViewerProps> = ({
  transcript,
  speakers,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
          화자 목록
        </h3>
        <div className="flex flex-wrap gap-2">
          {speakers.map((speaker, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm font-medium text-gray-200 bg-gray-700/50 rounded-full border border-gray-600"
            >
              {speaker}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
          전사 결과
        </h3>
        <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
          <p className="text-gray-200 whitespace-pre-wrap">{transcript}</p>
        </div>
      </div>
    </div>
  );
}; 