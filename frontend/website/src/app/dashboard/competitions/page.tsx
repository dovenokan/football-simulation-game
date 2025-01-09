'use client';

export default function CompetitionsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-[#1E1E2D] rounded-lg p-6">
        <h2 className="text-xl text-white font-semibold mb-6">Competitions</h2>

        {/* Active Competitions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            { name: 'Premier League', position: '6th', points: '34' },
            { name: 'FA Cup', stage: 'Round of 16' },
            { name: 'Carabao Cup', stage: 'Quarter Finals' },
          ].map((competition) => (
            <div key={competition.name} className="bg-[#151521] p-4 rounded-lg">
              <h3 className="text-white mb-3">{competition.name}</h3>
              {competition.position ? (
                <div className="flex justify-between text-gray-400">
                  <span>Position</span>
                  <span>{competition.position}</span>
                </div>
              ) : (
                <div className="flex justify-between text-gray-400">
                  <span>Stage</span>
                  <span>{competition.stage}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* League Table */}
        <div className="bg-[#151521] rounded-lg p-4 mb-6">
          <h3 className="text-white mb-4">Premier League Table</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-gray-400 border-b border-gray-700">
                <tr>
                  <th className="p-4">Pos</th>
                  <th className="p-4">Team</th>
                  <th className="p-4">P</th>
                  <th className="p-4">W</th>
                  <th className="p-4">D</th>
                  <th className="p-4">L</th>
                  <th className="p-4">GD</th>
                  <th className="p-4">Pts</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[1, 2, 3, 4, 5].map((pos) => (
                  <tr key={pos} className="border-b border-gray-700">
                    <td className="p-4">{pos}</td>
                    <td className="p-4">Team Name</td>
                    <td className="p-4">20</td>
                    <td className="p-4">12</td>
                    <td className="p-4">5</td>
                    <td className="p-4">3</td>
                    <td className="p-4">+15</td>
                    <td className="p-4">41</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Results */}
        <div className="bg-[#151521] rounded-lg p-4">
          <h3 className="text-white mb-4">Recent Results</h3>
          <div className="space-y-4">
            {[
              { home: 'Brighton', homeScore: 2, away: 'Arsenal', awayScore: 1 },
              { home: 'Liverpool', homeScore: 1, away: 'Brighton', awayScore: 1 },
              { home: 'Brighton', homeScore: 3, away: 'Chelsea', awayScore: 0 },
            ].map((result, index) => (
              <div key={index} className="p-4 bg-[#1E1E2D] rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-white">{result.home}</span>
                  <span className="text-xl text-white font-bold mx-4">
                    {result.homeScore} - {result.awayScore}
                  </span>
                  <span className="text-white">{result.away}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
