'use client';

export default function MedicalCentrePage() {
  return (
    <div className="space-y-6">
      <div className="bg-[#1E1E2D] rounded-lg p-6">
        <h2 className="text-xl text-white font-semibold mb-6">Medical Centre</h2>

        {/* Current Injuries */}
        <div className="mb-8">
          <h3 className="text-white mb-4">Current Injuries</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-gray-400 border-b border-gray-700">
                <tr>
                  <th className="p-4">Player</th>
                  <th className="p-4">Injury</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Expected Return</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-700">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                      <span>Player Name</span>
                    </div>
                  </td>
                  <td className="p-4">Hamstring Strain</td>
                  <td className="p-4">2-3 weeks</td>
                  <td className="p-4">Jan 25, 2025</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-yellow-600/20 text-yellow-500 rounded-full text-sm">
                      In Treatment
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#151521] p-4 rounded-lg">
            <h3 className="text-white mb-4">Injury Risk Assessment</h3>
            <div className="space-y-4">
              {[
                { player: 'Player Name', risk: 'High', percentage: '75%' },
                { player: 'Player Name', risk: 'Medium', percentage: '45%' },
                { player: 'Player Name', risk: 'Low', percentage: '15%' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#1E1E2D] rounded">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                    <span className="text-white">{item.player}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`text-sm ${
                      item.risk === 'High' ? 'text-red-500' :
                      item.risk === 'Medium' ? 'text-yellow-500' :
                      'text-green-500'
                    }`}>{item.risk}</span>
                    <span className="text-gray-400">{item.percentage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fitness Levels */}
          <div className="bg-[#151521] p-4 rounded-lg">
            <h3 className="text-white mb-4">Squad Fitness Levels</h3>
            <div className="space-y-4">
              {[
                { player: 'Player Name', fitness: '95%' },
                { player: 'Player Name', fitness: '88%' },
                { player: 'Player Name', fitness: '82%' },
              ].map((item, index) => (
                <div key={index} className="p-3 bg-[#1E1E2D] rounded">
                  <div className="flex justify-between mb-2">
                    <span className="text-white">{item.player}</span>
                    <span className="text-gray-400">{item.fitness}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: item.fitness }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
