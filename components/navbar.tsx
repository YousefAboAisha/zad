import React, { useState } from "react";
import { Routes } from "../data/routes";
// import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Sidebar from "./sidebar";
import Modal from "./UI/modals/modal";
import { Fade as Hamburger } from "hamburger-react";

const Navbar = () => {
  const [sidebarIsOpen, setsidebarIsOpen] = useState(false);

  return (
    <nav
      className={`fixed w-full h-[70px] top-0 left-0 z-[1000] items-center bg-white text-black duration-500 border-light border-b shadow-sm`}
    >
      <div className="container flex flex-row justify-between items-center h-full">
        <div className={`flex items-center gap-8 md:gap-6 lg:gap-8`}>
        <div className="flex md:hidden cursor-pointer">
            <Hamburger toggled={sidebarIsOpen} toggle={setsidebarIsOpen} size={24} />
          </div>

          <div className="hidden md:flex gap-6">
            {Routes.map((elem, index) => {
              const isPending = false;
              const isActive = false;
              return (
                <Link
                  key={index}
                  href={elem.href}
                  className={`cursor-pointer min-w-fit hover:text-primary duration-300 text-md font-primary ${
                    isPending
                      ? "animate-pulse"
                      : isActive
                      ? "cursor-pointer min-w-fit text-primary border-b-2 border-primary "
                      : ""
                  }`}
                  title={elem.title}
                >
                  {elem.title}
                </Link>
              );
            })}
          </div>
        </div>
        {/* Logo text and Image  */}
        <Link href={"/"} className="flex items-center gap-2 text-xl">
          <h2 className="font-secondary">زاد </h2>
          {/* <Image src={logo} className="min-w-[30px] h-[30px]" alt="Logo" /> */}
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
