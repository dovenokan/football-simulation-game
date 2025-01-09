'use client';

export default function StaffPage() {
  return (
    <div className="flex h-screen bg-[#1E1E2D]">
      <main className="flex-1 overflow-auto bg-[#151521] p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Management Staff */}
          <div className="bg-[#1E1E2D] rounded-lg p-6">
            <h2 className="text-xl text-white font-semibold mb-6">Management</h2>
            <div className="space-y-4">
              <div className="p-4 bg-[#151521] rounded flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                <div>
                  <p className="text-white">Roberto De Zerbi</p>
                  <p className="text-gray-400 text-sm">Manager</p>
                </div>
              </div>
              <div className="p-4 bg-[#151521] rounded flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                <div>
                  <p className="text-white">Assistant Name</p>
                  <p className="text-gray-400 text-sm">Assistant Manager</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coaching Staff */}
          <div className="bg-[#1E1E2D] rounded-lg p-6">
            <h2 className="text-xl text-white font-semibold mb-6">Coaching</h2>
            <div className="space-y-4">
              {['Fitness Coach', 'Goalkeeping Coach', 'Technical Coach'].map((role) => (
                <div key={role} className="p-4 bg-[#151521] rounded flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                  <div>
                    <p className="text-white">Staff Name</p>
                    <p className="text-gray-400 text-sm">{role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Medical Staff */}
          <div className="bg-[#1E1E2D] rounded-lg p-6">
            <h2 className="text-xl text-white font-semibold mb-6">Medical</h2>
            <div className="space-y-4">
              {['Head Physio', 'Team Doctor', 'Sports Scientist'].map((role) => (
                <div key={role} className="p-4 bg-[#151521] rounded flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                  <div>
                    <p className="text-white">Staff Name</p>
                    <p className="text-gray-400 text-sm">{role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Staff Overview */}
          <div className="bg-[#1E1E2D] rounded-lg p-6 lg:col-span-3">
            <h2 className="text-xl text-white font-semibold mb-6">Staff Overview</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-gray-400 border-b border-gray-700">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Age</th>
                    <th className="p-4">Nationality</th>
                    <th className="p-4">Contract Until</th>
                    <th className="p-4">Wage (p/w)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-700 hover:bg-gray-800">
                    <td className="p-4">Roberto De Zerbi</td>
                    <td className="p-4">Manager</td>
                    <td className="p-4">44</td>
                    <td className="p-4">Italian</td>
                    <td className="p-4">2026</td>
                    <td className="p-4">£50,000</td>
                  </tr>
                  {/* Add more staff members */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
