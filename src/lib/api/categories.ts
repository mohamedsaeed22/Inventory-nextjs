 import apiClient from ".";

export async function getAllCategories(searchTerm?: string, pageNumber?: number, pageSize?: number) {
  const response = await apiClient.get("/api/SQs", {
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

export async function createCategory(data: FormData) {
  const response = await apiClient.post("/api/SQs", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response?.data;
}

export async function updateCategory(id: string, data: FormData) {
  const response = await apiClient.put(`/api/SQs/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response?.data;
}

export async function deleteCategory(id: string) {
  const response = await apiClient.delete(`/api/SQs/${id}`);
  return response?.data;
}

export async function getCategoryById(id: string) {
  const response = await apiClient.get(`/api/SQs/${id}`);
  return response?.data;
}
