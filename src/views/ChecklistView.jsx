'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getChecklistsCreatedByMe,
  getChecklistsAssignedToMe,
  getTasksForChecklist,
  createTask,
  markTaskAsComplete,
} from '../controllers/checklistController'; // Ensure path is correct

const TaskItem = ({ task, canComplete, onCompleteTask }) => (
  <li className={`py-2 px-3 flex justify-between items-center border-b ${task.completed ? 'bg-green-50 line-through text-gray-500' : 'bg-white'}`}>
    <div>
      <span className="font-medium text-gray-900">{task.title}</span>
      {task.description && <p className="text-xs text-gray-600">{task.description}</p>}
      <p className="text-xs text-blue-500">Points: {task.points}</p>
    </div>
    {canComplete && !task.completed && (
      <button onClick={() => onCompleteTask(task.task_id)} className="ml-4 px-3 py-1 text-xs font-medium text-white bg-green-500 rounded hover:bg-green-600 transition-colors">Done</button>
    )}
    {task.completed && <span className="text-xs text-green-600 ml-4">Completed!</span>}
  </li>
);

const ChecklistDisplayItem = ({ checklist, title, onSelectChecklist, isSelected }) => (
    <div className={`p-4 rounded-lg shadow-sm cursor-pointer mb-2 ${isSelected ? 'ring-2 ring-sky-500 bg-sky-50' : 'bg-gray-50 hover:bg-gray-100'}`} onClick={() => onSelectChecklist(checklist)}>
        <h3 className="font-semibold text-gray-800">{checklist.title}</h3>
        {title && <p className="text-sm text-gray-600">{title}</p>}
    </div>
);

const AddTaskFormComponent = ({ checklistId, onTaskAdded, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) { setMessage({ type: 'error', text: 'Task title is required.' }); return; }
    setIsSubmitting(true);
    const result = await createTask(checklistId, { title, description, points: Number(points) });
    setIsSubmitting(false);
    if (result.success) {
      setMessage({ type: 'success', text: 'Task added!' });
      setTitle(''); setDescription(''); setPoints(10);
      if (onTaskAdded) onTaskAdded(result.task);
      setTimeout(() => setMessage({ type: '', text: '' }), 2000); // Shorter timeout for message
    } else {
      setMessage({ type: 'error', text: result.message || 'Failed to add task.' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 my-4 bg-white border border-gray-200 rounded-lg shadow">
      <h4 className="font-semibold text-md text-gray-700">Add New Task to Checklist</h4>
      <div>
        <label htmlFor={`taskTitle-${checklistId}`} className="block text-sm font-medium text-gray-700">Title</label>
        <input type="text" id={`taskTitle-${checklistId}`} value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm text-black" disabled={isSubmitting}/>
      </div>
      <div>
        <label htmlFor={`taskDescription-${checklistId}`} className="block text-sm font-medium text-gray-700">Description (Optional)</label>
        <textarea id={`taskDescription-${checklistId}`} value={description} onChange={(e) => setDescription(e.target.value)} rows="2" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm text-black" disabled={isSubmitting}/>
      </div>
      <div>
        <label htmlFor={`taskPoints-${checklistId}`} className="block text-sm font-medium text-gray-700">Points</label>
        <input type="number" id={`taskPoints-${checklistId}`} value={points} onChange={(e) => setPoints(e.target.value)} min="0" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm text-black" disabled={isSubmitting}/>
      </div>
      {message.text && (<p className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{message.text}</p>)}
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} disabled={isSubmitting} className="px-3 py-1.5 text-sm bg-gray-200 rounded-md hover:bg-gray-300">Cancel</button>
        <button type="submit" disabled={isSubmitting} className="px-3 py-1.5 text-sm text-white bg-sky-600 rounded-md hover:bg-sky-700 disabled:bg-gray-400">{isSubmitting ? 'Adding...' : 'Add Task'}</button>
      </div>
    </form>
  );
};

export default function ChecklistView({ refreshTrigger }) {
  const [myChecklists, setMyChecklists] = useState([]);
  const [friendsChecklists, setFriendsChecklists] = useState([]);
  const [selectedChecklist, setSelectedChecklist] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState({ checklists: true, tasks: false });
  const [taskCompletionMessage, setTaskCompletionMessage] = useState('');
  const [showAddTaskFormForChecklistId, setShowAddTaskFormForChecklistId] = useState(null);

  const fetchAllChecklists = useCallback(async () => {
    setIsLoading(prev => ({ ...prev, checklists: true }));
    try {
      const [my, assigned] = await Promise.all([getChecklistsCreatedByMe(), getChecklistsAssignedToMe()]);
      setMyChecklists(my || []);
      setFriendsChecklists(assigned || []);
    } catch (error) {
        console.error("Error fetching checklists:", error);
    } finally {
        setIsLoading(prev => ({ ...prev, checklists: false }));
    }
  }, []);

  useEffect(() => {
    fetchAllChecklists();
  }, [fetchAllChecklists, refreshTrigger]);

  const loadTasksForChecklist = useCallback(async (checklistId) => {
    if (!checklistId) { setTasks([]); return; }
    setIsLoading(prev => ({ ...prev, tasks: true }));
    try {
        const fetchedTasks = await getTasksForChecklist(checklistId);
        setTasks(fetchedTasks || []);
    } catch (error) {
        console.error("Error fetching tasks:", error);
    } finally {
        setIsLoading(prev => ({ ...prev, tasks: false }));
    }
  }, []);

  const handleSelectChecklist = (checklist, type) => {
    setSelectedChecklist({ type, data: checklist });
    loadTasksForChecklist(checklist.checklist_id);
    setShowAddTaskFormForChecklistId(null); 
  };
  
  const handleCompleteTask = async (taskId) => {
    setTaskCompletionMessage('Processing...');
    const result = await markTaskAsComplete(taskId);
    setTaskCompletionMessage(result.message);
    if (result.success && selectedChecklist) { 
      loadTasksForChecklist(selectedChecklist.data.checklist_id);
    }
    setTimeout(() => setTaskCompletionMessage(''), 3000);
  };

  const handleTaskAdded = (newTask) => {
    if (selectedChecklist) {
        setTasks(prevTasks => [...prevTasks, newTask].sort((a,b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()));
        // Or more reliably: loadTasksForChecklist(selectedChecklist.data.checklist_id);
    }
    setShowAddTaskFormForChecklistId(null); 
  };

  return (
    <div className="w-full space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-2">My Checklists (Assigned to Friends)</h2>
          {isLoading.checklists ? <p className="text-sm text-gray-500">Loading...</p> : myChecklists.length === 0 ? <p className="text-sm text-gray-500">No checklists created by you.</p> : (
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">{myChecklists.map(cl => (<ChecklistDisplayItem key={cl.checklist_id} checklist={cl} title={`To: ${cl.designated_friend?.display_name || 'Friend'}`} onSelectChecklist={() => handleSelectChecklist(cl, 'my')} isSelected={selectedChecklist?.type === 'my' && selectedChecklist?.data.checklist_id === cl.checklist_id}/>))}</div>
          )}
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-2">Friend's Checklists (Assigned to Me)</h2>
          {isLoading.checklists ? <p className="text-sm text-gray-500">Loading...</p> : friendsChecklists.length === 0 ? <p className="text-sm text-gray-500">No checklists assigned to you.</p> : (
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">{friendsChecklists.map(cl => (<ChecklistDisplayItem key={cl.checklist_id} checklist={cl} title={`From: ${cl.owner?.display_name || 'A Friend'}`} onSelectChecklist={() => handleSelectChecklist(cl, 'friend')} isSelected={selectedChecklist?.type === 'friend' && selectedChecklist?.data.checklist_id === cl.checklist_id}/>))}</div>
          )}
        </section>
      </div>

      {selectedChecklist && (
        <section className="mt-6 p-4 bg-gray-50 rounded-lg shadow">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Tasks for: <span className="text-sky-600">{selectedChecklist.data.title}</span>
            </h3>
            {selectedChecklist.type === 'my' && showAddTaskFormForChecklistId !== selectedChecklist.data.checklist_id && (
              <button onClick={() => setShowAddTaskFormForChecklistId(selectedChecklist.data.checklist_id)} className="px-3 py-1.5 text-sm text-white bg-sky-500 rounded-md hover:bg-sky-600">Add Task</button>
            )}
          </div>
          {showAddTaskFormForChecklistId === selectedChecklist.data.checklist_id && selectedChecklist.type === 'my' && (
            <AddTaskFormComponent checklistId={selectedChecklist.data.checklist_id} onTaskAdded={handleTaskAdded} onCancel={() => setShowAddTaskFormForChecklistId(null)}/>
          )}
          {isLoading.tasks ? <p className="text-sm text-gray-500">Loading tasks...</p> : tasks.length === 0 ? <p className="text-sm text-gray-500">No tasks in this checklist yet.</p> : (<ul className="space-y-1 bg-white rounded-md shadow-sm">{tasks.map(task => (<TaskItem key={task.task_id} task={task} canComplete={selectedChecklist.type === 'friend'} onCompleteTask={handleCompleteTask}/>))}</ul>)}
          {taskCompletionMessage && <p className="text-sm mt-3 text-black text-center font-medium">{taskCompletionMessage}</p>}
        </section>
      )}
    </div>
  );
}