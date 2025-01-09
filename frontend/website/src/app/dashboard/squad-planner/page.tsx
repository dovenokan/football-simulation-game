'use client';

export default function SquadPlannerPage() {
  return (
    <div className="space-y-6">
      <div className="bg-[#1E1E2D] rounded-lg p-6">
        <h2 className="text-xl text-white font-semibold mb-6">Squad Planner</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Season */}
          <div className="bg-[#151521] p-4 rounded-lg">
            <h3 className="text-white mb-4">2024/25 Season</h3>
            <div className="space-y-3">
              {['Goalkeepers', 'Defenders', 'Midfielders', 'Forwards'].map((position) => (
                <div key={position} className="p-3 bg-[#1E1E2D] rounded">
                  <h4 className="text-gray-400 mb-2">{position}</h4>
                  <div className="flex justify-between text-white">
                    <span>Current: 4</span>
                    <span>Required: 4</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Season */}
          <div className="bg-[#151521] p-4 rounded-lg">
            <h3 className="text-white mb-4">2025/26 Season</h3>
            <div className="space-y-3">
              {['Goalkeepers', 'Defenders', 'Midfielders', 'Forwards'].map((position) => (
                <div key={position} className="p-3 bg-[#1E1E2D] rounded">
                  <h4 className="text-gray-400 mb-2">{position}</h4>
                  <div className="flex justify-between text-white">
                    <span>Planned: 4</span>
                    <span>Required: 4</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contract Expiry */}
          <div className="bg-[#151521] p-4 rounded-lg">
            <h3 className="text-white mb-4">Contract Expiry</h3>
            <div className="space-y-3">
              {[2024, 2025, 2026].map((year) => (
                <div key={year} className="p-3 bg-[#1E1E2D] rounded">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">{year}</span>
                    <span className="text-white">3 players</span>
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
