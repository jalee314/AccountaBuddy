import Navbar from '../../components/Navbar';

export default function AccountPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen flex flex-col items-center bg-gradient-to-b from-orange-100 via-green-100 to-green-200 text-center px-4">
        <p className="text-5xl text-black">If you see this then that means your account is detected by the backend.</p>
      </main>
    </>
  );
}