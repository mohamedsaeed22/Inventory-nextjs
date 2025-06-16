"use client";

import {
  createExistingItem,
  deleteExistingItem,
  getAllExistingItems,
  updateExistingItem,
} from "@/lib/api/existingItems";
import { ExistingItemSchema } from "@/lib/validations/formValidationSchemas";
import { ExistingItem } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useExistingItems(
  searchTerm?: string,
  pageNumber?: number,
  pageSize?: number
) {
  const queryClient = useQueryClient();

  const existingItemsQuery = useQuery({
    queryKey: ["existingItems", searchTerm, pageNumber, pageSize],
    queryFn: () => getAllExistingItems(searchTerm, pageNumber, pageSize),
  });

  const createExistingItemMutation = useMutation({
    mutationFn: (existingItemData: FormData) => {
      return createExistingItem(
        existingItemData as unknown as ExistingItemSchema
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["existingItems"] });
      toast.success("تم إنشاء العهدة بنجاح");
    },
    onError: (error: Error) => {
      toast.error(error.message || "فشل إنشاء العهدة");
    },
  });

  const updateExistingItemMutation = useMutation({
    mutationFn: ({
      id,
      existingItemData,
    }: {
      id: number;
      existingItemData: FormData;
    }) => updateExistingItem(id.toString(), existingItemData as unknown as ExistingItemSchema),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["existingItems"] });
      toast.success("تم تحديث العهدة بنجاح");
    },
    onError: (error: Error) => {
      toast.error(error.message || "فشل تحديث العهدة");
    },
  });

  const deleteExistingItemMutation = useMutation({
    mutationFn: (id: string) => deleteExistingItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["existingItems"] });
      toast.success("تم حذف العهدة بنجاح");
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["existingItems"] });
      const previousExistingItems = queryClient.getQueryData(["existingItems"]);
      queryClient.setQueryData(
        ["existingItems"],
        (old: { data: ExistingItem[] }) => {
          if (!old || !old.data) return old;
          return {
            ...old,
            data: old.data.filter(
              (existingItem: ExistingItem) => existingItem.id !== Number(id)
            ),
          };
        }
      );
      return { previousExistingItems };
    },
    onError: (error: Error, variables, context) => {
      toast.error(error.message || "فشل حذف العهدة");
      if (context?.previousExistingItems) {
        queryClient.setQueryData(
          ["existingItems"],
          context.previousExistingItems
        );
      }
    },
  });

  return {
    existingItems: existingItemsQuery.data?.data || [],
    pagination: existingItemsQuery.data?.pagination || {},
    isLoading: existingItemsQuery.isLoading,
    isError: existingItemsQuery.isError,
    error: existingItemsQuery.error,
    createExistingItem: createExistingItemMutation.mutate,
    updateExistingItem: updateExistingItemMutation.mutate,
    deleteExistingItem: deleteExistingItemMutation.mutate,
    isPending: existingItemsQuery.isPending,
  };
}
