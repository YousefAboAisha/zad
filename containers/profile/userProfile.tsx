"use client";
import { useEffect, useState } from "react";
import { MdCircleNotifications } from "react-icons/md";
import Modal from "../../components/UI/modals/modal";
import AddSubscription from "@/containers/profile/addSubscription";
import { CiCircleCheck } from "react-icons/ci";
import { SubscriptionInterface } from "@/app/interfaces";
import {
  dateFormating,
  paymentMethodConverter,
  subscriptionTypeConverter,
} from "@/utils/conversions";
import { SessionProps } from "@/components/navbar";
import { API_BASE_URL } from "@/config";

const UserProfile = ({ session }: SessionProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [activeSubscription, setActiveSubscription] =
    useState<SubscriptionInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getUserDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/subscription/fetch`);

      const res = await response.json();
      if (res) {
        console.log("[UserProfile Data - res]", res);
        console.log("[UserProfile Data]", res.data);
        setActiveSubscription(res.data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  // Render loading skeletons
  const renderLoadingSkeletons = () => (
    <div className="cards-grid-3 mt-6">
      {/* Start date */}
      <div className="flex flex-col items-center justify-center gap-4 p-12 h-40 rounded-2xl bg-gray-300 animate-pulse"></div>

      {/* End Date */}
      <div className="flex flex-col items-center justify-center gap-4 p-12 h-40 rounded-2xl bg-gray-300 animate-pulse"></div>

      {/* Subscription type */}
      <div className="flex flex-col items-center justify-center p-12 gap-2 rounded-2xl bg-gray-300 animate-pulse row-span-2"></div>

      {/* Subscription type */}
      <div className="flex flex-col items-center justify-center gap-4 p-12 h-40 rounded-2xl bg-gray-300 animate-pulse"></div>

      {/* Subscription type */}
      <div className="flex flex-col items-center justify-center gap-4 p-12 h-40 rounded-2xl bg-gray-300 animate-pulse"></div>
    </div>
  );

  // Render active subscription details
  const renderActiveSubscription = () => (
    <div className="cards-grid-3 mt-6">
      {/* Start Date */}
      <div className="flex flex-col items-center justify-center gap-4 p-12 rounded-2xl text-white bg-[#AA5486]">
        <p className="text-xl">تاريخ البدء</p>
        <h2 className="font-bold text-2xl">
          {dateFormating(activeSubscription?.start_date)}
        </h2>
      </div>

      {/* End Date */}
      <div className="flex flex-col items-center justify-center gap-4 p-12 rounded-2xl text-white bg-[#4DA1A9]">
        <p className="text-xl">تاريخ الانتهاء</p>
        <h2 className="font-bold text-2xl">
          {dateFormating(activeSubscription?.end_date)}
        </h2>
      </div>

      {/* Days Remaining */}
      <div className="flex flex-col items-center justify-center p-12 gap-2 rounded-2xl bg-[#1E3250] text-white row-span-2">
        <p className="text-lg">متبقي</p>
        <h2 className="font-bold text-9xl">
          {Math.max(
            Math.ceil(
              (new Date(activeSubscription?.end_date ?? "").getTime() -
                new Date().getTime()) /
                (1000 * 60 * 60 * 24)
            ),
            0
          )}
        </h2>
        <p className="text-lg">أيام</p>
      </div>

      {/* Subscription Type */}
      <div className="flex flex-col items-center justify-center gap-4 p-12 rounded-2xl bg-[#f39c12] text-white">
        <p className="text-xl">نوع الاشتراك</p>
        <h2 className="font-bold text-2xl">
          {subscriptionTypeConverter(activeSubscription?.subscription_type)}
        </h2>
      </div>

      {/* Payment Method */}
      <div className="flex flex-col items-center justify-center gap-4 p-12 rounded-2xl bg-[#5CB338] text-white">
        <p className="text-xl">طريقة الدفع</p>
        <h2 className="font-bold text-2xl">
          {paymentMethodConverter(activeSubscription?.payment_method)}
        </h2>
      </div>
    </div>
  );

  // Render subscription request success message
  const renderSubscriptionRequestSuccess = () => (
    <div className="abs-center flex flex-col gap-2 items-center justify-center">
      <CiCircleCheck size={65} className="text-[green]" />
      <p className="text-center md:w-8/12 w-10/12 mx-auto">
        تم إرسال طلب الاشتراك بنجاح، سيتم التواصل معكم في أقرب وقت ممكن!
      </p>
    </div>
  );

  // Render no subscription message
  const renderNoSubscription = () => (
    <div className="abs-center flex flex-col gap-4 items-center justify-center">
      <MdCircleNotifications size={50} className="opacity-10" />
      <p>لا يوجد اشتراك حالي</p>
      <p
        onClick={() => setIsOpenModal(true)}
        className="text-primary hover:underline cursor-pointer"
      >
        اشترك الآن
      </p>
    </div>
  );

  if (error)
    return (
      <div className="relative w-full min-h-[70vh]">
        <p className="abs-center text-[red]">{error}</p>
      </div>
    );

  return (
    <div className="relative w-full min-h-[70vh]">
      <div className="relative min-h-[70vh]">
        {/* Customer's name */}
        <div className="flex items-center gap-1">
          <h2 className="text-md">مرحباً بك، </h2>
          <h2 className="font-bold text-md"> {session?.name}</h2>
        </div>

        {/* Render content based on loading and subscription status */}
        {loading
          ? renderLoadingSkeletons()
          : activeSubscription && activeSubscription?.status === "ACTIVE"
          ? renderActiveSubscription()
          : activeSubscription?.status === "PENDING"
          ? renderSubscriptionRequestSuccess()
          : activeSubscription?.status === "EXPIRED"
          ? renderNoSubscription()
          : renderNoSubscription()}
      </div>

      {/* Modal for adding subscription */}
      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} zIndex="z-[1000]">
        <AddSubscription
          setIsOpen={setIsOpenModal}
          fetchData={getUserDetails}
        />
      </Modal>
    </div>
  );
};

export default UserProfile;
