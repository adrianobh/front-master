import { api } from "../config/api";

export async function findAllProducts(params) {
  try {
    const response = await api.get("/product", { params });

    return response.data;
  } catch (err) {
    console.log(err);
    return {
      error: true,
    };
  }
}

export async function destroyProduct(id) {
  try {
    const response = await api.delete(`/product/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return {
      error: true,
    };
  }
}

export async function productPost(data) {
  try {
    const response = await api.post("/product", data);
    return response.data;
  } catch (err) {
    return {
      error: true,
    };
  }
}

export async function findOneProduct(params) {
  try {
    const response = await api.get(`/product/${params}`);
    return response.data;
  } catch (err) {
    return {
      error: true,
    };
  }
}

export async function productPut(data, id) {
  try {
    const response = await api.put(`/product/${id}`, data);
    return response.data;
  } catch (err) {
    return {
      error: true,
    };
  }
}

export async function productOptions(params) {
  try {
    const response = await api.get("/product-option", { params });
    return response.data;
  } catch (err) {
    return {
      error: true,
    };
  }
}