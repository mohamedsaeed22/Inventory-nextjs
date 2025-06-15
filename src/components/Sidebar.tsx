"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Boxes,
  HandCoins,
  Home,
  LogOut,
  Tags,
  Wallet,
} from "lucide-react";

const menuItems = [
  {
    title: "القائمة",
    items: [
      { href: "/dashboard/home", label: "الصفحة الرئيسيه", icon: <Home className="w-5 h-5" /> },
      { href: "/dashboard/inventory", label: "العهدة", icon: <Boxes className="w-5 h-5" /> },
      { href: "/dashboard/expenses", label: "المصروف", icon: <Wallet className="w-5 h-5" /> },
      { href: "/dashboard/loans", label: "السلفة", icon: <HandCoins className="w-5 h-5" /> },
      { href: "/dashboard/categories", label: "الاصناف", icon: <Tags className="w-5 h-5" /> },
    ],
  },
  {
    title: "الأخرى",
    items: [
      {
        icon: <LogOut className="w-4 h-4" />,
        label: "تسجيل الخروج",
        href: "/logout",
      },
    ],
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((section) => (
        <div className="flex flex-col gap-2" key={section.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {section.title}
          </span>
          {section.items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                href={item.href}
                key={item.label}
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
          })}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
