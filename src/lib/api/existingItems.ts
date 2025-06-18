import apiClient from ".";
 
export async function getAllExistingItems(
  searchTerm?: string,
  pageNumber?: number,
  pageSize?: number
) {
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

export async function createExistingItem(data: FormData) {
  const response = await apiClient.post("/api/ExistingItems", data);
  return response?.data;
}

export async function updateExistingItem(id: string, data: FormData) {
  const response = await apiClient.put(`/api/ExistingItems/${id}`, data);
  return response?.data;
}

export async function deleteExistingItem(id: string) {
  const response = await apiClient.delete(`/api/ExistingItems/${id}`);
  return response?.data;
}
