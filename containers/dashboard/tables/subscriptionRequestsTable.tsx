import {
  SubscriptionInterface,
  SubscriptionRequestsTableInterface,
} from "@/app/interfaces";
import Modal from "@/components/UI/modals/modal";
import {
  dateFormating,
  paymentMethodConverter,
  subscriptionTypeConverter,
} from "@/utils/conversions";
import React, { useState } from "react";
import { SubscriptionType } from "@/app/enums";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApproveSubscription } from "./tablesActions/approve";
import { EditSubscription } from "./tablesActions/edit";
import { DeleteSubscription } from "./tablesActions/delete";
import { FiCheck, FiEdit3, FiTrash } from "react-icons/fi";

const SubscriptionRequestsTable = ({
  data,
  fetchData,
}: SubscriptionRequestsTableInterface) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalName, setModalName] = useState<"approve" | "edit" | "delete">();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeSubscriptionData, setActiveSubscriptionData] = useState<
    SubscriptionInterface | undefined
  >();

  const renderredModal = () => {
    if (!selectedId) return null;
    if (modalName === "approve")
      return (
        <ApproveSubscription
          setModal={setIsOpenModal}
          id={selectedId}
          refetch={fetchData!}
        />
      );
    if (modalName === "edit")
      return (
        <EditSubscription
          setModal={setIsOpenModal}
          id={selectedId}
          refetch={fetchData!}
          data={activeSubscriptionData}
        />
      );
    if (modalName === "delete")
      return (
        <DeleteSubscription
          setModal={setIsOpenModal}
          id={selectedId}
          refetch={fetchData!}
        />
      );
  };

  return (
    <div className="overflow-x-auto">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true} // Right-to-left for Arabic
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="font-noto_kufi text-[12px] py-3 px-4 border-b text-right">
              الاسم
            </th>
            <th className="font-noto_kufi text-[12px] py-3 px-4 border-b text-right">
              البريد الإلكتروني
            </th>
            <th className="font-noto_kufi text-[12px] py-3 px-4 border-b text-right">
              رقم الهاتف
            </th>
            <th className="font-noto_kufi text-[12px] py-3 px-4 border-b text-right">
              التخصص
            </th>
            <th className="font-noto_kufi text-[12px] py-3 px-4 border-b text-right">
              نوع الاشتراك
            </th>
            <th className="font-noto_kufi text-[12px] py-3 px-4 border-b text-right">
              تاريخ البدء
            </th>
            <th className="font-noto_kufi text-[12px] py-3 px-4 border-b text-right">
              تاريخ الانتهاء
            </th>
            <th className="font-noto_kufi text-[12px] py-3 px-4 border-b text-right">
              طريقة الدفع
            </th>
            <th className="font-noto_kufi text-[12px] py-3 px-4 border-b text-right">
              العمليات
            </th>
          </tr>
        </thead>

        <tbody className="w-full">
          {data && data.length > 0 ? (
            data.map((elem, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="text-sm py-3 px-4 border-b text-right">
                  {elem.user.name}
                </td>
                <td className="text-sm py-3 px-4 border-b text-right">
                  {elem.user.email}
                </td>
                <td className="text-sm py-3 px-4 border-b text-right">
                  {elem?.user.phoneNumber}
                </td>
                <td className="text-sm py-3 px-4 border-b text-right">
                  {elem.user.profession}
                </td>
                <td className={`text-sm py-3 px-4 border-b`}>
                  <div
                    className={`text-center text-white rounded-md text-[12px] w-fit p-2 px-4 ${
                      elem?.subscription_type === SubscriptionType.MONTHLY
                        ? "bg-secondary"
                        : "bg-blue"
                    }`}
                  >
                    {subscriptionTypeConverter(elem?.subscription_type)}
                  </div>
                </td>
                <td className="text-sm py-3 px-4 border-b text-right">
                  {dateFormating(elem?.start_date)}
                </td>
                <td className="text-sm py-3 px-4 border-b text-right">
                  {dateFormating(elem?.end_date)}
                </td>

                <td className="text-sm py-3 px-4 border-b text-center">
                  {paymentMethodConverter(elem?.payment_method)}
                </td>

                <td className="text-sm py-3 px-4 border-b text-right">
                  <div className="flex items-center gap-3">
                    <FiCheck
                      size={18}
                      className="text-[green] cursor-pointer"
                      title="تأكيد الحجز"
                      onClick={() => {
                        setIsOpenModal(true);
                        setModalName("approve");
                        setSelectedId(elem?._id as string);
                      }}
                    />
                    <FiEdit3
                      size={16}
                      className="cursor-pointer"
                      title="تعديل الحجز"
                      onClick={() => {
                        setIsOpenModal(true);
                        setModalName("edit");
                        setSelectedId(elem._id as string);
                        setActiveSubscriptionData(elem);
                      }}
                    />
                    <FiTrash
                      size={16}
                      className="text-[red] cursor-pointer"
                      title="حذف الحجز"
                      onClick={() => {
                        setIsOpenModal(true);
                        setModalName("delete");
                        setSelectedId(elem._id as string);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="text-center text-gray-500 py-4 h-40">
                لا توجد طلبات اشتراك حالية!
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        zIndex="z-[1000]"
        containerClassName="lg:w-[31%]"
      >
        {renderredModal()}
      </Modal>
    </div>
  );
};

export default SubscriptionRequestsTable;
