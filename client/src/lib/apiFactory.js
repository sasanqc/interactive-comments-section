const API_DOMAIN = "http://localhost:3000/api/v1";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
export const getAll = async (resource) => {
  const response = await fetch(`${API_DOMAIN}/${resource}`, {});
  const data = await response.json();
  return data.data;
};

export const deleteOne = async (id, resource) => {
  console.log("delete: ");
  await fetch(`${API_DOMAIN}/${resource}/${id}`, {
    method: "DELETE",
  });
};

export const createOne = async (body, resource) => {
  try {
    const response = await fetch(`${API_DOMAIN}/${resource}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateOne = async (id, body, resource) => {
  try {
    const response = await fetch(`${API_DOMAIN}/${resource}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const getOne = async (id, resource) => {
  try {
    const response = await fetch(`${API_DOMAIN}/${resource}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
