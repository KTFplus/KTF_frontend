import { useState } from 'react';
import { PronunciationEvaluatorProps } from '@/types';
import { AudioRecorder } from '../audio/AudioRecorder';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { DocumentTextIcon } from '@heroicons/react/24/solid';

export const PronunciationEvaluator: React.FC<PronunciationEvaluatorProps> = ({
  sentences,
  onEvaluate,
}) => {
  const [selectedSentence, setSelectedSentence] = useState(sentences[0]);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const errorTypes = [
    { type: 's-insertion', label: 's-insertion' },
    { type: 's-deletion', label: 's-deletion' },
    { type: 's-substitution', label: 's-substitution' },
  ];

  const handleRecordingComplete = async (audioBlob: Blob) => {
    try {
      setIsEvaluating(true);
      await onEvaluate(audioBlob, selectedSentence.id);
    } catch (error) {
      console.error('Error evaluating pronunciation:', error);
      alert('발음 평가 중 오류가 발생했습니다.');
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 sm:mb-8">
        <label className="block mb-2 sm:mb-3 text-base sm:text-lg font-medium text-gray-200 flex items-center">
          <DocumentTextIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-gray-400" />
          평가할 문장 선택
        </label>
        <select
          value={selectedSentence.id}
          onChange={(e) => setSelectedSentence(sentences.find(s => s.id === e.target.value) || sentences[0])}
          className="w-full p-2.5 sm:p-3 text-base sm:text-lg bg-zinc-800/50 text-gray-200 border border-zinc-400/50 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 transition-all duration-200"
        >
          {sentences.map((sentence) => (
            <option key={sentence.id} value={sentence.id}>
              {sentence.text}
            </option>
          ))}
        </select>
      </div>

      <div className="p-4 sm:p-6 mb-6 sm:mb-8 bg-zinc-700/50 rounded-lg sm:rounded-xl border border-zinc-400/50">
        <h3 className="mb-2 text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wide flex items-center">
          <DocumentTextIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-400" />
          선택된 문장
        </h3>
        <p className="text-lg sm:text-xl text-gray-100">{selectedSentence.text}</p>
      </div>

      <div className="mb-6 sm:mb-8">
        <AudioRecorder onRecordingComplete={handleRecordingComplete} />
      </div>

      {isEvaluating && (
        <div className="mb-6 flex items-center justify-center p-3 sm:p-4 bg-zinc-800/50 rounded-lg sm:rounded-xl border border-zinc-400/50">
          <LoadingSpinner size="sm" className="mr-2 sm:mr-3" />
          <span className="text-sm sm:text-base text-gray-300 font-medium">발음을 평가하는 중입니다...</span>
        </div>
      )}
    </div>
  );
}; 