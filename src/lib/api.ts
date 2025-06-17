import axios from 'axios';
import {
  AudioUploadResponse,
  PronunciationEvaluationResponse,
  PronunciationSentence
} from '@/types';

// ✅ 환경변수 또는 기본 도메인 사용
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ktf-flask.onrender.com';
console.log("✅ API BASE:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const uploadAudio = async (
  audioFile: File | Blob,
  userId: string
): Promise<AudioUploadResponse> => {
  const formData = new FormData();
  formData.append('audio', audioFile);
  formData.append('userId', userId);

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
  formData.append('sentenceId', sentenceId);
  formData.append('userId', userId);

  console.log("🚀 evaluatePronunciation payload:", Array.from(formData.entries()));

  const response = await api.post<PronunciationEvaluationResponse>(
  'pronunciation-evaluate',
  formData  
  );
  return response.data;
};
