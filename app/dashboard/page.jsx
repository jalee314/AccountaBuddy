// app/dashboard/page.jsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import Navbar from '../../components/Navbar'; // Corrected path
import AddFriendForm from '../../components/addFriendForm'; // Corrected path
import ChecklistView from '../../src/views/ChecklistView'; // Corrected path
import {
  getOutgoingPendingRequests,
  getIncomingPendingRequests,
  acceptFriendRequest,
  declineFriendRequest,
  getAcceptedFriendsOptimized as getAcceptedFriends,
} from '../../src/controllers/friendController'; // Corrected path

// Helper component to display user information consistently
const UserDisplay = ({ user, children, requestDate }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-150 ease-in-out space-x-2">
    <div className="flex items-center space-x-3 flex-grow min-w-0"> 
      <img
        src="/avatar_1.png"
        alt={user?.display_name || user?.email || 'User Avatar'}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0" 
      />
      <div className="min-w-0 flex-grow"> 
        <p 
          className="font-medium text-gray-900 truncate" 
          title={user?.display_name || 'Unnamed User'}
        >
          {user?.display_name || 'Unnamed User'}
        </p>
        <p 
          className="text-sm text-gray-600 truncate" 
          title={user?.email || 'No email'}
        >
          {user?.email || 'No email'}
        </p>
        {requestDate && <p className="text-xs text-gray-400 mt-0.5">Requested: {new Date(requestDate).toLocaleDateString()}</p>}
      </div>
    </div>
    <div className="flex items-center space-x-2 flex-shrink-0"> {/* Prevent button group from shrinking */}
        {children}
    </div>
  </div>
);

export default function DashboardPage() {
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionStatus, setActionStatus] = useState({}); // For messages on accept/decline

  const fetchData = useCallback(async () => {
    // Avoid setting isLoading to true here if it causes whole page flicker during re-fetch
    // Instead, individual sections can show their own loading state if needed.
    // For initial load, parent isLoading is fine.
    try {
      const [outReq, inReq, friends] = await Promise.all([
        getOutgoingPendingRequests(),
        getIncomingPendingRequests(),
        getAcceptedFriends(),
      ]);
      setOutgoingRequests(outReq || []);
      setIncomingRequests(inReq || []);
      setAcceptedFriends(friends || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      // Potentially set an error state to display to the user
    } finally {
      setIsLoading(false); // Only for initial full page load
    }
  }, []);

  useEffect(() => {
    setIsLoading(true); // Set loading true for the initial fetch sequence
    fetchData();
  }, [fetchData]);

  const handleFriendAction = async (actionType, userId) => {
    const actionFunction = actionType === 'accept' ? acceptFriendRequest : declineFriendRequest;
    const actionVerb = actionType === 'accept' ? 'Accepting...' : 'Declining...';

    setActionStatus(prev => ({ ...prev, [userId]: actionVerb }));
    const result = await actionFunction(userId);
    setActionStatus(prev => ({ ...prev, [userId]: result.message }));

    if (result.success) {
      await fetchData(); // Refresh all data
      // Clear the specific action status message after a few seconds
      setTimeout(() => {
        setActionStatus(prev => {
            const newStatus = {...prev};
            delete newStatus[userId];
            return newStatus;
        });
      }, 3000);
    }
  };


  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-orange-100 via-green-100 to-green-200 px-4 py-8">
        <div className="w-full max-w-4xl bg-white bg-opacity-80 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-xl flex flex-col gap-8 md:gap-12">

          {/* Section 1: Add Friend Form */}
          <section className="w-full">
            <AddFriendForm onFriendRequestSent={fetchData} />
          </section>

          {/* Section 2: Friend Management Lists in a Grid */}
          <div className="w-full grid md:grid-cols-2 gap-6">
            {/* Column 1: Incoming and Outgoing Requests */}
            <div className="space-y-6">
              <section className="p-4 bg-white/50 shadow-inner rounded-lg space-y-3">
                <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-300 pb-2">Incoming Requests ({incomingRequests.length})</h2>
                {(isLoading && incomingRequests.length === 0) && <p className="text-sm text-gray-500">Loading requests...</p>}
                {(!isLoading && incomingRequests.length === 0) && <p className="text-sm text-gray-500">No incoming friend requests.</p>}
                {incomingRequests.map((req) => (
                  <UserDisplay key={req.user_id} user={req} requestDate={req.requested_at}>
                    <button
                      onClick={() => handleFriendAction('accept', req.original_requester_id)}
                      className="px-3 py-1 text-xs font-medium text-white bg-green-500 rounded hover:bg-green-600 transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleFriendAction('decline', req.original_requester_id)}
                      className="px-3 py-1 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
                    >
                      Decline
                    </button>
                    {actionStatus[req.original_requester_id] && <p className="text-xs mt-1 w-full text-center col-span-2">{actionStatus[req.original_requester_id]}</p>}
                  </UserDisplay>
                ))}
              </section>

              <section className="p-4 bg-white/50 shadow-inner rounded-lg space-y-3">
                <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-300 pb-2">Sent Requests ({outgoingRequests.length})</h2>
                {(isLoading && outgoingRequests.length === 0) && <p className="text-sm text-gray-500">Loading sent requests...</p>}
                {(!isLoading && outgoingRequests.length === 0) && <p className="text-sm text-gray-500">No pending sent requests.</p>}
                {outgoingRequests.map((req) => (
                  <UserDisplay key={req.user_id} user={req} requestDate={req.requested_at}>
                      <span className="text-xs text-gray-500 italic">Pending</span>
                  </UserDisplay>
                ))}
              </section>
            </div>

            {/* Column 2: Accepted Friends */}
            <section className="p-4 bg-white/50 shadow-inner rounded-lg space-y-3">
              <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-300 pb-2">Your Friends ({acceptedFriends.length})</h2>
              {(isLoading && acceptedFriends.length === 0) && <p className="text-sm text-gray-500">Loading friends...</p>}
              {(!isLoading && acceptedFriends.length === 0) && <p className="text-sm text-gray-500">You haven't added any friends yet.</p>}
              {acceptedFriends.map((friend) => (
                <UserDisplay key={friend.user_id} user={friend} />
              ))}
            </section>
          </div>

          {/* Section 3: Checklist View */}
          <section className="w-full">
            <ChecklistView />
          </section>

        </div>
      </main>
    </>
  );
}