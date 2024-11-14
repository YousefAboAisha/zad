import Button from "@/components/UI/inputs/button";
import Input from "@/components/UI/inputs/input";
import Heading from "@/components/UI/typography/heading";
import { useState } from "react";
import { BiMailSend } from "react-icons/bi";
import { FiSend } from "react-icons/fi";

const Subscribe = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="flex flex-col items-center justify-center w-full lg:w-9/12 mx-auto">
      <div className="lg:w-8/12 w-full">
        <Heading
          highLightText="اشترك معنا الآن"
          details="نوصيك بالاشتراك عن طريق تسجيل بريدك الإلكتروني أدناه للحصول على تحديثات يومية عنا "
          title=""
          additionalStyles="text-center mx-auto w-fit text-white"
          detailsStyles="mx-auto"
        />
      </div>

      <div className="relative mx-auto mt-8 lg:w-10/12 w-full">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="بريدك الالكتروني"
          icon={BiMailSend}
          className="!rounded-xl !border-none"
        />

        <div className="absolute w-fit text-[12px] top-[50%] translate-y-[-50%] left-0 h-full">
          <Button
            title="اشترك الآن"
            additionalStyles="hidden md:block lg:block h-full p-4 rounded-xl !rounded-r-none bg-primary"
          />

          <div className="bg-primary text-white h-full rounded-xl rounded-r-none w-14 lg:hidden md:hidden flex justify-center items-center cursor-pointer">
            <FiSend size={22} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
