"use client";
import { useState } from "react";
import { MdCircleNotifications } from "react-icons/md";
import Modal from "./UI/modals/modal";
import AddSubscription from "@/components/addSubscription";

const CustomerProfile = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <div className="relative w-full min-h-[70vh]">
        {/* Customer's name  */}
        <div className="flex items-center gap-1">
          <h2 className="text-lg">مرحباً بعودتك،</h2>
          <h2 className="font-bold text-lg">يوسف رشاد أبو عيشة.</h2>
        </div>

        {!true ? (
          <div className="cards-grid-3 mt-6">
            {/* Start date */}
            <div className="flex flex-col items-center justify-center gap-4 p-12 rounded-2xl text-white bg-[#AA5486]">
              <p>تاريخ البدء</p>
              <h2 className="font-bold text-4xl">16/ 12/ 2024</h2>
            </div>

            {/* End Date */}
            <div className="flex flex-col items-center justify-center gap-4 p-12 rounded-2xl text-white bg-[#4DA1A9]">
              <p>تاريخ الانتهاء</p>
              <h2 className="font-bold text-4xl">16/ 1/ 2025</h2>
            </div>

            {/* Subscription type */}
            <div className="flex flex-col items-center justify-center p-12 gap-2 rounded-2xl bg-[#1E3250] text-white row-span-2">
              <p className="text-lg">متبقي</p>
              <h2 className="font-bold text-9xl ">7</h2>
              <p className="text-lg">أيام</p>
            </div>

            {/* Subscription type */}
            <div className="flex flex-col items-center justify-center gap-4 p-12 rounded-2xl bg-[#f39c12] text-white">
              <p>نوع الاشتراك</p>
              <h2 className="font-bold text-4xl">أسبوعي</h2>
            </div>

            {/* Subscription type */}
            <div className="flex flex-col items-center justify-center gap-4 p-12 rounded-2xl bg-[#5CB338] text-white">
              <p>رقم الغرفة</p>
              <h2 className="font-bold text-5xl">A</h2>
            </div>
          </div>
        ) : (
          <div className="abs-center flex flex-col gap-2 items-center justify-center">
            <MdCircleNotifications size={50} className="opacity-10 " />
            <p>لا يوجد اشتراك حالي</p>
            <p
              onClick={() => setIsOpenModal(true)}
              className="text-primary hover:underline cursor-pointer"
            >
              اشترك الآن
            </p>
          </div>
        )}
      </div>

      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} zIndex="z-[1000]">
        <AddSubscription />
      </Modal>
    </>
  );
};

export default CustomerProfile;
