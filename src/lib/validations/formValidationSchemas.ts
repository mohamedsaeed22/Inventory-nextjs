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
  quantity: z.string().regex(/^\d+$/, "الكمية يجب أن تكون رقم"),
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
  number: z.coerce.number().min(1, { message: "السريال مطلوب" }),
});

export type CategorySchema = z.infer<typeof categorySchema>;

export const expenseSchema = z.object({
  id: z.coerce.number().optional(),
  dispensedQuantity: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "الكمية المصروفة يجب أن تكون رقمًا أكبر من 0",
    }),

  existingItemId: z.string(),

  toWhom: z.string().min(1, "اسم المسلم له مطلوب"),
  receiverName: z.string().min(1, "اسم المستلم مطلوب"),
  deliveredName: z.string().min(1, "اسم المسلم مطلوب"),
  notes: z
    .string()
    .max(100, { message: "الملاحظات يجب ألا تزيد عن 100 حرف" })
    .optional(),
});
export type ExpenseSchema = z.infer<typeof expenseSchema>;
