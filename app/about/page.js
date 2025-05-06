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
