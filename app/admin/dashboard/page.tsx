"use client";
import Button from "@/components/UI/inputs/button";
import Modal from "@/components/UI/modals/modal";
import AddDailySubscription from "@/containers/dashboard/addDailySubscription";
import DailySubscripersTable from "@/containers/dashboard/tables/dailySubscripersTable";
import React, { useCallback, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import TableLoader from "@/containers/dashboard/tables/tableLoader";
import { API_BASE_URL } from "@/config";
import { SubscriptionInterface } from "@/app/interfaces";
import PageTitles from "@/components/UI/typography/pageTitles";

const Dashboard = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [tableData, setTableData] = useState<
    (SubscriptionInterface & {
      _id: string;
      name: string;
      phoneNumber: string;
    })[]
  >([]);
  const [tableLoading, setTableLoading] = useState(true);

  const [analysisData, setAnalysisData] = useState<{
    totalSubscriptions: string;
    todaySubscribers: string;
    occupiedChairs: string;
    availableChairs: string;
  } | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const fetchTableData = async () => {
    setTableLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/subscription/daily/fetch`
      );
      const res = await response.json();
      console.log("dailySubscripers", res.data);
      setTableData(res.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
      setTableLoading(false);
    } finally {
      setTableLoading(false);
    }
  };

  const dailySubscriptionsAnalysis = async () => {
    setAnalysisLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/analysis/dailySubscriptions/fetch`
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
    dailySubscriptionsAnalysis();
  }, []);

  useEffect(() => {
    refetchData();
  }, [refetchData]);

  if (error) return <p className="text-red-500">حدث خطأ: {error}</p>;

  return (
    <div className="relative">
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
            <div>
              <div className="cards-grid-4 mt-6">
                <div className="relative p-8 bg-secondary rounded-xl flex flex-col items-center justify-center gap-4">
                  <h4 className="text-xl text-white font-semibold">
                    إجمالي المقاعد
                  </h4>
                  <h2 className="text-7xl text-white">19</h2>
                </div>

                <div className="relative p-8 bg-[#c0392b] rounded-xl flex flex-col items-center justify-center gap-4">
                  <h4 className="text-xl text-white font-semibold">
                    المقاعد المحجوزة
                  </h4>
                  <h2 className="text-7xl text-white">
                    {analysisData?.occupiedChairs}
                  </h2>
                </div>

                <div className="relative bg-[green] rounded-xl flex flex-col items-center justify-center gap-4">
                  <h4 className="text-xl text-white font-semibold">
                    المقاعد المتاحة
                  </h4>
                  <h2 className="text-7xl text-white">
                    {analysisData?.availableChairs}
                  </h2>
                </div>

                <div className="relative p-8 bg-blue rounded-xl flex flex-col items-center justify-center gap-4">
                  <h4 className="text-xl text-white">مشتركو اليوم</h4>
                  <h2 className="text-7xl text-white">
                    {analysisData?.todaySubscribers}
                  </h2>
                </div>
              </div>

              <Button
                title="إضافة مشترك"
                onClick={() => setIsOpenModal(true)}
                className="bg-primary !w-[150px] px-2 mt-8"
                icon={<FiPlus />}
                hasShiningBar={false}
              />
            </div>
          )}

          <div className="mt-12">
            {tableLoading ? (
              <TableLoader />
            ) : (
              <DailySubscripersTable data={tableData} fetchData={refetchData} />
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        zIndex="z-[1000]"
        containerClassName="lg:!w-[35%]"
      >
        <AddDailySubscription
          fetchData={refetchData}
          setIsOpen={setIsOpenModal}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
