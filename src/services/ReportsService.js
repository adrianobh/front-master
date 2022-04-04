import { api } from "../config/api.js";

export async function requestMonth(params) {
  try {
    const response = await api.get("/reports/month", { params });
    return response.data;
  } catch (err) {
    console.log(err);
    return {
      error: true,
    };
  }
}

export async function requestUsers(params) {
  try {
    const response = await api.get("/reports/user", { params });
    return response.data;
  } catch (err) {
    console.log(err);
    return {
      error: true,
    };
  }
}

export async function requestFacilitador(params) {
  try {
    const response = await api.get("/reports/facilitador", { params });
    return response.data;
  } catch (err) {
    console.log(err);
    return {
      error: true,
    };
  }
}

