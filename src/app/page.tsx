'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SpeakerWaveIcon, DocumentTextIcon, AcademicCapIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import { AudioRecorder } from '@/components/audio/AudioRecorder';
import { AudioUploader } from '@/components/audio/AudioUploader';
import { AudioPlayer } from '@/components/audio/AudioPlayer';
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
    // Implement retry logic here
  };

  const resetToInput = () => {
    setAudioUrl(null);
    setTranscriptResult(null);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-zinc-900">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-12 text-4xl font-bold text-center tracking-tight">
          <span className="text-gray-100">
            KTF: Korean Transcriber+ for Foreign learners
          </span>
        </h1>

        {!transcriptResult ? (
          // 음성 입력 화면
          <div className="p-8 bg-zinc-800/50 rounded-2xl shadow-lg border border-zinc-400/50 hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-100 flex items-center">
                <SpeakerWaveIcon className="w-6 h-6 mr-3 text-gray-400" />
                음성 입력
              </h2>
              <Link
                href="/pronunciation"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#4A5BC5] rounded-xl hover:bg-[#4A5BC5]/80 focus:outline-none focus:ring-2 focus:ring-[#4A5BC5] focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <AcademicCapIcon className="w-5 h-5 mr-2 text-white" />
                발음 평가
              </Link>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-400/50">
                <AudioUploader onFileSelect={handleAudioInput} />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 text-sm text-gray-400 bg-zinc-800/50">or</span>
              </div>
              <AudioRecorder onRecordingComplete={handleAudioInput} />
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
              <div className="mt-6 p-4 sm:p-6 bg-zinc-300 rounded-xl border border-zinc-400/50">
                <AudioPlayer audioUrl={audioUrl} />
              </div>
            )}
          </div>
        ) : (
          // 결과 확인 화면
          <div className="p-8 bg-zinc-800/50 rounded-2xl shadow-lg border border-zinc-400/50 hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-100 flex items-center">
                <DocumentTextIcon className="w-6 h-6 mr-3 text-gray-400" />
                분석 결과
              </h2>
              <button
                onClick={resetToInput}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-zinc-700 rounded-xl hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2 text-gray-400" />
                다시 입력하기
              </button>
            </div>

            {audioUrl && (
              <div className="mb-6 p-4 sm:p-6 bg-zinc-300 rounded-xl border border-zinc-400/50">
                <AudioPlayer audioUrl={audioUrl} />
              </div>
            )}

            <TranscriptViewer
              transcript={transcriptResult.transcript}
              speakers={transcriptResult.speakers}
            />
          </div>
        )}
      </div>
    </main>
  );
}
