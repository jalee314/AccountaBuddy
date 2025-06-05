// app/leaderboard/page.js
'use client';

import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar'; // Adjusted path
import { createClient } from '../../src/utils/supabase/client'; // Adjusted path
import { getGlobalLeaderboardData, getFriendsLeaderboardData } from '../../src/controllers/leaderboardController'; // Adjusted path

const LeaderboardEntry = ({ rank, userProfile, score }) => (
    <div className={`flex items-center justify-between p-3 my-1.5 rounded-lg shadow border transition-colors duration-150 ease-in-out
        ${rank === 1 
            ? 'bg-yellow-200 border-yellow-400 hover:bg-yellow-300' 
            : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
        }`}
    >
        <div className="flex items-center space-x-3 sm:space-x-4 flex-grow min-w-0">
            <span 
                className={`text-base sm:text-lg font-semibold w-6 sm:w-8 text-center flex-shrink-0 
                    ${rank === 1 ? 'text-yellow-700' : 'text-slate-600'}`}
            >
                {rank}
            </span>
            <img
                src={userProfile?.profile_pic_src || '/avatar_1.png'}
                alt={userProfile?.display_name || 'User'}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                onError={(e) => { e.currentTarget.src = '/avatar_1.png'; }}
            />
            <span className="font-medium text-slate-800 text-sm sm:text-base truncate flex-grow" title={userProfile?.display_name || 'Anonymous User'}>
                {userProfile?.display_name || 'Anonymous User'}
            </span>
        </div>
        <span className="text-base sm:text-lg font-bold text-black ml-2 flex-shrink-0">{score} pts</span> {/* Score text changed to black */}
    </div>
);

export default function LeaderboardPage() {
    const [leaderboardData, setLeaderboardData] = useState(null); // Initialize to null to better manage loading
    const [isLoading, setIsLoading] = useState(true);
    const [leaderboardTitle, setLeaderboardTitle] = useState('Leaderboard');
    const [currentUser, setCurrentUser] = useState(undefined); // undefined: auth state unknown, null: no user, object: user
    
    // Initialize Supabase client once
    const [supabase] = useState(() => createClient());

    useEffect(() => {
        // This listener handles initial auth check AND subsequent auth changes
        const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setIsLoading(true);       // Show loading for any auth change or initial load
            setLeaderboardData(null); // Clear old data to prevent flashing

            const user = session?.user || null;
            setCurrentUser(user);

            let data;
            if (user) {
                setLeaderboardTitle("Friends Leaderboard");
                data = await getFriendsLeaderboardData(user.id);
            } else {
                setLeaderboardTitle("Global Leaderboard");
                data = await getGlobalLeaderboardData();
            }
            setLeaderboardData(data || []);
            setIsLoading(false); // Data fetching complete
        });

        // Cleanup on unmount
        return () => {
            if (authListener && typeof authListener.subscription?.unsubscribe === 'function') {
                authListener.subscription.unsubscribe();
            }
        };
    }, [supabase]); // Effect runs once to set up listener

    return (
        <>
            <Navbar />
            <main className="min-h-screen flex flex-col items-center bg-gradient-to-b from-orange-100 via-green-100 to-green-200 px-4 py-8 pt-24">
                <div className="w-full max-w-3xl bg-white p-6 md:p-8 rounded-2xl shadow-xl">
                    <h1 className="text-3xl font-bold text-black text-center mb-8">{leaderboardTitle}</h1>
                    
                    {isLoading || currentUser === undefined ? ( // Show loading if isLoading or auth state is still unknown
                        <p className="text-center text-slate-600 py-10">Loading leaderboard...</p>
                    ) : leaderboardData && leaderboardData.length === 0 ? (
                        <p className="text-center text-slate-600 py-10">
                            {leaderboardTitle === "Friends Leaderboard"
                                ? "No scores among your friends yet, or add some friends to compete!"
                                : "No scores on the leaderboard yet. Be the first!"}
                        </p>
                    ) : leaderboardData ? ( // Check if leaderboardData is not null
                        <div className="space-y-1">
                            {leaderboardData.map((entry, index) => (
                                entry && entry.user && ( // Ensure entry and user are valid
                                    <LeaderboardEntry
                                        key={entry.user.user_id || index}
                                        rank={index + 1}
                                        userProfile={entry.user}
                                        score={entry.score}
                                    />
                                )
                            ))}
                        </div>
                    ) : null /* Handles case where leaderboardData is null but not loading (should be brief) */ }
                </div>
            </main>
        </>
    );
}