'use client';

export default function DashboardPage() {
  return (
    <>
      {/* Club Details */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-[#1E1E2D] p-6 rounded-lg">
          <h3 className="text-gray-400 mb-2">Club Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Founded</span>
              <span className="text-white">1901</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status</span>
              <span className="text-white">Professional</span>
            </div>
          </div>
        </div>

        {/* Stadium Info */}
        <div className="bg-[#1E1E2D] p-6 rounded-lg">
          <h3 className="text-gray-400 mb-2">Stadium</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Name</span>
              <span className="text-white">American Express Stadium</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Capacity</span>
              <span className="text-white">31,800</span>
            </div>
          </div>
        </div>

        {/* Team Kit */}
        <div className="bg-[#1E1E2D] p-6 rounded-lg">
          <h3 className="text-gray-400 mb-2">Team Kits</h3>
          <div className="flex justify-between space-x-4">
            <div className="text-center">
              <div className="w-16 h-20 bg-blue-500 rounded"></div>
              <span className="text-gray-400 text-sm">Home</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-20 bg-green-500 rounded"></div>
              <span className="text-gray-400 text-sm">Away</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-20 bg-red-500 rounded"></div>
              <span className="text-gray-400 text-sm">Third</span>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Section */}
      <div className="bg-[#1E1E2D] rounded-lg p-6">
        <h3 className="text-white text-lg mb-4">Key Staff</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
            <div>
              <p className="text-white">Roberto De Zerbi</p>
              <p className="text-gray-400 text-sm">Manager</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
            <div>
              <p className="text-white">Lewis Dunk</p>
              <p className="text-gray-400 text-sm">Captain</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
