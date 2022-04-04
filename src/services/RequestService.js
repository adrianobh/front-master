import { api } from "../config/api.js";

export async function findAllRequest(params) {
  try {
    const response = await api.get("/requests", { params });
    return response.data;
  } catch (err) {
    console.log(err);
    return {
      error: true,
    };
  }
}

export async function findRequest(id) {
  try {
    const response = await api.get(`/requests/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return {
      error: true,
    };
  }
}

export async function createRequest(params){
  try{
    const response = await api.post('/requests', { params });
    return response.data
  }catch(err){
    console.log(err);
    return {
      error:true,
    }
  }
}
export async function destroyRequest(id) {
  try {
    const response = await api.delete(`/requests/${id}`);
    return response.data;
  } catch (err) {
    return {
      error: true,
    };
  }
}
