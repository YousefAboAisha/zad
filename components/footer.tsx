import { FooterData } from "@/data/footerData";
import logo from "@/public/favicon.ico";
import FooterCard from "./UI/cards/footercard";
import Link from "next/link";
// import CustomImage from "./UI/cards/customImage";
import { Social } from "@/data/social";
import Image from "next/image";

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="relative container grid grid-cols-1 lg:grid-cols-2 mt-24 mb-12 p-6 gap-4 border rounded-md ">
      <div className="flex flex-col gap-4">
        {FooterData.map((elem, index) => {
          return (
            <FooterCard
              key={index}
              label={elem.label}
              value={elem.value}
              image={elem.image}
            />
          );
        })}
      </div>

      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="max-w-[100px] max-h-[100px] flex flex-col gap-2 justify-center items-center">
          <Link href={"/"} className="flex items-center gap-2 text-xl">
            <Image src={logo} className="w-[40px] h-[40px]" alt="Logo" />
          </Link>
          <span>زاد</span>
        </div>

        <div className="flex flex-row gap-4 ">
          {Social.map((elem, index) => {
            return (
              <Link
                key={index}
                href={elem.href}
                target={"_blank"}
                rel={"noreferrer"}
                className="full-theme p-3 shadow-lg rounded-md border border-transparent duration-500 "
              >
                {<elem.icon size={19} />}
              </Link>
            );
          })}
        </div>
        <p className="text-sm text-grey mt-2 text-center">
           جميع الحقوق محفوظة لدى يوسف رشاد أبو عيشة {date}
        </p>
      </div>
    </footer>
  );
};

export default Footer;