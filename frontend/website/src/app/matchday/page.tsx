"use client";

import { useState } from "react";

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  status: "upcoming" | "live" | "finished";
  score?: {
    home: number;
    away: number;
  };
}

export default function MatchdayPage() {
  const [matches] = useState<Match[]>([
    {
      id: "1",
      homeTeam: "Team A",
      awayTeam: "Team B",
      date: "2024-01-09",
      status: "upcoming",
    },
    {
      id: "2",
      homeTeam: "Team C",
      awayTeam: "Team D",
      date: "2024-01-09",
      status: "live",
      score: { home: 2, away: 1 },
    },
  ]);

  return (
    <>
      {/* Match Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#1E1E2D] p-6 rounded-lg">
          <h3 className="text-gray-400 mb-4">Today&apos;s Matches</h3>
          <div className="text-2xl text-white font-bold">4</div>
        </div>

        <div className="bg-[#1E1E2D] p-6 rounded-lg">
          <h3 className="text-gray-400 mb-4">Live Matches</h3>
          <div className="text-2xl text-white font-bold">2</div>
        </div>

        <div className="bg-[#1E1E2D] p-6 rounded-lg">
          <h3 className="text-gray-400 mb-4">Upcoming Matches</h3>
          <div className="text-2xl text-white font-bold">6</div>
        </div>
      </div>

      {/* Match List */}
      <div className="bg-[#1E1E2D] rounded-lg p-6">
        <h2 className="text-xl text-white font-semibold mb-6">Match Schedule</h2>
        <div className="grid gap-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className="border border-gray-700 rounded-lg p-4 hover:bg-[#2B2B40] transition-colors"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400 text-sm">{match.date}</span>
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      match.status === 'live' 
                        ? 'bg-green-500/10 text-green-500' 
                        : match.status === 'finished'
                        ? 'bg-gray-500/10 text-gray-400'
                        : 'bg-purple-500/10 text-purple-500'
                    }`}>
                      {match.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-white">
                    <span className="font-semibold">{match.homeTeam}</span>
                    <div className="px-4 font-bold">
                      {match.score ? `${match.score.home} - ${match.score.away}` : 'vs'}
                    </div>
                    <span className="font-semibold">{match.awayTeam}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
