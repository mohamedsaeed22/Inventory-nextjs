import apiClient from ".";
import { ExpenseSchema } from "../validations/formValidationSchemas";
 
export async function getAllExpenses(
  searchTerm?: string,
  pageNumber?: number,
  pageSize?: number
) {
  const response = await apiClient.get(`/api/DispensedItems`, {
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

export async function createExpense(data: ExpenseSchema) {
  const response = await apiClient.post("/api/DispensedItems", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response?.data;
}

export async function updateExpense(id: string, data: ExpenseSchema) {
  const response = await apiClient.put(`/api/DispensedItems/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response?.data;
}

export async function deleteExpense(id: string) {
  const response = await apiClient.delete(`/api/DispensedItems/${id}`);
  console.log(response);
  return response?.data;
}

export async function getExpenseById(id: string) {
  const response = await apiClient.get(`/api/DispensedItems/${id}`);
  return response?.data;
}
