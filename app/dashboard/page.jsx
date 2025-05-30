'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import AddFriendForm from '../../components/addFriendForm';
import CreateChecklistForm from '../../components/CreateChecklistForm';
import ChecklistView from '../../src/views/ChecklistView';
import {
  getOutgoingPendingRequests,
  getIncomingPendingRequests,
  acceptFriendRequest,
  declineFriendRequest,
  getAcceptedFriendsOptimized as getAcceptedFriends,
} from '../../src/controllers/friendController';

// FriendUserDisplay component (as defined in the previous response)
const FriendUserDisplay = ({ user, children, requestDate }) => (
  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors duration-150 ease-in-out space-x-2 border border-slate-200">
    <div className="flex items-center space-x-3 flex-grow min-w-0">
      <img src={user?.profile_pic_src || '/avatar_1.png'} alt={user?.display_name || user?.email || 'User Avatar'} className="w-10 h-10 rounded-full object-cover flex-shrink-0" onError={(e) => { e.currentTarget.src = '/avatar_png_1.png'; }}/>
      <div className="min-w-0 flex-grow">
        <p className="font-medium text-slate-900 truncate" title={user?.display_name || 'Unnamed User'}>{user?.display_name || 'Unnamed User'}</p>
        <p className="text-sm text-slate-600 truncate" title={user?.email || 'No email'}>{user?.email || 'No email'}</p>
        {requestDate && <p className="text-xs text-slate-500 mt-0.5">Requested: {new Date(requestDate).toLocaleDateString()}</p>}
      </div>
    </div>
    <div className="flex items-center space-x-2 flex-shrink-0">{children}</div>
  </div>
);


export default function DashboardPage() {
  // Friend States
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const [friendActionStatus, setFriendActionStatus] = useState({});
  const [isLoadingFriends, setIsLoadingFriends] = useState(true);
  
  // Checklist Creation States
  const [showCreateChecklistForm, setShowCreateChecklistForm] = useState(false);
  const [checklistRefreshTrigger, setChecklistRefreshTrigger] = useState(0);

  const fetchFriendData = useCallback(async () => {
    setIsLoadingFriends(true);
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
      console.error("Error fetching friend data:", error);
    } finally {
      setIsLoadingFriends(false);
    }
  }, []);

  useEffect(() => {
    fetchFriendData();
  }, [fetchFriendData]);

  const handleFriendAction = async (actionType, userId) => {
    const actionFunction = actionType === 'accept' ? acceptFriendRequest : declineFriendRequest;
    setFriendActionStatus(prev => ({ ...prev, [userId]: `${actionType === 'accept' ? 'Accepting' : 'Declining'}...` }));
    const result = await actionFunction(userId);
    setFriendActionStatus(prev => ({ ...prev, [userId]: result.message }));
    if (result.success) {
      await fetchFriendData();
      setTimeout(() => {
        setFriendActionStatus(prev => {
          const newStatus = { ...prev };
          delete newStatus[userId];
          return newStatus;
        });
      }, 3000);
    }
  };
  
  const handleChecklistCreated = (newChecklist) => {
    setShowCreateChecklistForm(false);
    setChecklistRefreshTrigger(prev => prev + 1); 
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-orange-100 via-green-100 to-green-200 px-4 py-8 pt-24">
        <div className="w-full max-w-5xl bg-white p-6 md:p-8 rounded-2xl shadow-xl flex flex-col gap-8 md:gap-10">

          {/* Section 1: Add Friend Form */}
          <section className="w-full">
            <AddFriendForm onFriendRequestSent={fetchFriendData} />
          </section>

          {/* Section 2: Friend Management Lists */}
          <div className="w-full border-t border-slate-200 pt-8 space-y-6">
            <h2 className="text-2xl font-bold text-black text-center mb-6">Manage Connections</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
                <h3 className="text-lg font-semibold text-black border-b border-slate-300 pb-2">Incoming Requests ({incomingRequests.length})</h3>
                {(isLoadingFriends && incomingRequests.length === 0) && <p className="text-sm text-slate-500">Loading...</p>}
                {(!isLoadingFriends && incomingRequests.length === 0) && <p className="text-sm text-slate-500">No incoming requests.</p>}
                {incomingRequests.map((req) => ( <FriendUserDisplay key={req.user_id} user={req} requestDate={req.requested_at}> <button onClick={() => handleFriendAction('accept', req.original_requester_id)} className="px-3 py-1 text-xs text-black bg-green-500 rounded hover:bg-green-600">Accept</button> <button onClick={() => handleFriendAction('decline', req.original_requester_id)} className="px-3 py-1 text-xs text-black bg-red-500 rounded hover:bg-red-600">Decline</button> {friendActionStatus[req.original_requester_id] && <p className="text-xs mt-1 text-black">{friendActionStatus[req.original_requester_id]}</p>} </FriendUserDisplay> ))}
              </div>
              <div className="space-y-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
                <h3 className="text-lg font-semibold text-black border-b border-slate-300 pb-2">Sent Requests ({outgoingRequests.length})</h3>
                {(isLoadingFriends && outgoingRequests.length === 0) && <p className="text-sm text-slate-500">Loading...</p>}
                {(!isLoadingFriends && outgoingRequests.length === 0) && <p className="text-sm text-slate-500">No sent requests.</p>}
                {outgoingRequests.map((req) => (<FriendUserDisplay key={req.user_id} user={req} requestDate={req.requested_at}><span className="text-xs text-slate-500 italic">Pending</span></FriendUserDisplay>))}
              </div>
              <div className="space-y-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
                <h3 className="text-lg font-semibold text-black border-b border-slate-300 pb-2">Your Friends ({acceptedFriends.length})</h3>
                {(isLoadingFriends && acceptedFriends.length === 0) && <p className="text-sm text-slate-500">Loading...</p>}
                {(!isLoadingFriends && acceptedFriends.length === 0) && <p className="text-sm text-slate-500">No friends yet.</p>}
                {acceptedFriends.map((friend) => (<FriendUserDisplay key={friend.user_id} user={friend} />))}
              </div>
            </div>
          </div>

          {/* Section 3: Checklist Management Area */}
          <section className="w-full border-t border-slate-200 pt-8">
             <h2 className="text-2xl font-bold text-black text-center mb-6">Accountability Checklists</h2>
            {!showCreateChecklistForm && (
              <div className="text-center mb-6">
                <button onClick={() => setShowCreateChecklistForm(true)} className="px-6 py-3 text-sm font-medium text-black bg-sky-600 hover:bg-sky-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                  Create New Checklist
                </button>
              </div>
            )}
            {showCreateChecklistForm && (
              <div className="mb-6">
                <CreateChecklistForm onChecklistCreated={handleChecklistCreated} onCancel={() => setShowCreateChecklistForm(false)} />
              </div>
            )}
            
            {/* CORRECTED: The <hr /> is now rendered unconditionally as a separator */}
            <hr className="my-6 border-slate-300" />
            
            <ChecklistView refreshTrigger={checklistRefreshTrigger} />
          </section>
        </div>
      </main>
    </>
  );
}