import { api } from "../config/api.js";

export async function inventoryByProductId(params) {
  try {
    const response = await api.get("/inventory-product", { params });
    return response.data;
  } catch (err) {
    return {
      error: true,
    };
  }
}

export async function createInventoryProduct(data) {
  try {
    const response = await api.post("/inventory-product", data);
    return response.data;
  } catch (err) {
    return {
      error: true,
    };
  }
}

export async function updateInventoryProduct(data, id) {
  try {
    const response = await api.put(`/inventory-product/${id}`, data);
    return response.data;
  } catch (err) {
    return {
      error: true,
    };
  }
}

export async function findInventoryProduct(data) {
  try{
    const response = await api.get(`/inventory-product/${data}`);
    return response.data
  }catch(err) {
    return {
      error: true,
    };
  }
}

export async function destroyInventoryProduct(id) {
  try {
    const response = await api.delete(`/inventory-product/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return {
      error: true,
    };
  }
}
