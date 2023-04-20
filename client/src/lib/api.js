const API_DOMAIN = "http://localhost:3500/api/v1";

export async function getAllComments() {
  const response = await fetch(`${API_DOMAIN}/comments`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch comments.");
  }
  return data.data.comments;
}

export async function deleteComment(id) {
  const response = await fetch(`${API_DOMAIN}/comments/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Could not delete comment.");
  }
}

export async function updateComment(id, comment) {
  const response = await fetch(`${API_DOMAIN}/comments/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  if (!response.ok) {
    throw new Error("Could not update comment.");
  }
  const data = await response.json();
  return data.data.data;
}

export async function createComment(comment) {
  const response = await fetch(`${API_DOMAIN}/comments/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  if (!response.ok) {
    throw new Error("Could not create comment.");
  }
  const data = await response.json();
  return data.data.data;
}
