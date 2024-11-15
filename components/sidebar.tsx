import { Routes } from "@/data/routes";
import Link from "next/link";
// import Image from "next/image";

type SidebarTypes = {
  isOpen: boolean;
};

const Sidebar = ({ isOpen }: SidebarTypes) => {
  const date = new Date().getFullYear();
 

  return (
    <div
      className={`fixed rtl h-full w-full md:w-6/12 md:hidden sm:fixed right-0 top-[70px] z-[10000] bg-white duration-500 ${
        isOpen ? "translate-x-0" : "translate-x-[100%]"
      }`}
    >
      <div className="flex flex-col gap-4 mt-4 ">
        {Routes.map((elem, index) => {
          return (
            <Link
              key={index}
              href={elem.href}
              className={`cursor-pointer p-4 border-b duration-300 hover:text-primary `}
              title={elem.title}
            >
              <p
                className={`font-secondary`}
              >
                {elem.title}
              </p>
            </Link>
          );
        })}
{/* 
        <Image
          src={logo}
          className="w-[50px] h-[50px] opacity-10 mx-auto"
          alt="Logo"
        /> */}

        <p className="text-sm font-light text-grey mt-4 text-center">
          جميع الحقوق محفوظة لدى يوسف رشاد أبو عيشة© {date}
        </p>
      </div>
    </div>
  );
};

export default Sidebar;