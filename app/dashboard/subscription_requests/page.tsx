"use client";
import { UserInterface } from "@/app/interfaces";
import PageTitles from "@/components/UI/typography/pageTitles";
import SubscriptionRequestsTable from "@/containers/dashboard/tables/subscriptionRequestsTable";
import TableLoader from "@/containers/dashboard/tables/tableLoader";
import { useEffect, useState } from "react";

const SubscriptionRequests = () => {
  const [tableData, setTableData] = useState<UserInterface[]>([]);
  const [analysisData, setAnalysisData] = useState<{
    WEEKLY: number;
    MONTHLY: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTableData = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/subscriptionRequests/fetch");
      const result = await response.json();
      console.log("Result", result.data);
      setTableData(result.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        setLoading(false);
      } else {
        setError(String(error));
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const subscriptionRequestsAnalysis = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/analysis/subscriptionRequests/fetch");
      const result = await response.json();

      console.log("analysisData", result);
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

  const refetchData = () => {
    fetchTableData();
    subscriptionRequestsAnalysis();
  };

  useEffect(() => {
    refetchData();
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

          <div className="mt-12">
            <SubscriptionRequestsTable
              data={tableData}
              fetchData={refetchData}
            />
          </div>
        </div>
      );
  };

  return (
    <div className="relative">
      <div className="mt-6">
        <PageTitles title="طلبات الانضمام" homePath="/dashboard" />
      </div>

      <div className="relative mt-8">{tableContent()}</div>
    </div>
  );
};

export default SubscriptionRequests;
