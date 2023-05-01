import { getAll, deleteOne, createOne, updateOne, getOne } from "./apiFactory";
const API_DOMAIN = "http://localhost:3000/api/v1";

export const getAllComments = async () => getAll("comments");
export const deleteComment = async (id) => deleteOne(id, "comments");
export const updateComment = async (id, comment) =>
  updateOne(id, comment, "comments");
export const createComment = async (comment) => createOne(comment, "comments");

export const signup = async (credentials) =>
  createOne(credentials, "users/signup");
export const login = async (credentials) =>
  createOne(credentials, "users/login");
export const refresh = async () => getOne("refresh", "users");
export const logout = async () => getOne("logout", "users");
export const updateMe = async (data) => {
  try {
    const formData = new FormData();
    formData.append("username", data.username);
    if (data.selectedFile) {
      formData.append("photo", data.selectedFile);
    }
    const response = await fetch(`${API_DOMAIN}/users/updateMe`, {
      method: "PATCH",
      body: formData,
    });
    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    throw error;
  }
};
