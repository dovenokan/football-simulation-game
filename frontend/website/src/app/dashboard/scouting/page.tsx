'use client';

export default function ScoutingPage() {
  return (
    <div className="space-y-6">
      <div className="bg-[#1E1E2D] rounded-lg p-6">
        <h2 className="text-xl text-white font-semibold mb-6">Scouting</h2>

        {/* Scouting Network */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#151521] p-4 rounded-lg">
            <h3 className="text-white mb-4">Scouting Network</h3>
            <div className="space-y-3">
              {[
                { region: 'England', scouts: 4 },
                { region: 'France', scouts: 2 },
                { region: 'Germany', scouts: 2 },
                { region: 'Spain', scouts: 1 },
              ].map((area) => (
                <div key={area.region} className="flex justify-between items-center p-3 bg-[#1E1E2D] rounded">
                  <span className="text-gray-400">{area.region}</span>
                  <span className="text-white">{area.scouts} scouts</span>
                </div>
              ))}
            </div>
          </div>

          {/* Current Assignments */}
          <div className="bg-[#151521] p-4 rounded-lg">
            <h3 className="text-white mb-4">Current Assignments</h3>
            <div className="space-y-3">
              {[
                { scout: 'John Smith', assignment: 'Ligue 1 Strikers' },
                { scout: 'Mike Johnson', assignment: 'Bundesliga Midfielders' },
                { scout: 'David Wilson', assignment: 'Premier League Defenders' },
              ].map((assignment, index) => (
                <div key={index} className="p-3 bg-[#1E1E2D] rounded">
                  <div className="flex justify-between">
                    <span className="text-white">{assignment.scout}</span>
                    <span className="text-blue-500">{assignment.assignment}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shortlist */}
          <div className="bg-[#151521] p-4 rounded-lg">
            <h3 className="text-white mb-4">Shortlisted Players</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((player) => (
                <div key={player} className="p-3 bg-[#1E1E2D] rounded flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                    <div>
                      <p className="text-white">Player Name</p>
                      <p className="text-gray-400 text-sm">Club Name</p>
                    </div>
                  </div>
                  <span className="text-yellow-500">★ 4.5</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scouting Reports */}
        <div className="bg-[#151521] rounded-lg p-4">
          <h3 className="text-white mb-4">Recent Reports</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((report) => (
              <div key={report} className="p-4 bg-[#1E1E2D] rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-white">Player Name</h4>
                    <p className="text-gray-400 text-sm">Club Name - Position</p>
                  </div>
                  <span className="text-gray-400 text-sm">2 days ago</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Technical</p>
                    <p className="text-white">15/20</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Physical</p>
                    <p className="text-white">16/20</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Mental</p>
                    <p className="text-white">14/20</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
