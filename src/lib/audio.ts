import { uploadAudio } from './api';
import { AudioUploadResponse } from '@/types';

export const handleAudioInput = async (input: Blob | File): Promise<{
  audioUrl: string;
  transcriptResult: AudioUploadResponse;
}> => {
  try {
    // Create object URL for audio playback
    const audioUrl = URL.createObjectURL(input);

    // Upload audio for transcription
    const transcriptResult = await uploadAudio(input, 'test-user');

    return {
      audioUrl,
      transcriptResult,
    };
  } catch (error) {
    console.error('Error handling audio input:', error);
    throw error;
  }
}; 