import type { Metadata } from "next";
import "./globals.css";
import { Cairo } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
 
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
        <div className="h-screen flex">
        {/* LEFT */}
        <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
          <Image src="/foeLogo.png" alt="logo" width={100} height={100} className="mx-auto" />
          <Sidebar />
        </div>
        {/* RIGHT */}
        <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col p-4">
          {/* <Navbar /> */}
          <ReactQueryProvider>
            {children}
            <ToastContainer position="bottom-right" />
          </ReactQueryProvider>
          </div>
        </div>
    </body>
  </html>
  );
}
