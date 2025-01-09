"use client";

import { useState } from "react";

interface LiveMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  score: {
    home: number;
    away: number;
  };
  minute: number;
  events: {
    minute: number;
    type: "goal" | "card" | "substitution";
    description: string;
  }[];
}

export default function LiveMatchesPage() {
  const [liveMatches] = useState<LiveMatch[]>([
    {
      id: "1",
      homeTeam: "Team A",
      awayTeam: "Team B",
      score: { home: 2, away: 1 },
      minute: 67,
      events: [
        { minute: 23, type: "goal", description: "Goal by Player X (Team A)" },
        { minute: 45, type: "goal", description: "Goal by Player Y (Team B)" },
        { minute: 56, type: "goal", description: "Goal by Player Z (Team A)" },
      ],
    },
  ]);

  return (
    <>
      {/* Live Match Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#1E1E2D] p-6 rounded-lg">
          <h3 className="text-gray-400 mb-4">Total Goals</h3>
          <div className="text-2xl text-white font-bold">7</div>
        </div>

        <div className="bg-[#1E1E2D] p-6 rounded-lg">
          <h3 className="text-gray-400 mb-4">Active Matches</h3>
          <div className="text-2xl text-white font-bold">3</div>
        </div>

        <div className="bg-[#1E1E2D] p-6 rounded-lg">
          <h3 className="text-gray-400 mb-4">Average Goals</h3>
          <div className="text-2xl text-white font-bold">2.3</div>
        </div>
      </div>

      {/* Live Matches */}
      <div className="bg-[#1E1E2D] rounded-lg p-6">
        <h2 className="text-xl text-white font-semibold mb-6">Live Matches</h2>
        <div className="space-y-6">
          {liveMatches.map((match) => (
            <div
              key={match.id}
              className="border border-gray-700 rounded-lg p-6 hover:bg-[#2B2B40] transition-colors"
            >
              {/* Match Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 animate-pulse">
                    LIVE
                  </span>
                  <span className="text-green-500">{match.minute}&apos;</span>
                </div>
              </div>

              {/* Score */}
              <div className="flex justify-between items-center mb-8">
                <div className="text-center flex-1">
                  <div className="text-white font-bold text-xl mb-2">{match.homeTeam}</div>
                  <div className="text-gray-400">Home</div>
                </div>
                <div className="text-4xl font-bold text-white px-8">
                  {match.score.home} - {match.score.away}
                </div>
                <div className="text-center flex-1">
                  <div className="text-white font-bold text-xl mb-2">{match.awayTeam}</div>
                  <div className="text-gray-400">Away</div>
                </div>
              </div>

              {/* Match Events */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold">Match Events</h3>
                <div className="space-y-2">
                  {match.events.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 text-gray-400"
                    >
                      <span className="text-sm">{event.minute}&apos;</span>
                      <div className={`w-2 h-2 rounded-full ${
                        event.type === "goal"
                          ? "bg-green-500"
                          : event.type === "card"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                      }`} />
                      <span>{event.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          {liveMatches.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No live matches at the moment
            </div>
          )}
        </div>
      </div>
    </>
  );
}
