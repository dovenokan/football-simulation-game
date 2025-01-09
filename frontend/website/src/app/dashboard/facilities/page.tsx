'use client';

export default function FacilitiesPage() {
  return (
    <div className="flex h-screen bg-[#1E1E2D]">
      <main className="flex-1 overflow-auto bg-[#151521] p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Stadium Information */}
          <div className="bg-[#1E1E2D] rounded-lg p-6">
            <h2 className="text-xl text-white font-semibold mb-6">Stadium</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-[#151521] rounded">
                <span className="text-gray-400">Name</span>
                <span className="text-white">American Express Stadium</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-[#151521] rounded">
                <span className="text-gray-400">Capacity</span>
                <span className="text-white">31,800</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-[#151521] rounded">
                <span className="text-gray-400">Pitch Condition</span>
                <span className="text-green-500">Excellent</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-[#151521] rounded">
                <span className="text-gray-400">Built</span>
                <span className="text-white">2011</span>
              </div>
            </div>
          </div>

          {/* Training Facilities */}
          <div className="bg-[#1E1E2D] rounded-lg p-6">
            <h2 className="text-xl text-white font-semibold mb-6">Training Facilities</h2>
            <div className="space-y-4">
              <div className="p-4 bg-[#151521] rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Training Ground</span>
                  <span className="text-white">State of the Art</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div className="p-4 bg-[#151521] rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Youth Facilities</span>
                  <span className="text-white">Excellent</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Expansion Projects */}
          <div className="bg-[#1E1E2D] rounded-lg p-6 lg:col-span-2">
            <h2 className="text-xl text-white font-semibold mb-6">Expansion Projects</h2>
            <div className="space-y-4">
              <div className="p-4 bg-[#151521] rounded">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="text-white">Stadium Expansion</h3>
                    <p className="text-gray-400 text-sm">Increase capacity by 5,000 seats</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Propose
                  </button>
                </div>
              </div>
              <div className="p-4 bg-[#151521] rounded">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="text-white">Training Ground Upgrade</h3>
                    <p className="text-gray-400 text-sm">Improve training facilities</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Propose
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
