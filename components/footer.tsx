import { FooterData } from "@/data/footerData";
import logo from "@/public/zad-logo.svg";
import FooterCard from "./UI/cards/footercard";
import Link from "next/link";
import { Social } from "@/data/social";
import Image from "next/image";

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="relative container grid grid-cols-1 lg:grid-cols-2 mt-24 mb-12 p-6 gap-4 border rounded-md">
      <div className="flex flex-col gap-4">
        {FooterData.map(({ label, value, image }, index) => {
          return (
            <FooterCard key={index} label={label} value={value} image={image} />
          );
        })}
      </div>

      <div className="flex flex-col gap-3 items-center justify-center">
        <Link href={"/"} className="flex items-center gap-2 text-xl mb-4">
          <Image src={logo} className="" width={50} height={50} alt="Logo" />
        </Link>

        <div className="flex flex-row mx-auto">
          {Social.map(({ href, image }, index) => {
            return (
              <Link
                key={index}
                href={href}
                target={"_blank"}
                rel={"noreferrer"}
                className="p-2 rounded-xl hover:bg-gray_overlay duration-300"
              >
                <Image src={image} alt="icon" height={25} width={25} />
              </Link>
            );
          })}
        </div>
        <p className="text-sm text-grey text-center">
          جميع الحقوق محفوظة لدى يوسف رشاد أبو عيشة {date}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
