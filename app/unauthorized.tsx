import Button from "@/components/UI/inputs/button";
import Link from "next/link";
import React from "react";
import { RiArrowGoBackFill } from "react-icons/ri";

const Unauthorized = () => {
  return (
    <div className="relative container flex flex-col items-center justify-center mt-40">
      <h2 className="text-[120px] font-bold">401</h2>
      <p className="">أنت غير مخول لدخول الصفحة</p>
      <Link href={"/"} className="w-full">
        <Button
          title=" الصفحة الرئيسية"
          className="mt-4 bg-primary w-full md:w-3/12 mx-auto"
          hasShiningBar={false}
          icon={<RiArrowGoBackFill />}
        />
      </Link>
    </div>
  );
};

export default Unauthorized;
