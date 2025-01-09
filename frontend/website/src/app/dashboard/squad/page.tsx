'use client';

export default function SquadPage() {
  return (
    <div className="flex h-screen bg-[#1E1E2D]">
      <main className="flex-1 overflow-auto bg-[#151521] p-6">
        <div className="bg-[#1E1E2D] rounded-lg p-6">
          <h2 className="text-xl text-white font-semibold mb-6">Squad Overview</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-gray-400 border-b border-gray-700">
                <tr>
                  <th className="p-4">#</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Position</th>
                  <th className="p-4">Age</th>
                  <th className="p-4">Nationality</th>
                  <th className="p-4">Value</th>
                  <th className="p-4">Contract</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-700 hover:bg-gray-800">
                  <td className="p-4">26</td>
                  <td className="p-4">Lewis Dunk</td>
                  <td className="p-4">DC</td>
                  <td className="p-4">31</td>
                  <td className="p-4">English</td>
                  <td className="p-4">£35M</td>
                  <td className="p-4">2025</td>
                </tr>
                {/* Add more players */}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
