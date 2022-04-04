import { api } from "../config/api.js";

export async function findUser(data) {
  try {
    const response = await api.post("/login", data);
    return response.data;
  } catch (err) {
    return {
      error: true,
    };
  }
}

export async function loginGoogle(data) {
  try {
    const response = await api.post("/login-google", data);
    return response.data;
  } catch (err) {
    return {
      error: true,
    };
  }
}
