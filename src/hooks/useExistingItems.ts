"use client";

import { ExistingItemSchema } from "@/lib/validations/formValidationSchemas";
import {
  createExistingItem,
  getAllExistingItems,
} from "@/lib/api/existingItems";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useExistingItems() {
  const queryClient = useQueryClient();

  const existingItemsQuery = useQuery({
    queryKey: ["existingItems"],
    queryFn: getAllExistingItems,
    // initialData: [],
  });

  const createExistingItemMutation = useMutation({
    mutationFn: (existingItemData: ExistingItemSchema) =>
      createExistingItem(existingItemData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["existingItems"] });
      toast.success("تم إنشاء العهدة بنجاح");
    },
    onError: (error: Error) => {
      toast.error(error.message || "فشل إنشاء العهدة");
    },
  });

  //   const updateUserMutation = useMutation({
  //     mutationFn: ({
  //       id,
  //       userData,
  //     }: {
  //       id: number;
  //       userData: Partial<UserFormData>;
  //     }) => updateUser(id, userData),
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["users"] });
  //       toast.success("User updated successfully");
  //     },
  //     onError: (error: any) => {
  //       toast.error(error.message || "Failed to update user");
  //     },
  //   });

  //   const deleteUserMutation = useMutation({
  //     mutationFn: (id: number) => deleteUser(id),
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["users"] });
  //       toast.success("User deleted successfully");
  //     },
  //     onMutate: async (id) => {
  //       await queryClient.cancelQueries({ queryKey: ["users"] });
  //       const previousUsers = queryClient.getQueryData(["users"]);
  //       queryClient.setQueryData(["users"], (old: any) => {
  //         if (!old || !old.results) return old;
  //         return {
  //           ...old,
  //           results: old.results.filter((user: User) => user.id !== id),
  //         };
  //       });
  //       return { previousUsers };
  //     },
  //     onError: (error: any, variables, context) => {
  //       toast.error(error.message || "Failed to delete user");
  //       if (context?.previousUsers) {
  //         queryClient.setQueryData(["users"], context.previousUsers);
  //       }
  //     },
  //   });

  return {
    existingItems: existingItemsQuery.data || [],
    isLoading: existingItemsQuery.isLoading,
    isError: existingItemsQuery.isError,
    error: existingItemsQuery.error,
    createExistingItem: createExistingItemMutation.mutate,
    // updateUser: updateUserMutation.mutate,
    // deleteUser: deleteUserMutation.mutate,
    isPending: existingItemsQuery.isPending,
  };
}
