import axios from 'axios';
import { AudioUploadResponse, PronunciationEvaluationResponse, PronunciationSentence } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export interface AudioUploadResponse {
  transcript: string;
  speakers: string[];
}

export const uploadAudio = async (
  audioData: Blob | File,
  userId: string
): Promise<AudioUploadResponse> => {
  try {
    const formData = new FormData();
    formData.append('audio', audioData);
    formData.append('userId', userId);

    const response = await fetch('/api/upload-audio', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload audio');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading audio:', error);
    throw error;
  }
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
  formData.append('sentence_id', sentenceId);
  formData.append('user_id', userId);

  const response = await api.post<PronunciationEvaluationResponse>('/pronunciation-evaluate', formData);
  return response.data;
}; 