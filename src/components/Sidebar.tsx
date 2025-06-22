"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Boxes, HandCoins, Home, LogOut, Tags, Wallet } from "lucide-react";
import Cookies from "js-cookie";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import { useAuth } from "@/providers/AuthProvider";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setIsAuthenticated } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setIsAuthenticated(false);
    router.push("/login");
  };

  const menuItems = [
    {
      title: "القائمة",
      items: [
        {
          href: "/dashboard",
          label: "الصفحة الرئيسيه",
          icon: <Home className="w-5 h-5" />,
        },
        {
          href: "/dashboard/inventory",
          label: "العهدة",
          icon: <Boxes className="w-5 h-5" />,
        },
        {
          href: "/dashboard/expenses",
          label: "المصروف",
          icon: <Wallet className="w-5 h-5" />,
        },
        {
          href: "/dashboard/loans",
          label: "السلفة",
          icon: <HandCoins className="w-5 h-5" />,
        },
        {
          href: "/dashboard/categories",
          label: "الاصناف",
          icon: <Tags className="w-5 h-5" />,
        },
      ],
    },
    {
      title: "الأخرى",
      items: [
        {
          onClick: () => setShowLogoutConfirm(true),
          icon: <LogOut className="w-4 h-4" />,
          label: "تسجيل الخروج",
          href: "/login",
        },
      ],
    },
  ];

  return (
    <>
      <div className="mt-4 text-sm">
        {menuItems.map((section) => (
          <div className="flex flex-col gap-2" key={section.title}>
            <span className="hidden lg:block text-gray-400 font-light my-4">
              {section.title}
            </span>
            {section.items.map(
              (item: {
                href: string;
                label: string;
                icon: React.ReactNode;
                onClick?: () => void;
              }) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    href={item.href}
                    key={item.label}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                    }}
                    className={`flex items-center justify-center lg:justify-start gap-4 py-2 md:px-2 rounded-md transition-colors duration-300 ${
                      isActive
                        ? "bg-gray-100 text-blue-500"
                        : "text-gray-500 hover:bg-gray-100 hover:text-blue-500"
                    }`}
                  >
                    {item.icon}
                    <span className="hidden lg:block">{item.label}</span>
                  </Link>
                );
              }
            )}
          </div>
        ))}
      </div>

      <ConfirmDialog
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="تأكيد تسجيل الخروج"
        message="هل أنت متأكد من أنك تريد تسجيل الخروج؟"
        confirmText="تسجيل الخروج"
        cancelText="إلغاء"
      />
    </>
  );
};

export default Sidebar;
