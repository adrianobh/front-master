import { api } from "../config/api.js";

export async function cityOptions() {
  try {
    const response = await api.get("/city");
    return response.data;
  } catch (err) {
    console.log(err);
    return {
      error: true,
    };
  }
}
