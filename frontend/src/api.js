const API_BASE = "http://localhost:3000/api";

async function handleRes(res) {
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw json;
  }
  return res.json().catch(() => ({}));
}

export async function fetchTasks({ status, page, limit } = {}) {
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  if (page) params.append("page", page);
  if (limit) params.append("limit", limit);
  const res = await fetch(`${API_BASE}/tasks?${params.toString()}`);
  return handleRes(res);
}

export async function createTask(payload) {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleRes(res);
}

export async function updateTask(id, payload) {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleRes(res);
}

export async function deleteTask(id) {
  const res = await fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" });
  return handleRes(res);
}
