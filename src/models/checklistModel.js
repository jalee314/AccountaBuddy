// In-memory model logic for now
export const createNewChecklist = (id) => ({
  id,
  tasks: [],
});

export const createNewTask = (tasks, name) => ({
  id: tasks.length + 1,
  text: name,
  completed: false,
});