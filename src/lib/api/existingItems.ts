import apiClient from ".";
import { ExistingItemSchema } from "../validations/formValidationSchemas";

export async function getAllExistingItems() {
  const response = await apiClient.get("/api/ExistingItems");
  return response?.data;
}

export async function createExistingItem(data: ExistingItemSchema) {
  const response = await apiClient.post("/api/ExistingItems", data);
  return response?.data;
}

export async function updateExistingItem(id: string, data: any) {
  const response = await apiClient.put(`/api/ExistingItems/${id}`, data);
  return response?.data;
}

export async function deleteExistingItem(id: string) {
  const response = await apiClient.delete(`/api/ExistingItems/${id}`);
  return response?.data;
}

export async function getExistingItemById(id: string) {
  const response = await apiClient.get(`/api/ExistingItems/${id}`);
  return response?.data;
}
