"use client";
import { SubscriberData, SubscriptionInterface } from "@/app/interfaces";
import PageTitles from "@/components/UI/typography/pageTitles";
import { API_BASE_URL } from "@/config";
import SubscriptionRequestsTable from "@/containers/dashboard/tables/subscriptionRequestsTable";
import TableLoader from "@/containers/dashboard/tables/tableLoader";
import { useCallback, useEffect, useState } from "react";

const SubscriptionRequests = () => {
  const [tableData, setTableData] = useState<
    (SubscriptionInterface & { user: SubscriberData })[]
  >([]);
  const [analysisData, setAnalysisData] = useState<{
    WEEKLY: number;
    MONTHLY: number;
  } | null>(null);
  const [tableLoading, setTableLoading] = useState(true);
  const [analysisLoading, setAnalysisLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTableData = async () => {
    setTableLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/subscription/subscriptionRequests/fetch`
      );
      const result = await response.json();
      console.log("[subscriptionRequests]: ", result.data);
      setTableData(result.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        setTableLoading(false);
      } else {
        setError(String(error));
        setTableLoading(false);
      }
    } finally {
      setTableLoading(false);
    }
  };

  const subscriptionRequestsAnalysis = async () => {
    setAnalysisLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/analysis/subscriptionRequests/fetch`
      );
      const result = await response.json();

      console.log("analysisData", result);
      setAnalysisData(result.data);
      setAnalysisLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        setAnalysisLoading(false);
      } else {
        setError(String(error));
        setAnalysisLoading(false);
      }
    }
  };

  const refetchData = useCallback(() => {
    fetchTableData();
    subscriptionRequestsAnalysis();
  }, []);

  useEffect(() => {
    refetchData();
  }, [refetchData]);

  if (error) return <p className="text-red-500">حدث خطأ: {error}</p>;

  return (
    <div className="relative">
      <div className="mt-6">
        <PageTitles title="طلبات الانضمام" homePath="/dashboard" />
      </div>

      <div className="relative mt-8">
        {analysisLoading ? (
          <div className="cards-grid-4">
            <div className="h-40 bg-gray-300 animate-pulse rounded-lg"></div>
            <div className="h-40 bg-gray-300 animate-pulse rounded-lg"></div>
            <div className="h-40 bg-gray-300 animate-pulse rounded-lg"></div>
            <div className="h-40 bg-gray-300 animate-pulse rounded-lg"></div>
          </div>
        ) : (
          <div className="cards-grid-4">
            <div className="relative p-8 bg-primary border rounded-xl flex flex-col items-center justify-center gap-4 text-white">
              <h4 className="text-xl font-bold">طلبات الانضمام</h4>

              <h2 className="text-7xl font-semibold">
                {(analysisData?.WEEKLY ?? 0) + (analysisData?.MONTHLY ?? 0)}
              </h2>
            </div>

            <div className="relative p-8 bg-blue border rounded-xl flex flex-col items-center justify-center gap-4 text-white">
              <h4 className="text-xl font-bold">الأسبوعية</h4>

              <h2 className="text-7xl font-semibold">
                {analysisData?.WEEKLY ?? 0}
              </h2>
            </div>

            <div className="relative p-8 bg-secondary border rounded-xl flex flex-col items-center justify-center gap-4 text-white">
              <h4 className="text-xl font-bold">الشهرية</h4>

              <h2 className="text-7xl font-semibold">
                {analysisData?.MONTHLY ?? 0}
              </h2>
            </div>

            <div className="relative p-8 bg-[green] border rounded-xl flex flex-col items-center justify-center gap-4 text-white">
              <h4 className="text-xl font-bold">المقاعد المتاحة</h4>
              <h2 className="text-7xl font-semibold">7</h2>
            </div>
          </div>
        )}

        <div className="mt-12">
          {tableLoading ? (
            <TableLoader />
          ) : (
            <SubscriptionRequestsTable
              data={tableData}
              fetchData={refetchData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionRequests;
