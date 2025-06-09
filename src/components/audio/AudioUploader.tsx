import { useState, useRef } from 'react';
import { DocumentArrowUpIcon } from '@heroicons/react/24/outline';

interface AudioUploaderProps {
  onFileSelect: (file: File) => void;
  accept?: string;
}

export const AudioUploader: React.FC<AudioUploaderProps> = ({
  onFileSelect,
  accept = 'audio/*',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('audio/')) {
      onFileSelect(files[0]);
    } else {
      alert('오디오 파일만 업로드할 수 있습니다.');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300
        ${isDragging 
          ? 'border-zinc-500 bg-zinc-900/50 scale-102' 
          : 'border-gray-700 hover:border-zinc-500 hover:bg-zinc-900/30'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleButtonClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />
      <span className="text-4xl mb-4 block">📂</span>
      <p className="text-lg font-medium text-gray-200 mb-2">
        클릭하거나 파일을 드래그하여 업로드
      </p>
      <p className="text-sm text-gray-400">
        지원 형식: WAV, MP3 ✨
      </p>
    </div>
  );
}; 