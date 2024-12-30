import React, { useState } from "react";
import { Routes } from "../data/routes";
import Link from "next/link";
import Sidebar from "./sidebar";
import Modal from "./UI/modals/modal";
import { Fade as Hamburger } from "hamburger-react";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "@/public/zad-logo.svg";
import Signin from "./UI/modals/signin";
import Signup from "./UI/modals/signup";
import Button from "./UI/inputs/button";
import { useModal } from "../context/modalContext";
import ProfilePopper from "./UI/modals/profilePopper";

const Navbar: React.FC = () => {
  const { openModal, closeModal, isOpen } = useModal();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const router = useRouter();
  const pathname = router.pathname;
  const user = true;

  return (
    <nav
      className={`fixed w-full h-[70px] top-0 left-0 z-[1000] items-center bg-white text-black duration-500 border-light border-b shadow-sm`}
    >
      <div className="container flex flex-row justify-between items-center h-full">
        <div className={`flex items-center gap-1 md:gap-6 lg:gap-8`}>
          <div className="flex md:hidden cursor-pointer">
            <Hamburger
              toggled={sidebarIsOpen}
              toggle={setSidebarIsOpen}
              size={24}
            />
          </div>

          {/* Sign In and Sign Up Buttons */}
          {!user ? (
            <Button
              title="انضم إلينا"
              className="bg-primary text-sm px-1 sm:px-2 min-w-[100px]"
              onClick={() => {
                closeModal();
                openModal("signup");
              }}
            />
          ) : (
            <ProfilePopper />
          )}

          {/* Routes */}
          <div className="hidden md:flex gap-6">
            {Routes.map(({ title, href }, index) => (
              <Link
                key={index}
                href={href}
                className={`cursor-pointer min-w-fit hover:text-primary duration-500 text-md font-primary outline-none ${
                  pathname === `${href}` ? "text-primary font-normal" : ""
                }`}
                title={title}
              >
                {title}
              </Link>
            ))}
          </div>
        </div>

        {/* Logo */}
        <Link href={"/"}>
          <Image src={logo} width={25} height={25} alt="Zad logo" />
        </Link>
      </div>

      {/* Modals */}
      <Modal isOpen={isOpen("signin")} setIsOpen={closeModal}>
        <Signin />
      </Modal>

      <Modal isOpen={isOpen("signup")} setIsOpen={closeModal}>
        <Signup />
      </Modal>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarIsOpen} />
      <Modal isOpen={sidebarIsOpen} setIsOpen={() => setSidebarIsOpen(false)} />
    </nav>
  );
};

export default Navbar;
