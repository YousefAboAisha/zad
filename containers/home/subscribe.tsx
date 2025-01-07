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
        details="نوصيك بالاشتراك عن طريق تسجيل بريدك الإلكتروني أدناه للحصول على تحديثات يومية عنا "
        title=""
        className="w-full text-white"
      />

      <Link href={"/signin"}>
        <Button
          title="الانضمام الآن"
          className="bg-blue w-10/12 md:w-6/12 lg:w-3/12 mt-4"
          hasShiningBar={false}
        />
      </Link>
    </div>
  );
};

export default Subscribe;
