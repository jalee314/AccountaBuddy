import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center shadow-sm bg-white">
      {/* Left side: logo + title */}
      <div className="flex items-center space-x-3">
        <Link href="/">
          <Image
<<<<<<< HEAD
            src="/logo.png" // Place logo.png in /public
=======
            src="/logo.png" 
>>>>>>> 0d09da8 (Create button and clearn front end.)
            alt="Accountabuddy logo"
            width={40}
            height={40}
            className="rounded-md"
          />
        </Link>
        <span className="text-xl font-bold text-black">Accountabuddy</span>
      </div>
      
      {/* Right side: nav links */}
      <div className="flex items-center space-x-6 text-sm text-black font-medium">
<<<<<<< HEAD
        <a href="/about" className="hover:underline">About</a>
=======
        <Link href="/about" className="hover:underline">About</Link>
>>>>>>> 0d09da8 (Create button and clearn front end.)
        <Link href="/friendlist" className="hover:underline">Friends</Link>
        <Link href="/leaderboard" className="hover:underline">Leaderboard</Link>
        <Link href="/signIn" className="hover:underline">Sign In</Link>
      </div>
    </nav>
  );
}
