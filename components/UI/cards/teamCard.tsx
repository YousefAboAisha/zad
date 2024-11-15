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
    <div className="relative flex flex-col rounded-3xl border p-6 shadow-xl hover:-translate-y-2 duration-500">
      <div
        className="relative h-[140px] rounded-xl"
        style={{
          backgroundColor: color,
          background: `url(${background})`,
        }}
      >
        <Image
          src={image}
          width={100}
          height={100}
          className="absolute bottom-0 left-[50%] translate-x-[-50%] rounded-full mx-auto w-[100px] h-[100px] translate-y-10 border-white border-8"
          alt="Profile Image"
        />
      </div>

      <div className="flex flex-col gap-4 items-center justify-center mt-12">
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
      <div className="flex flex-row gap-2 mx-auto mt-8">
        {Social.map(({ href, image }, index) => {
          return (
            <Link key={index} href={href} target={"_blank"} rel={"noreferrer"}>
              <Image src={image} alt="icon" height={25} width={25} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
