import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

type PageTitlesProps = {
  title: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

const PageTitles = ({ title }: PageTitlesProps) => {
  return (
    <div className="flex items-center">
      <p className="text-gray-500">الرئيسية</p>
      <MdKeyboardArrowLeft size={20} className="text-gray-500" />
      <p className="mr-1">{title}</p>
    </div>
  );
};

export default PageTitles;
