import { useState } from 'react';
import { PronunciationEvaluatorProps } from '@/types';
import { AudioRecorder } from '../audio/AudioRecorder';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { DocumentTextIcon, MicrophoneIcon, ChartBarIcon } from '@heroicons/react/24/solid';

export const PronunciationEvaluator: React.FC<PronunciationEvaluatorProps> = ({
  sentences,
  onEvaluate,
}) => {
  const [selectedSentence, setSelectedSentence] = useState(sentences[0]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<{ score: number; feedback: string } | null>(null);

  const handleRecordingComplete = async (audioBlob: Blob) => {
    console.log("🎙️ 오디오 Blob 크기:", audioBlob.size);  // ← 추가
    if (audioBlob.size === 0) {
      alert("❗ 녹음된 오디오가 없습니다. 마이크 권한을 확인해주세요.");
      return;
    }
    try {
      setIsEvaluating(true);
      const evaluationResult = await onEvaluate(audioBlob, selectedSentence.id);
      setResult(evaluationResult);
    } catch (error) {
      console.error('Error evaluating pronunciation:', error);
      alert('발음 평가 중 오류가 발생했습니다.');
    } finally {
      setIsEvaluating(false);
    }
  };

  const getFeedbackColor = (feedback: string) => {
    switch (feedback) {
      case '상':
        return 'text-emerald-400';
      case '중':
        return 'text-amber-400';
      case '하':
        return 'text-rose-400';
      default:
        return 'text-gray-400';
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
          className="w-full p-2.5 sm:p-3 text-base sm:text-lg bg-gray-900/50 text-gray-200 border border-gray-700 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 transition-all duration-200"
        >
          {sentences.map((sentence) => (
            <option key={sentence.id} value={sentence.id}>
              {sentence.text}
            </option>
          ))}
        </select>
      </div>

      <div className="p-4 sm:p-6 mb-6 sm:mb-8 bg-zinc-900/30 rounded-lg sm:rounded-xl border border-zinc-800">
        <h3 className="mb-2 text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wide flex items-center">
          <DocumentTextIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-400" />
          선택된 문장
        </h3>
        <p className="text-lg sm:text-xl text-gray-100">{selectedSentence.text}</p>
      </div>

      <div className="mb-6 sm:mb-8">
        <div className="p-4 sm:p-6 bg-gray-900/50 rounded-lg sm:rounded-xl border border-gray-700">
          <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wide flex items-center">
            <MicrophoneIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-400" />
            음성 녹음
          </h3>
          <AudioRecorder onRecordingComplete={handleRecordingComplete} />
        </div>
      </div>

      {isEvaluating && (
        <div className="mb-6 flex items-center justify-center p-3 sm:p-4 bg-zinc-900/30 rounded-lg sm:rounded-xl border border-zinc-800">
          <LoadingSpinner size="sm" className="mr-2 sm:mr-3" />
          <span className="text-sm sm:text-base text-gray-300 font-medium">발음을 평가하는 중입니다...</span>
        </div>
      )}

      {result && (
        <div className="p-4 sm:p-6 bg-zinc-900/30 rounded-lg sm:rounded-xl border border-zinc-800">
          <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wide flex items-center">
            <ChartBarIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-400" />
            평가 결과
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center">
              <span className="text-sm sm:text-base text-gray-300 font-medium mr-2 sm:mr-3">점수:</span>
              <span className="text-xl sm:text-2xl font-bold text-gray-100">{result.score}점</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm sm:text-base text-gray-300 font-medium mr-2 sm:mr-3">피드백:</span>
              <span className={`text-base sm:text-lg font-semibold ${getFeedbackColor(result.feedback)} px-3 sm:px-4 py-1 sm:py-1.5 bg-gray-900/50 rounded-full border border-gray-700`}>
                {result.feedback}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 
