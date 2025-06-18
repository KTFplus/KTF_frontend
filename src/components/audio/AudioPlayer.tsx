import { useEffect, useRef, useState } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import WaveSurfer from 'wavesurfer.js';
import { AudioPlayerProps } from '@/types';

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, onPlaybackComplete }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (waveformRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4B5563',
        progressColor: '#2563EB',
        cursorColor: '#1D4ED8',
        barWidth: 2,
        barRadius: 3,
        height: 60,
        normalize: true,
      });

      wavesurferRef.current.load(audioUrl);

      wavesurferRef.current.on('finish', () => {
        setIsPlaying(false);
        if (onPlaybackComplete) {
          onPlaybackComplete();
        }
      });

      return () => {
        if (wavesurferRef.current) {
          wavesurferRef.current.destroy();
        }
      };
    }
  }, [audioUrl, onPlaybackComplete]);

  const togglePlayPause = () => {
    if (wavesurferRef.current) {
      if (isPlaying) {
        wavesurferRef.current.pause();
      } else {
        wavesurferRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={togglePlayPause}
          className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-white bg-blue-800 rounded-full hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200"
        >
          {isPlaying ? (
            <PauseIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </button>
      </div>
      <div ref={waveformRef} className="w-full overflow-hidden" />
    </div>
  );
}; 