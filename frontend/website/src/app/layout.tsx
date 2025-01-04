import type { Metadata } from 'next';
import { poppins } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Football Manager Simulation',
  description: 'Lead your team to glory in this football management simulation game',
  keywords: ["football", "manager", "simulation", "game", "soccer", "sports"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className="font-sans bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}
