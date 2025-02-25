"use client";
import { useEffect, useState } from "react";
import { MdCircleNotifications } from "react-icons/md";
import Modal from "../../components/UI/modals/modal";
import AddSubscription from "@/containers/profile/addSubscription";
import { CiCircleCheck } from "react-icons/ci";
import { toast, ToastContainer } from "react-toastify";
import { UserInterface } from "@/app/interfaces";
import {
  dateFormating,
  paymentMethodConverter,
  subscriptionTypeConverter,
} from "@/utils/conversions";

const CustomerProfile = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [userDetailsData, setUserDetailsData] = useState<UserInterface | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  const getUserDetails = async () => {
    try {
      const response = await fetch("/api/users/getUserDetails");

      if (!response.ok) {
        toast.error("حدث خطأ جلب معلومات المستخدم"); // Show error toast
        throw new Error("Failed to fetch user details");
      }

      const res = await response.json();
      if (res?.customer) {
        setUserDetailsData(res.customer);
      }
    } catch (error) {
      console.error("Fetching userDetails failed:", error);
      toast.error("حدث خطأ أثناء العملية"); // Show error toast
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  // Extract active subscription
  const activeSubscription = userDetailsData?.active_subscription || null;

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
      <CiCircleCheck size={80} className="text-[green]" />
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

  return (
    <div className="relative w-full min-h-[70vh]">
      {/* Toast Container */}
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

      <div className="relative min-h-[70vh]">
        {/* Customer's name */}
        <div className="flex items-center gap-1">
          <h2 className="text-lg">مرحباً بعودتك،</h2>
          {loading ? (
            <div className="h-5 bg-gray-300 rounded-sm w-48 animate-pulse"></div>
          ) : (
            <h2 className="font-bold text-lg">{userDetailsData?.name}</h2>
          )}
        </div>

        {/* Render content based on loading and subscription status */}
        {loading
          ? renderLoadingSkeletons()
          : activeSubscription
          ? renderActiveSubscription()
          : userDetailsData?.isActive
          ? renderSubscriptionRequestSuccess()
          : renderNoSubscription()}
      </div>

      {/* Modal for adding subscription */}
      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} zIndex="z-[1000]">
        <AddSubscription />
      </Modal>
    </div>
  );
};

export default CustomerProfile;
