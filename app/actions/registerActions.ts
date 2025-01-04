"use server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/app/lib/session";

const testUser = {
  id: "1",
  email: "faw@gmail.com",
  password: "12345678",
};

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: unknown, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  if (email !== testUser.email || password !== testUser.password) {
    return {
      errors: {
        email: ["خطأ في البريد الالكتروني أو كلمة المرور"],
      },
    };
  }

  await createSession(testUser.id);

  redirect("/profile");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
