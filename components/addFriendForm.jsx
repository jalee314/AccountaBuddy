'use client';
import { useFriendForm } from '../src/hooks/useFriendForm'; // Ensure path is correct

export default function AddFriendForm({ onFriendRequestSent }) {
  // The hook now manages statusMessage internally and returns it
  const { email, setEmail, handleSubmit, statusMessage, isLoading } = useFriendForm();

  const handleFormSubmit = async (event) => {
    // handleSubmit from the hook now takes the event and returns the result
    const submissionResult = await handleSubmit(event);

    // If the submission was successful and the callback exists, call it
    if (onFriendRequestSent && submissionResult && submissionResult.success) {
        onFriendRequestSent(); // This will trigger fetchData in DashboardPage
    }
    // The statusMessage will be displayed automatically as it's part of the useFriendForm hook's state
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4 p-4 border border-black rounded-lg shadow">
      <h3 className="text-lg font-bold text-black">Add a Friend</h3>
      <div>
        <label htmlFor="friendEmail" className="block text-sm font-medium text-gray-700">
          Friend's Email Address
        </label>
        <input
          type="email"
          id="friendEmail"
          name="friendEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-black"
          placeholder="friend@example.com"
          disabled={isLoading}
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-sky-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-gray-300 disabled:text-gray-500"
      >
        {isLoading ? 'Sending...' : 'Send Friend Request'}
      </button>
      {statusMessage && (
        <p className={`mt-2 text-sm ${statusMessage.includes('sent!') || statusMessage.includes('success') || statusMessage.includes('accepted') ? 'text-green-600' : 'text-red-600'}`}>
          {statusMessage}
        </p>
      )}
    </form>
  );
}