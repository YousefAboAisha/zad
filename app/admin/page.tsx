"use client";
import Button from "@/components/UI/inputs/button";
// import Select from "@/components/UI/inputs/selectInput";
import Modal from "@/components/UI/modals/modal";
import AddDailySubscription from "@/containers/admin/addDailySubscription";
import SubscripersTable from "@/containers/dashboard/tables/dailySubscripersTable";
// import { leasingPlansOptions } from "@/data/leasingPlansOptions";
import { SubscriptionData } from "@/data/subscripersData";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";

const Admin = () => {
  // const [subscriptionType, setSubscriptionType] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div className="relative">
      {/* Sidebar */}

      {/* Section */}
      {/* Start Grid Cards */}
      <div className="cards-grid-4">
        <div className="relative bg-white p-8 border-b-blue border-b-8 border rounded-xl flex flex-col items-center justify-center gap-4">
          <h4 className="text-xl">مشتركو اليوم</h4>
          <h2 className="text-7xl">35</h2>
        </div>

        <div className="relative bg-white p-8 border-b-primary border-b-8 border rounded-xl flex flex-col items-center justify-center gap-4">
          <h4 className="text-xl text-primary font-semibold">إجمالي المقاعد</h4>
          <h2 className="text-7xl">20</h2>
        </div>

        <div className="relative bg-white p-8 border-b-[red] border-b-8 border rounded-xl flex flex-col items-center justify-center gap-4">
          <h4 className="text-xl text-[red] font-semibold">المقاعد المحجوزة</h4>
          <h2 className="text-7xl">13</h2>
        </div>

        <div className="relative bg-white p-8 border-b-[green] border-b-8 border rounded-xl flex flex-col items-center justify-center gap-4">
          <h4 className="text-xl text-[green] font-semibold">
            المقاعد المتاحة
          </h4>
          <h2 className="text-7xl">7</h2>
        </div>
      </div>
      {/* End Grid Cards */}

      {/* <div className="flex items-center justify-between mt-12"> */}
      <Button
        title="إضافة مشترك"
        onClick={() => setIsOpenModal(true)}
        className="bg-primary !w-[150px] px-2 mt-12"
        icon={<FiPlus />}
        hasShiningBar={false}
      />

      <div className="relative mt-8">
        <SubscripersTable data={SubscriptionData} />
      </div>

      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} zIndex="z-[1000]">
        <AddDailySubscription />
      </Modal>
    </div>
  );
};

export default Admin;
