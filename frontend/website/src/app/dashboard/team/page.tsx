export default function TeamManagementPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Team Management</h1>

      {/* Squad Overview */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Squad Overview</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Player
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Form
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {players.map((player) => (
                <tr key={player.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {player.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{player.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{player.age}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{player.rating}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${getFormColor(player.form)}`}>
                      {player.form}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        player.status === "Fit"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {player.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Team Stats</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Attack</span>
                <span className="text-sm text-gray-600">85</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Midfield</span>
                <span className="text-sm text-gray-600">82</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: "82%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Defense</span>
                <span className="text-sm text-gray-600">78</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: "78%" }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Squad Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Average Age</span>
              <span className="text-sm font-medium">25.3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Squad Size</span>
              <span className="text-sm font-medium">25</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Foreign Players</span>
              <span className="text-sm font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Value</span>
              <span className="text-sm font-medium">€245M</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              Training Schedule
            </button>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Youth Academy
            </button>
            <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
              Contract Negotiations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const players = [
  {
    id: 1,
    name: "Marcus Rashford",
    position: "ST",
    age: 23,
    rating: 85,
    form: "Excellent",
    status: "Fit",
  },
  {
    id: 2,
    name: "Bruno Fernandes",
    position: "CAM",
    age: 27,
    rating: 88,
    form: "Good",
    status: "Fit",
  },
  {
    id: 3,
    name: "Raphael Varane",
    position: "CB",
    age: 28,
    rating: 86,
    form: "Average",
    status: "Injured",
  },
  // Add more players as needed
];

function getFormColor(form: string) {
  switch (form.toLowerCase()) {
    case "excellent":
      return "text-green-600";
    case "good":
      return "text-blue-600";
    case "average":
      return "text-yellow-600";
    case "poor":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
}
