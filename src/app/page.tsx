'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MicrophoneIcon } from '@heroicons/react/24/solid';
import { AudioRecorder } from '@/components/audio/AudioRecorder';
import { AudioPlayer } from '@/components/audio/AudioPlayer';
import { AudioUploader } from '@/components/audio/AudioUploader';
import { TranscriptViewer } from '@/components/audio/TranscriptViewer';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { uploadAudio } from '@/lib/api';
import { AudioUploadResponse } from '@/types';

export default function Home() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcriptResult, setTranscriptResult] = useState<AudioUploadResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAudioInput = async (input: Blob | File) => {
    try {
      setIsLoading(true);
      setError(null);

      // Create object URL for audio playback
      const url = URL.createObjectURL(input);
      setAudioUrl(url);

      // Upload audio for transcription
      const result = await uploadAudio(input, 'test-user');
      setTranscriptResult(result);
    } catch (error) {
      console.error('Error processing audio:', error);
      setError('오디오 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const retryLastOperation = () => {
    setError(null);
    // 여기에 마지막 작업을 다시 시도하는 로직을 추가할 수 있습니다.
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-12 text-4xl font-bold text-center tracking-tight">
          <span className="text-gray-100">
            한국어 학습 도우미 ✨
          </span>
        </h1>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <div className="md:col-span-2">
            <div className="p-8 bg-gray-800/50 rounded-2xl shadow-lg border border-gray-700 hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm">
              <h2 className="mb-6 text-2xl font-semibold text-gray-100 flex items-center">
                <span className="text-2xl mr-3">🎙️</span>
                음성 입력
              </h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                  <AudioUploader onFileSelect={handleAudioInput} />
                </div>
                
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 text-sm text-gray-400 bg-gray-800">또는</span>
                  </div>
                </div>

                <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                  <AudioRecorder onRecordingComplete={handleAudioInput} />
                </div>
              </div>

              {isLoading && (
                <div className="flex justify-center mt-6">
                  <LoadingSpinner />
                </div>
              )}

              {error && (
                <div className="mt-6">
                  <ErrorMessage message={error} onRetry={retryLastOperation} />
                </div>
              )}

              {audioUrl && !isLoading && (
                <div className="mt-6 p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                  <AudioPlayer audioUrl={audioUrl} />
                </div>
              )}
            </div>
          </div>

          {transcriptResult && (
            <div className="md:col-span-2">
              <div className="p-8 bg-gray-800/50 rounded-2xl shadow-lg border border-gray-700 hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm">
                <h2 className="mb-6 text-2xl font-semibold text-gray-100 flex items-center">
                  <span className="text-2xl mr-3">📝</span>
                  분석 결과
                </h2>
                <TranscriptViewer
                  transcript={transcriptResult.transcript}
                  speakers={transcriptResult.speakers}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <Link
            href="/pronunciation"
            className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-zinc-800 rounded-xl hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span className="text-2xl mr-3">🎯</span>
            발음 평가 시작하기
          </Link>
        </div>
      </div>
    </main>
  );
}
