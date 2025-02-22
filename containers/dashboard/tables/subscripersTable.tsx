import Button from "@/components/UI/inputs/button";
import Modal from "@/components/UI/modals/modal";
import React, { Dispatch, SetStateAction, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { FaEye } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";

const SubscripersTable = ({ data }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalName, setModalName] = useState<"finish" | "edit" | "delete">();

  const renderredModal = () => {
    if (modalName == "finish") {
      return <FinishSubscriper setModal={setIsOpenModal} />;
    } else if (modalName == "edit") {
      return <EditSubscriper setModal={setIsOpenModal} />;
    } else if (modalName == "delete") {
      return <DeleteSubscriper setModal={setIsOpenModal} />;
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
            <th className="py-3 px-4 border-b text-center">الحالة</th>
            <th className="py-3 px-4 border-b text-center">العمليات</th>
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

              <td className="py-3 px-4 border-b">
                <div className="bg-[green] text-white p-2 px-4 w-fit text-[12px] rounded-lg mx-auto text-center">
                  نشط
                </div>
              </td>

              <td className="py-3 px-4 border-b text-center">
                <div className="flex items-center justify-center gap-2">
                  <p
                    className="cursor-pointer text-[13px] hover:underline"
                    title="عرض التفاصيل للمشترك"
                    onClick={() => {
                      setIsOpenModal(true);
                      setModalName("finish");
                    }}
                  >
                    عرض التفاصيل
                  </p>
                  <FaEye size={13} />
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

const FinishSubscriper = ({ setModal }: ModalType) => {
  return (
    <div className="flex flex-col bg-white p-8">
      <div className="flex items-center gap-2">
        <BiInfoCircle size={35} />
        <h2 className="text-xl font-bold">تفاصيل المشترك</h2>
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

const EditSubscriper = ({ setModal }: ModalType) => {
  return (
    <div className="flex flex-col bg-white p-8">
      <div className="flex items-center gap-2">
        <FiEdit3 size={25} />
        <h2 className="text-xl font-bold">تعديل بيانات المُشترك</h2>
      </div>

      <hr className="mt-4" />

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

const DeleteSubscriper = ({ setModal }: ModalType) => {
  return (
    <div className="flex flex-col bg-white p-8">
      <div className="flex items-center gap-2">
        <BiInfoCircle size={25} />
        <h2 className="text-xl font-bold">حذف المُشترك</h2>
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

export default SubscripersTable;
