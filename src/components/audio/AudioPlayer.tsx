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
    <div className="w-full max-w-2xl p-4 bg-white rounded-lg shadow">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={togglePlayPause}
          className="flex items-center justify-center w-10 h-10 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isPlaying ? (
            <PauseIcon className="w-5 h-5" />
          ) : (
            <PlayIcon className="w-5 h-5" />
          )}
        </button>
      </div>
      <div ref={waveformRef} className="w-full" />
    </div>
  );
}; 