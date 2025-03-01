import { UserInterface } from "@/app/interfaces";
import Button from "@/components/UI/inputs/button";
import Modal from "@/components/UI/modals/modal";
import { dateFormating, subscriptionTypeConverter } from "@/utils/conversions";
import React, { Dispatch, SetStateAction, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { BsCircleFill } from "react-icons/bs";
import { FiCheck, FiEdit3, FiTrash } from "react-icons/fi";
import { SubscriptionStatus, SubscriptionType } from "@/app/enums";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type SubscriptionRequestsTableType = {
  data: UserInterface[];
  fetchData: () => void;
};

const SubscriptionRequestsTable = ({
  data,
  fetchData,
}: SubscriptionRequestsTableType) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalName, setModalName] = useState<"approve" | "edit" | "delete">();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const renderredModal = () => {
    if (!selectedId) return null;
    if (modalName === "approve")
      return (
        <ApproveSubscription
          setModal={setIsOpenModal}
          id={selectedId}
          refetch={fetchData}
        />
      );
    if (modalName === "edit")
      return (
        <EditSubscription
          setModal={setIsOpenModal}
          id={selectedId}
          refetch={fetchData}
        />
      );
    if (modalName === "delete")
      return (
        <DeleteSubscription
          setModal={setIsOpenModal}
          id={selectedId}
          refetch={fetchData}
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
            <th className="text-sm py-3 px-4 border-b text-right">الاسم</th>
            <th className="text-sm py-3 px-4 border-b text-right">
              البريد الإلكتروني
            </th>
            <th className="text-sm py-3 px-4 border-b text-right">
              رقم الهاتف
            </th>
            <th className="text-sm py-3 px-4 border-b text-right">التخصص</th>
            <th className="text-sm py-3 px-4 border-b text-right">
              نوع الاشتراك
            </th>
            <th className="text-sm py-3 px-4 border-b text-right">
              تاريخ البدء
            </th>
            <th className="text-sm py-3 px-4 border-b text-right">
              تاريخ الانتهاء
            </th>
            <th className="text-sm py-3 px-4 border-b text-right">الحالة</th>
            <th className="text-sm py-3 px-4 border-b text-right">العمليات</th>
          </tr>
        </thead>

        <tbody className="w-full">
          {data && data.length > 0 ? (
            data.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="text-sm py-3 px-4 border-b text-right">
                  {user.name}
                </td>
                <td className="text-sm py-3 px-4 border-b text-right">
                  {user.email}
                </td>
                <td className="text-sm py-3 px-4 border-b text-right">
                  {user.phoneNumber}
                </td>
                <td className="text-sm py-3 px-4 border-b text-right">
                  {user.profession}
                </td>
                <td className={`text-sm py-3 px-4 border-b text-right`}>
                  <div
                    className={`p-2 text-center text-white rounded-md text-[13px] ${
                      user.active_subscription?.subscription_type ===
                      SubscriptionType.MONTHLY
                        ? "bg-secondary"
                        : "bg-blue"
                    }`}
                  >
                    {subscriptionTypeConverter(
                      user.active_subscription?.subscription_type
                    )}
                  </div>
                </td>
                <td className="text-sm py-3 px-4 border-b text-right">
                  {dateFormating(user.active_subscription?.start_date)}
                </td>
                <td className="text-sm py-3 px-4 border-b text-right">
                  {dateFormating(user.active_subscription?.end_date)}
                </td>
                <td className="text-sm py-3 px-4 border-b text-right">
                  <BsCircleFill className="text-[orange] mx-auto" size={10} />
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
                        setSelectedId(user._id as string);
                      }}
                    />
                    <FiEdit3
                      size={16}
                      className="cursor-pointer"
                      title="تعديل الحجز"
                      onClick={() => {
                        setIsOpenModal(true);
                        setModalName("edit");
                        setSelectedId(user._id as string);
                      }}
                    />
                    <FiTrash
                      size={16}
                      className="text-[red] cursor-pointer"
                      title="حذف الحجز"
                      onClick={() => {
                        setIsOpenModal(true);
                        setModalName("delete");
                        setSelectedId(user._id as string);
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
        containerClassName="lg:w-[30%]"
      >
        {renderredModal()}
      </Modal>
    </div>
  );
};

type ModalType = {
  setModal: Dispatch<SetStateAction<boolean>>;
  id: string;
  refetch: () => void; // 🔄 Accept refetch function as prop
};

const ApproveSubscription = ({ setModal, id, refetch }: ModalType) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubscriptionStatus = async () => {
    setLoading(true);
    console.log("The user ID is:", id);

    try {
      const response = await fetch(`/api/subscription/updateStatus${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: SubscriptionStatus.ACTIVE }),
      });

      const res = await response.json();

      console.log("Edit status response", res);
      toast.success("تم بدء الاشتراك بنجاح!");
      setLoading(false);
      setModal(false);

      refetch(); // 🔄 Refetch data after update
    } catch (error) {
      setLoading(false);
      console.error("Error updating status:", error);
      alert("حدث خطأ أثناء تحديث الحالة");
    }
  };

  return (
    <div className="flex flex-col bg-white p-8">
      <div className="flex items-center gap-2">
        <BiInfoCircle size={35} />
        <h2 className="text-xl font-bold">تأكيد الحجز</h2>
      </div>

      <hr className="mt-4" />

      <p className="mt-6">
        سيؤدي هذا الإجراء إلى تأكيد الحجز وبدء الاشتراك، هل أنت متأكد من ذلك؟
      </p>

      <div className="flex items-center gap-4 mt-6 w-10/12">
        <Button
          loading={loading}
          disabled={loading}
          title="بدء الآن"
          className="bg-primary"
          hasShiningBar={false}
          onClick={handleSubscriptionStatus}
        />
        <Button
          title="إلغاء الأمر"
          className="!text-red-500 !shadow"
          hasShiningBar={false}
          onClick={() => setModal(false)}
          disabled={loading}
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
        سيؤدي هذا الإجراء إلى تعديل بيانات الحجز المحدد، هل أنت متأكد من ذلك؟
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
        سيؤدي هذا الإجراء إلى حذف الحجز المحدد، هل أنت متأكد من ذلك؟
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
