// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black font-sans flex flex-col items-center px-6">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-32 max-w-xl">
        <h2 className="text-4xl font-semibold mb-4">Empower your progress. Achieve More Together.</h2>
        <p className="text-lg text-gray-700 mb-8">
          responsibility and action through community-powered reporting.
        </p>
        <div className="flex gap-4">
          <Link
            href="#"
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
          >
            Get Started
          </Link>
          <Link
            href="#"
            className="border border-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition"
          >
            Invite a Friend
          </Link>
        </div>
        <div className="mt-12 w-full max-w-sm">
          {/* Illustration placeholder (could be replaced with SVG/Canvas/Img) */}
          <div className="border-t border-black opacity-20 h-40 w-full rounded-sm bg-no-repeat bg-center bg-contain" style={{ backgroundImage: 'url(/illustration-line-art.png)' }} />
        </div>
      </section>
    </main>
  );
}
