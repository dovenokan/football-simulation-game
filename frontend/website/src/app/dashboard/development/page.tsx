'use client';

export default function DevelopmentPage() {
  return (
    <div className="space-y-6">
      <div className="bg-[#1E1E2D] rounded-lg p-6">
        <h2 className="text-xl text-white font-semibold mb-6">Development Centre</h2>

        {/* Youth Prospects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#151521] p-4 rounded-lg">
            <h3 className="text-white mb-4">Top Prospects</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((player) => (
                <div key={player} className="p-4 bg-[#1E1E2D] rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                    <div>
                      <p className="text-white">Player Name</p>
                      <p className="text-gray-400 text-sm">Age: 17 • Position: CAM</p>
                    </div>
                    <div className="ml-auto">
                      <span className="text-yellow-500 text-lg">★★★★☆</span>
                      <p className="text-gray-400 text-sm">Potential</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Technical</p>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Mental</p>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Physical</p>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Development Plans */}
          <div className="bg-[#151521] p-4 rounded-lg">
            <h3 className="text-white mb-4">Development Plans</h3>
            <div className="space-y-4">
              {[
                { player: 'Player Name', focus: 'Technical Skills', progress: 75 },
                { player: 'Player Name', focus: 'Physical Development', progress: 60 },
                { player: 'Player Name', focus: 'Tactical Understanding', progress: 45 },
              ].map((plan, index) => (
                <div key={index} className="p-4 bg-[#1E1E2D] rounded-lg">
                  <div className="flex justify-between mb-2">
                    <div>
                      <p className="text-white">{plan.player}</p>
                      <p className="text-gray-400 text-sm">{plan.focus}</p>
                    </div>
                    <span className="text-blue-500">{plan.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${plan.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Youth Facilities */}
        <div className="bg-[#151521] p-4 rounded-lg mb-8">
          <h3 className="text-white mb-4">Youth Facilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { facility: 'Training Ground', rating: 'Excellent', score: 85 },
              { facility: 'Youth Academy', rating: 'Good', score: 75 },
              { facility: 'Youth Recruitment', rating: 'Average', score: 65 },
            ].map((facility) => (
              <div key={facility.facility} className="p-4 bg-[#1E1E2D] rounded-lg">
                <p className="text-white mb-1">{facility.facility}</p>
                <p className="text-gray-400 text-sm mb-2">{facility.rating}</p>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${facility.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Youth Team Performance */}
        <div className="bg-[#151521] p-4 rounded-lg">
          <h3 className="text-white mb-4">Youth Team</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-gray-400 border-b border-gray-700">
                <tr>
                  <th className="p-4">Competition</th>
                  <th className="p-4">Position</th>
                  <th className="p-4">Played</th>
                  <th className="p-4">Won</th>
                  <th className="p-4">Drawn</th>
                  <th className="p-4">Lost</th>
                  <th className="p-4">GD</th>
                  <th className="p-4">Points</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-700">
                  <td className="p-4">U23 Premier League</td>
                  <td className="p-4">3rd</td>
                  <td className="p-4">15</td>
                  <td className="p-4">9</td>
                  <td className="p-4">3</td>
                  <td className="p-4">3</td>
                  <td className="p-4">+12</td>
                  <td className="p-4">30</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-4">U18 Premier League</td>
                  <td className="p-4">5th</td>
                  <td className="p-4">15</td>
                  <td className="p-4">8</td>
                  <td className="p-4">2</td>
                  <td className="p-4">5</td>
                  <td className="p-4">+5</td>
                  <td className="p-4">26</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
