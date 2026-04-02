const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// ────────────────────────────────────────────────────────
// TEMPORARY: In-memory storage (no database needed for Week 2)
// ────────────────────────────────────────────────────────
let tasks = [];
let nextId = 1;

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'backend', timestamp: new Date() });
});

// GET all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create task
app.post('/api/tasks', async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  
  try {
    const newTask = {
      id: nextId++,
      title: title,
      completed: false,
      created_at: new Date().toISOString()
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH toggle task completion
app.patch('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = tasks.find(t => t.id === parseInt(id));
    if (!task) return res.status(404).json({ error: 'Task not found' });
    
    task.completed = !task.completed;
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE task
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const index = tasks.findIndex(t => t.id === parseInt(id));
    if (index === -1) return res.status(404).json({ error: 'Task not found' });
    
    tasks.splice(index, 1);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
  console.log('📝 Using in-memory storage (tasks will reset when server restarts)');
  console.log('💡 PostgreSQL will be added in Week 3 with Docker!');
});