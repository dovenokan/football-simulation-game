import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/stadium.jpg"
            alt="Stadium Background"
            fill
            className="object-cover blur-sm"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/80" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-6 py-32">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                Lead Your Team to Glory
              </h1>
              <p className="text-lg mb-8 text-gray-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                Experience the thrill of managing your own football team. Make strategic decisions,
                develop players, and compete against managers worldwide.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/register"
                  className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform"
                >
                  Start Managing
                </Link>
                <Link
                  href="/login"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/50 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform"
                >
                  Login
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative h-[300px] lg:h-[400px] w-full">
                {/* <Image
                  src="/stadium.webp2"
                  alt="Football Stadium"
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                  priority
                /> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="p-6 border rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white"
              >
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2024 Football Manager Simulation. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <Link href="/help" className="hover:text-green-400 transition-colors">Help</Link>
              <Link href="/about" className="hover:text-green-400 transition-colors">About</Link>
              <Link href="/contact" className="hover:text-green-400 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: "Team Management",
    description: "Build and customize your dream team. Train players, set formations, and develop winning strategies.",
  },
  {
    title: "Live Matches",
    description: "Experience matches in real-time with detailed statistics and dynamic commentary.",
  },
  {
    title: "Transfer Market",
    description: "Scout talents, negotiate contracts, and make strategic transfers to strengthen your squad.",
  },
  {
    title: "League System",
    description: "Compete in multiple leagues and tournaments. Rise through the divisions and aim for glory.",
  },
  {
    title: "Player Development",
    description: "Nurture young talents and watch them grow into world-class players under your guidance.",
  },
  {
    title: "Tactical Depth",
    description: "Fine-tune your team's playing style with advanced tactical options and custom strategies.",
  },
];
