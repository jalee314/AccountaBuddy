'use client';

import Image from 'next/image';
import Navbar from '../../components/Navbar';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen flex flex-col items-center bg-gradient-to-b from-orange-100 via-green-100 to-green-200 text-center px-4 py-8">
        {/* Hero */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-semibold text-black">
            About <span className="text-green-600">Accountabuddy</span>
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Accountabuddy is a social accountability platform that leverages positive reinforcement, friendly competition, and gamification to help users track tasks, set priorities, and achieve their goals together.
          </p>
        </div>

        {/* Mission & Features */}
        <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition">
            <h2 className="text-2xl font-bold text-black mb-4">Our Mission</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 text-left">
              <li>Use positive social reinforcement to reduce burnout and increase motivation.</li>
              <li>Provide concrete progress tracking with an achievement system.</li>
              <li>Introduce friendly competition via leaderboards to gamify mundane tasks.</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition">
            <h2 className="text-2xl font-bold text-black mb-4">Key Features</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 text-left">
              <li>User authentication (sign up / sign in).</li>
              <li>Create, remove, and prioritize checklist items.</li>
              <li>Set deadlines with auto-removal on completion.</li>
              <li>SMS reminders to prompt friends.</li>
              <li>Search for and add friends for shared accountability.</li>
              <li>Achievements (streaks / rewards) and leaderboard ranking.</li>
            </ul>
          </div>
        </section>

        {/* Team */}
        <section className="w-full max-w-5xl bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition mb-12">
          <h2 className="text-2xl font-bold text-black mb-4">Team Members</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1 text-left">
            <li>Kevin Wu</li>
            <li>Nolan Kosmal</li>
            <li>Joshua Sevilla</li>
            <li>Jason Lee</li>
            <li>Aryn Granados</li>
            <li>Ilhaan S Abdullah</li>
          </ul>
        </section>

        {/* Tech & Tools */}
        <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition">
            <h2 className="text-2xl font-bold text-black mb-4">Tech Stack</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 text-left">
              <li>Front-end: React.js, TailwindCSS (deployed on Vercel)</li>
              <li>Back-end: JavaScript</li>
              <li>Database: MySQL</li>
              <li>UI Design: Figma</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition">
            <h2 className="text-2xl font-bold text-black mb-4">Deployment & Tools</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 text-left">
              <li>Version control with GitHub & Kanban board</li>
              <li>Potential AI integrations via OpenAI GPT-4 API</li>
              <li>Continuous updates through TA lab sessions</li>
            </ul>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-4 mt-12 border-t text-black border-gray-700 w-full">
          <p>© 2024 Accountabuddy.</p>
          <a href="#top" className="text-gray-400">Back to top</a>
        </footer>
      </main>
    </>
  );
}
