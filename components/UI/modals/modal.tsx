import React, { Dispatch, SetStateAction } from "react";

type ModalType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  bg?: string;
  zIndex?: string;
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
};

const Modal = ({
  setIsOpen,
  isOpen,
  bg = "bg-[#000000b9]",
  className,
  zIndex = "z-50",
  children,
  containerClassName = "",
}: ModalType) => {
  return (
    // pointer-events-none to hide modal and disable interactions.
    <>
      <div
        className={`fixed w-full h-full left-0 top-0 duration-300 z-50  ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } ${bg} ${zIndex} `}
        onClick={() => setIsOpen(false)}
      ></div>
      <div
        className={`abs-center fixed bg-white max-h-[90%] z-100 w-11/12 md:w-7/12 lg:w-5/12 z-[1000001] overflow-y-auto rounded-xl ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } duration-300 ${className} ${containerClassName} `}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
