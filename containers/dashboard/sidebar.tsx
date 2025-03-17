"use client";
import { SessionProps } from "@/components/navbar";
import { API_BASE_URL } from "@/config";
import logo from "@/public/zad-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { useState } from "react";
import { AiOutlineLoading3Quarters, AiOutlinePoweroff } from "react-icons/ai";
import { FiBarChart2, FiGitPullRequest, FiHome, FiUsers } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sidebar = ({ session }: SessionProps) => {
  const pathname = usePathname(); // Get the current route

  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/user/signout`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setLoading(false);
        throw new Error("Failed to log out");
      }
      window.location.reload();
    } catch (error) {
      setLoading(false);
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
          className={`mt-40 p-3 w-full rounded-lg flex items-center lg:justify-between justify-center gap-2 border`}
        >
          <p className="hidden lg:block text-sm">
            {loading ? "جارٍ تسجيل الخروج..." : session?.name}
          </p>
          <div
            onClick={() => handleLogout()}
            className="p-2 rounded-full cursor-pointer border scale-90 hover:scale-100 duration-300"
          >
            {loading ? (
              <AiOutlineLoading3Quarters
                size={22}
                className="animate-spin text-[red]"
              />
            ) : (
              <AiOutlinePoweroff size={22} className="text-[red] " />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
