import { SubscriptionStatus } from "@/app/enums";
import {
  SubscriberData,
  SubscriptionInterface,
  SubscriptionRequestsTableInterface,
} from "@/app/interfaces";
import Modal from "@/components/UI/modals/modal";
import {
  dateFormating,
  subscriptionStausConverter,
  subscriptionTypeConverter,
} from "@/utils/conversions";
import React, { Dispatch, SetStateAction, useState } from "react";

const SubscripersTable = ({ data }: SubscriptionRequestsTableInterface) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [userDetailsData, setUserDetailsData] = useState<
    (SubscriptionInterface & { user: SubscriberData }) | undefined
  >(undefined);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="font-noto_kufi text-sm py-3 px-4 text-[12px] border-b text-right">
              الاسم
            </th>
            <th className="font-noto_kufi text-sm py-3 px-4 text-[12px] border-b text-right">
              البريد الإلكتروني
            </th>
            <th className="font-noto_kufi text-sm py-3 px-4 text-[12px] border-b text-right">
              رقم الهاتف
            </th>
            <th className="font-noto_kufi text-sm py-3 px-4 text-[12px] border-b text-right">
              التخصص
            </th>
            <th className="font-noto_kufi text-sm py-3 px-4 text-[12px] border-b text-right">
              الحالة
            </th>
            <th className="font-noto_kufi text-sm py-3 px-4 text-[12px] border-b text-center">
              العمليات
            </th>
          </tr>
        </thead>

        <tbody>
          {data && data.length > 0 ? (
            data?.map((elem, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b text-right text-sm">
                  {elem.user.name}
                </td>

                <td className="py-3 px-4 border-b text-right text-sm">
                  {elem.user.email}
                </td>

                <td className="py-3 px-4 border-b text-right text-sm">
                  {elem.user.phoneNumber}
                </td>

                <td className="py-3 px-4 border-b text-right text-sm">
                  {elem.user.profession}
                </td>

                <td className="py-3 px-4 border-b text-right text-sm">
                  <div
                    className={`text-white rounded-md text-[13px] w-fit p-2 px-4 ${
                      elem?.status == SubscriptionStatus.ACTIVE
                        ? "bg-[green]"
                        : "bg-[#c0392b]"
                    }`}
                  >
                    {subscriptionStausConverter(elem?.status)}
                  </div>
                </td>

                <td className="py-3 px-4 border-b text-center">
                  <p
                    className="cursor-pointer text-sm hover:underline"
                    title="عرض التفاصيل للمشترك"
                    onClick={() => {
                      setIsOpenModal(true);
                      setUserDetailsData(elem); // Pass the clicked elem object
                    }}
                  >
                    عرض التفاصيل
                  </p>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="text-center text-gray-500 py-4 h-40">
                لا يوجد مشتركون !
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        zIndex="z-[1000]"
        containerClassName="lg:w-[38%]"
      >
        <SubscriperDetails setModal={setIsOpenModal} data={userDetailsData} />
      </Modal>
    </div>
  );
};

type ModalType = {
  setModal?: Dispatch<SetStateAction<boolean>>;
  data: (SubscriptionInterface & { user: SubscriberData }) | undefined;
};

const SubscriperDetails = ({ data }: ModalType) => {
  console.log("elemData", data);

  return (
    <div className="flex flex-col bg-white p-8">
      <h2 className="text-lg font-bold">{data?.user.name}</h2>

      <hr className="mt-4" />

      <h4 className="mt-3">كافة الاشتراكات</h4>

      <div className="flex items-center gap-4">
        <div className="flex items-center flex-col gap-2 mt-4 w-full border p-4 rounded-lg bg-primary text-white">
          <h2 className="text-sm">اليومية</h2>
          <p className="text-3xl">0</p>
        </div>

        <div className="flex items-center flex-col gap-2 mt-4 w-full border p-4 rounded-lg bg-blue text-white">
          <h2 className="text-sm">الأسبوعية</h2>
          <p className="text-3xl">0</p>
        </div>

        <div className="flex items-center flex-col gap-2 mt-4 w-full border p-4 rounded-lg bg-secondary text-white">
          <h2 className="text-sm">الشهرية</h2>
          <p className="text-3xl">0</p>
        </div>
      </div>

      <h4 className="mt-6">الاشتراك الحالي</h4>

      {data?.status == SubscriptionStatus.ACTIVE ? (
        <div className="flex flex-col">
          <div className="flex flex-col items-center gap-2 mt-4 w-full p-6 rounded-md border bg-gray-200">
            <h2 className="text-sm">نوع الاشتراك</h2>
            <h2 className="text-xl font-bold">
              {subscriptionTypeConverter(data?.subscription_type)}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-4 mt-4 w-full p-4 rounded-md bg-[green] text-white">
              <h2 className="text-sm">بداية الاشتراك</h2>
              <p className="font-bold">{dateFormating(data?.start_date)}</p>
            </div>

            <div className="flex flex-col items-center gap-4 mt-4 w-full p-4 rounded-md bg-[#c0392b] text-white">
              <h2 className="text-sm">نهاية الاشتراك</h2>
              <p className="font-bold">{dateFormating(data?.end_date)}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-6 w-full">
            <h2 className="text-sm">ملاحظات</h2>
            <p>{data?.notes}</p>
          </div>
        </div>
      ) : (
        <p className="mt-2 text-[12px] text-gray-500">
          لا يوجد اشتراكات نشطة حالياً
        </p>
      )}
    </div>
  );
};

export default SubscripersTable;
