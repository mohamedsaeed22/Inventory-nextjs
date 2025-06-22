/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useExistingItems } from "@/hooks/useExistingItems";
import { useCategories } from "@/hooks/useCategories";
import { useExpenses } from "@/hooks/useExpenses";
import { useLoans } from "@/hooks/useLoans";
import {
  Boxes,
  Tags,
  Wallet,
  HandCoins,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Activity,
  BarChart3,
  Users,
  Package,
} from "lucide-react";

// Enhanced Summary Card Component
const SummaryCard = ({
  title,
  value,
  icon,
  color,
  isLoading,
  trend,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  isLoading?: boolean;
  trend?: { value: number; isPositive: boolean };
}) => (
  <div className="group relative bg-gradient-to-br from-white via-gray-50/50 to-white rounded-xl p-4 shadow-[0_4px_20px_rgb(0,0,0,0.06)] border-l-4 border-gray-100/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] overflow-hidden">
    {/* Animated background gradient */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]"></div>

    {/* Subtle pattern overlay */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.02)_1px,transparent_0)] bg-[length:16px_16px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        {/* Enhanced icon container with better styling */}
        <div
          className={`relative p-2.5 rounded-lg ${color} bg-opacity-10 backdrop-blur-sm border border-white/20 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
        >
          <div
            className={`${color.replace(
              "border-",
              "text-"
            )} transition-transform duration-300 group-hover:rotate-6`}
          >
            {icon}
          </div>
          {/* Subtle glow effect */}
          <div
            className={`absolute inset-0 rounded-lg ${color} opacity-0 group-hover:opacity-15 blur-lg transition-opacity duration-300`}
          ></div>
        </div>

        {/* Enhanced trend indicator */}
        {trend && (
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border transition-all duration-300 ${
              trend.isPositive
                ? "text-green-700 bg-green-50 border-green-200 group-hover:bg-green-100"
                : "text-red-700 bg-red-50 border-red-200 group-hover:bg-red-100"
            }`}
          >
            <span
              className={`text-xs transition-transform duration-300 group-hover:scale-110 ${
                trend.isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend.isPositive ? "↗" : "↘"}
            </span>
            <span className="font-bold text-xs">{trend.value}%</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        {/* Enhanced title with better typography */}
        <p className="text-xs font-semibold text-gray-600/80 uppercase tracking-wide group-hover:text-gray-700 transition-colors duration-300">
          {title}
        </p>

        {/* Enhanced value display */}
        <div className="flex items-baseline">
          {isLoading ? (
            <div className="relative">
              <div className="animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 h-6 w-12 rounded"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse"></div>
            </div>
          ) : (
            <p className="text-2xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent group-hover:from-gray-800 group-hover:to-gray-600 transition-all duration-300">
              {value.toLocaleString()}
            </p>
          )}
        </div>

        {/* Subtle bottom accent */}
        <div
          className={`w-8 h-0.5 rounded-full ${color} bg-opacity-60 group-hover:w-10 transition-all duration-300`}
        ></div>
      </div>
    </div>

    {/* Corner decoration */}
    <div
      className={`absolute top-0 right-0 w-8 h-8 ${color} opacity-5 rounded-bl-full group-hover:opacity-10 transition-opacity duration-300`}
    ></div>
  </div>
);

// Enhanced Progress Chart Component
const ProgressChart = ({
  data,
  title,
  icon,
}: {
  data: { label: string; value: number; color: string }[];
  title: string;
  icon?: React.ReactNode;
}) => (
  <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border border-gray-100">
    <div className="flex items-center mb-6">
      {icon && (
        <div className="p-2 bg-blue-100 rounded-lg mr-3">
          <div className="text-blue-600">{icon}</div>
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-800 mr-3">{title}</h3>
    </div>
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index} className="group">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">{item.label}</span>
            <span className="font-bold text-gray-900">{item.value}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-500 ease-out ${item.color} shadow-sm`}
              style={{
                width: `${Math.min(
                  (item.value / Math.max(...data.map((d) => d.value))) * 100,
                  100
                )}%`,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Enhanced Recent Activities Component
const RecentActivities = ({ activities }: { activities: any[] }) => (
  <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border border-gray-100">
    <div className="flex items-center mb-6">
      <div className="p-2 bg-purple-100 rounded-lg mr-3">
        <Activity className="w-5 h-5 text-purple-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mr-3">
        النشاطات الأخيرة
      </h3>
    </div>
    <div className="space-y-4">
      {activities.slice(0, 5).map((activity, index) => (
        <div
          key={index}
          className="group flex items-center p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200 hover:border-purple-200"
        >
          <div className="relative">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping opacity-20"></div>
          </div>
          <div className="flex-1 mr-4">
            <p className="text-sm font-medium text-gray-900 group-hover:text-purple-700 transition-colors">
              {activity.title}
            </p>
            <div className="flex items-center mt-1">
              <Clock className="w-3 h-3 text-gray-400 ml-2" />
              <p className="text-xs text-gray-500">{activity.date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Enhanced Low Stock Alerts Component
const LowStockAlerts = ({ items }: { items: any[] }) => (
  <div className="bg-gradient-to-br from-white to-red-50 rounded-xl p-6 shadow-lg border border-red-100">
    <div className="flex items-center mb-6">
      <div className="p-2 bg-red-100 rounded-lg mr-3">
        <AlertTriangle className="w-5 h-5 text-red-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mr-3">
        تنبيهات المخزون المنخفض
      </h3>
    </div>
    <div className="space-y-4">
      {items.slice(0, 5).map((item, index) => (
        <div
          key={index}
          className="group flex items-center justify-between p-3 bg-white rounded-xl border border-red-200 hover:shadow-md transition-all duration-200 hover:border-red-300"
        >
          <div className="flex items-center ">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-2">
              <Package className="w-5 h-5 text-red-600" />
            </div>
            <div className="mr-2">
              <p className="text-sm font-medium text-gray-900">{item.name}</p>
              <p className="text-xs text-red-600 font-medium ">
                الكمية المتبقية: {item.quantity}
              </p>
            </div>
          </div>
          <span className="text-xs bg-red-100 text-red-800 px-3 py-1 rounded-full font-medium border border-red-200">
            منخفض
          </span>
        </div>
      ))}
    </div>
  </div>
);

// Enhanced Quick Stats Component
const QuickStats = ({
  existingItems,
  totalItems,
  returnedLoans,
  totalLoans,
}: any) => (
  <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 shadow-lg border border-blue-100">
    <div className="flex items-center mb-6">
      <div className="p-2 bg-blue-100 rounded-lg mr-3">
        <TrendingUp className="w-5 h-5 text-blue-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mr-3">
        إحصائيات سريعة
      </h3>
    </div>

    
    <div className="space-y-2">
      <div className="group flex items-center justify-between p-3 bg-white rounded-xl border border-blue-200 hover:shadow-md transition-all duration-200 hover:border-blue-300">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-2">
            <Boxes className="w-6 h-6 text-white" />
          </div>
          <div className="mr-2">
            <p className="text-sm text-gray-600">إجمالي الكمية في المخزن</p>
            <p className="text-xl font-bold text-gray-900">
              {existingItems
                .reduce((sum: any, item: any) => sum + item.quantity, 0)
                .toLocaleString()}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full font-medium border border-blue-200">
            إجمالي
          </div>
        </div>
      </div>

      <div className="group flex items-center justify-between p-3 bg-white rounded-xl border border-green-200 hover:shadow-md transition-all duration-200 hover:border-green-300">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-2">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div className="mr-2">
            <p className="text-sm text-gray-600">متوسط الكمية لكل عهدة</p>
            <p className="text-xl font-bold text-gray-900">
              {totalItems > 0
                ? Math.round(
                    existingItems.reduce(
                      (sum: any, item: any) => sum + item.quantity,
                      0
                    ) / totalItems
                  ).toLocaleString()
                : 0}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-green-600 bg-green-100 px-3 py-1 rounded-full font-medium border border-green-200">
            متوسط
          </div>
        </div>
      </div>

      <div className="group flex items-center justify-between p-3 bg-white rounded-xl border border-purple-200 hover:shadow-md transition-all duration-200 hover:border-purple-300">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-2">
            <HandCoins className="w-6 h-6 text-white" />
          </div>
          <div className="mr-2">
            <p className="text-sm text-gray-600">نسبة السلف المرجعة</p>
            <p className="text-xl font-bold text-gray-900">
              {totalLoans > 0
                ? Math.round((returnedLoans / totalLoans) * 100)
                : 0}
              %
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-purple-600 bg-purple-100 px-3 py-1 rounded-full font-medium border border-purple-200">
            نسبة
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DashboardPage = () => {
  const { existingItems, isLoading: itemsLoading } = useExistingItems(
    "",
    1,
    100
  );
  const { categories, isLoading: categoriesLoading } = useCategories(
    "",
    1,
    100
  );
  const { expenses, isLoading: expensesLoading } = useExpenses("", 1, 100);
  const { loans, isLoading: loansLoading } = useLoans("", 1, 100);

  // Calculate statistics
  const totalItems = existingItems.length;
  const totalCategories = categories.length;
  const totalExpenses = expenses.length;
  const totalLoans = loans.length;
  const returnedLoans = loans.filter((loan: any) => loan.isReturned).length;
  const pendingLoans = totalLoans - returnedLoans;

  // Low stock items (quantity less than 10)
  const lowStockItems = existingItems.filter((item: any) => item.quantity < 10);

  // Recent activities (combine recent expenses and loans)
  const recentActivities = [
    ...expenses.slice(0, 3).map((expense: any) => ({
      title: `تم صرف ${expense.dispensedQuantity} من ${
        expense.existingItem?.name || "غير محدد"
      }`,
      date: new Date(expense.createdDate).toLocaleDateString(),
      type: "expense",
    })),
    ...loans.slice(0, 3).map((loan: any) => ({
      title: `تم ارجاع${loan.name} إلى ${loan.toWhom}`,
      date: new Date(loan.createdDate).toLocaleDateString(),
      type: "loan",
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Category distribution data
  const categoryDistribution = categories
    .map((category: any) => ({
      label: category.name,
      value: existingItems.filter((item: any) => item.sq === category.number)
        .length,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
    }))
    .filter((item: any) => item.value > 0);

  // Loan status data
  const loanStatusData = [
    {
      label: "تم الإرجاع",
      value: returnedLoans,
      color: "bg-gradient-to-r from-green-500 to-green-600",
    },
    {
      label: "لم يتم الإرجاع",
      value: pendingLoans,
      color: "bg-gradient-to-r from-yellow-500 to-yellow-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="  mx-auto space-y-8">
        {/* Enhanced Header */}
        {/* <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              لوحة التحكم
            </h1>
            <p className="text-gray-600 mt-1">
              مرحباً بك في نظام إدارة المخزون
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">آخر تحديث</div>
            <div className="text-lg font-semibold text-gray-900">
              {new Date().toLocaleDateString("ar-SA")}
            </div>
          </div>
        </div> */}

        {/* Enhanced Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryCard
            title="إجمالي العهد"
            value={totalItems}
            icon={<Boxes className="w-6 h-6" />}
            color="border-blue-500"
            isLoading={itemsLoading}
            trend={{ value: 12, isPositive: true }}
          />
          <SummaryCard
            title="الأصناف"
            value={totalCategories}
            icon={<Tags className="w-6 h-6" />}
            color="border-green-500"
            isLoading={categoriesLoading}
            trend={{ value: 8, isPositive: true }}
          />
          <SummaryCard
            title="المصروفات"
            value={totalExpenses}
            icon={<Wallet className="w-6 h-6" />}
            color="border-yellow-500"
            isLoading={expensesLoading}
            trend={{ value: 15, isPositive: false }}
          />
          <SummaryCard
            title="السلف"
            value={totalLoans}
            icon={<HandCoins className="w-6 h-6" />}
            color="border-purple-500"
            isLoading={loansLoading}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Enhanced Charts and Activities Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProgressChart
            data={[
              {
                label: "العهدة",
                value: 45,
                color: "bg-gradient-to-r from-blue-500 to-blue-600",
              },
              {
                label: "الأصناف",
                value: 32,
                color: "bg-gradient-to-r from-green-500 to-green-600",
              },
              {
                label: "المصروفات",
                value: 28,
                color: "bg-gradient-to-r from-purple-500 to-purple-600",
              },
              {
                label: "السلف",
                value: 15,
                color: "bg-gradient-to-r from-orange-500 to-orange-600",
              },
              {
                label: "المخزون المنخفض",
                value: 8,
                color: "bg-gradient-to-r from-red-500 to-red-600",
              },
            ]}
            title="توزيع العهد حسب الأصناف (dummy data)"
            icon={<BarChart3 className="w-5 h-5" />}
          />
          <ProgressChart
            data={loanStatusData}
            title="حالة السلف"
            icon={<Users className="w-5 h-5" />}
          />
          <RecentActivities activities={recentActivities} />
        </div>

        {/* Enhanced Low Stock Alerts */}
        {lowStockItems.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LowStockAlerts items={lowStockItems} />
            <QuickStats
              existingItems={existingItems}
              totalItems={totalItems}
              returnedLoans={returnedLoans}
              totalLoans={totalLoans}
            />
          </div>
        )}

        {/* Enhanced Empty State for Low Stock */}
        {lowStockItems.length === 0 && (
          <div className="bg-gradient-to-br from-white to-green-50 rounded-xl p-8 shadow-lg border border-green-100">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">ممتاز!</h3>
              <p className="text-gray-600 text-lg">
                جميع العهد في المستوى الطبيعي
              </p>
              <div className="mt-4 flex items-center justify-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm font-medium">جميع المخزون آمن</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
