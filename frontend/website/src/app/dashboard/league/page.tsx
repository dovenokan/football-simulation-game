export default function LeaguePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">League Overview</h1>

      {/* League Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">League Table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  P
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  W
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  D
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  L
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GF
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GD
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pts
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leagueTable.map((team) => (
                <tr
                  key={team.position}
                  className={`hover:bg-gray-50 ${
                    team.name === "Manchester United" ? "bg-green-50" : ""
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {team.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {team.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {team.played}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {team.won}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {team.drawn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {team.lost}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {team.goalsFor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {team.goalsAgainst}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {team.goalDifference}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {team.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Fixtures */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Upcoming Fixtures
        </h2>
        <div className="space-y-4">
          {fixtures.map((fixture) => (
            <div
              key={fixture.id}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Matchday {fixture.matchday}
                </div>
                <div className="text-sm text-gray-500">{fixture.date}</div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">{fixture.homeTeam}</span>
                  <span className="text-gray-500">vs</span>
                  <span className="font-medium">{fixture.awayTeam}</span>
                </div>
                <div className="text-sm text-gray-500">{fixture.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Scorers</h3>
          <div className="space-y-4">
            {topScorers.map((player, index) => (
              <div
                key={player.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-500 w-6">
                    {index + 1}.
                  </span>
                  <span className="text-sm font-medium">{player.name}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({player.team})
                  </span>
                </div>
                <span className="text-sm font-medium">{player.goals}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Assists</h3>
          <div className="space-y-4">
            {topAssists.map((player, index) => (
              <div
                key={player.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-500 w-6">
                    {index + 1}.
                  </span>
                  <span className="text-sm font-medium">{player.name}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({player.team})
                  </span>
                </div>
                <span className="text-sm font-medium">{player.assists}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Clean Sheets</h3>
          <div className="space-y-4">
            {cleanSheets.map((player, index) => (
              <div
                key={player.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-500 w-6">
                    {index + 1}.
                  </span>
                  <span className="text-sm font-medium">{player.name}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({player.team})
                  </span>
                </div>
                <span className="text-sm font-medium">{player.cleanSheets}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const leagueTable = [
  {
    position: 1,
    name: "Manchester City",
    played: 23,
    won: 18,
    drawn: 3,
    lost: 2,
    goalsFor: 45,
    goalsAgainst: 18,
    goalDifference: 27,
    points: 57,
  },
  {
    position: 2,
    name: "Liverpool",
    played: 23,
    won: 16,
    drawn: 5,
    lost: 2,
    goalsFor: 48,
    goalsAgainst: 22,
    goalDifference: 26,
    points: 53,
  },
  {
    position: 3,
    name: "Manchester United",
    played: 23,
    won: 15,
    drawn: 5,
    lost: 3,
    goalsFor: 45,
    goalsAgainst: 20,
    goalDifference: 25,
    points: 50,
  },
  // Add more teams
];

const fixtures = [
  {
    id: 1,
    matchday: 24,
    date: "2024-02-03",
    time: "15:00",
    homeTeam: "Manchester United",
    awayTeam: "Chelsea",
  },
  {
    id: 2,
    matchday: 24,
    date: "2024-02-03",
    time: "17:30",
    homeTeam: "Liverpool",
    awayTeam: "Arsenal",
  },
  // Add more fixtures
];

const topScorers = [
  {
    id: 1,
    name: "Erling Haaland",
    team: "Man City",
    goals: 21,
  },
  {
    id: 2,
    name: "Mohamed Salah",
    team: "Liverpool",
    goals: 18,
  },
  // Add more players
];

const topAssists = [
  {
    id: 1,
    name: "Kevin De Bruyne",
    team: "Man City",
    assists: 15,
  },
  {
    id: 2,
    name: "Bruno Fernandes",
    team: "Man United",
    assists: 12,
  },
  // Add more players
];

const cleanSheets = [
  {
    id: 1,
    name: "Alisson",
    team: "Liverpool",
    cleanSheets: 12,
  },
  {
    id: 2,
    name: "Ederson",
    team: "Man City",
    cleanSheets: 11,
  },
  // Add more players
];
