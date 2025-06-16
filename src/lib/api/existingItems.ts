import apiClient from ".";
import { ExistingItemSchema } from "../validations/formValidationSchemas";

export async function getAllExistingItems(searchTerm?: string, pageNumber?: number, pageSize?: number) {  
  const response = await apiClient.get(`/api/ExistingItems`, {  
    params: {
      searchTerm: searchTerm || undefined,
      pageNumber: pageNumber || undefined,
      pageSize: pageSize || undefined,
    },
  });
  const pagination = response?.headers["x-pagination"];
  const data = response?.data;  
  return { data, pagination: JSON.parse(pagination || "{}") };
}

export async function createExistingItem(data: ExistingItemSchema) {
  const response = await apiClient.post("/api/ExistingItems", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response?.data;
}

  export async function updateExistingItem(id: string, data: ExistingItemSchema) {
  const response = await apiClient.put(`/api/ExistingItems/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response?.data;
}

export async function deleteExistingItem(id: string) {
  const response = await apiClient.delete(`/api/ExistingItems/${id}`);
  console.log(response);
  return response?.data;
}

export async function getExistingItemById(id: string) {
  const response = await apiClient.get(`/api/ExistingItems/${id}`);
  return response?.data;
}
