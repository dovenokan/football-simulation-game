export default function TransfersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Transfer Market</h1>

      {/* Transfer Budget */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Transfer Budget</h3>
            <p className="mt-1 text-2xl font-semibold text-green-600">€75M</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Wage Budget</h3>
            <p className="mt-1 text-2xl font-semibold text-blue-600">€2.5M/week</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Squad Size</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">25/30</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search players..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex gap-4">
            <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>All Positions</option>
              <option>Forward</option>
              <option>Midfielder</option>
              <option>Defender</option>
              <option>Goalkeeper</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>Max Price</option>
              <option>€5M</option>
              <option>€10M</option>
              <option>€20M</option>
              <option>€50M</option>
            </select>
          </div>
        </div>
      </div>

      {/* Available Players */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Available Players</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Player
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Club
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Wage
                </th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {availablePlayers.map((player) => (
                <tr key={player.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {player.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          Rating: {player.rating}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{player.club}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{player.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{player.age}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">€{player.value}M</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      €{player.wage}K/week
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-green-600 hover:text-green-900">
                      Make Offer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transfer History */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Transfer History</h2>
        <div className="space-y-4">
          {transferHistory.map((transfer) => (
            <div
              key={transfer.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {transfer.playerName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {transfer.fromClub} → {transfer.toClub}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  €{transfer.fee}M
                </div>
                <div className="text-sm text-gray-500">{transfer.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const availablePlayers = [
  {
    id: 1,
    name: "John Smith",
    club: "Arsenal",
    position: "ST",
    age: 23,
    value: 45,
    wage: 120,
    rating: 82,
  },
  {
    id: 2,
    name: "David Williams",
    club: "Bayern Munich",
    position: "CM",
    age: 25,
    value: 35,
    wage: 100,
    rating: 81,
  },
  // Add more players as needed
];

const transferHistory = [
  {
    id: 1,
    playerName: "Marcus Rashford",
    fromClub: "Manchester United",
    toClub: "Real Madrid",
    fee: 85,
    date: "2024-01-15",
  },
  {
    id: 2,
    playerName: "Jack Grealish",
    fromClub: "Aston Villa",
    toClub: "Manchester United",
    fee: 65,
    date: "2024-01-10",
  },
  // Add more transfers as needed
];
