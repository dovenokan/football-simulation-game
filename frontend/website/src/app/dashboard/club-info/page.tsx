'use client';

export default function ClubInfoPage() {
  return (
    <div className="space-y-6">
      <div className="bg-[#1E1E2D] rounded-lg p-6">
        <h2 className="text-xl text-white font-semibold mb-6">Club Information</h2>

        {/* Basic Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#151521] p-4 rounded-lg">
            <h3 className="text-white mb-4">Club Details</h3>
            <div className="space-y-3">
              {[
                { label: 'Founded', value: '1901' },
                { label: 'Status', value: 'Professional' },
                { label: 'Reputation', value: 'Established Premier League Club' },
                { label: 'Nation', value: 'England' },
              ].map((detail) => (
                <div key={detail.label} className="flex justify-between p-3 bg-[#1E1E2D] rounded">
                  <span className="text-gray-400">{detail.label}</span>
                  <span className="text-white">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#151521] p-4 rounded-lg">
            <h3 className="text-white mb-4">Stadium Information</h3>
            <div className="space-y-3">
              {[
                { label: 'Name', value: 'American Express Stadium' },
                { label: 'Capacity', value: '31,800' },
                { label: 'Built', value: '2011' },
                { label: 'Pitch Type', value: 'Natural Grass' },
              ].map((detail) => (
                <div key={detail.label} className="flex justify-between p-3 bg-[#1E1E2D] rounded">
                  <span className="text-gray-400">{detail.label}</span>
                  <span className="text-white">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Club History */}
        <div className="bg-[#151521] p-4 rounded-lg mb-8">
          <h3 className="text-white mb-4">Club History</h3>
          <div className="space-y-4">
            {[
              { year: '2017', event: 'Promoted to Premier League' },
              { year: '2011', event: 'Moved to American Express Stadium' },
              { year: '1901', event: 'Club Founded' },
            ].map((event) => (
              <div key={event.year} className="flex items-start space-x-4 p-3 bg-[#1E1E2D] rounded">
                <span className="text-blue-500 font-semibold">{event.year}</span>
                <span className="text-white">{event.event}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Club Records */}
        <div className="bg-[#151521] p-4 rounded-lg">
          <h3 className="text-white mb-4">Club Records</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-[#1E1E2D] rounded">
              <h4 className="text-gray-400 mb-2">Record Transfer Fee (Paid)</h4>
              <p className="text-white text-lg">£30M - Player Name</p>
              <p className="text-gray-400 text-sm">From Club Name, 2023</p>
            </div>
            <div className="p-3 bg-[#1E1E2D] rounded">
              <h4 className="text-gray-400 mb-2">Record Transfer Fee (Received)</h4>
              <p className="text-white text-lg">£50M - Player Name</p>
              <p className="text-gray-400 text-sm">To Club Name, 2022</p>
            </div>
            <div className="p-3 bg-[#1E1E2D] rounded">
              <h4 className="text-gray-400 mb-2">Record League Finish</h4>
              <p className="text-white text-lg">6th Place</p>
              <p className="text-gray-400 text-sm">Premier League, 2022/23</p>
            </div>
            <div className="p-3 bg-[#1E1E2D] rounded">
              <h4 className="text-gray-400 mb-2">Record Attendance</h4>
              <p className="text-white text-lg">31,800</p>
              <p className="text-gray-400 text-sm">vs Manchester United, 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
