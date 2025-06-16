"use client";

import { getAllExpenses } from "@/lib/api/expenses";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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

  //   const createExistingItemMutation = useMutation({
  //     mutationFn: (existingItemData: FormData) => {
  //       return createExistingItem(
  //         existingItemData as unknown as ExistingItemSchema
  //       );
  //     },
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["existingItems"] });
  //       toast.success("تم إنشاء العهدة بنجاح");
  //     },
  //     onError: (error: Error) => {
  //       toast.error(error.message || "فشل إنشاء العهدة");
  //     },
  //   });

  //   const updateExistingItemMutation = useMutation({
  //     mutationFn: ({
  //       id,
  //       existingItemData,
  //     }: {
  //       id: number;
  //       existingItemData: FormData;
  //     }) =>
  //       updateExistingItem(
  //         id.toString(),
  //         existingItemData as unknown as ExistingItemSchema
  //       ),
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["existingItems"] });
  //       toast.success("تم تحديث العهدة بنجاح");
  //     },
  //     onError: (error: Error) => {
  //       toast.error(error.message || "فشل تحديث العهدة");
  //     },
  //   });

  //   const deleteExistingItemMutation = useMutation({
  //     mutationFn: (id: string) => deleteExistingItem(id),
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["existingItems"] });
  //       toast.success("تم حذف العهدة بنجاح");
  //     },
  //     onMutate: async (id) => {
  //       await queryClient.cancelQueries({ queryKey: ["existingItems"] });
  //       const previousExistingItems = queryClient.getQueryData(["existingItems"]);
  //       queryClient.setQueryData(
  //         ["existingItems"],
  //         (old: { data: ExistingItem[] }) => {
  //           if (!old || !old.data) return old;
  //           return {
  //             ...old,
  //             data: old.data.filter(
  //               (existingItem: ExistingItem) => existingItem.id !== Number(id)
  //             ),
  //           };
  //         }
  //       );
  //       return { previousExistingItems };
  //     },
  //     onError: (error: Error, variables, context) => {
  //       toast.error(error.message || "فشل حذف العهدة");
  //       if (context?.previousExistingItems) {
  //         queryClient.setQueryData(
  //           ["existingItems"],
  //           context.previousExistingItems
  //         );
  //       }
  //     },
  //   });

  return {
    expenses: expensesQuery.data?.data || [],
    pagination: expensesQuery.data?.pagination || {},
    isLoading: expensesQuery.isLoading,
    isError: expensesQuery.isError,
    error: expensesQuery.error,
    // createExpense: createExpenseMutation.mutate,
    // updateExpense: updateExpenseMutation.mutate,
    // deleteExpense: deleteExpenseMutation.mutate,
    isPending: expensesQuery.isPending,
  };
}
