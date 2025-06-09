export interface AudioUploadResponse {
  transcript: string;
  speakers: string[];
}

export interface PronunciationEvaluationResponse {
  score: number;
  feedback: "상" | "중" | "하";
}

export interface PronunciationSentence {
  id: string;
  text: string;
}

export interface AudioRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
}

export interface AudioPlayerProps {
  audioUrl: string;
  onPlaybackComplete?: () => void;
}

export interface TranscriptViewerProps {
  transcript: string;
  speakers: {
    speaker: string;
    text: string;
  }[];
}

export interface PronunciationEvaluatorProps {
  sentences: Array<{
    id: string;
    text: string;
  }>;
  onEvaluate: (audioBlob: Blob, sentenceId: string) => Promise<{
    score: number;
    feedback: string;
  }>;
} 