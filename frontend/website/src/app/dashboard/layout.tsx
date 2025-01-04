import Link from "next/link";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="font-bold text-xl">
                Football Manager
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/settings" className="hover:text-green-200">
                Settings
              </Link>
              <button className="hover:text-green-200">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className="flex">
        <div className="w-64 bg-white h-screen shadow-lg">
          <nav className="mt-5 px-2">
            <Link
              href="/dashboard"
              className="group flex items-center px-2 py-2 text-base leading-6 font-medium text-gray-900 rounded-md hover:text-green-700 hover:bg-gray-50"
            >
              Overview
            </Link>
            <Link
              href="/dashboard/team"
              className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium text-gray-600 rounded-md hover:text-green-700 hover:bg-gray-50"
            >
              Team Management
            </Link>
            <Link
              href="/dashboard/matches"
              className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium text-gray-600 rounded-md hover:text-green-700 hover:bg-gray-50"
            >
              Matches
            </Link>
            <Link
              href="/dashboard/transfers"
              className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium text-gray-600 rounded-md hover:text-green-700 hover:bg-gray-50"
            >
              Transfer Market
            </Link>
            <Link
              href="/dashboard/tactics"
              className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium text-gray-600 rounded-md hover:text-green-700 hover:bg-gray-50"
            >
              Tactics
            </Link>
            <Link
              href="/dashboard/league"
              className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium text-gray-600 rounded-md hover:text-green-700 hover:bg-gray-50"
            >
              League
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
