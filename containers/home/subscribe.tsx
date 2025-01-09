"use client";
import Button from "@/components/UI/inputs/button";
import Heading from "@/components/UI/typography/heading";
import Link from "next/link";

const Subscribe = () => {
  return (
    <div className="flex flex-col">
      <Heading
        highLightText="انضم إلى مجتمع زاد"
        highlightColor="before:bg-blue"
        details="قم بإنشاء حساب الآن لتصبح فرداً من مجتمعنا المُميز!"
        title=""
        className="w-fit text-white"
      />

      <Link href={"/signin"} className="w-10/12 md:w-6/12 lg:w-3/12 outline-none">
        <Button
          title="الانضمام الآن"
          className="bg-blue w-full h-full mt-4"
          hasShiningBar={false}
        />
      </Link>
    </div>
  );
};

export default Subscribe;
