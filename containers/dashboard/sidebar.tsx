"use client";
import { API_BASE_URL } from "@/config";
import logo from "@/public/zad-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import {
  FiBarChart2,
  FiGitPullRequest,
  FiHome,
  FiLogOut,
  FiUsers,
} from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sidebar = () => {
  const pathname = usePathname(); // Get the current route
  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/signout`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to log out");
      }
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("حدث خطأ أثناء تسجيل الخروج"); // Show error toast
    }
  };
  return (
    <div className="bg-white border border-l h-full fixed w-[17%]">
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
      <div className="relative flex flex-col gap-2 items-center p-4">
        <Link
          href={"/admin/dashboard"}
          className="flex flex-col items-center justify-center gap-2 outline-none"
        >
          <Image
            src={logo}
            alt="Zad logo"
            width={30}
            height={30}
            className=""
          />
          <p className="text-gray-600 text-sm">مساحة عمل</p>
        </Link>

        <ul className="flex flex-col gap-2 mt-12 w-full">
          <Link href={"/admin/dashboard"}>
            <li
              className={`list-none cursor-pointer duration-100 p-4 w-full rounded-lg flex items-center lg:justify-normal justify-center gap-2 ${
                pathname === "/admin/dashboard"
                  ? "bg-primary text-white"
                  : "bg-gray-100"
              }`}
            >
              <FiHome size={18} />
              <p className="hidden lg:block text-sm"> الرئيسية</p>
            </li>
          </Link>

          <Link href={"/admin/dashboard/subscription_requests"}>
            <li
              className={`list-none cursor-pointer duration-100 p-4 w-full rounded-lg flex items-center lg:justify-normal justify-center gap-2 ${
                pathname === "/admin/dashboard/subscription_requests"
                  ? "bg-primary text-white"
                  : "bg-gray-100"
              }`}
            >
              <FiGitPullRequest size={18} />
              <p className="hidden lg:block text-sm"> طلبات الانضمام</p>
            </li>
          </Link>

          <Link href={"/admin/dashboard/subscripers"}>
            <li
              className={`list-none cursor-pointer duration-100 p-4 w-full rounded-lg flex items-center lg:justify-normal justify-center gap-2 ${
                pathname === "/admin/dashboard/subscripers"
                  ? "bg-primary text-white"
                  : "bg-gray-100"
              }`}
            >
              <FiUsers size={18} />
              <p className="hidden lg:block text-sm"> المشتركين</p>
            </li>
          </Link>

          <Link href={"/admin/dashboard/analysis"}>
            <li
              className={`list-none cursor-pointer duration-100 p-4 w-full rounded-lg flex items-center lg:justify-normal justify-center gap-2 ${
                pathname === "/admin/dashboard/analysis"
                  ? "bg-primary text-white"
                  : "bg-gray-100"
              }`}
            >
              <FiBarChart2 size={18} />
              <p className="hidden lg:block text-sm"> التحليلات</p>
            </li>
          </Link>
        </ul>

        <div
          onClick={() => handleLogout()}
          className="mt-40 cursor-pointer duration-100 p-3 gap-2 rounded-lg flex items-center lg:justify-normal justify-center text-[red] border border-[red] w-fit "
        >
          <p className="hidden lg:block text-[13px]"> تسجيل الخروج</p>
          <FiLogOut size={18} className="rotate-180" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
