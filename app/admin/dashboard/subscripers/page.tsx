"use client";
import { SubscriberData, SubscriptionInterface } from "@/app/interfaces";
import PageTitles from "@/components/UI/typography/pageTitles";
import { API_BASE_URL } from "@/config";
import SubscripersTable from "@/containers/dashboard/tables/subscripersTable";
import TableLoader from "@/containers/dashboard/tables/tableLoader";
import { useEffect, useState } from "react";

const Subscripers = () => {
  const [tableData, setTableData] = useState<
    (SubscriptionInterface & { user: SubscriberData })[]
  >([]);
  const [analysisData, setAnalysisData] = useState<{
    total: number;
    ACTIVE: number;
    PENDING: number;
    EXPIRED: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTableData = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/subscription/weeklyAndMonthly/fetch`
      );
      const result = await response.json();
      console.log("Result", result.data);
      setTableData(result.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    } finally {
      setLoading(false);
    }
  };

  const subscriptionRequestsAnalysis = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/analysis/allSubscripers/fetch`
      );
      const result = await response.json();

      console.log("analysisData", result.data);
      setAnalysisData(result.data);
      setLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        setLoading(false);
      } else {
        setError(String(error));
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchTableData();
    subscriptionRequestsAnalysis();
  }, []);

  const tableContent = () => {
    if (loading)
      return (
        <div>
          <div className="cards-grid-4">
            <div className="h-40 bg-gray-300 animate-pulse rounded-lg"></div>
            <div className="h-40 bg-gray-300 animate-pulse rounded-lg"></div>
            <div className="h-40 bg-gray-300 animate-pulse rounded-lg"></div>
            <div className="h-40 bg-gray-300 animate-pulse rounded-lg"></div>
          </div>
          <div className="mt-8">
            <TableLoader />
          </div>
        </div>
      );

    if (error) return <p className="text-red-500">حدث خطأ: {error}</p>;

    if (tableData)
      return (
        <div>
          <div className="cards-grid-4">
            <div className="relative p-8 bg-secondary border rounded-xl flex flex-col items-center justify-center gap-4 text-white">
              <h4 className="text-xl font-bold text-center">كافة الاشتراكات</h4>
              <h2 className="text-7xl font-semibold">{analysisData?.total}</h2>
            </div>

            <div className="relative p-8 bg-[#f39c12] border rounded-xl flex flex-col items-center justify-center gap-4 text-white">
              <h4 className="text-xl font-bold text-center">المنتظرة</h4>

              <h2 className="text-7xl font-semibold">
                {analysisData?.PENDING ?? 0}
              </h2>
            </div>

            <div className="relative p-8 bg-[green] border rounded-xl flex flex-col items-center justify-center gap-4 text-white">
              <h4 className="text-xl font-bold text-center">الفعالة</h4>

              <h2 className="text-7xl font-semibold">
                {analysisData?.ACTIVE ?? 0}
              </h2>
            </div>

            <div className="relative p-8 bg-[#c0392b] border rounded-xl flex flex-col items-center justify-center gap-4 text-white">
              <h4 className="text-xl font-bold text-center">المنتهية</h4>
              <h2 className="text-7xl font-semibold">
                {analysisData?.EXPIRED ?? 0}
              </h2>
            </div>
          </div>

          <div className="mt-12">
            <SubscripersTable data={tableData} />
          </div>
        </div>
      );
  };

  return (
    <div className="relative">
      <div className="mt-6">
        <PageTitles title="كافة المشتركين" homePath="/dashboard" />
      </div>

      <div className="relative mt-8">{tableContent()}</div>
    </div>
  );
};

export default Subscripers;
