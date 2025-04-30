'use client';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Image from 'next/image';

export default function SignInPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-100 via-green-100 to-green-200 text-center px-4">
      {/* Navbar */}
      <Navbar />

      {/* Sign-in Card */}
      <div className="w-full max-w-md p-8 mt-12 rounded-3xl shadow-xl bg-white">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/logo.png"
            alt="Accountabuddy Logo"
            width={64}
            height={64}
            className="mb-3 rounded-md"
          />
          <h1 className="text-4xl font-semibold text-black">Sign In</h1>
        </div>
        <form className="flex flex-col gap-4 text-left">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded-md border border-gray-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded-md border border-gray-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-black text-white py-2 rounded-full hover:bg-gray-800 transition"
          >
            Sign In
          </button>
          <Link href="#" className="text-gray-700 hover:text-black underline mt-2">
            Forgot Password?
          </Link>
        </form>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 mt-8 text-black">
        <p>© 2024 Accountabuddy.</p>
        <a href="#top" className="text-gray-400 hover:text-gray-600">Back to the top</a>
      </footer>
    </main>
  );
}
