"use client";
import Button from "@/components/UI/inputs/button";
import Modal from "@/components/UI/modals/modal";
import AddDailySubscription from "@/containers/dashboard/addDailySubscription";
import DailySubscripersTable from "@/containers/dashboard/tables/dailySubscripersTable";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { DailySubscriptionInterface } from "../interfaces";
import TableLoader from "@/containers/dashboard/tables/tableLoader";

const Dashboard = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [tableData, setTableData] = useState<DailySubscriptionInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTableData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/dailySubscripers/fetch");
      const result = await response.json();
      console.log("dailySubscripers", result.data);
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

  useEffect(() => {
    fetchTableData();
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
          <div className="cards-grid-4 mt-6">
            <div className="relative bg-white p-8 border-b-blue border-b-8 border rounded-xl flex flex-col items-center justify-center gap-4">
              <h4 className="text-xl">مشتركو اليوم</h4>
              <h2 className="text-7xl">35</h2>
            </div>

            <div className="relative bg-white p-8 border-b-primary border-b-8 border rounded-xl flex flex-col items-center justify-center gap-4">
              <h4 className="text-xl text-primary font-semibold">
                إجمالي المقاعد
              </h4>
              <h2 className="text-7xl">20</h2>
            </div>

            <div className="relative bg-white p-8 border-b-[red] border-b-8 border rounded-xl flex flex-col items-center justify-center gap-4">
              <h4 className="text-xl text-[red] font-semibold">
                المقاعد المحجوزة
              </h4>
              <h2 className="text-7xl">13</h2>
            </div>

            <div className="relative bg-white p-8 border-b-[green] border-b-8 border rounded-xl flex flex-col items-center justify-center gap-4">
              <h4 className="text-xl text-[green] font-semibold">
                المقاعد المتاحة
              </h4>
              <h2 className="text-7xl">7</h2>
            </div>
          </div>

          <Button
            title="إضافة مشترك"
            onClick={() => setIsOpenModal(true)}
            className="bg-primary !w-[150px] px-2 mt-8"
            icon={<FiPlus />}
            hasShiningBar={false}
          />

          <div className="mt-12">
            <DailySubscripersTable data={tableData} />
          </div>
        </div>
      );
  };

  return (
    <div className="relative">
      <div className="relative mt-8">{tableContent()}</div>

      <Modal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        zIndex="z-[1000]"
        containerClassName="lg:!w-[35%]"
      >
        <AddDailySubscription
          fetchData={fetchTableData}
          setIsOpen={setIsOpenModal}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
