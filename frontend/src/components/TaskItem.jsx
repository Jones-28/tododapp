import React from "react";

export default function TaskItem({ task, onEdit, onDelete }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur-md p-5 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between gap-4">
        {/* LEFT: Task Info */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>

          <p className="text-sm text-slate-600 mt-1">
            {task.description ? (
              task.description
            ) : (
              <em className="text-slate-400">No description</em>
            )}
          </p>

          {/* Status Badge */}
          <p className="text-sm mt-2">
            Status:{" "}
            <span
              className={`px-2 py-1 rounded-md text-xs font-medium ${
                task.status === "completed"
                  ? "bg-emerald-100 text-emerald-700"
                  : task.status === "in-progress"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              {task.status}
            </span>
          </p>

          {/* Timestamp */}
          <p className="text-xs text-slate-400 mt-1">
            Created: {new Date(task.createdAt).toLocaleString()}
          </p>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white shadow hover:bg-blue-700 transition"
          >
            Edit
          </button>

          <button
            onClick={() => {
              if (window.confirm("Delete this task?")) onDelete(task._id);
            }}
            className="px-3 py-1.5 text-sm rounded-lg bg-rose-600 text-white shadow hover:bg-rose-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
