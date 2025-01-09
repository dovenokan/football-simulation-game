import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Main Section */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Geometric Pattern */}
        <div className="relative bg-black p-12 flex flex-col justify-center">
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.4) 0%, transparent 40%),
              radial-gradient(circle at 80% 70%, rgba(37, 99, 235, 0.4) 0%, transparent 40%)
            `,
            opacity: 0.6
          }} />
          <div className="relative z-10">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-white mb-2 tracking-tight">
                FUTSIM™
              </h1>
              <div className="flex items-center gap-3">
                <div className="h-1 w-24 bg-blue-400 rounded-full"></div>
                <span className="text-blue-400 text-xl font-medium">FOOTBALL SIMULATION</span>
              </div>
            </div>
            <p className="text-blue-50 mb-8 text-lg max-w-xl leading-relaxed">
              FUTSIM™&apos;te kulübünüzün şampiyonluğunu ilan etmek için daha fazla yol deneyin. 
              FUTSIM™ ile daha fazla taktiksel kontrol sağlarken takımınızı zafere taşıyın.
            </p>
            <Link
              href="/register"
              className="inline-block bg-blue-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-600 transition-all"
            >
              Hemen Oyna
            </Link>
          </div>
        </div>

        {/* Right Side - Trophy Room Image */}
        <div className="relative h-screen bg-neutral-900">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-black-400 z-10" />
          <Image
            src="/stadium.webp"
            alt="Trophy Room"
            fill
            className="object-cover opacity-90"
            priority
          />
        </div>
      </section>
    </div>
  );
}
