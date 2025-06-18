export interface AudioUploadResponse {
  transcript: string;
  speakers: {
    speaker: string;
    text: string;
  }[];
}

export interface PronunciationDiff {
  user: string;
  expected: string;
  error: "insert" | "delete" | "substitute" | "s-swap" | "";
}

export interface PronunciationEvaluationResponse {
  score: number;
  user_pronunciation: string;
  target_pronunciation: string;
  diff: PronunciationDiff[];
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
  sentences: PronunciationSentence[];
  onEvaluate: (audioBlob: Blob, sentenceId: string) => Promise<PronunciationEvaluationResponse>;
} 