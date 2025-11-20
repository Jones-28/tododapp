/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import * as api from "../api";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await api.fetchTasks({
        status: filter || undefined,
        page,
        limit: 20,
      });
      setTasks(res.tasks || []);
      setTotal(res.total || 0);
    } catch (err) {
      console.error(err);
      alert(err?.error || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [filter, page]);

  async function handleCreate(payload) {
    const created = await api.createTask(payload);
    // If we are on page 1 and no filter, prepend (or reload)
    setTasks((prev) => [created, ...prev]);
  }

  async function handleEdit(id, payload) {
    const updated = await api.updateTask(id, payload);
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    setEditing(null);
  }

  async function handleDelete(id) {
    await api.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  }

  return (
    <div className="space-y-6">
      {/* Top: Create form + filter */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,2.3fr)_minmax(0,1fr)] items-start">
        <TaskForm onCreate={handleCreate} />

        <div className="rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-xl p-4 sm:p-5 shadow-md">
          <div className="flex items-center justify-between gap-2 mb-3">
            <h3 className="text-sm font-semibold text-slate-900">
              Filters & Summary
            </h3>
            <span className="text-[11px] rounded-full bg-slate-100 px-2 py-0.5 text-slate-500">
              Total: {total}
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-600">
              Filter by status
            </label>
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <p className="mt-3 text-[11px] text-slate-500 leading-snug">
              Use the filter to quickly narrow down tasks by status.
            </p>
          </div>
        </div>
      </div>

      {/* Edit form (inline) */}
      {editing && (
        <TaskForm
          initial={editing}
          onCreate={(payload) => handleEdit(editing._id, payload)}
          onCancel={() => setEditing(null)}
        />
      )}

      {/* List / loading / empty states */}
      {loading ? (
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="h-4 w-4 animate-spin rounded-full border border-slate-400 border-r-transparent" />
          <span>Loading tasks...</span>
        </div>
      ) : tasks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 p-8 text-center text-sm text-slate-500">
          No tasks found for this filter.
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {tasks.map((t) => (
              <TaskItem
                key={t._id}
                task={t}
                onEdit={(task) => setEditing(task)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
