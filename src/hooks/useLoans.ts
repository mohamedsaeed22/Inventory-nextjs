"use client";

import {
  createLoan,
  deleteLoan,
  getAllLoans,
  updateLoan,
} from "@/lib/api/loans";
import { Loan } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useLoans(
  searchTerm?: string,
  pageNumber?: number,
  pageSize?: number
) {
  const queryClient = useQueryClient();

  const loansQuery = useQuery({
    queryKey: ["loans", searchTerm, pageNumber, pageSize],
    queryFn: () => getAllLoans(searchTerm, pageNumber, pageSize),
  });

  const createLoanMutation = useMutation({
    mutationFn: (loanData: FormData) => {
      return createLoan(loanData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loans"] });
      toast.success("تم إنشاء السلف بنجاح");
    },
    onError: (error: Error) => {
      toast.error(error.message || "فشل إنشاء السلف");
    },
  });

  const updateLoanMutation = useMutation({
    mutationFn: ({ id, loanData }: { id: string; loanData: FormData }) =>
      updateLoan(id.toString(), loanData as unknown as FormData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loans"] });
      toast.success("تم تحديث السلف بنجاح");
    },
    onError: (error: Error) => {
      toast.error(error.message || "فشل تحديث السلف");
    },
  });

  const deleteLoanMutation = useMutation({
    mutationFn: (id: string) => deleteLoan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loans"] });
      toast.success("تم حذف السلف بنجاح");
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["loans"] });
      const previousLoans = queryClient.getQueryData(["loans"]);
      queryClient.setQueryData(["loans"], (old: { data: Loan[] }) => {
        if (!old || !old.data) return old;
        return {
          ...old,
          data: old.data.filter((loan: Loan) => loan.id !== Number(id)),
        };
      });
      return { previousLoans };
    },
    onError: (error: Error, variables, context) => {
      toast.error(error.message || "فشل حذف السلف");
      if (context?.previousLoans) {
        queryClient.setQueryData(["loans"], context.previousLoans);
      }
    },
  });

  return {
    loans: loansQuery.data?.data || [],
    pagination: loansQuery.data?.pagination || {},
    isLoading: loansQuery.isLoading,
    isError: loansQuery.isError,
    error: loansQuery.error,
    createLoan: createLoanMutation.mutate,
    updateLoan: updateLoanMutation.mutate,
    deleteLoan: deleteLoanMutation.mutate,
    isPending: loansQuery.isPending,
  };
}
