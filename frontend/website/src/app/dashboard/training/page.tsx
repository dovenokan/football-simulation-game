'use client';

export default function TrainingPage() {
  return (
    <div className="flex h-screen bg-[#1E1E2D]">
      <main className="flex-1 overflow-auto bg-[#151521] p-6">
        <div className="bg-[#1E1E2D] rounded-lg p-6">
          <h2 className="text-xl text-white font-semibold mb-6">Training Schedule</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Schedule */}
            <div className="bg-[#151521] rounded-lg p-6">
              <h3 className="text-white mb-4">Weekly Schedule</h3>
              <div className="space-y-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <div key={day} className="flex items-center justify-between p-3 bg-[#1E1E2D] rounded">
                    <span className="text-gray-400">{day}</span>
                    <select className="bg-[#1E1E2D] text-white rounded p-1 border border-gray-700">
                      <option>Tactical</option>
                      <option>Physical</option>
                      <option>Technical</option>
                      <option>Rest</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Training Focus */}
            <div className="bg-[#151521] rounded-lg p-6">
              <h3 className="text-white mb-4">Training Focus</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 block mb-2">Primary Focus</label>
                  <select className="w-full bg-[#1E1E2D] text-white rounded p-2 border border-gray-700">
                    <option>Match Preparation</option>
                    <option>Fitness</option>
                    <option>Tactics</option>
                    <option>Set Pieces</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 block mb-2">Intensity</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    className="w-full"
                    defaultValue="50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
