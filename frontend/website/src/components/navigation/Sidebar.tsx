'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const navigationItems = [
  { name: 'Overview', icon: '🏠', path: '/dashboard' },
  { name: 'Inbox', icon: '📥', path: '/dashboard/inbox' },
  { name: 'Squad', icon: '👥', path: '/dashboard/squad' },
  { name: 'Squad Planner', icon: '📋', path: '/dashboard/squad-planner' },
  { name: 'Dynamics', icon: '🤝', path: '/dashboard/dynamics' },
  { name: 'Tactics', icon: '⚔️', path: '/dashboard/tactics' },
  { name: 'Data Hub', icon: '📊', path: '/dashboard/data-hub' },
  { name: 'Staff', icon: '👔', path: '/dashboard/staff' },
  { name: 'Training', icon: '🏃', path: '/dashboard/training' },
  { name: 'Medical Centre', icon: '🏥', path: '/dashboard/medical' },
  { name: 'Schedule', icon: '📅', path: '/dashboard/schedule' },
  { name: 'Competitions', icon: '🏆', path: '/dashboard/competitions' },
  { name: 'Scouting', icon: '🔍', path: '/dashboard/scouting' },
  { name: 'Transfers', icon: '💰', path: '/dashboard/transfers' },
  { name: 'Club Info', icon: 'ℹ️', path: '/dashboard/club-info' },
  { name: 'Club Vision', icon: '🎯', path: '/dashboard/club-vision' },
  { name: 'Finances', icon: '💼', path: '/dashboard/finances' },
  { name: 'Dev. Centre', icon: '🌱', path: '/dashboard/development' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-[#1E1E2D] border-r border-gray-700">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-6">
          <Image src="/team-logo.png" alt="Team Logo" className="w-10 h-10" width={40} height={40} />
          <div>
            <h2 className="text-white font-semibold">Brighton & Hove</h2>
            <p className="text-gray-400 text-sm">Premier League</p>
          </div>
        </div>
        
        <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-120px)]">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-sm rounded-lg
                ${pathname === item.path
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'}`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
