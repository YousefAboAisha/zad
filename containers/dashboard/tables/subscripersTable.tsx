import { SubscriptionStatus } from "@/app/enums";
import { UserInterface } from "@/app/interfaces";
import Modal from "@/components/UI/modals/modal";
import {
  dateFormating,
  subscriptionStausConverter,
  subscriptionTypeConverter,
} from "@/utils/conversions";
import React, { Dispatch, SetStateAction, useState } from "react";

type SubscripersTableType = {
  data: UserInterface[];
};

const SubscripersTable = ({ data }: SubscripersTableType) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [userDetailsData, setUserDetailsData] = useState<UserInterface>();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="font-noto_kufi text-sm py-3 px-4 border-b text-right">الاسم</th>
            <th className="font-noto_kufi text-sm py-3 px-4 border-b text-right">البريد الإلكتروني</th>
            <th className="font-noto_kufi text-sm py-3 px-4 border-b text-right">رقم الهاتف</th>
            <th className="font-noto_kufi text-sm py-3 px-4 border-b text-right">التخصص</th>
            <th className="font-noto_kufi text-sm py-3 px-4 border-b text-right">الحالة</th>
            <th className="font-noto_kufi text-sm py-3 px-4 border-b text-center">العمليات</th>
          </tr>
        </thead>

        <tbody>
          {data.map((user, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b text-right">{user.name}</td>

              <td className="py-3 px-4 border-b text-right">{user.email}</td>

              <td className="py-3 px-4 border-b text-right">
                {user.phoneNumber}
              </td>

              <td className="py-3 px-4 border-b text-right">
                {user.profession}
              </td>

              <td className="py-3 px-4 border-b text-right">
                <div
                  className={`text-white rounded-md text-[13px] w-fit p-2 px-4 ${
                    user.active_subscription?.status ===
                    SubscriptionStatus.ACTIVE
                      ? "bg-[green]"
                      : "bg-[#c0392b]"
                  }`}
                >
                  {subscriptionStausConverter(user.active_subscription?.status)}
                </div>
              </td>

              <td className="py-3 px-4 border-b text-center">
                <p
                  className="cursor-pointer text-sm hover:underline"
                  title="عرض التفاصيل للمشترك"
                  onClick={() => {
                    setIsOpenModal(true);
                    setUserDetailsData(user); // Pass the clicked user object
                  }}
                >
                  عرض التفاصيل
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        zIndex="z-[1000]"
        containerClassName="lg:w-[30%]"
      >
        <SubscriperDetails setModal={setIsOpenModal} data={userDetailsData} />
      </Modal>
    </div>
  );
};

type ModalType = {
  setModal?: Dispatch<SetStateAction<boolean>>;
  data: UserInterface | undefined;
};

const SubscriperDetails = ({ data }: ModalType) => {
  console.log("userData", data);

  return (
    <div className="flex flex-col bg-white p-8">
      <h2 className="text-xl font-bold">{data?.name}</h2>

      <hr className="mt-4" />

      <h4 className="mt-3">كافة الاشتراكات</h4>

      <div className="flex items-center gap-4">
        <div className="flex items-center flex-col gap-2 mt-4 w-full border p-4 rounded-lg bg-primary text-white">
          <h2 className="text-sm">اليومية</h2>
          <p className="text-3xl">{data?.dailySubscriptions.length}</p>
        </div>

        <div className="flex items-center flex-col gap-2 mt-4 w-full border p-4 rounded-lg bg-blue text-white">
          <h2 className="text-sm">الأسبوعية</h2>
          <p className="text-3xl">{data?.weeklySubscriptions.length}</p>
        </div>

        <div className="flex items-center flex-col gap-2 mt-4 w-full border p-4 rounded-lg bg-secondary text-white">
          <h2 className="text-sm">الشهرية</h2>
          <p className="text-3xl">{data?.monthlySubscriptions.length}</p>
        </div>
      </div>

      <h4 className="mt-6">الاشتراك الحالي</h4>

      {data?.active_subscription &&
      data?.active_subscription.status == SubscriptionStatus.ACTIVE ? (
        <div className="flex flex-col">
          <div className="flex flex-col items-center gap-2 mt-4 w-full p-6 rounded-md border bg-gray-200">
            <h2 className="text-sm">نوع الاشتراك</h2>
            <h2 className="text-xl font-bold">
              {subscriptionTypeConverter(
                data?.active_subscription?.subscription_type
              )}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-4 mt-4 w-full p-4 rounded-md bg-[green] text-white">
              <h2 className="text-sm">بداية الاشتراك</h2>
              <p className="font-bold">
                {dateFormating(data?.active_subscription?.start_date)}
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 mt-4 w-full p-4 rounded-md bg-[#c0392b] text-white">
              <h2 className="text-sm">نهاية الاشتراك</h2>
              <p className="font-bold">
                {dateFormating(data?.active_subscription?.end_date)}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-6 w-full">
            <h2 className="text-sm">ملاحظات</h2>
            <p>{data?.active_subscription?.notes}</p>
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
