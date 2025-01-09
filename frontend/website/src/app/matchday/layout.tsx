'use client';

import Sidebar from '@/components/navigation/Sidebar';

export default function MatchdayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#1E1E2D]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-[#1E1E2D] border-b border-gray-700 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl text-white font-semibold">Match Center</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">2 Aug 2023</span>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Continue
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-[#151521] p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
