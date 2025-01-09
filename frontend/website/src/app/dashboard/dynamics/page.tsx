'use client';

export default function DynamicsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-[#1E1E2D] rounded-lg p-6">
        <h2 className="text-xl text-white font-semibold mb-6">Team Dynamics</h2>
        
        {/* Team Cohesion */}
        <div className="mb-8">
          <h3 className="text-white mb-4">Team Cohesion</h3>
          <div className="bg-[#151521] p-4 rounded-lg">
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Overall Morale</span>
                <span className="text-green-500">Excellent</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Team Chemistry</span>
                <span className="text-green-500">Very Good</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Groups */}
        <div className="mb-8">
          <h3 className="text-white mb-4">Social Groups</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Core Group', 'New Signings', 'Youth Players'].map((group) => (
              <div key={group} className="bg-[#151521] p-4 rounded-lg">
                <h4 className="text-white mb-3">{group}</h4>
                <div className="space-y-2">
                  {[1, 2, 3].map((player) => (
                    <div key={player} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                      <span className="text-gray-400">Player Name</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hierarchy */}
        <div>
          <h3 className="text-white mb-4">Team Hierarchy</h3>
          <div className="bg-[#151521] p-4 rounded-lg">
            <div className="space-y-4">
              {[
                { role: 'Team Leader', name: 'Lewis Dunk' },
                { role: 'Vice-Captain', name: 'Pascal Groß' },
                { role: 'Influential Player', name: 'Solly March' },
              ].map((leader) => (
                <div key={leader.role} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                    <div>
                      <p className="text-white">{leader.name}</p>
                      <p className="text-gray-400 text-sm">{leader.role}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded">Respected</span>
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
