import Link from "next/link";
import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

type PageTitlesProps = {
  title: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

const PageTitles = ({ title }: PageTitlesProps) => {
  return (
    <div className="flex items-center mb-12">
      <Link href={"/"} className="flex items-center text-gray-500 hover:underline">
        الرئيسية
        <MdKeyboardArrowLeft size={20} />
      </Link>

      <p className="mr-1">{title}</p>
    </div>
  );
};

export default PageTitles;
