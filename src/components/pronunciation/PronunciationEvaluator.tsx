import { useState } from 'react';More actions
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
      <div className="mb-8">
        <label className="block mb-3 text-lg font-medium text-gray-200 flex items-center">
          <DocumentTextIcon className="w-6 h-6 mr-3 text-gray-400" />
          평가할 문장 선택
        </label>
        <select
          value={selectedSentence.id}
          onChange={(e) => setSelectedSentence(sentences.find(s => s.id === e.target.value) || sentences[0])}
          className="w-full p-3 text-lg bg-gray-900/50 text-gray-200 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 transition-all duration-200"
        >
          {sentences.map((sentence) => (
            <option key={sentence.id} value={sentence.id}>
              {sentence.text}
            </option>
          ))}
        </select>
      </div>

      <div className="p-6 mb-8 bg-zinc-900/30 rounded-xl border border-zinc-800">
        <h3 className="mb-2 text-sm font-medium text-gray-400 uppercase tracking-wide flex items-center">
          <DocumentTextIcon className="w-5 h-5 mr-2 text-gray-400" />
          선택된 문장
        </h3>
        <p className="text-xl text-gray-100">{selectedSentence.text}</p>
      </div>

      <div className="mb-8">
        <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700">
          <h3 className="mb-4 text-sm font-medium text-gray-300 uppercase tracking-wide flex items-center">
            <MicrophoneIcon className="w-5 h-5 mr-2 text-gray-400" />
            음성 녹음
          </h3>
          <AudioRecorder onRecordingComplete={handleRecordingComplete} />
        </div>
      </div>

      {isEvaluating && (
        <div className="mb-6 flex items-center justify-center p-4 bg-zinc-900/30 rounded-xl border border-zinc-800">
          <LoadingSpinner size="sm" className="mr-3" />
          <span className="text-gray-300 font-medium">발음을 평가하는 중입니다...</span>
        </div>
      )}

      {result && (
        <div className="p-6 bg-zinc-900/30 rounded-xl border border-zinc-800">
          <h3 className="mb-4 text-sm font-medium text-gray-300 uppercase tracking-wide flex items-center">
            <ChartBarIcon className="w-5 h-5 mr-2 text-gray-400" />
            평가 결과
          </h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-gray-300 font-medium mr-3">점수:</span>
              <span className="text-2xl font-bold text-gray-100">{result.score}점</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-300 font-medium mr-3">피드백:</span>
              <span className={`text-lg font-semibold ${getFeedbackColor(result.feedback)} px-4 py-1.5 bg-gray-900/50 rounded-full border border-gray-700`}>
                {result.feedback}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
