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
} from "lucide-react";

// Summary Card Component
const SummaryCard = ({
  title,
  value,
  icon,
  color,
  isLoading,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  isLoading?: boolean;
}) => (
  <div className={`bg-white rounded-lg p-6 shadow-sm border-l-4 ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">
          {isLoading ? "..." : value}
        </p>
      </div>
      <div className="text-gray-400">{icon}</div>
    </div>
  </div>
);

// Simple Progress Bar Chart
const ProgressChart = ({
  data,
  title,
}: {
  data: { label: string; value: number; color: string }[];
  title: string;
}) => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">{item.label}</span>
            <span className="font-medium">{item.value}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${item.color}`}
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

// Recent Activities Component
const RecentActivities = ({ activities }: { activities: any[] }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <h3 className="text-lg font-semibold mb-4 text-gray-800">
      النشاطات الأخيرة
    </h3>
    <div className="space-y-3">
      {activities.slice(0, 5).map((activity, index) => (
        <div
          key={index}
          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
        >
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">
              {activity.title}
            </p>
            <p className="text-xs text-gray-500">{activity.date}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Low Stock Alerts Component
const LowStockAlerts = ({ items }: { items: any[] }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
      <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
      تنبيهات المخزون المنخفض
    </h3>
    <div className="space-y-3">
      {items.slice(0, 5).map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200"
        >
          <div>
            <p className="text-sm font-medium text-gray-900">{item.name}</p>
            <p className="text-xs text-red-600">
              الكمية المتبقية: {item.quantity}
            </p>
          </div>
          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
            منخفض
          </span>
        </div>
      ))}
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
      color: "bg-blue-500",
    }))
    .filter((item: any) => item.value > 0);

  // Loan status data
  const loanStatusData = [
    { label: "تم الإرجاع", value: returnedLoans, color: "bg-green-500" },
    { label: "لم يتم الإرجاع", value: pendingLoans, color: "bg-yellow-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
        <div className="text-sm text-gray-500">
          آخر تحديث: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="إجمالي العهد"
          value={totalItems}
          icon={<Boxes className="w-6 h-6" />}
          color="border-blue-500"
          isLoading={itemsLoading}
        />
        <SummaryCard
          title="الأصناف"
          value={totalCategories}
          icon={<Tags className="w-6 h-6" />}
          color="border-green-500"
          isLoading={categoriesLoading}
        />
        <SummaryCard
          title="المصروفات"
          value={totalExpenses}
          icon={<Wallet className="w-6 h-6" />}
          color="border-yellow-500"
          isLoading={expensesLoading}
        />
        <SummaryCard
          title="السلف"
          value={totalLoans}
          icon={<HandCoins className="w-6 h-6" />}
          color="border-purple-500"
          isLoading={loansLoading}
        />
      </div>

      {/* Charts and Activities Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Distribution Chart */}
        <div className="lg:col-span-1">
          <ProgressChart
            data={categoryDistribution}
            title="توزيع العهد حسب الأصناف"
          />
        </div>

        {/* Loan Status Chart */}
        <div className="lg:col-span-1">
          <ProgressChart data={loanStatusData} title="حالة السلف" />
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-1">
          <RecentActivities activities={recentActivities} />
        </div>
      </div>

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LowStockAlerts items={lowStockItems} />

          {/* Quick Stats */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-6 text-gray-800 flex items-center">
              <TrendingUp className="w-5 h-5 text-blue-500 mr-2" />
              إحصائيات سريعة
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <Boxes className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      إجمالي الكمية في المخزن
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {existingItems.reduce(
                        (sum: any, item: any) => sum + item.quantity,
                        0
                      )}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    إجمالي
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <div className="w-5 h-5 text-green-600 text-center font-bold">
                      Ø
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      متوسط الكمية لكل عهدة
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {totalItems > 0
                        ? Math.round(
                            existingItems.reduce(
                              (sum: any, item: any) => sum + item.quantity,
                              0
                            ) / totalItems
                          )
                        : 0}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    متوسط
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <HandCoins className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">نسبة السلف المرجعة</p>
                    <p className="text-lg font-bold text-gray-900">
                      {totalLoans > 0
                        ? Math.round((returnedLoans / totalLoans) * 100)
                        : 0}
                      %
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                    نسبة
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State for Low Stock */}
      {lowStockItems.length === 0 && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">ممتاز!</h3>
            <p className="text-gray-600">جميع العهد في المستوى الطبيعي</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
