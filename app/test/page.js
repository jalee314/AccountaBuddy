
import Image from "next/image";

export default function Home() {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-100 via-green-100 to-green-200 text-center px-4">
        <div className="bg-white rounded-3xl p-4 shadow-xl mb-8">
          <Image
            src="/ec3be5ba-1af1-4be2-b5e3-8c03909e4434.png"
            alt="Two bots working together"
            width={400}
            height={300}
            className="rounded-xl"
          />
        </div>
  
        <h1 className="text-3xl sm:text-5xl font-bold text-black mb-4">
          Empower your progress.
          <br />
          Achieve more <span className="text-green-600">together</span>
        </h1>
  
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          {/* <Button className="bg-black text-white px-6 py-3 rounded-full text-lg hover:scale-105 transition-transform">
            Get Started
          </Button>
          <Button className="bg-black text-white px-6 py-3 rounded-full text-lg hover:scale-105 transition-transform">
            Invite Friends
          </Button> */}
        </div>
      </main>
    );
  }
  