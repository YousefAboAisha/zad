"use client";
import Button from "@/components/UI/inputs/button";
// import Select from "@/components/UI/inputs/selectInput";
import Modal from "@/components/UI/modals/modal";
import AddDailySubscription from "@/containers/admin/addDailySubscription";
import Sidebar from "@/containers/admin/sidebar";
import SubscripersTable from "@/containers/dashboard/subscripersTable";
// import { leasingPlansOptions } from "@/data/leasingPlansOptions";
import { SubscriptionData } from "@/data/subscripersData";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";

const Admin = () => {
  // const [subscriptionType, setSubscriptionType] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div className="relative w-full flex">
      {/* Sidebar */}

      <div className="relative w-[17%] min-h-screen">
        <Sidebar />
      </div>

      {/* Section */}
      <div className="w-[83%] min-h-screen p-4 mb-8">
        {/* Start Grid Cards */}
        <div className="cards-grid-3">
          <div className="relative bg-white p-8 border rounded-xl flex flex-col items-center justify-center gap-4">
            <h4 className="text-xl text-primary font-semibold">
              إجمالي المقاعد
            </h4>
            <h2 className="text-7xl">20</h2>
            <span className="absolute bottom-0 right-0 bg-primary h-6 w-6 rounded-br-xl rounded-tl-[50%]"></span>
          </div>
          <div className="relative bg-white p-8 border rounded-xl flex flex-col items-center justify-center gap-4">
            <h4 className="text-xl text-[red] font-semibold">
              المقاعد المحجوزة
            </h4>
            <h2 className="text-7xl">13</h2>
            <span className="absolute bottom-0 right-0 bg-[red] h-6 w-6 rounded-br-xl rounded-tl-[50%]"></span>
          </div>
          <div className="relative bg-white p-8 border rounded-xl flex flex-col items-center justify-center gap-4">
            <h4 className="text-xl text-[green] font-semibold">
              المقاعد المتاحة
            </h4>
            <h2 className="text-7xl">7</h2>
            <span className="absolute bottom-0 right-0 bg-[green] h-6 w-6 rounded-br-xl rounded-tl-[50%]"></span>
          </div>
          {/* <div className="bg-white p-8 border rounded-xl flex flex-col items-center justify-center gap-4">
            <h4 className="text-xl">المقاعد الكلية</h4>
            <h2 className="text-7xl">20</h2>
          </div> */}
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

        {/* <div className="w-3/12 text-black">
            <Select
              options={leasingPlansOptions}
              title="نوع الاشتراك.."
              onChange={(e) => setSubscriptionType(e.target.value)}
              value={subscriptionType}
              className={`focus:border-primary bg-white w-full border border-gray-100`}
            />
          </div> */}
        {/* </div> */}

        <div className="relative mt-8">
          <SubscripersTable data={SubscriptionData} />
        </div>
      </div>

      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} zIndex="z-[1000]">
        <AddDailySubscription />
      </Modal>
    </div>
  );
};

export default Admin;
