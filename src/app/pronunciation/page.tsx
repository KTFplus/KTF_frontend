'use client';

import React, { useState, useRef } from 'react';

export default function PronunciationPage() {
  const [recording, setRecording] = useState(false);
  const [result, setResult] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunksRef.current.push(e.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const formData = new FormData();
      formData.append('audio', audioBlob);

      try {
        const response = await fetch('https://f15f-34-16-173-13.ngrok-free.app/api/evaluate', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        setResult(data.result || '결과 없음');
      } catch (err) {
        console.error(err);
        setResult('에러 발생');
      }
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">발음 평가</h1>
      <button
        onClick={recording ? stopRecording : startRecording}
        className={`px-6 py-3 rounded-md text-white font-semibold ${
          recording ? 'bg-red-600' : 'bg-blue-600'
        }`}
      >
        {recording ? '녹음 종료' : '녹음 시작'}
      </button>

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h2 className="font-semibold">결과:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
