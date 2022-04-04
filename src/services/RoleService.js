import { api } from "../config/api.js";

export async function roleOptions() {
  try {
    const response = await api.get("/role");
    return response.data;
  } catch (err) {
    console.log(err);
    return {
      error: true,
    };
  }
}
