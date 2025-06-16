'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { PronunciationEvaluator } from '@/components/pronunciation/PronunciationEvaluator';
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

  const handleEvaluate = async (audioBlob: Blob, sentenceId: string) => {
    try {
      const result = await evaluatePronunciation(audioBlob, sentenceId, 'test-user');
      return result;
    } catch (error) {
      console.error('Error evaluating pronunciation:', error);
      throw error;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 text-gray-300 hover:text-white bg-zinc-800/50 rounded-lg shadow-sm hover:shadow transition-all duration-300 border border-gray-700"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2 text-gray-400" />
            메인으로 돌아가기
          </Link>
        </div>

        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            <span className="text-gray-100">
              발음 평가
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            아래의 문장들을 선택하여 발음을 연습하고 평가받을 수 있습니다
          </p>
        </div>

        <div className="bg-gray-800/50 rounded-2xl shadow-lg border border-gray-700 hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm p-8">
          <PronunciationEvaluator
            sentences={sentences}
            onEvaluate={handleEvaluate}
          />
        </div>
      </div>
    </main>
  );
} 