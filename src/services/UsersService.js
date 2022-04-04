import { api } from "../config/api.js";

export async function findAllUsers(params) {
  try {
    const response = await api.get("/users", { params });
    return response.data;
  } catch (err) {
    return {
      error: true,
    };
  }
}

export async function findOneUser(params) {
  try {
    const response = await api.get(`/users/${params}`);
    return response.data;
  } catch (err) {
    return {
      error: true,
    };
  }
}
export async function userPost(data) {
  try {
    const response = await api.post("/user", data);
    return response;
  } catch (err) {
    return {
      error: true,
    };
  }
}

export async function userPut(data, id) {
  try {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  } catch (err) {
    return {
      error: true,
    };
  }
}
export async function updatePassword(data, id) {
  try {
    const response = await api.put(`/update-password/${id}`, data);
    return response.data;
  } catch (err) {
    return {
      error: true,
    };
  }
}
export async function destroyUser(id) {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (err) {
    return {
      error: true,
    };
  }
}

export async function findUserByRole(params) {
  try {
    const response = await api.get(`/users-role/`, { params });
    return response.data;
  } catch (err) {
    return {
      error: true,
    };
  }
}
