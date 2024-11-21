import React, { useState } from "react";
import { Routes } from "../data/routes";
// import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Sidebar from "./sidebar";
import Modal from "./UI/modals/modal";
import { Fade as Hamburger } from "hamburger-react";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "@/public/zad-logo.svg";

const Navbar = () => {
  const [sidebarIsOpen, setsidebarIsOpen] = useState(false);
  const router = useRouter();

  return (
    <nav
      className={`fixed w-full h-[70px] top-0 left-0 z-[1000] items-center bg-white text-black duration-500 border-light border-b shadow-sm`}
    >
      <div className="container flex flex-row justify-between items-center h-full">
        <div className={`flex items-center gap-8 md:gap-6 lg:gap-8`}>
          <div className="flex md:hidden cursor-pointer">
            <Hamburger
              toggled={sidebarIsOpen}
              toggle={setsidebarIsOpen}
              size={24}
            />
          </div>

          <div className="hidden md:flex gap-6">
            {Routes.map(({ title, href }, index) => {
              const pathname = router.pathname;
              // console.log([pathname, title]);

              return (
                <Link
                  key={index}
                  href={href}
                  className={`cursor-pointer min-w-fit hover:text-primary duration-500 text-md font-primary outline-none ${
                    href == pathname ? "text-primary font-normal" : ""
                  }`}
                  title={title}
                >
                  {title}
                </Link>
              );
            })}
          </div>
        </div>
        {/* Logo text and Image  */}
        <Link href={"/"} className="">
          <Image src={logo} width={25} height={25} alt="Zad logo" />
        </Link>
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarIsOpen} />
      <Modal
        isOpen={sidebarIsOpen}
        setIsOpen={() => setsidebarIsOpen(false)}
        className="!top-[70px]"
      />
    </nav>
  );
};

export default Navbar;
