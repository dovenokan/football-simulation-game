'use client';

import { useState, useEffect, useCallback } from 'react';

interface MatchEvent {
  time: number;
  type: 'goal' | 'card' | 'substitution' | 'commentary';
  team?: 'home' | 'away';
  player?: string;
  description: string;
}

export default function MatchSimulationPage() {
  const [matchTime, setMatchTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [events, setEvents] = useState<MatchEvent[]>([]);
  const [score, setScore] = useState({ home: 0, away: 0 });
  const [stats, setStats] = useState({
    possession: { home: 50, away: 50 },
    shots: { home: 0, away: 0 },
    shotsOnTarget: { home: 0, away: 0 },
    corners: { home: 0, away: 0 },
    fouls: { home: 0, away: 0 },
  });

  const generateRandomEvent = useCallback(() => {
    const eventTypes: ('goal' | 'card' | 'substitution' | 'commentary')[] = ['goal', 'card', 'substitution', 'commentary'];
    const teams: ('home' | 'away')[] = ['home', 'away'];
    const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const randomTeam = teams[Math.floor(Math.random() * teams.length)];

    const newEvent: MatchEvent = {
      time: matchTime,
      type: randomType,
      team: randomType !== 'commentary' ? randomTeam : undefined,
      player: randomType !== 'commentary' ? 'Player Name' : undefined,
      description: getEventDescription(randomType, randomTeam),
    };

    if (randomType === 'goal') {
      setScore(prev => ({
        ...prev,
        [randomTeam]: prev[randomTeam] + 1,
      }));
      
      // Update shots and shots on target for the scoring team
      setStats(prev => ({
        ...prev,
        shots: {
          ...prev.shots,
          [randomTeam]: prev.shots[randomTeam] + 1,
        },
        shotsOnTarget: {
          ...prev.shotsOnTarget,
          [randomTeam]: prev.shotsOnTarget[randomTeam] + 1,
        },
      }));
    } else if (randomType === 'card') {
      // Update fouls for the carded team
      setStats(prev => ({
        ...prev,
        fouls: {
          ...prev.fouls,
          [randomTeam]: prev.fouls[randomTeam] + 1,
        },
      }));
    }

    setEvents(prev => [...prev, newEvent]);
  }, [matchTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && matchTime < 90) {
      interval = setInterval(() => {
        setMatchTime(prev => {
          const newTime = prev + 1;
          if (newTime >= 90) {
            setIsPlaying(false);
          }
          return newTime;
        });
        
        // Simulate random events
        if (Math.random() < 0.1) {
          generateRandomEvent();
        }

        // Update possession randomly
        setStats(prev => {
          const homePossession = Math.max(30, Math.min(70, prev.possession.home + (Math.random() - 0.5) * 2));
          return {
            ...prev,
            possession: {
              home: homePossession,
              away: 100 - homePossession,
            },
          };
        });
      }, 1000 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, matchTime, generateRandomEvent]);

  const getEventDescription = (type: string, team?: 'home' | 'away') => {
    const teamName = team === 'home' ? 'Manchester United' : 'Chelsea';
    switch (type) {
      case 'goal':
        return `GOAL! ${teamName} scores!`;
      case 'card':
        return `Yellow card shown to ${teamName} player`;
      case 'substitution':
        return `Substitution for ${teamName}`;
      case 'commentary':
        return 'The match continues with both teams looking for an opening';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        {/* Match Header */}
        <div className="text-center space-y-4">
          <div className="text-sm text-gray-500">Premier League - Match Day 24</div>
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2"></div>
              <div className="font-medium">Man United</div>
            </div>
            <div className="text-4xl font-bold">
              {score.home} - {score.away}
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2"></div>
              <div className="font-medium">Chelsea</div>
            </div>
          </div>
          <div className="text-2xl font-bold">{matchTime}&apos;</div>
        </div>

        {/* Match Controls */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 rounded-md ${
              isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
            } text-white`}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="px-4 py-2 rounded-md border border-gray-300"
          >
            <option value={1}>1x Speed</option>
            <option value={2}>2x Speed</option>
            <option value={4}>4x Speed</option>
          </select>
        </div>
      </div>

      {/* Match Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Match Statistics</h2>
          <div className="space-y-4">
            {Object.entries(stats).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{value.home}</span>
                  <span className="capitalize">{key}</span>
                  <span>{value.away}</span>
                </div>
                <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600"
                    style={{ width: `${value.home}%` }}
                  />
                  <div
                    className="bg-red-600"
                    style={{ width: `${value.away}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Match Events */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Match Events</h2>
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {events.map((event, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  event.type === 'goal'
                    ? 'bg-green-50'
                    : event.type === 'card'
                    ? 'bg-yellow-50'
                    : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{event.time}&apos;</span>
                  <span className="text-sm">{event.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
