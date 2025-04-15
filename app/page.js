// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-100 via-green-100 to-green-200 text-center px-4">
      {/* Header */}
      <Navbar />
      
      <section className="flex flex-col items-center text-center mt-32 max-w-xl">
        {/* <div className="bg-white rounded-3xl p-4 shadow-xl mb-8">
                  <Image
                    src="/two_bots.png"
                    alt="Two bots working together"
                    width={400}
                    height={350}
                    className="rounded-xl"
                  />
                </div> */}
        <h2 className="text-4xl font-semibold mb-4 text-black">Empower your progress. Achieve More <span className="text-green-600">together.</span></h2>
        <p className="text-lg text-gray-700 mb-8">
          Responsibility and Action through community-powered reporting.
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
            className="border border-black text-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition"
          >
            Invite a Friend
          </Link>
        </div>


        <div className="mt-12 w-full max-w-sm">
          {/* Illustration placeholder (could be replaced with SVG/Canvas/Img) */}
          <div className="border-t border-black opacity-20 h-20 w-full rounded-sm bg-no-repeat bg-center bg-contain" style={{ backgroundImage: 'url(/illustration-line-art.png)' }} />
        </div>


      {/* Card section */}
      <section className="">
        {/*grid container */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-2 gap-12">
        {/*first card image */}
        <div className=" p-6 rounded-lg  flex flex-col justify-between transform transition-transform duration-300 hover:scale-105">
            <Image
              src="/accountabuddy_card_1.png"
              alt="card_1"
              width={400}
              height={200}
              className="rounded-lg"
            />
          </div>

          {/* first card text*/}
          <div>
            <h2 className="mt-4 text-2xl text-black font-bold">Keep yourself accountable.</h2>
              <p className="text-gray-500 mt-2">
                See your friends' realtime progress and keep them going.
              </p>
              <br></br>
              <Link href="/study" className="mt-4 bg-blue-800 text-white py-2 px-6 rounded transform transition-transform duration-300 hover:scale-105 hover:bg-blue-600">
                Try it out
              </Link>
          </div>
          {/* second card text*/}
          <div>
            <h2 className="mt-4 text-2xl text-black font-bold">Instantly start achieving your goals</h2>
              <p className="text-gray-500 mt-2">
                  Build personalized checklists to keep track of your goals and achievements.
              </p>
              <br></br>
              <Link href="/study" className="mt-4 bg-blue-800 text-white py-2 px-6 rounded transform transition-transform duration-300 hover:scale-105 hover:bg-blue-600">
                Get started
              </Link>
          </div>
          {/*second card image */}
          <div className=" p-6 rounded-lg flex flex-col justify-between transform transition-transform duration-300 hover:scale-105">
            <Image
              src="/two_bots.png" // Replace with the actual image path
              alt="card_2"
              width={400}
              height={200}
            />
          </div>
        </div>
      </section>
      </section>


            {/* Footer */}
            <footer className="text-center py-4 mt-40 border-t text-black border-gray-700">
        <p>© 2024 Accountabuddy.</p>
        <a href="#top" className="text-gray-400">Back to the top</a>
      </footer>
    </main>


  );
}
