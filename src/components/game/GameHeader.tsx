import React from 'react';
import { Clock, Target, MousePointer, Trophy } from 'lucide-react';

interface GameHeaderProps {
  level: number;
  score: number;
  moves: number;
  timeElapsed: number;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  level,
  score,
  moves,
  timeElapsed
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const statItems = [
    { icon: Target, label: 'Level', value: level.toString() },
    { icon: Trophy, label: 'Score', value: score.toLocaleString() },
    { icon: MousePointer, label: 'Moves', value: moves.toString() },
    { icon: Clock, label: 'Time', value: formatTime(timeElapsed) }
  ];

  return (
    <div className="bg-white border-b-2 border-black p-2 sm:p-4">
      <div className="">
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          {statItems.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center space-x-1 sm:space-x-2 bg-gray-100 rounded-lg p-2 sm:p-3">
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
              <div>
                <div className="text-xs font-montserrat text-gray-600 uppercase tracking-wide">
                  {label}
                </div>
                <div className="text-sm sm:text-lg font-montserrat font-bold text-black">
                  {value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};