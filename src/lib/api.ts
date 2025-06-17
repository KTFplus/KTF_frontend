import axios from 'axios';
import { AudioUploadResponse, PronunciationEvaluationResponse, PronunciationSentence } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://wise-positively-octopus.ngrok-free.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const uploadAudio = async (audioFile: File | Blob, userId: string): Promise<AudioUploadResponse> => {
  const formData = new FormData();
  formData.append('audio', audioFile);
  formData.append('user_id', userId);  // ✅ snake_case로 수정

  const response = await api.post<AudioUploadResponse>('/upload-audio', formData);
  return response.data;
};

export const getPronunciationSentences = async (): Promise<PronunciationSentence[]> => {
  const response = await api.get<PronunciationSentence[]>('/pronunciation-sentences');
  return response.data;
};

export const evaluatePronunciation = async (
  audioFile: File | Blob,
  sentenceId: string,
  userId: string
): Promise<PronunciationEvaluationResponse> => {
  const formData = new FormData();
  formData.append('audio', audioFile);
  formData.append('sentence_id', sentenceId);  // ✅ snake_case로 수정
  formData.append('user_id', userId);          // ✅ snake_case로 수정
  console.log("🚨 DEBUG KEYS:", Array.from(formData.keys()));

  // ✅ Flask의 실제 엔드포인트와 일치
  const response = await api.post<PronunciationEvaluationResponse>('/api/pronunciation-evaluate', formData);

  return response.data;
};
