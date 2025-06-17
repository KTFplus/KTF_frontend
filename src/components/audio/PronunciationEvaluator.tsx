import { useState } from 'react';
import { AudioRecorder } from '@/components/audio/AudioRecorder';
import { evaluatePronunciation } from '@/lib/api';

// 문장 ID와 실제 문장 텍스트 매핑
const sentences = {
  "1": "안녕하세요",
  "2": "저는 한국어를 배우고 있습니다.",
  "3": "학교에 가는 길에 친구를 만났어요.",
  "4": "사과와 바나나를 샀습니다.",
  "5": "내일 같이 점심 먹을까요?",
  "6": "저녁에 공원에서 산책했어요.",
  "7": "책상 위에 연필이 있어요.",
  "8": "내일은 중요한 시험이 있습니다.",
  "9": "머리가 아파서 병원에 왔어요.",
  "10": "지하철을 타고 회사에 갑니다."
};

export const PronunciationEvaluator = () => {
  const [selectedId, setSelectedId] = useState('1');
  const [result, setResult] = useState<{
    score: number;
    feedback: string;
    user_pronunciation: string;
    target_pronunciation: string;
    diff: { user: string; expected: string; error: string }[];
    userId: string;
  } | null>(null);

  const handleRecordingComplete = async (audioBlob: Blob) => {
    try {
      const userId = 'test-user';
      const response = await evaluatePronunciation(audioBlob, selectedId, userId);
      setResult(response);
    } catch (error) {
      console.error('발음 평가 실패:', error);
      alert('발음 평가에 실패했습니다.');
    }
  };

  return (
    <div className="space-y-6 text-center">
      <div>
        <label htmlFor="sentence" className="font-semibold">🔤 평가할 문장을 선택하세요:</label>
        <select
          id="sentence"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="ml-2 px-3 py-1 border rounded"
        >
          {Object.entries(sentences).map(([id, text]) => (
            <option key={id} value={id}>{text}</option>
          ))}
        </select>
      </div>

      <AudioRecorder onRecordingComplete={handleRecordingComplete} />

      {result && (
        <div className="mt-6 space-y-2 bg-gray-100 rounded-xl p-4 shadow-md text-left max-w-xl mx-auto">
          <p><strong>🎯 발음 점수:</strong> {result.score}점</p>
          <p><strong>🧠 피드백:</strong> {result.feedback}</p>
          <p><strong>🗣️ 사용자의 발음:</strong> {result.user_pronunciation}</p>
          <p><strong>✅ 목표 발음:</strong> {result.target_pronunciation}</p>

          <div className="mt-3">
            <strong>❗발음 차이:</strong>
            {result.diff.length > 0 ? (
              <ul className="list-disc list-inside ml-4 mt-1">
                {result.diff.map((d, idx) => (
                  <li key={idx}>
                    <span className="font-medium text-red-600">{d.user}</span> → <span className="text-green-700">{d.expected}</span> ({d.error})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-green-700">오차 없이 완벽한 발음입니다!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
