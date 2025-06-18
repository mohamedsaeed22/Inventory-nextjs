"use client";

import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "@/lib/api/categories";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useCategories(
  searchTerm?: string,
  pageNumber?: number,
  pageSize?: number
) {
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery({
    queryKey: ["categories", searchTerm, pageNumber, pageSize],
    queryFn: () => getAllCategories(searchTerm, pageNumber, pageSize),
  });



  const createCategoryMutation = useMutation({
    mutationFn: (categoryData: FormData) => createCategory(categoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("تم إنشاء الصنف بنجاح");
    },
    onError: (error: Error) => {
      toast.error(error.message || "فشل إنشاء الصنف");
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({
      id,
      categoryData,
    }: {
      id: number;
      categoryData: FormData;
    }) => updateCategory(id.toString(), categoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("تم تعديل الصنف بنجاح");
    },
    onError: (error: Error) => {
      toast.error(error.message || "فشل تعديل الصنف");
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("تم حذف الصنف بنجاح");
    },
    onError: (error: Error) => {
      toast.error(error.message || "فشل حذف الصنف");
    },
  });

  return {
    categories: categoriesQuery.data?.data || [],
    createCategory: createCategoryMutation.mutate,
    updateCategory: updateCategoryMutation.mutate,
    deleteCategory: deleteCategoryMutation.mutate,
    pagination: categoriesQuery.data?.pagination || {},
    isLoading: categoriesQuery.isLoading,
    isError: categoriesQuery.isError,
    error: categoriesQuery.error,
    isPending: categoriesQuery.isPending,
  };
}
