'use client';

export default function TacticsPage() {
  return (
    <div className="flex h-screen bg-[#1E1E2D]">
      <main className="flex-1 overflow-auto bg-[#151521] p-6">
        <div className="bg-[#1E1E2D] rounded-lg p-6">
          <h2 className="text-xl text-white font-semibold mb-6">Team Tactics</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Formation Section */}
            <div className="bg-[#151521] rounded-lg p-4">
              <h3 className="text-lg text-white font-medium mb-4">Formation</h3>
              <div className="aspect-[3/4] bg-[#1A1A27] rounded-lg"></div>
            </div>

            {/* Instructions Section */}
            <div className="bg-[#151521] rounded-lg p-4">
              <h3 className="text-lg text-white font-medium mb-4">Team Instructions</h3>
              <div className="space-y-4">
                <div className="bg-[#1A1A27] p-3 rounded">
                  <h4 className="text-gray-300 font-medium mb-2">Attacking</h4>
                  <div className="space-y-2 text-gray-400">
                    <div>Mentality: Balanced</div>
                    <div>Width: Normal</div>
                    <div>Tempo: Normal</div>
                  </div>
                </div>
                <div className="bg-[#1A1A27] p-3 rounded">
                  <h4 className="text-gray-300 font-medium mb-2">Defense</h4>
                  <div className="space-y-2 text-gray-400">
                    <div>Line of Engagement: Medium</div>
                    <div>Defensive Width: Normal</div>
                    <div>Pressing Intensity: Normal</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
