import { z } from "zod";

export const existingItemSchema = z.object({
  Name: z.string().min(1, "الاسم مطلوب"),
  ImageFile: z
    .instanceof(File)
    .refine((file) => file.size > 0, "الملف مطلوب")
    .optional(),
  Brand: z.string().min(1, "الماركة مطلوبة"),
  Serial: z.string().min(1, "السيريال مطلوب"),
  Quantity: z.string().regex(/^\d+$/, "الكمية يجب أن تكون رقم"),
  QuantityEnum: z.enum(["UNIT", "METER"], {
    message: "الوحدة مطلوبة",
  }),
  SqId: z
    .string({
      required_error: "الصنف مطلوب",
    })
    .nonempty("الصنف مطلوب"),

  Notes: z
    .string()
    .max(100, { message: "الملاحظات يجب ألا تزيد عن 100 حرف" })
    .optional(),
});

export type ExistingItemSchema = z.infer<typeof existingItemSchema>;
