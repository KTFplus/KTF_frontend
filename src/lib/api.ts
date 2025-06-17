import axios from 'axios';
import { AudioUploadResponse, PronunciationEvaluationResponse, PronunciationSentence } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ktf-backend.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const uploadAudio = async (audioFile: File | Blob, userId: string): Promise<AudioUploadResponse> => {
  const formData = new FormData();
  formData.append('audio', audioFile);
  formData.append('userId', userId);

  const response = await api.post<AudioUploadResponse>('/pronunciation-evaluate', formData);
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
  formData.append('sentenceId', sentenceId.toString());
  formData.append('userId', 'test-users');

  const response = await api.post<PronunciationEvaluationResponse>('/pronunciation-evaluate', formData);
  return response.data;
}; 
