export default function MatchesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Match Center</h1>

      {/* Next Match */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Next Match</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-sm text-gray-500">Premier League - Matchday 24</div>
            <div className="flex items-center justify-between w-full max-w-md">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mb-2"></div>
                <div className="text-lg font-medium">Man United</div>
              </div>
              <div className="text-2xl font-bold text-gray-400">VS</div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mb-2"></div>
                <div className="text-lg font-medium">Chelsea</div>
              </div>
            </div>
            <div className="text-sm text-gray-500">Saturday, 15:00</div>
            <button className="bg-green-600 text-white px-8 py-2 rounded-md hover:bg-green-700">
              Play Match
            </button>
          </div>
        </div>
      </div>

      {/* Match History */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Match History</h2>
        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">{match.competition}</div>
                <div className="text-sm text-gray-500">{match.date}</div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">{match.homeTeam}</span>
                  <span className={`font-bold ${getScoreColor(match)}`}>
                    {match.homeScore} - {match.awayScore}
                  </span>
                  <span className="font-medium">{match.awayTeam}</span>
                </div>
                <button className="text-blue-600 hover:text-blue-700">
                  Match Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Season Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Season Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Matches Played</span>
              <span className="text-sm font-medium">23</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Wins</span>
              <span className="text-sm font-medium">15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Draws</span>
              <span className="text-sm font-medium">5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Losses</span>
              <span className="text-sm font-medium">3</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Goal Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Goals Scored</span>
              <span className="text-sm font-medium">45</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Goals Conceded</span>
              <span className="text-sm font-medium">20</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Clean Sheets</span>
              <span className="text-sm font-medium">10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Goal Difference</span>
              <span className="text-sm font-medium">+25</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Form Guide</h3>
          <div className="flex flex-wrap gap-2">
            {formGuide.map((result, index) => (
              <div
                key={index}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${getFormBadgeColor(
                  result
                )}`}
              >
                {result}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const matches = [
  {
    id: 1,
    competition: "Premier League",
    date: "2024-01-28",
    homeTeam: "Manchester United",
    awayTeam: "Liverpool",
    homeScore: 2,
    awayScore: 1,
  },
  {
    id: 2,
    competition: "FA Cup",
    date: "2024-01-24",
    homeTeam: "Arsenal",
    awayTeam: "Manchester United",
    homeScore: 3,
    awayScore: 1,
  },
  // Add more matches as needed
];

const formGuide = ["W", "L", "W", "W", "D"];

function getScoreColor(match: typeof matches[0]) {
  if (match.homeTeam === "Manchester United") {
    if (match.homeScore > match.awayScore) return "text-green-600";
    if (match.homeScore < match.awayScore) return "text-red-600";
    return "text-gray-600";
  } else {
    if (match.homeScore < match.awayScore) return "text-green-600";
    if (match.homeScore > match.awayScore) return "text-red-600";
    return "text-gray-600";
  }
}

function getFormBadgeColor(result: string) {
  switch (result) {
    case "W":
      return "bg-green-500";
    case "D":
      return "bg-yellow-500";
    case "L":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}
