import React from "react";
import TaskList from "./components/TaskList";

export default function App() {
  return (
    <div className="min-h-screen  m-6">
      {/* Accent bar */}
      <div />

      <header className="backdrop-blur bg-purple/70 border-b border-slate-200">
        <div className="container-max py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-sky-500 flex items-center justify-center shadow-md">
              <span className="text-white text-lg font-semibold">T</span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                Task Manager
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container-max py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-xl rounded-2xl p-5 sm:p-6">
              {/* You can add a small section header if you like */}
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Your Tasks
                  </h2>
                  <p className="text-xs text-slate-500">
                    Manage all your tasks in one place.
                  </p>
                </div>
              </div>

              <TaskList />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
