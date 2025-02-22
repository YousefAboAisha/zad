"use client";
import logo from "@/public/zad-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { FiBarChart2, FiGitPullRequest, FiHome, FiUsers } from "react-icons/fi";

const Sidebar = () => {
  const pathname = usePathname(); // Get the current route

  return (
    <div className="bg-white border border-l h-full fixed w-[17%]">
      <div className="relative flex flex-col gap-2 items-center p-4">
        <Link
          href={"/"}
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
          <Link href={"/dashboard"}>
            <li
              className={`list-none cursor-pointer duration-100 p-4 w-full rounded-lg flex items-center md:justify-normal justify-center gap-2 ${
                pathname === "/dashboard"
                  ? "bg-primary text-white"
                  : "bg-gray-100"
              }`}
            >
              <FiHome size={18} />
              <p className="hidden md:block text-sm"> الرئيسية</p>
            </li>
          </Link>

          <Link href={"/dashboard/subscription_requests"}>
            <li
              className={`list-none cursor-pointer duration-100 p-4 w-full rounded-lg flex items-center md:justify-normal justify-center gap-2 ${
                pathname === "/dashboard/subscription_requests"
                  ? "bg-primary text-white"
                  : "bg-gray-100"
              }`}
            >
              <FiGitPullRequest size={18} />
              <p className="hidden md:block text-sm"> طلبات الانضمام</p>
              <span className="text-sm font-semibold">9+</span>
            </li>
          </Link>

          <Link href={"/dashboard/subscripers"}>
            <li
              className={`list-none cursor-pointer duration-100 p-4 w-full rounded-lg flex items-center md:justify-normal justify-center gap-2 ${
                pathname === "/dashboard/subscripers"
                  ? "bg-primary text-white"
                  : "bg-gray-100"
              }`}
            >
              <FiUsers size={18} />
              <p className="hidden md:block text-sm"> المشتركين</p>
            </li>
          </Link>

          <Link href={"/dashboard/analysis"}>
            <li
              className={`list-none cursor-pointer duration-100 p-4 w-full rounded-lg flex items-center md:justify-normal justify-center gap-2 ${
                pathname === "/dashboard/analysis"
                  ? "bg-primary text-white"
                  : "bg-gray-100"
              }`}
            >
              <FiBarChart2 size={18} />
              <p className="hidden md:block text-sm"> التحليلات</p>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
