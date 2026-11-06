
import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

const initialTasks = [
  {
    id: 1,
    title: "Develop login page",
    description: "Create responsive login UI",
    priority: "High",
    status: "Todo",
    assignedTo: "Rahul",
    dueDate: "2026-11-06",
  },
  {
    id: 2,
    title: "Create REST API",
    description: "Develop user API",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "Priya",
    dueDate: "2026-11-07",
  },
  {
    id: 3,
    title: "Fix dashboard bugs",
    description: "Resolve UI issues",
    priority: "High",
    status: "Completed",
    assignedTo: "Amit",
    dueDate: "2026-11-05",
  },
  {
    id: 4,
    title: "Database integration",
    description: "Connect MongoDB",
    priority: "Low",
    status: "Todo",
    assignedTo: "Neha",
    dueDate: "2026-11-08",
  },
  {
    id: 5,
    title: "Write unit tests",
    description: "Test React components",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "Rahul",
    dueDate: "2026-11-09",
  },
];

const emptyForm = {
  title: "",
  description: "",
  priority: "Medium",
  status: "Todo",
  assignedTo: "",
  dueDate: "",
};

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("task-manager-data");
      return saved ? JSON.parse(saved) : initialTasks;
    } catch {
      return initialTasks;
    }
  });

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("task-manager-data", JSON.stringify(tasks));
  }, [tasks]);

  // Dashboard statistics
  const stats = useMemo(() => ({
    total: tasks.length,
    todo: tasks.filter(t => t.status === "Todo").length,
    progress: tasks.filter(t => t.status === "In Progress").length,
    completed: tasks.filter(t => t.status === "Completed").length,
  }), [tasks]);

  // Search, filter and sort
  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task =>
        task.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter(task =>
        priorityFilter === "All" || task.priority === priorityFilter
      )
      .filter(task =>
        statusFilter === "All" || task.status === statusFilter
      )
      .sort((a, b) =>
        sortOrder === "asc"
          ? a.dueDate.localeCompare(b.dueDate)
          : b.dueDate.localeCompare(a.dueDate)
      );
  }, [tasks, search, priorityFilter, statusFilter, sortOrder]);

  // Open add form
  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setShowModal(true);
  };

  // Open edit form
  const openEditModal = (task) => {
    setEditingId(task.id);
    setForm({ ...task });
    setError("");
    setShowModal(true);
  };

  // Update form fields
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Create or update task
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setError("Task title is required.");
      return;
    }

    if (!form.dueDate) {
      setError("Due date is required.");
      return;
    }

    if (editingId) {
      setTasks(prev =>
        prev.map(task =>
          task.id === editingId
            ? { ...form, title: form.title.trim() }
            : task
        )
      );
    } else {
      const newTask = {
        ...form,
        id: Date.now(),
        title: form.title.trim(),
      };

      setTasks(prev => [...prev, newTask]);
    }

    setShowModal(false);
    setForm(emptyForm);
    setError("");
  };

  // Delete with confirmation
  const deleteTask = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmed) {
      setTasks(prev => prev.filter(task => task.id !== id));
    }
  };

  // Update task status directly
  const updateStatus = (id, status) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, status } : task
      )
    );
  };

  const formatDate = (date) => {
    return new Date(date + "T00:00:00").toLocaleDateString(
      "en-IN",
      { day: "numeric", month: "short", year: "numeric" }
    );
  };

  const priorityClass = (priority) =>
    priority.toLowerCase();

  const statusClass = (status) =>
    status.toLowerCase().replace(" ", "-");

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">✓</div>
          <span>TaskFlow</span>
        </div>

        <div className="sidebar-label">WORKSPACE</div>

        <div className="nav-item active">
          <span>▦</span> Dashboard
        </div>

        <div className="nav-item">
          <span>☷</span> My Tasks
        </div>

        <div className="nav-item">
          <span>◷</span> Activity
        </div>

        <div className="sidebar-bottom">
          <div className="avatar">U</div>
          <div>
            <strong>Workspace User</strong>
            <small>Administrator</small>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <div className="breadcrumb">Workspace / Dashboard</div>
            <h1>Task Dashboard</h1>
            <p className="subtitle">
              Manage and track your team's work in one place.
            </p>
          </div>

          <button className="primary-btn" onClick={openAddModal}>
            + Add New Task
          </button>
        </header>

        {/* Dashboard cards */}
        <section className="stats-grid">
          <StatCard
            title="Total Tasks"
            value={stats.total}
            icon="▤"
            color="blue"
          />

          <StatCard
            title="To Do"
            value={stats.todo}
            icon="◷"
            color="orange"
          />

          <StatCard
            title="In Progress"
            value={stats.progress}
            icon="↻"
            color="purple"
          />

          <StatCard
            title="Completed"
            value={stats.completed}
            icon="✓"
            color="green"
          />
        </section>

        {/* Task list */}
        <section className="task-section">
          <div className="section-heading">
            <div>
              <h2>All Tasks</h2>
              <p>View and manage your tasks.</p>
            </div>
            <span className="task-count">
              {filteredTasks.length} tasks
            </span>
          </div>

          {/* Search and filters */}
          <div className="toolbar">
            <div className="search-box">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search tasks by title..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <select
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value)}
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>

            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
            >
              <option value="asc">Due Date: Earliest</option>
              <option value="desc">Due Date: Latest</option>
            </select>
          </div>

          {/* Tasks table */}
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>TASK</th>
                  <th>ASSIGNED TO</th>
                  <th>PRIORITY</th>
                  <th>DUE DATE</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {filteredTasks.map(task => (
                  <tr key={task.id}>
                    <td>
                      <div className="task-title">
                        {task.title}
                      </div>
                      <div className="task-description">
                        {task.description}
                      </div>
                    </td>

                    <td>
                      <div className="assignee">
                        <div className="mini-avatar">
                          {task.assignedTo
                            ? task.assignedTo[0].toUpperCase()
                            : "?"}
                        </div>
                        {task.assignedTo || "Unassigned"}
                      </div>
                    </td>

                    <td>
                      <span className={`priority ${priorityClass(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>

                    <td>{formatDate(task.dueDate)}</td>

                    <td>
                      <select
                        className={`status-select ${statusClass(task.status)}`}
                        value={task.status}
                        onChange={e =>
                          updateStatus(task.id, e.target.value)
                        }
                        aria-label={`Change status of ${task.title}`}
                      >
                        <option value="Todo">Todo</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>

                    <td>
                      <div className="actions">
                        <button
                          className="icon-btn edit"
                          title="Edit task"
                          onClick={() => openEditModal(task)}
                        >
                          ✎
                        </button>

                        <button
                          className="icon-btn delete"
                          title="Delete task"
                          onClick={() => deleteTask(task.id)}
                        >
                          ♲
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredTasks.length === 0 && (
                  <tr>
                    <td colSpan="6" className="empty-state">
                      <div>📋</div>
                      <strong>No tasks found</strong>
                      <p>Try changing your search or filters.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <footer>
          TaskFlow © 2026 · Task Management Dashboard
        </footer>
      </main>

      {/* Add/Edit modal */}
      {showModal && (
        <div
          className="modal-overlay"
          onMouseDown={e => {
            if (e.target === e.currentTarget) {
              setShowModal(false);
            }
          }}
        >
          <div className="modal">
            <div className="modal-header">
              <div>
                <h2>
                  {editingId ? "Edit Task" : "Create New Task"}
                </h2>
                <p>
                  {editingId
                    ? "Update your task details."
                    : "Fill in the details to create a task."}
                </p>
              </div>

              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label>Task Title *</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter task title"
                required
              />

              <label>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your task..."
                rows="3"
              />

              <div className="form-row">
                <div>
                  <label>Priority</label>
                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>

                <div>
                  <label>Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option>Todo</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>

              <label>Assigned To</label>
              <input
                name="assignedTo"
                value={form.assignedTo}
                onChange={handleChange}
                placeholder="Enter assignee name"
              />

              <label>Due Date *</label>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                required
              />

              {error && (
                <div className="error-message">{error}</div>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="primary-btn">
                  {editingId ? "Save Changes" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="stat-card">
      <div>
        <p>{title}</p>
        <h2>{value}</h2>
      </div>
      <div className={`stat-icon ${color}`}>{icon}</div>
    </div>
  );
}

export default App;
