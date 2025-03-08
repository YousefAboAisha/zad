import { SubscriptionStatus } from "@/app/enums";
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

export const ApproveSubscription = ({ setModal, id, refetch }: ModalType) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubscriptionStatus = async () => {
    setLoading(true);
    console.log("The user ID is:", id);

    try {
      const response = await fetch(`/api/subscription/updateStatus/${id}`, {
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
