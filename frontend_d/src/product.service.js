import api from "./api/axios";

export function getProducts() {
  return api.get("/products");
}

export function createProduct(data) {
  return api.post("/products", data);
}

export function updateProduct(id, data) {
  return api.put(`/products/${id}`, data);
}

export function deleteProduct(id) {
  return api.delete(`/products/${id}`);
}

export function getProductById(id) {
  return api.get(`/products/${id}`);
}