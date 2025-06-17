"use client";

import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  updateExpense,
} from "@/lib/api/expenses";
import { Expense } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useExpenses(
  searchTerm?: string,
  pageNumber?: number,
  pageSize?: number
) {
  const queryClient = useQueryClient();

  const expensesQuery = useQuery({
    queryKey: ["expenses", searchTerm, pageNumber, pageSize],
    queryFn: () => getAllExpenses(searchTerm, pageNumber, pageSize),
  });

  const createExpenseMutation = useMutation({
    mutationFn: (expenseData: FormData) => {
      return createExpense(expenseData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success("تم إنشاء المصروف بنجاح");
    },
    onError: (error: Error) => {
      toast.error(error.message || "فشل إنشاء المصروف");
    },
  });

  const updateExpenseMutation = useMutation({
    mutationFn: ({ id, expenseData }: { id: string; expenseData: FormData }) =>
      updateExpense(id.toString(), expenseData as unknown as FormData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success("تم تحديث العهدة بنجاح");
    },
    onError: (error: Error) => {
      toast.error(error.message || "فشل تحديث العهدة");
    },
  });

  const deleteExpenseMutation = useMutation({
    mutationFn: (id: string) => deleteExpense(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success("تم حذف المصروف بنجاح");
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["expenses"] });
      const previousExpenses = queryClient.getQueryData(["expenses"]);
      queryClient.setQueryData(["expenses"], (old: { data: Expense[] }) => {
        if (!old || !old.data) return old;
        return {
          ...old,
          data: old.data.filter(
            (expense: Expense) => expense.id !== Number(id)
          ),
        };
      });
      return { previousExpenses };
    },
    onError: (error: Error, variables, context) => {
      toast.error(error.message || "فشل حذف العهدة");
      if (context?.previousExpenses) {
        queryClient.setQueryData(["expenses"], context.previousExpenses);
      }
    },
  });

  return {
    expenses: expensesQuery.data?.data || [],
    pagination: expensesQuery.data?.pagination || {},
    isLoading: expensesQuery.isLoading,
    isError: expensesQuery.isError,
    error: expensesQuery.error,
    createExpense: createExpenseMutation.mutate,
    updateExpense: updateExpenseMutation.mutate,
    deleteExpense: deleteExpenseMutation.mutate,
    isPending: expensesQuery.isPending,
  };
}
