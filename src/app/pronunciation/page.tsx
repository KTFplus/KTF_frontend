'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PronunciationEvaluator } from '@/components/pronunciation/PronunciationEvaluator';
import { evaluatePronunciation } from '@/lib/api';

export default function PronunciationPage() {
  const [sentences] = useState([
    { id: '1', text: '안녕하세요, 만나서 반갑습니다.' },
    { id: '2', text: '오늘 날씨가 참 좋네요.' },
    { id: '3', text: '한국어 공부가 재미있어요.' },
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
            <span className="text-xl mr-2">⬅️</span>
            메인으로 돌아가기
          </Link>
        </div>

        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            <span className="text-gray-100">
              발음 평가 연습 🎯
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            아래의 문장들을 선택하여 발음을 연습하고 평가받을 수 있습니다 ✨
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