import React, { useEffect, useState } from 'react';
import api from './api';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTasks = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    const res = await api.post('/tasks', { title });
    setTasks([...tasks, res.data]);
    setTitle('');
  };

  const toggleTask = async (task) => {
    const res = await api.put(`/tasks/${task._id}`, { ...task, completed: !task.completed });
    setTasks(tasks.map(t => (t._id === task._id ? res.data : t)));
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Task Manager</h1>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="New task"
      />
      <button onClick={addTask}>Add</button>
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
}

export default App;
