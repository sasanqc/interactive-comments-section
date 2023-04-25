import { getAll, deleteOne, createOne, updateOne, getOne } from "./apiFactory";
const API_DOMAIN = "http://localhost:3000/api/v1";

export const getAllComments = async () => getAll("comments");

export const deleteComment = async (id) => deleteOne(id, "comments");

export const updateComment = async (id, comment) =>
  updateOne(id, comment, "comments");

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
export const signup = async (credentials) =>
  createOne(credentials, "users/signup");
export const login = async (credentials) =>
  createOne(credentials, "users/login");
export const refresh = async () => getOne("refresh", "users");
export const logout = async () => getOne("logout", "users");
