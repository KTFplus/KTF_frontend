import React from 'react';
import { PronunciationEvaluationResponse } from '@/types';
import { 
  ExclamationCircleIcon, 
  PlusCircleIcon, 
  MinusCircleIcon, 
  ArrowPathIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

interface PronunciationResultProps {
  result: PronunciationEvaluationResponse;
}

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-500';
  if (score >= 60) return 'text-yellow-500';
  return 'text-red-500';
};

const getErrorIcon = (error: string) => {
  switch (error) {
    case 'insert':
      return <PlusCircleIcon className="w-5 h-5 text-red-500" />;
    case 'delete':
      return <MinusCircleIcon className="w-5 h-5 text-red-500" />;
    case 'substitute':
      return <ExclamationCircleIcon className="w-5 h-5 text-red-500" />;
    case 's-swap':
      return <ArrowPathIcon className="w-5 h-5 text-red-500" />;
    default:
      return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
  }
};

const getErrorText = (error: string) => {
  switch (error) {
    case 'insert':
      return '불필요한 음절 추가';
    case 'delete':
      return '음절 누락';
    case 'substitute':
      return '다른 음으로 대체';
    case 's-swap':
      return '음절 순서 변경';
    default:
      return '정확한 발음';
  }
};

export const PronunciationResult: React.FC<PronunciationResultProps> = ({ result }) => {
  const { score, user_pronunciation, target_pronunciation, diff } = result;
  const scoreColor = getScoreColor(score);

  return (
    <div className="w-full space-y-6">
      {/* 점수 표시 */}
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-700"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
            <circle
              className={scoreColor}
              strokeWidth="10"
              strokeDasharray={`${score * 2.51} 251`}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-4xl font-bold ${scoreColor}`}>{score}</span>
          </div>
        </div>
      </div>

      {/* 발음 비교 섹션 */}
      <div className="space-y-4">
        <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-400/50">
          <h3 className="mb-2 text-sm font-medium text-gray-300">발음 비교</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">사용자 발음:</span>
              <span className="text-sm text-gray-200">{user_pronunciation}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">정답 발음:</span>
              <span className="text-sm text-gray-200">{target_pronunciation}</span>
            </div>
          </div>
        </div>

        {/* 오류 분석 섹션 */}
        <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-400/50">
          <h3 className="mb-2 text-sm font-medium text-gray-300">오류 분석</h3>
          <div className="space-y-3">
            {diff.map((item, index) => {
              if (!item.error) return null;
              return (
                <div key={index} className="flex items-start gap-3 p-3 bg-zinc-700/50 rounded-lg">
                  {getErrorIcon(item.error)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-200">{getErrorText(item.error)}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">잘못된 발음:</span>
                        <span className="text-xs text-red-400">{item.user}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">정답 발음:</span>
                        <span className="text-xs text-green-400">{item.expected}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}; 