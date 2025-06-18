"use client";

import { useState } from "react";
import { useLogin } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "@/components/InputField";
import Image from "next/image";

// Define the validation schema
const loginSchema = z.object({
  username: z.string().min(1, "اسم المستخدم مطلوب"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [error, setError] = useState("");
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError("");
    try {
      await loginMutation.mutateAsync(data);
    } catch (error: any) {
      setError(error.message || "اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              تسجيل الدخول
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              أدخل بيانات الدخول الخاصة بك
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="text-red-500 text-center text-sm">{error}</div>
            )}

            <div className="space-y-4">
              <InputField
                label="اسم المستخدم"
                name="username"
                register={register}
                error={errors.username}
                inputProps={{
                  placeholder: "أدخل اسم المستخدم",
                  dir: "rtl",
                }}
              />

              <InputField
                label="كلمة المرور"
                name="password"
                type="password"
                register={register}
                error={errors.password}
                inputProps={{
                  placeholder: "أدخل كلمة المرور",
                  dir: "rtl",
                }}
              />
            </div>

            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending
                ? "جاري تسجيل الدخول..."
                : "تسجيل الدخول"}
            </button>
          </form>
        </div>
      </div>
      {/* Left side - Image */}
      <div className="hidden md:flex md:w-1/2 bg-indigo-600 relative">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <Image
          src="/inventory-img.jpg" // Add your image to the public folder
          alt="Login"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 flex items-center justify-center w-full h-full">
          <h1 className="text-4xl font-bold text-white text-center px-8">
            مرحباً بك في مخزن فرع نظم المعلومات
          </h1>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="absolute bottom-0 w-full bg-gray-800 p-4 text-center">
        <p className="text-sm text-gray-100">
          تم التطوير بواسطه فرع نظم المعلومات 2025
        </p>
      </footer> */}
      
    </div>
  );
}
