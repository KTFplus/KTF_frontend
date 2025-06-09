interface TranscriptViewerProps {
  transcript: string;
  speakers: string[];
}

export const TranscriptViewer = ({ transcript, speakers }: TranscriptViewerProps) => {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
        <p className="text-lg text-gray-200 whitespace-pre-wrap">{transcript}</p>
      </div>
      
      {speakers.length > 0 && (
        <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
          <h3 className="text-sm font-medium text-gray-400 uppercase mb-3">화자 구분</h3>
          <div className="space-y-2">
            {speakers.map((speaker, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-gray-300 text-sm">
                  {index + 1}
                </span>
                <span className="text-gray-300">{speaker}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 