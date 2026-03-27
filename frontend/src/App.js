import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || '/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_URL}/tasks`);
      const data = await res.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to connect to backend. Is it running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTask }),
      });
      const task = await res.json();
      setTasks([task, ...tasks]);
      setNewTask('');
    } catch (err) {
      setError('Failed to add task.');
    }
  };

  const toggleTask = async (id) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, { method: 'PATCH' });
      const updated = await res.json();
      setTasks(tasks.map(t => t.id === id ? updated : t));
    } catch (err) {
      setError('Failed to update task.');
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete task.');
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div className="logo">⚙️</div>
          <h1>Task Manager</h1>
          <p className="subtitle">Containerized Multi-Service App</p>
          <div className="badges">
            <span className="badge docker">🐳 Docker</span>
            <span className="badge k8s">☸️ Kubernetes</span>
            <span className="badge devops">🔁 DevOps</span>
          </div>
        </header>

        {error && <div className="error-banner">⚠️ {error}</div>}

        <form className="task-form" onSubmit={addTask}>
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            className="task-input"
          />
          <button type="submit" className="add-btn">Add Task</button>
        </form>

        <div className="stats">
          <span>{tasks.length} total</span>
          <span className="dot">·</span>
          <span>{completedCount} completed</span>
          <span className="dot">·</span>
          <span>{tasks.length - completedCount} remaining</span>
        </div>

        <div className="task-list">
          {loading && <div className="loading">Connecting to backend...</div>}
          {!loading && tasks.length === 0 && (
            <div className="empty">No tasks yet. Add one above! 🎯</div>
          )}
          {tasks.map(task => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <button className="check-btn" onClick={() => toggleTask(task.id)}>
                {task.completed ? '✅' : '⬜'}
              </button>
              <span className="task-title">{task.title}</span>
              <span className="task-date">
                {new Date(task.created_at).toLocaleDateString()}
              </span>
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>🗑️</button>
            </div>
          ))}
        </div>

        <footer className="footer">
          <p>Running on <strong>React</strong> + <strong>Node.js</strong> + <strong>PostgreSQL</strong></p>
        </footer>
      </div>
    </div>
  );
}

export default App;
