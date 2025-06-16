import { useState } from 'react';
import { AudioRecorder } from '@/components/audio/AudioRecorder';
import { evaluatePronunciation } from '@/lib/api';

export const PronunciationEvaluator = () => {
  const [result, setResult] = useState<{
    score: number;
    feedback: string;
    transcript: string;
  } | null>(null);

  const handleRecordingComplete = async (audioBlob: Blob) => {
    try {
      const sentenceId = '대학교 가는 거 걱정해요';
      const userId = 'test';

      const response = await evaluatePronunciation(audioBlob, sentenceId, userId);
      setResult(response);
    } catch (error) {
      console.error('발음 평가 실패:', error);
      alert('발음 평가에 실패했습니다.');
    }
  };

  return (
    <div className="space-y-4 text-center">
      <AudioRecorder onRecordingComplete={handleRecordingComplete} />

      {result && (
        <div className="mt-6 space-y-2 bg-gray-100 rounded-xl p-4 shadow-md">
          <p><strong>🎯 발음 점수:</strong> {result.score}</p>
          <p><strong>🧠 피드백:</strong> {result.feedback}</p>
          <p><strong>🗣️ 인식 결과:</strong> {result.transcript}</p>
        </div>
      )}
    </div>
  );
};
