import apiClient from ".";

export async function getAllLoans(
  searchTerm?: string,
  pageNumber?: number,
  pageSize?: number
) {
  const response = await apiClient.get(`/api/BorrowedItems`, {
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

export async function createLoan(data: FormData) {
  const response = await apiClient.post("/api/BorrowedItems", data);
  return response?.data;
}

export async function updateLoan(id: string, data: FormData) {
  const response = await apiClient.put(`/api/BorrowedItems/${id}`, data);
  return response?.data;
}

export async function deleteLoan(id: string) {
  const response = await apiClient.delete(`/api/BorrowedItems/${id}`);
  return response?.data;
}
