import {
  DailySubscriptionInterface,
  MonthlySubscriptionInterface,
  WeeklySubscriptionInterface,
} from "@/app/interfaces";
import Button from "@/components/UI/inputs/button";
import { Dispatch, SetStateAction, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { toast } from "react-toastify";

type ModalType = {
  setModal: Dispatch<SetStateAction<boolean>>;
  id: string;
  refetch: () => void;
  data?:
    | DailySubscriptionInterface
    | WeeklySubscriptionInterface
    | MonthlySubscriptionInterface
    | undefined;
};

export const DeleteSubscription = ({ setModal, id, refetch }: ModalType) => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteSubscriptionRequest = async () => {
    setLoading(true);
    console.log("The user ID is:", id);

    try {
      const response = await fetch(`/api/subscription/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const res = await response.json();

      console.log("Edit status response", res);
      toast.warn("تم حذف الاشتراك بنجاح!");
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
        <BiInfoCircle size={25} />
        <h2 className="text-xl font-bold">حذف الحجز</h2>
      </div>

      <hr className="mt-4" />

      <p className="mt-6">
        سيؤدي هذا الإجراء إلى حذف الحجز المحدد، هل أنت متأكد من ذلك؟
      </p>
      <div className="flex items-center gap-4 mt-6 w-10/12">
        <Button
          loading={loading}
          disabled={loading}
          title="حذف الآن"
          className="bg-[red]"
          hasShiningBar={false}
          onClick={() => deleteSubscriptionRequest()}
        />

        <Button
          disabled={loading}
          title="إلغاء الأمر"
          className="!text-red-500 !shadow"
          hasShiningBar={false}
          onClick={() => setModal(false)}
        />
      </div>
    </div>
  );
};
