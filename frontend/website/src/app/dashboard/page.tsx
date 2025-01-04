export default function DashboardPage() {
  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <div className="text-sm bg-gradient-to-r from-blue-100 to-purple-100 p-2 rounded-lg">
          <span className="font-medium">Season 2024/25</span>
        </div>
      </div>
      
      {/* Team Summary */}
      <div className="bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-2xl p-8 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="bg-blue-600 w-2 h-8 rounded-full mr-3"></span>
          Team Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Team Name</p>
                <p className="text-lg font-bold text-gray-900">Manchester United</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">League Position</p>
                <p className="text-lg font-bold text-gray-900">4th</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Team Rating</p>
                <p className="text-lg font-bold text-gray-900">85</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent Matches */}
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-green-600 w-2 h-8 rounded-full mr-3"></span>
            Recent Matches
          </h2>
          <div className="space-y-4">
            <div className="group bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <span className="font-semibold group-hover:text-blue-600 transition-colors">Manchester United</span>
                  <div className="px-4 py-1 bg-green-100 rounded-full">
                    <span className="text-green-600 font-bold">2 - 1</span>
                  </div>
                  <span className="font-semibold">Liverpool</span>
                </div>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
            </div>
            <div className="group bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <span className="font-semibold">Arsenal</span>
                  <div className="px-4 py-1 bg-red-100 rounded-full">
                    <span className="text-red-600 font-bold">3 - 1</span>
                  </div>
                  <span className="font-semibold group-hover:text-blue-600 transition-colors">Manchester United</span>
                </div>
                <span className="text-sm text-gray-500">5 days ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Fixtures */}
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-purple-600 w-2 h-8 rounded-full mr-3"></span>
            Upcoming Fixtures
          </h2>
          <div className="space-y-4">
            <div className="group bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <span className="font-semibold group-hover:text-blue-600 transition-colors">Manchester United</span>
                  <div className="px-4 py-1 bg-gray-100 rounded-full">
                    <span className="text-gray-600 font-bold">vs</span>
                  </div>
                  <span className="font-semibold">Chelsea</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-500">In 2 days</span>
                </div>
              </div>
            </div>
            <div className="group bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <span className="font-semibold">Tottenham</span>
                  <div className="px-4 py-1 bg-gray-100 rounded-full">
                    <span className="text-gray-600 font-bold">vs</span>
                  </div>
                  <span className="font-semibold group-hover:text-blue-600 transition-colors">Manchester United</span>
                </div>
                <span className="text-sm text-gray-500">In 5 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-2xl p-8 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="bg-red-600 w-2 h-8 rounded-full mr-3"></span>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="group relative p-6 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold">Play Next Match</span>
            </div>
          </button>
          <button className="group relative p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="font-semibold">View Squad</span>
            </div>
          </button>
          <button className="group relative p-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold">Transfer Market</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
