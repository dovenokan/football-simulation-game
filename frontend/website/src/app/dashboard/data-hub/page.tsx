'use client';

export default function DataHubPage() {
  return (
    <div className="space-y-6">
      <div className="bg-[#1E1E2D] rounded-lg p-6">
        <h2 className="text-xl text-white font-semibold mb-6">Data Hub</h2>
        
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Possession', value: '58%' },
            { label: 'Pass Completion', value: '87%' },
            { label: 'Shots on Target', value: '6.2/game' },
            { label: 'Expected Goals', value: '1.8/game' },
          ].map((metric) => (
            <div key={metric.label} className="bg-[#151521] p-4 rounded-lg">
              <p className="text-gray-400 text-sm mb-1">{metric.label}</p>
              <p className="text-white text-2xl font-bold">{metric.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#151521] p-4 rounded-lg">
            <h3 className="text-white mb-4">Form Analysis</h3>
            <div className="h-64 flex items-center justify-center border border-gray-700 rounded">
              <span className="text-gray-400">Form Chart Placeholder</span>
            </div>
          </div>
          <div className="bg-[#151521] p-4 rounded-lg">
            <h3 className="text-white mb-4">Player Performance</h3>
            <div className="h-64 flex items-center justify-center border border-gray-700 rounded">
              <span className="text-gray-400">Performance Chart Placeholder</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
