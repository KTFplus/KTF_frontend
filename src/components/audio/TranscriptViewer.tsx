import React, { useState } from 'react';
import { TranscriptViewerProps } from '@/types';
import { XMarkIcon } from '@heroicons/react/24/outline';

type Speaker = {
  speaker: string;
  text: string;
};

export const TranscriptViewer: React.FC<TranscriptViewerProps> = ({ transcript, speakers }) => {
  const [isFullTranscriptOpen, setIsFullTranscriptOpen] = useState(false);
  
  const speakerColors: Record<string, string> = {
    A: 'bg-sky-900/30 border-sky-300',
    B: 'bg-teal-900/30 border-teal-400',
    C: 'bg-rose-900/30 border-rose-400',
    D: 'bg-violet-900/30 border-violet-400',
  };

  return (
    <div className="w-full space-y-4">
      <div className="p-4 sm:p-6 bg-zinc-800/30 rounded-xl border border-zinc-300/30">
        <h3 className="mb-4 text-sm sm:text-base font-medium text-gray-300 uppercase tracking-wide">
          화자별 대화
        </h3>
        <div className="space-y-3">
          {speakers.map((item: Speaker, index: number) => {
            const colorClass = speakerColors[item.speaker] || 'bg-zinc-800/50 border-zinc-400/50';
            
            return (
              <div
                key={index}
                className={`p-3 sm:p-4 border-l-4 rounded-lg ${colorClass}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm sm:text-base font-medium text-gray-200">화자 {item.speaker}</span>
                </div>
                <p className="text-sm sm:text-base text-gray-300">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => setIsFullTranscriptOpen(true)}
        className="w-full p-3 sm:p-4 text-center text-sm sm:text-base text-gray-300 bg-zinc-700/50 hover:bg-zinc-700/70 rounded-xl border border-zinc-400/50 transition-all duration-200"
      >
        전체 스크립트 보기
      </button>

      {isFullTranscriptOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm rounded-2xl" />
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-800/90 rounded-2xl shadow-2xl border border-zinc-400/50 overflow-hidden">
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-zinc-400/50 bg-zinc-900/80 backdrop-blur-sm">
              <h3 className="text-lg font-medium text-gray-100">전체 스크립트</h3>
              <button
                onClick={() => setIsFullTranscriptOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-4rem)]">
              <div className="prose prose-invert max-w-none text-gray-100">
                {transcript}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 