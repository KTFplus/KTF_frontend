import { TranscriptViewerProps } from '@/types';

export const TranscriptViewer: React.FC<TranscriptViewerProps> = ({ transcript, speakers }) => {
  const speakerColors = {
    A: 'bg-blue-100 border-blue-500',
    B: 'bg-green-100 border-green-500',
    C: 'bg-yellow-100 border-yellow-500',
    D: 'bg-purple-100 border-purple-500',
  };

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="mb-2 text-lg font-semibold">전체 스크립트</h3>
        <p className="text-gray-700">{transcript}</p>
      </div>

      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="mb-4 text-lg font-semibold">화자별 대화</h3>
        <div className="space-y-3">
          {speakers.map((item, index) => {
            const colorClass = speakerColors[item.speaker as keyof typeof speakerColors] || 'bg-gray-100 border-gray-500';
            
            return (
              <div
                key={index}
                className={`p-3 border-l-4 rounded ${colorClass}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">화자 {item.speaker}</span>
                </div>
                <p className="text-gray-700">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}; 