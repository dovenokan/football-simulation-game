'use client';

export default function SchedulePage() {
  return (
    <div className="space-y-6">
      <div className="bg-[#1E1E2D] rounded-lg p-6">
        <h2 className="text-xl text-white font-semibold mb-6">Schedule</h2>

        {/* Calendar View */}
        <div className="grid grid-cols-7 gap-4 mb-8">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-gray-400">{day}</div>
          ))}
          {Array.from({ length: 35 }).map((_, i) => (
            <div 
              key={i} 
              className="aspect-square bg-[#151521] rounded-lg p-2 text-center hover:bg-gray-800 cursor-pointer"
            >
              <span className="text-gray-400">{i + 1}</span>
              {i === 5 && (
                <div className="mt-1 text-xs bg-blue-600/20 text-blue-500 rounded p-1">
                  Match
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Upcoming Fixtures */}
        <div className="bg-[#151521] rounded-lg p-4">
          <h3 className="text-white mb-4">Upcoming Fixtures</h3>
          <div className="space-y-4">
            {[
              { competition: 'Premier League', home: 'Brighton', away: 'Arsenal', date: 'Jan 15, 2025' },
              { competition: 'FA Cup', home: 'Brighton', away: 'Liverpool', date: 'Jan 20, 2025' },
              { competition: 'Premier League', home: 'Chelsea', away: 'Brighton', date: 'Jan 25, 2025' },
            ].map((fixture, index) => (
              <div key={index} className="p-4 bg-[#1E1E2D] rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-500">{fixture.competition}</span>
                  <span className="text-gray-400 text-sm">{fixture.date}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-white">{fixture.home}</span>
                  <span className="text-gray-400 mx-4">vs</span>
                  <span className="text-white">{fixture.away}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
