import api from "./api/axios";

export function getOrders() {
  return api.get("/orders");
}

export function createOrder(data) {
  return api.post("/orders", data);
}

export function updateOrder(id, data) {
  return api.put(`/orders/${id}`, data);
}

export function deleteOrder(id) {
  return api.delete(`/orders/${id}`);
}

export function getOrderById(id) {
  return api.get(`/orders/${id}`);
}