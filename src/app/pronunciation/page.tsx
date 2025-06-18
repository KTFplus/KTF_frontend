'use client';

import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { PronunciationEvaluator } from '@/components/pronunciation/PronunciationEvaluator';
import { PronunciationResult } from '@/components/pronunciation/PronunciationResult';
import { PronunciationEvaluationResponse } from '@/types';
import { evaluatePronunciation } from '@/lib/api';

export default function PronunciationPage() {
  const [sentences] = useState([
    { id: '1', text: '오늘은 날씨가 아주 맑아요.' },
    { id: '2', text: '저는 한국어를 배우고 있습니다.' },
    { id: '3', text: '학교에 가는 길에 친구를 만났어요.' },
    { id: '4', text: '사과와 바나나를 샀습니다.' },
    { id: '5', text: '내일 같이 점심 먹을까요?' },
    { id: '6', text: '저녁에 공원에서 산책했어요.' },
    { id: '7', text: '책상 위에 연필이 있어요.' },
    { id: '8', text: '내일은 중요한 시험이 있습니다.' },
    { id: '9', text: '머리가 아파서 병원에 왔어요.' },
    { id: '10', text: '지하철을 타고 회사에 갑니다.' },
  ]);

  const [evaluationResult, setEvaluationResult] = useState<PronunciationEvaluationResponse | null>(null);

  const handleEvaluate = async (audioBlob: Blob, sentenceId: string) => {
    try {
      const result = await evaluatePronunciation(audioBlob, sentenceId, 'test-user');
      setEvaluationResult(result);
      return result;
    } catch (error) {
      console.error('Error evaluating pronunciation:', error);
      throw error;
    }
  };

  return (
    <main className="min-h-screen bg-zinc-900">
      <div className="container mx-auto max-w-4xl px-4 py-6 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <Link
            href="/"
            className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base text-gray-300 hover:text-white bg-zinc-800/50 rounded-lg shadow-sm hover:shadow transition-all duration-300 border border-zinc-400/50"
          >
            <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-400" />
            메인으로 돌아가기
          </Link>
        </div>

        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
            <span className="text-gray-100">
              발음 평가
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-4">
            아래의 문장들을 선택하여 발음을 연습하고 평가받을 수 있습니다
          </p>
        </div>

        <div className="bg-zinc-800/50 rounded-xl sm:rounded-2xl shadow-lg border border-zinc-400/50 hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm p-4 sm:p-8">
          <PronunciationEvaluator
            sentences={sentences}
            onEvaluate={handleEvaluate}
          />
        </div>

        {evaluationResult && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-white mb-4">평가 결과</h2>
            <PronunciationResult result={evaluationResult} />
          </div>
        )}
      </div>
    </main>
  );
} 