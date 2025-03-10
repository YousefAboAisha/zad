import { SubscriptionStatus } from "@/app/enums";
import { DailySubscriptionInterface } from "@/app/interfaces";
import Modal from "@/components/UI/modals/modal";
import {
  subscriptionStausConverter,
  timeFormatting,
} from "@/utils/conversions";
import React, { useState } from "react";
import { FiCheck, FiEdit3 } from "react-icons/fi";
import { FinishSubscription } from "./tablesActions/finish";
// import { DeleteSubscription } from "./tablesActions/delete";

export type DailySubscribersTableType = {
  data: (DailySubscriptionInterface & {
    _id: string;
    name: string;
    phoneNumber: string;
  })[];
  fetchData: () => void;
};

const DailySubscripersTable = ({
  data,
  fetchData,
}: DailySubscribersTableType) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalName, setModalName] = useState<"finish" | "edit" | "delete">();
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  console.log("Retrieved Data", data);

  const renderredModal = () => {
    if (modalName == "finish") {
      return (
        <FinishSubscription
          setModal={setIsOpenModal}
          id={subscriptionId}
          fetchData={fetchData}
        />
      );
    }
    // else if (modalName == "delete") {
    //   return <DeleteSubscription setModal={setIsOpenModal} />;
    // }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 border-b text-right text-sm font-noto_kufi">
              الاسم
            </th>
            <th className="py-3 px-4 border-b text-right text-sm font-noto_kufi">
              رقم الهاتف
            </th>
            <th className="py-3 px-4 border-b text-right text-sm font-noto_kufi">
              وقت البدء
            </th>
            <th className="py-3 px-4 border-b text-right text-sm font-noto_kufi">
              وقت الانتهاء
            </th>
            <th className="py-3 px-4 border-b text-right text-sm font-noto_kufi">
              السعر
            </th>
            <th className="py-3 px-4 border-b text-right text-sm font-noto_kufi">
              الحالة
            </th>
            <th className="py-3 px-4 border-b text-right text-sm font-noto_kufi">
              العمليات
            </th>
          </tr>
        </thead>

        <tbody>
          {data && data.length > 0 ? (
            data.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b text-right text-sm">
                  {user.name}
                </td>

                <td className="py-3 px-4 border-b text-right text-sm">
                  {user.phoneNumber}
                </td>

                <td className="py-3 px-4 border-b text-right text-sm">
                  {timeFormatting(user.start_date)}
                </td>

                <td className="py-3 px-4 border-b text-right text-sm">
                  {user.end_date == null ? "-" : timeFormatting(user.end_date)}
                </td>

                <td className="py-3 px-4 border-b text-right text-sm">
                  {user?.price} شيكل
                </td>

                <td className="py-3 px-4 border-b text-right text-sm">
                  <div
                    className={`text-white rounded-md text-[13px] w-fit p-2 px-4 ${
                      user.status === SubscriptionStatus.ACTIVE
                        ? "bg-[green]"
                        : "bg-[#c0392b]"
                    }`}
                  >
                    {subscriptionStausConverter(user?.status)}
                  </div>
                </td>

                <td className="py-3 px-4 border-b text-right text-sm">
                  <div className="flex users-center gap-3">
                    <FiCheck
                      size={22}
                      className="text-[green] cursor-pointer"
                      title="إنهاء الحجز"
                      onClick={() => {
                        setIsOpenModal(true);
                        setSubscriptionId(user._id);
                        setModalName("finish");
                      }}
                    />
                    <FiEdit3
                      size={18}
                      className="cursor-pointer"
                      title="تعديل الحجز"
                      onClick={() => {
                        setIsOpenModal(true);
                        setModalName("edit");
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="text-center text-gray-500 py-4 h-40">
                لا توجد اشتراكات يومية حالياً!
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        zIndex="z-[1000]"
        containerClassName="lg:w-[30%]"
      >
        {renderredModal()}
      </Modal>
    </div>
  );
};

export default DailySubscripersTable;
