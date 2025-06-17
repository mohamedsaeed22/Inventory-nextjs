import type { Metadata } from "next";
import "./globals.css";
import { Cairo } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { AuthProvider } from "@/providers/AuthProvider";

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "مخزن  فرع نظم المعلومات",
  description: "تم التطوير بواسطه فرع نظم المعلومات",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} antialiased`}>
        <AuthProvider>
          <ReactQueryProvider>
            {children}
            <ToastContainer position="bottom-right" />
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
