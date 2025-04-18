import React from 'react';
import { BarChart2 } from 'lucide-react';

interface StatsProps {
  games: number;
  wins: number;
  currentStreak: number;
  maxStreak: number;
  distribution: number[];
}

const Statistics: React.FC<StatsProps> = ({ 
  games, 
  wins, 
  currentStreak, 
  maxStreak,
  distribution
}) => {
  const maxInDistribution = Math.max(...distribution, 1);
  const winPercentage = games > 0 ? Math.round((wins / games) * 100) : 0;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-800">Statistics</h2>
        <BarChart2 className="h-5 w-5 text-slate-500" />
      </div>
      
      <div className="grid grid-cols-4 gap-2 mb-6">
        <div className="text-center">
          <p className="text-3xl font-bold text-slate-800">{games}</p>
          <p className="text-xs text-slate-500">Played</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-slate-800">{winPercentage}</p>
          <p className="text-xs text-slate-500">Win %</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-slate-800">{currentStreak}</p>
          <p className="text-xs text-slate-500">Current Streak</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-slate-800">{maxStreak}</p>
          <p className="text-xs text-slate-500">Max Streak</p>
        </div>
      </div>
      
      <h3 className="text-md font-semibold text-slate-700 mb-2">Guess Distribution</h3>
      <div className="space-y-1">
        {distribution.map((count, index) => (
          <div key={index} className="flex items-center">
            <div className="w-4 text-slate-500 font-medium">{index + 1}</div>
            <div 
              className={`h-5 ml-1 rounded ${count > 0 ? 'bg-emerald-500' : 'bg-slate-200'} transition-all`}
              style={{ width: `${Math.max((count / maxInDistribution) * 100, 4)}%` }}
            >
              <span className="px-1 text-white text-xs">{count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;