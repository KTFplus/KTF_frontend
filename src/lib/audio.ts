import { uploadAudio } from './api';

export const handleAudioInput = async (input: Blob | File) => {
  // Create object URL for audio playback
  const audioUrl = URL.createObjectURL(input);

  // Upload audio for transcription
  const transcriptResult = await uploadAudio(input, 'test-user');

  return {
    audioUrl,
    transcriptResult,
  };
}; 