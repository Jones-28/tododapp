import React, { useState, useEffect } from "react";

export default function TaskForm({ onCreate, initial = null, onCancel }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [status, setStatus] = useState(initial?.status || "pending");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(initial?.title || "");
    setDescription(initial?.description || "");
    setStatus(initial?.status || "pending");
  }, [initial]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Title cannot be empty");
    setLoading(true);
    try {
      await onCreate({
        title: title.trim(),
        description: description.trim(),
        status,
      });
      setTitle("");
      setDescription("");
      setStatus("pending");
      if (onCancel) onCancel();
    } catch (err) {
      console.error(err);
      alert(err?.error || "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="space-y-4 rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-xl p-5 sm:p-6 shadow-md"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-slate-900">
          {initial ? "Edit Task" : "Add Task"}
        </h3>
        {initial && (
          <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-600 border border-amber-100">
            Editing
          </span>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">
          Title <span className="text-rose-500">*</span>
        </label>
        <input
          placeholder="e.g. Finish MERN Task Manager UI"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">
          Description
        </label>
        <textarea
          placeholder="Add some details about the task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 resize-none"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-md hover:shadow-lg hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && (
            <span className="h-3 w-3 animate-spin rounded-full border border-white border-r-transparent" />
          )}
          {loading ? "Saving..." : initial ? "Save Changes" : "Create Task"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
