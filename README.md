# KTF: Korean Transcriber+ for Foreign learners

## 1. Frontend Overview

KTF Frontend is a web application that provides Korean pronunciation evaluation and speech recognition functionality. Users can record audio or upload audio files to receive pronunciation evaluations and view speech recognition results.

## 2. Technology Stack

### Core Framework
- **Next.js 15.3.3**: React-based full-stack framework
- **React 19.0.0**: User interface library
- **TypeScript 5**: Static type checking for code stability

### UI/UX Libraries
- **Tailwind CSS 4**: Utility-first CSS framework
- **Headless UI 2.2.4**: Accessibility-focused UI components
- **Heroicons 2.2.0**: SVG icon library

### Audio Processing
- **WaveSurfer.js 7.9.5**: Audio waveform visualization
- **react-use-audio-player 4.0.2**: Audio playback management

### File Handling
- **react-dropzone 14.3.8**: Drag-and-drop file upload

### HTTP Client
- **Axios 1.9.0**: HTTP request library

### Development Tools
- **ESLint 9**: Code quality management
- **Turbopack**: Fast development server

## 3. Frontend Architecture

```
ktf_front/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Main page (Speech Recognition)
│   │   ├── pronunciation/     # Pronunciation evaluation page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   ├── audio/            # Audio-related components
│   │   │   ├── AudioPlayer.tsx
│   │   │   ├── AudioRecorder.tsx
│   │   │   ├── AudioUploader.tsx
│   │   │   └── TranscriptViewer.tsx
│   │   ├── pronunciation/    # Pronunciation evaluation components
│   │   │   ├── PronunciationEvaluator.tsx
│   │   │   └── PronunciationResult.tsx
│   │   └── ui/               # Common UI components
│   │       └── LoadingSpinner.tsx
│   ├── lib/                  # Utilities and API
│   │   └── api.ts           # API communication functions
│   └── types/               # TypeScript type definitions
│       └── index.ts
├── public/                  # Static files
├── package.json            # Project dependencies
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── next.config.ts         # Next.js configuration
```

## 4. Core Features

### Speech Recognition (Speech-to-Text)
- **Real-time Voice Recording**: Voice recording using browser's MediaRecorder API
- **File Upload**: Drag-and-drop audio file upload system
- **Speaker Separation**: Display speech recognition results separated by speakers
- **Full Script View**: Complete conversation content through popup modal

### Pronunciation Evaluation
- **Sentence Selection**: Choose from predefined Korean sentences
- **Real-time Recording**: Record pronunciation for selected sentences
- **Pronounciation Evaluation**: Pronunciation accuracy evaluation through backend API
- **Result Visualization**: Intuitive display of scores and feedback

### User Interface
- **Responsive Design**: Optimized layout for all screen sizes
- **Dark Theme**: Eye-friendly dark color scheme
- **Loading States**: Loading spinners for user feedback

## 5. API Endpoints

### Speech Recognition API

#### POST `/upload-audio`
**Purpose**: Upload audio file and perform speech recognition
```typescript
// Request
FormData {
  audio: File | Blob,
  userId: string
}

// Response
interface AudioUploadResponse {
  transcript: string;
  speakers: {
    speaker: string;
    text: string;
  }[];
}
```

### Pronunciation Evaluation API

#### GET `/pronunciation-sentences`
**Purpose**: Retrieve list of sentences for pronunciation evaluation
```typescript
// Response
interface PronunciationSentence[] {
  id: string;
  text: string;
}
```

#### POST `/pronunciation-evaluate`
**Purpose**: Execute pronunciation evaluation
```typescript
// Request
FormData {
  audio: File | Blob,
  sentenceId: string,
  userId: string
}

// Response
interface PronunciationEvaluationResponse {
  score: number;
  user_pronunciation: string;
  target_pronunciation: string;
  diff: PronunciationDiff[];
}
```

## 6. Component Design

### AudioRecorder Component
**Purpose**: Provide real-time voice recording functionality

**Key Features**:
- Browser-based recording using MediaRecorder API
- UI changes based on recording state (button text, icon changes)
- Callback function execution upon recording completion

**Design Principles**:
- Single Responsibility Principle: Focus only on recording functionality
- Reusability: Can be used across various pages
- Accessibility: Keyboard navigation support

### AudioUploader Component
**Purpose**: Drag-and-drop file upload system

**Key Features**:
- Intuitive file upload using react-dropzone
- Visual feedback based on drag state
- File type and size validation

**Design Principles**:
- User Experience First: Intuitive interface
- Error Handling: Clear feedback for incorrect file types
- Responsive: Optimized for various screen sizes

### TranscriptViewer Component
**Purpose**: Display speech recognition results

**Key Features**:
- Speaker-separated conversations with color coding
- Full script popup modal
- Responsive layout

**Design Principles**:
- Information Hierarchy: Display important information first
- Visual Distinction: Color differentiation by speaker

### PronunciationEvaluator Component
**Purpose**: Provide pronunciation evaluation functionality

**Key Features**:
- Sentence selection dropdown
- Real-time recording and evaluation
- Result display

**Design Principles**:
- Step-by-step Process: Clear user flow
- Feedback: Status display for each step
- Error Handling: Network errors and recording failure handling

## 7. State Management

### Local State Management
- **useState**: Component-level local state management
- **useEffect**: Side effect handling (API calls, event listeners)

### State Structure
```typescript
// Main page state
interface MainPageState {
  audioUrl: string | null;
  transcript: string | null;
  speakers: Speaker[];
  isLoading: boolean;
  error: string | null;
}

// Pronunciation evaluation page state
interface PronunciationPageState {
  selectedSentence: PronunciationSentence;
  isEvaluating: boolean;
  evaluationResult: PronunciationEvaluationResponse | null;
}
```

## 8. Deployment and Environment Configuration

### Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Build Process
```bash
npm run build  # Production build
npm run start  # Production server execution
npm run dev    # Development server execution
```

### Deployment Platform
- **Vercel**: Next.js optimized deployment platform



