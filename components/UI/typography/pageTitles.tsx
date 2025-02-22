import Link from "next/link";
import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

type PageTitlesProps = {
  title: string;
  homePath?: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

const PageTitles = ({ title, homePath = "/" }: PageTitlesProps) => {
  return (
    <div className="flex items-center mb-8">
      <Link
        href={homePath}
        className="flex items-center text-gray-500 hover:underline"
      >
        الرئيسية
        <MdKeyboardArrowLeft size={20} />
      </Link>

      <p className="mr-1">{title}</p>
    </div>
  );
};

export default PageTitles;
