import { SubscriptionStatus } from "@/app/enums";
import { SubscriptionInterface } from "@/app/interfaces";
import Button from "@/components/UI/inputs/button";
import { API_BASE_URL } from "@/config";
import { Dispatch, SetStateAction, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { toast } from "react-toastify";

type ModalType = {
  setModal: Dispatch<SetStateAction<boolean>>;
  id: string | null;
  fetchData: () => void;
  data?: SubscriptionInterface | undefined;
};

export const FinishSubscription = ({ setModal, id, fetchData }: ModalType) => {
  const [loading, setLoading] = useState<boolean>(false);
  console.log("[Subscription ID - Finish]: ", id);

  const handleSubscriptionStatus = async () => {
    setLoading(true);
    console.log("The Subscription ID is:", id);

    try {
      const response = await fetch(`${API_BASE_URL}/admin/subscription/daily/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: SubscriptionStatus.EXPIRED,
          end_date: new Date(),
        }),
      });

      const res = await response.json();
      fetchData();
      console.log("Finish status response", res);
      toast.success("تم إنهاء الاشتراك بنجاح!");
      setLoading(false);
      setModal(false);
    } catch (error) {
      setLoading(false);
      console.error("Error updating status:", error);
      alert("حدث خطأ أثناء تحديث الحالة");
    }
  };

  return (
    <div className="flex flex-col bg-white p-8">
      <div className="flex users-center gap-2">
        <BiInfoCircle size={35} />
        <h2 className="text-xl font-bold">إنهاء الحجز</h2>
      </div>

      <hr className="mt-4" />

      <p className="mt-6">
        سيؤدي هذا الإجراء إلى إنهاء الحجز اليومي، هل أنت متأكد من ذلك؟
      </p>

      <div className="flex items-center gap-4 mt-6 w-10/12">
        <Button
          loading={loading}
          disabled={loading}
          title="إنهاء"
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
