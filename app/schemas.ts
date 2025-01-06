import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "البريد الالكتروني غير صالح" }).trim(),
  password: z
    .string()
    .min(8, { message: "كلمة المرور يجب أن تتكون من 8 خانات على الأقل" })
    .trim(),
});
