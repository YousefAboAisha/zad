import Button from "@/components/UI/inputs/button";
import Modal from "@/components/UI/modals/modal";
import React, { Dispatch, SetStateAction, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { BsCircleFill } from "react-icons/bs";
import { FiCheck, FiEdit3, FiTrash } from "react-icons/fi";

const SubscriptionRequestsTable = ({ data }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalName, setModalName] = useState<"finish" | "edit" | "delete">();

  const renderredModal = () => {
    if (modalName == "finish") {
      return <FinishSubscription setModal={setIsOpenModal} />;
    } else if (modalName == "edit") {
      return <EditSubscription setModal={setIsOpenModal} />;
    } else if (modalName == "delete") {
      return <DeleteSubscription setModal={setIsOpenModal} />;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 border-b text-right">الاسم</th>
            <th className="py-3 px-4 border-b text-right">البريد الإلكتروني</th>
            <th className="py-3 px-4 border-b text-right">رقم الهاتف</th>
            <th className="py-3 px-4 border-b text-right">التخصص</th>
            <th className="py-3 px-4 border-b text-right">نوع الاشتراك</th>
            <th className="py-3 px-4 border-b text-right">تاريخ البدء</th>
            <th className="py-3 px-4 border-b text-right">تاريخ الانتهاء</th>
            <th className="py-3 px-4 border-b text-right">الحالة</th>
            <th className="py-3 px-4 border-b text-right">العمليات</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b text-right">{item.name}</td>
              <td className="py-3 px-4 border-b text-right">{item.email}</td>
              <td className="py-3 px-4 border-b text-right">
                {item.phoneNumber}
              </td>
              <td className="py-3 px-4 border-b text-right">
                {item.profession}
              </td>
              <td className="py-3 px-4 border-b text-right">{item.price}</td>
              <td className="py-3 px-4 border-b text-right">
                {item.startDate}
              </td>
              <td className="py-3 px-4 border-b text-right">{item.endDate}</td>
              <td className="py-3 px-4 border-b text-right">
                <BsCircleFill className="text-[orange] mx-auto" size={10} />
              </td>
              <td className="py-3 px-4 border-b text-right">
                <div className="flex items-center gap-3">
                  <FiCheck
                    size={22}
                    className="text-[green] cursor-pointer"
                    title="إنهاء الحجز"
                    onClick={() => {
                      setIsOpenModal(true);
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
                  <FiTrash
                    size={18}
                    className="text-[red] cursor-pointer"
                    title="حذف الحجز"
                    onClick={() => {
                      setIsOpenModal(true);
                      setModalName("delete");
                    }}
                  />
                </div>
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
        {renderredModal()}
      </Modal>
    </div>
  );
};

type ModalType = {
  setModal: Dispatch<SetStateAction<boolean>>;
};

const FinishSubscription = ({ setModal }: ModalType) => {
  return (
    <div className="flex flex-col bg-white p-8">
      <div className="flex items-center gap-2">
        <BiInfoCircle size={35} />
        <h2 className="text-xl font-bold">إنهاء الحجز</h2>
      </div>

      <hr className="mt-4" />

      <p className="mt-6">
        سيؤدي هذا الإجراء إلى إنهاء الحجز اليومي، هل أنت متأكد من ذلك؟
      </p>

      <div className="flex items-center gap-4 mt-6 w-10/12">
        <Button
          title="إنهاء الآن"
          className="bg-primary"
          hasShiningBar={false}
        />
        <Button
          title="إلغاء الأمر"
          className="!text-red-500 !shadow"
          hasShiningBar={false}
          onClick={() => setModal(false)}
        />
      </div>
    </div>
  );
};

const EditSubscription = ({ setModal }: ModalType) => {
  return (
    <div className="flex flex-col bg-white p-8">
      <div className="flex items-center gap-2">
        <FiEdit3 size={25} />
        <h2 className="text-xl font-bold">تعديل الحجز</h2>
      </div>

      <hr className="mt-4" />

      <p className="mt-6">
        سيؤدي هذا الإجراء إلى تعديل بيانات الحجز اليومي المحدد، هل أنت متأكد من
        ذلك؟
      </p>
      <div className="flex items-center gap-4 mt-6 w-10/12">
        <Button
          title="حفظ التعديلات"
          className="bg-primary"
          hasShiningBar={false}
        />
        <Button
          title="إلغاء الأمر"
          className="!text-red-500 !shadow"
          hasShiningBar={false}
          onClick={() => setModal(false)}
        />
      </div>
    </div>
  );
};

const DeleteSubscription = ({ setModal }: ModalType) => {
  return (
    <div className="flex flex-col bg-white p-8">
      <div className="flex items-center gap-2">
        <BiInfoCircle size={25} />
        <h2 className="text-xl font-bold">حذف الحجز</h2>
      </div>

      <hr className="mt-4" />

      <p className="mt-6">
        سيؤدي هذا الإجراء إلى حذف الحجز اليومي المحدد، هل أنت متأكد من ذلك؟
      </p>
      <div className="flex items-center gap-4 mt-6 w-10/12">
        <Button title="حذف الآن" className="bg-[red]" hasShiningBar={false} />
        <Button
          title="إلغاء الأمر"
          className="!text-red-500 !shadow"
          hasShiningBar={false}
          onClick={() => setModal(false)}
        />
      </div>
    </div>
  );
};

export default SubscriptionRequestsTable;
