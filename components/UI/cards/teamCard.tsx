import React from "react";
import Image, { StaticImageData } from "next/image";
import { Social } from "@/data/social";
import Link from "next/link";

type TeamCardType = {
  name: string;
  profession: string;
  image: StaticImageData;
  color: string;
  background: string;
};

export const TeamCard = ({
  name,
  profession,
  image,
  color,
  background,
}: TeamCardType) => {
  return (
    <div className="relative flex flex-col rounded-3xl border p-6 shadow-lg hover:shadow-xl duration-500">
      <div
        className="relative h-[140px] rounded-xl"
        style={{
          backgroundColor: color,
          background: `url(${background})`,
        }}
      >
        <Image
          src={image}
          width={500}
          height={500}
          className="absolute bottom-0 left-[50%] translate-x-[-50%] rounded-full mx-auto w-[125px] h-[125px] translate-y-12 border-white border-8"
          alt="Profile Image"
        />
      </div>

      <div className="flex flex-col gap-4 items-center justify-center mt-14">
        <h2 className="font-bold">{name}</h2>
        <p
          className="text-sm font-bold"
          style={{
            color: color,
          }}
        >
          {profession}
        </p>
      </div>

      {/* social media Icons */}
      <div className="flex flex-row gap-3 mx-auto mt-8">
        {Social.map(({ href, image }, index) => {
          return (
            <Link
              key={index}
              href={href}
              target={"_blank"}
              rel={"noreferrer"}
              className="p-2 rounded-xl border hover:bg-gray_overlay duration-300"
            >
              <Image src={image} alt="icon" height={25} width={25} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
