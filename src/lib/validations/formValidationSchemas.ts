import { z } from "zod";

export const existingItemSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, "الاسم مطلوب"),
  imageFile: z
    .instanceof(File)
    .refine((file) => file.size > 0, "الملف مطلوب")
    .optional(),
  brand: z.string().min(1, "الماركة مطلوبة"),
  serial: z.string().min(1, "السيريال مطلوب"),
  quantity: z
    .string()
    .regex(/^\d+$/, "الكمية يجب أن تكون رقم")
    .refine((val) => Number(val) > 0, {
      message: "الكمية يجب أن تكون أكبر من 0",
    }),
  quantityEnum: z.enum(["UNIT", "METER"], {
    message: "الوحدة مطلوبة",
  }),
  sqId: z
    .string({
      required_error: "الصنف مطلوب",
    })
    .nonempty("الصنف مطلوب"),

  notes: z
    .string()
    .max(100, { message: "الملاحظات يجب ألا تزيد عن 100 حرف" })
    .optional(),
});

export type ExistingItemSchema = z.infer<typeof existingItemSchema>;

export const categorySchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(2, { message: "الاسم مطلوب" }),
  number: z.string().min(1, "السيريال مطلوب"),
});

export type CategorySchema = z.infer<typeof categorySchema>;

export const expenseSchema = z.object({
  id: z.coerce.number().optional(),
  // more than 0
  dispensedQuantity: z
    .string()
    .regex(/^\d+$/, "الكمية يجب أن تكون رقم")
    .refine((val) => Number(val) > 0, {
      message: "الكمية يجب أن تكون أكبر من 0",
    }),

  existingItemId: z
    .string({
      required_error: "العهدة مطلوبة",
    })
    .nonempty("العهدة مطلوبة"),
  toWhom: z.string().min(1, "اسم المسلم له مطلوب"),
  receiverName: z.string().min(1, "اسم المستلم مطلوب"),
  deliveredName: z.string().min(1, "اسم المسلم مطلوب"),
  notes: z
    .string()
    .max(100, { message: "الملاحظات يجب ألا تزيد عن 100 حرف" })
    .optional(),
});
export type ExpenseSchema = z.infer<typeof expenseSchema>;

export const loanSchema = z.object({
  id: z.coerce.number().optional(),
  existingItemId: z
    .string({
      required_error: "العهدة مطلوبة",
    })
    .nonempty("العهدة مطلوبة"),
  toWhom: z.string().min(1, "اسم المسلم له مطلوب"),
  isReturned: z.enum(["true", "false"], {
    message: "هل تم العودة مطلوب",
  }),

  notes: z
    .string()
    .max(100, { message: "الملاحظات يجب ألا تزيد عن 100 حرف" })
    .optional(),
});

export type LoanSchema = z.infer<typeof loanSchema>;
