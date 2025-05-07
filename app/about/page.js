<<<<<<< HEAD
import Image from 'next/image';
import Navbar from '../../components/Navbar';

export default function About() {
    return (
        <>
        <Navbar/>
        <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                About Us
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Learn more about our story, mission, and the team behind our success.
                </p>
            </div>
    
            <div className="flex flex-col items-center mb-16">
                {/* <div className="relative w-full max-w-2xl h-64 sm:h-80 md:h-96 mb-8 rounded-xl overflow-hidden shadow-lg">
                <Image
                    src="/two_bots.png" 
                    alt="Our team working together"
                    fill
                    className="object-cover"
                    priority
                />
                </div> */}
            </div>
    
            {/* Mission Section */}
            <div className="mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">
                Our Mission
                </h2>
                <p className="text-gray-600 text-center max-w-3xl mx-auto leading-relaxed">
                
                Democratizing Discipline Through Connection
                <br/>
                We believe willpower is overrated. Real change happens when:
                <br/>
                ✅ Social pressure works for you (not against you) <br/>
                ✅ Progress is visible and celebrated <br/>
                ✅ Support feels playful, not punitive <br/>
                <br/>
                AccountaBuddy replaces lonely grind culture with what actually works: friends who care enough to nudge. Because behind every "I finally did it!" is someone who asked, "How’s it going?" at just the right time.
                <br/>
                <br/>
                <strong>Join the rebellion against going it alone.</strong>
                </p>
            </div>
    
            {/* Team Section */}
            <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
                Meet The Team
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-white p-6 rounded-xl shadow-md text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                        {/* <Image
                        src={`/team-member-${item}.jpg`} // Replace with your images
                        alt={`Team member ${item}`}
                        fill
                        className="object-cover"
                        /> */}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">John Doe</h3>
                    <p className="text-gray-500 mb-2">Co-Founder & CEO</p>
                    <p className="text-gray-600 text-sm">
                        Passionate about innovation and customer success.
                    </p>
                    </div>
                ))}
                </div>
            </div>
            </div>
        </main>
        </>
        );
    }
=======
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
>>>>>>> 0d09da8 (Create button and clearn front end.)
