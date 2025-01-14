"use client";
import { useEffect, useState } from "react";
import { MdCircleNotifications } from "react-icons/md";
import Modal from "./UI/modals/modal";
import AddSubscription from "@/components/addSubscription";
import { UserInterface } from "@/app/models/user";
import { CiCircleCheck } from "react-icons/ci";
import { toast, ToastContainer } from "react-toastify";

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
        toast.error("حدث خطأ جلب معلومات المستخدم "); // Show error toast
      }

      const res = await response.json();

      if (res) {
        console.log("User details full response", res);
        setUserDetailsData(res.customer);
        setLoading(false);
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
        {/* Customer's name  */}
        <div className="flex items-center gap-1">
          <h2 className="text-lg">مرحباً بعودتك،</h2>
          {loading ? (
            <div className="h-5 bg-gray-300 rounded-sm w-48 animate-pulse"></div>
          ) : (
            <h2 className="font-bold text-lg">{userDetailsData?.name}</h2>
          )}
        </div>

        {userDetailsData?.isVerified ? (
          <div className="cards-grid-3 mt-6">
            {/* Start date */}
            <div className="flex flex-col items-center justify-center gap-4 p-12 rounded-2xl text-white bg-[#AA5486]">
              <p>تاريخ البدء</p>
              <h2 className="font-bold text-4xl">16/ 12/ 2024</h2>
            </div>

            {/* End Date */}
            <div className="flex flex-col items-center justify-center gap-4 p-12 rounded-2xl text-white bg-[#4DA1A9]">
              <p>تاريخ الانتهاء</p>
              <h2 className="font-bold text-4xl">16/ 1/ 2025</h2>
            </div>

            {/* Subscription type */}
            <div className="flex flex-col items-center justify-center p-12 gap-2 rounded-2xl bg-[#1E3250] text-white row-span-2">
              <p className="text-lg">متبقي</p>
              <h2 className="font-bold text-9xl ">7</h2>
              <p className="text-lg">أيام</p>
            </div>

            {/* Subscription type */}
            <div className="flex flex-col items-center justify-center gap-4 p-12 rounded-2xl bg-[#f39c12] text-white">
              <p>نوع الاشتراك</p>
              <h2 className="font-bold text-4xl">أسبوعي</h2>
            </div>

            {/* Subscription type */}
            <div className="flex flex-col items-center justify-center gap-4 p-12 rounded-2xl bg-[#5CB338] text-white">
              <p>رقم الغرفة</p>
              <h2 className="font-bold text-5xl">A</h2>
            </div>
          </div>
        ) : loading ? (
          <div className="abs-center flex flex-col gap-4 justify-center items-center">
            <div className="w-20 h-20 rounded-full bg-gray-300 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded-sm w-48 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded-sm w-32 animate-pulse"></div>
          </div>
        ) : userDetailsData?.subscriptions.length == 0 ? (
          <div className="abs-center flex flex-col gap-4 items-center justify-center">
            <MdCircleNotifications size={50} className="opacity-10 " />
            <p>لا يوجد اشتراك حالي</p>
            <p
              onClick={() => setIsOpenModal(true)}
              className="text-primary hover:underline cursor-pointer"
            >
              اشترك الآن
            </p>
          </div>
        ) : (
          <div className="abs-center flex flex-col gap-2 items-center justify-center">
            <CiCircleCheck size={80} className=" text-[green]" />
            <p className="text-center md:w-8/12 w-10/12 mx-auto">
              تم إرسال طلب الاشتراك بنجاح، سيتم التواصل معكم في أقرب وقت ممكن!
            </p>
          </div>
        )}
      </div>
      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} zIndex="z-[1000]">
        <AddSubscription />
      </Modal>
    </div>
  );
};

export default CustomerProfile;
